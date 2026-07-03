import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollBurger } from "@/components/scroll-burger";
import { Reveal } from "@/components/reveal";
import { ReviewsCarousel, type Review } from "@/components/reviews-carousel";
import interior from "@/assets/frankys-interior.webp.asset.json";
import facade from "@/assets/frankys-facade.webp.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const reviews: Review[] = [
  {
    author: "Cliente en Google",
    rating: 5,
    quote:
      "La classic cheeseburger es un acierto seguro: verduras crujientes, pan que no se humedece y carne en su punto.",
  },
  {
    author: "Cliente en Google",
    rating: 5,
    quote:
      "Calidad de hamburguesería de referencia en EE. UU., con un trato acogedor que se nota desde que entras.",
  },
  {
    author: "Cliente en Google",
    rating: 5,
    quote:
      "De las hamburgueserías favoritas de la zona. Nota perfecta en comida, servicio y ambiente.",
  },
  {
    author: "Cliente en Google",
    rating: 5,
    quote:
      "Una 1906 bien fría, la smash en la mano y Riazor a un paso. No se puede pedir más.",
  },
  {
    author: "Cliente en Google",
    rating: 5,
    quote:
      "Volví tres veces en una semana. La Franky's con cebolla caramelizada es adictiva.",
  },
];

