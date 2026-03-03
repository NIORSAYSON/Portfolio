import { MingcuteDownSmallLine } from "@/app/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface AccordionProps {
  i: number;
  expanded: false | number;
  setExpanded: (val: false | number) => void;
  accordionTitle: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export default function Accordion({
  i,
  expanded,
  setExpanded,
  accordionTitle,
  children,
  className,
  icon,
}: AccordionProps) {
  const isOpen = i === expanded;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`border-b border-border last:border-b-0 ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setExpanded(isOpen ? false : i)}
        className="w-full flex items-center gap-2.5 py-3 text-left hover:text-[--navtext] transition-colors duration-200 group">
        {icon && mounted && (
          <span className="shrink-0 opacity-70">{icon}</span>
        )}
        <span className="text-sm font-medium flex-1">{accordionTitle}</span>
        {mounted && (
          <MingcuteDownSmallLine
            className={`w-4 h-4 shrink-0 opacity-60 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill={theme === "dark" ? "#f0f0f0" : "#0a0a0a"}
          />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden">
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
