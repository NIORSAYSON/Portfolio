"use client";

import { useEffect, useState, useRef } from "react";
import TopBar from "./TopBar";

export default function MobileSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showTopBar, setShowTopBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setShowTopBar(true);
      } else if (currentY > lastScrollY.current) {
        setShowTopBar(false);
      } else if (currentY < lastScrollY.current) {
        setShowTopBar(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar showTopBar={showTopBar} />
      <div className="min-h-full flex flex-col">
        {/* pb-20 clears the fixed BottomNav (h-16) with breathing room */}
        <main className="flex-1 pb-20">{children}</main>
      </div>
    </>
  );
}
