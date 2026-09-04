import { useState } from "react";
import { ShieldAlert, ExternalLink, BookOpen, Landmark } from "lucide-react";
import { SCENARIOS } from "../data";
import { categoryTitle } from "../data/catalog";
import { Accordion, Chip, Reveal, SectionHead, Overline } from "../components/ui";
import { useRouter } from "../state/store";
import { Btn } from "../components/ui";

const GENERAL_REFS = [
  {
    title: "The Mahabharata — Kisari Mohan Ganguli translation (1883–1896)",
    detail: "The first complete English translation; public domain. All parva references on this platform default to this edition.",
    url: "https://www.sacred-texts.com/hin/maha/",
  },
  {
    title: "The Mahabharata on Wikisource",
    detail: "The Ganguli translation in a collaboratively maintained, accessible format.",
    url: "https://en.wikisource.org/wiki/The_Mahabharata",
  },
  {
    title: "Gita Supersite — IIT Kanpur",
    detail: "The Bhagavad Gita with multiple translations and commentaries; referenced for the Bhishma Parva lens.",
    url: "https://www.gitasupersite.iitk.ac.in/",
  },
  {
    title: "The Critical Edition — Bhandarkar Oriental Research Institute (BORI)",
    detail: "The scholarly reference edition whose chapter numbering often differs from Ganguli's; cited here as context for the 'sections vary by edition' notes.",
  },
  {
    title: "Bibek Debroy — The Mahabharata (10 volumes, Penguin)",
    detail: "A widely used modern English translation based on the Critical Edition, for readers who prefer contemporary prose.",
  },
];

export default function Sources() {
  const [open, setOpen] = useState<string | null>(null);
  const { navigate } = useRouter();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-32 sm:px-6">
      <SectionHead
        overline="Sources & References"
        index="08"
        title={
          <>
            Every lens, <em className="text-gold">traceable.</em>
          </>
        }
        sub="Each Mahabharata connection on this platform carries a structured source block: title, parva, section, episode, translation and link — with edition variance stated instead of smoothed over."
      />

      {/* Integrity warning */}
      <Reveal className="mt-10">
        <div className="flex items-start gap-4 rounded-3xl border border-saffron/40 bg-saffron/10 p-6 sm:p-7">
          <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Interpretation boundary
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/80">
              Interpretations presented here are modern applications of selected
              Mahabharata contexts and should not be treated as direct
              quotations or definitive interpretations. This platform does not
              reproduce verses, does not attribute invented sayings to
              characters, and does not present a single reading as authoritative.
              Where editions disagree on section naming or chapter numbers, the
              source block says so explicitly.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Scenario sources */}
      <Reveal className="mt-14">
        <Overline index="∘">Scenario source blocks</Overline>
      </Reveal>
      <div className="mt-6 space-y-3">
        {SCENARIOS.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i * 0.04, 0.3)}>
            <Accordion
              open={open === s.id}
              onToggle={() => setOpen(open === s.id ? null : s.id)}
              title={
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-display text-base">{s.mahabharata.source.title}</span>
                  <span className="text-[11px] font-medium text-faint">
                    lens for “{s.title}” · {categoryTitle(s.category)}
                  </span>
                </span>
              }
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <dl className="space-y-3">
                  {[
                    ["Source title", s.mahabharata.source.title],
                    ["Parva", s.mahabharata.source.parva],
                    ["Section / Chapter", s.mahabharata.source.section],
                    ["Episode", s.mahabharata.source.episode],
                    ["Translation / Edition", s.mahabharata.source.translation],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{k}</dt>
                      <dd className="mt-0.5 text-[13px] leading-relaxed text-ink/85">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-col justify-between gap-4">
                  <p className="rounded-2xl border border-ink/8 bg-white/60 p-4 text-[12px] italic leading-relaxed text-soft">
                    {s.mahabharata.source.note}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {s.mahabharata.source.url && (
                      <a
                        href={s.mahabharata.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-[12px] font-semibold text-ivory transition hover:bg-ink"
                      >
                        Open translation <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => navigate("simulator", { scenarioId: s.id })}
                      className="focus-ring text-[12px] font-semibold text-gold underline underline-offset-4 hover:text-ink"
                    >
                      Open scenario
                    </button>
                  </div>
                </div>
              </div>
            </Accordion>
          </Reveal>
        ))}
      </div>

      {/* General references */}
      <Reveal className="mt-16">
        <Overline index="∘">General references</Overline>
      </Reveal>
      <div className="mt-6 space-y-3">
        {GENERAL_REFS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div className="flex flex-col gap-3 rounded-2xl border border-ink/8 bg-white/60 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-gold">
                  {r.url ? <BookOpen className="h-4 w-4" /> : <Landmark className="h-4 w-4" />}
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{r.title}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-soft">{r.detail}</p>
                </div>
              </div>
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-[12px] font-semibold text-soft transition hover:border-gold/40 hover:text-ink"
                >
                  Visit <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <Chip gold>Suggest a correction</Chip>
        <p className="mx-auto mt-4 max-w-lg text-[12.5px] leading-relaxed text-faint">
          Source integrity is a feature, not a footer. If any reference here is
          imprecise, the structured format above exists precisely so the
          correction can be specific.
        </p>
        <div className="mt-6">
          <Btn variant="ghost" onClick={() => navigate("library")}>
            Back to the library
          </Btn>
        </div>
      </Reveal>
    </div>
  );
}
