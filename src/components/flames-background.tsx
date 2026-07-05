import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Cinematic, photoreal-ish flames background built with SVG turbulence.
 *
 * - A vertical gradient (deep red → orange → yellow → hot core) is displaced
 *   by two independent feTurbulence layers, so the shape of the fire is
 *   constantly warped in an organic, non-repeating way.
 * - Turbulence `baseFrequency` and `seed` are animated with long,
 *   coprime-ish durations (17s / 23s / 41s / 53s) so the combined pattern
 *   never visibly loops — no obvious cut or restart.
 * - A radial mask shapes the gradient into upward-licking tongues rooted at
 *   the bottom, and the whole thing fades as the user scrolls toward the
 *   footer so headings and cards stay perfectly legible on top.
 */
export function FlamesBackground() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, raw / 0.92)));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const intensity = 1 - progress;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
      style={{ opacity: intensity }}
    >
      {/* Warm ambient glow that remains even with reduced motion */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 100%, oklch(0.72 0.26 42 / 0.55) 0%, oklch(0.55 0.24 30 / 0.32) 35%, oklch(0.35 0.18 22 / 0.18) 60%, transparent 85%)",
          filter: "blur(24px)",
        }}
      />

      {reduce ? null : (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            {/* Vertical fire gradient: hot core at the top, deep red at the base */}
            <linearGradient id="flame-gradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.32 0.18 25)" stopOpacity="0.95" />
              <stop offset="18%" stopColor="oklch(0.55 0.24 30)" stopOpacity="0.95" />
              <stop offset="42%" stopColor="oklch(0.72 0.24 45)" stopOpacity="0.9" />
              <stop offset="66%" stopColor="oklch(0.85 0.2 70)" stopOpacity="0.75" />
              <stop offset="84%" stopColor="oklch(0.95 0.14 95)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
            </linearGradient>

            {/* Mask shapes the gradient into upward flame plumes */}
            <radialGradient id="flame-mask" cx="50%" cy="105%" r="80%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="35%" stopColor="white" stopOpacity="0.9" />
              <stop offset="65%" stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="flame-shape">
              <rect width="100" height="100" fill="url(#flame-mask)" />
            </mask>

            {/* Large-scale warp — wobble of the whole wall of fire */}
            <filter id="flame-warp" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.028"
                numOctaves="2"
                seed="3"
                result="warp"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="41s"
                  values="0.012 0.028; 0.018 0.034; 0.010 0.024; 0.012 0.028"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="seed"
                  dur="53s"
                  values="3; 91; 27; 3"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="warp"
                scale="26"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Fine, faster turbulence — flicker at the tips of the tongues */}
            <filter id="flame-flicker" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05 0.11"
                numOctaves="3"
                seed="7"
                result="flick"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="17s"
                  values="0.05 0.11; 0.07 0.15; 0.045 0.09; 0.05 0.11"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="seed"
                  dur="23s"
                  values="7; 44; 71; 7"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="flick"
                scale="10"
                xChannelSelector="R"
                yChannelSelector="B"
              />
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
          </defs>

          {/* Back plume: slow wide warp — the body of the fire */}
          <g mask="url(#flame-shape)" filter="url(#flame-warp)" style={{ mixBlendMode: "screen" }}>
            <rect x="-10" y="15" width="120" height="90" fill="url(#flame-gradient)" opacity="0.85" />
          </g>
          {/* Front plume: fine flicker on top for tongue detail */}
          <g mask="url(#flame-shape)" filter="url(#flame-flicker)" style={{ mixBlendMode: "screen", opacity: 0.75 }}>
            <rect x="-10" y="25" width="120" height="80" fill="url(#flame-gradient)" />
          </g>
        </svg>
      )}

      {/* Hot ember bed at the very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(to top, oklch(0.72 0.26 45 / 0.7), oklch(0.5 0.22 30 / 0.28) 55%, transparent)",
          mixBlendMode: "screen",
        }}
      />
      {/* Top vignette so cards and headings stay legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-transparent" />
    </div>
  );
}