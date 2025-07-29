"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  MaterialSymbolsLightDownloadSharp,
  SolarDocumentOutline,
} from "../icons";

export default function About() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className="min-h-screen w-full md:px-5">
      <div className="bg-sbackground md:rounded-xl shadow-md overflow-hidden md:mx-5 mt-20 md:mt-5 text-text">
        <div className="ml-10 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mounted && (
              <SolarDocumentOutline
                className="w-8 h-8"
                fill={theme === "dark" ? "#fff" : "#000"}
              />
            )}
            <span className="text-[18px] md:text-[20px] font-bold">Resume</span>
          </div>
          {mounted && (
            <a
              href="/Nestor B. Sayson Jr - Resume 2025.pdf"
              download
              className={`flex items-center gap-1 text-base px-2 md:px-10 mr-10 py-1 border border-text rounded-sm transition ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}>
              <MaterialSymbolsLightDownloadSharp
                className="w-5 h-5"
                fill={theme === "dark" ? "#fff" : "#000"}
              />
              <span>Download</span>
            </a>
          )}
        </div>
        {/* Embed PDF */}
        {/* <div
            className="mt-4 w-full border border-gray-300 rounded-lg overflow-hidden"
            style={{ height: "70vh" }}>
            <iframe
              src="/Nestor Sayson Jr Developer Resume.pdf"
              className="w-full h-full"
              style={{ minHeight: "500px" }}
              //   frameBorder="0"
            />
          </div> */}
        <div className="m-10 h-[70vh] md:h-[calc(100vh-180px)] border border-gray-300 rounded-lg overflow-hidden">
          {/* <embed
            src="/Nestor Sayson Jr Developer Resume.pdf#toolbar=0"
            type="application/pdf"
            className="w-full h-full"
          /> */}
          <iframe
            src="/Nestor B. Sayson Jr - Resume 2025.pdf#toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-full"
            allow="autoplay; fullscreen"
          />
        </div>
      </div>
    </main>
  );
}
