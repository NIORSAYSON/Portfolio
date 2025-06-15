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
    <main>
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0 my-2 mx-2">
        {[...images, ...images].map((icon, idx) => (
          <Image
            key={idx}
            src={icon.src}
            alt={icon.title}
            title={icon.title}
            width={80}
            height={80}
            className="ml-2"
            draggable={false}
            loading="eager"
          />
        ))}
      </motion.div>
    </main>
  );
}
