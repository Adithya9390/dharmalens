import type { Scenario, CategoryId } from "../types";
import { SCENARIOS_P1 } from "./scenarios-p1";
import { SCENARIOS_P2 } from "./scenarios-p2";
import { SCENARIOS_P3 } from "./scenarios-p3";

/* Structured scenario store — add new scenarios by appending
 * to any part file; every surface (library, explorer, ask-engine,
 * profile, sources) derives from this single source of truth. */
export const SCENARIOS: Scenario[] = [
  ...SCENARIOS_P1,
  ...SCENARIOS_P2,
  ...SCENARIOS_P3,
];

export const getScenario = (id: string): Scenario | undefined =>
  SCENARIOS.find((s) => s.id === id);

export const scenariosByCategory = (cat: CategoryId): Scenario[] =>
  SCENARIOS.filter((s) => s.category === cat);

export const countByCategory = (cat: CategoryId): number =>
  SCENARIOS.reduce((n, s) => (s.category === cat ? n + 1 : 0), 0);

export const TOTAL_PATHS = SCENARIOS.reduce((n, s) => n + s.choices.length, 0);

export const ALL_THEMES: string[] = Array.from(
  new Set(SCENARIOS.flatMap((s) => s.themes))
).sort();
