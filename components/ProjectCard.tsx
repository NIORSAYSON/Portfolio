import Image from "next/image";

interface ProjectProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
}
export default function ProjectCard({
  title,
  subtitle,
  description,
  image,
}: ProjectProps) {
  return (
    <div className="flex flex-col min-w-[280px] my-5 text-text">
      <div className="relative w-[280px] h-40 flex items-center justify-center rounded-t-2xl border-x-1 border-t-1 border-gray-400">
        <Image
          src={image}
          alt="POS Project"
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-cover rounded-t-2xl"
        />
      </div>
      <div className="w-[280px] h-27 border-1 border-gray-400 flex flex-col items-center">
        <span className="font-bold text-base px-1 text-center pt-1">
          {title}
        </span>
        {subtitle && (
          <span className="text-sm font-semibold px-1 text-center pb-1">
            ({subtitle})
          </span>
        )}
        <span className="text-[11px] text-center px-2">{description}</span>
      </div>
    </div>
  );
}
