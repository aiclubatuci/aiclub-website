import AboutSection from "@/components/sections/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AI at UCI's mission, pillars, and student leadership. We foster education, research, and innovation in artificial intelligence at UC Irvine.",
};

export default function About() {
  return <AboutSection />;
}
