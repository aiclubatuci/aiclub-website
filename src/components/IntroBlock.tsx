"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import data from "@/data/data.json";

const PHOTOS = data.PHOTOS;

const HIGHLIGHTS = ["artificial intelligence", "builders", "hands-on", "grows"];

const BODY =
  "AI @ UCI is UC Irvine's student-run artificial intelligence club. We bring together builders, researchers, and curious minds to learn by doing through hands-on workshops, real projects, and a community that grows together every quarter.";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const escaped = highlights.map((phrase) =>
    phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  const matchSet = new Set(highlights);

  return (
    <>
      {parts.map((part, index) =>
        matchSet.has(part) ? (
          <span key={`${part}-${index}`} className="text-[#4a8fd4]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Stat({
  number,
  label,
  delay = 0,
}: {
  number: string;
  label: string;
  delay?: number;
}) {
  const match = /^(\d+)(.*)$/.exec(number);
  const target = match ? Number(match[1]) : 0;
  const suffix = match?.[2] ?? "";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, target, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });

    return () => controls.stop();
  }, [delay, inView, target]);

  return (
    <div ref={ref}>
      <div className="text-[clamp(2.25rem,4vw,3.25rem)] font-bold tabular-nums leading-none text-white">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-[15px] text-white/55">{label}</div>
    </div>
  );
}

function FanPhoto({
  src,
  alt,
  index,
  rotate,
  style,
}: {
  src: string;
  alt: string;
  index: number;
  rotate: number;
  style: {
    top: string;
    left: string;
    width: string;
    zIndex: number;
  };
}) {
  return (
    <motion.div
      className="absolute aspect-[4/3] overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      style={style}
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        delay: 0.12 + index * 0.1,
        ease: "easeOut",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 70vw, 320px"
        className="object-cover"
      />
    </motion.div>
  );
}

function PhotoStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <div className="w-full max-w-[500px] overflow-visible md:ml-auto">
      <motion.div
        ref={ref}
        className="relative aspect-[4/3] w-full overflow-visible md:aspect-square md:min-h-[400px]"
        style={{ y }}
      >
        <div className="relative aspect-[4/3] w-full md:aspect-square md:origin-top-right md:scale-110">
          {PHOTOS.map((photo, index) => (
            <FanPhoto
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              index={index}
              rotate={photo.rotate}
              style={{
                top: photo.top,
                left: photo.left,
                width: photo.width,
                zIndex: photo.z,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function IntroBlock() {
  return (
    <section className="overflow-x-clip bg-[#171717] px-[clamp(1.5rem,5vw,4rem)] pb-24 pt-8 md:pt-4">
      <motion.div
        className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(280px,520px)] md:gap-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="min-w-0">
          <motion.h2
            variants={itemVariants}
            className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white"
            style={{ fontFamily: "Redaction50, Georgia, serif" }}
          >
            Who We Are
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[540px] text-base leading-[1.6] text-white/70 [overflow-wrap:anywhere] md:text-[17px]"
          >
            <HighlightedText text={BODY} highlights={HIGHLIGHTS} />
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 grid max-w-[540px] grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10"
          >
            <Stat number="500+" label="active members" delay={0} />
            <Stat number="15+" label="shipped projects" delay={0.12} />
            <Stat number="20+" label="quarters running" delay={0.24} />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Link
              href="/about"
              className="inline-block rounded-full border border-white/85 px-[22px] py-2 text-lg leading-none tracking-[-0.005em] text-white no-underline transition-colors duration-150 hover:border-[#4a8fd4] hover:text-[#4a8fd4]"
            >
              Learn more
            </Link>
          </motion.div>
        </div>

        <PhotoStack />
      </motion.div>
    </section>
  );
}
