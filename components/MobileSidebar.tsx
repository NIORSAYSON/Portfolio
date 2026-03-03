"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";

export default function MobileSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMenuButton] = useState(true);
  const [showTopBar, setShowTopBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (sidebarOpen) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      delete document.body.dataset.scrollY;
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      delete document.body.dataset.scrollY;
      if (scrollY) window.scrollTo(0, scrollY);
    };
  }, [sidebarOpen]);

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
      {showMenuButton && (
        <TopBar
          showMenuButton={showMenuButton}
          showTopBar={showTopBar}
          setSidebarOpen={setSidebarOpen}
        />
      )}
      {/* Sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex"
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.25 }}>
            <motion.div
              className="bg-sbackground w-72 h-full min-h-0 border-r border-border overflow-y-auto overscroll-contain flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}>
              <Sidebar />
            </motion.div>
            <div
              className="flex-1"
              onClick={() => setSidebarOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
              aria-label="Close sidebar overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
