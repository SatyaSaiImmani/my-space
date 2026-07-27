# Turning a SanDisk Extreme SSD Into a Portable CentOS Stream 10 Workstation - A PXE Boot War Story

*What started as a casual 10 PM Sunday night idea turned into an all-night troubleshooting marathon that wrapped up around 6 AM the next morning — this article is the record of everything that happened in between.*

## The Goal

I had a 2TB SanDisk Extreme external SSD (connected via USB-C) that I wanted to turn into a **standalone, bootable CentOS Stream 10 workstation drive** — something I could plug into any UEFI machine and boot straight into a full Linux environment, independent of whatever OS lived on that machine's internal disk.

The twist: I didn't have a spare USB flash drive to build a traditional installer, but I did have a MacBook Pro sitting around. So instead of buying a $5 flash drive like a reasonable person, I decided to network-boot (PXE boot) the installer from my Mac directly. This is the story of how that went — every wrong turn, every cryptic error, and how each one got resolved.

---

## Overview of the Final Architecture

By the end, the setup looked like this:

- **Target machine**: A MinisForum mini PC (AMD Ryzen 7 255, AI X1 series), UEFI firmware, connected to the home router via a 2.5GbE Ethernet cable
- **PXE/TFTP/HTTP server**: A MacBook Pro on Wi-Fi, same subnet, running `dnsmasq` (DHCP-proxy + TFTP) and a Python `http.server`
- **Install target disk**: The 2TB SanDisk Extreme SSD, connected to the MinisForum via USB-C
- **Install source**: Ultimately, the live CentOS Stream 10 mirror (`mirror.stream.centos.org`) over the internet — not the Mac's local HTTP server, which turned out to only be useful for the boot-stage files

---

## Step 0: Picking the Distro

First correction needed before anything else: **"CentOS" the traditional stable distro no longer exists.** It was discontinued; only **CentOS Stream** remains as the rolling-release upstream of RHEL. (Rocky Linux and AlmaLinux exist as RHEL-compatible alternatives if a traditional stable CentOS-like experience is wanted instead.) I went with **CentOS Stream 10**.

---

## Step 1: No USB Drive, So Let's PXE Boot Instead

Normally the path here is: download an ISO, use Rufus to write it to a USB flash drive, boot from that. I had no flash drive and no SD card handy — but I did have a MacBook. So the plan became:

1. Use the MacBook as a **PXE/TFTP/HTTP server**
2. Get the target PC to **network boot** off it
3. Point the installer at the SanDisk SSD as the destination

This is a legitimate, well-supported approach — PXE boot is a real protocol used in enterprise deployment all the time — but it requires more moving parts than a flash drive, and nearly every one of those parts broke at least once along the way.

---

## Step 2: Getting the Right ISO

### Problem: Downloaded the wrong ISO type initially
I first grabbed the full `dvd1.iso` (multi-GB installer image), which is meant for offline/local installs, not network installs. For PXE netinstall, the correct file is the much smaller **`boot.iso`** — a minimal image containing just the kernel, initrd, and bootloader, designed to fetch the actual install repo over HTTP/network at install time.

**Fix**: Downloaded `CentOS-Stream-10-20260721.0-x86_64-boot.iso` instead.

