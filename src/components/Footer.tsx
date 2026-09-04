import { useRouter } from "../state/store";
import type { Page } from "../types";
import { LensMark } from "./Navbar";
import { Chakra } from "./fx";
import { Divider } from "./fx";

const COLS: { title: string; links: { page: Page; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { page: "problems", label: "Problem Categories" },
      { page: "simulator", label: "Decision Simulator" },
      { page: "library", label: "Scenario Library" },
      { page: "ask", label: "Ask DharmaLens" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { page: "explorer", label: "Knowledge Explorer" },
      { page: "sources", label: "Sources & References" },
      { page: "profile", label: "Decision Profile" },
    ],
  },
  {
    title: "About",
    links: [
      { page: "research", label: "Research Foundation" },
      { page: "evaluation", label: "Evaluation" },
      { page: "sources", label: "Citation Policy" },
    ],
  },
];

export default function Footer() {
  const { navigate } = useRouter();
  return (
    <footer className="relative overflow-hidden border-t border-amberglow/15 bg-navy">
      {/* chakra geometry backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[480px] w-[480px] animate-spin-slower text-gold opacity-[0.06]"
      >
        <Chakra />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-24 h-[380px] w-[380px] animate-spin-slow text-gold opacity-[0.05]"
      >
        <Chakra spokes={12} petals={false} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <LensMark className="h-8 w-8" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-amberglow/70">
                Est. on the field of decisions
              </span>
            </div>
            <h2 className="mt-6 font-display text-6xl font-medium leading-none tracking-tight text-ivory sm:text-7xl lg:text-8xl">
              DHARMALENS
            </h2>
            <p className="mt-4 font-display text-xl italic text-amberglow sm:text-2xl">
              Ancient Wisdom. Modern Decisions.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-amberglow">
                  {c.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <button
                        onClick={() => navigate(l.page)}
                        className="focus-ring text-[13px] text-ivory/55 transition-colors hover:text-ivory"
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Divider dark />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <p className="max-w-xl text-[12.5px] leading-relaxed text-ivory/45">
            Interpretations presented here are modern applications of selected
            Mahabharata contexts and should not be treated as direct quotations
            or definitive interpretations. No verses, chapter numbers, or
            episodes are invented; where editions differ, this is stated
            alongside each source.
          </p>
          <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ivory/35 md:items-end">
            <span>Primary text: Ganguli translation (1883–1896), public domain</span>
            <span>IKS education prototype · metrics marked as sample data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
