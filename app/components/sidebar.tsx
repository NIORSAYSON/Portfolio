"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HugeiconsContact01,
  MaterialSymbolsLightDownloadSharp,
  MaterialSymbolsLightHomeOutlineRounded,
  MaterialSymbolsLightInfoOutlineRounded,
  PhCopyrightThin,
  PhFilesThin,
  PhMoonStarsLight,
} from "../icons";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  return (
    <aside className="w-72 bg-white py-6 flex flex-col h-100vh">
      <Image
        src="/profile.jpg"
        alt="Profile picture"
        width={100}
        height={100}
        className="rounded-full mb-4 mx-auto border border-black object-cover"
        style={{ aspectRatio: "1 / 1" }}
      />
      <h1 className="text-xl font-semibold text-center text-black ">
        Nestor Sayson Jr.
      </h1>
      <h1 className="text-sm font-semibold text-center mb-4 text-black ">
        Front-End Developer
      </h1>
      <div className="flex justify-center mb-4">
        <button
          type="button"
          className="flex flex-row items-center text-black text-base px-16 border border-black text-center py-1 rounded-sm hover:bg-gray-100 transition">
          <span className="mr-1">
            <MaterialSymbolsLightDownloadSharp className="w-5 h-5" />
          </span>
          <span>Resume</span>
        </button>
      </div>
      <nav className="flex flex-col gap-1 w-full">
        <Link
          href="/"
          className={`w-full text-left rounded pl-8 py-2 flex items-center ${
            pathname === "/"
              ? "bg-[#F5F5F5] text-[#1B56FD]"
              : "text-black hover:bg-[#F5F5F5]"
          }`}>
          <MaterialSymbolsLightHomeOutlineRounded
            className="inline-block w-7 h-7 mr-2"
            {...(pathname === "/" ? { fill: "#1B56FD" } : { fill: "#000" })}
          />
          <div className="text-l">Home</div>
        </Link>
        <Link
          href="/about"
          className={`w-full text-left rounded pl-8 py-2 flex items-center ${
            pathname === "/about"
              ? "bg-[#F5F5F5] text-[#1B56FD]"
              : "text-black hover:bg-[#F5F5F5]"
          }`}>
          <div className="flex items-center">
            <MaterialSymbolsLightInfoOutlineRounded
              className="inline-block w-7 h-7 mr-2"
              {...(pathname === "/about"
                ? { fill: "#1B56FD" }
                : { fill: "#000" })}
            />
            <div className="text-l">About</div>
          </div>
        </Link>
        <Link
          href="/about"
          className="w-full text-left hover:bg-[#F5F5F5] text-black rounded px-2 pl-8 py-2">
          <div className="flex items-center">
            <PhFilesThin className="inline-block w-7 h-7 mr-2" />
            <div className="text-l">Projects</div>
          </div>
        </Link>
        <Link
          href="/about"
          className="w-full text-left hover:bg-[#F5F5F5] text-black rounded px-2 pl-8 py-2">
          <div className="flex items-center">
            <HugeiconsContact01 className="inline-block w-7 h-7 mr-2" />
            <div className="text-l">Contact</div>
          </div>
        </Link>
      </nav>
      <div className="flex flex-col justify-end flex-1">
        <div className="flex flex-row justify-center items-center bg-[#c7c7c772] mx-5 py-2 gap-7 mb-2">
          <div className="flex items-center text-black text-base">
            <PhMoonStarsLight className="inline-block w-7 h-7 mr-2" />
            <span className="text-black">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-5">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((d) => !d)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#808080] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-gray-800 transition"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>
        <div className="text-black text-[10px] text-center">
          Designed and Developed by Nestor B. Sayson Jr.
        </div>
        <div className="text-black text-[10px] text-center">
          <PhCopyrightThin className="inline-block w-3 h-3 mr-1" />
          <span className="text-black text-[10px]">
            2025, All Right Reserved.
          </span>
        </div>
      </div>
    </aside>
  );
}
