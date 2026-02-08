import data from "../data/data.json";

type Email = {
  email: string;
};

export type Social = {
  href: string;
  icon: string;
  alt: string;
};

export function SocialLinks({ email }: Email) {
  const socials: Social[] = data.Socials;
  return (
    <div className="flex flex-wrap justify-center gap-8">
      <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
        <img
          className="h-10 sm:h-12 opacity-70 hover:opacity-100 transition-all duration-300"
          src="/img/global/mail.svg"
          alt="Email"
        />
      </a>

      {socials.map((social, index) => (
        <a key={index} href={social.href} target="_blank" rel="noreferrer">
          <img
            className="h-10 sm:h-12 w-10 sm:w-12 opacity-70 hover:opacity-100 transition-all duration-300"
            src={social.icon}
            alt={social.alt}
          ></img>
        </a>
      ))}
    </div>
  );
}
