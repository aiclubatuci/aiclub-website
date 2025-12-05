import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div
      id="Header"
      className="relative min-h-screen w-full bg-center bg-contain bg-no-repeat flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="flex flex-col items-center text-center max-w-3xl mt-10 md:mt-0 px-2">
        <img
          src="/logo_image.png"
          alt="AI at UCI Logo"
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-6"
        />

        <h1
          className="font-bold leading-tight mx-auto text-center" // max-w-[90%] sm:max-w-[700px] md:max-w-[900px]
          style={{
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "clamp(1.8rem, 4vw, 68px)",
            lineHeight: "1.2",
            letterSpacing: "0%",
            background:
              "linear-gradient(180deg, rgba(125,120,120,1), rgba(255,255,255,1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Artificial Intelligence at UCI
        </h1>

        <h2 className="mt-3 text-white font-normal text-base sm:text-lg md:text-xl max-w-xl">
          Spreading the learning of artificial intelligence and machine learning
          through workshops, projects, and real world applications
        </h2>

        <div className="flex flex-row gap-4 mt-10 w-full max-w-xs sm:max-w-md md:max-w-lg items-center justify-center">
          <Link href="/about" className="flex-1 min-w-[120px] max-w-[180px]">
            <button
              className="w-full rounded-full py-3 px-4 flex items-center justify-between transition-transform hover:scale-105"
              style={{
                background:
                  "linear-gradient(180deg, #7D7878 6.84%, #FFFFFF 102.64%)",
                fontSize: "20px",
                color: "#000000",
              }}
            >
              <span>Get Involved</span>
              <span className="font-bold text-xl">↗</span>
            </button>
          </Link>

          <Link href="/contact" className="flex-1 min-w-[120px] max-w-[180px]">
            <button
              className="w-full rounded-full py-3 px-4 flex items-center justify-between transition-transform hover:scale-105"
              style={{
                background:
                  "linear-gradient(180deg, #373737 58.16%, #585656 102.64%)",
                fontSize: "20px",
                color: "#FFFFFF",
              }}
            >
              <span>Talk With Us</span>
              <span className="font-bold text-xl">↗</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="h-12 sm:h-16 md:h-24 lg:h-32" />

      {/* <div className="h-12 sm:h-16 lg:h-32" */}

      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 opacity-30 pointer-events-none">
        <Image src="/img/global/anteater.png" alt="Anteater" fill className="object-contain object-bottom" priority/>
      </div>
    </div>
  );
};

export default LandingPage;
