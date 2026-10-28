import ProjectInfo from "@/components/projects/ProjectInfo";
import ProjectLists from "@/components/projects/ProjectLists";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore student-led AI projects from AI at UCI — hands-on work in machine learning, applications, and research at UC Irvine.",
};

export default function Projects() {
  return (
    <div className="min-h-screen pb-16">
      <section className="flex flex-col items-center justify-center px-4 pt-36 pb-12 text-center sm:px-8 sm:pt-76 md:px-16 lg:px-24">
        <h1 className="mb-8 font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white">
          Projects
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
          Our project teams partner with startups and organizations to build AI
          that actually ships. Each quarter, students apply to join a team, work
          alongside other members, and grow a portfolio beyond coursework.
        </p>
      </section>
      <ProjectInfo />
      <ProjectLists />
    </div>
  );
}
