import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useRouter } from "../state/store";
import { getScenario } from "../data";
import { EASE } from "./ui";

type Col = 0 | 1 | 2 | 3 | 4;

interface GNode {
  id: string;
  col: Col;
  label: string;
  desc: string;
  scenarioIds: string[];
}

const COLS = ["Character", "Episode", "Conflict", "Insight", "Modern Problem"];
const XS = [110, 420, 730, 1050, 1380];
const W = 1500;
const H = 640;

const NODES: GNode[] = [
  // Characters
  { id: "krishna", col: 0, label: "Krishna", desc: "Envoy and counsel — carries the peace mission, steadies Arjuna at the field's edge.", scenarioIds: ["two-teams-one-goal", "five-villages", "crisis-hour"] },
  { id: "arjuna", col: 0, label: "Arjuna", desc: "The archer whose nerve fails at the worst possible hour — and is taught to decide anyway.", scenarioIds: ["crisis-hour", "into-the-spiral"] },
  { id: "yudhishthira", col: 0, label: "Yudhishthira", desc: "The truthful king, tested by the dice hall, the half-truth, and the enchanted pool.", scenarioIds: ["sunk-ship", "necessary-half-truth", "one-chair-left"] },
  { id: "karna", col: 0, label: "Karna", desc: "Loyalty and generosity taken to their limits — and priced by the epic.", scenarioIds: ["mentors-mistake", "open-the-armor"] },
  { id: "bhishma", col: 0, label: "Bhishma", desc: "The bound guardian; emblem of vows that outlive their wisdom, and of silence at the wrong hour.", scenarioIds: ["the-silent-room"] },
  { id: "vidura", col: 0, label: "Vidura", desc: "The counsellor of foresight who names faults before they become catastrophes.", scenarioIds: ["biased-algorithm", "the-silent-room"] },
  // Episodes
  { id: "ep-gita", col: 1, label: "Counsel at Kurukshetra", desc: "Arjuna's paralysis answered with a discipline of mind — the Bhagavad Gita, within Bhishma Parva.", scenarioIds: ["crisis-hour"] },
  { id: "ep-peace", col: 1, label: "The Peace Mission", desc: "Krishna gives negotiation its full, honest weight before war — Udyoga Parva.", scenarioIds: ["two-teams-one-goal"] },
  { id: "ep-villages", col: 1, label: "The Five Villages", desc: "A minimal, public, reasoned demand — whose refusal revealed who ended the peace.", scenarioIds: ["five-villages"] },
  { id: "ep-dice", col: 1, label: "The Dice Hall", desc: "Escalation of commitment, staged in the assembly of Hastinapura — Sabha Parva.", scenarioIds: ["sunk-ship", "the-silent-room"] },
  { id: "ep-drona", col: 1, label: "The Fall of Drona", desc: "A technically-true sentence breaks an unbreakable warrior — Drona Parva.", scenarioIds: ["necessary-half-truth"] },
  { id: "ep-karna", col: 1, label: "Karna's Revelation", desc: "Told the truth at last, Karna stays — loyalty as identity, before the war.", scenarioIds: ["mentors-mistake"] },
  { id: "ep-niti", col: 1, label: "Vidura Niti", desc: "Night counsel on statecraft and foresight for a sleepless king.", scenarioIds: ["biased-algorithm"] },
  // Conflicts
  { id: "cf-duty", col: 2, label: "Duty vs. feeling", desc: "The mind's condition as part of the decision itself.", scenarioIds: ["crisis-hour"] },
  { id: "cf-align", col: 2, label: "Sides vs. the shared goal", desc: "Whether to route around the feud — or mediate it like an envoy.", scenarioIds: ["two-teams-one-goal"] },
  { id: "cf-floor", col: 2, label: "Harmony vs. a fair floor", desc: "The discipline of naming the minimum that is right.", scenarioIds: ["five-villages"] },
  { id: "cf-escalation", col: 2, label: "Commitment vs. reason", desc: "When continuing is no longer courage but compulsion.", scenarioIds: ["sunk-ship"] },
  { id: "cf-truth", col: 2, label: "Calm vs. truth", desc: "What a technically-accurate statement costs the voice that speaks it.", scenarioIds: ["necessary-half-truth"] },
  { id: "cf-loyalty", col: 2, label: "Gratitude vs. the standard", desc: "Where loyalty stops being virtue and becomes complicity.", scenarioIds: ["mentors-mistake"] },
  { id: "cf-foresight", col: 2, label: "Deadline vs. foresight", desc: "Naming the fault in writing before the system touches people.", scenarioIds: ["biased-algorithm"] },
  { id: "cf-silence", col: 2, label: "Safety vs. first speech", desc: "The silence of the seated, and the one voice that breaks it.", scenarioIds: ["the-silent-room"] },
  // Insights
  { id: "in-steady", col: 3, label: "Steadiness before action", desc: "Govern the mind first; then commit fully.", scenarioIds: ["crisis-hour"] },
  { id: "in-mediate", col: 3, label: "Mediation before escalation", desc: "A serious attempt at peace is due diligence, not weakness.", scenarioIds: ["two-teams-one-goal"] },
  { id: "in-floor", col: 3, label: "The minimum just demand", desc: "Clarity calmly stated transfers the burden of refusal.", scenarioIds: ["five-villages"] },
  { id: "in-bounded", col: 3, label: "Bounded commitment", desc: "Define the exit before the emotion invests.", scenarioIds: ["sunk-ship"] },
  { id: "in-halftruth", col: 3, label: "The cost of the half-truth", desc: "Price deception in the credibility it was spent from.", scenarioIds: ["necessary-half-truth"] },
  { id: "in-loyalty", col: 3, label: "Loyalty has limits", desc: "Gratitude binds; it must not blind.", scenarioIds: ["mentors-mistake"] },
  { id: "in-foresight", col: 3, label: "Foresight is a duty", desc: "Systems faithfully inherit the blind spots of their makers.", scenarioIds: ["biased-algorithm"] },
  { id: "in-speak", col: 3, label: "Someone must speak first", desc: "First speech is a role, not a temperament.", scenarioIds: ["the-silent-room"] },
  // Modern problems
  { id: "pr-crisis", col: 4, label: "The Crisis Hour", desc: "A 3 AM decision with incomplete data and a running meter.", scenarioIds: ["crisis-hour"] },
  { id: "pr-teams", col: 4, label: "Two Teams, One Goal", desc: "Feuding teams and a disappearing release.", scenarioIds: ["two-teams-one-goal"] },
  { id: "pr-villages", col: 4, label: "Ask for the Five Villages", desc: "A term-sheet that quietly re-prices your contribution.", scenarioIds: ["five-villages"] },
  { id: "pr-sunk", col: 4, label: "The Sunk Ship", desc: "Fourteen months in, and the data says stop.", scenarioIds: ["sunk-ship"] },
  { id: "pr-truth", col: 4, label: "The Necessary Half-Truth", desc: "A layoff rumour and a technically-true statement.", scenarioIds: ["necessary-half-truth"] },
  { id: "pr-mentor", col: 4, label: "The Mentor's Mistake", desc: "The person who built your career asks you to help hide an error.", scenarioIds: ["mentors-mistake"] },
  { id: "pr-ai", col: 4, label: "The Biased Algorithm", desc: "A model that passes benchmarks and fails people.", scenarioIds: ["biased-algorithm"] },
  { id: "pr-room", col: 4, label: "The Silent Room", desc: "A junior blamed in public while every senior stays quiet.", scenarioIds: ["the-silent-room"] },
];

