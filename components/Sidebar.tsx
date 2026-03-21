"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookUser,
  Copyright,
  Download,
  Files,
  House,
  Info,
  MessageSquare,
  Moon,
  PenLine,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home", Icon: House },
  { href: "/about", label: "About", Icon: Info },
  { href: "/projects", label: "Projects", Icon: Files },
  { href: "/blog", label: "Blog", Icon: PenLine },
  { href: "/chat", label: "Chat with Me", Icon: MessageSquare },
  { href: "/contact", label: "Contact", Icon: BookUser },
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
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent/30 mb-4">
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
        <p className="text-sm text-text-muted mt-0.5">Software Engineer</p>
        <Link
          href="/resume"
          className="mt-4 flex items-center gap-1.5 text-sm px-5 py-1.5 rounded-lg border border-border hover:border-accent hover:text-accent transition-all duration-200">
          {mounted && <Download className="w-4 h-4" />}
          <span>Resume</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-6" />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        {navLinks.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 overflow-hidden ${
                isActive
                  ? "bg-snbackground text-accent font-medium"
                  : "text-text hover:bg-snbackground"
              }`}>
              {/* Active left indicator bar */}
              {/* {isActive && (
                <span
                  className="absolute inset-y-0 left-0 w-[3px] bg-accent"
                  aria-hidden="true"
                />
              )} */}
              {mounted && (
                <Icon
                  className="w-5 h-5 shrink-0"
                  color={
                    isActive ? "var(--accent)" : isDark ? "#f0f0f0" : "#0a0a0a"
                  }
                />
              )}
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
              <Moon
                className="w-4 h-4"
                color={isDark ? "#9ca3af" : "#6b7280"}
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
            <div className="w-9 h-5 bg-border peer-focus:outline-none rounded-full peer peer-checked:bg-accent transition-colors duration-200" />
            <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-4 shadow-sm" />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-text-muted">
          {mounted && (
            <Copyright
              className="w-3 h-3"
              color={isDark ? "#9ca3af" : "#6b7280"}
            />
          )}
          <span>{new Date().getFullYear()} Nestor B. Sayson Jr.</span>
        </div>
      </div>
    </aside>
  );
}
