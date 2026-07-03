import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BurgerHero } from "@/components/burger-hero";
import { Reveal } from "@/components/reveal";
import smashStory from "@/assets/smash-story.jpg";
import localAmbient from "@/assets/local-ambient.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const reviews = [
  {
    quote:
      "La classic cheeseburger es un acierto seguro: verduras crujientes, pan que no se humedece y carne en su punto.",
    author: "Cliente en Google",
  },
  {
    quote:
      "Calidad de hamburguesería de referencia en EE.UU., con un trato acogedor que se nota desde que entras.",
    author: "Cliente en Google",
  },
  {
    quote:
      "De las hamburgueserías favoritas de la zona. Nota perfecta en comida, servicio y ambiente.",
    author: "Cliente en Google",
  },
  {
    quote:
      "Una 1906 bien fría, la smash en la mano y Riazor a un paso. No se puede pedir más.",
    author: "Cliente en Google",
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
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <BurgerHero />

        {/* Story */}
        <section className="container-x py-32 md:py-48">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <img
                src={smashStory}
                alt="Chef aplastando una smash burger sobre plancha caliente en Franky's Burger A Coruña"
                loading="lazy"
                width={1280}
                height={1600}
                className="w-full h-auto rounded-md object-cover shadow-[0_30px_60px_-20px_oklch(0.2_0.05_40/0.35)]"
              />
            </div>
            <div className="md:col-span-7 md:pl-8">
              <div className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-6">
                Nuestra historia
              </div>
              <Reveal>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-charcoal">
                  De Cali a Nueva York.<br />De Nueva York a Riazor.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 text-lg text-muted-foreground max-w-xl">
                  Fran Rodríguez creció entre las cocinas de Cali y las planchas de los steakhouses de Nueva York. Alejandra Vélez soñaba con montar algo suyo. Se conocieron, se enamoraron, y llevaron ese sueño hasta A Coruña.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  Franky&apos;s Burger lo montaron con sus propias manos: paredes, plancha, salsas y pan brioche. Carne de vaca madurada premium, aplastada al momento, hasta conseguir esa costra crujiente que solo da la smash bien hecha.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-6 text-lg font-display text-tomato">
                  &ldquo;Muerde el amor.&rdquo;
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Big statement */}
        <section className="bg-charcoal text-cream py-32 md:py-48">
          <div className="container-x">
            <Reveal>
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-gold mb-6">
                Cómo lo hacemos
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] max-w-5xl">
                Vaca madurada.<br />Plancha al rojo.<br />
                <span className="text-gold">Pan brioche recién tostado.</span>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-10 mt-20 text-cream/80">
              {[
                { t: "Smash de verdad", d: "Bola de carne aplastada sobre plancha caliente. Costra crujiente, jugo dentro." },
                { t: "Salsas de casa", d: "Franky's, Monster, salsa de pimientos rojos y jalapeños. Todo hecho aquí." },
                { t: "Self-service con QR", d: "Pides por QR, recoges en barra. Sin colas, sin líos. Solo la mordida." },
              ].map((f, i) => (
                <Reveal key={f.t} delay={0.1 * i}>
                  <div>
                    <div className="font-display text-2xl text-gold mb-3">0{i + 1}</div>
                    <h3 className="font-display text-2xl mb-2">{f.t}</h3>
                    <p className="text-sm leading-relaxed">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="container-x py-32 md:py-48">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <Reveal>
              <div>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-4">
                  Lo que dicen de nosotros
                </p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-charcoal max-w-3xl">
                  Nota perfecta en A&nbsp;Coruña.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex items-center gap-3 bg-charcoal text-cream px-5 py-3 rounded-full">
                <span className="text-gold text-lg">★★★★★</span>
                <span className="text-sm font-semibold">5.0 · 558 reseñas en Google</span>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <figure className="bg-card border border-border rounded-lg p-8 h-full flex flex-col justify-between">
                  <blockquote className="text-lg text-charcoal leading-relaxed">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-gold">★★★★★</span>
                    <span>{r.author}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="relative py-32 md:py-48 overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-25"
            style={{
              backgroundImage: `url(${localAmbient})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-background/85" />
          <div className="container-x grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-4">
                  Visítanos
                </p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-charcoal">
                  A un paso<br />de Riazor.
                </h2>
                <div className="mt-8 space-y-3 text-lg text-charcoal">
                  <p>C. Pondal, 1, Bajo F</p>
                  <p>15004 A Coruña</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=43.3677895,-8.4122959"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                  >
                    Cómo llegar →
                  </a>
                  <a
                    href="tel:+34881336926"
                    className="inline-flex items-center border-2 border-charcoal text-charcoal px-5 py-3 rounded-full font-semibold hover:bg-charcoal hover:text-cream transition-colors"
                  >
                    +34 881 33 69 26
                  </a>
                  <a
                    href="https://www.instagram.com/frankysburgeroficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border-2 border-charcoal text-charcoal px-5 py-3 rounded-full font-semibold hover:bg-charcoal hover:text-cream transition-colors"
                  >
                    @frankysburgeroficial
                  </a>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  ¿Prefieres desde el sofá? Pídenos en{" "}
                  <a
                    href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    Just Eat
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="font-display text-2xl text-charcoal mb-6">Horario</h3>
                <dl className="divide-y divide-border text-sm">
                  {schedule.map(([day, hours]) => (
                    <div key={day} className="flex justify-between gap-4 py-3">
                      <dt className="font-semibold text-charcoal">{day}</dt>
                      <dd className="text-right text-muted-foreground">{hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-xs text-muted-foreground">
                  Nota: el horario del martes (20:00 – 06:00) es inusualmente amplio. Confírmalo por teléfono antes de tu visita.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="container-x mt-16">
            <Reveal>
              <div className="rounded-lg overflow-hidden border border-border shadow-xl">
                <iframe
                  title="Ubicación de Franky's Burger en A Coruña"
                  src="https://www.google.com/maps?q=C.+Pondal,+1,+Bajo+F,+15004+A+Coruña&output=embed"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="container-x pb-32">
          <Reveal>
            <div className="bg-charcoal text-cream rounded-2xl p-12 md:p-20 text-center">
              <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)]">
                ¿Tienes hambre?
              </h2>
              <p className="mt-4 text-cream/70 max-w-xl mx-auto">
                La carta completa te espera. Y si no puedes acercarte, te la llevamos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link
                  to="/carta"
                  className="inline-flex items-center bg-gold text-charcoal px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  Ver la carta →
                </Link>
                <a
                  href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-cream/50 text-cream px-6 py-3 rounded-full font-semibold hover:bg-cream hover:text-charcoal transition-colors"
                >
                  Pedir en Just Eat
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
