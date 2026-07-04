import { Instagram } from "lucide-react";
import type { SVGProps } from "react";

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.24a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.66z" />
    </svg>
  );
}

const links = [
  { href: "https://www.instagram.com/frankysburger.coruna/", label: "Instagram", Icon: Instagram },
  { href: "https://www.tiktok.com/@frankysburger", label: "TikTok", Icon: TikTokIcon },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => {
        const ariaLabel = label === "Instagram"
          ? "Sigue a Franky's Burger en Instagram"
          : `Sigue a Franky's Burger en ${label}`;
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              title={ariaLabel}
              className="hover-glow inline-flex items-center justify-center h-11 w-11 rounded-full border border-border bg-card text-cream hover:text-tomato hover:border-tomato"
            >
              <Icon width={18} height={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}