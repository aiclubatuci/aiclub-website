import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";

export default function Footer() {
  const navigationLinks: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/board" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const leftLinks = navigationLinks.slice(0, 3);
  const rightLinks = navigationLinks.slice(3);

  return (
    <footer className="w-full bg-[#282828] text-white relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#171717] via-[#1f1f1f] to-[#282828]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-24 md:pt-28 pb-16 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-12 lg:gap-16">
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <Link href="/" className="inline-block group w-fit relative">
                <div className="absolute inset-0 bg-[#D9D9D9]/20 rounded-full blur-xl group-hover:bg-[#D9D9D9]/25 transition-all duration-500 -z-10 scale-150" />
                <div className="relative">
                  <Image
                    src={"/img/global/ailogo.png"}
                    alt="AI@UCI Logo"
                    height={52}
                    width={52}
                    quality={100}
                    className="object-contain brightness-0 invert opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              </Link>
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
            </div>
          </div>

          {/* Column 2 - Explore */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white mb-1">
              Explore
            </h3>
            <nav className="grid grid-cols-2 gap-x-3 gap-y-3.5 w-fit">
              <div className="flex flex-col gap-3.5">
                {leftLinks.map((link) => (
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
              </div>
              <div className="flex flex-col gap-3.5">
                {rightLinks.map((link) => (
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
              </div>
            </nav>
          </div>

          {/* Column 3 - Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white mb-1">
              Contact
            </h3>
            <div className="[&>div]:justify-start [&>div]:gap-5 [&_img]:h-8 [&_img]:sm:h-9 [&_img]:w-8 [&_img]:sm:w-9">
              <SocialLinks email="aiclub@uci.edu" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
