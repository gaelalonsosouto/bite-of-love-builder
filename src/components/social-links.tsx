import { Instagram, Facebook } from "lucide-react";
import type { SVGProps } from "react";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.9l-4.72-6.17L4.8 22H2l7.02-8.02L2 2h6.98l4.34 5.73L18.24 2zm-2.42 18h1.9L7.28 4H5.26l10.56 16z" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.24a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.66z" />
    </svg>
  );
}

const links = [
  { href: "https://www.instagram.com/frankysburgeroficial", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/frankysburgercoruna", label: "Facebook", Icon: Facebook },
  { href: "https://x.com/frankysburger", label: "X (Twitter)", Icon: XIcon },
  { href: "https://www.tiktok.com/@frankysburger", label: "TikTok", Icon: TikTokIcon },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="hover-glow inline-flex items-center justify-center h-11 w-11 rounded-full border border-border bg-card text-cream hover:text-tomato hover:border-tomato"
          >
            <Icon width={18} height={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}