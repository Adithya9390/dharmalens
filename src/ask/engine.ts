/* ------------------------------------------------------------------
 * Ask DharmaLens — rule-based prototype engine.
 *
 * Runs entirely on local scenario data. No external AI/API service is
 * called. Classification uses weighted keyword matching against the
 * same structured data that powers the simulator, and responses are
 * assembled from real scenario content (never free-generated).
 * ------------------------------------------------------------------ */

import type { CategoryId, Scenario } from "../types";
import { SCENARIOS } from "../data";
import { CATEGORIES } from "../data/catalog";

export interface AskResult {
  category: CategoryId;
  categoryTitle: string;
  confidence: number;
  lowConfidence: boolean;
  themes: string[];
  approaches: { style: string; label: string; summary: string }[];
  scenario: Scenario;
  episode: string;
  insight: string;
  modernApplication: string;
  reflectionQuestions: string[];
}

const CAT_KEYS: Record<CategoryId, string[]> = {
  "decision-making": [
    "decide", "decision", "choice", "choose", "option", "stuck", "fork",
    "pivot", "sunk", "quit project", "kill the project", "whether to",
    "open source", "release", "share",
  ],
  leadership: [
    "lead", "leader", "manager", "boss", "credit", "recognition",
    "promotion", "role", "visibility", "new position", "step up",
    "took my work", "stole", "attribution", "team lead", "responsibility for",
  ],
  conflict: [
    "conflict", "fight", "fighting", "argu", "disagree", "tension", "clash",
    "feud", "blame", "hostile", "not cooperating", "cooperat", "ego",
    "rival", "competitor attack", "revenge", "retaliat", "humiliat",
    "not working together", "friction",
  ],
  ethics: [
    "ethic", "honest", "lie", "lying", "truth", "decei", "cheat", "integrity",
    "wrong", "whistle", "moral", "misleading", "half truth", "unfair blame",
    "scapegoat", "silent", "speak up", "witnessed", "cover",
  ],
  loyalty: [
    "loyal", "loyalty", "betray", "side with", "mentor", "friend at work",
    "report a friend", "conflict of interest", "owe", "gratitude", "favoritism",
    "forced to choose", "layoff", "retain", "keep one", "allegiance",
  ],
  "ai-ethics": [
    "ai", "algorithm", "model", "automation", "automated", "bias", "dataset",
    "training data", "privacy", "machine learning", "llm", "gpt", "screening",
    "hiring tool", "recommendation", "surveillance", "neural",
  ],
  negotiation: [
    "negotiat", "salary", "deal", "contract", "offer", "terms", "bargain",
    "raise", "partnership", "equity", "term sheet", "counteroffer", "ask for",
    "undervalued", "pay",
  ],
  pressure: [
    "pressure", "deadline", "crisis", "urgent", "panic", "stress", "burnout",
    "uncertain", "chaos", "incident", "outage", "overnight", "3am", "3 am",
    "no time", "fast", "incomplete information", "emergency",
  ],
};

const THEME_KEYS: Record<string, string[]> = {
  Fairness: ["fair", "unfair", "justice", "equal", "bias", "deserve", "merit"],
  Truth: ["truth", "honest", "lie", "transparent", "mislead", "disclosure"],
  Loyalty: ["loyal", "betray", "owe", "gratitude", "friend", "allegiance"],
  Strategy: ["strategy", "strategic", "long term", "plan", "leverage", "position"],
  "Self-Control": ["angry", "anger", "panic", "calm", "emotion", "rage", "steady", "stress"],
  Responsibility: ["responsib", "accountab", "duty", "own", "blame", "fault"],
  Foresight: ["risk", "future", "predict", "foresee", "prevent", "early", "warning"],
  Recognition: ["credit", "recognition", "invisible", "unnoticed", "praise", "attribution"],
  Courage: ["afraid", "fear", "scared", "courage", "speak", "silent", "confront"],
  "De-escalation": ["de-escalat", "calm down", "peace", "mediate", "reconcile", "truce"],
  Negotiation: ["negotiat", "deal", "offer", "ask for", "terms", "salary"],
  Reversibility: ["irreversible", "stuck", "trapped", "exit", "way out", "commit"],
};

