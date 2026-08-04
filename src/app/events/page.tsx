import EventsSection from "@/components/sections/EventsSection";

export async function generateMetadata() {
  return {
    title: "Events - AI at UCI",
    description: "Learn more about the events held by us",
  };
}

export default function Events() {
  return <EventsSection />;
}
