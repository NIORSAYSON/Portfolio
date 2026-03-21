/**
 * Icon shim — maps legacy icon names to lucide-react equivalents.
 * Each wrapper translates the old `fill` / `stroke` props to Lucide's `color` prop
 * so existing call-sites keep working without changes.
 *
 * Prefer importing from "lucide-react" directly in new code.
 */
import React from "react";
import type { LucideProps } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  BookUser,
  ChevronDown,
  ChevronLeft,
  Code2,
  Copyright,
  Cpu,
  Download,
  Facebook,
  Figma,
  FileText,
  Files,
  Github,
  Globe,
  GraduationCap,
  House,
  Info,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Moon,
  Phone,
  Pin,
  Smartphone,
  UserCheck,
  Workflow,
} from "lucide-react";

type CompatProps = LucideProps & { fill?: string; stroke?: string };

function compat(LucideIcon: React.ComponentType<LucideProps>) {
  const Icon = ({ fill, stroke, color, ...rest }: CompatProps) =>
    React.createElement(LucideIcon, {
      color: color ?? fill ?? stroke,
      ...rest,
    });
  Icon.displayName = LucideIcon.displayName;
  return Icon;
}

// Navigation
export const MaterialSymbolsLightHomeOutlineRounded = compat(House);
export const MaterialSymbolsLightInfoOutlineRounded = compat(Info);
export const PhFilesLight = compat(Files);
export const MaterialSymbolsLightChatOutline = compat(MessageSquare);
export const HugeiconsContact01 = compat(BookUser);

// Theme / UI
export const PhMoonStarsLight = compat(Moon);
export const PhCopyrightThin = compat(Copyright);
export const MingcuteDownSmallLine = compat(ChevronDown);
export const MingcuteArrowLeftFill = compat(ArrowLeft);
export const FormkitArrowright = compat(ArrowRight);
export const WeuiBackFilled = compat(ChevronLeft);
export const JamMenu = compat(ChevronDown); // was hamburger menu, not currently used

// Files / Documents
export const MaterialSymbolsLightDownloadSharp = compat(Download);
export const SolarDocumentOutline = compat(FileText);
export const MdiLightPin = compat(Pin);

// Skills / Tech
export const GrommetIconsTechnology = compat(Cpu);
export const BiPersonCheck = compat(UserCheck);
export const SolarCodeLineDuotone = compat(Code2);
export const CarbonMachineLearning = compat(BrainCircuit);
export const PhOpenAiLogo = compat(Bot);
export const LineiconsFigma = compat(Figma);
export const PhDeviceMobileLight = compat(Smartphone);
export const TablerAutomation = compat(Workflow);
export const DashiconsAdminSiteAlt3 = compat(Globe);

// Contact / Communication
export const MaterialSymbolsLightMailOutline = compat(Mail);
export const CircumMail = compat(Mail);
export const MynauiLocation = compat(MapPin);
export const MdiLightPhone = compat(Phone);
export const CilEducation = compat(GraduationCap);

// Social Media
export const IcBaselineFacebook = compat(Facebook);
export const MdiInstagram = compat(Instagram);
export const BxlGmail = compat(Mail);
export const MdiLinkedin = compat(Linkedin);
export const MdiGithub = compat(Github);
export const CodiconGithubAlt = compat(Github);
