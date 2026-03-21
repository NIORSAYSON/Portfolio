"use client";
import { Info } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ProjectOverview from "@/components/ProjectOverview";
import ProjectsSection from "@/components/ProjectsSection";
import { projects } from "@/app/constants";
import { AnimatePresence, motion } from "framer-motion";
import { CARD_BASE, SECTION_HEADER_CLASS, SECTION_TITLE_CLASS } from "@/lib/styles";

export default function MyPortfolio() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [showMore, setShowMore] = useState<{
    description: boolean;
  }>({ description: false });

  useEffect(() => {
    setMounted(true);
  }, []);
  const current = projects.find((p) => p.slug === "agrimarket");
  if (!current) return <div>Project not found</div>;

  return (
    <main className="min-h-screen w-full">
      <div className="grid grid-cols-1 xl:grid-cols-9 w-full min-h-screen gap-5 p-5 pt-16 md:pt-5">
        {/* Right Column */}
        <ProjectOverview
          projectName={current.title}
          projectSubtitle={current.subtitle}
          projectLink={current.projectLink}
          projectTools={current.tools}
          projectImages={current.projectImages}
          isMobile={true}
        />

        {/* Left Column */}
        <div className="xl:col-span-3 w-full text-text flex flex-col gap-5">
          {/* About Section */}
          <div className={`${CARD_BASE} text-text`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Info
                  className="w-5 h-5"
                  color={mounted && theme === "dark" ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>About</span>
            </div>
            <div className="px-5 pb-5 text-sm leading-relaxed">
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={showMore.description ? "full" : "short"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-text-muted leading-relaxed inline whitespace-pre-line">
                  {showMore.description
                    ? current.description
                    : current.description.substring(0, 500) + "..."}
                </motion.span>
              </AnimatePresence>

              <button
                className="ml-1.5 text-xs text-accent hover:underline font-medium inline-block"
                onClick={() =>
                  setShowMore((prev) => ({
                    ...prev,
                    description: !prev.description,
                  }))
                }>
                {showMore.description ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
          {/* Other Sections */}
          <ProjectsSection currentProjectSlug={current.slug} />
        </div>
      </div>
    </main>
  );
}

