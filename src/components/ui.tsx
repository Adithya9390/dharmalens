import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  ArrowRight,
  X,
  type LucideIcon,
  BookOpenText,
  Scale,
  NotebookPen,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Difficulty } from "../types";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------ Reveal ------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------- Overline ----------------------------- */

export function Overline({
  index,
  children,
  dark = false,
}: {
  index?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {index && (
        <span
          className={`text-[11px] font-semibold tracking-[0.22em] ${
            dark ? "text-amberglow" : "text-gold"
          }`}
        >
          {index}
        </span>
      )}
      <span className={`h-px w-8 ${dark ? "bg-amberglow/50" : "bg-gold/50"}`} />
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
          dark ? "text-amberglow" : "text-gold"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* --------------------------- Section heading ------------------------ */

export function SectionHead({
  overline,
  index,
  title,
  sub,
  dark = false,
  align = "left",
}: {
  overline: string;
  index?: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} max-w-3xl`}>
      <Reveal>
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Overline index={index} dark={dark}>
            {overline}
          </Overline>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-display text-4xl leading-[1.06] font-medium tracking-tight sm:text-5xl ${
            dark ? "text-ivory" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      <motion.span
        aria-hidden="true"
        className={`mt-4 block h-px bg-gradient-to-r from-gold via-gold/60 to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 84, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.35, ease: EASE }}
      />
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              dark ? "text-ivory/60" : "text-soft"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------ Buttons ----------------------------- */

type BtnVariant = "primary" | "gold" | "ghost" | "ghostGold";

export function Btn({
  children,
  variant = "primary",
  onClick,
  arrow = false,
  className = "",
  disabled = false,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  onClick?: () => void;
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const base =
    "focus-ring group inline-flex items-center justify-center gap-2.5 rounded-[10px] px-6 py-3 font-sans text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40";
  const styles: Record<BtnVariant, string> = {
    primary: "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-navy2 hover:shadow-lift",
    gold: "bg-gold text-white shadow-[0_16px_32px_-16px_rgba(168,121,50,0.7)] hover:-translate-y-0.5 hover:brightness-110",
    ghost:
      "border border-line bg-white/70 text-ink hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white",
    ghostGold:
      "border border-amberglow/45 text-amberglow hover:-translate-y-0.5 hover:border-amberglow hover:bg-amberglow/10",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1.5" />
      )}
    </motion.button>
  );
}

/* -------------------------------- Chips ----------------------------- */

export function Chip({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide ${
        gold
          ? "border-gold/40 bg-gold/10 text-gold"
          : "border-ink/10 bg-white/50 text-soft"
      }`}
    >
      {children}
    </span>
  );
}

export function DiffBadge({ level }: { level: Difficulty }) {
  const styles: Record<Difficulty, string> = {
    Foundational: "bg-emerald-700/10 text-emerald-800 border-emerald-700/20",
    Intermediate: "bg-saffron/15 text-gold border-gold/30",
    Advanced: "bg-navy/10 text-navy border-navy/20",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${styles[level]}`}
    >
      {level}
    </span>
  );
}

/* ------------------------------ Score bar --------------------------- */

export function ScoreBar({
  label,
  value,
  max = 10,
  delay = 0,
  dark = false,
}: {
  label: string;
  value: number;
  max?: number;
  delay?: number;
  dark?: boolean;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className={`text-xs font-medium ${dark ? "text-ivory/70" : "text-soft"}`}>
          {label}
        </span>
        <span className={`font-display text-sm font-semibold ${dark ? "text-amberglow" : "text-gold"}`}>
          {max === 10 ? value.toFixed(0) : pct}
          {max === 10 ? <span className={dark ? "text-ivory/40" : "text-faint"}> /10</span> : <span className={dark ? "text-ivory/40" : "text-faint"}>%</span>}
        </span>
      </div>
      <div className={`h-1.5 w-full overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-ink/8"}`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold via-saffron to-amberglow"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: EASE }}
        />
      </div>
    </div>
  );
}

/* ------------------------------- Modal ------------------------------ */

export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="absolute inset-0 bg-navy/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-paper p-6 shadow-lift sm:p-9"
            initial={{ y: 44, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="focus-ring absolute right-4 top-4 rounded-full border border-ink/10 bg-white/70 p-2 text-soft transition hover:border-gold/50 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------- Accordion ----------------------------- */

export function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: ReactNode;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white/60">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-ink">{title}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="border-t border-ink/8 px-5 py-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------- Why cards ----------------------------- */

export const WHY_CARDS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: BookOpenText,
    title: "Understand",
    desc: "Read a modern problem against an ancient situation whose structure matches it — context, constraints, and stakes made visible.",
  },
  {
    icon: Scale,
    title: "Decide",
    desc: "Weigh real choices with trade-offs, not quizzes with right answers. Every path reveals its benefits, risks and ethical cost.",
  },
  {
    icon: NotebookPen,
    title: "Reflect",
    desc: "Extract the underlying insight, apply it to your own situation, and let your decision patterns teach you over time.",
  },
];

export const JOURNEY_STEPS = [
  { n: "01", label: "Problem", desc: "A modern situation with real stakes" },
  { n: "02", label: "Decision", desc: "Choose among honest trade-offs" },
  { n: "03", label: "Analysis", desc: "Consequences, ethics, impact" },
  { n: "04", label: "Connection", desc: "The ancient lens revealed" },
  { n: "05", label: "Reflection", desc: "Insight made personal" },
];
