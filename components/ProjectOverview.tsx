import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileDeviceFrame from "./MobileDeviceFrame";
import { CARD_BASE } from "@/lib/styles";

interface ProjectOverviewProps {
  projectName: string;
  projectSubtitle: string;
  projectLink?: {
    link: string;
    linkName: string;
  };
  projectTools: string[];
  projectImages: string[];
  isMobile?: boolean;
}

export default function ProjectOverview({
  projectName,
  projectSubtitle,
  projectLink,
  projectTools,
  projectImages,
  isMobile,
}: ProjectOverviewProps) {
  const [sourcePage, setSourcePage] = useState("/projects");
  const router = useRouter();

  const isRepositoryLink = (() => {
    if (!projectLink) return false;
    const link = projectLink.link || "";
    const name = projectName ? projectName.toLowerCase() : "";
    if (link.includes("github.com")) return true;
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
    const storedSource = localStorage.getItem("projectSourcePage");
    if (storedSource) {
      setSourcePage(storedSource);
    }
  }, []);

  const handleBack = () => {
    localStorage.removeItem("projectSourcePage");
    router.push(sourcePage);
  };

  return (
    <div className="xl:col-span-6 w-full">
      <div className={`${CARD_BASE} text-text mt-5 md:mt-0`}>
        {/* Back Button */}
        <div className="px-5 pt-5">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-200 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {/* Project content */}
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-lg md:text-xl font-semibold min-w-0 flex-1 leading-snug">
              {projectName}
            </h1>
            <span className="text-[11px] px-2.5 py-1 rounded-full border border-border text-text-muted shrink-0 max-w-[40%] truncate text-right">
              {projectSubtitle}
            </span>
          </div>

          {/* Link */}
          {projectLink && (
            <p className="text-sm text-text-muted mb-4">
              {isRepositoryLink ? "Repository: " : "Live at: "}
              <a
                href={projectLink.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline">
                {projectLink.linkName}
              </a>
            </p>
          )}

          {/* Tools */}
          <div className="flex flex-wrap gap-2 mb-6">
            {projectTools.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg border border-border text-text-muted">
                {tool}
              </span>
            ))}
          </div>

          {/* Images */}
          <div
            className={
              isMobile
                ? "flex flex-row flex-wrap justify-center gap-4 md:gap-6 py-6"
                : "flex flex-col gap-6 py-6"
            }>
            {projectImages.map((src, idx) =>
              isMobile ? (
                <MobileDeviceFrame
                  key={idx}
                  src={src}
                  alt={`${projectName} screenshot ${idx + 1}`}
                />
              ) : (
                <div
                  key={idx}
                  className="w-full rounded-xl overflow-hidden border border-border bg-snbackground">
                  <Image
                    src={src}
                    alt={`${projectName} screenshot ${idx + 1}`}
                    width={900}
                    height={720}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    sizes="(max-width: 768px) 100vw, 900px"
                    priority={idx === 0}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
