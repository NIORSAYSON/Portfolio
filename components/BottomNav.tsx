"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookUser,
  Files,
  House,
  Info,
  MessageSquare,
  PenLine,
} from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home", Icon: House },
  { href: "/about", label: "About", Icon: Info },
  { href: "/projects", label: "Projects", Icon: Files },
  { href: "/blog", label: "Blog", Icon: PenLine },
  { href: "/chat", label: "Chat", Icon: MessageSquare },
  { href: "/contact", label: "Contact", Icon: BookUser },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-sbackground/95 backdrop-blur-sm border-t border-border"
      aria-label="Mobile navigation">
      <div className="flex items-stretch h-16">
        {navLinks.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`relative flex flex-col items-center justify-center flex-1 min-h-[44px] gap-0.5 transition-colors duration-200 ${
                isActive ? "text-accent" : "text-text-muted"
              }`}>
              {/* Active top indicator */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent rounded-b-full"
                  aria-hidden="true"
                />
              )}
              <Icon
                className="w-6 h-6"
                color={isActive ? "var(--accent)" : "var(--text-muted)"}
              />
              <span className="text-[10px] font-medium leading-none">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
