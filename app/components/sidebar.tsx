import Image from "next/image";
import Link from "next/link";
import { MaterialSymbolsLightDownloadSharp } from "../icons";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white p-6">
      <Image
        src="/profile.jpg"
        alt="Profile picture"
        width={137}
        height={137}
        className="rounded-full mb-4 justify-center mx-auto border-1 border-black"
      />
      <h1 className="text-xl font-semibold text-center text-black ">
        Nestor Sayson Jr.
      </h1>
      <h1 className="text-sm font-semibold text-center mb-4 text-black ">
        Front-End Developer
      </h1>
      <div className="flex justify-center mb-4">
        <button
          type="button"
          className="flex flex-row items-center text-black text-base px-16 border border-black text-center py-1 rounded-sm hover:bg-gray-100 transition">
          <span className="mr-1">
            <MaterialSymbolsLightDownloadSharp className="w-5 h-5" />
          </span>
          <span>Resume</span>
        </button>
      </div>
      <nav className="flex flex-col gap-3">
        <Link href="/" className="hover:underline text-black">
          Home
        </Link>
        <Link href="/about" className="hover:underline text-black">
          About
        </Link>
      </nav>
    </aside>
  );
}
