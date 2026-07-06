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

function CartaPage() {
  const { data: categories } = useSuspenseQuery(cartaQueryOptions);
  const cursorFor = (item: MenuItem): string => {
    if (item.etiqueta === "AGOTADO") return "cursor-not-allowed";
    if (item.etiqueta === "18+") return "cursor-18";
    if (item.etiqueta === "Picante") return "cursor-chili";
    if (
      item.etiqueta === "La de la casa" ||
      item.etiqueta === "Solo para valientes" ||
      item.etiqueta === "Para compartir"
    ) {
      return "cursor-fire";
    }
    return "";
  };
  const formatPrice = (p: number | null): string => {
    if (p == null) return "—";
    return p.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
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
            <section key={cat.id}>
              <Reveal>
                <div className="flex items-baseline justify-between border-b border-border pb-6 mb-10">
                  <h2 className="font-display text-4xl md:text-6xl text-cream">
                    {cat.nombre}
                  </h2>
                  {cat.nota && (
                    <span className="hidden md:inline text-xs uppercase tracking-widest text-cream/40">
                      {cat.nota}
                    </span>
                  )}
                </div>
              </Reveal>
              <ul className="grid md:grid-cols-2 gap-6">
                {cat.items.map((item) => {
                  const sold = item.etiqueta === "AGOTADO";
                  return (
                  <li
                    key={item.id}
                    className={`${sold ? "opacity-70" : "hover-lift"} bg-card/70 border border-border rounded-lg p-6 group ${cursorFor(item) || "cursor-default"}`}
                  >
                    <div className={item.imagen_url ? "flex gap-4" : ""}>
                      {item.imagen_url ? (
                        <div className={`shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-md overflow-hidden border border-border bg-ink ${sold ? "grayscale" : ""}`}>
                          <img
                            src={item.imagen_url}
                            alt={item.nombre}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className={`font-display text-xl md:text-2xl ${sold ? "text-cream/50 line-through decoration-cream/40" : "text-cream group-hover:text-tomato transition-colors"}`}>
                            {item.nombre}
                            {item.etiqueta === "Picante" && (
                              <Flame className="inline-block ml-2 text-tomato" size={20} />
                            )}
                            {sold && (
                              <span className="ml-2 text-sm md:text-base font-sans not-italic no-underline text-cream/60 align-middle">
                                (agotado)
                              </span>
                            )}
                          </h3>
                          <span className="flex-1 border-b border-dashed border-cream/20 translate-y-[-4px]" />
                          <span className={`font-display text-lg md:text-xl whitespace-nowrap ${sold ? "text-cream/40 line-through" : "text-tomato"}`}>
                            {formatPrice(item.precio)}
                          </span>
                        </div>
                        <p className={`mt-2 text-sm leading-relaxed ${sold ? "text-cream/40 line-through decoration-cream/30" : "text-cream/60"}`}>
                          {item.descripcion}
                        </p>
                        {item.etiqueta && (
                          <div className="mt-3 flex gap-2 flex-wrap">
                            <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${sold ? "bg-cream/10 text-cream/60 border border-cream/20" : "bg-tomato/20 text-tomato border border-tomato/40"}`}>
                              {item.etiqueta}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}