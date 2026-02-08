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

export default function Contact() {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full px-4 py-16 lg:px-32 text-center overflow-hidden text-white">
        <h1 className="font-extrabold uppercase tracking-[0.12em] text-3xl sm:text-4xl lg:text-[40px] mb-6">
          Questions? Contact Us!
        </h1>

        <h2 className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm text-gray-400 mb-8">
          Don't hesitate to reach out
        </h2>

        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-10 inline-flex w-[240px] h-[52px] items-center justify-center rounded-full border border-white/25 bg-transparent text-gray-200 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          <span className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm">
            {email}
          </span>
        </a>

        <Newsletter
          handleSubmit={handleSubmit}
          isPending={isPending}
          subscribeSuccess={subscribeSuccess}
          subscribeError={subscribeError}
        />

        <h2 className="font-medium uppercase tracking-[0.12em] text-xs sm:text-sm text-gray-400 mb-8">
          Connect with us on social media
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          <SocialLinks email={email}></SocialLinks>
        </div>
      </div>
    </div>
  );
}
