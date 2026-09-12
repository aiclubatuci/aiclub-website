import ProjectsSection from "@/components/sections/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore student-led AI projects from AI at UCI — hands-on work in machine learning, applications, and research at UC Irvine.",
};

export default function Projects() {
  return <ProjectsSection />;
}
