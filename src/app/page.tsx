import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4">
        {/* Background image */}
        <Image
          src="/img/landing/landingbg.jpg"
          alt="AI Network Background"
          fill
          priority
          className="object-cover"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 bg-gradient-to-b from-transparent to-[#171717]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          <img
            src="/logo_image.png"
            alt="AI at UCI Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-6"
          />

          <h1
            className="
            font-bold leading-tight
            text-[clamp(1.8rem,4vw,68px)]
            bg-gradient-to-b from-gray-300 to-white
            bg-clip-text text-transparent
          "
          >
            Artificial Intelligence at UCI
          </h1>

          <h2 className="mt-4 text-white/90 text-base sm:text-lg md:text-xl max-w-xl">
            Spreading the learning of artificial intelligence and machine
            learning through workshops, projects, and real world applications
          </h2>

          <div className="flex gap-4 mt-10 w-full max-w-xs sm:max-w-md md:max-w-lg justify-center">
            <Link href="/about" className="flex-1 max-w-[180px]">
              <button
                className="
                w-full rounded-full
                py-2 px-3 sm:py-3 sm:px-4
                text-base sm:text-lg
                flex items-center justify-between
                bg-gradient-to-b from-[#7D7878] to-white
                text-black
                transition-transform hover:scale-105
              "
              >
                <span>Get Involved</span>
                <span className="font-bold">↗</span>
              </button>
            </Link>

            <Link href="/contact" className="flex-1 max-w-[180px]">
              <button
                className="
                w-full rounded-full
                py-2 px-3 sm:py-3 sm:px-4
                text-base sm:text-lg
                flex items-center justify-between
                bg-gradient-to-b from-[#373737] to-[#585656]
                text-white
                transition-transform hover:scale-105
              "
              >
                <span>Talk With Us</span>
                <span className="font-bold">↗</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
