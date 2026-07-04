import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Flame } from "lucide-react";
import { FlamesBackground } from "@/components/flames-background";
import { cartaQueryOptions, type MenuItem } from "@/lib/content";

export const Route = createFileRoute("/carta")({
  loader: ({ context }) => context.queryClient.ensureQueryData(cartaQueryOptions),
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
  {
    name: "Menú Popper",
    desc: "Carne de vaca premium, queso cheddar, tomate, lechuga, cebolla, ketchup y mayonesa en pan brioche con patatas y bebida a elegir.",
    price: "15,95 €",
  },
  {
    name: "Menú Classic Cheeseburger",
    desc: "Doble smash de carne de vaca premium, doble queso cheddar, cebolla, pepinillos, ketchup y mostaza en pan brioche con patatas y bebida a elegir.",
    price: "16,95 €",
  },
  {
    name: "Menú Franky's Burger",
    desc: "Doble smash de carne de vaca premium, doble queso cheddar, cebolla caramelizada, bacon y salsa Franky's en pan brioche con patatas y bebida a elegir.",
    price: "18,95 €",
  },
  {
    name: "Menú Crispy Chicken Burger",
    desc: "Pollo crujiente, tomate, lechuga, cebolla, ketchup y mayonesa en pan brioche con patatas y bebida a elegir.",
    price: "16,95 €",
  },
  {
    name: "Menú Volcano",
    desc: "Doble smash de carne de vaca premium, salsa de pimientos rojos y jalapeños, triple cheddar en pan brioche con patatas y bebida a elegir.",
    price: "21,55 €",
    tag: "Picante",
  },
  {
    name: "Menú Monster",
    desc: "Triple smash de carne de vaca premium, triple queso cheddar, cebolla estilo Oklahoma y salsa Monster en pan brioche con patatas y bebida a elegir.",
    price: "22,95 €",
  },
  {
    name: "Menú Familiar Classic Cheese",
    desc: "4 Classic Cheese semi-smash de vaca premium, cheddar, cebolla, pepinillos, ketchup y mostaza en pan brioche, con 4 raciones de patatas pequeñas crujientes.",
    price: "49,95 €",
    tag: "Para compartir",
  },
];

const sides: Item[] = [
  {
    name: "Tiras de Pollo",
    desc: "6 tiras de solomillo de pollo empanadas, tiernas y crujientes, con salsa BBQ.",
    price: "10,95 €",
  },
  {
    name: "Aros de Cebolla",
    desc: "8 aros rebozados en panko crujiente, acompañados de salsa BBQ.",
    price: "6,95 €",
  },
  {
    name: "Palitos de Mozzarella",
    desc: "6 palitos crujientes por fuera y fundidos por dentro, acompañados de salsa marinara.",
    price: "7,55 €",
  },
  {
    name: "Crispy Mix",
    desc: "3 tiras de pollo crocante, 3 palitos de mozzarella y 4 aros de cebolla en panko, con salsa BBQ y marinara.",
    price: "12,95 €",
  },
];

const potatoes: Item[] = [
  { name: "Patatas Pequeñas", desc: "Patatas fritas de corte fino y crujiente.", price: "3,50 €" },
  { name: "Patatas Grandes", desc: "Patatas fritas de corte fino y crujiente.", price: "3,90 €" },
  {
    name: "Patatas con Queso",
    desc: "Patatas fritas de corte fino y crujiente, bañadas en queso cheddar fundido.",
    price: "4,50 €",
  },
  {
    name: "Patatas con Queso y Bacon",
    desc: "Patatas fritas de corte fino y crujiente, bañadas en queso cheddar fundido y crispy bacon.",
    price: "5,50 €",
  },
];

const desserts: Item[] = [
  {
    name: "New York Cheesecake",
    desc: "Tarta de queso estilo New York sobre base de galleta, bañada en salsa de frutos rojos.",
    price: "5,50 €",
  },
];

const drinks: Item[] = [
  { name: "Coca-Cola (330 ml)", desc: "Clásica bien fría.", price: "2,80 €" },
  { name: "Coca-Cola Zero (330 ml)", desc: "Sin azúcar.", price: "2,80 €" },
  { name: "Coca-Cola Zero Zero (330 ml)", desc: "Sin azúcar y sin cafeína.", price: "2,80 €" },
  { name: "Fanta Naranja (330 ml)", desc: "Refresco con burbujas de naranja.", price: "2,80 €" },
  { name: "Aquarius Limón (330 ml)", desc: "Refresco de limón.", price: "2,80 €" },
  { name: "Aquarius Naranja (330 ml)", desc: "Refresco de naranja.", price: "2,80 €" },
  { name: "Fuze Tea Limón (330 ml)", desc: "Té frío con toque de limón.", price: "2,80 €" },
  { name: "Agua Cabreiroá (500 ml)", desc: "Agua mineral natural gallega.", price: "2,00 €" },
  { name: "Agua Cabreiroá con gas (500 ml)", desc: "Agua mineral con gas.", price: "2,50 €" },
];

const beers: Item[] = [
  {
    name: "Estrella Galicia (330 ml)",
    desc: "La clásica gallega. Venta prohibida a menores de 18 años.",
    price: "2,90 €",
    tag: "18+",
  },
  {
    name: "1906 Reserva Especial (330 ml)",
    desc: "Cerveza reserva de Estrella Galicia. Venta prohibida a menores de 18 años.",
    price: "2,90 €",
    tag: "18+",
  },
  {
    name: "Estrella Galicia 0,0 (330 ml)",
    desc: "Sin alcohol.",
    price: "2,90 €",
  },
  {
    name: "Tostada 0,0 (330 ml)",
    desc: "Cerveza tostada sin alcohol.",
    price: "2,90 €",
  },
];

const categories: Array<{ title: string; items: Item[]; note?: string }> = [
  { title: "Hamburguesas", items: burgers },
  { title: "Combos", items: combos, note: "Todos los menús incluyen patatas y bebida a elegir." },
  { title: "Para acompañar", items: sides },
  { title: "Patatas", items: potatoes },
  { title: "Postres", items: desserts },
  { title: "Bebidas", items: drinks },
  { title: "Cervezas", items: beers, note: "Venta de bebidas alcohólicas restringida a mayores de 18 años." },
];

function CartaPage() {
  const cursorFor = (item: Item): string => {
    if (item.tag === "18+") return "cursor-18";
    if (item.tag === "Picante") return "cursor-chili";
    if (
      item.tag === "La de la casa" ||
      item.tag === "Solo para valientes" ||
      item.tag === "Para compartir"
    ) {
      return "cursor-fire";
    }
    return "";
  };
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <FlamesBackground />
      <SiteHeader />
      <main className="relative z-10 pt-24">
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
                    className={`hover-lift bg-card/70 border border-border rounded-lg p-6 group ${cursorFor(item) || "cursor-default"}`}
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
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}