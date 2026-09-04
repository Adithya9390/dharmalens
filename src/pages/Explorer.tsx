import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ScrollText,
  LibraryBig,
  Tags,
  Compass,
  Search,
  ArrowRight,
  Play,
  type LucideIcon,
} from "lucide-react";
import {
  KB_CHARACTERS,
  KB_PARVAS,
  KB_THEMES,
  KB_PRINCIPLES,
} from "../data/knowledge";
import { SCENARIOS, getScenario } from "../data";
import { useRouter } from "../state/store";
import KnowledgeGraph from "../components/KnowledgeGraph";
import { Reveal, SectionHead, EASE } from "../components/ui";
import { Divider, GlowOrb } from "../components/fx";

type TabId = "characters" | "episodes" | "parvas" | "themes" | "principles";

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "characters", label: "Characters", icon: Users },
  { id: "episodes", label: "Episodes", icon: ScrollText },
  { id: "parvas", label: "Parvas", icon: LibraryBig },
  { id: "themes", label: "Themes", icon: Tags },
  { id: "principles", label: "Principles", icon: Compass },
];

export default function Explorer() {
  const [tab, setTab] = useState<TabId>("characters");
  const [query, setQuery] = useState("");
  const { navigate } = useRouter();

  const q = query.trim().toLowerCase();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
      <SectionHead
        overline="Knowledge Explorer"
        index="04"
        title={
          <>
            The epic, mapped as a <em className="text-gold">knowledge network.</em>
          </>
        }
        sub="Trace characters through episodes, conflicts, and insights to the modern problems they illuminate — then browse the full indexed atlas beneath."
      />

      {/* ------------------------- Knowledge graph ------------------------- */}
      <Reveal className="mt-14">
        <KnowledgeGraph />
      </Reveal>

      <div className="mt-20">
        <Divider label="THE ATLAS" />
      </div>

      {/* --------------------------- Browsing tabs ------------------------ */}
      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Knowledge sections">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  data-cursor
                  className={`focus-ring relative flex items-center gap-2 rounded-full px-4.5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    active ? "text-ivory" : "text-soft hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="explore-tab"
                      className="absolute inset-0 rounded-full border border-gold/40 bg-navy shadow-soft"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${tab}…`}
              aria-label={`Search ${tab}`}
              className="focus-ring w-56 rounded-full border border-ink/10 bg-white/70 py-2.5 pl-10 pr-4 font-mono text-[12px]"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-8"
          >
            {tab === "characters" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {KB_CHARACTERS.filter(
                  (c) => !q || `${c.name} ${c.epithet} ${c.bio}`.toLowerCase().includes(q)
                ).map((c) => (
                  <CardShell key={c.id} title={c.name} chip={c.epithet}>
                    <p className="mt-3 text-[13px] leading-relaxed text-soft">{c.bio}</p>
                    <ScenarioLinks ids={c.scenarioIds} onOpen={(id) => navigate("simulator", { scenarioId: id })} />
                  </CardShell>
                ))}
              </div>
            )}

            {tab === "episodes" && (
              <div className="grid gap-4 lg:grid-cols-2">
                {SCENARIOS.filter(
                  (s) =>
                    !q ||
                    `${s.mahabharata.episode} ${s.mahabharata.context} ${s.mahabharata.characters.join(" ")}`
                      .toLowerCase()
                      .includes(q)
                ).map((s) => (
                  <CardShell
                    key={s.id}
                    title={s.mahabharata.episode}
                    chip={s.mahabharata.source.parva.split(" (")[0]}
                  >
                    <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-soft">
                      {s.mahabharata.context}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.mahabharata.characters.map((c) => (
                        <span key={c} className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[9.5px] tracking-wide text-soft">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                        Lens for: {s.title}
                      </span>
                      <button
                        onClick={() => navigate("simulator", { scenarioId: s.id })}
                        className="focus-ring inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gold hover:text-ink"
                      >
                        <Play className="h-3.5 w-3.5" /> Open
                      </button>
                    </div>
                  </CardShell>
                ))}
              </div>
            )}

            {tab === "parvas" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {KB_PARVAS.filter((p) => !q || `${p.name} ${p.meaning} ${p.desc}`.toLowerCase().includes(q)).map(
                  (p) => (
                    <CardShell key={p.id} title={p.name} chip={`Parva ${p.index}`}>
                      <p className="mt-1 font-mono text-[10px] uppercase italic tracking-[0.14em] text-gold">{p.meaning}</p>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-soft">{p.desc}</p>
                      <ScenarioLinks ids={p.scenarioIds} onOpen={(id) => navigate("simulator", { scenarioId: id })} />
                    </CardShell>
                  )
                )}
              </div>
            )}

            {tab === "themes" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {KB_THEMES.filter((t) => !q || `${t.name} ${t.desc}`.toLowerCase().includes(q)).map((t) => (
                  <CardShell key={t.id} title={t.name} chip={`${t.scenarioIds.length} links`}>
                    <p className="mt-3 text-[13px] leading-relaxed text-soft">{t.desc}</p>
                    <ScenarioLinks ids={t.scenarioIds} onOpen={(id) => navigate("simulator", { scenarioId: id })} />
                  </CardShell>
                ))}
              </div>
            )}

            {tab === "principles" && (
              <div className="grid gap-4 md:grid-cols-2">
                {KB_PRINCIPLES.filter((p) => !q || `${p.name} ${p.desc}`.toLowerCase().includes(q)).map((p, i) => {
                  const s = getScenario(p.scenarioId);
                  return (
                    <CardShell key={p.id} title={p.name} chip={`Principle ${String(i + 1).padStart(2, "0")}`}>
                      <p className="mt-3 text-[13px] leading-relaxed text-soft">{p.desc}</p>
                      {s && (
                        <button
                          onClick={() => navigate("simulator", { scenarioId: s.id })}
                          className="focus-ring mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gold hover:text-ink"
                        >
                          Practise it in “{s.title}” <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </CardShell>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <GlowOrb className="pointer-events-none relative -z-10 mx-auto -mt-40" size={520} />
    </div>
  );
}

function CardShell({
  title,
  chip,
  children,
}: {
  title: string;
  chip: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group relative h-full overflow-hidden rounded-3xl border border-ink/8 bg-white/70 p-6 shadow-soft transition-colors duration-400 hover:border-gold/40 hover:bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink">{title}</h3>
        <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-gold">
          {chip}
        </span>
      </div>
      {children}
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
    </motion.div>
  );
}

function ScenarioLinks({ ids, onOpen }: { ids: string[]; onOpen: (id: string) => void }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/8 pt-3.5">
      {ids.map((id) => {
        const s = getScenario(id);
        if (!s) return null;
        return (
          <button
            key={id}
            onClick={() => onOpen(id)}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1.5 font-mono text-[10px] font-medium tracking-wide text-soft transition hover:border-gold/40 hover:text-ink"
          >
            {s.title}
            <ArrowRight className="h-3 w-3" />
          </button>
        );
      })}
    </div>
  );
}
