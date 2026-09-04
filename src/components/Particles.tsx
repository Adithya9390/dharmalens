import { useEffect, useRef } from "react";

/* Golden ember / manuscript-dust canvas.
 * - `dark` variant uses brighter embers for navy surfaces.
 * - density reduced automatically on small screens.
 * - honours prefers-reduced-motion with a static sprinkle. */
export default function Particles({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    interface P {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      a: number;
      tw: number;
    }
    let parts: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const base = Math.min(40, Math.floor((w * h) / 30000));
      const count = mobile ? Math.min(14, base) : base;
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (dark ? 0.7 : 0.6) + Math.random() * 1.7,
        vx: -0.07 + Math.random() * 0.14,
        vy: -0.15 - Math.random() * 0.2,
        a: 0.14 + Math.random() * 0.3,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const twinkle = 0.55 + 0.45 * Math.sin(t / 1000 + p.tw);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(238, 194, 119, ${p.a * twinkle})`
          : `rgba(169, 118, 31, ${p.a * twinkle})`;
        ctx.fill();
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -6) {
            p.y = h + 6;
            p.x = Math.random() * w;
          }
          if (p.x < -6) p.x = w + 6;
          if (p.x > w + 6) p.x = -6;
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [dark]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
