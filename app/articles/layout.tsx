import Navbar from "@/components/Navbar";
import { navLinks, socials } from "@/lib/site-nav";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="Screen">
      <section className="main-screen flex flex-row w-screen h-screen overflow-hidden">
        <Navbar navItems={navLinks} socials={socials} />

        <section className="body w-full lg:w-4/5 overflow-y-auto scroll-smooth">
          {children}
        </section>
      </section>
    </div>
  );
}
