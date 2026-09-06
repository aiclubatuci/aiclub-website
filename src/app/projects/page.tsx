import ProjectsSection from "@/components/sections/ProjectsSection";

export async function generateMetadata() {
  return {
    title: "Projects - AI at UCI",
    description: "View the projects of AI at UCI",
  };
}

export default function Projects() {
  return <ProjectsSection />;
}
