import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  CompletionRecord,
  DimKey,
  Page,
  Scores,
} from "../types";
import { DIM_ORDER } from "../types";

/* ------------------------------ Router ------------------------------ */

export interface Route {
  page: Page;
  scenarioId?: string;
  filter?: string;
}

interface RouterCtxValue {
  route: Route;
  navigate: (page: Page, opts?: { scenarioId?: string; filter?: string }) => void;
}

const RouterContext = createContext<RouterCtxValue | null>(null);

export function useRouter(): RouterCtxValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used inside <AppProviders>");
  return ctx;
}

/* --------------------------- Profile store -------------------------- */

interface ProfileCtxValue {
  completions: CompletionRecord[];
  bookmarks: string[];
  theme: "light" | "dark";
  toggleTheme: () => void;
  addCompletion: (rec: CompletionRecord) => void;
  clearHistory: () => void;
  toggleBookmark: (scenarioId: string) => void;
  isBookmarked: (scenarioId: string) => boolean;
  hasCompleted: (scenarioId: string) => boolean;
  notify: (msg: string) => void;
  toast: string | null;
}

const ProfileContext = createContext<ProfileCtxValue | null>(null);

export function useProfile(): ProfileCtxValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside <AppProviders>");
  return ctx;
}

const LS_KEY = "dharmalens-v1";

interface Persisted {
  completions: CompletionRecord[];
  bookmarks: string[];
  theme?: "light" | "dark";
}

function loadPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { completions: [], bookmarks: [], theme: "light" };
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      completions: Array.isArray(parsed.completions) ? parsed.completions : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      theme: parsed.theme === "dark" ? "dark" : "light",
    };
  } catch {
    return { completions: [], bookmarks: [], theme: "light" };
  }
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ page: "home" });
  const [persisted, setPersisted] = useState<Persisted>(() => loadPersisted());
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(persisted));
    } catch {
      /* storage unavailable — app still works in-memory */
    }
  }, [persisted]);

  useEffect(() => {
    document.documentElement.dataset.theme = persisted.theme ?? "light";
  }, [persisted.theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theming");
    window.setTimeout(() => root.classList.remove("theming"), 650);
    setPersisted((p) => ({ ...p, theme: p.theme === "dark" ? "light" : "dark" }));
  }, []);

  const navigate = useCallback(
    (page: Page, opts?: { scenarioId?: string; filter?: string }) => {
      setRoute({ page, scenarioId: opts?.scenarioId, filter: opts?.filter });
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }));
    },
    []
  );

  const notify = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addCompletion = useCallback((rec: CompletionRecord) => {
    setPersisted((p) => ({ ...p, completions: [...p.completions, rec] }));
  }, []);

  const clearHistory = useCallback(() => {
    setPersisted((p) => ({ ...p, completions: [] }));
  }, []);

  const toggleBookmark = useCallback((scenarioId: string) => {
    setPersisted((p) => ({
      ...p,
      bookmarks: p.bookmarks.includes(scenarioId)
        ? p.bookmarks.filter((b) => b !== scenarioId)
        : [...p.bookmarks, scenarioId],
    }));
  }, []);

  const value = useMemo<ProfileCtxValue>(
    () => ({
      completions: persisted.completions,
      bookmarks: persisted.bookmarks,
      theme: persisted.theme ?? "light",
      toggleTheme,
      addCompletion,
      clearHistory,
      toggleBookmark,
      isBookmarked: (id) => persisted.bookmarks.includes(id),
      hasCompleted: (id) => persisted.completions.some((c) => c.scenarioId === id),
      notify,
      toast,
    }),
    [persisted, addCompletion, clearHistory, toggleBookmark, toggleTheme, notify, toast]
  );

  const routerValue = useMemo(() => ({ route, navigate }), [route, navigate]);

  return (
    <RouterContext.Provider value={routerValue}>
      <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
    </RouterContext.Provider>
  );
}

/* ------------------------ Derived profile stats --------------------- */

export interface ProfileStats {
  total: number;
  uniqueScenarios: number;
  dims: Record<DimKey, number>; // 0–100
  riskAwareness: number; // 0–100, derived
  overall: number; // 0–100
  styles: { style: string; count: number }[];
}

export function computeStats(completions: CompletionRecord[]): ProfileStats | null {
  if (completions.length === 0) return null;
  const sums: Record<DimKey, number> = {
    responsibility: 0,
    fairness: 0,
    consequences: 0,
    selfControl: 0,
    strategic: 0,
  };
  const styleCount = new Map<string, number>();
  const unique = new Set<string>();

  for (const c of completions) {
    unique.add(c.scenarioId);
    for (const k of DIM_ORDER) sums[k] += c.scores[k] * 10;
    styleCount.set(c.style, (styleCount.get(c.style) ?? 0) + 1);
  }
  const n = completions.length;
  const dims = Object.fromEntries(
    DIM_ORDER.map((k) => [k, Math.round(sums[k] / n)])
  ) as Record<DimKey, number>;
  const riskAwareness = Math.round(
    dims.consequences * 0.5 + dims.strategic * 0.3 + dims.selfControl * 0.2
  );
  const overall = Math.round(
    DIM_ORDER.reduce((a, k) => a + dims[k], 0) / DIM_ORDER.length
  );
  const styles = [...styleCount.entries()]
    .map(([style, count]) => ({ style, count }))
    .sort((a, b) => b.count - a.count);

  return {
    total: n,
    uniqueScenarios: unique.size,
    dims,
    riskAwareness,
    overall,
    styles,
  };
}

export const emptyScoresAvg = (records: Scores[]): Scores => {
  const base: Scores = {
    responsibility: 0,
    fairness: 0,
    consequences: 0,
    selfControl: 0,
    strategic: 0,
  };
  if (records.length === 0) return base;
  for (const r of records) for (const k of DIM_ORDER) base[k] += r[k];
  for (const k of DIM_ORDER) base[k] /= records.length;
  return base;
};
