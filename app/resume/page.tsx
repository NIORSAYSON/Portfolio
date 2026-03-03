"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  MaterialSymbolsLightDownloadSharp,
  SolarDocumentOutline,
} from "../icons";
import { motion } from "framer-motion";

const SECTION_HEADER_CLASS = "flex items-center gap-2 px-5 pt-5 pb-1";
const SECTION_TITLE_CLASS =
  "text-[15px] font-semibold tracking-wide uppercase text-text-muted";

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
        className="bg-sbackground border border-border rounded-2xl text-text">
        <div className="flex items-center justify-between pr-5">
          <div className={SECTION_HEADER_CLASS}>
            {mounted && (
              <SolarDocumentOutline
                className="w-5 h-5"
                fill={isDark ? "#9ca3af" : "#6b7280"}
              />
            )}
            <span className={SECTION_TITLE_CLASS}>Resume</span>
          </div>
          {mounted && (
            <a
              href="/Nestor B. Sayson Jr - Resume 2025.pdf"
              download
              className="flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-lg border border-border hover:border-[--navtext] hover:text-[--navtext] transition-all duration-200">
              <MaterialSymbolsLightDownloadSharp
                className="w-4 h-4"
                fill={isDark ? "#f0f0f0" : "#0a0a0a"}
              />
              <span>Download</span>
            </a>
          )}
        </div>
        <div className="m-5 rounded-xl overflow-hidden border border-border" style={{ height: "calc(100vh - 140px)", minHeight: "500px" }}>
          <iframe
            src="/Nestor B. Sayson Jr - Resume 2025.pdf#toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-full"
            allow="autoplay; fullscreen"
          />
        </div>
      </motion.div>
    </main>
  );
}
