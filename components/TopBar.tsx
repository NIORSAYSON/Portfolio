import Image from "next/image";
import { JamMenu } from "../app/icons";
import { motion, AnimatePresence } from "framer-motion";

interface TopBarProps {
  showMenuButton: boolean;
  showTopBar: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function TopBar({
  showMenuButton,
  showTopBar,
  setSidebarOpen,
}: TopBarProps) {
  return (
    <AnimatePresence>
      {showMenuButton && showTopBar && (
        <motion.div
          key="topbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-16 bg-white z-40 flex items-center justify-between px-4 shadow">
          <button
            className="lg:hidden fixed top-4 left-4 z-50"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu">
            <JamMenu className="inline-block w-9 h-9" />
          </button>
          <div className="flex-1 items-center justify-end flex">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
