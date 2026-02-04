import EventCard from "@/components/EventCard";
import type { Event } from "@/components/EventCard";
import data from "../../data/data.json";

export async function generateMetadata() {
  return {
    title: "Events - AI at UCI",
    description: "Learn more about the events held by us",
  };
}

export default function Events() {
  const events: Event[] = data.Events;
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const previousEvents = events.filter((e) => e.status === "previous");

  return (
    <div className="min-h-screen pt-36 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Upcoming */}
        <section className="mb-20">
          <h1 className="text-2xl font-bold uppercase tracking-[0.15em] text-gray-500 mb-8">
            Upcoming Events
          </h1>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm">
                No upcoming events right now...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
        </section>

        {/* Previous */}
        <section>
          <h1 className="text-2xl font-bold uppercase tracking-[0.15em] text-gray-500 mb-8">
            Previous Events
          </h1>
          {previousEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm">Coming soon...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
              {previousEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
