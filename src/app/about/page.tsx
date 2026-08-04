import AboutSection from "@/components/sections/AboutSection";

export async function generateMetadata() {
  return {
    title: "About - AI at UCI",
    description: "Learn more about AI at UCI and our mission",
  };
}

export default function About() {
  return <AboutSection />;
}
