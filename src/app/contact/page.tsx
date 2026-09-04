import ContactSection from "@/components/sections/ContactSection";

export async function generateMetadata() {
  return {
    title: "Contact - AI at UCI",
    description: "Contact AI at UCI for any questions or inquiries",
  };
}

export default function Contact() {
  return <ContactSection />;
}
