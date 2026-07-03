import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";

/**
 * Scroll-linked exploded-view burger. The outer section is 200vh; the visual
 * is sticky so the user "stays" on the burger while scrolling and each layer
 * translates, rotates, and separates in sync with scroll progress.
 */
export function BurgerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reduce = useReducedMotion();
  const p = reduce ? null : scrollYProgress;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: "200vh" }}
      aria-label="Franky's Burger — hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* radial warmth */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, oklch(0.92 0.06 75) 0%, var(--cream) 60%)",
          }}
        />

        <div className="container-x h-full grid md:grid-cols-2 items-center gap-8 pt-24 md:pt-16">
          {/* copy */}
          <div className="relative z-10 text-center md:text-left">
            <div className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-4">
              A Coruña · Riazor
            </div>
            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] text-charcoal leading-[0.85]">
              Muerde<br />el amor.
            </h1>
            <p className="mt-6 max-w-md mx-auto md:mx-0 text-base md:text-lg text-muted-foreground">
              Smash burgers de vaca madurada premium. Pan brioche, salsas de casa, plancha caliente. Hechas a mano, mordidas con las dos manos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="/carta"
                className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Ver la carta →
              </a>
              <a
                href="https://www.just-eat.es/restaurants-frankys-burger-a-coruna/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-2 border-charcoal text-charcoal px-6 py-3 rounded-full font-semibold hover:bg-charcoal hover:text-cream transition-colors"
              >
                Pedir a domicilio
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 justify-center md:justify-start text-sm">
              <span className="text-gold text-lg">★★★★★</span>
              <span className="text-muted-foreground">5.0 · 558 reseñas en Google</span>
            </div>
          </div>

          {/* burger stack */}
          <div className="relative h-[420px] md:h-[560px] flex items-center justify-center pointer-events-none select-none">
            <BurgerStack progress={p} />
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-pulse">
          scroll
        </div>
      </div>
    </section>
  );
}

function BurgerStack({ progress }: { progress: MotionValue<number> | null }) {
  // Layers ordered top → bottom visually. Each has its own drift, rotation, and drop.
  const layers = [
    { key: "topBun", el: TopBun, y: [-180, -20], rot: [0, -8], x: [0, 40] },
    { key: "lettuce", el: Lettuce, y: [-110, 40], rot: [0, 6], x: [0, -35] },
    { key: "tomato", el: Tomato, y: [-60, 90], rot: [0, -4], x: [0, 30] },
    { key: "cheese", el: Cheese, y: [-20, 130], rot: [0, 10], x: [0, -50] },
    { key: "patty", el: Patty, y: [20, 180], rot: [0, -6], x: [0, 25] },
    { key: "bottomBun", el: BottomBun, y: [60, 230], rot: [0, 4], x: [0, -20] },
  ];

  return (
    <div className="relative w-[280px] md:w-[380px] h-full">
      {layers.map((l, i) => (
        <BurgerLayer key={l.key} progress={progress} index={i} {...l}>
          <l.el />
        </BurgerLayer>
      ))}
      {/* plate shadow */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[70%] h-6 rounded-[50%] bg-charcoal/20 blur-xl" />
    </div>
  );
}

function BurgerLayer({
  progress,
  index,
  y,
  rot,
  x,
  children,
}: {
  progress: MotionValue<number> | null;
  index: number;
  y: [number, number];
  rot: [number, number];
  x: [number, number];
  children: React.ReactNode;
}) {
  // Fallback if reduced motion — pin at starting stacked position.
  const dy = useTransform(progress ?? (0 as unknown as MotionValue<number>), [0, 1], y);
  const dr = useTransform(progress ?? (0 as unknown as MotionValue<number>), [0, 1], rot);
  const dx = useTransform(progress ?? (0 as unknown as MotionValue<number>), [0, 1], x);

  const style = progress
    ? { y: dy, x: dx, rotate: dr }
    : { y: y[0], x: 0, rotate: 0 };

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 20 - index,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- CSS/SVG burger layers (no external assets) ---------- */

const size = "w-[220px] md:w-[300px]";

function TopBun() {
  return (
    <div className={`${size} aspect-[2/1] relative`}>
      <div
        className="absolute inset-0 rounded-t-[999px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.82 0.13 70) 0%, oklch(0.62 0.14 55) 80%)",
          boxShadow: "inset 0 -8px 20px oklch(0.35 0.1 45 / 0.5), 0 12px 30px oklch(0.2 0.05 40 / 0.35)",
        }}
      />
      {/* sesame seeds */}
      {[15, 30, 45, 60, 75, 22, 55, 70].map((left, i) => (
        <span
          key={i}
          className="absolute w-2 h-3 rounded-full bg-[oklch(0.94_0.05_85)]"
          style={{
            left: `${left}%`,
            top: `${25 + (i % 3) * 10}%`,
            transform: `rotate(${i * 20}deg)`,
            boxShadow: "0 1px 2px oklch(0.3 0.05 40 / 0.4)",
          }}
        />
      ))}
    </div>
  );
}

