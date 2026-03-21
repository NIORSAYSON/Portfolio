"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import {
  Bot,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Figma,
  Github,
  Mail,
  Pin,
  Smartphone,
  UserCheck,
  Workflow,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SkillsTicker from "@/components/SkillsTicker";
import { skillIcons1, skillIcons2, typewriterTexts } from "../constants";
import Accordion from "@/components/Accordion";
import ContributionCalendar from "@/components/GithubContributions";
import { useTheme } from "next-themes";
import SocialMedia from "@/components/SocialMedia";
import Link from "next/link";
import {
  CARD_BASE,
  SECTION_HEADER_CLASS,
  SECTION_TITLE_CLASS,
} from "@/lib/styles";
import type { CmsProject } from "@/lib/types/cms";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Props = {
  featuredProjects: CmsProject[];
};

export default function HomeClient({ featuredProjects }: Props) {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<false | number>(0);
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentSentence, setCurrentSentence] = useState(0);
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isDark = mounted && theme === "dark";

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

  useEffect(() => {
    const today = new Date();
    setDay(today.toLocaleDateString(undefined, { weekday: "long" }));
    setDate(
      today.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  useEffect(() => {
    let current = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(typewriterTexts[currentSentence].slice(0, current + 1));
      current++;
      if (current === typewriterTexts[currentSentence].length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentSentence((prev) => (prev + 1) % typewriterTexts.length);
        }, 1500);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentSentence]);

  return (
    <main className="min-h-screen w-full">
      <div className="grid grid-cols-1 xl:grid-cols-6 w-full min-h-screen gap-4 p-4 pt-16 md:pt-5 md:gap-5 md:p-5">
        {/* Left Column */}
        <div className="xl:col-span-4 w-full flex flex-col gap-5">
          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${CARD_BASE} overflow-hidden`}>
            <div className="relative w-full h-[38vh] min-h-[220px]">
              <Image
                src="/Home Background.png"
                alt="Home Background"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)",
                }}>
                <div className="absolute top-4 left-5 text-white/70 text-xs font-medium">
                  {day && date ? (
                    <>
                      {day.slice(0, 3)}, {date}
                    </>
                  ) : null}
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                  <motion.h1
                    className={`text-white text-2xl sm:text-3xl font-semibold leading-tight ${plusJakarta.className}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    {displayedText}
                    <span className="animate-pulse opacity-70">|</span>
                  </motion.h1>
                  <div className="flex gap-3 mt-4">
                    <Link
                      href="/projects"
                      className="text-sm font-semibold px-5 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-200">
                      View Projects
                    </Link>
                    <Link
                      href="/chat"
                      className="text-sm font-medium px-5 py-2 rounded-lg bg-transparent text-white border border-white/50 hover:bg-white/10 transition-all duration-200">
                      Chat with Me
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pinned Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${CARD_BASE} text-text`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Pin
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Pinned Projects</span>
            </div>
            <div className="px-5 relative pb-4">
              {canScrollLeft && (
                <button
                  onClick={() => scrollProjects("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-sbackground border border-border rounded-full w-8 h-8 flex items-center justify-center hover:border-accent transition-all duration-200"
                  aria-label="Scroll left">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <div
                ref={projectsScrollRef}
                className="hide-scrollbar flex h-[270px] w-full items-start justify-start overflow-x-auto">
                <div className="flex flex-nowrap gap-4">
                  {featuredProjects
                    .filter((p) => p.mockup?.url || p.images[0]?.url)
                    .map((project) => (
                      <ProjectCard
                        key={project.id}
                        title={project.title}
                        subtitle={project.subtitle}
                        image={(project.mockup?.url ?? project.images[0]?.url)!}
                        description={project.description}
                        slug={project.slug}
                        source="/"
                      />
                    ))}
                </div>
              </div>
              {canScrollRight && featuredProjects.length > 0 && (
                <button
                  onClick={() => scrollProjects("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-sbackground border border-border rounded-full w-8 h-8 flex items-center justify-center hover:border-accent transition-all duration-200"
                  aria-label="Scroll right">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${CARD_BASE} text-text pb-4`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Github
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>GitHub Contributions</span>
            </div>
            <div className="px-5">
              <ContributionCalendar />
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-2 w-full flex flex-col gap-5 text-text">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`${CARD_BASE} pb-4`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Cpu
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Tech Stack</span>
            </div>
            <div className="px-5 mt-2">
              <div className="w-full h-[200px] overflow-hidden MyGradient">
                <SkillsTicker images={skillIcons1} direction="left" duration={30} />
                <SkillsTicker images={skillIcons2} direction="right" duration={30} />
              </div>
            </div>
          </motion.div>

          {/* Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`${CARD_BASE} text-text pb-5`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <UserCheck
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Expertise</span>
            </div>
            <div className="px-5 mt-3">
              <Accordion i={0} expanded={expanded} setExpanded={setExpanded} accordionTitle="Web Development" icon={<Code2 className="w-4 h-4" color={isDark ? "#f0f0f0" : "#0a0a0a"} />}>
                <p className="text-sm text-text-muted px-1 py-2 leading-relaxed">I specialize in front-end web development, building responsive and user-friendly websites using modern technologies. I focus on clean, interactive interfaces and integrating APIs.</p>
              </Accordion>
              <Accordion i={1} expanded={expanded} setExpanded={setExpanded} accordionTitle="Machine Learning" icon={<BrainCircuit className="w-4 h-4" color={isDark ? "#f0f0f0" : "#0a0a0a"} />}>
                <p className="text-sm text-text-muted px-1 py-2 leading-relaxed">I explore machine learning by building models that analyze data, recognize patterns, and make predictions using Python and popular ML libraries.</p>
              </Accordion>
              <Accordion i={2} expanded={expanded} setExpanded={setExpanded} accordionTitle="Large Language Models" icon={<Bot className="w-4 h-4" color={isDark ? "#f0f0f0" : "#0a0a0a"} />}>
                <p className="text-sm text-text-muted px-1 py-2 leading-relaxed">I work with LLMs and use Retrieval-Augmented Generation (RAG) to build context-aware applications, combining models with external knowledge sources.</p>
              </Accordion>
              <Accordion i={3} expanded={expanded} setExpanded={setExpanded} accordionTitle="Mobile Development" icon={<Smartphone className="w-4 h-4" color={isDark ? "#f0f0f0" : "#0a0a0a"} />}>
                <p className="text-sm text-text-muted px-1 py-2 leading-relaxed">I build cross-platform mobile apps using React Native and Expo, delivering smooth native experiences on both iOS and Android from a single codebase.</p>
              </Accordion>
              <Accordion i={4} expanded={expanded} setExpanded={setExpanded} accordionTitle="AI Automation" icon={<Workflow className="w-4 h-4" color={isDark ? "#f0f0f0" : "#0a0a0a"} />}>
                <p className="text-sm text-text-muted px-1 py-2 leading-relaxed">I design and build automated workflows using tools like n8n and Zapier, connecting apps and AI models to streamline repetitive tasks and power intelligent pipelines.</p>
              </Accordion>
              <Accordion i={5} expanded={expanded} setExpanded={setExpanded} accordionTitle="UI/UX Design" icon={<Figma className="w-4 h-4" color={isDark ? "#f0f0f0" : "#0a0a0a"} />}>
                <p className="text-sm text-text-muted px-1 py-2 leading-relaxed">I design clean, easy-to-use interfaces, focusing on smooth and enjoyable user experiences across websites and apps.</p>
              </Accordion>
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`${CARD_BASE} text-text pb-5`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Mail
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
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
