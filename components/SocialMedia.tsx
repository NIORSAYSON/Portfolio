import { socialMediaPlatforms } from "@/app/constants";

import { useTheme } from "next-themes";

export default function SocialMedia() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center flex-wrap gap-1 my-10">
      {socialMediaPlatforms.map((Icon, idx) => (
        <button
          key={idx}
          className={`p-2 rounded-full transition-colors transform hover:scale-110 ${
            theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
          aria-label={`social-icon-${idx}`}
          onClick={() => {
            if (idx === 0) {
              window.open(
                "https://www.facebook.com/nioooooor?mibextid=ZbWKwL",
                "_blank"
              );
            } else if (idx === 1) {
              window.open("https://www.instagram.com/niorsayson/", "_blank");
            } else if (idx === 2) {
              window.location.href = "mailto:nessayson@gmail.com";
            } else if (idx === 3) {
              window.open(
                "https://www.linkedin.com/in/nestor-sayson-b8671b292/",
                "_blank"
              );
            } else if (idx === 4) {
              window.open("https://github.com/NIORSAYSON", "_blank");
            }
          }}>
          <Icon
            className="h-10 w-10"
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        </button>
      ))}
    </div>
  );
}