function Lettuce() {
  return (
    <div className={`${size} h-6 relative`}>
      <div
        className="absolute inset-x-[-6%] top-0 h-8"
        style={{
          background:
            "repeating-linear-gradient(90deg, oklch(0.75 0.16 140) 0 12px, oklch(0.62 0.17 138) 12px 24px)",
          clipPath:
            "polygon(0% 40%, 5% 0%, 12% 45%, 20% 5%, 28% 50%, 36% 10%, 45% 45%, 55% 5%, 64% 50%, 73% 10%, 82% 45%, 90% 5%, 100% 40%, 100% 100%, 0% 100%)",
          filter: "drop-shadow(0 3px 4px oklch(0.3 0.1 100 / 0.35))",
        }}
      />
    </div>
  );
}

function Tomato() {
  return (
    <div
      className={`${size} h-4 rounded-full`}
      style={{
        background: "linear-gradient(180deg, oklch(0.62 0.2 27) 0%, oklch(0.5 0.2 25) 100%)",
        boxShadow: "0 4px 8px oklch(0.3 0.15 25 / 0.4)",
      }}
    />
  );
}

function Cheese() {
  return (
    <div className={`${size} h-5 relative`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.85 0.17 82) 0%, oklch(0.72 0.18 70) 100%)",
          clipPath:
            "polygon(3% 20%, 12% 5%, 30% 15%, 50% 0%, 70% 20%, 90% 8%, 100% 30%, 97% 100%, 3% 100%)",
          filter: "drop-shadow(0 4px 6px oklch(0.35 0.12 60 / 0.4))",
        }}
      />
    </div>
  );
}

function Patty() {
  return (
    <div
      className={`${size} h-8 rounded-full relative`}
      style={{
        background:
          "radial-gradient(ellipse at 30% 30%, oklch(0.35 0.08 45) 0%, oklch(0.22 0.06 40) 70%)",
        boxShadow:
          "inset 0 2px 4px oklch(0.5 0.1 45 / 0.4), 0 8px 16px oklch(0.15 0.05 30 / 0.6)",
      }}
    >
      {/* char specks */}
      {[10, 30, 55, 75, 88].map((l, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${l}%`,
            top: `${20 + (i % 2) * 40}%`,
            width: 3 + (i % 3),
            height: 3,
            background: "oklch(0.15 0.02 30)",
          }}
        />
      ))}
    </div>
  );
}

function BottomBun() {
  return (
    <div
      className={`${size} aspect-[3/1] rounded-b-[999px]`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, oklch(0.78 0.13 68) 0%, oklch(0.58 0.13 52) 90%)",
        boxShadow: "0 14px 24px oklch(0.2 0.06 40 / 0.4)",
      }}
    />
  );
}