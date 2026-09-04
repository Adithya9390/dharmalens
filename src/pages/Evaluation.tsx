import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  Timer,
  ThumbsUp,
  MousePointerClick,
  Lightbulb,
  CheckCircle2,
  FlaskConical,
  AlertTriangle,
} from "lucide-react";
import { Reveal, SectionHead, Overline } from "../components/ui";
import { Btn } from "../components/ui";
import { useRouter } from "../state/store";
import { AnimatedNumber } from "../components/fx";

/* All values below are DEMO / SAMPLE DATA for design demonstration.
 * They are not results of a real study and are labelled as such throughout. */

const completion = [
  { name: "Completed", value: 92 },
  { name: "Dropped", value: 8 },
];
const ratings = [
  { dim: "Satisfaction", score: 4.4 },
  { dim: "Ease of use", score: 4.5 },
  { dim: "Insight clarity", score: 4.2 },
  { dim: "Relevance", score: 4.3 },
  { dim: "Would recommend", score: 4.1 },
];
const sessions = [
  { s: "S1", min: 8.2 },
  { s: "S2", min: 7.4 },
  { s: "S3", min: 6.8 },
  { s: "S4", min: 6.9 },
  { s: "S5", min: 6.1 },
  { s: "S6", min: 5.8 },
  { s: "S7", min: 6.4 },
  { s: "S8", min: 6.2 },
];

const tooltipStyle = {
  background: "#151f2e",
  border: "1px solid rgba(238,189,106,0.3)",
  borderRadius: 12,
  color: "#f4efe3",
  fontSize: 12,
};

export default function Evaluation() {
  const { navigate } = useRouter();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <SectionHead
          overline="Project Evaluation"
          index="07"
          title={
            <>
              Designed to be <em className="text-gold">measured.</em>
            </>
          }
          sub="Every metric below is sample data included to demonstrate the evaluation dashboard's design and intended methodology."
        />
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-saffron/50 bg-saffron/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            <FlaskConical className="h-4 w-4" />
            Demo / Sample Data
          </span>
        </Reveal>
      </div>

      {/* Stat tiles */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-6">
        {[
          { icon: Users, label: "Users tested", raw: 42, suffix: "" },
          { icon: CheckCircle2, label: "Completion rate", raw: 92, suffix: "%" },
          { icon: Timer, label: "Avg. completion", text: "6m 40s" },
          { icon: ThumbsUp, label: "Satisfaction", text: "4.4 / 5" },
          { icon: MousePointerClick, label: "Ease of use", raw: 88, suffix: "%" },
          { icon: Lightbulb, label: "Insight clarity", text: "4.2 / 5" },
        ].map((t, i) => {
          const Icon = t.icon;
          return (
            <Reveal key={t.label} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-ink/8 bg-white/70 p-5 shadow-soft transition-colors duration-500 hover:border-gold/35">
                <Icon className="h-4.5 w-4.5 text-gold" />
                {"raw" in t && t.raw !== undefined ? (
                  <AnimatedNumber
                    value={t.raw}
                    suffix={t.suffix}
                    className="mt-3 block font-mono text-2xl font-semibold text-ink"
                  />
                ) : (
                  <div className="mt-3 font-mono text-2xl font-semibold text-ink">{t.text}</div>
                )}
                <div className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-faint">
                  {t.label}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Donut */}
        <Reveal>
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft">
            <Overline>Scenario completion</Overline>
            <div className="relative mt-2 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completion}
                    dataKey="value"
                    innerRadius={72}
                    outerRadius={96}
                    startAngle={90}
                    endAngle={-270}
                    strokeWidth={0}
                    isAnimationActive
                  >
                    <Cell fill="#c7923e" />
                    <Cell fill="rgba(199,146,62,0.12)" />
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-semibold text-ink">92%</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
                  completed
                </span>
              </div>
            </div>
            <p className="text-center text-[11px] text-faint">Share of started scenarios finished through reflection</p>
          </div>
        </Reveal>

        {/* Ratings bar */}
        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft">
            <Overline>Post-session ratings</Overline>
            <div className="mt-2 h-[240px] text-soft">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratings} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.15} horizontal={false} />
                  <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                  <YAxis
                    type="category"
                    dataKey="dim"
                    width={98}
                    tick={{ fontSize: 11, fill: "currentColor", fontWeight: 600 }}
                  />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(199,146,62,0.08)" }} />
                  <Bar dataKey="score" fill="#c7923e" radius={[0, 8, 8, 0]} barSize={14} isAnimationActive />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[11px] text-faint">5-point Likert scale, post-scenario questionnaire</p>
          </div>
        </Reveal>

        {/* Session times */}
        <Reveal delay={0.16}>
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft">
            <Overline>Completion time trend</Overline>
            <div className="mt-2 h-[240px] text-soft">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessions} margin={{ left: -14, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.15} />
                  <XAxis dataKey="s" tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                  <YAxis domain={[4, 9]} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="min"
                    stroke="#c7923e"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: "#eec277", strokeWidth: 0 }}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[11px] text-faint">Minutes per scenario across first eight sessions per user</p>
          </div>
        </Reveal>
      </div>

      {/* Methodology + warning */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-soft sm:p-9">
            <Overline index="∘">Intended methodology</Overline>
            <p className="mt-5 text-[14px] leading-[1.85] text-soft">
              A real evaluation would recruit participants to complete a fixed
              set of scenarios, capturing completion rate, time-on-scenario, and
              a post-task questionnaire covering satisfaction, ease of use, and
              — critically — a short pre/post probe testing whether users can
              restate the extracted insight and apply it to a fresh situation.
              Qualitative interviews would probe whether clearly-labelled
              sources change how much users trust the interpretations.
            </p>
            <div className="mt-6">
              <Btn variant="ghost" onClick={() => navigate("research")}>
                Read the research foundation
              </Btn>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-saffron/40 bg-navy p-7 shadow-lift sm:p-9">
            <div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-saffron" />
                <span className="font-display text-lg font-semibold text-ivory">
                  Honesty note
                </span>
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-ivory/70">
                The numbers on this page are illustrative sample values created
                for demonstration. They are not findings from an actual study,
                and must not be cited as research results. Any real deployment
                should replace them with measured data and state sample sizes,
                instruments, and limitations alongside.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-saffron/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-saffron">
              <FlaskConical className="h-3.5 w-3.5" /> Not actual research findings
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
