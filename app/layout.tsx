import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  // variable: "--font-inter",
  // display: "swap",?
});

export const metadata: Metadata = {
  title: "Nestor Sayson Jr. | Portfolio",
  description:
    "This is the personal portfolio website of Nestor Sayson Jr., showcasing projects, skills, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`antialiased ${inter.className}`}>
        <div className="min-h-screen flex bg-[#F5F5F5]">
          {/* Sidebar for large screens */}
          <aside className="hidden md:flex fixed left-0 top-0 h-full z-30 w-72 border-r border-gray-200 bg-white shadow-xl">
            <Sidebar />
          </aside>
          {/* Main Content for large screens */}
          <main className="flex-1 md:ml-72 bg-[#F5F5F5] min-h-screen relative md:pt-5">
            {/* Mobile sidebar and main content */}
            <div className="md:hidden">
              <MobileSidebar>{children}</MobileSidebar>
            </div>
            {/* Desktop main content */}
            <div className="hidden md:block">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
