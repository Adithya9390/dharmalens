/* ------------------------------------------------------------------
 * DharmaLens — core data model.
 * All scenario content lives in src/data as plain structured objects.
 * UI components never hard-code scenario text.
 * ------------------------------------------------------------------ */

export type Page =
  | "home"
  | "problems"
  | "library"
  | "simulator"
  | "explorer"
  | "ask"
  | "profile"
  | "research"
  | "evaluation"
  | "sources";

export type CategoryId =
  | "decision-making"
  | "leadership"
  | "conflict"
  | "ethics"
  | "loyalty"
  | "ai-ethics"
  | "negotiation"
  | "pressure";

export type Difficulty = "Foundational" | "Intermediate" | "Advanced";

export type DimKey =
  | "responsibility"
  | "fairness"
  | "consequences"
  | "selfControl"
  | "strategic";

export interface Scores {
  responsibility: number;
  fairness: number;
  consequences: number;
  selfControl: number;
  strategic: number;
}

export interface Stakeholder {
  name: string;
  role: string;
  interest: string;
}

export interface StakeholderEffect {
  name: string;
  effect: string;
}

export interface ChoiceAnalysis {
  benefits: string[];
  risks: string[];
  ethical: string[];
  stakeholderImpact: StakeholderEffect[];
  longTerm: string[];
  scores: Scores;
  closing: string;
}

export interface Choice {
  id: string;
  label: string;
  summary: string;
  style: string;
  analysis: ChoiceAnalysis;
}

export interface Source {
  title: string;
  parva: string;
  section: string;
  episode: string;
  translation: string;
  url?: string;
  note: string;
}

export interface MahabharataConnection {
  episode: string;
  characters: string[];
  context: string;
  insight: string;
  modernApplication: string;
  source: Source;
}

export interface Scenario {
  id: string;
  title: string;
  category: CategoryId;
  difficulty: Difficulty;
  themes: string[];
  coreTension: string;
  modernProblem: string;
  situation: string;
  context: string;
  stakeholders: Stakeholder[];
  constraints: string[];
  choices: Choice[];
  mahabharata: MahabharataConnection;
  reflectionQuestions: string[];
  featured?: boolean;
}

export interface Category {
  id: CategoryId;
  index: string;
  title: string;
  tagline: string;
  description: string;
}

export interface CompletionRecord {
  scenarioId: string;
  choiceId: string;
  style: string;
  scores: Scores;
  ts: number;
  note?: string;
}

export const DIM_LABELS: Record<DimKey, string> = {
  responsibility: "Responsibility",
  fairness: "Fairness",
  consequences: "Consequences",
  selfControl: "Self-Control",
  strategic: "Strategic Thinking",
};

export const DIM_ORDER: DimKey[] = [
  "responsibility",
  "fairness",
  "consequences",
  "selfControl",
  "strategic",
];
