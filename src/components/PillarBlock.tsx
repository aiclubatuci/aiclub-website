"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

type PillarData = {
  id: string;
  href: string;
  title: string;
  body: string;
  photo: { src: string; alt: string };
};

const PILLARS: PillarData[] = [
  {
    id: "community",
    href: "/events",
    title: "Community",
    photo: {
      src: "/img/landing/landingbg.jpg",
      alt: "AI at UCI community gathering",
    },
    body: "Get involved in the AI at UCI community and meet other students who are passionate about AI. We provide a space for students to network, learn, build, and grow together via our events and socials.",
  },
  {
    id: "learning",
    href: "/events",
    title: "Learning",
    photo: {
      src: "/img/global/board.jpg",
      alt: "Members collaborating at an AI at UCI gathering",
    },
    body: "Learn more about the tools, machine learning, and AI technologies used in industry through our live workshops and events. We host weekly workshops on the latest AI tools, talks from industry experts, and much more. Come learn and build with us!",
  },
  {
    id: "projects",
    href: "/projects",
    title: "Projects",
    photo: {
      src: "/img/projects/sunstone.png",
      alt: "Students shipping a real-world AI project",
    },
    body: "Participate in real-world AI projects and expand your portfolio. We work on projects that are actually used in the industry, and you'll get to work on them with other students and industry experts. Along the way, you'll learn about the latest AI technologies and best practices.",
  },
];

function Pillar({ pillar }: { pillar: PillarData }) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.42"],
  });
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const imageY = useTransform(parallaxProgress, [0, 1], ["12%", "-12%"]);

  return (
    <motion.article
      ref={ref}
      id={pillar.id}
      className="scroll-mt-24 py-6"
      style={{ opacity, y }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-x-14 gap-y-6 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f] shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
          <motion.div
            className="absolute inset-[-14%] will-change-transform"
            style={{ y: imageY }}
          >
            <Image
              src={pillar.photo.src}
              alt={pillar.photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </motion.div>
        </div>

        <div className="min-w-0 text-left">
          <Link
            href={pillar.href}
            className="inline-block rounded-full border border-white/85 px-[22px] py-2 text-lg leading-none tracking-[-0.005em] text-white no-underline transition-colors duration-150 hover:border-[#4a8fd4] hover:text-[#4a8fd4]"
          >
            {pillar.title}
          </Link>

          <p className="mt-[18px] text-base leading-[1.6] text-white/70 md:mt-10 md:text-[19px]">
            {pillar.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function PillarHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.65"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <motion.h2
      ref={ref}
      className="mb-2 text-center font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white"
      style={{ opacity, y }}
    >
      What We Provide
    </motion.h2>
  );
}
