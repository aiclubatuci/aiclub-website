"use client";

import { motion } from "framer-motion";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import type { Event } from "@/types";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function WorkshopVideo({ events }: { events: Event[] }) {
  const workshop = [...events]
    .reverse()
    .find((event) => event.tag === "Workshop" && event.youtubeId);

  if (!workshop?.youtubeId) return null;

  return (
    <motion.section
      className="mt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div variants={itemVariants}>
        <h2 className="mb-8 font-serif text-2xl font-normal leading-[1.05] text-white">
          Latest workshop
        </h2>
        <p className="mb-4 text-sm text-white/55">{workshop.title}</p>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-xl border border-white/[0.08]"
      >
        <LiteYouTubeEmbed
          id={workshop.youtubeId}
          title={workshop.title}
          poster="hqdefault"
          lazyLoad
        />
      </motion.div>
    </motion.section>
  );
}
