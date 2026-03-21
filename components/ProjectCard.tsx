"use client";

import Image from "next/image";
import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { CARD_BASE } from "@/lib/styles";

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
  slug,
  source = "/projects",
}: ProjectProps) {
  const router = useRouter();

  const handleViewProject = () => {
    localStorage.setItem("projectSourcePage", source);
    router.push(`/projects/${slug}`);
  };

  return (
    <div
      onClick={handleViewProject}
      className={`${CARD_BASE} overflow-hidden group cursor-pointer min-w-[260px] w-[260px]`}>
      {/* Full-bleed image with gradient overlay */}
      <div className="relative w-full aspect-16/10 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="260px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Bottom gradient — project type label */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent px-3 pt-8 pb-2.5">
          {subtitle && (
            <div className="flex items-center gap-1.5 text-white/90 text-[11px]">
              <Tag className="w-3 h-3 shrink-0" />
              <span className="font-medium">{subtitle}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-3 pt-2.5">
        <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
