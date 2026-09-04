import { motion } from "framer-motion";
import { ArrowUpRight, MousePointerClick, Scale, BookOpenText } from "lucide-react";
import { CATEGORIES } from "../data/catalog";
import { scenariosByCategory } from "../data";
import { useRouter } from "../state/store";
import { CATEGORY_ICONS } from "../components/CategoryGrid";
import { Reveal, SectionHead, Btn, EASE } from "../components/ui";

const HOW = [
  {
    icon: MousePointerClick,
    title: "Pick a category",
    desc: "Start from the pressure you actually feel — a feud, a launch, a negotiation, a silent room.",
  },
  {
    icon: Scale,
    title: "Face a real dilemma",
    desc: "Read the situation, the stakeholders, the constraints. Then choose, knowing every path costs something.",
  },
  {
    icon: BookOpenText,
    title: "Open the ancient lens",
    desc: "Consequences first, then the Mahabharata connection — insight, interpretation, and honest sources.",
  },
];

export default function Problems() {
  const { navigate } = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
      <SectionHead
        overline="Choose Your Problem"
        index="02"
        title={
          <>
            Where does it hurt —{" "}
            <em className="text-gold">precisely?</em>
          </>
        }
        sub="Eight territories of modern difficulty. Each opens onto scenarios built like case studies: situation, stakeholders, constraints, and four honest ways forward."
      />

      {/* How it works */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {HOW.map((h, i) => {
          const Icon = h.icon;
          return (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="flex h-full items-start gap-4 rounded-3xl border border-ink/8 bg-white/60 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-amberglow">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="font-display text-base font-semibold text-ink">
                    {h.title}
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-soft">{h.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Editorial category index */}
      <div className="mt-20 space-y-3">
        {CATEGORIES.map((c, i) => {
          const Icon = CATEGORY_ICONS[c.id];
          const scenarios = scenariosByCategory(c.id);
          return (
            <Reveal key={c.id} delay={i * 0.04}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group overflow-hidden rounded-3xl border border-ink/8 bg-white/60 shadow-soft transition-colors duration-500 hover:border-gold/40 hover:bg-white"
              >
                <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-5 lg:w-[380px] lg:shrink-0">
                    <span className="font-display text-4xl font-light text-ink/15 transition-colors duration-500 group-hover:text-gold/60">
                      {c.index}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        {c.title}
                      </h3>
                      <p className="text-[12px] font-medium italic text-gold">{c.tagline}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-soft">{c.description}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {scenarios.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => navigate("simulator", { scenarioId: s.id })}
                          className="focus-ring text-[12px] font-medium text-faint underline decoration-gold/0 underline-offset-4 transition-colors hover:text-ink hover:decoration-gold"
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
                      {scenarios.length} {scenarios.length === 1 ? "scenario" : "scenarios"}
                    </span>
                    <Btn
                      variant="ghost"
                      className="px-5 py-2.5 text-[13px]"
                      onClick={() => navigate("library", { filter: c.id })}
                    >
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </Btn>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-16 text-center">
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-faint">
          No scenario has an obvious correct answer by design. The goal is
          ethical reflection — seeing the full shape of a decision — not a
          right/wrong quiz.
        </p>
      </Reveal>
    </div>
  );
}
