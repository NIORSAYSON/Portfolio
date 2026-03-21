"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { CARD_BASE, SECTION_HEADER_CLASS, SECTION_TITLE_CLASS } from "@/lib/styles";
import type { CmsProject } from "@/lib/types/cms";

type Props = {
  projects: CmsProject[];
  categories: string[];
};

const SOURCE_KEY = "projectSourcePage";
const GRID_PREVIEW = 9;

// ─── Sub-components ──────────────────────────────────────────────────────────

function FeaturedHeroCard({ project }: { project: CmsProject }) {
  const img = project.mockup?.url ?? project.images[0]?.url;
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border aspect-16/7 bg-snbackground group-hover:border-accent/50 transition-colors duration-300">
      {img && (
        <Image
          src={img}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/80 text-white">
              {cat}
            </span>
          ))}
        </div>
        <h3 className="text-lg md:text-2xl font-bold text-white leading-snug mb-1.5 group-hover:text-accent/90 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-white/65 line-clamp-2 mb-4 max-w-2xl">
          {project.description}
        </p>
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {project.tools.slice(0, 5).map((tool, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/80 backdrop-blur-sm border border-white/10">
                {tool}
              </span>
            ))}
            {project.tools.length > 5 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/80 backdrop-blur-sm border border-white/10">
                +{project.tools.length - 5}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-accent transition-colors duration-200 shrink-0">
            View project
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ project }: { project: CmsProject }) {
  const img = project.mockup?.url ?? project.images[0]?.url;
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border aspect-4/3 bg-snbackground group-hover:border-accent/50 transition-colors duration-300">
      {img && (
        <Image
          src={img}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex flex-wrap gap-1 mb-1.5">
          {project.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/80 text-white">
              {cat}
            </span>
          ))}
        </div>
        <h3 className="text-sm md:text-base font-bold text-white leading-snug mb-3 group-hover:text-accent/90 transition-colors duration-200">
          {project.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {project.tools.slice(0, 3).map((tool, i) => (
              <span
                key={i}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10 text-white/80 backdrop-blur-sm border border-white/10">
                {tool}
              </span>
            ))}
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: CmsProject }) {
  return (
    <div className="border border-border rounded-xl group-hover:border-accent/50 transition-all duration-200 h-full flex flex-col bg-sbackground p-4 gap-2.5">
      {/* Title + badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors duration-200 min-w-0 flex-1">
          {project.title}
        </h3>
        <span
          className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
            project.subtitle === "Public"
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-border text-text-muted"
          }`}>
          {project.subtitle}
        </span>
      </div>

      {/* Duration */}
      {project.duration && (
        <div className="flex items-center gap-1 text-[11px] text-text-muted">
          <Clock className="w-3 h-3 shrink-0" />
          {project.duration}
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-1">
        {project.categories.map((cat) => (
          <span
            key={cat}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            {cat}
          </span>
        ))}
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-1 mt-auto pt-1">
        {project.tools.slice(0, 4).map((tool, i) => (
          <span
            key={i}
            className="text-[10px] px-1.5 py-0.5 rounded-md border border-border text-text-muted">
            {tool}
          </span>
        ))}
        {project.tools.length > 4 && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-md border border-border text-text-muted">
            +{project.tools.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectsClient({ projects, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);

  const allCategories = ["All Projects", ...categories];
  const isFiltered = selectedCategory !== "All Projects";

  const featured = projects.filter((p) => p.isFeatured);

  const gridProjects = isFiltered
    ? projects.filter((p) => p.categories.includes(selectedCategory))
    : projects;

  const visibleGrid = showAll ? gridProjects : gridProjects.slice(0, GRID_PREVIEW);
  const hiddenCount = gridProjects.length - GRID_PREVIEW;

  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-col gap-5 p-4 pt-16 md:pt-5 w-full min-w-0">

        {/* ── Filter bar ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={CARD_BASE}>
          <div className={SECTION_HEADER_CLASS}>
            <LayoutGrid className="w-4 h-4 text-text-muted" />
            <span className={SECTION_TITLE_CLASS}>Projects</span>
            <span className="ml-auto text-xs text-text-muted">{projects.length} total</span>
          </div>
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-accent text-white"
                    : "border border-border text-text-muted hover:border-accent hover:text-accent"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Featured (only when "All Projects") ─────────── */}
        <AnimatePresence>
          {!isFiltered && featured.length > 0 && (
            <motion.section
              key="featured"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-text">Featured</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featured[0] && (
                  <Link
                    href={`/projects/${featured[0].slug}`}
                    onClick={() => localStorage.setItem(SOURCE_KEY, "/projects")}
                    className="md:col-span-2 group block">
                    <FeaturedHeroCard project={featured[0]} />
                  </Link>
                )}
                {featured.slice(1).map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    onClick={() => localStorage.setItem(SOURCE_KEY, "/projects")}
                    className="group block">
                    <FeaturedCard project={p} />
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── All / Filtered grid ─────────────────────────── */}
        {gridProjects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3 px-1">
              <LayoutGrid className="w-4 h-4 text-text-muted" />
              <span className="text-sm font-semibold text-text">
                {isFiltered ? selectedCategory : "All Projects"}
              </span>
              <span className="text-xs text-text-muted">({gridProjects.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {visibleGrid.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}>
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => localStorage.setItem(SOURCE_KEY, "/projects")}
                      className="group block h-full">
                      <ProjectCard project={project} />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* See more / See less */}
            {gridProjects.length > GRID_PREVIEW && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs font-medium text-text-muted hover:border-accent hover:text-accent transition-all duration-200">
                  {showAll ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      See less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      See {hiddenCount} more
                    </>
                  )}
                </button>
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}
