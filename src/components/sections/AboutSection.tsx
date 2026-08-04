import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="min-h-screen pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Mission Hero */}
      <section className="flex flex-col items-center justify-center text-center pt-36 sm:pt-76 pb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
          Our Mission
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
          AI at UCI is committed to fostering a community of passionate students
          dedicated to exploring and advancing artificial intelligence through
          education, research, and innovation.
        </p>
      </section>

      {/* Feature Card */}
      <section className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-[#363636]/40">
          {/* Image */}
          <div className="relative w-full md:w-1/2 aspect-4/3 md:aspect-auto min-h-64">
            <Image
              src="/img/global/board.jpg"
              alt="AI at UCI"
              fill
              className="object-cover"
            />
          </div>
          {/* Text */}
          <div className="flex-1 bg-[#282828] p-8 sm:p-12 flex items-center">
            <p className="text-base sm:text-lg font-semibold leading-relaxed text-white">
              Learn more about AI Models, Machine Learning Models, and much more
              through our in-person, hands-on events, and workshops.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
