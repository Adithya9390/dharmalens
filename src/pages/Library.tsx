import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Play,
  Eye,
  CheckCircle2,
  SearchX,
  Users,
  GitFork,
} from "lucide-react";
import type { CategoryId, Difficulty, Scenario } from "../types";
import { SCENARIOS } from "../data";
import { CATEGORIES, categoryTitle } from "../data/catalog";
import { useProfile, useRouter } from "../state/store";
import { CATEGORY_ICONS } from "../components/CategoryGrid";
import { Btn, Chip, DiffBadge, Modal, Reveal, SectionHead, EASE } from "../components/ui";

const DIFFS: ("All" | Difficulty)[] = ["All", "Foundational", "Intermediate", "Advanced"];

export default function Library() {
  const { route, navigate } = useRouter();
  const { isBookmarked, toggleBookmark, hasCompleted, notify } = useProfile();

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"all" | CategoryId>("all");
  const [diff, setDiff] = useState<(typeof DIFFS)[number]>("All");
  const [peek, setPeek] = useState<Scenario | null>(null);

  useEffect(() => {
    if (route.filter) setCat(route.filter as CategoryId);
  }, [route.filter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCENARIOS.filter((s) => {
      if (cat !== "all" && s.category !== cat) return false;
      if (diff !== "All" && s.difficulty !== diff) return false;
      if (!q) return true;
      const hay = `${s.title} ${s.modernProblem} ${s.mahabharata.episode} ${s.themes.join(" ")} ${categoryTitle(s.category)}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, cat, diff]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
      <SectionHead
        overline="Scenario Library"
        index="03"
        title={
          <>
            Every dilemma, <em className="text-gold">searchable.</em>
          </>
        }
        sub="Thirteen structured scenarios with documented Mahabharata lenses. Filter by territory, search by theme, bookmark what you want to return to."
      />

      {/* Controls */}
      <Reveal className="mt-12">
        <div className="glass rounded-3xl p-4 shadow-soft sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scenarios, themes, episodes…"
                aria-label="Search scenarios"
                className="focus-ring w-full rounded-2xl border border-ink/10 bg-white/80 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-faint"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="diff" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
                Difficulty
              </label>
              <select
                id="diff"
                value={diff}
                onChange={(e) => setDiff(e.target.value as (typeof DIFFS)[number])}
                className="focus-ring rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-sm text-ink"
              >
                {DIFFS.map((d) => (
                  <option key={d} value={d}>
                    {d === "All" ? "All levels" : d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Category filters">
            <FilterChip active={cat === "all"} onClick={() => setCat("all")} label={`All · ${SCENARIOS.length}`} />
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.id];
              const n = SCENARIOS.filter((s) => s.category === c.id).length;
              return (
                <FilterChip
                  key={c.id}
                  active={cat === c.id}
                  onClick={() => setCat(c.id)}
                  label={`${c.title} · ${n}`}
                  icon={<Icon className="h-3.5 w-3.5" />}
                />
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Results */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-faint">
          {filtered.length} {filtered.length === 1 ? "scenario" : "scenarios"}
        </span>
        {(query || cat !== "all" || diff !== "All") && (
          <button
            onClick={() => {
              setQuery("");
              setCat("all");
              setDiff("All");
            }}
            className="focus-ring text-[12px] font-semibold text-gold underline underline-offset-4 hover:text-ink"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-ink/15 bg-white/40 px-6 py-20 text-center">
          <SearchX className="h-8 w-8 text-faint" />
          <p className="mt-4 font-display text-xl text-ink">No scenarios match those filters</p>
          <p className="mt-2 max-w-sm text-sm text-soft">
            Try a broader term — or clear the filters to see the full library.
          </p>
          <div className="mt-6">
            <Btn variant="ghost" onClick={() => { setQuery(""); setCat("all"); setDiff("All"); }}>
              Clear filters
            </Btn>
          </div>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => (
              <ScenarioCard
                key={s.id}
                s={s}
                bookmarked={isBookmarked(s.id)}
                completed={hasCompleted(s.id)}
                onBookmark={() => {
                  toggleBookmark(s.id);
                  notify(isBookmarked(s.id) ? "Removed from saved insights" : "Saved to your insights");
                }}
                onPeek={() => setPeek(s)}
                onStart={() => navigate("simulator", { scenarioId: s.id })}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Peek modal */}
      <Modal open={!!peek} onClose={() => setPeek(null)} title={peek?.title}>
        {peek && (
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip gold>{categoryTitle(peek.category)}</Chip>
              <DiffBadge level={peek.difficulty} />
              {peek.themes.slice(0, 3).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <h3 className="mt-5 pr-8 font-display text-3xl font-semibold text-ink">{peek.title}</h3>
            <p className="mt-4 font-display text-lg italic leading-relaxed text-gold">
              “{peek.modernProblem}”
            </p>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              {peek.situation.split(". ").slice(0, 2).join(". ")}…
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Users, label: `${peek.stakeholders.length} stakeholders` },
                { icon: GitFork, label: `${peek.choices.length} decision paths` },
                { icon: Eye, label: peek.mahabharata.episode.split(" ").slice(0, 3).join(" ") + "…" },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="rounded-2xl border border-ink/8 bg-white/60 p-3">
                    <Icon className="mx-auto h-4 w-4 text-gold" />
                    <div className="mt-1.5 text-[11px] font-medium leading-tight text-soft">{m.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn
                variant="primary"
                arrow
                onClick={() => {
                  setPeek(null);
                  navigate("simulator", { scenarioId: peek.id });
                }}
              >
                Start scenario
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => {
                  toggleBookmark(peek.id);
                  notify(isBookmarked(peek.id) ? "Removed from saved insights" : "Saved to your insights");
                }}
              >
                {isBookmarked(peek.id) ? "Bookmarked" : "Save for later"}
              </Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all duration-300 ${
        active
          ? "border-navy bg-navy text-ivory shadow-soft"
          : "border-ink/10 bg-white/60 text-soft hover:border-gold/40 hover:text-ink"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ScenarioCard({
  s,
  bookmarked,
  completed,
  onBookmark,
  onPeek,
  onStart,
}: {
  s: Scenario;
  bookmarked: boolean;
  completed: boolean;
  onBookmark: () => void;
  onPeek: () => void;
  onStart: () => void;
}) {
  const Icon = CATEGORY_ICONS[s.category];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EASE }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white/70 p-6 shadow-soft transition-colors duration-500 hover:border-gold/40 hover:bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="flex items-center gap-2">
          {completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
              <CheckCircle2 className="h-3 w-3" /> Done
            </span>
          )}
          <button
            onClick={onBookmark}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark scenario"}
            aria-pressed={bookmarked}
            className={`focus-ring rounded-full border p-2 transition-all duration-300 ${
              bookmarked
                ? "border-gold/50 bg-gold/15 text-gold"
                : "border-ink/10 text-faint hover:border-gold/40 hover:text-gold"
            }`}
          >
            {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Chip gold>{categoryTitle(s.category)}</Chip>
        <DiffBadge level={s.difficulty} />
      </div>
      <h3 className="mt-3.5 font-display text-[22px] font-semibold leading-snug text-ink">
        {s.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-soft">
        {s.modernProblem}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {s.themes.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full bg-ink/5 px-2.5 py-1 text-[10.5px] font-medium text-soft">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 border-t border-ink/8 pt-4">
        <button
          onClick={onStart}
          className="focus-ring group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[13px] font-semibold text-ivory transition-all duration-300 hover:bg-ink"
        >
          <Play className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:scale-125" />
          Start
        </button>
        <button
          onClick={onPeek}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-ink/12 px-4 py-2.5 text-[13px] font-semibold text-soft transition-all duration-300 hover:border-gold/40 hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5" />
          Details
        </button>
      </div>
    </motion.article>
  );
}
