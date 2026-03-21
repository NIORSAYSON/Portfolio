"use client";

import { Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface TopBarProps {
  showTopBar: boolean;
}

export default function TopBar({ showTopBar }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <AnimatePresence>
      {showTopBar && (
        <motion.div
          key="topbar"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ type: "tween", duration: 0.25 }}
          className="fixed top-0 left-0 w-full h-14 bg-sbackground/90 backdrop-blur-sm border-b border-border z-40 flex items-center justify-between px-4">
          {/* Logo / profile link */}
          <Link href="/" aria-label="Home" className="flex items-center gap-2">
            <Image
              src="/profile.jpg"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full object-cover ring-1 ring-accent/30"
            />
            <span className="text-sm font-semibold text-text">Nestor Jr.</span>
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-snbackground transition-colors duration-200"
            aria-label="Toggle dark mode">
            {mounted && (
              <Moon
                className="w-5 h-5"
                color={isDark ? "var(--accent)" : "var(--text-muted)"}
              />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
