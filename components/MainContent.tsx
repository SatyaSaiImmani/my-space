"use client";

import { useEffect } from "react";
import Image from "next/image";
import { projects } from "@/app/projects";
import ProjectCard from "@/components/ProjectCard";
import { experiences } from "@/app/experience";
import ExperienceCard from "@/components/ExperienceCard";
import EducationSection from "@/components/EducationSection";
import OutsideWorkSection from "@/components/OutsideWorkSection";
import { achievements } from "@/app/achievements";
import AchievementsSection from "@/components/AchievementsSection";
import { testimonials } from "@/app/testimonials";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";

export default function MainContent() {
  useEffect(() => {
    const sectionEls = document.querySelectorAll("section[id]");
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });
        let bestId = "";
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) { bestRatio = r; bestId = id; }
        });
        if (bestId) {
          window.dispatchEvent(
            new CustomEvent("sectionchange", { detail: bestId }),
          );
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    );
    sectionEls.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col">
      {/* HOME */}
      <section
        key="HOME"
        id="HOME"
        className="h-screen w-full flex items-center border-b border-gray-200 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="flex flex-col pb-16 pl-10 md:pl-16">
          <h1
            className="text-7xl md:text-8xl font-bold text-white leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Hi,
          </h1>
          <h1
            className="text-7xl md:text-8xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: "Georgia, serif" }}
          >
            I&apos;m Satya
          </h1>
          <a
            href="/SriSatyaSaiImmani-Resume.docx"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white text-sm tracking-widest w-fit hover:bg-green-800 transition-colors"
          >
            DOWNLOAD MY RESUME
            <Image
              src="/download.svg"
              width={16}
              height={16}
              alt="download"
              className="invert"
            />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section
        key="ABOUT"
        id="ABOUT"
        className="min-h-screen w-full flex items-center border-b border-gray-200"
      >
        <div className="px-12 md:px-24 lg:px-32 py-20">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
            ABOUT ME
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a] mb-10">
            WHO AM I?
          </h2>
          <p className="text-base text-[#3a3a3a] leading-relaxed text-justify mb-6">
            <strong>Hi, I&apos;m Satya - </strong> an AI Engineer building RAG
            pipelines, agentic systems, and applied machine learning, with a
            foundation in enterprise workflow automation. I work across the
            stack, but my instinct is always to start from the architecture.
          </p>
          <p className="text-base text-[#3a3a3a] leading-relaxed text-justify mb-6">
            I thrive developing products in a collaborative team and work
            efficiently solo. At Deloitte, I worked as a Software Analyst on
            the ServiceNow platform, building enterprise HR workflow
            automation and integrations that had to be observable,
            maintainable, and reliable at scale. I&apos;ve since applied that
            same discipline to generative AI systems at Case Western Reserve
            University - building RAG pipelines, agentic systems, and ML
            training workloads with Python, FastAPI, LangChain, and AWS on
            GPU/HPC clusters.
          </p>
          <p className="text-base text-[#3a3a3a] leading-relaxed text-justify">
            My goal is to build scalable and efficient systems with clean code
            and clear intent. I see product as a group of delicate processes
            serving user needs but not as a collection of features or
            technologies. Technologies can be learned. The thinking behind good
            architecture stays constant.
          </p>
          <span className="flex mt-10 gap-5">
            <Image
              src="/deloitte-logo.svg"
              width={160}
              height={160}
              alt="Deloitte Logo"
            />
            <Image
              src="/cwru-logo.png"
              width={160}
              height={160}
              alt="CWRU Logo"
            />
          </span>
        </div>
      </section>

      {/* MY WORK */}
      <section
        key="MY WORK"
        id="MY WORK"
        className="h-full w-full flex flex-col border-b border-gray-200"
      >
        <div className="px-12 md:px-24 lg:px-32 py-20 flex flex-col gap-10">
          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              MY WORK
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a] mb-4">
              FEATURED PROJECTS
            </h2>
            <p className="text-base text-[#3a3a3a]">
              These are some of my featured projects. To view more,{" "}
              <a
                href="https://github.com/SatyaSaiImmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:underline underline-offset-4 inline-flex items-center gap-1"
              >
                see all of my projects
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        key="TESTIMONIALS"
        id="TESTIMONIALS"
        className="h-full w-full flex flex-col border-b border-gray-200"
      >
        <div className="px-12 md:px-24 lg:px-32 py-20 flex flex-col gap-10">
          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              TESTIMONIALS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a]">
              WHAT PEOPLE SAY
            </h2>
          </div>
          <TestimonialsSection testimonials={testimonials} />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        key="EXPERIENCE"
        id="EXPERIENCE"
        className="min-h-screen w-full flex flex-col border-b border-gray-200"
      >
        <div className="px-12 md:px-24 lg:px-32 py-20 flex flex-col gap-10">
          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              EXPERIENCE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a]">
              WHERE I&apos;VE WORKED
            </h2>
          </div>

          <div className="relative flex flex-col gap-12 pl-6 border-l-2 border-gray-200">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        key="EDUCATION"
        id="EDUCATION"
        className="h-full w-full flex flex-col border-b border-gray-200"
      >
        <div className="px-12 md:px-24 lg:px-32 py-20 flex flex-col gap-10">
          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              EDUCATION
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a]">
              WHERE I&apos;VE STUDIED
            </h2>
          </div>
          <EducationSection />
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section
        key="ACHIEVEMENTS"
        id="ACHIEVEMENTS"
        className="h-full w-full flex flex-col border-b border-gray-200"
      >
        <div className="px-12 md:px-24 lg:px-32 py-20 flex flex-col gap-10">
          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              ACHIEVEMENTS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a]">
              MILESTONES
            </h2>
          </div>
          <AchievementsSection achievements={achievements} />
        </div>
      </section>

      {/* OUTSIDE WORK
      <section
        key="OUTSIDE WORK"
        id="OUTSIDE WORK"
        className="h-full w-full flex flex-col border-b border-gray-200"
      >
        <div className="px-12 md:px-24 lg:px-32 py-20 flex flex-col gap-10">
          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              OUTSIDE WORK
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a]">
              LIFE OUTSIDE THE SCREEN
            </h2>
          </div>
          <OutsideWorkSection />
        </div>
      </section> */}

      {/* CONTACT */}
      <section
        key="CONTACT"
        id="CONTACT"
        className="h-full w-full flex flex-col items-center justify-center border-b border-gray-200"
      >
        <div className="w-full max-w-lg px-8 py-20 flex flex-col gap-10">
          <div className="text-center">
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              CONTACT
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a]">
              GET IN TOUCH
            </h2>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
