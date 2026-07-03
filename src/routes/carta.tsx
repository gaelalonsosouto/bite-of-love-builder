import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/carta")({
  head: () => ({
    meta: [
      { title: "Carta | Franky's Burger A Coruña" },
      {
        name: "description",
        content:
          "Carta de Franky's Burger en A Coruña: smash burgers de vaca madurada premium, combos, patatas, postres, bebidas y cervezas.",
      },
      { property: "og:title", content: "Carta | Franky's Burger A Coruña" },
      {
        property: "og:description",
        content: "Smash burgers, combos y más en A Coruña, junto a Riazor.",
      },
      { property: "og:url", content: "/carta" },
    ],
    links: [{ rel: "canonical", href: "/carta" }],
  }),
  component: CartaPage,
});

type Item = {
  name: string;
  desc: string;
  price?: string;
  tag?: string;
  placeholder?: boolean;
};

const burgers: Item[] = [
  {
    name: "Popper",
    desc: "Smash grueso de carne de vaca premium, queso cheddar, tomate, lechuga, cebolla, ketchup y mayonesa en pan brioche.",
    price: "10,95 €",
  },
  {
    name: "Classic Cheeseburger",
    desc: "Doble smash de carne de vaca premium, doble queso cheddar, cebolla, pepinillos, ketchup y mostaza en pan brioche.",
    price: "11,95 €",
  },
  {
    name: "Franky's Burger",
    desc: "Doble smash de carne de vaca premium, doble queso cheddar, cebolla caramelizada, bacon y salsa Franky's en pan brioche.",
    price: "13,95 €",
    tag: "La de la casa",
  },
  {
    name: "Crispy Chicken Burger",
    desc: "Pollo crujiente, tomate, lechuga, cebolla, ketchup y mayonesa en pan brioche.",
    price: "11,55 €",
  },
  {
    name: "Volcano",
    desc: "Doble smash de carne de vaca premium, salsa de pimientos rojos y jalapeños, triple cheddar en pan brioche.",
    price: "15,55 €",
    tag: "Picante",
  },
  {
    name: "Monster",
    desc: "Triple smash de carne de vaca premium, triple queso cheddar, cebolla estilo Oklahoma y salsa Monster en pan brioche.",
    price: "16,95 €",
    tag: "Solo para valientes",
  },
];

const combos: Item[] = [
  { name: "Combo Classic", desc: "Classic Cheeseburger + patatas + bebida.", placeholder: true },
  { name: "Combo Franky's", desc: "Franky's Burger + patatas + bebida.", placeholder: true },
];

const sides: Item[] = [
  { name: "Patatas fritas caseras", desc: "Corte grueso, dorado por fuera, esponjoso por dentro.", placeholder: true },
  { name: "Patatas Franky's", desc: "Con queso fundido, bacon y salsa de la casa.", placeholder: true },
  { name: "Aros de cebolla", desc: "Rebozados y crujientes.", placeholder: true },
];

const desserts: Item[] = [
  { name: "Brownie casero", desc: "Chocolate intenso, tibio, con nueces.", placeholder: true },
  { name: "Cheesecake NY", desc: "Estilo Nueva York, cremoso y denso.", placeholder: true },
];

const drinks: Item[] = [
  { name: "Refrescos", desc: "Coca-Cola, Fanta, Aquarius, agua.", placeholder: true },
  { name: "Batidos", desc: "Vainilla, chocolate, fresa.", placeholder: true },
];

const beers: Item[] = [
  { name: "Estrella Galicia 1906", desc: "La reserva especial. Bien fría, para acompañar la smash.", placeholder: true },
  { name: "Estrella Galicia", desc: "La clásica de la casa.", placeholder: true },
];

const categories: Array<{ title: string; items: Item[]; note?: string }> = [
  { title: "Hamburguesas", items: burgers },
  { title: "Combos", items: combos, note: "Precios pendientes de completar con la carta real." },
  { title: "Para acompañar · Patatas", items: sides, note: "Precios pendientes." },
  { title: "Postres", items: desserts, note: "Precios pendientes." },
  { title: "Bebidas", items: drinks, note: "Precios pendientes." },
  { title: "Cervezas", items: beers, note: "Precios pendientes." },
];

function CartaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-24">
        {/* Hero */}
        <section className="container-x pt-16 pb-24">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-tomato mb-4">
            Carta
          </p>
          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] text-cream">
            La <span className="text-tomato">carta.</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-xl">
            Todo pasa por la plancha caliente y el pan brioche. Elige tu mordida.
          </p>
        </section>

        {/* Categories */}
        <div className="container-x pb-32 space-y-24">
          {categories.map((cat) => (
            <section key={cat.title}>
              <Reveal>
                <div className="flex items-baseline justify-between border-b border-border pb-6 mb-10">
                  <h2 className="font-display text-4xl md:text-6xl text-cream">
                    {cat.title}
                  </h2>
                  {cat.note && (
                    <span className="hidden md:inline text-xs uppercase tracking-widest text-cream/40">
                      Pendiente
                    </span>
                  )}
                </div>
              </Reveal>
              {cat.note && (
                <p className="text-sm text-cream/50 mb-8 italic">{cat.note}</p>
              )}
              <ul className="grid md:grid-cols-2 gap-6">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="hover-lift bg-card/70 border border-border rounded-lg p-6 group cursor-default"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl md:text-2xl text-cream group-hover:text-tomato transition-colors">
                        {item.name}
                        {item.tag === "Picante" && (
                          <Flame className="inline-block ml-2 text-tomato" size={20} />
                        )}
                      </h3>
                      <span className="flex-1 border-b border-dashed border-cream/20 translate-y-[-4px]" />
                      <span className="font-display text-lg md:text-xl text-tomato whitespace-nowrap">
                        {item.price ?? "—"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-cream/60 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {item.tag && (
                        <span className="inline-block text-[10px] uppercase tracking-widest bg-tomato/20 text-tomato border border-tomato/40 px-2 py-1 rounded-full">
                          {item.tag}
                        </span>
                      )}
                      {item.placeholder && (
                        <span className="inline-block text-[10px] uppercase tracking-widest bg-gold/15 text-gold border border-gold/30 px-2 py-1 rounded-full">
                          Pendiente de precio
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Social block */}
          <section className="text-center pt-12">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-tomato mb-4">
              Síguenos
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-cream mb-6">
              Nos vemos en las redes.
            </h2>
            <div className="flex justify-center">
              <SocialLinks />
            </div>
          </section>
        </div>
      </main>

      {/* Sticky CTA */}
      <a
        href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
        target="_blank"
        rel="noopener noreferrer"
        className="hover-glow fixed bottom-6 right-6 z-50 bg-tomato text-cream px-5 py-3 rounded-full font-semibold shadow-[0_20px_40px_-10px_oklch(0.55_0.22_27/0.5)]"
      >
        Pedir en Just Eat →
      </a>

      <SiteFooter />
    </div>
  );
}