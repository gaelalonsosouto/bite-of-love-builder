import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";

export type Review = {
  author: string;
  quote: string;
  rating: number;
};

const MAPS_URL =
  "https://www.google.com/maps/place/Franky's+Burger/@43.3677895,-8.4122959,17z";

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, [reviews.length, reduce]);

  const at = (offset: number) =>
    reviews[(i + offset + reviews.length) % reviews.length];

  const positions = [
    { x: "-58%", scale: 0.82, opacity: 0.35, blur: 3, z: 1, review: at(-1), side: "left" as const },
    { x: "0%", scale: 1, opacity: 1, blur: 0, z: 3, review: at(0), side: "center" as const },
    { x: "58%", scale: 0.82, opacity: 0.35, blur: 3, z: 1, review: at(1), side: "right" as const },
  ];

  return (
    <div className="relative">
      <div className="relative h-[380px] md:h-[340px] flex items-center justify-center">
        <AnimatePresence initial={false}>
          {positions.map((p) => (
            <motion.a
              key={`${i}-${p.side}`}
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: p.x, scale: p.scale * 0.9 }}
              animate={{
                opacity: p.opacity,
                x: p.x,
                scale: p.scale,
                filter: `blur(${p.blur}px)`,
              }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: p.z }}
              className="hover-lift absolute w-[86%] sm:w-[520px] max-w-[92vw] rounded-2xl border border-border bg-card/95 backdrop-blur p-8 md:p-10 shadow-[0_30px_80px_-30px_oklch(0_0_0/0.9)]"
            >
              <div className="flex items-center gap-1 text-gold mb-4">
                {Array.from({ length: p.review.rating }).map((_, k) => (
                  <Star key={k} fill="currentColor" strokeWidth={0} size={16} />
                ))}
              </div>
              <blockquote className="text-base md:text-lg text-cream leading-relaxed">
                &ldquo;{p.review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                — {p.review.author} · <span className="underline">Ver en Google Maps</span>
              </figcaption>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {reviews.map((_, k) => (
          <button
            key={k}
            aria-label={`Ver reseña ${k + 1}`}
            onClick={() => setI(k)}
            className={`h-2 rounded-full transition-all ${
              k === i ? "w-8 bg-tomato" : "w-2 bg-cream/25 hover:bg-cream/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}