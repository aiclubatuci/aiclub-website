import NewsletterForm from "@/components/contact/NewsletterForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AI at UCI, join our mailing list, or reach us on Discord, LinkedIn, Instagram, and X. Meetings Mondays 4:00–6:00 PM in DBH.",
};

export default function Contact() {
  const email = "aiclub@uci.edu";

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="w-full px-4 py-16 lg:px-32 text-center overflow-hidden">
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white mb-6">
          Contact Us
        </h1>

        <h2 className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm text-white/55 mb-8">
          Questions? Don&apos;t hesitate to reach out!
        </h2>

        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-8 inline-flex w-[240px] h-[52px] items-center justify-center rounded-full border border-white/25 bg-transparent text-gray-200 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          <span className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm">
            {email}
          </span>
        </a>

        <h2 className="font-serif text-[clamp(2rem,4.5vw,2.5rem)] font-normal leading-[1.05] text-white mb-8">
          Newsletter
        </h2>

        <NewsletterForm />

        <h2 className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm text-white/55 mb-8">
          Connect with us on social media
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          <SocialLinks email={email} />
        </div>
      </div>
    </div>
  );
}
