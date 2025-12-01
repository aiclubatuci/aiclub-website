import Image from "next/image";

type Member = {
  img: string;
  name: string;
  role: string;
  linkedin: string;
};

type TeamCardProps = {
  member: Member;
};

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col rounded-lg w-full max-w-64 md:max-w-sm h-96 overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl active:-translate-y-2 active:shadow-xl"
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
        <div className="absolute top-2 right-2 transition-all duration-150 hover:scale-[1.15] active:scale-[1.15]">
          <img
            src="/img/global/linkedin.svg"
            alt="linkedin logo"
            className="w-6 h-6"
          />
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
