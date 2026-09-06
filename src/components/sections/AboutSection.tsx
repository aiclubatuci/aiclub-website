import InvolvementBlock from "@/components/InvolvementBlock";
import PillarBlock from "@/components/PillarBlock";

function MissionHeader() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 pt-36 sm:pt-76 pb-12">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white">
        Our Mission
      </h1>
      <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
        AI at UCI is committed to fostering a community of passionate students
        dedicated to exploring and advancing artificial intelligence through
        education, research, and innovation.
      </p>
    </section>
  );
}

export default function AboutSection() {
  return (
    <div className="min-h-screen pb-16">
      <MissionHeader />
      <InvolvementBlock />
      <PillarBlock />
    </div>
  );
}
