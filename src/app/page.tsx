import HomeSection from "@/components/sections/HomeSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - AI at UCI",
  description:
    "AI at UCI is a student-run organization at the University of California, Irvine that aims to promote the use of AI in the campus community.",
  icons: {
    icon: "/img/global/ailogo.png",
  },
};

export default function Home() {
  return <HomeSection />;
}
