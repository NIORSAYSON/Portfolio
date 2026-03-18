import { JamMenu } from "../app/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {showMenuButton && showTopBar && (
        <motion.div
          key="topbar"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ type: "tween", duration: 0.25 }}
          className="fixed top-0 left-0 w-full h-14 bg-sbackground/90 backdrop-blur-sm border-b border-border z-40 flex items-center justify-between px-4">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-snbackground transition-colors duration-200"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu">
            {mounted && (
              <JamMenu
                className="w-5 h-5"
                fill={theme === "dark" ? "#f0f0f0" : "#0a0a0a"}
              />
            )}
          </button>
          <Link href="/" aria-label="Home">
            <Image
              src="/profile.jpg"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full object-cover ring-1 ring-border/50"
            />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
