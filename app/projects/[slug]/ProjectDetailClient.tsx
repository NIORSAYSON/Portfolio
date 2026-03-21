"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, ChevronUp, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CARD_BASE, SECTION_HEADER_CLASS, SECTION_TITLE_CLASS } from "@/lib/styles";
import ProjectOverview from "@/components/ProjectOverview";
import type { CmsProject } from "@/lib/types/cms";

type Props = {
  project: CmsProject;
  otherProjects: CmsProject[];
  isMobile: boolean;
};

export default function ProjectDetailClient({
  project,
  otherProjects,
  isMobile,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const PREVIEW_COUNT = 8;

  useEffect(() => {
    setMounted(true);
  }, []);

  const projectLink =
    project.projectLink && project.projectLinkName
      ? { link: project.projectLink, linkName: project.projectLinkName }
      : undefined;

  return (
    <main className="min-h-screen w-full">
      <div className="grid grid-cols-1 xl:grid-cols-9 w-full min-h-screen gap-5 p-5 pt-16 md:pt-5">

        {/* ── Left: Gallery + About tabs ─────────────────────── */}
        <ProjectOverview
          projectName={project.title}
          projectSubtitle={project.subtitle}
          projectDescription={project.description}
          projectCategories={project.categories}
          projectDuration={project.duration}
          projectLink={projectLink}
          projectTools={project.tools}
          projectImages={project.images.map((img) => img.url)}
          isMobile={isMobile}
        />

        {/* ── Right: Other Projects ──────────────────────────── */}
        {mounted && otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="xl:col-span-3 w-full">
            <div className={`${CARD_BASE} mb-5`}>
              <div className={SECTION_HEADER_CLASS}>
                <LayoutGrid className="w-4 h-4 text-text-muted" />
                <span className={SECTION_TITLE_CLASS}>Other Projects</span>
              </div>
              <div className="px-4 pb-2 flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {(showAll ? otherProjects : otherProjects.slice(0, PREVIEW_COUNT)).map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="group flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-200">
                        {/* Thumbnail */}
                        {(p.mockup ?? p.images[0]) && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-border shrink-0 bg-snbackground">
                            <Image
                              src={(p.mockup?.url ?? p.images[0]?.url)!}
                              alt={p.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-accent transition-colors duration-200 leading-snug">
                            {p.title}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {p.tools.slice(0, 3).map((tool, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-snbackground border border-border text-text-muted">
                                {tool}
                              </span>
                            ))}
                            {p.tools.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-snbackground border border-border text-text-muted">
                                +{p.tools.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-muted shrink-0 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* View more / less toggle */}
              {otherProjects.length > PREVIEW_COUNT && (
                <div className="px-4 pb-4 pt-1 border-t border-border">
                  <button
                    onClick={() => setShowAll((v) => !v)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-text-muted hover:text-accent transition-colors duration-200">
                    {showAll ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        View less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" />
                        View {otherProjects.length - PREVIEW_COUNT} more
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </main>
  );
}
