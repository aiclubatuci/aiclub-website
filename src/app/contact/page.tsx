import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AI at UCI, join our mailing list, or reach us on Discord, LinkedIn, Instagram, and X. Meetings in DBH 6011, Wednesdays 4:00–5:30 PM.",
};

export default function Contact() {
  return <ContactSection />;
}
