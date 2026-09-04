import { motion } from "framer-motion";
import {
  Compass,
  Flag,
  Users,
  Scale,
  Handshake,
  Cpu,
  ArrowLeftRight,
  Timer,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "../types";
import { CATEGORIES } from "../data/catalog";
import { countByCategory } from "../data";
import { useRouter } from "../state/store";
import { Reveal, EASE } from "./ui";

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  "decision-making": Compass,
  leadership: Flag,
  conflict: Users,
  ethics: Scale,
  loyalty: Handshake,
  "ai-ethics": Cpu,
  negotiation: ArrowLeftRight,
  pressure: Timer,
};

export default function CategoryGrid({ compact = false }: { compact?: boolean }) {
  const { navigate } = useRouter();
  return (
    <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-4"}`}>
      {CATEGORIES.map((c, i) => {
        const Icon = CATEGORY_ICONS[c.id];
        const count = countByCategory(c.id);
        return (
          <Reveal key={c.id} delay={i * 0.06}>
            <motion.button
              whileHover={{ y: -7 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={() => navigate("library", { filter: c.id })}
              data-cursor
              aria-label={`Explore ${c.title} — ${count} scenarios`}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white/65 p-6 text-left shadow-soft backdrop-blur-sm transition-colors duration-500 hover:border-gold/50 hover:bg-white"
            >
              {/* hover gradient wash */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold transition-all duration-500 group-hover:translate-x-1.5 group-hover:border-gold/50 group-hover:shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-[40px] font-light leading-none text-ink/12 transition-colors duration-500 group-hover:text-gold/45">
                  {c.index}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-[22px] font-semibold text-ink">
                {c.title}
              </h3>
              <p className="relative mt-1 font-mono text-[9.5px] uppercase italic tracking-[0.14em] text-gold">
                {c.tagline}
              </p>
              <p className="relative mt-3 flex-1 text-[13px] leading-relaxed text-soft">
                {c.description}
              </p>
              <div className="relative mt-5 flex items-center justify-between border-t border-ink/8 pt-4">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                  {count} {count === 1 ? "scenario" : "scenarios"}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors group-hover:text-ink">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
              {/* bottom gold trace */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-saffron to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />
            </motion.button>
          </Reveal>
        );
      })}
    </div>
  );
}
