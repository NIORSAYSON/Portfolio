"use client";
import { MaterialSymbolsLightInfoOutlineRounded } from "@/app/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ProjectOverview from "@/components/ProjectOverview";
import ProjectsSection from "@/components/ProjectsSection";
import { projects } from "@/app/constants";

export default function SyntheticDataGenerator() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = projects.find((p) => p.slug === "synthetic-data-generator");
  if (!current) return <div>Project not found</div>;

  return (
    <main className="min-h-screen w-full">
      <div className="grid xl:grid-cols-9 w-full min-h-screen">
        {/* Right Column */}
        <ProjectOverview
          projectName={current.title}
          projectSubtitle={current.subtitle}
          projectLink={current.projectLink}
          projectTools={current.tools}
          projectImages={current.projectImages}
        />

        {/* Left Column */}
        <div className="col-span-2 xl:col-span-3 w-full text-text">
          {/* About Section */}
          <div className="bg-sbackground relative xl:mr-5 md:mx-5 xl:ml-0 md:rounded-xl xl:mb-5 text-text mt-2 md:mt-5 shadow-md">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <MaterialSymbolsLightInfoOutlineRounded
                  className="w-8 h-8 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[18px] md:text-[20px] font-bold text-center ">
                About
              </span>
            </div>
            <div className="whitespace-pre-line mx-10 mt-5 pb-5 text-[13px] md:text-[15px]">
              {current.description}
            </div>
          </div>
          {/* Other Sections */}
          <ProjectsSection currentProjectSlug={current.slug} />
        </div>
      </div>
    </main>
  );
}
