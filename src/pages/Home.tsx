import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ChevronDown, Play, X, ArrowRight, ShieldCheck } from "lucide-react";
import Particles from "../components/Particles";
import CategoryGrid from "../components/CategoryGrid";
import {
  LetterReveal,
  CinematicImage,
  GoldenThread,
  ScrollRail,
  Transformation,
  BattlefieldMap,
  FinalCTA,
} from "../components/cinematic";
import { Chakra, WordReveal, GlowOrb, Divider } from "../components/fx";
import { Btn, Reveal, SectionHead, Overline, EASE } from "../components/ui";
import { useRouter } from "../state/store";
import { ScrollText } from "lucide-react";

/* ------------------------------ Gallery data ---------------------------- */

interface Artwork {
  src: string;
  title: string;
  ep: string;
  ctx: string;
  theme: string;
  scenarioId: string;
  wide?: boolean;
}

const GALLERY: Artwork[] = [
  {
    src: "/images/kurukshetra-hero.jpg",
    title: "The Counsel of the Chariot",
    ep: "Krishna & Arjuna — the eve of Kurukshetra",
    ctx: "Paralysis at the moment of maximum stake. The answer given was not impulse but steadiness — govern the mind, then act from duty.",
    theme: "Steadiness",
    scenarioId: "crisis-hour",
    wide: true,
  },
  {
    src: "/images/epic-dice-hall.jpg",
    title: "The Dice Hall",
    ep: "Sabha Parva — the assembly of Hastinapura",
    ctx: "Escalation of commitment staged before a silent audience. The hall teaches twice: stop early, and let someone speak first.",
    theme: "Escalation & Silence",
    scenarioId: "sunk-ship",
  },
  {
    src: "/images/epic-bhishma.jpg",
    title: "Bhishma's Vigil",
    ep: "The bed of arrows — after the war",
    ctx: "The fallen guardian's closing counsel: vows serve order only while conscience accompanies them.",
    theme: "Vows & Duty",
    scenarioId: "mentors-mistake",
  },
  {
    src: "/images/epic-karna.jpg",
    title: "Karna of the Golden Armor",
    ep: "Generosity, loyalty, and the sunken wheel",
    ctx: "He gave away what made him invincible — knowingly. Boundaries are the adult form of the open hand.",
    theme: "Bounded Generosity",
    scenarioId: "open-the-armor",
  },
  {
    src: "/images/battlefield-panorama.jpg",
    title: "The Wheel Formation",
    ep: "The Chakravyuha — Drona Parva",
    ctx: "Brilliance at entry is not knowledge of exit. Commitments are judged by their reversibility.",
    theme: "Reversibility",
    scenarioId: "into-the-spiral",
  },
];

/* ================================ HERO =================================== */

