import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl tracking-tight text-foreground">
          FRANKY&apos;S
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors hidden sm:inline">Inicio</Link>
          <Link to="/carta" className="hover:text-primary transition-colors">Carta</Link>
          <a
            href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Pedir online
          </a>
        </nav>
      </div>
    </header>
  );
}