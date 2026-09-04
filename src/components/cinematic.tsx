import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { X, MapPin } from "lucide-react";
import { EASE, Btn, Overline } from "./ui";
import { Chakra } from "./fx";
import { useRouter } from "../state/store";

/* ============================ Letter reveal ============================ */

export function LetterReveal({
  text,
  baseDelay = 0,
  step = 0.045,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  step?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: baseDelay + i * step, ease: EASE }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ========================== Cinematic image ============================ */

export function CinematicImage({
  src,
  alt,
  className = "",
  delay = 0,
  hoverZoom = true,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  hoverZoom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden ${className}`}
      data-cursor="art"
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.16, filter: "brightness(0.45) saturate(0.7)", clipPath: "inset(0 100% 0 0)" }}
        animate={
          inView
            ? { scale: 1.02, filter: "brightness(1) saturate(1)", clipPath: "inset(0 0% 0 0)" }
            : {}
        }
        transition={{ duration: 1.5, delay, ease: EASE }}
        className={`h-full w-full object-cover ${hoverZoom ? "transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" : ""}`}
      />
      {/* golden light sweep */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-full w-[34%] bg-gradient-to-r from-transparent via-amberglow/30 to-transparent"
        initial={{ left: "-36%", opacity: 0 }}
        animate={inView ? { left: "130%", opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.2, delay: delay + 0.35, ease: "easeInOut" }}
      />
      {/* vignette */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/20 opacity-70"
      />
    </div>
  );
}

/* ============================ Golden thread ============================ */

export function GoldenThread() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const top = useTransform(smooth, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-[26px] top-0 z-30 hidden h-screen w-px lg:block"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
      <motion.div
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-saffron shadow-glow"
        style={{ top }}
      />
    </div>
  );
}

/* ============================= Scroll rail ============================= */

const RAIL_STOPS = [
  { id: "hero", n: "01", label: "ENTER" },
  { id: "epic", n: "02", label: "THE EPIC" },
  { id: "modern", n: "03", label: "THE PROBLEM" },
  { id: "decision", n: "04", label: "THE DECISION" },
  { id: "insight", n: "05", label: "THE INSIGHT" },
  { id: "reflect", n: "06", label: "REFLECT" },
];

export function ScrollRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    RAIL_STOPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Journey progress"
      className="fixed right-[22px] top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {RAIL_STOPS.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="focus-ring group flex items-center gap-2.5"
            aria-label={`Scroll to ${s.label}`}
            aria-current={on}
          >
            <span
              className={`font-mono text-[8.5px] uppercase tracking-[0.24em] transition-all duration-500 ${
                on ? "translate-x-0 opacity-100 text-amberglow" : "translate-x-2 opacity-0 group-hover:opacity-60 text-ivory/50"
              }`}
            >
              {s.n} {s.label}
            </span>
            <span
              className={`rounded-full border transition-all duration-500 ${
                on
                  ? "h-6 w-[5px] border-amberglow bg-gold/70 shadow-glow"
                  : "h-[5px] w-[5px] border-gold/50 bg-transparent group-hover:bg-gold/40"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

/* ========================= Transformation scene ========================= */
/* Sticky scroll morph: battlefield → chakra → knowledge network → decision UI */

const HUB_NODES = [
  { x: 300, y: 300 }, { x: 300, y: 112 }, { x: 488, y: 300 }, { x: 300, y: 488 },
  { x: 112, y: 300 }, { x: 433, y: 167 }, { x: 433, y: 433 }, { x: 167, y: 433 },
  { x: 167, y: 167 }, { x: 380, y: 130 }, { x: 470, y: 380 }, { x: 220, y: 470 }, { x: 130, y: 220 },
];
const HUB_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 7], [1, 5], [2, 5], [2, 6], [3, 6], [3, 7], [4, 7], [1, 9], [5, 9], [2, 10], [6, 10], [3, 11], [7, 11], [4, 12], [1, 8], [4, 8],
];

function Caption({
  progress,
  range,
  mono,
  title,
  sub,
}: {
  progress: ReturnType<typeof useSpring>;
  range: [number, number];
  mono: string;
  title: string;
  sub: string;
}) {
  const opacity = useTransform(
    progress as never,
    [range[0], range[0] + 0.06, range[1] - 0.06, range[1]],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress as never, [range[0], range[0] + 0.08], [26, 0]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 text-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-amberglow">{mono}</div>
      <div className="mt-3 font-display text-4xl font-medium text-ivory sm:text-5xl lg:text-6xl">
        {title}
      </div>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory/50">{sub}</p>
    </motion.div>
  );
}

export function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  const fieldOpacity = useTransform(smooth, [0, 0.18, 0.34], [1, 0.5, 0]);
  const fieldScale = useTransform(smooth, [0, 0.34], [1, 1.12]);
  const chakraOpacity = useTransform(smooth, [0.1, 0.22, 0.38, 0.52], [0, 1, 1, 0.14]);
  const chakraRotate = useTransform(smooth, [0.1, 0.55], [0, 160]);
  const chakraScale = useTransform(smooth, [0.1, 0.55], [0.94, 1.06]);
  const netOpacity = useTransform(smooth, [0.42, 0.56], [0, 1]);
  const dhOpacity = useTransform(smooth, [0.66, 0.8], [0, 1]);
  const dhScale = useTransform(smooth, [0.66, 0.86], [0.85, 1]);

  return (
    <div ref={ref} className="relative h-[320vh] bg-obsidian" id="transformation">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* battlefield base, dissolving */}
        <motion.div style={{ opacity: fieldOpacity, scale: fieldScale }} className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/battlefield-panorama.jpg`}
            alt="The armies arrayed across the field of Kurukshetra"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian" />
        </motion.div>

        {/* morphing geometry */}
        <div className="relative h-[62vmin] w-[62vmin] max-h-[560px] max-w-[560px]">
          {/* chakra */}
          <motion.div
            style={{ opacity: chakraOpacity, rotate: chakraRotate, scale: chakraScale }}
            className="absolute inset-0 text-gold"
          >
            <Chakra />
          </motion.div>

          {/* knowledge network */}
          <motion.svg
            viewBox="0 0 600 600"
            style={{ opacity: netOpacity }}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {HUB_EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={HUB_NODES[a].x}
                y1={HUB_NODES[a].y}
                x2={HUB_NODES[b].x}
                y2={HUB_NODES[b].y}
                stroke="#c89b4b"
                strokeWidth="0.7"
                opacity="0.5"
              />
            ))}
            {HUB_NODES.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={i === 0 ? 7 : 4}
                fill="#0a0b0d"
                stroke="#e0b866"
                strokeWidth={i === 0 ? 1.6 : 1}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.02 * i, duration: 0.5 }}
              />
            ))}
          </motion.svg>

          {/* decision interface */}
          <motion.svg
            viewBox="0 0 600 600"
            style={{ opacity: dhOpacity, scale: dhScale }}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle cx="300" cy="300" r="210" fill="none" stroke="#c89b4b" strokeWidth="0.8" opacity="0.6" />
            <circle cx="300" cy="300" r="150" fill="none" stroke="#c89b4b" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 6" />
            {[
              { x: 300, y: 90, l: "I", label: "Problem" },
              { x: 510, y: 300, l: "II", label: "Choice" },
              { x: 300, y: 510, l: "III", label: "Impact" },
              { x: 90, y: 300, l: "IV", label: "Lens" },
            ].map((d) => (
              <g key={d.l}>
                <rect
                  x={d.x - 15}
                  y={d.y - 15}
                  width="30"
                  height="30"
                  transform={`rotate(45 ${d.x} ${d.y})`}
                  fill="#0a0b0d"
                  stroke="#e0b866"
                  strokeWidth="1.2"
                />
                <text x={d.x} y={d.y + 4} textAnchor="middle" fill="#e0b866" fontSize="11" fontFamily="IBM Plex Mono, monospace">
                  {d.l}
                </text>
                <text
                  x={d.x}
                  y={d.y + (d.y > 300 ? 44 : d.y < 300 ? -32 : -32)}
                  textAnchor="middle"
                  fill="rgba(246,240,229,0.55)"
                  fontSize="10"
                  fontFamily="IBM Plex Mono, monospace"
                  letterSpacing="3"
                >
                  {d.label.toUpperCase()}
                </text>
              </g>
            ))}
            <circle cx="300" cy="300" r="26" fill="none" stroke="#e0b866" strokeWidth="1.2" />
            <circle cx="300" cy="300" r="3.5" fill="#e0b866" />
          </motion.svg>
        </div>

        {/* captions */}
        <div className="absolute bottom-[8vh] left-0 right-0 px-6">
          <Caption
            progress={smooth}
            range={[0, 0.3]}
            mono="II · The Epic"
            title="Three thousand years ago, a war of questions."
            sub="On the field of Kurukshetra, every leader was forced to choose — and the epic recorded what choosing costs."
          />
          <Caption
            progress={smooth}
            range={[0.36, 0.62]}
            mono="From epic to structure"
            title="The battlefield dissolves. The pattern remains."
            sub="Escalation, loyalty, truth, foresight — the dilemmas outlive the spears that asked them."
          />
          <Caption
            progress={smooth}
            range={[0.68, 1.0]}
            mono="III · The Problem"
            title="The battlefield has changed."
            sub="Today our battles are deadlines, audits, algorithms and term sheets. Keep scrolling into the modern arena."
          />
        </div>
      </div>
    </div>
  );
}

/* ============================ Battlefield map ============================ */

interface Marker {
  x: number;
  y: number;
  title: string;
  sub: string;
  episode: string;
  context: string;
  scenarioId: string;
}

const MARKERS: Marker[] = [
  { x: 16, y: 64, title: "Arjuna's Dilemma", sub: "The moment before action", episode: "Counsel at Kurukshetra", context: "At the field's edge, Arjuna's nerve fails — and he is taught steadiness before action.", scenarioId: "crisis-hour" },
  { x: 33, y: 36, title: "The Peace Mission", sub: "Mediation before escalation", episode: "Krishna's embassy to Hastinapura", context: "Before the armies met, peace was given its full, honest, visible attempt.", scenarioId: "two-teams-one-goal" },
  { x: 52, y: 57, title: "The Five Villages", sub: "The minimum just demand", episode: "The Pandavas' final offer", context: "A kingdom reduced to five villages — clarity calmly stated; refusal made public.", scenarioId: "five-villages" },
  { x: 69, y: 28, title: "Karna's Choice", sub: "Loyalty after the truth", episode: "Karna's revelation", context: "Told who he truly was on the eve of war, he stayed — and the epic priced it.", scenarioId: "mentors-mistake" },
  { x: 85, y: 59, title: "The Wheel Formation", sub: "Entry without exit", episode: "Abhimanyu & the Chakravyuha", context: "He knew the way into the spiral, not the way out. Design for reversibility.", scenarioId: "into-the-spiral" },
];

export function BattlefieldMap() {
  const { navigate } = useRouter();
  const [active, setActive] = useState<Marker | null>(null);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[32px] border border-amberglow/25 shadow-lift">
        <CinematicImage
          src={`${import.meta.env.BASE_URL}images/battlefield-panorama.jpg`}
          alt="Panoramic view of the armies arrayed at Kurukshetra"
          className="aspect-[16/10] sm:aspect-[21/9]"
          hoverZoom={false}
        />
        {/* markers */}
        {MARKERS.map((m) => {
          const on = active?.title === m.title;
          return (
            <button
              key={m.title}
              onClick={() => setActive(on ? null : m)}
              data-cursor="crosshair"
              aria-label={`${m.title} — ${m.sub}`}
              aria-expanded={on}
              className="focus-ring absolute"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <span className="relative flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                {!on && (
                  <span className="absolute inset-0 animate-pulse-ring rounded-full" aria-hidden="true" />
                )}
                <span
                  className={`h-3 w-3 rotate-45 border transition-all duration-400 ${
                    on
                      ? "scale-125 border-amberglow bg-gold shadow-glow"
                      : "border-amberglow bg-obsidian/70 hover:scale-110 hover:bg-gold/60"
                  }`}
                >
                  <span className="sr-only">{m.title}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* marker panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="glass-dark mt-5 rounded-3xl p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-amberglow" />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-amberglow">
                    {active.episode}
                  </span>
                  <button
                    onClick={() => setActive(null)}
                    aria-label="Close detail"
                    className="focus-ring rounded-full border border-white/15 p-1 text-ivory/50 transition hover:text-ivory"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <h4 className="mt-3 font-display text-3xl font-medium text-ivory">{active.title}</h4>
                <p className="mt-1 font-mono text-[10px] uppercase italic tracking-[0.16em] text-amberglow/80">
                  {active.sub}
                </p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-ivory/60">{active.context}</p>
              </div>
              <div className="shrink-0">
                <Btn
                  variant="gold"
                  arrow
                  onClick={() => navigate("simulator", { scenarioId: active.scenarioId })}
                >
                  Open the modern dilemma
                </Btn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================== Final CTA =============================== */

export function FinalCTA() {
  const { navigate } = useRouter();
  return (
    <section id="reflect" className="relative overflow-hidden bg-obsidian">
      <div
        className="absolute inset-0 bg-cover bg-[50%_75%] opacity-45"
        style={{ backgroundImage: "url(/images/kurukshetra-hero.jpg)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,155,75,0.14) 0%, transparent 55%), linear-gradient(to bottom, #0a0b0d 0%, rgba(10,11,13,0.35) 45%, rgba(10,11,13,0.9) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[10%] h-[380px] w-[380px] animate-spin-slower text-gold opacity-[0.07]"
      >
        <Chakra />
      </div>
      <div className="relative mx-auto flex min-h-[92vh] max-w-4xl flex-col items-center justify-center px-6 py-28 text-center">
        <Overline dark index="VI">Epilogue</Overline>
        <h2 className="mt-8 font-display font-medium leading-[1.04] text-ivory">
          <span className="block text-4xl sm:text-6xl lg:text-7xl">The epic ends.</span>
          <span className="mt-2 block text-4xl italic text-amberglow sm:text-6xl lg:text-7xl">
            The question remains.
          </span>
        </h2>
        <p className="mt-8 max-w-md font-display text-xl italic leading-relaxed text-ivory/60 sm:text-2xl">
          “What would you choose?”
        </p>
        <div className="mt-10">
          <Btn variant="gold" arrow onClick={() => navigate("library")}>
            Start another journey
          </Btn>
        </div>
        <p className="mt-14 font-mono text-[9px] uppercase tracking-[0.34em] text-ivory/30">
          Ancient wisdom stays. Modern decisions continue.
        </p>
      </div>
    </section>
  );
}