function CinematicHero() {
  const { navigate } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20 });
  const sy = useSpring(my, { stiffness: 55, damping: 20 });
  const bgX = useTransform(sx, (v) => v * -16);
  const bgY = useTransform(sy, (v) => v * -10);
  const raysX = useTransform(sx, (v) => v * 26);
  const dustX = useTransform(sx, (v) => v * 40);
  const dustY = useTransform(sy, (v) => v * 26);
  const typeX = useTransform(sx, (v) => v * 7);
  const typeY = useTransform(sy, (v) => v * 5);

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] overflow-hidden bg-obsidian"
    >
      {/* opening black veil */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-40 bg-obsidian"
        aria-hidden="true"
      />

      {/* LAYER: battlefield artwork */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-6">
        <motion.div
          initial={{ opacity: 0, scale: 1.14, filter: "blur(14px) brightness(0.5)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
          transition={{ duration: 2.1, delay: 0.7, ease: EASE }}
          className="h-full w-full"
        >
          <img
            src="/images/kurukshetra-hero.jpg"
            alt="The chariot of Krishna and Arjuna on the battlefield of Kurukshetra at golden hour"
            className="h-full w-full scale-[1.03] object-cover object-[70%_center] sm:object-center"
          />
        </motion.div>
        {/* atmospheric grading */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,11,13,0.72) 0%, rgba(10,11,13,0.08) 30%, rgba(10,11,13,0.06) 55%, rgba(10,11,13,0.88) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* LAYER: god rays */}
      <motion.div
        style={{ x: raysX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.5 }}
        className="pointer-events-none absolute inset-[-10%]"
        aria-hidden="true"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "conic-gradient(from 200deg at 68% 22%, transparent 0deg, rgba(224,184,102,0.14) 8deg, transparent 16deg, transparent 30deg, rgba(224,184,102,0.09) 38deg, transparent 48deg)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* LAYER: dust particles */}
      <motion.div style={{ x: dustX, y: dustY }} className="absolute -inset-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.35 }}
          className="h-full w-full"
        >
          <Particles dark />
        </motion.div>
      </motion.div>

      {/* LAYER: typography */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pb-28 pt-32 text-center"
      >
        <motion.div style={{ x: typeX, y: typeY }}>
          <LetterReveal
            text="DHARMALENS"
            baseDelay={2.1}
            step={0.07}
            className="font-display text-3xl font-medium tracking-[0.3em] text-amberglow sm:text-4xl lg:text-5xl"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 2.85, ease: EASE }}
            className="mx-auto mt-6 h-px w-40 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden="true"
          />
          <h1 className="mt-7 font-display font-medium leading-[1.02] tracking-tight text-ivory">
            <WordReveal as="div" text="Ancient Wisdom." baseDelay={3.0} className="block text-[13vw] sm:text-7xl lg:text-[96px]" />
            <WordReveal as="div" text="Modern Decisions." baseDelay={3.3} className="block text-[13vw] italic text-amberglow sm:text-7xl lg:text-[96px]" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.7, ease: EASE }}
            className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-ivory/60"
          >
            Where an ancient epic meets the dilemmas of the modern world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.95, ease: EASE }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Btn
              variant="gold"
              arrow
              onClick={() => document.getElementById("epic")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="h-4 w-4" />
              Enter the journey
            </Btn>
            <Btn variant="ghostGold" arrow onClick={() => navigate("explorer")}>
              Explore the wisdom
            </Btn>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* museum caption */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.3, duration: 1 }}
        className="absolute bottom-8 left-6 z-10 hidden items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-gold/60" />
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ivory/40">
          The counsel of the chariot · eve of Kurukshetra
        </span>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-ivory/35">Scroll</span>
        <motion.span
          className="block h-8 w-px origin-top bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <ChevronDown className="h-3.5 w-3.5 text-gold/50" />
      </motion.div>
    </section>
  );
}

/* ============================ Epic gallery =============================== */

