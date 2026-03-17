"use client";
import { MaterialSymbolsLightInfoOutlineRounded } from "@/app/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ProjectOverview from "@/components/ProjectOverview";
import ProjectsSection from "@/components/ProjectsSection";
import { projects } from "@/app/constants";
import { AnimatePresence, motion } from "framer-motion";

export default function MyPortfolio() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [showMore, setShowMore] = useState<{
    description: boolean;
  }>({ description: false });

  useEffect(() => {
    setMounted(true);
  }, []);
  const current = projects.find((p) => p.slug === "vibenode");
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
        />

        {/* Left Column */}
        <div className="xl:col-span-3 w-full text-text flex flex-col gap-5">
          {/* About Section */}
          <div className="bg-sbackground border border-border rounded-2xl text-text">
            <div className="px-5 pt-5 pb-2 flex items-center gap-2">
              {mounted && (
                <MaterialSymbolsLightInfoOutlineRounded
                  className="w-5 h-5"
                  fill={mounted && theme === "dark" ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className="text-[15px] font-semibold tracking-wide uppercase text-text-muted">
                About
              </span>
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
                className="ml-1.5 text-xs text-[--navtext] hover:underline font-medium inline-block"
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
