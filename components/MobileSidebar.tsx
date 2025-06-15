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
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setShowTopBar(true);
      } else if (currentY > lastScrollY.current) {
        // Scrolling down
        setShowTopBar(false);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up
        setShowTopBar(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Menu button for small screens */}
      {showMenuButton && (
        <TopBar
          showMenuButton={showMenuButton}
          showTopBar={showTopBar}
          setSidebarOpen={setSidebarOpen}
        />
      )}
      {/* Sidebar drawer for small screens */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex"
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.3 }}>
            <motion.div
              className="bg-white w-72 h-full min-h-0 shadow-2xl overflow-y-auto flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}>
              <Sidebar />
            </motion.div>
            <div
              className="flex-1"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main content area with full background */}
      <div className="min-h-full bg-[#F5F5F5] flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
