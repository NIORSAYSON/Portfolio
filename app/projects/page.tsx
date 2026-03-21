"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Pin } from "lucide-react";
import { projects, projectCategories } from "../constants";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CARD_BASE,
  SECTION_HEADER_CLASS,
  SECTION_TITLE_CLASS,
} from "@/lib/styles";

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects =
    selectedCategory === "All Projects"
      ? projects
      : projects.filter((project) => {
          // Check if it's an array and see if it includes the selected category
          if (Array.isArray(project.category)) {
            return project.category.includes(selectedCategory);
          }
          // Fallback for single string categories
          return project.category === selectedCategory;
        });

  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-col gap-4 p-4 pt-16 md:pt-5 w-full min-w-0">
        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${CARD_BASE} text-text`}>
          <div className={SECTION_HEADER_CLASS}>
            {mounted && (
              <Pin
                className="w-5 h-5"
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            )}
            <span className={SECTION_TITLE_CLASS}>Projects</span>
          </div>

          {/* Category Filter */}
          <div className="px-4 mt-3 pb-4 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-accent text-white"
                      : "border border-border text-text-muted hover:border-accent hover:text-accent"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}>
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={() =>
                      localStorage.setItem("projectSourcePage", "/projects")
                    }
                    className="block group h-full">
                    <div className="border border-border rounded-xl p-4 hover:border-accent transition-all duration-200 h-full overflow-hidden">
                      {/* Header: title + subtitle badge */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors duration-200 truncate">
                            {project.title}
                          </h3>
                          <p className="text-xs text-text-muted mt-0.5">
                            {project.duration}
                          </p>
                        </div>
                        {/* Subtitle badge — truncated on mobile */}
                        <span className="text-[11px] px-2 py-0.5 rounded-full border border-border text-text-muted shrink-0 max-w-[38%] truncate">
                          {project.subtitle}
                        </span>
                      </div>
                      {/* Category pills */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {Array.isArray(project.category) ? (
                          project.category.map((cat, index) => (
                            <span
                              key={index}
                              className="text-xs px-2.5 py-1 rounded-lg bg-accent-muted text-accent">
                              {cat}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-accent-muted text-accent">
                            {project.category}
                          </span>
                        )}
                      </div>
                      {/* Tool tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.slice(0, 4).map((tool, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-border text-text-muted">
                            {tool}
                          </span>
                        ))}
                        {project.tools.length > 4 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-md border border-border text-text-muted">
                            +{project.tools.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

