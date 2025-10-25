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

  // When this message is the last one, scroll the nearest scrollable ancestor
  // to its bottom so the message is fully visible.
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
      // fallback to viewport's scrolling element
      return document.scrollingElement || document.documentElement;
    };

    // Wait until the browser has painted the new message/layout.
    requestAnimationFrame(() => {
      const scrollParent = getScrollParent(el);
      try {
        // Prefer scrolling the parent to its scrollHeight to reach the very bottom
        (scrollParent as Element).scrollTo({
          top: (scrollParent as HTMLElement).scrollHeight,
          behavior: "smooth",
        });
      } catch {
        // Fallbacks
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

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <div
        ref={containerRef}
        suppressHydrationWarning={true}
        className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} ${
          isLast ? "mb-0" : "mb-4"
        }`}>
        {!isUser && (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        )}
        <div
          className={`flex flex-col max-w-[75%] md:max-w-[60%] ${
            isUser ? "items-end" : "items-start"
          }`}>
          <div
            className={`rounded-2xl px-4 py-2.5 ${
              isUser ? "bg-[#1B56FD] text-white" : "bg-gray-100 text-black"
            }`}>
            <p className="text-sm md:text-base whitespace-pre-wrap break-words">
              {message}
            </p>
          </div>
          {/* Don't render the timestamp on the server/pre-mount to avoid
              locale/timezone hydration mismatches. It will be rendered
              after client mount in the mounted branch. */}
        </div>
        {isUser && (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#1B56FD]" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning={true}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} ${
        isLast ? "mb-0" : "mb-4"
      }`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="User"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        </div>
      )}
      <div
        className={`flex flex-col max-w-[75%] md:max-w-[60%] ${
          isUser ? "items-end" : "items-start"
        }`}>
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-[#1B56FD] text-white"
              : theme === "dark"
              ? "bg-[#2c2c2c] text-white"
              : "bg-gray-100 text-black"
          }`}>
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
        {timestamp && (
          <span className="text-xs opacity-50 mt-1 px-1">
            {formatTime(timestamp)}
          </span>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#1B56FD] flex items-center justify-center text-white font-semibold text-sm leading-none">
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
