import { projects } from "@/app/constants";
import { MdiLightPin } from "@/app/icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectsSectionProps {
  // Slug of the current project page to exclude
  currentProjectSlug: string;
}

export default function ProjectsSection({
  currentProjectSlug,
}: ProjectsSectionProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // filter out the current project
  const otherProjects = projects.filter(
    (project) => project.slug !== currentProjectSlug
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-sbackground md:rounded-xl shadow-md overflow-hidden md:mx-5 xl:ml-0 xl:mr-5 mt-2 mb-5 md:mt-5 text-text">
      <div className="ml-5 pt-4 flex flex-row items-center gap-1">
        {mounted && (
          <MdiLightPin
            className="w-7 h-7 items-center justify-center"
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        )}
        <span className="text-[18px] md:text-[20px] font-bold text-center ">
          Others
        </span>
      </div>
      <div className="mx-5">
        <div className="hide-scrollbar flex h-full w-full items-start justify-start overflow-x-auto">
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-5 px-2 py-5 w-full">
            {otherProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="cursor-pointer">
                <div className="relative h-50 w-full border-2 rounded-lg border-gray-500 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center p-6">
                    <div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold">
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
                    <div className="flex gap-2 flex-wrap">
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
  );
}
