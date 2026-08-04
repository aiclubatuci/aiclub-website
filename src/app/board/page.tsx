import TeamCard from "../../components/TeamCard";
import type { Member } from "../../components/TeamCard";
import Image from "next/image";
import data from "../../data/data.json";

type Committee = {
  name: string;
  members: Member[];
};

export async function generateMetadata() {
  return {
    title: "Meet the Team - AI at UCI",
    description: "Learn more about the amazing people behind our organization",
  };
}

export default function Board() {
  const committees: Committee[] = data.Team;

  return (
    <div className="pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center gap-12 sm:gap-20 pt-48 md:pt-0">
        {/* Heading */}
        <div className="text-center max-w-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-500">
            Meet the Team
          </h1>
          <p className="text-base sm:text-lg">
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
            className="object-cover w-full rounded-lg border border-[#363636]"
          />
        </div>
      </section>

      {/* Committees */}
      <section className="max-w-6xl mx-auto space-y-16">
        {committees.map((committee) => (
          <div key={committee.name}>
            <h2 className="text-2xl font-bold mb-8 text-gray-400 text-center sm:text-left">
              {committee.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 sm:justify-items-center">
              {committee.members.map((member, index) => (
                <TeamCard key={index} member={member} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
