"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  aboutText,
  collegeText,
  internshipText,
  juniorHighText,
  projects,
  seniorHighText,
} from "@/app/constants";
import {
  BiPersonCheck,
  CilEducation,
  MaterialSymbolsLightMailOutline,
  MdiLightPin,
} from "../icons";
import SocialMedia from "@/components/SocialMedia";
import { useTheme } from "next-themes";
import ProjectCard from "@/components/ProjectCard";
import ExpAndEduc from "@/components/ExpAndEduc";
import { motion } from "framer-motion";

const SECTION_HEADER_CLASS = "flex items-center gap-2 px-5 pt-5 pb-1";
const SECTION_TITLE_CLASS =
  "text-[15px] font-semibold tracking-wide uppercase text-text-muted";

export default function About() {
  const [showMore, setShowMore] = useState<{
    about: boolean;
    internship: boolean;
    college: boolean;
    seniorHigh: boolean;
    juniorHigh: boolean;
  }>({
    about: false,
    internship: false,
    college: false,
    seniorHigh: false,
    juniorHigh: false,
  });

  const getShortText = (text: string, length: number = 160) =>
    text.slice(0, length) + (text.length > length ? "..." : "");

  const aboutMeShortText = getShortText(aboutText);
  const internshipShortText = getShortText(internshipText);
  const collegeShortText = getShortText(collegeText);
  const juniorHighShortText = getShortText(juniorHighText);
  const seniorHighShortText = getShortText(seniorHighText);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = projectsScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollProjects = (direction: "left" | "right") => {
    if (projectsScrollRef.current) {
      projectsScrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = projectsScrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen w-full">
      <div className="grid grid-cols-1 xl:grid-cols-9 w-full min-h-screen gap-4 p-4 pt-16 md:pt-5 md:gap-5 md:p-5">
        {/* Left Column */}
        <div className="xl:col-span-5 w-full flex flex-col gap-5">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-sbackground border border-border rounded-2xl overflow-hidden text-text">
            {/* Banner */}
            <div className="relative h-36 w-full">
              <Image
                src="/Home Background.png"
                alt="Banner"
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </div>
            {/* Profile */}
            <div className="px-5 pb-5">
              <div className="flex items-end gap-4 -mt-8 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-sbackground border border-border shrink-0">
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="pb-1">
                  <h2 className="text-base font-semibold">
                    Nestor B. Sayson Jr.
                  </h2>
                  <p className="text-sm text-text-muted">Front-End Developer</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">About Me</h3>
                <p className="text-sm text-text-muted leading-relaxed inline">
                  {showMore.about ? aboutText : aboutMeShortText}
                </p>
                <button
                  className="ml-1.5 text-xs text-[--navtext] hover:underline font-medium"
                  onClick={() =>
                    setShowMore((prev) => ({
                      ...prev,
                      about: !prev.about,
                    }))
                  }>
                  {showMore.about ? "Show less" : "Show more"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-sbackground border border-border rounded-2xl text-text">
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <BiPersonCheck
                  className="w-5 h-5"
                  fill={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Experience</span>
            </div>
            <div className="mt-2">
              <ExpAndEduc
                showMore={showMore.internship}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, internship: value }))
                }
                descText={internshipText}
                shortDescText={internshipShortText}
                image="/i7-No BG.png"
                title="Front-End Developer Intern"
                subtitle="Intelliseven Technology Solutions Inc."
                date="Mar 2025 - Jun 2025"
              />
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-sbackground border border-border rounded-2xl text-text pb-4">
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <MdiLightPin
                  className="w-5 h-5"
                  fill={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Projects</span>
            </div>
            <div className="px-5 relative">
              {canScrollLeft && (
                <button
                  onClick={() => scrollProjects("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-sbackground border border-border rounded-full w-8 h-8 flex items-center justify-center hover:border-[--navtext] transition-all duration-200"
                  aria-label="Scroll left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
              )}
              <div ref={projectsScrollRef} className="hide-scrollbar flex h-[320px] w-full items-start justify-start overflow-x-auto">
                <div className="flex flex-nowrap gap-4 items-center">
                  <ProjectCard title={projects[0].title} subtitle="Personal Project" image="/Projects/Portfolio.png" description={projects[0].description} slug={projects[0].slug} link="https://niorsayson.vercel.app/" source="/about" />
                  <ProjectCard title={projects[1].title} subtitle="Internship Project" image="/Projects/POS.png" description={projects[1].description} slug={projects[1].slug} source="/about" />
                  <ProjectCard title={projects[2].title} subtitle="Thesis Project" image="/Projects/Conversational Agent Project.png" description={projects[2].description} slug={projects[2].slug} link="https://huggingface.co/spaces/Nioooor/CSPC_Conversational_Agent" source="/about" />
                  <ProjectCard title={projects[5].title} subtitle="HCI Project" image="/Projects/SIAS Project.png" description={projects[5].description} slug={projects[5].slug} link="https://niorsayson.github.io/SIAS-Online-Portal-Redesign/" source="/about" />
                  <ProjectCard title={projects[6].title} subtitle="Modeling & Simulation" image="/Projects/Modeling and Simulation Project.png" description={projects[6].description} slug={projects[6].slug} link="https://synthetic-data-generator-sayson.streamlit.app/Synthetic_Data_Generator" source="/about" />
                  <ProjectCard title={projects[7].title} subtitle="Applied Cryptography" image="/Projects/Cryptographic App Project.png" description={projects[7].description} slug={projects[7].slug} link="https://saysonnior-cs3b.streamlit.app/" source="/about" />
                </div>
              </div>
              {canScrollRight && (
                <button
                  onClick={() => scrollProjects("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-sbackground border border-border rounded-full w-8 h-8 flex items-center justify-center hover:border-[--navtext] transition-all duration-200"
                  aria-label="Scroll right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 w-full flex flex-col gap-5 text-text">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-sbackground border border-border rounded-2xl">
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <CilEducation
                  className="w-5 h-5"
                  fill={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Education</span>
            </div>
            <div className="mt-2">
              <ExpAndEduc
                showMore={showMore.college}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, college: value }))
                }
                descText={collegeText}
                shortDescText={collegeShortText}
                image="/CSPC.png"
                title="BS in Computer Science"
                subtitle="Camarines Sur Polytechnic Colleges"
                date="Aug 2021 - Jul 2025"
                gwa="GWA: 1.3103"
                isCollege={true}
              />
              <ExpAndEduc
                showMore={showMore.seniorHigh}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, seniorHigh: value }))
                }
                descText={seniorHighText}
                shortDescText={seniorHighShortText}
                image="/LICOM-No BG.png"
                title="General Academic Strand (GAS)"
                subtitle="Libon Community Colleges (SHS)"
                date="Aug 2019 - Jun 2021"
              />
              <ExpAndEduc
                showMore={showMore.juniorHigh}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, juniorHigh: value }))
                }
                descText={juniorHighText}
                shortDescText={juniorHighShortText}
                image="/LAIHS-No BG.png"
                title="Computer System and Services"
                subtitle="Libon Agro Industrial High School"
                date="July 2015 - Jun 2019"
              />
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-sbackground border border-border rounded-2xl pb-5">
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <MaterialSymbolsLightMailOutline
                  className="w-5 h-5"
                  fill={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Connect</span>
            </div>
            <div className="px-5 mt-2">
              <SocialMedia />
              <p className="text-center text-xs text-text-muted leading-relaxed mt-2">
                Let&rsquo;s create something amazing — reach out through any
                platform above.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
