import Link from "next/link";

const ITEMS = [
  {
    label: "Weekly meetings",
    primary: "Wed 4:00–5:30 PM",
    secondary: "DBH 6011, UC Irvine",
  },
  {
    label: "Open to everyone",
    primary: "Every major welcome",
    secondary: "No experience required",
  },
] as const;

export default function InvolvementBlock() {
  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] pb-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="px-0 py-8 md:px-10 md:py-10 md:first:pl-0 md:last:pr-0"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-white/45">
              {item.label}
            </p>
            <p className="mt-3 text-lg text-white">{item.primary}</p>
            <p className="mt-1 text-[15px] text-white/55">{item.secondary}</p>
          </div>
        ))}

        <div className="px-0 py-8 md:px-10 md:py-10 md:first:pl-0 md:last:pr-0">
          <p className="text-xs uppercase tracking-[0.15em] text-white/45">
            Get involved
          </p>
          <a
            href="https://discord.gg/fKd7mpcq"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-lg text-white transition-colors duration-150 hover:text-[#4a8fd4]"
          >
            Join the Discord
          </a>
          <div className="mt-1">
            <Link
              href="/events"
              className="text-[15px] text-white/55 no-underline transition-colors duration-150 hover:text-white"
            >
              Upcoming events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
