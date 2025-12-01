import TeamCard from "../../components/TeamCard";
import Image from "next/image";
import data from "../../data/data.json";

export async function generateMetadata() {
  return {
    title: "Meet the Team - AI at UCI",
    description: "Learn more about the amazing people behind our organization",
  };
}

export default function Board() {
  const members = data.Team;

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center gap-12 sm:gap-20 px-4 sm:px-8 md:px-16 pt-48 md:pt-0">
        {/* Heading */}
        <div className="text-center md:text-left max-w-lg text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Meet the Team</h1>
          <p className="text-sm sm:text-lg">
            The passionate students driving AI innovation, education, and
            community at UCI.
          </p>
        </div>

        {/* Floating Image */}
        <div className="max-w-xl">
          <Image
            src={"/img/global/board.jpg"}
            alt="Board"
            width={1600}
            height={1200}
            className="object-cover w-full rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 justify-items-center">
          {members.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
