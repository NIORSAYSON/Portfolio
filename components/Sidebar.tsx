"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HugeiconsContact01,
  MaterialSymbolsLightChatOutline,
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

const navLinks = [
  {
    href: "/",
    label: "Home",
    Icon: MaterialSymbolsLightHomeOutlineRounded,
    iconType: "fill" as const,
  },
  {
    href: "/about",
    label: "About",
    Icon: MaterialSymbolsLightInfoOutlineRounded,
    iconType: "fill" as const,
  },
  {
    href: "/projects",
    label: "Projects",
    Icon: PhFilesLight,
    iconType: "fill" as const,
  },
  {
    href: "/chat",
    label: "Chat with Me",
    Icon: MaterialSymbolsLightChatOutline,
    iconType: "fill" as const,
  },
  {
    href: "/contact",
    label: "Contact",
    Icon: HugeiconsContact01,
    iconType: "stroke" as const,
  },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <aside className="w-72 bg-sbackground text-text border-r border-border transition-all duration-300 flex flex-col h-full min-h-0 overflow-y-auto">
      {/* Profile */}
      <div className="flex flex-col items-center pt-8 pb-6 px-6">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-border mb-4">
          <Image
            src="/profile.jpg"
            alt="Profile picture"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-base font-semibold tracking-tight">
          Nestor Sayson Jr.
        </h1>
        <p className="text-sm text-text-muted mt-0.5">Front-End Developer</p>
        <Link
          href="/resume"
          className="mt-4 flex items-center gap-1.5 text-sm px-5 py-1.5 rounded-lg border border-border hover:border-[--navtext] hover:text-[--navtext] transition-all duration-200">
          {mounted && (
            <MaterialSymbolsLightDownloadSharp
              className="w-4 h-4"
              fill={isDark ? "#ffffff" : "#0a0a0a"}
            />
          )}
          <span>Resume</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-6" />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        {navLinks.map(({ href, label, Icon, iconType }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-snbackground text-[--navtext] font-medium"
                  : "text-text hover:bg-snbackground"
              }`}>
              {mounted &&
                (iconType === "stroke" ? (
                  <Icon
                    className="w-5 h-5 shrink-0"
                    stroke={
                      isActive
                        ? isDark
                          ? "#4C8DFF"
                          : "#1B56FD"
                        : isDark
                        ? "#f0f0f0"
                        : "#0a0a0a"
                    }
                  />
                ) : (
                  <Icon
                    className="w-5 h-5 shrink-0"
                    fill={
                      isActive
                        ? isDark
                          ? "#4C8DFF"
                          : "#1B56FD"
                        : isDark
                        ? "#f0f0f0"
                        : "#0a0a0a"
                    }
                  />
                ))}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="h-px bg-border mb-4" />
        {/* Dark mode toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {mounted && (
              <PhMoonStarsLight
                className="w-4 h-4"
                fill={isDark ? "#9ca3af" : "#6b7280"}
              />
            )}
            <span>Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={mounted && theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-border peer-focus:outline-none rounded-full peer peer-checked:bg-[--navtext] transition-colors duration-200" />
            <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-4 shadow-sm" />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-text-muted">
          {mounted && (
            <PhCopyrightThin
              className="w-3 h-3"
              fill={isDark ? "#9ca3af" : "#6b7280"}
            />
          )}
          <span>2025 Nestor B. Sayson Jr.</span>
        </div>
      </div>
    </aside>
  );
}