### Problem: Confirming architecture
Quick sanity check needed since the machine is AMD-based: **AMD64 and x86_64 are the same architecture** (AMD64 was AMD's name for their 64-bit x86 extension, later adopted universally, including by Intel). ARM64 is an entirely different instruction set (Apple Silicon, phones, Raspberry Pi) and would not have booted at all. Downloaded the `x86_64` ISO — correct choice.

---

## Step 3: Mounting the ISO on macOS (More Painful Than Expected)

### Problem: `hdiutil mount` failed with "no mountable file systems"
Running `hdiutil mount CentOS-Stream-10-....iso` simply refused to mount, with no useful error beyond "no mountable file systems."

**Diagnosis steps taken:**
1. Verified the download wasn't corrupted — compared `shasum -a 256` against the official `CHECKSUM`/`SHA256SUM` file. It matched exactly, ruling out a bad download.
2. Ran `hdiutil imageinfo` on the ISO, which revealed the real issue: this was a **hybrid ISO9660/UDF image with an embedded GPT partition table** — a very common format for modern Linux installer media, since it needs to boot via both legacy BIOS (via ISO9660/El Torito) and UEFI (via a FAT partition), while also being readable as a data disc. macOS's default `hdiutil mount` doesn't always know how to auto-mount this hybrid structure directly.

**Fix, step by step:**
1. `hdiutil attach -nomount` — attached the image as raw disk devices without trying to auto-mount, revealing the partition table:
   ```
   /dev/disk4          GUID_partition_scheme
   /dev/disk4s1        Microsoft Basic Data   (actually the ISO9660 data, mislabeled)
   /dev/disk4s2        EFI (ANACONDA)
   /dev/disk4s3        Microsoft Basic Data
   ```
2. Tried `diskutil mount /dev/disk4s1` directly — failed ("Volume on disk4s1 failed to mount"), even with `-readOnly`.
3. The real fix: **force-mount it as a raw ISO9660 filesystem** using the lower-level `mount` command:
   ```bash
   mkdir -p ~/pxeboot/iso_mount
   sudo mount -t cd9660 -o ro /dev/disk4s1 ~/pxeboot/iso_mount
   ```
   This worked immediately, revealing `boot`, `EFI`, and `images` directories — exactly what was needed.

**Lesson learned**: When `hdiutil mount` fails on a Linux hybrid ISO on macOS, skip straight to `hdiutil attach -nomount` + `mount -t cd9660` rather than fighting with `hdiutil mount`/`diskutil mount` variations.

---

## Step 4: Setting Up the PXE Boot Infrastructure

The plan required three pieces on the Mac:
- **dnsmasq** running as a DHCP-proxy + TFTP server (delivers the boot files)
- A **Python HTTP server** (originally intended to also deliver install packages, though this ultimately wasn't used for that purpose — more below)
- Correctly placed boot files (`BOOTX64.EFI`, `grubx64.efi`, `grub.cfg`, `vmlinuz`, `initrd.img`) copied from the mounted ISO

### Copying files from the mounted ISO
```bash
cp -r ~/pxeboot/iso_mount/EFI/BOOT ~/pxeboot/tftpboot/
cp -r ~/pxeboot/iso_mount/images ~/pxeboot/http/
```
Verified `vmlinuz`, `initrd.img`, `BOOTX64.EFI`, `grubx64.efi` all landed correctly.

---

## Step 5: The dnsmasq Saga (The Biggest Time Sink)

This is where the majority of troubleshooting time went. Multiple distinct failures, each with a different root cause, stacked on top of each other.

### Problem 1: Wrong subnet in the config
Initial config guessed `dhcp-range=192.168.1.0,proxy`, but the actual home network was `192.168.0.0/24`. Confirmed via:
```bash
ifconfig | grep "inet "
```
which showed the Mac's real IP as `192.168.0.102`.

**Fix**: Corrected `dhcp-range` to `192.168.0.0,proxy`.

### Problem 2: `brew services start dnsmasq` reported "error" with exit code 3, 2, then eventually a Bootstrap I/O error
This took several rounds to unwind:

- **First attempt**: Service showed `error 3`. Ran `sudo dnsmasq --test` (syntax OK) and `sudo dnsmasq -d` (foreground debug mode) to get a live error. The foreground run actually worked cleanly — meaning the config itself was fine, but something about running it as a **launchd service** specifically was broken.
- **Root cause discovered via `log show --predicate 'process == "dnsmasq"'`**: `dnsmasq: failed to create listening socket for 192.168.0.102: Address already in use`. A **stale dnsmasq process from an earlier foreground test** (`sudo dnsmasq -d`) had been left in a suspended/stopped state (visible via `ps aux | grep dnsmasq`, showing processes in `T` state — "stopped" from an incomplete Ctrl+C) and was still holding the socket.
- **Fix**: `sudo kill -9 <pids>` to fully terminate the zombie processes.
- **Still failed after that**, now with `Bootstrap failed: 5: Input/output error` when trying to reload via `brew services`/launchd — the LaunchDaemon plist itself had gotten into a wedged state from the repeated failed bootstrap attempts, and `launchctl bootout` also failed with the same I/O error, refusing to cleanly unload it either.
- **Final resolution**: Abandoned `brew services`/launchd entirely for this one-off use case, and ran dnsmasq as a **plain background process** instead:
  ```bash
  sudo dnsmasq
  echo $?   # confirms exit code 0 = success
  ps aux | grep dnsmasq   # confirms it's alive and staying alive
  ```

### Problem 3: TFTP directory permission denied
Even after dnsmasq started, it immediately errored: `TFTP directory /Users/.../pxeboot/tftpboot inaccessible: Permission denied`.

**Root cause**: dnsmasq starts as root to bind privileged ports, but by default drops privileges afterward to a low-privilege user (e.g., `nobody`), which then can't traverse into a normal user's home directory on macOS.

**Fix**: Added `user=root` to `dnsmasq.conf`, skipping the privilege drop entirely (acceptable for a short-lived local PXE session, not something to leave running long-term).

At this point, `sudo dnsmasq` finally ran clean, stayed running, and was correctly serving DHCP-proxy + TFTP.

---

## Step 6: First PXE Boot Attempt — BIOS/UEFI Configuration on the MinisForum

Getting the MinisForum to actually attempt network boot required several BIOS-side fixes:

### Problem: Boot menu key uncertainty
MinisForum's AMI-based UEFI BIOS uses **Del** to enter full Setup, and **F7** (sometimes F11) for the one-time boot device menu (BBS Menu) — not the more common F12.

### Problem: Secure Boot blocked the unsigned bootloader
Our PXE setup used the CentOS ISO's raw `BOOTX64.EFI`/`grubx64.efi`, copied by hand — not validated against Microsoft's UEFI CA chain the way Secure Boot expects. This needed to be **disabled** in BIOS (Security tab) before PXE boot would proceed at all. (Note for later: production installs from official media are typically shim-signed and can often have Secure Boot re-enabled afterward without issue — but for this manual PXE setup, it had to stay off through the full install.)

### Problem: BBS menu initially only showed "UEFI: Built-in EFI Shell"
The actual network/PXE boot entry wasn't showing up at first. This meant the **LAN PXE Option ROM** wasn't enabled — a setting often buried in an Advanced/Onboard Devices submenu, separate from the generic "Network Boot" boot-priority toggle found under the Boot tab.

**Fix**: Located and enabled the specific PXE toggle (for this board, once the right submenu was found, the entry **"PXE IPv4 Realtek PCIe"** appeared correctly in the BBS menu).

### Aside: Wi-Fi vs Ethernet
The target PC was initially only connected via Wi-Fi. **PXE network boot fundamentally does not work over Wi-Fi** — a PC's boot ROM runs before any OS or drivers load, and Wi-Fi requires an authentication handshake (WPA, etc.) that the boot firmware has no way to perform at that stage. This is a hardware/protocol limitation, not a settings issue, across virtually all consumer PCs.

**Fix**: Ran a 2.5GbE Ethernet cable directly from the router to the MinisForum. (Also confirmed the Mac should stay on Wi-Fi on the same router/subnet, rather than switching to a mobile hotspot — switching networks would have put the Mac and PC on two different, unreachable subnets, breaking PXE entirely.)

Confirmed both machines were correctly on the same subnet:
- Mac: `192.168.0.102`
- MinisForum (via Ethernet): `192.168.0.107`, gateway `192.168.0.1`

---

## Step 7: TFTP Transfer Failures

### Problem: "NBP filesize is 0 bytes"
After selecting the PXE boot entry, the screen displayed `NBP filename is BOOT/BOOTX64.EFI`, `NBP filesize is 0 Bytes`, and then stalled. This turned out to be a red herring in one sense (some PXE ROM firmware just prints a placeholder `0` for filesize before actually completing the transfer) — but in this case it really was failing, confirmed by checking dnsmasq's live logs.

### Problem: `dnsmasq-tftp: cannot access .../BOOTX64.EFI: Permission denied`
Restarting dnsmasq with verbose logging (`sudo dnsmasq --no-daemon --log-dhcp`) revealed the real error. The file, copied earlier from the `cd9660`-mounted ISO, had restrictive permissions:
```
-rwx------  1 root  staff  1036104 ... BOOTX64.EFI
```
Owner-only access, likely inherited oddly from the ISO mount's original Unix permission bits.

**Fix**:
```bash
sudo chmod -R 755 ~/pxeboot/tftpboot
sudo chown -R root:staff ~/pxeboot/tftpboot
```
Also double-checked for stray macOS ACLs with `ls -le`, which came back clean after the chmod.

After this fix, DHCP negotiation, PXE discovery, and the TFTP transfer of `BOOTX64.EFI` all succeeded — **GRUB 2.12 loaded on the target machine** for the first time.

---

## Step 8: GRUB Loaded, But Couldn't Find Its Own Config

### Problem: GRUB kept requesting `grub.cfg` from paths that didn't exist
Verbose dnsmasq logs showed a long series of:
```
file .../tftpboot/EFI/BOOT/grub.cfg not found for 192.168.0.107
file .../tftpboot/EFI/BOOT/x86_64-efi/command.lst not found for 192.168.0.107
```

**Root cause**: The files had only been copied to `~/pxeboot/tftpboot/BOOT/`, but GRUB's compiled-in search prefix expects `EFI/BOOT/` (with the `EFI/` parent directory) relative to the TFTP root. The `dhcp-boot=BOOT/BOOTX64.EFI` setting happened to work for loading the *initial* EFI binary (since that path is explicitly specified in the DHCP option), but the binary's own internal logic for finding its config and modules was hardcoded to look under `/EFI/BOOT/`.

**Fix**: Mirrored the entire directory structure under the path GRUB actually expected:
```bash
mkdir -p ~/pxeboot/tftpboot/EFI/BOOT
cp -r ~/pxeboot/tftpboot/BOOT/* ~/pxeboot/tftpboot/EFI/BOOT/
sudo chmod -R 755 ~/pxeboot/tftpboot/EFI
sudo chown -R root:staff ~/pxeboot/tftpboot/EFI
```

Re-attempted PXE boot, and this time `EFI/BOOT/grub.cfg` was found and served correctly, followed by successful TFTP transfers of `vmlinuz` and `initrd.img`. Kernel boot messages began scrolling on the target screen — a major milestone.

---

## Step 9: Kernel Booted, But the Install Stalled for 30 Minutes

### Problem: Installer environment loaded (Anaconda's `dracut-initqueue` visibly running, kernel/dracut messages scrolling, both `sda` (SanDisk, 2TB) and `nvme0n1` (internal drive) correctly detected), but the process then sat completely still for **30 minutes** with no progress, no errors, and no activity in the Python HTTP server log.

**Diagnosis process:**
1. First suspected the macOS firewall blocking incoming connections on port 8080 — checked with `socketfilterfw --getglobalstate`. It was already off, ruling this out.
2. Checked `sudo lsof -i :8080` — confirmed the Python HTTP server was listening, but showed **zero established connections**, meaning the installer's request wasn't reaching the Mac's HTTP server at all.
3. Realized the actual root cause: the `grub.cfg` was pointing `inst.repo=http://192.168.0.102:8080` at the Mac's HTTP server, but that server was only ever populated with the **boot-stage `images/` folder copied from `boot.iso`** — never the actual package repository (`repodata/`, `Packages/`, `.treeinfo`, etc.). The `boot.iso` is intentionally minimal; it always expects to fetch the real installable package tree from either a full DVD image or a proper online mirror — it was never going to find a valid repo on the Mac's HTTP server no matter how long it waited, because that data simply didn't exist there.

**Fix**: Changed strategy — instead of trying to host a full package repository locally, pointed the installer directly at the **live public CentOS Stream 10 mirror** over the internet:
```
linuxefi images/pxeboot/vmlinuz inst.repo=https://mirror.stream.centos.org/10-stream/BaseOS/x86_64/os/
```
Updated in both `grub.cfg` copies (`BOOT/` and `EFI/BOOT/`). This meant the Mac's HTTP server was no longer needed for package delivery at all — only TFTP (boot files) still mattered from that point forward, with the actual package installation happening straight from CentOS's real infrastructure over the target PC's normal internet connection.

Power-cycled the MinisForum, reran the PXE boot sequence from scratch (BOOTX64.EFI → GRUB → menu → vmlinuz/initrd → kernel → dracut), and this time it progressed cleanly to the **Anaconda graphical installer welcome/summary screen**.

---

## Step 10: The Installation Summary Screen — Getting the Destination Right

This was flagged as the single most important manual step in the entire process: **selecting the correct install target disk.**

`lsblk`-equivalent detection during boot had already shown two distinct drives:
- `sda` — the **SanDisk Extreme, 2.00 TB / 1.82 TiB** — the correct target
- `nvme0n1` — the **internal drive of the Windows PC**, with 4 existing partitions — must not be touched

Anaconda's Installation Summary initially showed "Automatic partitioning selected" without explicit confirmation of which disk, which is exactly the kind of ambiguity worth double-checking manually before proceeding, rather than trusting a default. After explicitly opening "Installation Destination" and confirming only the SanDisk SSD was selected (with the internal NVMe drive left untouched), the install was allowed to proceed.

Software selection was set to "Server with GUI." Given the network path involved (Wi-Fi → router → Ethernet, plus the earlier-observed 100Mbps link negotiation on the target's 2.5GbE NIC — likely a cabling/negotiation quirk rather than a fundamental limit), a full "Server with GUI" install was expected to take considerably longer than a Minimal install, since every package was being pulled live over the network from the CentOS mirror rather than from local media.

---

## Step 11: Successful Install and First Boot

The install completed successfully. First boot confirmed via GNOME Settings → About → System Details:

- **OS Name**: CentOS Stream 10 (Coughlan)
- **OS Type**: 64-bit
- **Kernel Version**: Linux 6.12.0-250.el10.x86_64
- **GNOME Shell**: 49.5
- **Windowing System**: Wayland
- **Hardware**: AMD Ryzen 7 255 w/ Radeon 780M Graphics, 32.0 GiB RAM

### One last false alarm: "Disk Capacity: 1.0 TB"
GNOME Settings' summary page displayed a disk capacity of only 1.0 TB, which looked wrong for a 2TB drive at first glance.

**Verification via terminal:**
```bash
lsblk
df -h
```
This confirmed the SanDisk (`sda`, 1.8T) was correctly and fully partitioned:
- `sda1` (600M) → `/boot/efi`
- `sda2` (2G) → `/boot`
- `sda3` (1.8T) → LVM physical volume, containing:
  - `cs-root` (70G) → `/`
  - `cs-swap` (14.6G) → swap
  - `cs-home` (1.7T) → `/home`

**Conclusion**: the full ~1.8TB (2TB drive's actual formatted capacity) was correctly allocated across the LVM volumes. The "1.0 TB" figure in GNOME Settings was simply reporting on the **internal `nvme0n1` drive** (953.9G, close to 1TB) rather than the boot/root disk — a display quirk of that particular settings panel in this unusual external-boot configuration, not an actual partitioning problem. `lsblk`/`df -h` were the reliable source of truth, and they confirmed everything was correct.

---

## Step 12: Cleanup

With the SanDisk SSD now a fully functional, portable CentOS Stream 10 workstation drive, the temporary PXE infrastructure on the Mac was torn down:

```bash
# Stop the background dnsmasq process
sudo pkill dnsmasq

# Stop the Python HTTP server
pkill -f "http.server 8080"

# Remove the wedged launchd service from earlier troubleshooting
sudo launchctl bootout system /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
sudo rm -f /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist

# Uninstall dnsmasq
brew uninstall dnsmasq

# Remove all working files
rm -rf ~/pxeboot

# Confirm nothing from the ISO troubleshooting is still mounted/attached
diskutil list | grep disk4
hdiutil detach /dev/disk4
```
And, since the macOS firewall had been temporarily checked/toggled during troubleshooting, confirmed it was restored to its normal state afterward.

---

## Full Timeline of Problems and Fixes (Quick Reference)

| # | Problem | Root Cause | Fix |
|---|---------|------------|-----|
| 1 | Wrong distro assumption | CentOS Linux discontinued | Used CentOS Stream 10 instead |
| 2 | Downloaded `dvd1.iso` | Wrong ISO type for netinstall | Used `boot.iso` instead |
| 3 | `hdiutil mount` failed | Hybrid ISO9660/GPT image macOS couldn't auto-mount | Used `hdiutil attach -nomount` + `mount -t cd9660` |
| 4 | dnsmasq wrong subnet | Guessed `192.168.1.0` instead of actual `192.168.0.0` | Corrected `dhcp-range` after checking `ifconfig` |
| 5 | `brew services start dnsmasq` errored | Stale foreground process still holding the socket | Killed zombie PIDs |
| 6 | Bootstrap I/O error on launchd | Wedged LaunchDaemon plist state | Bypassed launchd; ran `sudo dnsmasq` directly |
| 7 | TFTP directory permission denied | dnsmasq dropped privileges to a user that couldn't access the home folder | Added `user=root` to config |
| 8 | BBS menu showed only EFI Shell | LAN PXE Option ROM disabled | Enabled it in an Advanced/Onboard Devices BIOS submenu |
| 9 | Secure Boot blocked GRUB | Unsigned/manually-copied bootloader | Disabled Secure Boot in BIOS |
| 10 | PXE didn't work at all initially | Target PC was on Wi-Fi; PXE requires wired Ethernet | Ran an Ethernet cable from router to PC |
| 11 | "NBP filesize is 0 bytes" | TFTP permission denied on BOOTX64.EFI | `chmod -R 755` + `chown` on tftpboot directory |
| 12 | GRUB couldn't find `grub.cfg` | Files copied to `BOOT/` but GRUB expects `EFI/BOOT/` | Mirrored files into the correct `EFI/BOOT/` path |
| 13 | Install stalled 30+ minutes after kernel boot | `boot.iso`'s HTTP server had no real package repo, only boot files | Pointed `inst.repo` at the live CentOS Stream mirror instead |
| 14 | Ambiguous "Automatic partitioning selected" | Needed explicit confirmation of target disk | Manually verified `sda` (SanDisk) selected, `nvme0n1` (internal) excluded |
| 15 | GNOME reported "1.0 TB" disk capacity | Settings panel reporting on the wrong disk (`nvme0n1`, not `sda`) | Verified via `lsblk`/`df -h` that the full 1.8TB SanDisk was correctly allocated |

---

## Final Result

A 2TB SanDisk Extreme USB-C SSD, fully installed with CentOS Stream 10, using the entire drive capacity across `/boot/efi`, `/boot`, and an LVM layout (`/`, swap, `/home`) — bootable as a standalone, portable Linux workstation on any UEFI machine that supports USB boot, entirely built without ever needing a physical USB installer flash drive.

## The Timeline

The idea first came together around **10 PM on a Sunday night** — a casual "let's turn this SSD into a portable Linux drive" thought. What looked like a simple weekend project turned into a full-night troubleshooting session spanning ISO mounting quirks, a wedged macOS launchd service, BIOS/UEFI archaeology on unfamiliar firmware, Secure Boot, Wi-Fi-vs-Ethernet PXE limitations, and a stalled install caused by a fundamental misunderstanding of what `boot.iso` actually contains. By the time CentOS Stream 10 booted cleanly into GNOME with the full 2TB drive correctly partitioned, it was roughly **6 AM the next morning** — an eight-hour arc from idle curiosity to a working, portable workstation drive.

---

## The Right Process, Step by Step

Everything above documents the actual messy path, mistakes included. If you're trying to do this yourself, here's the clean version — the process knowing everything we learned along the way, with the missteps removed.

### Prerequisites
- A UEFI-based target PC, connected to your network via **Ethernet** (PXE does not work over Wi-Fi)
- A Mac (or any machine) on the same network/subnet to act as the PXE server
- The external SSD you want to install to, connected to the target PC
- Secure Boot access in the target PC's BIOS/UEFI

### Step 1: Pick your distro and download the right ISO
- Use **CentOS Stream 10** (or Rocky/AlmaLinux if you want a traditional stable RHEL rebuild instead — CentOS Linux itself is discontinued)
- Download the **`boot.iso`** (small netinstall image), not the full DVD ISO — get the **x86_64** build for AMD/Intel desktops and laptops (AMD64 and x86_64 are the same architecture)
- Verify the checksum against the official `SHA256SUM` file before proceeding

### Step 2: Mount the ISO on macOS correctly
```bash
hdiutil attach -nomount CentOS-Stream-10-*-boot.iso
diskutil list          # find the disk4sX partition holding the ISO9660 data
mkdir -p ~/pxeboot/iso_mount
sudo mount -t cd9660 -o ro /dev/disk4s1 ~/pxeboot/iso_mount
```

### Step 3: Copy the boot files into the correct TFTP layout
GRUB expects everything under `EFI/BOOT/`, so copy there directly — don't create a separate `BOOT/` folder:
```bash
mkdir -p ~/pxeboot/tftpboot/EFI/BOOT
mkdir -p ~/pxeboot/tftpboot/images/pxeboot
cp -r ~/pxeboot/iso_mount/EFI/BOOT/* ~/pxeboot/tftpboot/EFI/BOOT/
cp ~/pxeboot/iso_mount/images/pxeboot/vmlinuz ~/pxeboot/tftpboot/images/pxeboot/
cp ~/pxeboot/iso_mount/images/pxeboot/initrd.img ~/pxeboot/tftpboot/images/pxeboot/
sudo chmod -R 755 ~/pxeboot/tftpboot
sudo chown -R root:staff ~/pxeboot/tftpboot
sudo umount ~/pxeboot/iso_mount
hdiutil detach /dev/disk4
```

### Step 4: Write a `grub.cfg` that points at a real package repo, not your local machine
```bash
cat > ~/pxeboot/tftpboot/EFI/BOOT/grub.cfg << 'EOF'
set timeout=10
menuentry 'Install CentOS Stream 10' {
    linuxefi images/pxeboot/vmlinuz inst.repo=https://mirror.stream.centos.org/10-stream/BaseOS/x86_64/os/
    initrdefi images/pxeboot/initrd.img
}
EOF
```
Point `inst.repo` at a live internet mirror (not a local HTTP server) unless you've also mirrored the *entire* package tree locally — a `boot.iso`'s bundled `images/` folder alone is never enough to install from.

### Step 5: Install and configure dnsmasq (DHCP-proxy + TFTP), running it directly rather than via launchd
```bash
brew install dnsmasq
```
Config (`/opt/homebrew/etc/dnsmasq.conf`), matched to your actual subnet (check with `ifconfig | grep "inet "` first):
```
interface=en0
bind-interfaces
port=0
user=root
dhcp-range=192.168.0.0,proxy
dhcp-boot=EFI/BOOT/BOOTX64.EFI
enable-tftp
tftp-root=/Users/yourname/pxeboot/tftpboot
pxe-service=x86PC, "PXE Boot", EFI/BOOT/BOOTX64.EFI
```
Run it directly, skipping `brew services`/launchd entirely (simpler and more reliable for a one-off session):
```bash
sudo dnsmasq
ps aux | grep dnsmasq   # confirm it's alive and stays alive
```

### Step 6: Prepare the target PC's BIOS/UEFI
1. Connect it to the network via **Ethernet**, not Wi-Fi
2. Enter BIOS (commonly `Del`, `F2`, or `F10` depending on manufacturer)
3. **Disable Secure Boot**
4. Enable the network/LAN PXE Option ROM — often in an Advanced → Onboard Devices submenu, separate from the general boot-priority list
5. Save and exit

### Step 7: Boot from the network
1. Reboot, and hit the one-time boot menu key (`F7`, `F11`, `F12`, or `Esc` depending on manufacturer)
2. Select the PXE/network boot entry (e.g., "PXE IPv4 [NIC name]")
3. Watch your Mac's dnsmasq terminal — you should see DHCP negotiation and TFTP file transfers appear as it progresses through `BOOTX64.EFI` → `grub.cfg` → `vmlinuz`/`initrd.img`

### Step 8: Let the kernel boot and reach the install repo
Once the kernel and dracut initialize, it will reach out over the internet (not your Mac) to the `inst.repo` mirror URL to fetch the Anaconda installer environment and package metadata. This can take a minute or two.

### Step 9: Carefully select the correct install destination
On the Installation Summary screen, open **Installation Destination** and explicitly confirm:
- Your **external SSD** is selected (verify by size/model)
- Any **internal drive** is left unchecked

Choose "Minimal Install" under Software Selection if you want a faster install, or "Server with GUI" / a full desktop if you want it ready to use immediately (expect this to take significantly longer over a network install).

### Step 10: Begin installation and let it complete
Click "Begin Installation," set your root password/user account when prompted, and wait for it to finish. Reboot when done, removing network boot priority or Secure Boot changes as needed afterward.

### Step 11: Verify the install
From a terminal on the new system:
```bash
lsblk
df -h
```
Confirm the full capacity of your drive is allocated as expected across `/boot/efi`, `/boot`, and your `/`, swap, and `/home` volumes.

### Step 12: Clean up your PXE server
```bash
sudo pkill dnsmasq
brew uninstall dnsmasq
rm -rf ~/pxeboot
```
Re-enable any firewall settings you may have adjusted, and you're done — a fully portable, standalone Linux workstation drive, built without ever needing a physical USB installer.