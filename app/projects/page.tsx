"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CodiconGithubAlt, MdiLightPin } from "../icons";
import { projects, projectCategories } from "../constants";
import ContributionCalendar from "@/components/GithubContributions";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects =
    selectedCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen w-full">
      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-sbackground md:rounded-xl shadow-md overflow-hidden md:mx-5 mt-20 md:mt-5 text-text">
        <div className="ml-5 pt-4 flex flex-row items-center gap-1">
          {mounted && (
            <MdiLightPin
              className="w-7 h-7 items-center justify-center"
              fill={theme === "dark" ? "#fff" : "#000"}
            />
          )}
          <span className="text-[18px] md:text-[20px] font-bold text-center ">
            Projects
          </span>
        </div>

        {/* Category Filter */}
        <div className="mx-5 mt-4">
          <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-700">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#1b56fd] text-white shadow-md"
                    : "bg-transparent border border-[#3D444D] text-text hover:border-[#1b56fd] hover:text-[#1b56fd]"
                }`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5">
          <div className="hide-scrollbar flex h-full w-full items-start justify-start overflow-x-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 px-2 py-5 w-full">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="cursor-pointer group">
                  <div className="relative h-64 w-full border-2 rounded-lg border-gray-500 overflow-hidden hover:shadow-lg hover:border-[#1b56fd] transition-all duration-300">
                    <div className="flex flex-col justify-between h-full p-6">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold group-hover:text-[#1b56fd] transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {project.duration}
                            </p>
                          </div>
                          <p className="text-xs px-3 py-1 rounded-full border border-[#3D444D] whitespace-nowrap ml-2">
                            {project.subtitle}
                          </p>
                        </div>
                        <p className="text-xs px-3 py-1 rounded-md bg-[#1b56fd]/10 text-[#1b56fd] inline-block mt-2">
                          {project.category}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap mt-4">
                        {project.tools.slice(0, 4).map((tool, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-md border border-[#3D444D]">
                            {tool}
                          </span>
                        ))}
                        {project.tools.length > 4 && (
                          <span className="text-xs px-3 py-1 rounded-md border border-[#3D444D] text-gray-500">
                            +{project.tools.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      {/* Contributions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-sbackground text-text mt-2 md:mx-5 relative md:rounded-xl md:mb-5 mb-5">
        <div className="ml-5 pt-4 flex flex-row items-center gap-1">
          {mounted && (
            <CodiconGithubAlt
              className="w-7 h-7 items-center justify-center"
              fill={theme === "dark" ? "#fff" : "#000"}
            />
          )}
          <span className="text-[18px] md:text-[20px] font-bold text-center ml-2">
            GitHub Contributions
          </span>
        </div>
        <div className="mx-5 justify-center items-center text-center xl:mx-25 mt-5">
          <ContributionCalendar />
        </div>
      </motion.div>
    </main>
  );
}