const CHAINS: [string, string, string, string, string][] = [
  ["arjuna", "ep-gita", "cf-duty", "in-steady", "pr-crisis"],
  ["krishna", "ep-peace", "cf-align", "in-mediate", "pr-teams"],
  ["krishna", "ep-villages", "cf-floor", "in-floor", "pr-villages"],
  ["yudhishthira", "ep-dice", "cf-escalation", "in-bounded", "pr-sunk"],
  ["yudhishthira", "ep-drona", "cf-truth", "in-halftruth", "pr-truth"],
  ["karna", "ep-karna", "cf-loyalty", "in-loyalty", "pr-mentor"],
  ["vidura", "ep-niti", "cf-foresight", "in-foresight", "pr-ai"],
  ["bhishma", "ep-dice", "cf-silence", "in-speak", "pr-room"],
];

export default function KnowledgeGraph() {
  const { navigate } = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<GNode | null>(null);

  const pos = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (let c = 0 as Col; c <= 4; c = (c + 1) as Col) {
      const colNodes = NODES.filter((n) => n.col === c);
      const gap = (H - 190) / Math.max(colNodes.length - 1, 1);
      colNodes.forEach((n, i) => {
        map.set(n.id, { x: XS[c], y: 120 + i * gap });
      });
    }
    return map;
  }, []);

  const edges = useMemo(() => {
    const list: [string, string][] = [];
    for (const chain of CHAINS) {
      for (let i = 0; i < chain.length - 1; i++) list.push([chain[i], chain[i + 1]]);
    }
    return list;
  }, []);

  const connectedSet = useMemo(() => {
    if (!hovered) return null;
    const adj = new Map<string, string[]>();
    for (const [a, b] of edges) {
      adj.set(a, [...(adj.get(a) ?? []), b]);
      adj.set(b, [...(adj.get(b) ?? []), a]);
    }
    const seen = new Set<string>([hovered]);
    const queue = [hovered];
    while (queue.length) {
      const cur = queue.shift()!;
      for (const next of adj.get(cur) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    return seen;
  }, [hovered, edges]);

  return (
    <div className="overflow-hidden rounded-[32px] border border-amberglow/25 bg-navy shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-6 sm:px-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-amberglow">
            Animated Knowledge Graph
          </div>
          <h3 className="mt-2 font-display text-2xl font-medium text-ivory">
            One epic, wired to eight modern dilemmas
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/35">
          Hover to trace · click to open
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block min-w-[980px]"
          role="img"
          aria-label="Mahabharata knowledge network linking characters, episodes, conflicts, insights and modern problems"
        >
          {/* column headers */}
          {COLS.map((c, i) => (
            <text
              key={c}
              x={XS[i]}
              y={46}
              textAnchor="middle"
              fill="#c7923e"
              fontSize="11"
              fontFamily="IBM Plex Mono, monospace"
              letterSpacing="3"
              opacity={0.85}
            >
              {c.toUpperCase()}
            </text>
          ))}
          <line x1="60" y1="66" x2="1440" y2="66" stroke="#c7923e" strokeWidth="0.4" opacity="0.25" />

          {/* edges */}
          {edges.map(([a, b], i) => {
            const pa = pos.get(a)!;
            const pb = pos.get(b)!;
            const mx = (pa.x + pb.x) / 2;
            const lit = !connectedSet || (connectedSet.has(a) && connectedSet.has(b));
            return (
              <motion.path
                key={i}
                d={`M ${pa.x} ${pa.y} C ${mx} ${pa.y}, ${mx} ${pb.y}, ${pb.x} ${pb.y}`}
                fill="none"
                stroke="#c7923e"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: lit ? 0.8 : 0.12 }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 1.4, delay: 0.3 + i * 0.05, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
                strokeWidth={lit && connectedSet ? 1.6 : 0.9}
              />
            );
          })}

          {/* nodes */}
          {NODES.map((n, i) => {
            const p = pos.get(n.id)!;
            const lit = !connectedSet || connectedSet.has(n.id);
            const isHover = hovered === n.id;
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: lit ? 1 : 0.22, scale: 1 }}
                viewport={{ once: true }}
                transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.5, delay: 0.2 + i * 0.02, ease: EASE } }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(n)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHover ? 13 : 9}
                  fill="#101827"
                  stroke={isHover ? "#eec277" : "#c7923e"}
                  strokeWidth={isHover ? 2 : 1.2}
                  style={{
                    filter: isHover ? "drop-shadow(0 0 10px rgba(199,146,62,0.9))" : "none",
                    transition: "r 0.25s ease, filter 0.25s ease, stroke 0.25s ease",
                  }}
                />
                <circle cx={p.x} cy={p.y} r="2.4" fill="#c7923e" />
                <text
                  x={p.x}
                  y={p.y + 28}
                  textAnchor="middle"
                  fill={isHover ? "#f5f0e6" : "rgba(245,240,230,0.72)"}
                  fontSize="12.5"
                  fontWeight={isHover ? 600 : 500}
                  fontFamily="Inter, sans-serif"
                  style={{ transition: "fill 0.25s ease" }}
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* node panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden border-t border-amberglow/25"
          >
            <div className="flex flex-col gap-5 bg-amberglow/5 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amberglow">
                    {COLS[selected.col]}
                  </span>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close node panel"
                    className="focus-ring rounded-full border border-white/15 p-1 text-ivory/50 transition hover:border-amberglow/50 hover:text-ivory"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <h4 className="mt-2 font-display text-3xl font-medium text-ivory">{selected.label}</h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ivory/60">{selected.desc}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                {selected.scenarioIds.slice(0, 3).map((id) => {
                  const s = getScenario(id);
                  if (!s) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => navigate("simulator", { scenarioId: id })}
                      className="focus-ring group inline-flex items-center gap-2 rounded-full border border-amberglow/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-amberglow transition hover:bg-amberglow hover:text-navy"
                    >
                      {s.title}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
