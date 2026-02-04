import Image from "next/image";

export type Event = {
  title: string;
  tag: string;
  dayLabel?: string;
  dateLabel: string;
  datetimeText: string;
  locationText: string;
  flyerSrc: string;
  status: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="group block border border-[#363636]/40 rounded-lg hover:border-[#363636] transition-colors duration-300 overflow-hidden">
      {/* Flyer */}
      <div className="relative aspect-[3/4] bg-neutral-100">
        <Image
          src={event.flyerSrc}
          alt={`${event.title} flyer`}
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="p-4">
        {/* Single tag */}
        <span className="mb-2 inline-block rounded-full bg-transparent border border-white/10 px-3 py-1 text-xs font-semibold text-blue-400">
          {event.tag}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-neutral-400 mb-1">
          {event.title}
        </h3>

        {/* Date & Location */}
        <p className="text-sm text-neutral-600">
          {event.datetimeText}
          <span className="mx-1 text-neutral-400">·</span>
          {event.locationText}
        </p>
      </div>
    </div>
  );
}
