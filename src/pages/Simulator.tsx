import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Scale,
  BarChart3,
  ScrollText,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Users,
  TrendingUp,
  ChevronDown,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  ExternalLink,
  Trophy,
  Info,
  Lock,
  type LucideIcon,
} from "lucide-react";
import type { Scenario, Choice } from "../types";
import { DIM_LABELS, DIM_ORDER } from "../types";
import { SCENARIOS, getScenario } from "../data";
import { categoryTitle } from "../data/catalog";
import { useProfile, useRouter } from "../state/store";
import { Btn, Chip, DiffBadge, Overline, ScoreBar, EASE } from "../components/ui";
import { SegMeter, Chakra } from "../components/fx";

const STAGES: { label: string; icon: LucideIcon }[] = [
  { label: "Problem", icon: ClipboardList },
  { label: "Decision", icon: Scale },
  { label: "Analysis", icon: BarChart3 },
  { label: "Connection", icon: ScrollText },
  { label: "Reflection", icon: Lightbulb },
];

export default function Simulator() {
  const { route, navigate } = useRouter();
  const { addCompletion, toggleBookmark, isBookmarked, notify } = useProfile();
  const scenario = route.scenarioId ? getScenario(route.scenarioId) : undefined;

  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [committed, setCommitted] = useState<Choice | null>(null);
  const [srcOpen, setSrcOpen] = useState(false);
  const [note, setNote] = useState("");
  const [completedRun, setCompletedRun] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const goStep = (n: number) => {
    setStep(n);
    setMaxStep((m) => Math.max(m, n));
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const reset = () => {
    setStep(0);
    setMaxStep(0);
    setSelectedId(null);
    setCommitted(null);
    setSrcOpen(false);
    setNote("");
    setCompletedRun(false);
    goStep(0);
  };

  const bookmarked = scenario ? isBookmarked(scenario.id) : false;
  const progress = useMemo(() => (step / (STAGES.length - 1)) * 100, [step]);
  const scenarioIndex = scenario
    ? SCENARIOS.findIndex((s) => s.id === scenario.id) + 1
    : 0;

  if (!scenario) {
    return (
      <div className="mx-auto max-w-4xl px-4 pb-28 pt-32 sm:px-6">
        <Overline index="∘">Decision Simulator</Overline>
        <h1 className="mt-5 font-display text-4xl font-medium text-ink">Choose a scenario to enter</h1>
        <p className="mt-4 text-soft">Each scenario runs the full engine: problem, decision, consequence analysis, the ancient lens, and guided reflection.</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate("simulator", { scenarioId: s.id })}
              className="focus-ring group flex items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-white/65 p-5 text-left shadow-soft transition hover:border-gold/40 hover:bg-white"
            >
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {categoryTitle(s.category)}
                </span>
                <span className="mt-1 block font-display text-lg font-semibold text-ink">{s.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  const completeScenario = () => {
    if (!committed || completedRun) return;
    addCompletion({
      scenarioId: scenario.id,
      choiceId: committed.id,
      style: committed.style,
      scores: committed.analysis.scores,
      ts: Date.now(),
      note: note.trim() || undefined,
    });
    if (!bookmarked) toggleBookmark(scenario.id);
    setCompletedRun(true);
    setShowDone(true);
  };

  return (
    <div className="pb-28 pt-24 lg:pt-28">
      {/* ------------------------- Journey rail ------------------------- */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Scenario {String(scenarioIndex).padStart(2, "0")} / {SCENARIOS.length}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
            {categoryTitle(scenario.category)}
          </span>
        </div>
        <div className="glass rounded-3xl p-4 shadow-soft sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3 overflow-x-auto">
              {STAGES.map((s, i) => {
                const Icon = s.icon;
                const reached = i <= maxStep;
                const current = i === step;
                return (
                  <div key={s.label} className="flex items-center">
                    <button
                      onClick={() => reached && goStep(i)}
                      disabled={!reached}
                      aria-current={current ? "step" : undefined}
                      className={`focus-ring flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                        current
                          ? "border border-gold/50 bg-navy text-ivory shadow-soft"
                          : reached
                            ? "text-ink hover:bg-gold/10"
                            : "cursor-not-allowed text-faint/60"
                      }`}
                    >
                      {reached ? <Icon className="h-3.5 w-3.5" /> : <Lock className="h-3 w-3" />}
                      <span className="hidden sm:inline">{s.label}</span>
                      <span className="font-mono text-[9px] opacity-60">{`0${i + 1}`}</span>
                    </button>
                    {i < STAGES.length - 1 && <span className="mx-1 h-px w-3 bg-line sm:w-5" />}
                  </div>
                );
              })}
            </div>
            <button
              onClick={reset}
              className="focus-ring flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 px-3 py-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-faint transition hover:border-gold/40 hover:text-ink"
              aria-label="Restart scenario"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
          <div className="mt-3.5 flex items-center gap-3">
            <SegMeter value={Math.max(0.04, progress / 100)} segments={28} className="flex-1" />
            <span className="shrink-0 font-mono text-[10px] font-semibold tabular-nums text-gold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* --------------------------- Stage body -------------------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${scenario.id}-${step}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {step === 0 && (
            <StageProblem scenario={scenario} onNext={() => goStep(1)} />
          )}
          {step === 1 && (
            <StageDecision
              scenario={scenario}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onBack={() => goStep(0)}
              onCommit={(c) => {
                setCommitted(c);
                goStep(2);
              }}
            />
          )}
          {step === 2 && committed && (
            <StageAnalysis
              choice={committed}
              onBack={() => goStep(1)}
              onNext={() => goStep(3)}
            />
          )}
          {step === 3 && (
            <StageLens
              scenario={scenario}
              srcOpen={srcOpen}
              setSrcOpen={setSrcOpen}
              onBack={() => (committed ? goStep(2) : goStep(0))}
              onNext={() => goStep(4)}
            />
          )}
          {step === 4 && (
            <StageReflection
              scenario={scenario}
              committed={committed}
              note={note}
              setNote={setNote}
              completedRun={completedRun}
              bookmarked={bookmarked}
              onToggleBookmark={() => {
                toggleBookmark(scenario.id);
                notify(bookmarked ? "Removed from saved insights" : "Insight saved to your library");
              }}
              onComplete={completeScenario}
              onAgain={reset}
              onAnother={() => navigate("library")}
              onProfile={() => navigate("profile")}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ----------------------- Completion overlay ---------------------- */}
      <AnimatePresence>
        {showDone && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-navy/70 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative w-full max-w-md rounded-[32px] border border-amberglow/30 bg-navy p-10 text-center shadow-lift"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-amberglow/60 bg-amberglow/10"
              >
                <Trophy className="h-8 w-8 text-amberglow" />
              </motion.div>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-24 h-20 w-20 -translate-x-1/2 rounded-full border border-amberglow/50"
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ delay: 0.35, duration: 1.2, ease: "easeOut", repeat: 2, repeatDelay: 0.4 }}
              />
              <h3 className="mt-6 font-display text-3xl font-medium text-ivory">
                Reflection recorded
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">
                “{scenario.title}” — you chose the{" "}
                <span className="text-amberglow">{committed?.style.toLowerCase()}</span> path. Your
                decision profile has been updated.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Btn
                  variant="gold"
                  arrow
                  onClick={() => {
                    setShowDone(false);
                    navigate("profile");
                  }}
                >
                  View my decision profile
                </Btn>
                <Btn variant="ghostGold" onClick={() => setShowDone(false)}>
                  Stay with this scenario
                </Btn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================ STAGE 1: PROBLEM ========================== */

function StageProblem({ scenario, onNext }: { scenario: Scenario; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        <Chip gold>{categoryTitle(scenario.category)}</Chip>
        <DiffBadge level={scenario.difficulty} />
        {scenario.themes.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-6xl">
        {scenario.title}
      </h1>
      <p className="mt-6 max-w-3xl border-l-2 border-gold pl-5 font-display text-xl italic leading-relaxed text-ink/80 sm:text-2xl">
        “{scenario.modernProblem}”
      </p>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft sm:p-9">
            <Overline index="01">The Situation</Overline>
            <p className="mt-5 text-[15px] leading-[1.85] text-soft">{scenario.situation}</p>
            <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/8 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Context</div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/80">{scenario.context}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft sm:p-9">
            <Overline index="02">Constraints</Overline>
            <ul className="mt-5 space-y-3">
              {scenario.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm leading-relaxed text-soft">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-ink/8 bg-navy p-7 shadow-lift sm:p-8 lg:sticky lg:top-28 lg:self-start">
          <Overline dark index="03">Stakeholders</Overline>
          <div className="mt-6 space-y-4">
            {scenario.stakeholders.map((st, i) => (
              <motion.div
                key={st.name}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.45, ease: EASE }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-ivory">{st.name}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-amberglow/80">
                    {st.role}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ivory/55">{st.interest}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-7 border-t border-white/10 pt-6">
            <Btn variant="gold" arrow className="w-full" onClick={onNext}>
              Face the decision
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================== STAGE 2: DECISION ========================== */

function StageDecision({
  scenario,
  selectedId,
  onSelect,
  onBack,
  onCommit,
}: {
  scenario: Scenario;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onCommit: (c: Choice) => void;
}) {
  const selected = scenario.choices.find((c) => c.id === selectedId) ?? null;
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
      <Overline index="02">The Decision</Overline>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
        {scenario.coreTension}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        Four honest paths. None is labelled correct — each carries benefits,
        risks, and an ethical shape. Choose the one you would actually defend.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <span className="gold-rule w-8" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
          {selected ? `Path ${selected.id} selected` : "Choose one path"}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2" role="radiogroup" aria-label="Decision choices">
        {scenario.choices.map((c, i) => {
          const isSel = selectedId === c.id;
          const dimmed = !!selectedId && !isSel;
          return (
            <motion.button
              key={c.id}
              role="radio"
              aria-checked={isSel}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: dimmed ? 0.42 : 1, y: 0, scale: dimmed ? 0.985 : 1 }}
              transition={{ delay: selectedId ? 0 : i * 0.07, duration: 0.5, ease: EASE, layout: { duration: 0.55, ease: EASE } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(c.id)}
              data-cursor
              className={`focus-ring group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-400 sm:p-7 ${
                isSel
                  ? "border-gold/70 bg-white shadow-glow md:col-span-2"
                  : "border-ink/8 bg-white/60 shadow-soft hover:border-gold/35 hover:bg-white"
              }`}
            >
              {isSel && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 55% at 30% 20%, rgba(200,155,75,0.20) 0%, transparent 65%)",
                  }}
                />
              )}
              {isSel && (
                <motion.span
                  layoutId="choice-ring"
                  className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-saffron"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-base font-semibold transition-colors duration-300 ${
                    isSel ? "border-saffron bg-saffron text-navy" : "border-ink/15 text-soft group-hover:border-gold/40 group-hover:text-gold"
                  }`}
                >
                  {c.id.toUpperCase()}
                </span>
                <motion.span
                  animate={isSel ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-saffron"
                >
                  <CheckCircle2 className="h-6 w-6" />
                </motion.span>
              </div>
              <h3 className={`mt-4 font-display text-xl font-semibold transition-colors duration-300 ${isSel ? "text-ink" : "text-ink/85"}`}>
                {c.label}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-soft">{c.summary}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <Btn variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Back to context
        </Btn>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {!selected && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] font-medium text-faint"
              >
                Select a path to continue
              </motion.span>
            )}
          </AnimatePresence>
          <Btn
            variant={selected ? "gold" : "primary"}
            arrow
            disabled={!selected}
            className={selected ? "animate-pulse-ring" : ""}
            onClick={() => selected && onCommit(selected)}
          >
            Commit to this choice
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* =========================== STAGE 3: ANALYSIS ========================== */

function SeqLink({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="my-8 flex flex-col items-center gap-2.5"
      aria-hidden="true"
    >
      <span className={`h-7 w-px bg-gradient-to-b from-transparent ${dark ? "via-amberglow/60 to-amberglow" : "via-gold/60 to-gold"}`} />
      <span className={`font-mono text-[9px] uppercase tracking-[0.42em] ${dark ? "text-amberglow" : "text-gold"}`}>
        {label}
      </span>
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className={`h-4 w-4 ${dark ? "text-amberglow" : "text-gold"}`} />
      </motion.span>
    </motion.div>
  );
}

function StageAnalysis({
  choice,
  onBack,
  onNext,
}: {
  choice: Choice;
  onBack: () => void;
  onNext: () => void;
}) {
  const a = choice.analysis;
  const overall = Math.round(
    (DIM_ORDER.reduce((s, k) => s + a.scores[k], 0) / (DIM_ORDER.length * 10)) * 100
  );

  const panels: { icon: LucideIcon; title: string; items: string[]; tone: string }[] = [
    { icon: CheckCircle2, title: "Potential Benefits", items: a.benefits, tone: "text-emerald-700" },
    { icon: AlertTriangle, title: "Potential Risks", items: a.risks, tone: "text-saffron" },
    { icon: Scale, title: "Ethical Considerations", items: a.ethical, tone: "text-gold" },
    { icon: TrendingUp, title: "Long-Term Consequences", items: a.longTerm, tone: "text-navy" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-white to-cream/60 p-7 shadow-soft sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Overline index="03">Your Choice</Overline>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {choice.label}
            </h2>
          </div>
          <div className="rounded-2xl border border-navy/15 bg-navy px-5 py-3 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amberglow">Decision style</div>
            <div className="font-display text-xl font-semibold text-ivory">{choice.style}</div>
          </div>
        </div>
        <p className="mt-5 max-w-3xl font-display text-lg italic leading-relaxed text-ink/75">
          {a.closing}
        </p>
      </div>

      <SeqLink label="Potential impact" />

      <div className="grid gap-5 md:grid-cols-2">
        {panels.map((p, pi) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + pi * 0.08, duration: 0.5, ease: EASE }}
              className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5 ${p.tone}`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {p.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[9px] h-1 w-4 shrink-0 rounded-full bg-gold/50" />
                    <span className="text-[13.5px] leading-relaxed text-soft">{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}

        {/* Stakeholder impact */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.5, ease: EASE }}
          className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5 text-navy">
              <Users className="h-4.5 w-4.5" />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink">Stakeholder Impact</h3>
          </div>
          <div className="mt-4 space-y-3">
            {a.stakeholderImpact.map((s) => (
              <div key={s.name} className="rounded-2xl border border-ink/8 bg-white/70 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{s.name}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-soft">{s.effect}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reflection score */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
          className="rounded-3xl border border-amberglow/30 bg-navy p-7 shadow-lift"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-amberglow">
                <BarChart3 className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ivory">Reflection Score</h3>
            </div>
            <div className="relative h-14 w-14">
              <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
                <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#dd9430"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 24}
                  initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - overall / 100) }}
                  transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-amberglow">
                {overall}
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {DIM_ORDER.map((k, i) => (
              <ScoreBar key={k} dark label={DIM_LABELS[k]} value={a.scores[k]} delay={0.3 + i * 0.1} />
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-ivory/45">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            A reflection aid, not a moral verdict. Scores describe the documented
            shape of this path — they are not an objective measurement of
            morality, and no path here is declared “correct”.
          </p>
        </motion.div>
      </div>

      <SeqLink label="The ancient lens" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Btn variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Reconsider the decision
        </Btn>
        <Btn variant="primary" arrow onClick={onNext}>
          Open the Ancient Lens
        </Btn>
      </div>
    </div>
  );
}

/* ========================= STAGE 4: ANCIENT LENS ======================== */

function StageLens({
  scenario,
  srcOpen,
  setSrcOpen,
  onBack,
  onNext,
}: {
  scenario: Scenario;
  srcOpen: boolean;
  setSrcOpen: (b: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const m = scenario.mahabharata;
  return (
    <div className="pt-10">
      <div className="relative overflow-hidden bg-navy">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/images/lens-dark.jpg)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/85 to-navy" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <div
            className="pointer-events-none absolute -right-36 top-8 h-[420px] w-[420px] animate-spin-slower text-gold opacity-[0.08]"
            aria-hidden="true"
          >
            <Chakra />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-4"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amberglow/40 bg-amberglow/10">
              <ScrollText className="h-5 w-5 text-amberglow" />
            </span>
            <div>
              <Overline dark index="04">The Ancient Lens</Overline>
              <h2 className="mt-1 font-display text-3xl font-medium text-ivory sm:text-4xl">
                {m.episode}
              </h2>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-2">
            {m.characters.map((c) => (
              <span
                key={c}
                className="rounded-full border border-amberglow/30 bg-amberglow/10 px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide text-amberglow"
              >
                {c}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ clipPath: "inset(16% 8% 16% 8% round 28px)", opacity: 0.5 }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.1, ease: EASE }}
            className="manuscript relative mt-10 rounded-[28px] p-5 sm:p-9"
          >
            {/* manuscript corner marks */}
            <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-amberglow/45" aria-hidden="true" />
            <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-amberglow/45" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-amberglow/45" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-amberglow/45" aria-hidden="true" />

          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              className="space-y-6"
            >
              <div className="glass-dark rounded-3xl p-7 sm:p-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amberglow">
                  Context
                </div>
                <p className="mt-4 text-[14.5px] leading-[1.85] text-ivory/75">{m.context}</p>
              </div>
              <div className="glass-dark rounded-3xl p-7 sm:p-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amberglow">
                  Underlying Insight
                </div>
                <p className="mt-4 font-display text-xl leading-relaxed text-ivory sm:text-[22px]">
                  “{m.insight}”
                </p>
              </div>
              <div className="rounded-3xl border border-amberglow/40 bg-amberglow/10 p-7 sm:p-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amberglow">
                  Modern Interpretation
                </div>
                <p className="mt-4 text-[14.5px] leading-[1.85] text-ivory/85">{m.modernApplication}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6, ease: EASE }}
              className="space-y-4"
            >
              <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/5">
                <button
                  onClick={() => setSrcOpen(!srcOpen)}
                  aria-expanded={srcOpen}
                  className="focus-ring flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amberglow">
                      Source / Reference
                    </div>
                    <div className="mt-1.5 font-display text-lg font-semibold text-ivory">
                      {m.source.title}
                    </div>
                    <div className="mt-1 text-[12px] text-ivory/50">{m.source.parva}</div>
                  </div>
                  <motion.span
                    animate={{ rotate: srcOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 rounded-full border border-amberglow/40 p-2 text-amberglow"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {srcOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <dl className="space-y-3 border-t border-white/10 p-6">
                        {[
                          ["Parva", m.source.parva],
                          ["Section / Chapter", m.source.section],
                          ["Episode", m.source.episode],
                          ["Translation / Edition", m.source.translation],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amberglow/70">{k}</dt>
                            <dd className="mt-0.5 text-[13px] leading-relaxed text-ivory/75">{v}</dd>
                          </div>
                        ))}
                        {m.source.url && (
                          <a
                            href={m.source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="focus-ring inline-flex items-center gap-1.5 pt-1 text-[12.5px] font-semibold text-amberglow underline-offset-4 hover:underline"
                          >
                            Read the translation <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <p className="border-t border-white/10 pt-3 text-[11px] italic leading-relaxed text-ivory/45">
                          {m.source.note}
                        </p>
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-[11.5px] leading-relaxed text-ivory/55">
                  Interpretation boundary: the left column is a faithful summary
                  of a documented episode; the modern application beneath it is
                  DharmaLens's contemporary framing — not a quotation, and not
                  presented as the definitive meaning of the text.
                </p>
              </div>

              <div className="rounded-3xl border border-amberglow/25 bg-gradient-to-br from-amberglow/15 to-transparent p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amberglow">
                  Core tension, mapped
                </div>
                <p className="mt-3 font-display text-lg leading-snug text-ivory">
                  {scenario.coreTension}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[12px] text-ivory/50">
                  <span>{m.episode}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-amberglow" />
                  <span>{scenario.title}</span>
                </div>
              </div>
            </motion.div>
          </div>
          </motion.div>

          <SeqLink dark label="Reflection" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Btn variant="ghostGold" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" /> Back to analysis
            </Btn>
            <Btn variant="gold" arrow onClick={onNext}>
              Continue to reflection
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= STAGE 5: REFLECTION ========================== */

function StageReflection({
  scenario,
  committed,
  note,
  setNote,
  completedRun,
  bookmarked,
  onToggleBookmark,
  onComplete,
  onAgain,
  onAnother,
  onProfile,
}: {
  scenario: Scenario;
  committed: Choice | null;
  note: string;
  setNote: (s: string) => void;
  completedRun: boolean;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  onComplete: () => void;
  onAgain: () => void;
  onAnother: () => void;
  onProfile: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Overline index="05">Reflection</Overline>
      <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
        Make the insight <em className="text-gold">yours.</em>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        Three questions sit between reading and judgment. Answer them honestly —
        only for yourself.
      </p>

      <div className="mt-10 space-y-4">
        {scenario.reflectionQuestions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.09, duration: 0.5, ease: EASE }}
            className="flex items-start gap-4 rounded-3xl border border-ink/8 bg-white/70 p-6 shadow-soft"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-semibold text-amberglow">
              {i + 1}
            </span>
            <p className="pt-1.5 text-[14.5px] font-medium leading-relaxed text-ink/85">{q}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft">
        <label htmlFor="reflection-note" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          Your note (optional, saved privately on this device)
        </label>
        <textarea
          id="reflection-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="What will you actually do differently — and where is your line?"
          className="focus-ring mt-3 w-full resize-y rounded-2xl border border-ink/10 bg-white/80 p-4 text-sm leading-relaxed text-ink placeholder:text-faint"
        />
      </div>

      {!completedRun ? (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Btn variant="gold" arrow onClick={onComplete} disabled={!committed}>
            <CheckCircle2 className="h-4 w-4" />
            Complete this reflection
          </Btn>
          <Btn variant="ghost" onClick={onToggleBookmark}>
            {bookmarked ? <BookmarkCheck className="h-4 w-4 text-gold" /> : <Bookmark className="h-4 w-4" />}
            {bookmarked ? "Insight saved" : "Save this insight"}
          </Btn>
          {!committed && (
            <span className="text-[12px] text-faint">
              Commit to a choice in stage 02 to complete.
            </span>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 rounded-3xl border border-emerald-700/25 bg-emerald-700/8 p-7"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            <span className="font-display text-lg font-semibold text-ink">
              Recorded to your decision profile
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-soft">
            You can replay this scenario with a different path, start another
            dilemma, or review how your reflection dimensions are trending.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Btn variant="primary" arrow onClick={onProfile}>My decision profile</Btn>
            <Btn variant="ghost" onClick={onAgain}>
              <RotateCcw className="h-4 w-4" /> Try another path
            </Btn>
            <Btn variant="ghost" arrow onClick={onAnother}>New scenario</Btn>
          </div>
        </motion.div>
      )}
    </div>
  );
}
