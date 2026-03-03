import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link?: string;
  slug: string;
  source?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  image,
  link,
  slug,
  source = "/projects",
}: ProjectProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleViewProject = () => {
    localStorage.setItem("projectSourcePage", source);
    router.push(`/projects/${slug}`);
  };

  return (
    <div className="flex flex-col min-w-[240px] my-3 text-text rounded-xl border border-border hover:border-[--navtext] transition-all duration-200 group overflow-hidden bg-sbackground">
      <div className="relative w-[240px] h-32">
        <Image
          src={image}
          alt="Project screenshot"
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>
      <div className="w-[240px] flex flex-col flex-1 p-3">
        <span className="font-semibold text-sm leading-tight">{title}</span>
        {subtitle && (
          <span className="text-xs text-text-muted mt-0.5">{subtitle}</span>
        )}
        <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>
        {mounted && (
          <div className="flex gap-2 mt-3">
            {link ? (
              <>
                <button
                  className="flex-1 text-xs border border-border py-1.5 px-3 rounded-lg hover:border-[--navtext] hover:text-[--navtext] transition-all duration-200"
                  onClick={() => window.open(link, "_blank")}>
                  Live Site
                </button>
                <button
                  className="flex-1 text-xs border border-border py-1.5 px-3 rounded-lg hover:border-[--navtext] hover:text-[--navtext] transition-all duration-200"
                  onClick={handleViewProject}>
                  Details
                </button>
              </>
            ) : (
              <button
                className="w-full text-xs border border-border py-1.5 px-3 rounded-lg hover:border-[--navtext] hover:text-[--navtext] transition-all duration-200"
                onClick={handleViewProject}>
                View Project
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