const STOPWORDS = new Set(
  ("a,an,the,and,or,but,if,then,of,at,by,for,with,about,into,over,after,before,to,from,up,down,in,out,on,off,again,once,here,there,when,where,why,how,all,any,both,each,few,more,most,some,such,no,nor,not,only,own,same,so,than,too,very,can,will,just,should,now,i,me,my,we,our,you,your,he,him,his,she,her,it,its,they,them,their,what,which,who,whom,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,would,could,ought,im,ive,dont,didnt,doesnt,isnt,arent,wasnt,might,must,shall,may,really,feel,like,get,also").split(",")
);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function scoreKeys(text: string, keys: string[]): number {
  const lower =
    " " + text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ") + " ";
  let score = 0;
  for (const key of keys) {
    const k = key.toLowerCase();
    if (k.includes(" ")) {
      if (lower.includes(k)) score += 3;
    } else if (lower.includes(" " + k)) {
      score += 2;
    }
  }
  return score;
}

export function classify(input: string): AskResult {
  const trimmed = input.trim();
  const tokens = tokenize(trimmed);

  // Category scores
  const catScores = CATEGORIES.map((c) => ({
    id: c.id,
    title: c.title,
    score: scoreKeys(trimmed, CAT_KEYS[c.id]),
  })).sort((a, b) => b.score - a.score);

  let best = catScores[0];
  let lowConfidence = false;

  if (best.score === 0) {
    // Fallback heuristics: people-words → conflict/leadership; else decision-making.
    const peopleWords = ["team", "colleague", "coworker", "manager", "boss", "employee", "people", "staff"];
    const person = tokens.some((t) => peopleWords.includes(t));
    best = person
      ? { id: "conflict" as CategoryId, title: "Team Conflict", score: 1 }
      : { id: "decision-making" as CategoryId, title: "Decision Making", score: 1 };
    lowConfidence = true;
  }

  const second = catScores[1]?.score ?? 0;
  const confidence = Math.max(
    34,
    Math.min(94, 42 + best.score * 11 - second * 5)
  );

  // Candidate scenario: scenario in best category whose themes/keywords overlap most.
  const candidates = SCENARIOS.filter((s) => s.category === best.id);
  let scenario = candidates[0] ?? SCENARIOS[0];
  let bestOverlap = -1;
  for (const s of candidates.length ? candidates : SCENARIOS) {
    const hay = `${s.title} ${s.modernProblem} ${s.situation} ${s.themes.join(" ")}`.toLowerCase();
    const overlap = tokens.reduce((n, t) => (t.length > 3 && hay.includes(t) ? n + 1 : n), 0);
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      scenario = s;
    }
  }

  // Themes: top matching theme names
  const themeScores = Object.entries(THEME_KEYS)
    .map(([name, keys]) => ({ name, score: scoreKeys(trimmed, keys) }))
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score);

  const themes = [
    ...new Set([
      ...themeScores.slice(0, 3).map((t) => t.name),
      ...scenario.themes.slice(0, 2),
    ]),
  ].slice(0, 5);

  const approaches = scenario.choices.map((c) => ({
    style: c.style,
    label: c.label,
    summary: c.summary,
  }));

  return {
    category: best.id,
    categoryTitle: best.title,
    confidence,
    lowConfidence,
    themes,
    approaches,
    scenario,
    episode: scenario.mahabharata.episode,
    insight: scenario.mahabharata.insight,
    modernApplication: scenario.mahabharata.modernApplication,
    reflectionQuestions: scenario.reflectionQuestions,
  };
}

export const SUGGESTED_PROMPTS = [
  "My team members are not cooperating with each other.",
  "A colleague took credit for my work in front of leadership.",
  "I found bias in our AI hiring model but leadership wants to launch.",
  "My mentor made a serious mistake and asked me to help hide it.",
  "I have to make a big decision tonight with incomplete information.",
  "I think our partnership terms undervalue my contribution.",
];
