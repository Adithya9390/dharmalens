import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Target,
  Tags,
  GitFork,
  ScrollText,
  Lightbulb,
  ListChecks,
  RotateCcw,
  Info,
  CheckCircle2,
  LoaderCircle,
  BrainCircuit,
  Compass,
  ScanSearch,
  Feather,
} from "lucide-react";
import { classify, SUGGESTED_PROMPTS, type AskResult } from "../ask/engine";
import { useRouter } from "../state/store";
import { Btn, Chip, Overline, Reveal, SectionHead, EASE } from "../components/ui";
import { Chakra } from "../components/fx";

const RITUAL: { icon: typeof BrainCircuit; label: string }[] = [
  { icon: ScanSearch, label: "Understanding problem" },
  { icon: Tags, label: "Finding themes" },
  { icon: Compass, label: "Examining insight" },
  { icon: Feather, label: "Forming reflection" },
];

export default function Ask() {
  const { navigate } = useRouter();
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [phase, setPhase] = useState(0);
  const [result, setResult] = useState<AskResult | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const analyze = (text?: string) => {
    const value = (text ?? input).trim();
    if (value.length < 4) return;
    setInput(value);
    setResult(null);
    setThinking(true);
    setPhase(0);
    const stepAt = 420;
    RITUAL.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setPhase(i), i * stepAt));
    });
    timers.current.push(
      window.setTimeout(() => {
        setResult(classify(value));
        setThinking(false);
      }, RITUAL.length * stepAt + 160)
    );
  };

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    setInput("");
    setResult(null);
    setThinking(false);
    setPhase(0);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-32 sm:px-6">
      <SectionHead
        overline="Ask DharmaLens"
        index="05"
        title={
          <>
            Describe the problem.{" "}
            <em className="text-gold">Receive a lens.</em>
          </>
        }
        sub="Write your situation in plain words. The engine classifies it, surfaces relevant themes and approaches, and connects it to a documented episode and its structured reflection."
      />

      {/* Transparency notice */}
      <Reveal className="mt-8">
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/8 p-4">
          <Cpu className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
          <p className="text-[12.5px] leading-relaxed text-ink/75">
            <strong className="font-semibold">Rule-based prototype:</strong> this
            chamber runs entirely on structured local scenario data using
            weighted keyword classification. No external AI service is called,
            and responses are assembled from verified scenario content rather
            than generated freely.
          </p>
        </div>
      </Reveal>

      {/* Consultation chamber */}
      <Reveal className="mt-8">
        <div className="relative overflow-hidden rounded-[32px] border border-amberglow/25 bg-navy p-6 shadow-lift sm:p-9">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-spin-slower text-gold opacity-[0.07]"
            aria-hidden="true"
          >
            <Chakra spokes={12} />
          </div>
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="ask-input"
                className="font-mono text-[10px] font-medium uppercase tracking-[0.34em] text-amberglow"
              >
                Consultation chamber
              </label>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/30">
                local engine · v1
              </span>
            </div>
            <textarea
              id="ask-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="Describe a modern problem you are facing…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) analyze();
              }}
              className="focus-ring mt-4 w-full resize-y rounded-2xl border border-amberglow/25 bg-white/5 p-5 font-mono text-[13.5px] leading-relaxed text-ivory placeholder:text-ivory/30 transition-shadow duration-300 focus:border-amberglow/60 focus:shadow-glow"
            />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ivory/30">
                Ctrl/⌘ + Enter to consult
              </span>
              <div className="flex items-center gap-3">
                {(result || input) && !thinking && (
                  <button
                    onClick={clear}
                    className="focus-ring inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ivory/40 transition hover:text-ivory"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Clear
                  </button>
                )}
                <Btn variant="gold" onClick={() => analyze()} disabled={input.trim().length < 4 || thinking}>
                  <Sparkles className="h-4 w-4" />
                  Analyze
                </Btn>
              </div>
            </div>

            {/* suggested prompts */}
            {!result && !thinking && (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => analyze(p)}
                    className="focus-ring rounded-full border border-white/10 px-4 py-2 text-left font-mono text-[10.5px] tracking-wide text-ivory/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-amberglow/50 hover:text-ivory"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* processing ritual */}
            <AnimatePresence>
              {thinking && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-7 border-t border-white/10 pt-6">
                    <div className="space-y-3.5">
                      {RITUAL.map((r, i) => {
                        const Icon = r.icon;
                        const done = i < phase;
                        const live = i === phase;
                        return (
                          <div key={r.label} className="flex items-center gap-4">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-400 ${
                                live
                                  ? "border-amberglow bg-amberglow/15 text-amberglow shadow-glow"
                                  : done
                                    ? "border-amberglow/40 text-amberglow"
                                    : "border-white/10 text-ivory/25"
                              }`}
                            >
                              {done ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : live ? (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                              ) : (
                                <Icon className="h-4 w-4" />
                              )}
                            </span>
                            <div className="flex-1">
                              <div
                                className={`font-mono text-[11px] uppercase tracking-[0.3em] transition-colors duration-400 ${
                                  live ? "text-amberglow" : done ? "text-ivory/70" : "text-ivory/25"
                                }`}
                              >
                                {r.label}
                              </div>
                              <motion.div
                                className="mt-1.5 h-px w-full bg-gradient-to-r from-gold/70 to-transparent"
                                initial={{ scaleX: 0, transformOrigin: "left" }}
                                animate={{ scaleX: done || live ? 1 : 0.08 }}
                                transition={{ duration: 0.42, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      {/* ------------------------------- Result ------------------------------- */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-12 space-y-6"
          >
            <ResultBlock index="01" icon={Target} title="Problem Identified" delay={0}>
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-2xl border border-gold/40 bg-navy px-5 py-3 font-display text-lg font-semibold text-ivory">
                  {result.categoryTitle}
                </span>
                <div className="min-w-[180px] flex-1">
                  <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    <span>Classification confidence</span>
                    <span className="font-semibold text-gold">{result.confidence}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/8">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-saffron"
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1, ease: EASE }}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-3 flex items-start gap-2 text-[12px] leading-relaxed text-faint">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {result.lowConfidence
                  ? "Low keyword overlap — this is the closest structural match. Refine your description with more specifics for a sharper classification."
                  : `Matched from your description against the local scenario base. Closest scenario: “${result.scenario.title}”.`}
              </p>
            </ResultBlock>

            <ResultBlock index="02" icon={Tags} title="Relevant Themes" delay={0.08}>
              <div className="flex flex-wrap gap-2">
                {result.themes.map((t) => (
                  <Chip key={t} gold>
                    {t}
                  </Chip>
                ))}
              </div>
            </ResultBlock>

            <ResultBlock index="03" icon={GitFork} title="Possible Approaches" delay={0.16}>
              <p className="mb-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                Drawn from the matched scenario's documented trade-offs — none prescribed
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.approaches.map((a, i) => (
                  <motion.div
                    key={a.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease: EASE }}
                    className="rounded-2xl border border-ink/8 bg-white/70 p-4"
                  >
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-gold">
                      {a.style}
                    </span>
                    <div className="mt-1 text-sm font-semibold text-ink">{a.label}</div>
                    <p className="mt-1 text-[12px] leading-relaxed text-soft">{a.summary}</p>
                  </motion.div>
                ))}
              </div>
            </ResultBlock>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              className="manuscript overflow-hidden rounded-3xl p-7 shadow-lift sm:p-9"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amberglow/40 bg-amberglow/10 text-amberglow">
                  <ScrollText className="h-4.5 w-4.5" />
                </span>
                <Overline dark index="04">Mahabharata Connection</Overline>
              </div>
              <div className="mt-5 font-display text-[26px] font-medium leading-tight text-amberglow sm:text-3xl">
                {result.episode}
              </div>
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-4.5 w-4.5 text-amberglow" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-amberglow">
                    Key Insight
                  </span>
                </div>
                <p className="mt-3 font-display text-xl leading-relaxed text-ivory/90">
                  “{result.insight}”
                </p>
                <p className="mt-4 border-l-2 border-amberglow/50 pl-4 text-[13px] leading-relaxed text-ivory/60">
                  {result.modernApplication}
                </p>
              </div>
            </motion.div>

            <ResultBlock index="05" icon={ListChecks} title="Reflection Questions" delay={0.4}>
              <ol className="space-y-3">
                {result.reflectionQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/5 font-mono text-[10px] font-semibold text-gold">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[14px] leading-relaxed text-ink/85">{q}</span>
                  </li>
                ))}
              </ol>
            </ResultBlock>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Btn
                variant="primary"
                arrow
                onClick={() => navigate("simulator", { scenarioId: result.scenario.id })}
              >
                Open the full scenario
              </Btn>
              <Btn variant="ghost" onClick={clear}>
                Ask another problem
              </Btn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Reveal className="mt-16">
        <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-faint">
          This prototype does not diagnose situations or people. Classification
          is a guidepost, not a verdict — work through the matched scenario in
          the simulator for the full analysis and sources.
        </p>
      </Reveal>
    </div>
  );
}

function ResultBlock({
  index,
  icon: Icon,
  title,
  delay,
  children,
}: {
  index: string;
  icon: typeof Target;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft"
      aria-label={title}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-amberglow">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <Overline index={index}>{title}</Overline>
      </div>
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}
