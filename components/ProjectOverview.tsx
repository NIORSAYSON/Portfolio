import { WeuiBackFilled } from "@/app/icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectOverviewProps {
  projectName: string;
  projectSubtitle: string;
  projectLink?: {
    link: string;
    linkName: string;
  };
  projectTools: string[];
  projectImages: string[];
  page?: string; // used for navigation
}

export default function ProjectOverview({
  projectName,
  projectSubtitle,
  projectLink,
  projectTools,
  projectImages,
  page,
}: ProjectOverviewProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="col-span-2 xl:col-span-6 w-full">
      <div className="bg-sbackground relative md:mx-5 md:rounded-xl xl:mb-5 text-text mt-20 md:mt-5 shadow-md">
        {/* Back Button */}
        <a
          href="/projects"
          className="ml-5 pt-4 flex flex-row items-center gap-3 cursor-pointer hover:underline group">
          {mounted && (
            <WeuiBackFilled
              className="w-7 h-7 items-center justify-center transition-colors duration-200 group-hover:fill-blue-500"
              fill={theme === "dark" ? "#fff" : "#000"}
            />
          )}
          <span className="text-[18px] md:text-[18px] font-bold text-center ">
            Back
          </span>
        </a>
        {/* Project Overview */}
        <div className="flex flex-col h-full w-full items-start justify-start overflow-x-auto p-10">
          {/* Project Title */}
          <div className="text-[18px] md:text-[20px] font-bold">
            <div className="flex justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-semibold">{projectName}</h3>
              </div>
              <p className="text-sm px-4 py-1 rounded-full border border-[#3D444D]">
                {projectSubtitle}
              </p>
            </div>
          </div>
          {/* Project Subtitle */}
          {projectLink && (
            <div className="text-[13px] md:text-[15px] mt-2 text-[#808080]">
              Hosted and showcased the project on:{" "}
              <a
                href={projectLink.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#1B56FD]">
                {projectLink.linkName}
              </a>
            </div>
          )}
          {/* Project Tools */}
          <div className="mt-2">
            <div className="flex gap-2 flex-wrap">
              {projectTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-md border border-[#3D444D] 
                      md:text-xs md:px-3 md:py-1
                      sm:text-[10px] sm:px-2 sm:py-0.5
                      ">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          {/* Project Image */}
          <div className="mt-4 flex flex-col items-center justify-center w-full">
            {projectImages.map((src, idx) => (
              <div key={idx} className="flex justify-center w-full">
                <Image
                  src={src}
                  alt={`${projectName} screenshot ${idx + 1}`}
                  width={800}
                  height={450}
                  className="rounded-lg shadow-md mt-5 border-1 border-black"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
