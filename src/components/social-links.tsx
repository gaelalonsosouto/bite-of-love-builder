import { Instagram, Facebook, Music2 } from "lucide-react";
import type { SVGProps } from "react";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.9l-4.72-6.17L4.8 22H2l7.02-8.02L2 2h6.98l4.34 5.73L18.24 2zm-2.42 18h1.9L7.28 4H5.26l10.56 16z" />
    </svg>
  );
}

function JustEatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C6.48 2 2 6.03 2 11c0 3.86 2.7 7.15 6.5 8.36V22l3.1-2.05c.13.01.26.01.4.01 5.52 0 10-4.03 10-9S17.52 2 12 2zm-3.5 8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7 12.83 7 12s.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S14 12.83 14 12s.67-1.5 1.5-1.5z" />
    </svg>
  );
}

const links = [
  { href: "https://www.instagram.com/frankysburgeroficial", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/frankysburgercoruna", label: "Facebook", Icon: Facebook },
  { href: "https://x.com/frankysburger", label: "X (Twitter)", Icon: XIcon },
  { href: "https://www.tiktok.com/@frankysburger", label: "TikTok", Icon: Music2 },
  { href: "https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu", label: "Just Eat", Icon: JustEatIcon },
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