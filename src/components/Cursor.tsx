import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "button, a, [role='button'], [role='tab'], input, textarea, select, [data-cursor]";

/* Subtle trailing cursor: gold dot + expanding ring on interactive targets.
 * Desktop (pointer:fine) only. Native cursor remains — this is an accent. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState<"ring" | "art" | "crosshair">("ring");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const dc = t?.closest("[data-cursor]")?.getAttribute("data-cursor");
      setVariant(dc === "art" || dc === "crosshair" ? dc : "ring");
      setActive(!!t?.closest(INTERACTIVE) || !!dc);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[210]"
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className={`-translate-x-1/2 -translate-y-1/2 ${
            variant === "crosshair" ? "" : "rounded-full border border-gold"
          }`}
          animate={{
            width: variant === "art" ? 64 : variant === "crosshair" ? 34 : active ? 46 : 30,
            height: variant === "art" ? 64 : variant === "crosshair" ? 34 : active ? 46 : 30,
            opacity: variant === "art" ? 0.55 : active ? 0.9 : 0.45,
            boxShadow:
              variant === "art"
                ? "0 0 34px rgba(224,184,102,0.4), inset 0 0 20px rgba(224,184,102,0.16)"
                : active
                  ? "0 0 24px rgba(200,155,75,0.35), inset 0 0 12px rgba(200,155,75,0.12)"
                  : "0 0 0px rgba(200,155,75,0)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {variant === "crosshair" && (
            <>
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-amberglow/80" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-amberglow/80" />
              <span className="absolute inset-[30%] rounded-full border border-amberglow/50" />
            </>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[210]"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <div
          className={`h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron transition-transform duration-200 ${
            active ? "scale-150" : ""
          }`}
        />
      </motion.div>
    </>
  );
}
