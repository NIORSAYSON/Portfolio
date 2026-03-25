"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { aboutText, skillCategories } from "@/app/constants";
import { Download, GraduationCap, Layers, UserCheck } from "lucide-react";
import { useTheme } from "next-themes";
import ExpAndEduc from "@/components/ExpAndEduc";
import { AnimatePresence, motion } from "framer-motion";
import {
  CARD_BASE,
  SECTION_HEADER_CLASS,
  SECTION_TITLE_CLASS,
} from "@/lib/styles";
import type { CmsExperience } from "@/lib/types/cms";

type Props = {
  experiences: CmsExperience[];
  education: CmsExperience[];
};

export default function AboutClient({ experiences, education }: Props) {
  const allItems = useMemo(
    () => [...experiences, ...education],
    [experiences, education],
  );

  const [showMore, setShowMore] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { about: false };
    for (const item of allItems) {
      initial[item.id] = false;
    }
    return initial;
  });

  const getShortText = (text: string, length: number = 160) =>
    text.slice(0, length) + (text.length > length ? "..." : "");

  const aboutMeShortText = getShortText(aboutText);

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";

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
            className={`${CARD_BASE} overflow-hidden text-text`}>
            {/* Banner */}
            <div className="relative h-36 w-full">
              {/* Light cover — base layer */}
              <Image
                src="/About Light Cover.png"
                alt="Banner Light"
                fill
                className="object-cover"
                priority
              />
              {/* Dark cover — crossfades in over light cover in dark mode */}
              <Image
                src="/About Dark Cover.png"
                alt="Banner Dark"
                fill
                className="object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: isDark ? 1 : 0 }}
                priority
              />
              <div
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  background: isDark
                    ? "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)"
                    : "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.25) 100%)",
                }}
              />
            </div>
            {/* Profile */}
            <div className="px-5 pb-5">
              <div className="relative z-10 -mt-8 mb-3">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-sbackground border border-border">
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-base font-semibold">
                    Nestor B. Sayson Jr.
                  </h2>
                  <p className="text-sm text-text-muted">Software Engineer</p>
                </div>
                {mounted && (
                  <a
                    href="/SAYSON RESUME 2026 - Software Engineer.pdf"
                    download
                    className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-accent/50 text-accent hover:bg-accent hover:text-white transition-all duration-200">
                    <Download className="w-3.5 h-3.5" />
                    Download CV
                  </a>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">About Me</h3>
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={showMore.about ? "full" : "short"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-text-muted leading-relaxed inline whitespace-pre-line">
                    {showMore.about ? aboutText : aboutMeShortText}
                  </motion.span>
                </AnimatePresence>
                <button
                  className="ml-1.5 text-xs text-accent hover:underline font-medium inline-block"
                  onClick={() =>
                    setShowMore((prev) => ({ ...prev, about: !prev.about }))
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
            className={`${CARD_BASE} text-text`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <UserCheck
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Experience</span>
            </div>
            <div className="mt-2">
              {experiences.map((exp) => (
                <ExpAndEduc
                  key={exp.id}
                  showMore={showMore[exp.id] ?? false}
                  setShowMore={(value: boolean) =>
                    setShowMore((prev) => ({ ...prev, [exp.id]: value }))
                  }
                  descText={exp.description}
                  shortDescText={getShortText(exp.description)}
                  image={exp.logo.url}
                  title={exp.title}
                  subtitle={exp.subtitle}
                  date={exp.date}
                />
              ))}
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
            className={CARD_BASE}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <GraduationCap
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Education</span>
            </div>
            <div className="mt-2">
              {education.map((edu) => (
                <ExpAndEduc
                  key={edu.id}
                  showMore={showMore[edu.id] ?? false}
                  setShowMore={(value: boolean) =>
                    setShowMore((prev) => ({ ...prev, [edu.id]: value }))
                  }
                  descText={edu.description}
                  shortDescText={getShortText(edu.description)}
                  image={edu.logo.url}
                  title={edu.title}
                  subtitle={edu.subtitle}
                  date={edu.date}
                  gwa={edu.gwa ?? undefined}
                  isCollege={edu.isCollege}
                  competitions={edu.competitons ?? undefined}
                />
              ))}
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={CARD_BASE}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Layers
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Skills</span>
            </div>
            <div className="px-5 pb-5 pt-3 flex flex-col gap-5">
              {skillCategories.map((category) => (
                <div key={category.name}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-2.5">
                    {category.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.title}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-snbackground border border-border text-xs font-medium hover:border-accent/40 transition-colors duration-200">
                        <Image
                          src={skill.src}
                          alt={skill.title}
                          width={16}
                          height={16}
                          className="object-contain shrink-0"
                        />
                        <span>{skill.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
