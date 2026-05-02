import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";

const sections = [
  "HOME",
  "ABOUT",
  "MY WORK",
  "TESTIMONIALS",
  "EXPERIENCE",
  "EDUCATION",
  "ACHIEVEMENTS",
  // "OUTSIDE WORK",
  "CONTACT",
];

const socials: Record<string, string> = {
  github: "https://github.com/SatyaSaiImmani",
  linkedin: "https://www.linkedin.com/in/immanisrisatyasai/",
  twitter: "https://x.com/ImmaniSri",
};

export default function Home() {
  return (
    <div className="Screen">
      <section className="main-screen flex flex-row w-screen h-screen overflow-hidden">
        <Navbar sections={sections} socials={socials} />

        {/* Main Screen */}
        <section className="body w-full lg:w-4/5 overflow-y-auto scroll-smooth">
          <MainContent />
        </section>
      </section>
    </div>
  );
}
