import React from "react";

const LandingPage = () => {
  return (
    <div
      id="Header"
      className="relative min-h-screen w-full bg-center bg-contain bg-no-repeat flex flex-col items-center justify-center px-6"
    >
      <div className="flex flex-col items-center text-center max-w-4xl relative">
        <div
          style={{
            width: "104px",
            height: "104px",
            left: "668px",
            top: "191px",
            backgroundImage: "url('/logo_image.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <h1
          className="font-bold text-4xl leading-tight"
          style={{
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "clamp(2.5rem, 5vw, 68px)",
            lineHeight: "1.2",
            letterSpacing: "0%",
            background:
              "linear-gradient(180deg, rgba(125,120,120,1), rgba(255,255,255,1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: "90%",
          }}
        >
          Artificial Intelligence at UC Irvine
        </h1>

        <h2
          className="mt-4 text-white font-normal text-lg"
          style={{
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "1.2",
            letterSpacing: "0%",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          Spreading the learning of artificial intelligence and machine learning
          through workshops, projects, and real world applications
        </h2>

        <div className="flex flex-col items-center text-center mt-12">
          <div className="flex gap-6">
            <button
              className="rounded-[90px] w-[229px] h-[54px] flex items-center justify-between px-6"
              style={{
                left: "477px",
                top: "512px",
                background:
                  "linear-gradient(180deg, #7D7878 6.84%, #FFFFFF 102.64%)",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              <span>Get Involved</span>
              <span className="font-bold">↗</span>
            </button>

            <button
              className="rounded-[90px] w-[229px] h-[54px] flex items-center justify-between px-6"
              style={{
                left: "747px",
                top: "512px",
                background:
                  "linear-gradient(180deg, #373737 58.16%, #585656 102.64%)",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#FFFFFF",
              }}
            >
              <span>Talk With Us</span>
              <span className="font-bold">↗</span>
            </button>
          </div>
        </div>

        {/* <div 
          className="mt-12 w-full max-w-7xl bg-no-repeat bg-center opacity-25"
          style={{ 
            backgroundImage: "url('/global/anteater.png')",
            backgroundSize: "contain",
            height: "auto",
            aspectRatio: "1440/589",
          }}>
        </div> */}

        <div
          style={{
            width: "1440px",
            maxWidth: "100%",
            height: "589px",
            left: "27px",
            top: "579px",
            backgroundImage: "url('/global/anteater.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.25,
            display: "block",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LandingPage;
