"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    { name: "About", path: "/about" },
    { name: "Board", path: "/board" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const activeLink =
    links.find((link) => pathname === link.path)?.name || "About";

  const updateIndicatorPosition = useCallback(() => {
    const activeElement = linkRefs.current[activeLink];
    if (activeElement) {
      const container = activeElement.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
          opacity: hasInteracted && !isHome ? 1 : 0,
        });
      }
    }
  }, [activeLink, hasInteracted, isHome]);

  useEffect(() => {
    if (!isHome) {
      setHasInteracted(true);
    }
    // Smooth transition when going to/from home
    const timer = setTimeout(() => {
      updateIndicatorPosition();
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, isHome, updateIndicatorPosition]);

  useEffect(() => {
    updateIndicatorPosition();
    window.addEventListener("resize", updateIndicatorPosition);
    return () => window.removeEventListener("resize", updateIndicatorPosition);
  }, [updateIndicatorPosition]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex items-center justify-center fixed top-0 left-0 right-0 z-50 h-12 sm:h-14 md:h-16 bg-[#282828] rounded-full p-1.5 sm:p-2 md:p-3 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-36 my-2 sm:my-4 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-[150%]"
      }`}
    >
      <Link
        href="/"
        className="absolute left-4 sm:left-6 md:left-8 lg:left-10 z-10 flex items-center justify-center"
      >
        <div
          className={`absolute bg-[#D9D9D9]/20 rounded-full blur-xl -z-10 transition-all duration-700 ease-in-out ${
            isHome ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            width: "80%",
            height: "80%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <Image
          src={"/global/ailogo.png"}
          alt="ailogo"
          height={60}
          width={60}
          quality={100}
          priority
          unoptimized={false}
          className={`relative z-0 object-contain transition-all duration-700 ease-in-out ${
            isHome ? "brightness-200" : ""
          }`}
          style={{
            height: "65%",
            width: "auto",
            maxHeight: "50px",
            minHeight: "35px",
          }}
        />
      </Link>
      <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 bg-[#363636] h-full rounded-3xl p-0.5 sm:p-1 md:p-1.5 relative px-0.5 sm:px-1 md:px-1.5">
        {!isHome && (
          <div
            className="absolute h-5 sm:h-6 md:h-7 bg-[#D9D9D9] rounded-full transition-all duration-500 ease-in-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: indicatorStyle.opacity,
            }}
          />
        )}
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            ref={(el) => {
              linkRefs.current[link.name] = el;
            }}
            onClick={() => {
              setHasInteracted(true);
            }}
            className={`relative z-10 flex justify-center items-center px-1.5 sm:px-3 md:px-4 lg:px-5 py-0.5 sm:py-1 md:py-1.5 rounded-full transition-colors duration-500 text-xs sm:text-sm ${
              isHome
                ? "text-white"
                : activeLink === link.name
                ? "text-gray-900 font-medium"
                : "text-gray-300"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
