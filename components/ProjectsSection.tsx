import { projects } from "@/app/constants";
import Link from "next/link";
import { CARD_BASE, SECTION_TITLE_CLASS } from "@/lib/styles";

interface ProjectsSectionProps {
  currentProjectSlug: string;
}

export default function ProjectsSection({
  currentProjectSlug,
}: ProjectsSectionProps) {
  const otherProjects = projects.filter(
    (project) => project.slug !== currentProjectSlug,
  );

  return (
    <div className={`${CARD_BASE} text-text mb-5`}>
      <div className="px-5 pt-5 pb-2">
        <span className={SECTION_TITLE_CLASS}>Other Projects</span>
      </div>
      <div className="px-4 pb-4">
        <div className="flex flex-col gap-2">
          {otherProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="block group">
              <div className="border border-border rounded-xl p-4 hover:border-accent transition-all duration-200 overflow-hidden">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium group-hover:text-accent transition-colors duration-200 truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {project.duration}
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-border text-text-muted shrink-0 max-w-[40%] truncate">
                    {project.subtitle}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md border border-border text-text-muted">
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md border border-border text-text-muted">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
