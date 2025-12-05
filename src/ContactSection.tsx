"use client";
import React, { useState } from "react";

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

  return (
    <div
      id="Contact"
      className="text-center items-center justify-items-center p-6 py-20 lg:px-32 w-full overflow-hidden"
    >
      <h1 className="font-extrabold text-[40px] leading-[28px] tracking-[0%] text-center mb-[30px]">
        Questions? Contact Us!
      </h1>

      <h2 className="font-bold text-[24px] leading-[100%] tracking-[0%] text-center mb-[30px]">
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
        className="relative w-[750px] h-full rounded-[10px] opacity-100 p-6 mx-auto flex flex-col justify-between mb-[30px]"
        style={{
          background: "rgba(217, 217, 217, 0.1)",
          transform: "rotate(0deg)",
        }}
      >
        <form className="flex flex-col items-center w-full">
          <div className="flex flex-wrap justify-between gap-4 w-full max-w-xl">
            <div className="w-full md:w-[48%]">
              <input
                className="w-full border border-gray-300 rounded py-3 px-4 placeholder:text-[rgba(0,0,0,1)] 
                        placeholder:font-semibold
                        placeholder:text-[16px]
                        placeholder:leading-[28px]
                        placeholder:tracking-[0px]"
                style={{ background: "rgba(217, 217, 217, 1)" }}
                type="text"
                name="FirstName"
                placeholder="First Name"
                required
              />
            </div>

            <div className="w-full  md:w-[48%]">
              <input
                className="w-full border border-gray-300 rounded py-3 px-4 placeholder:text-[rgba(0,0,0,1)]
                            placeholder:font-semibold
                            placeholder:text-[16px]
                            placeholder:leading-[28px]
                            placeholder:tracking-[0px]"
                style={{ background: "rgba(217, 217, 217, 1)" }}
                type="text"
                name="LastName"
                placeholder="Last Name"
                required
              />
            </div>

            <div className="w-full">
              <input
                className="w-full border border-gray-300 rounded py-3 px-4 mt-0.2 text-left placeholder:text-[rgba(0,0,0,1)]
                          placeholder:font-semibold
                          placeholder:text-[16px]
                          placeholder:leading-[28px]
                          placeholder:tracking-[0px]"
                style={{ background: "rgba(217, 217, 217, 1)" }}
                type="email"
                name="Email"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="w-full flex justify-center mt-3">
              <button
                style={{
                  width: "170px",
                  height: "50px",
                  borderRadius: "90px",
                  background:
                    "linear-gradient(180deg, #7D7878 6.84%, #FFFFFF 102.64%)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                  fontStyle: "bold",
                  color: "rgba(0, 0, 0, 1)",
                  opacity: 1,
                }}
              >
                Sign Up!
              </button>
            </div>
          </div>
        </form>
      </div>

      <h2 className="font-bold text-[24px] leading-[100%] tracking-[0%] text-center">
        Connect with us on social media
      </h2>

      <div className="flex flex-row justify-between items-center pt-5 gap-[60px]">
        <a href={`mailto:${email}`} target="_blank">
          <img className="h-[50px]" src="/global/mail.svg" />
        </a>

        <a href="https://www.facebook.com/aiatuci/" target="_blank">
          <img className="h-[50px]" src="/global/facebook.svg" />
        </a>

        <a href="https://www.linkedin.com/company/aiatuci/" target="_blank">
          <img className="h-[50px]" src="/global/linkedin.svg" />
        </a>
        <a href="https://www.instagram.com/aiatuci/" target="_blank">
          <img className="h-[50px]" src="/global/instagram.svg" />
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
