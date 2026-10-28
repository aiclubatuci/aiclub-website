import Upcoming from "@/components/events/Upcoming";
import Previous from "@/components/events/Previous";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past AI at UCI events — workshops, talks, and community gatherings for students interested in artificial intelligence at UC Irvine.",
};

export default function Events() {
  const events: Event[] = eventsData;
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const previousEvents = events.filter((e) => e.status === "previous");

  return (
    <div className="min-h-screen pb-16">
      <section className="flex flex-col items-center justify-center px-4 pt-36 pb-12 text-center sm:px-8 sm:pt-72 md:px-16 lg:px-24">
        <h1 className="mb-8 font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white">
          Events
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
          We host events with a wide range of topics about each week during the
          academic quarter, including machine learning, AI techniques, interactive
          advice from industry speakers, social events, and more.
        </p>
      </section>
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        <Upcoming events={upcomingEvents} />
        <Previous events={previousEvents} />
      </div>
    </div>
  );
}
