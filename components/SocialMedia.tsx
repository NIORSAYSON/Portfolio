import {
  BxlGmail,
  IcBaselineFacebook,
  MdiGithub,
  MdiInstagram,
  MdiLinkedin,
} from "@/app/icons";
import { useTheme } from "next-themes";

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
    href: "https://www.instagram.com/niorsayson/",
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
  return (
    <div className="flex justify-center items-center flex-nowrap gap-2 my-6">
      {socialLinks.map(({ Icon, color, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className={`p-2 rounded-full transition-all transform hover:scale-110 ${
            theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          <Icon
            className="h-9 w-9"
            fill={color ?? (theme === "dark" ? "#fff" : "#000")}
          />
        </a>
      ))}
    </div>
  );
}
