import Image from "next/image";

export interface Member {
  img: string;
  name: string;
  role: string;
  linkedin: string;
}

export default function TeamCard({ member }: { member: Member }) {
  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col rounded-lg w-full max-w-64 md:max-w-sm h-96 border border-[#363636]/40 rounded-lg hover:border-[#363636] active:border-[#363636] transition-colors duration-300 overflow-hidden"
    >
      {/* Profile Image */}
      <div className="flex-[8] relative">
        <Image
          src={member.img}
          alt="Image"
          fill
          className="object-cover rounded-b-lg"
        />

        {/* Linkedin Logo */}
        <div className="absolute top-2 right-2 bg-[#0A66C2] rounded-sm transition-all duration-150 hover:scale-[1.15] active:scale-[1.3]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path d="M6.94 8.5H3.56V20.45h3.38V8.5ZM5.25 7.1c1.08 0 1.95-.88 1.95-1.96S6.33 3.2 5.25 3.2 3.3 4.08 3.3 5.14 4.17 7.1 5.25 7.1ZM20.45 20.45h-3.38v-5.77c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05v5.87h-3.38V8.5h3.25v1.63h.05c.45-.86 1.55-1.77 3.19-1.77 3.41 0 4.04 2.25 4.04 5.18v6.91Z" />
          </svg>
        </div>
      </div>

      {/* Name & Role */}
      <div className="flex flex-col flex-[2] items-center justify-center text-white">
        <h1 className="text-lg font-bold">{member.name}</h1>
        <p className="text-sm">{member.role}</p>
      </div>
    </a>
  );
}
