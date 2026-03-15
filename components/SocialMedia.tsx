import {
  BxlGmail,
  IcBaselineFacebook,
  MdiGithub,
  MdiInstagram,
  MdiLinkedin,
} from "@/app/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    Icon: IcBaselineFacebook,
    color: "#1877F2",
    label: "Facebook",
    href: "https://www.facebook.com/nioooooor?mibextid=ZbWKwL",
  },
  {
    Icon: MdiInstagram,
    color: "#E1306C",
    label: "Instagram",
    href: "https://www.instagram.com/neon.nior/",
  },
  {
    Icon: BxlGmail,
    color: "#EA4335",
    label: "Gmail",
    href: "mailto:nessayson@gmail.com",
  },
  {
    Icon: MdiLinkedin,
    color: "#0A66C2",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nestor-sayson-b8671b292/",
  },
  {
    Icon: MdiGithub,
    color: null,
    label: "GitHub",
    href: "https://github.com/NIORSAYSON",
  },
];

export default function SocialMedia() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = mounted && theme === "dark";

  return (
    <div className="flex justify-center items-center flex-nowrap gap-3 my-4">
      {socialLinks.map(({ Icon, color, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2.5 rounded-full border border-border hover:border-[--navtext] hover:bg-snbackground transition-all duration-200 group">
          <Icon
            className="h-5 w-5 transition-all duration-200"
            fill={color ?? (isDark ? "#f0f0f0" : "#0a0a0a")}
          />
        </a>
      ))}
    </div>
  );
}
