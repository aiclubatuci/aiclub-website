"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/board" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", { firstName, email });
    setFirstName("");
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#282828] text-white relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#171717] via-[#1f1f1f] to-[#282828]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-24 md:pt-28 pb-16 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-12 lg:gap-16">
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <Link href="/" className="inline-block group w-fit relative">
                <div className="absolute inset-0 bg-[#D9D9D9]/20 rounded-full blur-xl group-hover:bg-[#D9D9D9]/25 transition-all duration-500 -z-10 scale-150" />
                <div className="relative">
                  <Image
                    src={"/global/ailogo.png"}
                    alt="AI@UCI Logo"
                    height={52}
                    width={52}
                    quality={100}
                    className="object-contain brightness-0 invert opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              </Link>
              <p className="text-sm text-gray-400 italic font-light leading-relaxed max-w-xs">
                Educating and empowering students at UC Irvine through the power
                of AI.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#363636]/30">
              <div className="text-xs text-gray-400 leading-relaxed">
                <p className="font-medium text-gray-300 mb-1">Location</p>
                <p>DBH 6011, UC Irvine</p>
                <p>Wednesdays 4:00-5:30 PM</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-[#363636]/30">
              <p className="text-xs text-gray-400 leading-relaxed">
                Made with <span className="text-yellow-400">&lt;3</span> in
                Irvine, CA
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] flex items-center gap-1.5 group w-fit"
              >
                Learn about developers
                <svg
                  className="w-3 h-3 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white mb-1">
              Contact
            </h3>
            <div className="flex flex-col gap-3.5">
              <a
                href="mailto:contact@aiatuci.org"
                className="flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] group py-1"
              >
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-white transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="relative">
                  Email
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] group py-1"
              >
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-white transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span className="relative">
                  Discord
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] group py-1"
              >
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-white transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="relative">
                  GitHub
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] group py-1"
              >
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-white transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="relative">
                  Instagram
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
            </div>
          </div>

          {/* Column 3 - Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white mb-1">
              Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 uppercase tracking-[0.1em]">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-transparent border-b border-[#363636] focus:border-white outline-none text-sm text-white py-2 transition-all duration-300 placeholder:text-gray-600 focus:placeholder:text-gray-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 uppercase tracking-[0.1em]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b border-[#363636] focus:border-white outline-none text-sm text-white py-2 transition-all duration-300 placeholder:text-gray-600 focus:placeholder:text-gray-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="mt-2 border border-white/90 rounded-sm px-6 py-2.5 text-xs text-white uppercase tracking-[0.15em] hover:bg-white hover:text-[#282828] transition-all duration-300 self-start font-light"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 4 - Explore */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white mb-1">
              Explore
            </h3>
            <nav className="flex flex-col gap-3.5">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-xs text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] py-1 group relative w-fit"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
