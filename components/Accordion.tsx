import { MingcuteDownSmallLine } from "@/app/icons";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <div className={className}>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isOpen ? "#F5F5F5" : "white",
          borderColor: isOpen ? "#E0E0E0" : "#D9D9D9",
          borderWidth: isOpen ? "1px" : "0",
          borderBottom: isOpen ? "none" : "1px solid #D9D9D9",
        }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="cursor-pointer px-4 py-2 rounded-t flex">
        {icon && <span>{icon}</span>}
        <span className="text-black font-semibold">{accordionTitle}</span>
        <MingcuteDownSmallLine
          className={`ml-auto transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
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
            className="overflow-hidden bg-white ">
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
