import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "./ui";

/* ------------------------- Chakra (sacred geometry) ------------------- */

export function Chakra({
  className = "",
  spokes = 16,
  petals = true,
}: {
  className?: string;
  spokes?: number;
  petals?: boolean;
}) {
  const lines = Array.from({ length: spokes }, (_, i) => (i * 360) / spokes);
  const dots = Array.from({ length: spokes * 2 }, (_, i) => ((i * 360) / (spokes * 2)) * (Math.PI / 180));
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <circle cx="100" cy="100" r="97" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
      <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="0.5" opacity="0.8" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="8" stroke="currentColor" strokeWidth="0.8" />
      {lines.map((a) => (
        <line
          key={a}
          x1="100"
          y1="100"
          x2={100 + 90 * Math.cos((a * Math.PI) / 180)}
          y2={100 + 90 * Math.sin((a * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="0.35"
          opacity="0.55"
        />
      ))}
      {petals &&
        lines.map((a) => {
          const rad = (a * Math.PI) / 180;
          const x1 = 100 + 64 * Math.cos(rad);
          const y1 = 100 + 64 * Math.sin(rad);
          const x2 = 100 + 90 * Math.cos(rad + 0.14);
          const y2 = 100 + 90 * Math.sin(rad + 0.14);
          return (
            <path
              key={`p${a}`}
              d={`M ${x1} ${y1} Q ${100 + 82 * Math.cos(rad)} ${100 + 82 * Math.sin(rad)} ${x2} ${y2}`}
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.6"
            />
          );
        })}
      {dots.map((rad, i) => (
        <circle
          key={i}
          cx={100 + 78 * Math.cos(rad)}
          cy={100 + 78 * Math.sin(rad)}
          r="0.9"
          fill="currentColor"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

/* ------------------------------- Divider ------------------------------ */

export function Divider({ label, dark = false }: { label?: string; dark?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-5 py-2" aria-hidden="true">
      <span className="gold-rule w-full max-w-[180px]" />
      <span className={`relative flex h-3.5 w-3.5 rotate-45 items-center justify-center border ${dark ? "border-amberglow/60" : "border-gold/60"}`}>
        <span className={`h-1 w-1 rounded-full ${dark ? "bg-amberglow" : "bg-gold"}`} />
      </span>
      {label && (
        <span className={`font-mono text-[10px] uppercase tracking-[0.4em] ${dark ? "text-amberglow/70" : "text-gold"}`}>
          {label}
        </span>
      )}
      <span className="gold-rule w-full max-w-[180px]" />
    </div>
  );
}

/* ----------------------------- Word reveal ----------------------------- */

export function WordReveal({
  text,
  baseDelay = 0,
  step = 0.09,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  baseDelay?: number;
  step?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: baseDelay + i * step, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------------------------- Animated number -------------------------- */

export function AnimatedNumber({
  value,
  suffix = "",
  className = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------- Segmented meter ---------------------------- */

export function SegMeter({
  value, // 0–1
  segments = 24,
  className = "",
  delay = 0,
}: {
  value: number;
  segments?: number;
  className?: string;
  delay?: number;
}) {
  const filled = Math.round(value * segments);
  return (
    <div className={`flex items-center gap-[3px] ${className}`} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      {Array.from({ length: segments }, (_, i) => (
        <motion.span
          key={i}
          className={`h-[7px] flex-1 rounded-[2px] ${i < filled ? "bg-gradient-to-t from-gold to-saffron" : "bg-ink/12"}`}
          initial={{ opacity: 0, scaleY: 0.3 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: delay + i * 0.018, duration: 0.3, ease: EASE }}
        />
      ))}
    </div>
  );
}

/* ----------------------------- Score blocks --------------------------- */

export function ScoreBlocks({
  label,
  value,
  delay = 0,
  dark = false,
}: {
  label: string;
  value: number; // 0–100
  delay?: number;
  dark?: boolean;
}) {
  const filled = Math.round(value / 10);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${dark ? "text-ivory/60" : "text-soft"}`}>
          {label}
        </span>
        <AnimatedNumber
          value={value}
          suffix="%"
          className={`text-sm font-semibold ${dark ? "text-amberglow" : "text-gold"}`}
        />
      </div>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.span
            key={i}
            className={`h-2.5 flex-1 rounded-[2px] ${
              i < filled ? "bg-gradient-to-t from-bronze via-gold to-saffron" : dark ? "bg-white/10" : "bg-ink/10"
            }`}
            initial={{ opacity: 0, scaleY: 0.2 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.045, duration: 0.32, ease: EASE }}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Glow orb ---------------------------- */

export function GlowOrb({
  className = "",
  size = 420,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay }}
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(199,146,62,0.16) 0%, rgba(199,146,62,0.05) 45%, transparent 70%)",
        filter: "blur(2px)",
      }}
    />
  );
}

export function FadeLine({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`gold-rule ${className}`}>{children}</div>;
}
