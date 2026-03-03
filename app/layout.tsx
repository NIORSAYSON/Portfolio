import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nestor Sayson Jr. | Portfolio",
  description:
    "This is the personal portfolio website of Nestor Sayson Jr., showcasing projects, skills, and experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning>
      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex bg-background transition-all duration-300">
            {/* Sidebar for large screens */}
            <aside className="hidden md:flex fixed left-0 top-0 h-full z-30 w-72">
              <Sidebar />
            </aside>
            {/* Main Content for large screens */}
            <main className="flex-1 md:ml-72 min-h-screen relative">
              {/* Mobile sidebar and main content */}
              <div className="md:hidden bg-background transition-all duration-300">
                <MobileSidebar>{children}</MobileSidebar>
              </div>
              {/* Desktop main content */}
              <div className="hidden md:block h-full">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
