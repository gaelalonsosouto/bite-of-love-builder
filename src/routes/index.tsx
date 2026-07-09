import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollBurger } from "@/components/scroll-burger";
import { Reveal } from "@/components/reveal";
import interior from "@/assets/frankys-interior.webp";
import facade from "@/assets/frankys-facade.webp";
import { bloquesQueryOptions, horarioQueryOptions, t } from "@/lib/content";

const MAPS_URL =
  "https://www.google.com/maps/place/Franky's+Burger/@43.3545007,-9.0264456,9z/data=!4m10!1m2!2m1!1zZnJhbmvCtHlz!3m6!1s0xd2e7dae90f2d35d:0x74c8b3b9419d6322!8m2!3d43.3677895!4d-8.4122959!15sCglmcmFua8K0eXNaCiIIZnJhbmsgeXOSARRoYW1idXJnZXJfcmVzdGF1cmFudOABAA!16s%2Fg%2F11wwtz7ghb?entry=ttu";
const MAPS_REVIEWS_URL = MAPS_URL;

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(bloquesQueryOptions);
    context.queryClient.ensureQueryData(horarioQueryOptions);
  },
  component: Index,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-cream p-8">
      {error.message}
    </div>
  ),
});

function Index() {
  const { data: bloques } = useSuspenseQuery(bloquesQueryOptions);
  const { data: schedule } = useSuspenseQuery(horarioQueryOptions);
  const historiaImg = bloques.get("historia_imagen")?.valor || facade;
  const comoImg = bloques.get("como_imagen_fondo")?.valor || interior;
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
                {t(bloques, "hero_badge", "A Coruña · Riazor")}
              </div>
              <h1 className="mt-6 font-display text-[clamp(3.5rem,10vw,8rem)] text-cream leading-[0.85]">
                {t(bloques, "hero_titulo_1", "Franky's Burger — Smash burgers")}
                {(() => {
                  const line2 = t(bloques, "hero_titulo_2", "en A Coruña");
                  return line2 ? (
                    <>
                      {" "}
                      <br />
                      <span className="text-tomato">{line2}</span>
                    </>
                  ) : null;
                })()}
              </h1>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/carta"
                  className="hover-glow inline-flex items-center gap-2 bg-tomato text-cream px-6 py-3 rounded-full font-semibold"
                >
                  {t(bloques, "hero_cta_primario", "Ver la carta →")}
                </Link>
                <a
                  href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift inline-flex items-center border-2 border-cream/30 text-cream px-6 py-3 rounded-full font-semibold"
                >
                  {t(bloques, "hero_cta_secundario", "Pedir a domicilio")}
                </a>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm">
                <span className="text-gold text-lg tracking-widest">{t(bloques, "hero_valoracion_estrellas", "★★★★★")}</span>
                <span className="text-cream/60">{t(bloques, "hero_valoracion_texto", "5,0 · 558 reseñas en Google")}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-32 md:py-48">
          <div className="container-x">
            <div className="text-center mb-16">
              <Reveal>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-tomato mb-4">
                  {t(bloques, "resenas_kicker", "Lo que dicen de nosotros")}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-cream">
                  {t(bloques, "resenas_titulo_1", "Nota perfecta")}<br />
                  <span className="text-tomato">{t(bloques, "resenas_titulo_2", "en A Coruña.")}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 inline-flex items-center gap-3 bg-card border border-border rounded-full px-5 py-3">
                  <span className="text-gold text-lg tracking-widest">★★★★★</span>
                  <span className="text-sm text-cream/80 font-semibold">{t(bloques, "resenas_nota", "5,0")} · {t(bloques, "resenas_numero", "558")} reseñas en Google</span>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.3}>
              <a
                href={MAPS_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift block max-w-2xl mx-auto rounded-2xl border border-border bg-card/95 backdrop-blur p-10 text-center"
              >
                <div className="flex items-center justify-center gap-1 text-gold mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} fill="currentColor" strokeWidth={0} size={22} />
                  ))}
                </div>
                <p className="font-display text-3xl md:text-4xl text-cream leading-tight">
                  {t(bloques, "resenas_nota", "5,0")} sobre 5
                </p>
                <p className="mt-3 text-cream/70">
                  {t(bloques, "resenas_texto_tarjeta", "Basado en 558 reseñas reales de clientes en Google.")}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-tomato font-semibold underline underline-offset-4">
                  {t(bloques, "resenas_cta", "Leer las reseñas en Google Maps →")}
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* PROCESS */}
        <section className="relative py-32 md:py-40">
          <div className="absolute inset-0 -z-0 overflow-hidden">
            <img
              src={comoImg}
              alt=""
              aria-hidden
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
          </div>
          <div className="container-x relative">
            <Reveal>
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-gold mb-6">
                {t(bloques, "como_kicker", "Cómo lo hacemos")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] max-w-5xl text-cream">
                {t(bloques, "como_titulo_1", "Vaca madurada.")}<br />
                {t(bloques, "como_titulo_2", "Plancha al rojo.")}<br />
                <span className="text-tomato">{t(bloques, "como_titulo_3", "Pan brioche recién tostado.")}</span>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              {[
                { t: t(bloques, "como_tarjeta_1_titulo", "Smash de verdad"), d: t(bloques, "como_tarjeta_1_texto", "") },
                { t: t(bloques, "como_tarjeta_2_titulo", "Salsas de casa"), d: t(bloques, "como_tarjeta_2_texto", "") },
                { t: t(bloques, "como_tarjeta_3_titulo", "Barra y mesa"), d: t(bloques, "como_tarjeta_3_texto", "") },
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

        {/* STORY */}
        <section className="py-32 md:py-48">
          <div className="container-x grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <Reveal>
                <div className="hover-lift rounded-lg overflow-hidden border border-border">
                  <img
                    src={historiaImg}
                    alt="Fachada de Franky's Burger en A Coruña con Fran y Alejandra en la puerta"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.src = facade;
                    }}
                  />
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pl-8">
              <div className="uppercase tracking-[0.3em] text-xs font-semibold text-tomato mb-6">
                {t(bloques, "historia_kicker", "Nuestra historia")}
              </div>
              <Reveal>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-cream">
                  {t(bloques, "historia_titulo_1", "De Cali a Nueva York.")}<br />
                  <span className="text-tomato">{t(bloques, "historia_titulo_2", "De Nueva York a Riazor.")}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 text-lg text-cream/70 max-w-xl">
                  {t(bloques, "historia_parrafo_1")}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-cream/70 max-w-xl">
                  {t(bloques, "historia_parrafo_2")}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-8 font-display text-2xl text-tomato">
                  &ldquo;{t(bloques, "historia_frase_final", "Muerde el amor.")}&rdquo;
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PITCH / SLOGAN */}
        <section className="container-x pb-24 md:pb-32">
          <Reveal>
            <div className="hover-lift relative overflow-hidden bg-gradient-to-br from-tomato/20 via-card to-card border border-tomato/30 rounded-2xl p-12 md:p-20 text-center">
              <p className="font-display text-[clamp(2rem,5vw,4rem)] text-tomato leading-tight max-w-3xl mx-auto uppercase tracking-wider">
                {t(bloques, "cta_titulo", "¿Buscas Calidad?")}
              </p>
              <p className="mt-4 text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
                {t(bloques, "cta_texto", "")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link
                  to="/carta"
                  className="hover-glow inline-flex items-center bg-tomato text-cream px-6 py-3 rounded-full font-semibold"
                >
                  {t(bloques, "cta_boton_primario", "Ver la carta →")}
                </Link>
                <a
                  href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift inline-flex items-center border-2 border-cream/40 text-cream px-6 py-3 rounded-full font-semibold"
                >
                  {t(bloques, "cta_boton_secundario", "Pedir a domicilio")}
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
                  {t(bloques, "ubicacion_kicker", "Visítanos")}
                </p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-cream">
                  {t(bloques, "ubicacion_titulo_1", "A un paso")}<br />
                  <span className="text-tomato">{t(bloques, "ubicacion_titulo_2", "de Riazor.")}</span>
                </h2>
                <div className="mt-8 space-y-3 text-lg text-cream/80">
                  <p>{t(bloques, "ubicacion_direccion_1", "C. Pondal, 1, Bajo F")}</p>
                  <p>{t(bloques, "ubicacion_direccion_2", "15004 A Coruña")}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={MAPS_URL}
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
                    {t(bloques, "ubicacion_telefono", "+34 881 33 69 26")}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="hover-lift bg-card border border-border rounded-lg p-8">
                <h3 className="font-display text-2xl text-cream mb-6">{t(bloques, "ubicacion_horario_titulo", "Horario")}</h3>
                <dl className="divide-y divide-border text-sm">
                  {schedule.map((row) => (
                    <div key={row.id} className="flex justify-between gap-4 py-3">
                      <dt className="font-semibold text-cream">{row.dia}</dt>
                      <dd className="text-right text-cream/60">{row.horario_texto}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-xs text-cream/50">
                  {t(bloques, "ubicacion_horario_nota", "Horario actualizado. Si vienes en un día festivo, confírmalo por teléfono.")}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="container-x mt-16">
            <Reveal>
              <div className="hover-lift rounded-lg overflow-hidden border border-border">
                <iframe
                  title="Ubicación de Franky's Burger en A Coruña"
                  src="https://www.google.com/maps?q=Franky's+Burger,+C.+Pondal+1,+15004+A+Coruña&output=embed"
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