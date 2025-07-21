import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import { ThemeProvider } from "next-themes";

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
    <html
      lang="en"
      className={`${inter.className} dark`}
      suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex bg-background transition-all duration-300">
            {/* Sidebar for large screens */}
            <aside className="hidden md:flex fixed left-0 top-0 h-full z-30 w-72 shadow-xl">
              <Sidebar />
            </aside>
            {/* Main Content for large screens */}
            <main className="flex-1 md:ml-72 min-h-screen relative">
              {/* Mobile sidebar and main content */}
              <div className="md:hidden bg-background transition-all duration-300">
                <MobileSidebar>{children}</MobileSidebar>
              </div>
              {/* Desktop main content */}
              <div className="hidden md:block">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
