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

  const getHeaderStyles = () => {
    if (!mounted) return {};
    return {
      backgroundColor: isOpen
        ? theme === "dark"
          ? "#1e2939"
          : "#F5F5F5"
        : theme === "dark"
        ? "#121212"
        : "white",
      borderColor: isOpen ? "#E0E0E0" : "#D9D9D9",
      borderWidth: isOpen ? "1px" : "0",
      borderBottom: isOpen ? "none" : "1px solid #D9D9D9",
    };
  };

  return (
    <div className={className}>
      <motion.header
        initial={false}
        animate={getHeaderStyles()}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="cursor-pointer px-4 py-2 rounded-t flex">
        {icon && mounted && <span>{icon}</span>}
        <span className="font-semibold">{accordionTitle}</span>
        {mounted && (
          <MingcuteDownSmallLine
            className={`ml-auto transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        )}
      </motion.header>
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
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden ">
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
