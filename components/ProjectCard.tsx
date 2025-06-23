import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: string;
}
export default function ProjectCard({
  title,
  subtitle,
  description,
  image,
  link,
}: ProjectProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-w-[280px] my-5 text-text rounded-2xl border-1 border-gray-400">
      <div className="relative w-[280px] h-40 flex items-center justify-center ">
        <Image
          src={image}
          alt="Project Card"
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-cover rounded-t-2xl"
        />
      </div>
      <div className="w-[280px] h-40 flex flex-col items-center">
        <span className="font-bold text-base px-1 text-center">{title}</span>
        {subtitle && (
          <span className="text-sm font-semibold px-1 text-center pb-2">
            ({subtitle})
          </span>
        )}
        <span className="text-[11px] text-center px-6 mb-2 line-clamp-2">
          {description}
        </span>
        {mounted && (
          <button
            className={`flex border-1 border-gray-400 bg-background py-1 px-20 rounded-lg mt-2 transition ${
              theme === "dark"
                ? "hover:bg-white hover:text-black"
                : "hover:bg-black hover:text-white"
            }`}
            onClick={() => window.open(link, "_blank")}>
            Live Site
          </button>
        )}
      </div>
    </div>
    // <div className="relative flex flex-col w-[280px] min-w-[280px] h-80 my-5 text-text rounded-2xl border-1 border-gray-400">
    //   <div className="flex ">
    //     <Image
    //       src={image}
    //       alt="Project Card"
    //       fill
    //       sizes="(max-width: 768px) 100vw, 70vw"
    //       className="object-cover rounded-t-2xl"
    //     />
    //   </div>
    //   <div className="flex">Te</div>
    // </div>
  );
}
