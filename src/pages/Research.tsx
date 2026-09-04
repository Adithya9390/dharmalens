import { motion } from "framer-motion";
import {
  ScrollText,
  Lightbulb,
  Briefcase,
  MonitorSmartphone,
  MousePointerClick,
  ClipboardCheck,
  BookMarked,
  SearchX,
  Sparkles,
  ClipboardList,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHead, Btn, EASE } from "../components/ui";
import { useRouter } from "../state/store";

const PIPELINE: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: ScrollText,
    title: "Mahabharata Source",
    desc: "A documented episode from the critical tradition — named by parva, episode, and translation, with edition variance stated plainly.",
  },
  {
    icon: Lightbulb,
    title: "Extracted Insight",
    desc: "The episode's structural lesson is abstracted — escalation of commitment, the cost of the half-truth, impartiality under loss — without inventing quotations.",
  },
  {
    icon: Briefcase,
    title: "Contemporary Problem",
    desc: "The insight is mapped onto a modern situation with genuine stakes: audits, algorithms, alliances, and assembly rooms of the present.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Interpretation",
    desc: "The mapping is encoded as structured scenario data: stakeholders, constraints, choices, and per-choice consequence analysis.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive Solution",
    desc: "A simulator lets users decide for themselves — receiving analysis, the ancient lens, and guided reflection rather than verdicts.",
  },
  {
    icon: ClipboardCheck,
    title: "User Evaluation",
    desc: "Completion, satisfaction, ease of use and — most importantly — measured understanding of the insight close the research loop.",
  },
];

const PILLARS: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: BookMarked,
    title: "Existing work",
    body: "The Mahabharata is extensively studied, translated and retold — from the Ganguli translation (public domain) and the BORI Critical Edition to modern retellings and teaching texts. Digital products, however, largely retell: quizzes, summaries, and character pages that treat the epic as content to consume.",
  },
  {
    icon: SearchX,
    title: "Research gap",
    body: "Little of the existing digital work uses the epic's documented dilemmas as decision instruments. The gap is not access to the text — it is the missing bridge between an ancient situation's structure and the modern reader's own unresolved decisions.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    body: "DharmaLens inverts the flow: users arrive with their problem, not the epic's plot. Scenarios are data structures pairing verified source references with modern contexts, so every insight travels with its citation and its interpretation boundary. Reflection profiles are built from choices, not questionnaires.",
  },
  {
    icon: ClipboardList,
    title: "Evaluation methodology",
    body: "Completion rate, time-on-scenario, post-task satisfaction and ease-of-use are tracked, alongside a pre/post probe of whether users can restate and re-apply the extracted insight. All demonstration metrics on the Evaluation page are clearly marked as sample data, pending a real study.",
  },
];

export default function Research() {
  const { navigate } = useRouter();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
      <SectionHead
        overline="Research Foundation"
        index="07"
        title={
          <>
            From Mahabharata to{" "}
            <em className="text-gold">Modern Application</em>
          </>
        }
        sub="The platform's academic spine: a traceable pipeline from documented text to interactive product, with the interpretation boundary maintained at every stage."
      />

      {/* Pipeline */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent" aria-hidden="true" />
          <div className="space-y-5">
            {PIPELINE.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="relative flex items-start gap-5"
                  >
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/35 bg-white text-gold shadow-soft">
                      <Icon className="h-5.5 w-5.5" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy font-display text-[9px] font-bold text-amberglow">
                        {i + 1}
                      </span>
                    </span>
                    <div className="rounded-2xl border border-ink/8 bg-white/70 p-5 shadow-soft">
                      <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-soft">{p.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Pillars */}
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-full rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft transition-colors duration-400 hover:border-gold/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-amberglow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{p.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.8] text-soft">{p.body}</p>
                </motion.div>
              </Reveal>
            );
          })}

          <Reveal delay={0.3} className="sm:col-span-2">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-amberglow/30 bg-navy p-8 shadow-lift sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-2xl font-semibold text-ivory">
                  Trace the pipeline yourself
                </h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ivory/60">
                  Every scenario in the library carries its full source block and
                  its evaluation hooks — inspect the data model behind the product.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Btn variant="gold" arrow onClick={() => navigate("sources")}>
                  Sources index
                </Btn>
                <Btn variant="ghostGold" arrow onClick={() => navigate("evaluation")}>
                  Evaluation
                  <ArrowRight className="hidden h-4 w-4" />
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
