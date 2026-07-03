import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import ingredients from "@/assets/ingredients.jpg";

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
    name: "Volcano 🌶️",
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
  { title: "Para acompañar · Patatas", items: sides, note: "Precios pendientes de completar con la carta real." },
  { title: "Postres", items: desserts, note: "Precios pendientes de completar con la carta real." },
  { title: "Bebidas", items: drinks, note: "Precios pendientes de completar con la carta real." },
  { title: "Cervezas", items: beers, note: "Precios pendientes de completar con la carta real." },
];

function CartaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-24">
        {/* Hero */}
        <section className="container-x pt-16 pb-24 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-4">
              Carta
            </p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] text-charcoal">
              La carta.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Todo pasa por la plancha caliente y el pan brioche. Elige tu mordida.
            </p>
          </div>
          <div className="md:col-span-4">
            <img
              src={ingredients}
              alt="Ingredientes de smash burger de Franky's: pan brioche, cheddar, tomate, cebolla caramelizada y lechuga"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        </section>

        {/* Categories */}
        <div className="container-x pb-32 space-y-24">
          {categories.map((cat) => (
            <section key={cat.title}>
              <Reveal>
                <div className="flex items-baseline justify-between border-b border-charcoal/20 pb-6 mb-10">
                  <h2 className="font-display text-4xl md:text-6xl text-charcoal">
                    {cat.title}
                  </h2>
                  {cat.note && (
                    <span className="hidden md:inline text-xs uppercase tracking-widest text-muted-foreground">
                      Pendiente
                    </span>
                  )}
                </div>
              </Reveal>
              {cat.note && (
                <p className="text-sm text-muted-foreground mb-8 italic">{cat.note}</p>
              )}
              <ul className="grid md:grid-cols-2 gap-x-16 gap-y-8">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl md:text-2xl text-charcoal">
                          {item.name}
                        </h3>
                        <span className="flex-1 border-b border-dashed border-charcoal/30 translate-y-[-4px]" />
                        <span className="font-display text-lg md:text-xl text-tomato whitespace-nowrap">
                          {item.price ?? "—"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {item.tag && (
                          <span className="inline-block text-[10px] uppercase tracking-widest bg-charcoal text-cream px-2 py-1 rounded-full">
                            {item.tag}
                          </span>
                        )}
                        {item.placeholder && (
                          <span className="inline-block text-[10px] uppercase tracking-widest bg-gold/30 text-charcoal px-2 py-1 rounded-full">
                            Pendiente de precio
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      {/* Sticky CTA */}
      <a
        href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold shadow-xl hover:opacity-90 transition-opacity"
      >
        Pedir en Just Eat →
      </a>

      <SiteFooter />
    </div>
  );
}