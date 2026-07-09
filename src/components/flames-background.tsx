import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

/**
 * GPU shader-based flames background using three.js.
 * A full-screen fragment shader renders layered domain-warped noise to
 * simulate rising fire tongues along the bottom of the viewport.
 * Intensity fades out as the user scrolls down (extinguished near the footer).
 */
export function FlamesBackground() {
  const reduce = useReducedMotion();
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const setSize = () => renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    setSize();
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uIntensity: { value: 1 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uIntensity;

        // --- Simplex-ish 2D noise (hash based, cheap) ---
        vec2 hash2(vec2 p){
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }
        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          float a = dot(hash2(i+vec2(0,0)), f-vec2(0,0));
          float b = dot(hash2(i+vec2(1,0)), f-vec2(1,0));
          float c = dot(hash2(i+vec2(0,1)), f-vec2(0,1));
          float d = dot(hash2(i+vec2(1,1)), f-vec2(1,1));
          return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0;
          float a = 0.5;
          mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
          for(int i=0;i<5;i++){
            v += a * noise(p);
            p = m * p;
            a *= 0.5;
          }
          return v;
        }

        void main(){
          // Aspect-corrected uv. Origin at bottom.
          vec2 uv = vUv;
          float aspect = uResolution.x / max(uResolution.y, 1.0);
          vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);

          float t = uTime * 0.55;

          // Domain warp — rising motion
          vec2 q = vec2(
            fbm(p * 2.2 + vec2(0.0, -t * 1.2)),
            fbm(p * 2.2 + vec2(5.2, -t * 1.0) + 3.4)
          );
          vec2 r = vec2(
            fbm(p * 2.6 + q * 1.8 + vec2(1.7, -t * 1.6)),
            fbm(p * 2.6 + q * 1.8 + vec2(8.3, -t * 1.4))
          );
          float n = fbm(p * 3.0 + r * 2.2 + vec2(0.0, -t * 1.9));

          // Vertical mask: flames concentrated on bottom, tongue-shaped
          float bottom = smoothstep(0.75, 0.0, uv.y); // stronger low
          // Extra bed of embers along the very bottom
          float ember = smoothstep(0.30, 0.0, uv.y);

          // Flame body: subtract vertical gradient so tongues thin as they rise
          float flame = (n * 0.6 + 0.55) * bottom;
          flame -= (uv.y * 1.35);
          flame = max(flame, 0.0);

          // Color ramp: white core -> yellow -> orange -> deep red -> smoke
          vec3 cCore   = vec3(1.00, 0.95, 0.75);
          vec3 cYellow = vec3(1.00, 0.75, 0.25);
          vec3 cOrange = vec3(1.00, 0.42, 0.10);
          vec3 cRed    = vec3(0.75, 0.10, 0.02);
          vec3 cDark   = vec3(0.18, 0.02, 0.00);

          float f = clamp(flame * 1.35, 0.0, 1.0);
          vec3 col = mix(cDark, cRed, smoothstep(0.02, 0.25, f));
          col = mix(col, cOrange, smoothstep(0.20, 0.55, f));
          col = mix(col, cYellow, smoothstep(0.55, 0.80, f));
          col = mix(col, cCore,   smoothstep(0.82, 1.00, f));

          // Ember glow strip
          col += cOrange * ember * 0.45;

          // Alpha: additive-ish look via premultiplied color, but keep transparency for scroll fade
          float alpha = clamp(flame * 1.6 + ember * 0.35, 0.0, 1.0);
          alpha *= uIntensity;
          col *= uIntensity;

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Scroll-linked intensity
    let intensity = 1;
    const updateIntensity = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      const end = 0.92;
      const p = Math.min(1, Math.max(0, raw / end));
      intensity = 1 - p;
    };
    updateIntensity();
    window.addEventListener("scroll", updateIntensity, { passive: true });

    const onResize = () => {
      setSize();
      uniforms.uResolution.value.set(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      uniforms.uTime.value = reduce ? 0 : elapsed;
      uniforms.uIntensity.value += (intensity - uniforms.uIntensity.value) * 0.08;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateIntensity);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduce]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    />
  );
}