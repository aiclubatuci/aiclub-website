import Image from "next/image";

export type Event = {
  title: string;
  tag: string;
  dayLabel?: string;
  dateLabel: string;
  datetimeText: string;
  locationText: string;
  flyerSrc?: string;
  description?: string;
  status: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#1f1f1f] transition-colors duration-300 hover:border-white/[0.16]">
      {event.flyerSrc && (
        <div className="relative aspect-[16/10] bg-[#282828]">
          <Image
            src={event.flyerSrc}
            alt={`${event.title} flyer`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-x-2 text-[10px] uppercase tracking-[0.06em] text-white/40">
          <span>{event.dateLabel}</span>
          {event.tag && (
            <>
              <span className="text-white/20">·</span>
              <span className="text-[#4a8fd4]">{event.tag}</span>
            </>
          )}
        </div>
        <h3 className="mt-1.5 text-sm leading-snug text-white">{event.title}</h3>
        <p className="mt-1 text-xs text-white/50">{event.locationText}</p>
      </div>
    </div>
  );
}
