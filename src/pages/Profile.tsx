import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import {
  BookOpenCheck,
  Layers,
  Trophy,
  Compass,
  Bookmark,
  Trash2,
  Info,
  ArrowRight,
  TrendingUp,
  NotebookText,
} from "lucide-react";
import { useProfile, useRouter, computeStats } from "../state/store";
import { getScenario } from "../data";
import { DIM_LABELS, DIM_ORDER, type DimKey } from "../types";
import { Btn, Reveal, SectionHead, Chip, EASE } from "../components/ui";
import { AnimatedNumber, ScoreBlocks } from "../components/fx";

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Profile() {
  const { completions, bookmarks, clearHistory, notify } = useProfile();
  const { navigate } = useRouter();
  const [confirmClear, setConfirmClear] = useState(false);

  const stats = useMemo(() => computeStats(completions), [completions]);

  const radarData = useMemo(() => {
    if (!stats) return [];
    const base = DIM_ORDER.map((k: DimKey) => ({
      dim: DIM_LABELS[k],
      value: stats.dims[k],
    }));
    return [...base, { dim: "Risk Awareness", value: stats.riskAwareness }];
  }, [stats]);

  const weakDims = useMemo(() => {
    if (!stats) return [];
    return [...DIM_ORDER].sort((a, b) => stats.dims[a] - stats.dims[b]).slice(0, 2);
  }, [stats]);

  if (!stats) {
    return (
      <div className="mx-auto max-w-4xl px-4 pb-28 pt-32 sm:px-6">
        <SectionHead
          overline="My Decision Profile"
          index="06"
          title={
            <>
              Your judgment, <em className="text-gold">made visible.</em>
            </>
          }
          sub="Complete decision scenarios and this dashboard will assemble your reflection profile — dimensions, styles, history and areas to consider — from your actual choices."
        />
        <Reveal className="mt-14">
          <div className="flex flex-col items-center rounded-[32px] border border-dashed border-ink/15 bg-white/50 px-8 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-amberglow">
              <Compass className="h-7 w-7" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
              No reflections recorded yet
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-soft">
              Your profile is built from completed scenarios — never from
              questionnaires. Face one dilemma to begin.
            </p>
            <div className="mt-8">
              <Btn variant="primary" arrow onClick={() => navigate("library")}>
                Start your first scenario
              </Btn>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          overline="My Decision Profile"
          index="06"
          title={
            <>
              Your judgment, <em className="text-gold">made visible.</em>
            </>
          }
        />
        <Reveal>
          {confirmClear ? (
            <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 p-3">
              <span className="text-[12px] font-medium text-soft">Erase all local history?</span>
              <Btn
                variant="primary"
                className="px-4 py-2 text-[12px]"
                onClick={() => {
                  clearHistory();
                  setConfirmClear(false);
                  notify("History cleared from this device");
                }}
              >
                Confirm
              </Btn>
              <button
                onClick={() => setConfirmClear(false)}
                className="focus-ring text-[12px] font-semibold text-faint hover:text-ink"
              >
                Cancel
              </button>
            </div>
          ) : (
            <Btn variant="ghost" onClick={() => setConfirmClear(true)}>
              <Trash2 className="h-4 w-4" /> Clear history
            </Btn>
          )}
        </Reveal>
      </div>

      {/* Disclaimer */}
      <Reveal className="mt-6">
        <p className="flex max-w-3xl items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold/8 p-4 text-[12.5px] leading-relaxed text-ink/75">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          These are interaction-based reflection indicators derived from the
          documented trade-offs of the paths you chose. They are not
          psychological assessments, personality diagnoses, or measures of
          morality — they exist to prompt reflection, not to grade you.
        </p>
      </Reveal>

      {/* Stat tiles */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: BookOpenCheck, label: "Reflections recorded", raw: stats.total, suffix: "" },
          { icon: Layers, label: "Scenarios explored", raw: stats.uniqueScenarios, suffix: " / 13" },
          { icon: Trophy, label: "Overall reflection score", raw: stats.overall, suffix: "%" },
        ].map((t, i) => {
          const Icon = t.icon;
          return (
            <Reveal key={t.label} delay={i * 0.07}>
              <div className="rounded-3xl border border-ink/8 bg-white/70 p-5 shadow-soft sm:p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/30 bg-navy text-amberglow">
                  <Icon className="h-4 w-4" />
                </span>
                <AnimatedNumber
                  value={t.raw}
                  suffix={t.suffix}
                  className="mt-4 block font-mono text-3xl font-semibold text-ink"
                />
                <div className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-faint">
                  {t.label}
                </div>
              </div>
            </Reveal>
          );
        })}
        <Reveal delay={0.28}>
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-5 shadow-soft sm:p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/30 bg-navy text-amberglow">
              <Compass className="h-4 w-4" />
            </span>
            <div className="mt-4 truncate font-display text-2xl font-semibold text-ink">
              {stats.styles[0]?.style ?? "—"}
            </div>
            <div className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-faint">
              Dominant style
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        {/* Radar */}
        <Reveal>
          <div className="h-full rounded-3xl border border-ink/8 bg-white/70 p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">Reflection dimensions</h3>
            <p className="mt-1 text-[12px] text-faint">
              Averaged across your completed paths (0–100)
            </p>
            <div className="mt-2 h-[320px] text-soft">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="currentColor" strokeOpacity={0.22} />
                  <PolarAngleAxis
                    dataKey="dim"
                    tick={{ fill: "currentColor", fontSize: 11, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="value"
                    stroke="#c7923e"
                    strokeWidth={2}
                    fill="#c7923e"
                    fillOpacity={0.32}
                    animationDuration={1200}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#151f2e",
                      border: "1px solid rgba(238,189,106,0.3)",
                      borderRadius: 12,
                      color: "#f4efe3",
                      fontSize: 12,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* Bars + styles */}
        <div className="space-y-5">
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-ink/8 bg-white/70 p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-xl font-semibold text-ink">Dimension detail</h3>
              <div className="mt-6 space-y-5">
                {DIM_ORDER.map((k, i) => (
                  <ScoreBlocks key={k} label={DIM_LABELS[k]} value={stats.dims[k]} delay={i * 0.1} />
                ))}
                <ScoreBlocks label="Risk Awareness" value={stats.riskAwareness} delay={0.5} />
              </div>
              <p className="mt-5 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                Risk Awareness = consequences × strategy × self-control, derived
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="rounded-3xl border border-ink/8 bg-white/70 p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-xl font-semibold text-ink">Most selected decision styles</h3>
              <div className="mt-5 space-y-3.5">
                {stats.styles.slice(0, 5).map((s, i) => {
                  const pct = Math.round((s.count / stats.total) * 100);
                  return (
                    <div key={s.style}>
                      <div className="mb-1 flex items-baseline justify-between text-[12px]">
                        <span className="font-semibold text-ink">{s.style}</span>
                        <span className="text-faint">
                          {s.count}× · {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-ink/8">
                        <motion.div
                          className="h-full rounded-full bg-navy"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-gold/30 bg-gold/8 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4.5 w-4.5 text-gold" />
                <h3 className="font-display text-xl font-semibold text-ink">Areas to consider</h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {weakDims.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink/80">
                    <span className="mt-[7px] h-1 w-3 rounded-full bg-gold" />
                    Your recent paths scored lowest on{" "}
                    <strong className="font-semibold">{DIM_LABELS[k]}</strong> — seek out one
                    scenario where that dimension carries the hardest trade-off.
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Btn variant="ghost" arrow className="px-5 py-2.5 text-[12.5px]" onClick={() => navigate("library")}>
                  Find a stretch scenario
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* History */}
        <Reveal>
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">Reflection history</h3>
            <div className="mt-5 space-y-3">
              {[...completions]
                .sort((a, b) => b.ts - a.ts)
                .slice(0, 8)
                .map((c, i) => {
                  const s = getScenario(c.scenarioId);
                  if (!s) return null;
                  return (
                    <motion.button
                      key={`${c.scenarioId}-${c.ts}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                      onClick={() => navigate("simulator", { scenarioId: c.scenarioId })}
                      className="focus-ring group flex w-full items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-white/60 p-4 text-left transition hover:border-gold/40"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-[15px] font-semibold text-ink">
                            {s.title}
                          </span>
                          <Chip gold>{c.style}</Chip>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-faint">
                          <span>{fmtDate(c.ts)}</span>
                          {c.note && (
                            <span className="inline-flex items-center gap-1">
                              · <NotebookText className="h-3 w-3" /> note saved
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold" />
                    </motion.button>
                  );
                })}
            </div>
          </div>
        </Reveal>

        {/* Saved insights */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-ink/8 bg-navy p-6 shadow-lift sm:p-8">
            <div className="flex items-center gap-3">
              <Bookmark className="h-4.5 w-4.5 text-amberglow" />
              <h3 className="font-display text-xl font-semibold text-ivory">Saved insights</h3>
            </div>
            {bookmarks.length === 0 ? (
              <p className="mt-4 text-[13px] leading-relaxed text-ivory/50">
                Bookmark scenarios from the library or save insights during
                reflection to build your collection.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {bookmarks.map((id) => {
                  const s = getScenario(id);
                  if (!s) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => navigate("simulator", { scenarioId: id })}
                      className="focus-ring group block w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-amberglow/40"
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amberglow/70">
                        {s.mahabharata.episode}
                      </div>
                      <div className="mt-1 font-display text-[15px] font-semibold text-ivory group-hover:text-amberglow">
                        {s.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
