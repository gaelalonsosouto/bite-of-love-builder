import { Link } from "@tanstack/react-router";

function JustEatBadge() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden className="shrink-0">
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#FFFFFF" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="Archivo Black, Impact, sans-serif"
        fontSize="10"
        fontWeight="900"
        fill="#FF8000"
      >
        je
      </text>
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