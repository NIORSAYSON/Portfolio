"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  aboutText,
  agentGeniusDescText,
  collegeText,
  freelanceDescText,
  internshipText,
  juniorHighText,
  seniorHighText,
  skillCategories,
} from "@/app/constants";
import { Download, GraduationCap, Layers, UserCheck } from "lucide-react";
import { useTheme } from "next-themes";
import ExpAndEduc from "@/components/ExpAndEduc";
import { AnimatePresence, motion } from "framer-motion";
import {
  CARD_BASE,
  SECTION_HEADER_CLASS,
  SECTION_TITLE_CLASS,
} from "@/lib/styles";

export default function About() {
  const [showMore, setShowMore] = useState<{
    about: boolean;
    internship: boolean;
    agentGenius: boolean;
    freelance: boolean;
    college: boolean;
    seniorHigh: boolean;
    juniorHigh: boolean;
  }>({
    about: false,
    internship: false,
    agentGenius: false,
    freelance: false,
    college: false,
    seniorHigh: false,
    juniorHigh: false,
  });

  const getShortText = (text: string, length: number = 160) =>
    text.slice(0, length) + (text.length > length ? "..." : "");

  const aboutMeShortText = getShortText(aboutText);
  const internshipShortText = getShortText(internshipText);
  const agentGeniusDescShortText = getShortText(agentGeniusDescText);
  const freelanceDescShortText = getShortText(freelanceDescText);
  const collegeShortText = getShortText(collegeText);
  const juniorHighShortText = getShortText(juniorHighText);
  const seniorHighShortText = getShortText(seniorHighText);
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
                    href="/Nestor B. Sayson Jr - Resume 2025.pdf"
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
              <ExpAndEduc
                showMore={showMore.agentGenius}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, agentGenius: value }))
                }
                descText={agentGeniusDescText}
                shortDescText={agentGeniusDescShortText}
                image="/exp-logo/AG-Logo.png"
                title="AI Automation Engineer"
                subtitle="AgentGenius.ai"
                date="Aug 2025 - Present"
              />
              <ExpAndEduc
                showMore={showMore.freelance}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, freelance: value }))
                }
                descText={freelanceDescText}
                shortDescText={freelanceDescShortText}
                image="/exp-logo/freelance-logo.png"
                title="Independent Software Engineer"
                subtitle="Freelance"
                date="Jun 2025 - Present"
              />
              <ExpAndEduc
                showMore={showMore.internship}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, internship: value }))
                }
                descText={internshipText}
                shortDescText={internshipShortText}
                image="/exp-logo/i7-No BG.png"
                title="Front-End Developer Intern"
                subtitle="Intelliseven Technology Solutions Inc."
                date="Mar 2025 - Jun 2025"
              />
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
              <ExpAndEduc
                showMore={showMore.college}
                setShowMore={(value: boolean) =>
                  setShowMore((prev) => ({ ...prev, college: value }))
                }
                descText={collegeText}
                shortDescText={collegeShortText}
                image="/educ-logo/CSPC.png"
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
                image="/educ-logo/LICOM-No BG.png"
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
                image="/educ-logo/LAIHS-No BG.png"
                title="Computer System and Services"
                subtitle="Libon Agro Industrial High School"
                date="July 2015 - Jun 2019"
              />
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
                  {/* Expertise label */}
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-2.5">
                    {category.name}
                  </p>
                  {/* Skill pills */}
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

