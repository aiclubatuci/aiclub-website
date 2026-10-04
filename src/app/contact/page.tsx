import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AI at UCI, join our mailing list, or reach us on Discord, LinkedIn, Instagram, and X. Meetings Mondays 4:00–6:00 PM in DBH.",
};

export default function Contact() {
  return <ContactSection />;
}
