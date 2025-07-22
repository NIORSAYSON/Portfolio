"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SolarDocumentOutline } from "../icons";

export default function About() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className="min-h-screen w-full md:px-5">
      <div className="bg-sbackground md:rounded-xl shadow-md overflow-hidden md:mx-5 mt-20 md:mt-5 text-text">
        <div className="ml-5 pt-4 flex flex-row items-center gap-2">
          {mounted && (
            <SolarDocumentOutline
              className="w-8 h-8 items-center justify-center"
              fill={theme === "dark" ? "#fff" : "#000"}
            />
          )}
          <span className="text-[18px] md:text-[20px] font-bold text-center ">
            Resume
          </span>
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
          <embed
            src="/Nestor Sayson Jr Developer Resume.pdf#toolbar=0"
            type="application/pdf"
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
