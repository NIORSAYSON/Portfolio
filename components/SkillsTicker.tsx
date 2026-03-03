import { motion } from "framer-motion";
import Image from "next/image";

interface SkillIcon {
  src: string;
  title: string;
}

interface SkillsTickerProps {
  images: SkillIcon[];
  from: string | number;
  to: string | number;
}

export default function SkillsTicker({ images, from, to }: SkillsTickerProps) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 my-2 mx-2"
        style={{ willChange: "transform" }}>
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
      </motion.div>
    </div>
  );
}