const schedule = [
  ["Lunes", "Cerrado"],
  ["Martes", "20:00 – 06:00"],
  ["Miércoles", "20:00 – 23:00"],
  ["Jueves", "13:30 – 16:00 · 20:00 – 23:00"],
  ["Viernes", "13:30 – 16:00 · 20:00 – 00:00"],
  ["Sábado", "13:30 – 16:30 · 20:00 – 00:00"],
  ["Domingo", "13:30 – 16:30 · 20:00 – 23:00"],
];

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollBurger />
      <SiteHeader />
      <main className="relative z-10">
        {/* HERO */}
        <section className="min-h-[92vh] flex items-center pt-28 pb-16">
          <div className="container-x">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tomato/40 bg-tomato/10 text-tomato text-xs uppercase tracking-[0.3em] font-semibold ember">
                <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
                A Coruña · Riazor
              </div>
              <h1 className="mt-6 font-display text-[clamp(3.5rem,10vw,8rem)] text-cream leading-[0.85]">
                Muerde<br />
                <span className="text-tomato">el amor.</span>
              </h1>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/carta"
                  className="hover-glow inline-flex items-center gap-2 bg-tomato text-cream px-6 py-3 rounded-full font-semibold"
                >
                  Ver la carta →
                </Link>
                <a
                  href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift inline-flex items-center border-2 border-cream/30 text-cream px-6 py-3 rounded-full font-semibold"
                >
                  Pedir a domicilio
                </a>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm">
                <span className="text-gold text-lg tracking-widest">★★★★★</span>
                <span className="text-cream/60">5,0 · 558 reseñas en Google</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STORY */}
        <section className="py-32 md:py-48">
          <div className="container-x grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <Reveal>
                <div className="hover-lift rounded-lg overflow-hidden border border-border">
                  <img
                    src={facade.url}
                    alt="Fachada de Franky's Burger en A Coruña con Fran y Alejandra en la puerta"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pl-8">
              <div className="uppercase tracking-[0.3em] text-xs font-semibold text-tomato mb-6">
                Nuestra historia
              </div>
              <Reveal>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-cream">
                  De Cali a Nueva York.<br />
                  <span className="text-tomato">De Nueva York a Riazor.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 text-lg text-cream/70 max-w-xl">
                  Fran Rodríguez creció entre las cocinas de Cali y las planchas de los steakhouses de Nueva York. Alejandra Vélez soñaba con montar algo suyo. Se conocieron, se enamoraron, y llevaron ese sueño hasta A Coruña.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-cream/70 max-w-xl">
                  Franky&apos;s Burger lo montaron con sus propias manos: paredes negras, madera, plancha, salsas y pan brioche. Carne de vaca madurada premium, aplastada al momento, hasta conseguir esa costra crujiente que solo da la smash bien hecha.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-8 font-display text-2xl text-tomato">
                  &ldquo;Muerde el amor.&rdquo;
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="relative py-32 md:py-40">
          <div className="absolute inset-0 -z-0 overflow-hidden">
            <img
              src={interior.url}
              alt=""
              aria-hidden
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
          </div>
          <div className="container-x relative">
            <Reveal>
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-gold mb-6">
                Cómo lo hacemos
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] max-w-5xl text-cream">
                Vaca madurada.<br />
                Plancha al rojo.<br />
                <span className="text-tomato">Pan brioche recién tostado.</span>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              {[
                { t: "Smash de verdad", d: "Bola de carne aplastada sobre plancha caliente. Costra crujiente, jugo dentro." },
                { t: "Salsas de casa", d: "Franky's, Monster, salsa de pimientos rojos y jalapeños. Todo hecho aquí." },
                { t: "Barra y mesa", d: "Te sentamos, tomamos nota, te la llevamos. Servicio de barra, ambiente cercano." },
              ].map((f, k) => (
                <Reveal key={f.t} delay={0.1 * k}>
                  <div className="hover-lift h-full rounded-lg border border-border bg-card/80 backdrop-blur p-8">
                    <div className="font-display text-2xl text-gold mb-3">0{k + 1}</div>
                    <h3 className="font-display text-2xl mb-2 text-cream">{f.t}</h3>
                    <p className="text-sm text-cream/70 leading-relaxed">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-32 md:py-48">
          <div className="container-x">
            <div className="text-center mb-16">
              <Reveal>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-tomato mb-4">
                  Lo que dicen de nosotros
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-cream">
                  Nota perfecta<br />
                  <span className="text-tomato">en A Coruña.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 inline-flex items-center gap-3 bg-card border border-border rounded-full px-5 py-3">
                  <span className="text-gold text-lg tracking-widest">★★★★★</span>
                  <span className="text-sm text-cream/80 font-semibold">5,0 · 558 reseñas en Google</span>
                </div>
              </Reveal>
            </div>
            <ReviewsCarousel reviews={reviews} />
            <p className="mt-8 text-center text-xs text-cream/50">
              Pincha cualquier reseña para ver todas en Google Maps.
            </p>
          </div>
        </section>

        {/* PITCH / SLOGAN */}
        <section className="container-x pb-24 md:pb-32">
          <Reveal>
            <div className="hover-lift relative overflow-hidden bg-gradient-to-br from-tomato/20 via-card to-card border border-tomato/30 rounded-2xl p-12 md:p-20 text-center">
              <p className="font-display text-[clamp(1.75rem,3.5vw,3rem)] text-cream leading-tight max-w-3xl mx-auto">
                Smash burgers de <span className="text-tomato">vaca madurada premium.</span> Pan brioche, salsas de casa, plancha al rojo. Hechas a mano, mordidas con las dos manos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link
                  to="/carta"
                  className="hover-glow inline-flex items-center bg-tomato text-cream px-6 py-3 rounded-full font-semibold"
                >
                  Ver la carta →
                </Link>
                <a
                  href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift inline-flex items-center border-2 border-cream/40 text-cream px-6 py-3 rounded-full font-semibold"
                >
                  Pedir a domicilio
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* LOCATION */}
        <section className="py-32 md:py-40">
          <div className="container-x grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-tomato mb-4">
                  Visítanos
                </p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-cream">
                  A un paso<br />
                  <span className="text-tomato">de Riazor.</span>
                </h2>
                <div className="mt-8 space-y-3 text-lg text-cream/80">
                  <p>C. Pondal, 1, Bajo F</p>
                  <p>15004 A Coruña</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=43.3677895,-8.4122959"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-glow inline-flex items-center bg-tomato text-cream px-5 py-3 rounded-full font-semibold"
                  >
                    Cómo llegar →
                  </a>
                  <a
                    href="tel:+34881336926"
                    className="hover-lift inline-flex items-center border-2 border-cream/30 text-cream px-5 py-3 rounded-full font-semibold"
                  >
                    +34 881 33 69 26
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="hover-lift bg-card border border-border rounded-lg p-8">
                <h3 className="font-display text-2xl text-cream mb-6">Horario</h3>
                <dl className="divide-y divide-border text-sm">
                  {schedule.map(([day, hours]) => (
                    <div key={day} className="flex justify-between gap-4 py-3">
                      <dt className="font-semibold text-cream">{day}</dt>
                      <dd className="text-right text-cream/60">{hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-xs text-cream/50">
                  Nota: el horario del martes es amplio. Confírmalo por teléfono antes de tu visita.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="container-x mt-16">
            <Reveal>
              <div className="hover-lift rounded-lg overflow-hidden border border-border">
                <iframe
                  title="Ubicación de Franky's Burger en A Coruña"
                  src="https://www.google.com/maps?q=C.+Pondal,+1,+Bajo+F,+15004+A+Coruña&output=embed"
                  width="100%"
                  height="380"
                  style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}