function EpicGallery() {
  const { navigate } = useRouter();
  const [open, setOpen] = useState<Artwork | null>(null);

  return (
    <section className="relative overflow-hidden bg-obsidian pb-24 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] animate-spin-slower text-gold opacity-[0.05]"
      >
        <Chakra />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          dark
          overline="The epic"
          index="II"
          title={
            <>
              Faces of the field,{" "}
              <em className="text-amberglow">verified by the text.</em>
            </>
          }
          sub="Each panel belongs to a documented episode — not a character poster. Open one, and it leads you to the modern dilemma that shares its structure."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {GALLERY.map((g, i) => (
            <div key={g.title} className={g.wide ? "md:col-span-2" : ""}>
              <button
                onClick={() => setOpen(g)}
                data-cursor="art"
                aria-label={`Open ${g.title}`}
                className="focus-ring relative block w-full text-left"
              >
                <CinematicImage
                  src={g.src}
                  alt={g.title}
                  delay={i * 0.12}
                  className={`${g.wide ? "aspect-[21/9]" : "aspect-[16/10]"} rounded-[26px] border border-white/10 shadow-lift`}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 rounded-b-[26px] bg-gradient-to-t from-obsidian/95 via-obsidian/40 to-transparent p-6 sm:p-7">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-amberglow">
                      {g.theme}
                    </div>
                    <div className="mt-1.5 font-display text-2xl font-medium text-ivory sm:text-3xl">
                      {g.title}
                    </div>
                    <div className="mt-1 font-mono text-[10px] tracking-wide text-ivory/45">
                      {g.ep}
                    </div>
                  </div>
                  <span className="hidden shrink-0 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amberglow sm:inline-flex">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* full-screen cinematic panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[92] bg-obsidian/92 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-4 overflow-hidden rounded-[30px] border border-amberglow/25 bg-navy shadow-lift sm:inset-8 lg:inset-14"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid h-full lg:grid-cols-[1.35fr_1fr]">
                <div className="relative h-56 sm:h-72 lg:h-full">
                  <img src={open.src} alt={open.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="relative flex flex-col justify-center overflow-y-auto p-7 sm:p-10">
                  <button
                    onClick={() => setOpen(null)}
                    aria-label="Close panel"
                    className="focus-ring absolute right-5 top-5 rounded-full border border-white/15 p-2 text-ivory/60 transition hover:border-amberglow/50 hover:text-ivory"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <Overline dark index="∘">{open.theme}</Overline>
                  <h3 className="mt-4 font-display text-4xl font-medium leading-tight text-ivory sm:text-5xl">
                    {open.title}
                  </h3>
                  <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-amberglow/80">
                    {open.ep}
                  </p>
                  <p className="mt-6 text-[14.5px] leading-[1.85] text-ivory/65">{open.ctx}</p>
                  <div className="mt-8">
                    <Btn
                      variant="gold"
                      arrow
                      onClick={() => {
                        setOpen(null);
                        navigate("simulator", { scenarioId: open.scenarioId });
                      }}
                    >
                      Face the modern dilemma
                    </Btn>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================================ PAGE ================================== */

export default function Home() {
  const { navigate } = useRouter();
  return (
    <div className="relative overflow-x-clip">
      <GoldenThread />
      <ScrollRail />

      {/* 01 — ENTER */}
      <CinematicHero />

      {/* 02 — THE EPIC (scroll morph scene) */}
      <div id="epic">
        <Transformation />
      </div>

      <EpicGallery />

      {/* The living map */}
      <section className="relative bg-obsidian pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            dark
            overline="The battlefield"
            index="III"
            title={
              <>
                A living map of <em className="text-amberglow">documented moments.</em>
              </>
            }
            sub="Five glowing positions on the field. Each opens its episode, its lesson, and the modern dilemma that inherits it."
          />
          <div className="mt-14">
            <BattlefieldMap />
          </div>
        </div>
      </section>

      {/* 03 — THE PROBLEM */}
      <section id="modern" className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url(/images/ancient-to-modern.jpg)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/60 to-ivory" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-amberglow">
                IV · The Problem
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl font-medium leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
                The battlefield <em className="text-amberglow">has changed.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/60">
                Today, our battles look different. No chariots — but audits,
                algorithms, alliances, and rooms that go silent. The questions
                are the same.
              </p>
            </Reveal>
          </div>

          <div className="mt-24">
            <SectionHead
              overline="Modern problems"
              index="∘"
              title={
                <>
                  Choose the ground{" "}
                  <em className="text-gold">you fight on.</em>
                </>
              }
            />
            <div className="mt-12">
              <CategoryGrid />
            </div>
          </div>
        </div>
      </section>

      {/* 04 — THE DECISION */}
      <section id="decision" className="relative overflow-hidden border-y border-amberglow/15 bg-navy">
        <GlowOrb className="-left-40 top-0" size={560} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-44 bottom-[-120px] h-[420px] w-[420px] animate-spin-slower text-gold opacity-[0.06]"
        >
          <Chakra />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHead
                dark
                overline="The decision"
                index="V"
                title={
                  <>
                    Step into the{" "}
                    <em className="text-amberglow">strategic chamber.</em>
                  </>
                }
                sub="Thirteen modern dilemmas, each with four honest paths. Choose — then watch consequences, ethics, and the ancient lens unfold around your decision."
              />
              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Btn variant="gold" arrow onClick={() => navigate("simulator", { scenarioId: "credit-where-due" })}>
                    Face the first dilemma
                  </Btn>
                  <Btn variant="ghostGold" arrow onClick={() => navigate("library")}>
                    Browse all scenarios
                  </Btn>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="manuscript relative rounded-[28px] p-8 sm:p-10">
                <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-amberglow/45" aria-hidden="true" />
                <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-amberglow/45" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-amberglow/45" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-amberglow/45" aria-hidden="true" />
                <Overline dark index="∘">Awaiting you inside</Overline>
                <p className="mt-5 font-display text-2xl italic leading-relaxed text-ivory/90 sm:text-[26px]">
                  “Your teammate has taken credit for your work in front of
                  leadership. What would you do?”
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Stay silent", "Confront publicly", "Private evidence", "Report immediately"].map((o) => (
                    <span key={o} className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ivory/55">
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — THE INSIGHT */}
      <section id="insight" className="parchment relative overflow-hidden border-y border-line">
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <ScrollText className="h-5 w-5 text-gold" />
                <Overline index="∘">The Ancient Lens</Overline>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Every decision reopens the{" "}
                <em className="text-gold">manuscript.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-soft">
                The episode, its characters and context, the underlying insight,
                the modern interpretation — and a structured, honest source
                reference. What the text says and what we make of it are never
                blurred.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Btn variant="primary" arrow onClick={() => navigate("simulator", { scenarioId: "necessary-half-truth" })}>
                  Open the lens in a scenario
                </Btn>
                <Btn variant="ghost" arrow onClick={() => navigate("sources")}>
                  <ShieldCheck className="h-4 w-4" />
                  Sources & references
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bg-obsidian py-4">
        <Divider dark label="REFLECT" />
      </div>

      {/* 06 — REFLECT */}
      <FinalCTA />
    </div>
  );
}
