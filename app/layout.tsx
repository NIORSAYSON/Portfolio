import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { MaterialSymbolsLightDownloadSharp } from "./icons";
import Sidebar from "./components/sidebar";

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
      <body className={`antialiased ${inter.className}`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
