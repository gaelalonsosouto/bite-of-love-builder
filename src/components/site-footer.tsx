import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-cream mt-32">
      <div className="container-x py-20 grid gap-12 md:grid-cols-3">
        <div>
          <div className="font-display text-4xl">FRANKY&apos;S</div>
          <p className="mt-3 text-sm opacity-70">Muerde el amor. Smash burgers en A Coruña.</p>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-semibold uppercase tracking-widest text-xs opacity-60">Visítanos</div>
          <p>C. Pondal, 1, Bajo F</p>
          <p>15004 A Coruña</p>
          <p>+34 881 33 69 26</p>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-semibold uppercase tracking-widest text-xs opacity-60">Explorar</div>
          <Link to="/" className="block hover:text-gold">Inicio</Link>
          <Link to="/carta" className="block hover:text-gold">Carta</Link>
          <a href="https://www.instagram.com/frankysburgeroficial" target="_blank" rel="noopener noreferrer" className="block hover:text-gold">Instagram</a>
          <a href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu" target="_blank" rel="noopener noreferrer" className="block hover:text-gold">Just Eat</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs opacity-50 flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Franky&apos;s Burger. Todos los derechos reservados.</span>
          <span>A Coruña · Cerca de Riazor</span>
        </div>
      </div>
    </footer>
  );
}