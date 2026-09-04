"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Newsletter } from "@/components/Newsletter";
import { SocialLinks } from "@/components/SocialLinks";

type SubscribeRequest = {
  firstName: string;
  lastName: string;
  email: string;
};

type SubscribeResponse = {
  successMessage?: string;
  errorMessage?: string;
};

export default function ContactSection() {
  const email = "aiclub@uci.edu";

  const [isPending, setIsPending] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setSubscribeSuccess("");
    setSubscribeError("");

    const formData = new FormData(e.currentTarget);

    const requestBody: SubscribeRequest = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
    };

    try {
      const res: Response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const responseBody: SubscribeResponse = await res.json();

      if (res.ok && responseBody.successMessage) {
        setSubscribeSuccess(responseBody.successMessage);
        e.currentTarget.reset();
      } else {
        setSubscribeError(responseBody.errorMessage ?? "Something went wrong.");
      }
    } catch {
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="w-full px-4 py-16 lg:px-32 text-center overflow-hidden">
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white mb-6">
          Contact Us
        </h1>

        <h2 className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm text-white/55 mb-8">
          Questions? Don't hesitate to reach out!
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

        <Newsletter
          handleSubmit={handleSubmit}
          isPending={isPending}
          subscribeSuccess={subscribeSuccess}
          subscribeError={subscribeError}
        />

        <h2 className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm text-white/55 mb-8">
          Connect with us on social media
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          <SocialLinks email={email}></SocialLinks>
        </div>
      </div>
    </div>
  );
}
