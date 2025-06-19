"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HugeiconsContact01,
  MaterialSymbolsLightDownloadSharp,
  MaterialSymbolsLightHomeOutlineRounded,
  MaterialSymbolsLightInfoOutlineRounded,
  PhCopyrightThin,
  PhFilesLight,
  PhMoonStarsLight,
} from "../app/icons";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="w-72 bg-sbackground text-text transition-all duration-300 py-6 flex flex-col h-full min-h-0 overflow-y-auto drop-shadow-xl">
      <Image
        src="/profile.jpg"
        alt="Profile picture"
        width={100}
        height={100}
        className="rounded-full mb-4 mx-auto border border-black object-cover"
        style={{ aspectRatio: "1 / 1" }}
      />
      <h1 className="text-xl font-semibold text-center ">Nestor Sayson Jr.</h1>
      <h1 className="text-sm font-semibold text-center mb-4  ">
        Front-End Developer
      </h1>
      <div className="flex justify-center mb-4">
        <button
          type="button"
          className="flex flex-row items-center  text-base px-16 border border-text text-center py-1 rounded-sm hover:bg-gray-100 transition">
          <span className="mr-1">
            {mounted && (
              <MaterialSymbolsLightDownloadSharp
                className="w-5 h-5"
                fill={theme === "dark" ? "#ffffff" : "#000000"}
              />
            )}
          </span>
          <span>Resume</span>
        </button>
      </div>
      <nav className="flex flex-col gap-1 w-full">
        <Link
          href="/"
          className={`w-full text-left rounded pl-8 py-2 flex items-center transition-all duration-300 ${
            pathname === "/"
              ? "bg-snbackground text-[#1B56FD] font-semibold"
              : "text-text hover:bg-snbackground"
          }`}>
          {mounted && (
            <MaterialSymbolsLightHomeOutlineRounded
              className="inline-block w-9 h-9 mr-2"
              {...(pathname === "/"
                ? { fill: theme === "dark" ? "#4C8DFF" : "#1B56FD" }
                : { fill: theme === "dark" ? "#fff" : "#000" })}
            />
          )}
          <div className="text-l">Home</div>
        </Link>
        <Link
          href="/about"
          className={`w-full text-left rounded pl-8 py-2 flex items-center transition-all duration-300 ${
            pathname === "/about"
              ? "bg-snbackground text-[#1B56FD] font-semibold"
              : "text-text hover:bg-snbackground"
          }`}>
          <div className="flex items-center">
            {mounted && (
              <MaterialSymbolsLightInfoOutlineRounded
                className="inline-block w-8 h-8 mr-2"
                {...(pathname === "/about"
                  ? { fill: theme === "dark" ? "#4C8DFF" : "#1B56FD" }
                  : { fill: theme === "dark" ? "#fff" : "#000" })}
              />
            )}
            <div className="text-l">About</div>
          </div>
        </Link>
        <Link
          href="/projects"
          className={`w-full text-left rounded pl-8 py-2 flex items-center transition-all duration-300 ${
            pathname === "/projects"
              ? "bg-snbackground text-[#1B56FD] font-semibold"
              : "text-text hover:bg-snbackground"
          }`}>
          <div className="flex items-center">
            {mounted && (
              <PhFilesLight
                className="inline-block w-8 h-8 mr-2"
                {...(pathname === "/projects"
                  ? { fill: theme === "dark" ? "#4C8DFF" : "#1B56FD" }
                  : { fill: theme === "dark" ? "#fff" : "#000" })}
              />
            )}
            <div className="text-l">Projects</div>
          </div>
        </Link>
        <Link
          href="/contact"
          className={`w-full text-left rounded pl-8 py-2 flex items-center transition-all duration-300 ${
            pathname === "/contact"
              ? "bg-snbackground text-[#1B56FD] font-semibold"
              : "text-text hover:bg-snbackground"
          }`}>
          <div className="flex items-center">
            {mounted && (
              <HugeiconsContact01
                className="inline-block w-7 h-7 mr-2"
                {...(pathname === "/contact"
                  ? { stroke: theme === "dark" ? "#4C8DFF" : "#1B56FD" }
                  : { stroke: theme === "dark" ? "#fff" : "#000" })}
              />
            )}
            <div className="text-l">Contact</div>
          </div>
        </Link>
      </nav>
      <div className="flex flex-col justify-end flex-1 text-text transition-all duration-300">
        <div className="flex flex-row justify-center items-center bg-dmbackground mx-5 py-2 gap-7 mb-2 rounded-md transition-all duration-300">
          <div className="flex items-center text-base">
            {mounted && (
              <PhMoonStarsLight
                className="inline-block w-7 h-7 mr-2"
                fill={theme === "dark" ? "#fff" : "#000"}
              />
            )}
            <span>Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-5">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#808080] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-gray-800 transition"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>
        <div className="text-[10px] text-center">
          Developed by Nestor B. Sayson Jr.
        </div>
        <div className="text-[10px] text-center">
          {mounted && (
            <PhCopyrightThin
              className="inline-block w-3 h-3 mr-1"
              fill={theme === "dark" ? "#fff" : "#000"}
            />
          )}
          <span className="text-[10px]">2025, All Right Reserved.</span>
        </div>
      </div>
    </aside>
  );
}
