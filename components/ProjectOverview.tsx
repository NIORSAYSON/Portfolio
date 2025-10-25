import { WeuiBackFilled } from "@/app/icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectOverviewProps {
  projectName: string;
  projectSubtitle: string;
  projectLink?: {
    link: string;
    linkName: string;
  };
  projectTools: string[];
  projectImages: string[];
}

export default function ProjectOverview({
  projectName,
  projectSubtitle,
  projectLink,
  projectTools,
  projectImages,
}: ProjectOverviewProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sourcePage, setSourcePage] = useState("/projects");
  const router = useRouter();

  // Determine if the provided link should be treated as a repository/source-only link.
  // We treat explicit GitHub links as repository links, and also handle a couple
  // of known project-name cases (notes-app / task-manager) which are not deployed
  // and only have repository links.
  const isRepositoryLink = (() => {
    if (!projectLink) return false;
    const link = projectLink.link || "";
    const name = projectName ? projectName.toLowerCase() : "";
    if (link.includes("github.com")) return true;
    // handle common variants of the two projects mentioned
    if (
      name.includes("notes") ||
      name.includes("task") ||
      name.includes("task-manager") ||
      name.includes("notes-app")
    )
      return true;
    return false;
  })();

  useEffect(() => {
    setMounted(true);
    // Get the source page from localStorage
    const storedSource = localStorage.getItem("projectSourcePage");
    if (storedSource) {
      setSourcePage(storedSource);
      console.log("Retrieved source page from localStorage:", storedSource);
    }
  }, []);

  const handleBack = () => {
    // Clear the stored source page
    localStorage.removeItem("projectSourcePage");
    router.push(sourcePage);
  };

  return (
    <div className="col-span-2 xl:col-span-6 w-full">
      <div className="bg-sbackground relative md:mx-5 md:rounded-xl xl:mb-5 text-text mt-20 md:mt-5 shadow-md">
        {/* Back Button */}
        <button
          onClick={handleBack}
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
        </button>
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
              {isRepositoryLink ? (
                <>
                  Repository:{" "}
                  <a
                    href={projectLink.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#1B56FD]">
                    {projectLink.linkName}
                  </a>
                </>
              ) : (
                <>
                  Hosted and showcased the project on:{" "}
                  <a
                    href={projectLink.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#1B56FD]">
                    {projectLink.linkName}
                  </a>
                </>
              )}
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
          <div className="mt-4 flex flex-col items-center justify-center w-full gap-4">
            {projectImages.map((src, idx) => (
              <div
                key={idx}
                className="w-full flex justify-center mt-5"
                style={{ maxWidth: 900 }}>
                <div
                  className="rounded-lg shadow-md overflow-hidden bg-black/5"
                  style={{ width: "100%", maxHeight: 720 }}>
                  <Image
                    src={src}
                    alt={`${projectName} screenshot ${idx + 1}`}
                    width={900}
                    height={720}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="bg-black/5"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
