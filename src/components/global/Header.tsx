"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setHasInteracted(true);
    }
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
    <>
      <motion.header
        className="flex items-center justify-between md:justify-center fixed top-0 left-0 right-0 z-50 h-12 sm:h-14 md:h-16 bg-[#282828] rounded-full p-1.5 sm:p-2 md:p-3 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-36 my-2 sm:my-4"
        animate={{ y: isVisible ? 0 : "-150%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Link
          href="/"
          className="absolute left-4 sm:left-6 md:left-8 lg:left-10 z-10 flex items-center justify-center"
        >
          <motion.div
            className="absolute bg-[#D9D9D9]/20 rounded-full blur-xl -z-10"
            style={{ width: "80%", height: "80%", top: "50%", left: "50%" }}
            animate={{
              opacity: isHome ? 1 : 0,
              scale: isHome ? 1 : 0.95,
              x: "-50%",
              y: "-50%",
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ filter: isHome ? "brightness(2)" : "brightness(1)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Image
              src={"/img/global/ailogo.png"}
              alt="ailogo"
              height={60}
              width={60}
              quality={100}
              priority
              unoptimized={false}
              className="relative z-0 object-contain"
              style={{
                height: "65%",
                width: "auto",
                maxHeight: "50px",
                minHeight: "35px",
              }}
            />
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 bg-[#363636] h-full rounded-3xl p-0.5 sm:p-1 md:p-1.5 relative px-0.5 sm:px-1 md:px-1.5">
          {!isHome && (
            <motion.div
              className="absolute h-5 sm:h-6 md:h-7 bg-[#D9D9D9] rounded-full top-1/2"
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
                y: "-50%",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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

        <button
          type="button"
          className="absolute right-4 sm:right-6 md:hidden z-20 flex items-center justify-center p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <div className="flex flex-col justify-center gap-1.5 w-6 h-5">
            <motion.span
              className="block h-0.5 w-full bg-white rounded-full origin-center"
              animate={
                isMenuOpen
                  ? { y: 8, rotate: 45 }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-full bg-white rounded-full"
              animate={
                isMenuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-full bg-white rounded-full origin-center"
              animate={
                isMenuOpen
                  ? { y: -8, rotate: -45 }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.nav
              className="fixed top-16 sm:top-20 left-4 right-4 z-50 md:hidden bg-[#363636] rounded-2xl p-3 flex flex-col gap-1 shadow-lg"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => {
                    setHasInteracted(true);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm transition-colors duration-300 ${
                    isHome
                      ? "text-white"
                      : activeLink === link.name
                        ? "bg-[#D9D9D9] text-gray-900 font-medium"
                        : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
