"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import {
  CARD_BASE,
  SECTION_HEADER_CLASS,
  SECTION_TITLE_CLASS,
} from "@/lib/styles";

export default function Resume() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen w-full p-5 pt-16 md:pt-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${CARD_BASE} text-text`}>
        <div className="flex items-center justify-between pr-5">
          <div className={SECTION_HEADER_CLASS}>
            {mounted && (
              <FileText
                className="w-5 h-5"
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            )}
            <span className={SECTION_TITLE_CLASS}>Resume</span>
          </div>
          {mounted && (
            <a
              href="/SAYSON RESUME 2026 - Software Engineer.pdf"
              download
              className="flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-lg border border-border hover:border-accent hover:text-accent transition-all duration-200">
              <Download
                className="w-4 h-4"
                color={isDark ? "#f0f0f0" : "#0a0a0a"}
              />
              <span>Download</span>
            </a>
          )}
        </div>
        <div
          className="m-5 rounded-xl overflow-hidden border border-border"
          style={{ height: "calc(100vh - 140px)", minHeight: "500px" }}>
          <iframe
            src="/SAYSON RESUME 2026 - Software Engineer.pdf#toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-full"
            allow="autoplay; fullscreen"
          />
        </div>
      </motion.div>
    </main>
  );
}
