"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
  isLast?: boolean;
}

export default function ChatMessage({
  message,
  isUser,
  timestamp,
  isLast,
}: ChatMessageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isLast || !containerRef.current) return;

    const el = containerRef.current;

    const getScrollParent = (node: HTMLElement | null): Element => {
      let parent: HTMLElement | null = node;
      while (parent) {
        const style = getComputedStyle(parent);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          parent.scrollHeight > parent.clientHeight
        ) {
          return parent;
        }
        parent = parent.parentElement;
      }
      return document.scrollingElement || document.documentElement;
    };

    requestAnimationFrame(() => {
      const scrollParent = getScrollParent(el);
      try {
        (scrollParent as Element).scrollTo({
          top: (scrollParent as HTMLElement).scrollHeight,
          behavior: "smooth",
        });
      } catch {
        try {
          el.scrollIntoView({ block: "end" });
        } catch {
          (scrollParent as HTMLElement).scrollTop = (
            scrollParent as HTMLElement
          ).scrollHeight;
        }
      }
    });
  }, [mounted, isLast]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isDark = mounted && theme === "dark";

  if (!mounted) {
    return (
      <div
        ref={containerRef}
        suppressHydrationWarning
        className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} ${
          isLast ? "mb-0" : "mb-4"
        }`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-border shrink-0" />
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 max-w-[75%] md:max-w-[65%] ${
            isUser ? "bg-navtext text-white" : "bg-snbackground border border-border"
          }`}>
          <p className="text-sm whitespace-pre-wrap wrap-break-word">{message}</p>
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-navtext shrink-0" />
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} ${
        isLast ? "mb-0" : "mb-4"
      }`}>
      {!isUser && (
        <div className="shrink-0">
          <Image
            src="/profile.jpg"
            alt="Assistant"
            width={32}
            height={32}
            className="rounded-full object-cover ring-1 ring-border"
          />
        </div>
      )}
      <div
        className={`flex flex-col max-w-[75%] md:max-w-[65%] ${
          isUser ? "items-end" : "items-start"
        }`}>
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-navtext text-white"
              : isDark
              ? "bg-snbackground border border-border text-text"
              : "bg-snbackground border border-border text-text"
          }`}>
          <p className="text-sm whitespace-pre-wrap wrap-break-word">{message}</p>
        </div>
        {timestamp && (
          <span className="text-[11px] text-text-muted mt-1 px-1">
            {formatTime(timestamp)}
          </span>
        )}
      </div>
      {isUser && (
        <div className="shrink-0">
          <div className="w-8 h-8 rounded-full bg-navtext flex items-center justify-center text-white shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="sr-only">User</span>
          </div>
        </div>
      )}
    </div>
  );
}
