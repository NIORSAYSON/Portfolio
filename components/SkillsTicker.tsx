import Image from "next/image";

interface SkillIcon {
  src: string;
  title: string;
}

interface SkillsTickerProps {
  images: SkillIcon[];
  direction?: "left" | "right";
  duration?: number;
}

export default function SkillsTicker({
  images,
  direction = "left",
  duration = 12,
}: SkillsTickerProps) {
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex shrink-0 my-2 mx-2"
        style={{
          animation: `${direction === "left" ? "ticker-left" : "ticker-right"} ${duration}s linear infinite`,
          willChange: "transform",
          width: "max-content",
        }}>
        {/* Duplicate images for seamless loop — animation only moves -50% */}
        {[...images, ...images].map((icon, idx) => (
          <Image
            key={idx}
            src={icon.src}
            alt={icon.title}
            title={icon.title}
            width={72}
            height={72}
            className="ml-2 shrink-0"
            draggable={false}
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
}
