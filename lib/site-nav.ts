export interface NavItem {
  label: string;
  href: string;
}

export const navLinks: NavItem[] = [
  { label: "HOME", href: "/#HOME" },
  { label: "ABOUT", href: "/#ABOUT" },
  { label: "MY WORK", href: "/#MY WORK" },
  { label: "TESTIMONIALS", href: "/#TESTIMONIALS" },
  { label: "EXPERIENCE", href: "/#EXPERIENCE" },
  { label: "EDUCATION", href: "/#EDUCATION" },
  { label: "ACHIEVEMENTS", href: "/#ACHIEVEMENTS" },
  // { label: "OUTSIDE WORK", href: "/#OUTSIDE WORK" },
  { label: "ARTICLES", href: "/articles" },
  { label: "CONTACT", href: "/#CONTACT" },
];

export const socials: Record<string, string> = {
  github: "https://github.com/SatyaSaiImmani",
  linkedin: "https://www.linkedin.com/in/immanisrisatyasai/",
  twitter: "https://x.com/ImmaniSri",
};
