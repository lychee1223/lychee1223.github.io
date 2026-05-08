import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { AboutMe } from "@/data/aboutme";

interface ProfileSidebarProps {
  aboutMe: AboutMe;
}

export function ProfileSidebar({ aboutMe }: ProfileSidebarProps) {
  if (!aboutMe) {
    return null;
  }

  return (
    <div className="flex min-w-0 flex-row-reverse gap-4 max-[500px]:flex-col max-[500px]:gap-5 md:flex-col md:space-y-8">
      {aboutMe.imageURL && (
        <div className="w-1/3 flex-shrink-0 max-[500px]:w-full md:w-full">
          <div className="relative aspect-square w-full max-w-[13rem] overflow-hidden rounded-full border border-[color:var(--line-strong)] bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)] max-[500px]:max-w-[8.5rem] md:max-w-[16rem]">
            <Image
              src={aboutMe.imageURL}
              alt={aboutMe.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}
      <div className="min-w-0 flex-1 max-[500px]:w-full md:w-full">
        <h1 className="home-profile-name mb-3 break-words font-serif text-[2.1rem] leading-tight tracking-[0.03em] text-slate-950 max-[500px]:text-[1.85rem] sm:text-[2.9rem] sm:tracking-wide">
          {aboutMe.name}
        </h1>
        {aboutMe.altName && (
          <p className="mb-6 text-lg leading-relaxed tracking-wide text-slate-700 max-[500px]:mb-4 max-[500px]:text-base">
            {aboutMe.altName}
          </p>
        )}
        <p className="mb-6 break-words text-sm uppercase leading-relaxed tracking-wide text-slate-700 max-[500px]:mb-5 max-[500px]:text-[0.78rem] max-[500px]:tracking-[0.03em]">
          <span>
            {aboutMe.title}&nbsp;@&nbsp;
            {aboutMe.institutionURL ? (
              <a
                href={aboutMe.institutionURL}
                className="text-[color:var(--accent-strong)] transition-colors duration-300 hover:text-blue-800 hover:underline hover:underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {aboutMe.institution}
              </a>
            ) : (
              aboutMe.institution
            )}
          </span>
          <br />
          {aboutMe.institutionAddress}
          <br />
          {aboutMe.laboratoryURL ? (
            <a
              href={aboutMe.laboratoryURL}
              className="text-[color:var(--accent-strong)] transition-colors duration-300 hover:text-blue-800 hover:underline hover:underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {aboutMe.laboratoryName}
            </a>
          ) : (
            aboutMe.laboratoryName
          )}
        </p>
        <div className="mb-6 flex flex-wrap gap-6 max-[500px]:mb-5 max-[500px]:gap-4">
          {aboutMe.blogURL && (
            <a
              href={aboutMe.blogURL}
              className="group inline-flex items-center gap-2 text-sm text-slate-700 transition-colors duration-300 hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Blog</span>
            </a>
          )}
          {aboutMe.cvURL && (
            <a
              href={aboutMe.cvURL}
              className="group inline-flex items-center gap-2 text-sm text-slate-700 transition-colors duration-300 hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">CV</span>
            </a>
          )}
        </div>
        <div className="min-w-0 space-y-2 max-[500px]:text-sm [&_svg]:shrink-0">
          <a
            href={`mailto:${aboutMe.email}`}
            className="inline-flex max-w-full items-center gap-2 break-all text-base text-slate-700 transition-colors hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={14} />
            {aboutMe.email}
          </a>
          {aboutMe.googleScholarURL && (
            <>
              <br />
              <a
                href={aboutMe.googleScholarURL}
                className="inline-flex max-w-full items-center gap-2 break-words text-base text-slate-700 transition-colors hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GraduationCap size={14} />
                Google Scholar
              </a>
            </>
          )}
          {aboutMe.linkedinUsername && (
            <>
              <br />
              <a
                href={`https://www.linkedin.com/in/${aboutMe.linkedinUsername}`}
                className="inline-flex max-w-full items-center gap-2 break-words text-base text-slate-700 transition-colors hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </>
          )}
          {aboutMe.githubUsername && (
            <>
              <br />
              <a
                href={`https://github.com/${aboutMe.githubUsername}`}
                className="inline-flex max-w-full items-center gap-2 break-all text-base text-slate-700 transition-colors hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
                github.com/{aboutMe.githubUsername}
              </a>
            </>
          )}
          {aboutMe.twitterUsername && (
            <>
              <br />
              <a
                href={`https://twitter.com/${aboutMe.twitterUsername}`}
                className="inline-flex max-w-full items-center gap-2 break-all text-base text-slate-700 transition-colors hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={14} />@{aboutMe.twitterUsername}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
