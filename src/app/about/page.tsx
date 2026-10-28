import Mission from "@/components/about/Mission";
import Involvement from "@/components/about/Involvement";
import Pillars from "@/components/about/Pillars";
import Board from "@/components/about/Board";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AI at UCI's mission, pillars, and student leadership. We foster education, research, and innovation in artificial intelligence at UC Irvine.",
};

export default function About() {
  return (
    <div className="min-h-screen pb-16">
      <Mission />
      <Involvement />
      <Pillars />
      <Board />
    </div>
  );
}
