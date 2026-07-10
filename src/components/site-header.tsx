import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import justEatLogo from "@/assets/just-eat-logo.png.asset.json";

const JUST_EAT_URL = "https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/80 border-b border-border/60">
      <div className="container-x flex items-center justify-between h-16 gap-3">
        <Link
          to="/"
          aria-label="Franky's Burger - Inicio"
          onClick={() => setOpen(false)}
          className="group inline-flex items-center gap-2 font-display text-base sm:text-xl tracking-tight text-cream transition-transform hover:scale-105 shrink min-w-0"
        >
          <span className="h-2 w-2 rounded-full bg-tomato ember shrink-0" />
          <span className="truncate">
            FRANKY&apos;S <span className="text-tomato">BURGER</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-cream/80 hover:text-tomato transition-colors hover:scale-105">Inicio</Link>
          <Link to="/carta" className="text-cream/80 hover:text-tomato transition-colors hover:scale-105">Carta</Link>
          <a
            href={JUST_EAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#FF8000" }}
            className="hover-glow inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold"
          >
            <img src={justEatLogo.url} alt="Just Eat delivery service logo" width={20} height={20} className="shrink-0" />
            Pedir en Just Eat
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-border/60 text-cream hover:bg-cream/10 transition-colors shrink-0"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="sm:hidden border-t border-border/60 bg-ink/95 backdrop-blur-md">
          <nav className="container-x flex flex-col py-3 gap-1 text-base font-medium">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-cream/90 hover:text-tomato transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/carta"
              onClick={() => setOpen(false)}
              className="py-3 text-cream/90 hover:text-tomato transition-colors"
            >
              Carta
            </Link>
            <a
              href={JUST_EAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{ backgroundColor: "#FF8000" }}
              className="hover-glow mt-2 mb-1 inline-flex items-center justify-center gap-2 text-white px-4 py-3 rounded-full text-sm font-semibold"
            >
              <img src={justEatLogo.url} alt="Just Eat delivery service logo" width={20} height={20} className="shrink-0" />
              Pedir en Just Eat
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}