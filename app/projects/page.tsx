"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CodiconGithubAlt, MdiLightPin } from "../icons";
import { projects } from "../constants";
import ContributionCalendar from "@/components/GithubContributions";
import Link from "next/link";

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen w-full">
      {/* Projects Section */}
      <div className="bg-sbackground rounded-xl shadow-md overflow-hidden mx-5 mt-20 md:mt-5 text-text">
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
        <div className="mx-5">
          <div className="hide-scrollbar flex xl:h-[690px] h-[1130px] w-full items-start justify-start overflow-x-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 px-2 py-5 w-full">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="cursor-pointer">
                  <div className="relative h-50 w-full border-2 rounded-lg border-gray-500 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center p-6">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {project.title}
                        </h3>
                        <p className="text-base text-gray-500">
                          {project.duration}
                        </p>
                      </div>
                      <p className="text-sm px-4 py-1 rounded-full border border-[#3D444D]">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="absolute bottom-0 w-full p-6">
                      <div className="flex gap-2">
                        {project.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-md border border-[#3D444D]">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Contributions Section */}
      <div className="bg-sbackground text-text mt-2 mx-5 relative rounded-xl md:mb-5">
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
      </div>
    </main>
  );
}
