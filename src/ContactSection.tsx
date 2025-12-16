"use client";
import React, { useState } from "react";
import { addSubscriber } from "./app/action.js";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = "aiclub@uci.edu";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  const [isPending, setIsPending] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsPending(true);
      setSubscribeSuccess("");
      setSubscribeError("");
      const formData = new FormData(e.target);
      const res = await addSubscriber(formData);
      if (res.successMessage) {
          setSubscribeSuccess(res.successMessage);
      } else if (res.errorMessage) {
          setSubscribeError(res.errorMessage);
      }
      setIsPending(false);
  };

  return (
    <div
      id="Contact"
      className="w-full px-4 py-16 lg:px-32 text-center overflow-hidden"
    >
      <h1
        className="font-extrabold text-3xl sm:text-4xl lg:text-[40px] mb-6"
      >
        Questions? Contact Us!
      </h1>

      <h2
        className="font-bold text-lg sm:text-xl mb-6"
      >
        Don't hesitate to reach out
      </h2>

      <button
        onClick={handleCopy}
        style={{
          width: "200px",
          height: "60px",
          borderRadius: "50px",
          background: "rgba(217, 217, 217, 0.1)",
          opacity: 1,
          transform: "rotate(0deg)",
          marginBottom: "30px",
        }}
      >
        <span
          style={{
            width: "180px",
            height: "28.8px",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            fontStyle: "bold",
            opacity: 1,
            transform: "rotate(0deg)",
          }}
        >
          {copied ? "Copied!" : email}
        </span>
      </button>

      <div
        className="mx-auto mb-10 w-full max-w-xl rounded-xl bg-white/10 p-6 sm:p-8"
        style={{
          background: "rgba(217, 217, 217, 0.1)",
        }}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full rounded-lg bg-gray-100 px-4 py-4 font-semibold text-black placeholder-black"
                required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full rounded-lg bg-gray-100 px-4 py-4 font-semibold text-black placeholder-black"
              required
            />
          </div>

          <input 
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full rounded-lg bg-gray-100 px-4 py-4 font-semibold text-black placeholder-black"
            required
          />

          <p
            className={`text-center text-base font-semibold ${
              subscribeSuccess
                ? "text-[rgb(46,139,87)]"
                : "text-[rgb(205,28,24)]"
            }`}
          >
            {subscribeSuccess || subscribeError}
          </p>

          <button type="submit" className="mt-1 w-full rounded-full py-4 bg-linear-to-b from-gray-400 to-white font-bold text-black placeholder-black" disabled={isPending}>
            {isPending ? "Processing..." : "Sign Up!"}
          </button>
        </form>
      </div>

      <h2 className="font-bold text-lg sm:text-xl mb-4">
        Connect with us on social media!
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
          <img className="h-10 sm:h-12" src="/img/global/mail.svg" />
        </a>

        <a
          href="https://www.facebook.com/aiatuci/"
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-10 sm:h-12" src="/img/global/facebook.svg" />
        </a>

        <a href="https://www.linkedin.com/company/aiatuci/" target="_blank">
          <img className="h-10 sm:h-12" src="/img/global/linkedin.svg" />
        </a>
        <a href="https://www.instagram.com/aiatuci/" target="_blank">
          <img className="h-10 sm:h-12" src="/img/global/instagram.svg" />
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
