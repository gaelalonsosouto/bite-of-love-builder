import { Link } from "@tanstack/react-router";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-ink text-cream border-t border-border mt-32">
      <div className="container-x py-20 grid gap-12 md:grid-cols-3">
        <div>
          <div className="font-display text-4xl">
            FRANKY&apos;S <span className="text-tomato">BURGER</span>
          </div>
          <p className="mt-3 text-sm text-cream/60">Muerde el amor. Smash burgers en A Coruña.</p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-semibold uppercase tracking-widest text-xs text-tomato mb-2">Visítanos</div>
          <p>C. Pondal, 1, Bajo F</p>
          <p>15004 A Coruña</p>
          <a href="tel:+34881336926" className="inline-block mt-1 hover:text-tomato transition-colors hover:scale-105">+34 881 33 69 26</a>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-semibold uppercase tracking-widest text-xs text-tomato mb-2">Explorar</div>
          <Link to="/" className="block hover:text-tomato transition-colors">Inicio</Link>
          <Link to="/carta" className="block hover:text-tomato transition-colors">Carta</Link>
          <a href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu" target="_blank" rel="noopener noreferrer" className="block hover:text-tomato transition-colors">Pedir en Just Eat</a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-x py-6 text-xs text-cream/40 flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Franky&apos;s Burger. Todos los derechos reservados.</span>
          <span>A Coruña · Cerca de Riazor</span>
        </div>
      </div>
    </footer>
  );
}