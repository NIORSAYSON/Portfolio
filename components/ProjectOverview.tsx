"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MobileDeviceFrame from "./MobileDeviceFrame";
import { CARD_BASE } from "@/lib/styles";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Github,
  Images,
  Info,
  LayoutGrid,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectOverviewProps {
  projectName: string;
  projectSubtitle: string;
  projectDescription: string;
  projectCategories: string[];
  projectDuration: string | null;
  projectLink?: { link: string; linkName: string };
  projectTools: string[];
  projectImages: string[];
  isMobile?: boolean;
}

type Tab = "gallery" | "about";

export default function ProjectOverview({
  projectName,
  projectSubtitle,
  projectDescription,
  projectCategories,
  projectDuration,
  projectLink,
  projectTools,
  projectImages,
  isMobile,
}: ProjectOverviewProps) {
  const [sourcePage, setSourcePage] = useState("/projects");
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("gallery");
  const thumbsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isGithub = projectLink?.link.includes("github.com") ?? false;
  const total = projectImages.length;

  useEffect(() => {
    const stored = localStorage.getItem("projectSourcePage");
    if (stored) setSourcePage(stored);
  }, []);

  useEffect(() => {
    const el = thumbsRef.current?.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIdx]);

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  const handleBack = () => {
    localStorage.removeItem("projectSourcePage");
    router.push(sourcePage);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "gallery", label: "Gallery", icon: <Images className="w-3.5 h-3.5" /> },
    { id: "about",   label: "About",   icon: <Info    className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="xl:col-span-6 w-full">
      <div className={`${CARD_BASE} text-text mt-5 md:mt-0 overflow-hidden`}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="px-5 pt-5 pb-4 border-b border-border">
          {/* Back */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors mb-4 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-xl font-bold leading-snug min-w-0 flex-1">
              {projectName}
            </h1>
            <span
              className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                projectSubtitle === "Public"
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-border text-text-muted"
              }`}>
              {projectSubtitle}
            </span>
          </div>

          {/* Link */}
          {projectLink && (
            <a
              href={projectLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent transition-colors mb-3 group">
              {isGithub ? (
                <Github className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="group-hover:underline underline-offset-2 truncate max-w-xs">
                {projectLink.linkName}
              </span>
            </a>
          )}
        </div>

        {/* ── Tab bar ────────────────────────────────────────── */}
        <div className="flex border-b border-border px-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3 py-3 text-xs font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-accent"
                  : "text-text-muted hover:text-text"
              }`}>
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Tab content ────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-4 md:p-6">

              {/* Main view */}
              <div className="relative group">
                {isMobile ? (
                  <div className="flex justify-center py-4 min-h-[360px] md:min-h-[480px] items-center">
                    <MobileDeviceFrame
                      src={projectImages[activeIdx]}
                      alt={`${projectName} screenshot ${activeIdx + 1}`}
                    />
                  </div>
                ) : (
                  <div className="relative w-full rounded-xl overflow-hidden border border-border bg-snbackground aspect-video">
                    <Image
                      src={projectImages[activeIdx]}
                      alt={`${projectName} screenshot ${activeIdx + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 900px"
                      priority={activeIdx === 0}
                    />
                  </div>
                )}

                {/* Prev / Next arrows */}
                {total > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous screenshot"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sbackground/80 border border-border backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 opacity-0 group-hover:opacity-100">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next screenshot"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sbackground/80 border border-border backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 opacity-0 group-hover:opacity-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Counter + progress bar */}
              {total > 1 && (
                <div className="flex items-center gap-3 mt-3 mb-3">
                  <span className="text-xs text-text-muted tabular-nums">
                    {activeIdx + 1} / {total}
                  </span>
                  <div className="flex-1 h-0.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${((activeIdx + 1) / total) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Thumbnail strip */}
              {total > 1 && (
                <div
                  ref={thumbsRef}
                  className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                  {projectImages.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      aria-label={`Screenshot ${i + 1}`}
                      className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        i === activeIdx
                          ? "border-accent opacity-100"
                          : "border-transparent opacity-50 hover:opacity-75"
                      } ${isMobile ? "w-12 aspect-[9/19.5]" : "w-20 aspect-video"}`}>
                      <Image
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        width={isMobile ? 48 : 80}
                        height={isMobile ? 104 : 45}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-5 md:p-6 flex flex-col gap-5">

              {/* Meta row: categories + duration */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {projectCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                      <LayoutGrid className="w-2.5 h-2.5" />
                      {cat}
                    </span>
                  ))}
                </div>
                {projectDuration && (
                  <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    {projectDuration}
                  </span>
                )}
              </div>

              <div className="h-px bg-border" />

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                {projectDescription}
              </p>

              <div className="h-px bg-border" />

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5">
                {projectTools.map((tool, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-snbackground border border-border text-text-muted font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
