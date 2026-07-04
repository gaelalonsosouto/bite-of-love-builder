import { Link } from "@tanstack/react-router";

function JustEatBadge() {
  // Simplified Just Eat house mark: orange rounded square with a white
  // stylised house/chevron — matches the real brand mark shape.
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden className="shrink-0">
      <rect x="0" y="0" width="24" height="24" rx="6" fill="#FF8000" />
      <path
        d="M12 5.5 L18.5 12 H16 V18 H13.5 V13.5 H10.5 V18 H8 V12 H5.5 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/80 border-b border-border/60">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="group inline-flex items-center gap-2 font-display text-xl tracking-tight text-cream transition-transform hover:scale-105">
          <span className="h-2 w-2 rounded-full bg-tomato ember" />
          FRANKY&apos;S <span className="text-tomato">BURGER</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-cream/80 hover:text-tomato transition-colors hover:scale-105 hidden sm:inline">Inicio</Link>
          <Link to="/carta" className="text-cream/80 hover:text-tomato transition-colors hover:scale-105">Carta</Link>
          <a
            href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#FF8000" }}
            className="hover-glow inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold"
          >
            <JustEatBadge />
            Pedir online
          </a>
        </nav>
      </div>
    </header>
  );
}