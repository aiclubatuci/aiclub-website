"use client";

import TeamCard from "@/components/TeamCard";
import type { Member } from "@/components/TeamCard";
import data from "@/data/data.json";
import { motion } from "framer-motion";

type Committee = {
  name: string;
  members: Member[];
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function BoardHeader() {
  return (
    <section className="mx-auto max-w-6xl pb-16 pt-8 text-center">
      <h2 className="mb-8 font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white">
        Meet the Team
      </h2>
      <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
        The passionate students driving AI innovation, education, and community
        at UCI.
      </p>
    </section>
  );
}

function BoardGrid({ committees }: { committees: Committee[] }) {
  return (
    <section className="mx-auto max-w-6xl space-y-16">
      {committees.map((committee) => (
        <div key={committee.name}>
          <h2 className="mb-8 text-center font-serif text-2xl font-normal leading-[1.05] text-white sm:text-left">
            {committee.name}
          </h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 sm:justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {committee.members.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-full"
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}

export default function BoardSection() {
  const committees: Committee[] = data.Team;
  return (
    <div className="px-4 pb-16 sm:px-8 md:px-16 lg:px-24">
      <BoardHeader />
      <BoardGrid committees={committees} />
    </div>
  );
}
