import EventsSection from "@/components/sections/EventsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past AI at UCI events — workshops, talks, and community gatherings for students interested in artificial intelligence at UC Irvine.",
};

export default function Events() {
  return <EventsSection />;
}
