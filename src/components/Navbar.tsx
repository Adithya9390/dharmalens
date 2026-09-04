import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Grid3X3,
  LibraryBig,
  Sparkles,
  UserRound,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useProfile, useRouter } from "../state/store";
import type { Page } from "../types";
import { Btn } from "./ui";
import { EASE } from "./ui";

export function LensMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <circle cx="22" cy="22" r="19" fill="none" stroke="#c7923e" strokeWidth="1.5" />
      <g stroke="#c7923e" strokeWidth="0.9" opacity="0.6">
        <path d="M22 5 v10" />
        <path d="M22 29 v10" />
        <path d="M5 22 h10" />
        <path d="M29 22 h10" />
        <path d="M10 10 l7 7" />
        <path d="M34 34 l-7 -7" />
        <path d="M34 10 l-7 7" />
        <path d="M10 34 l7 -7" />
      </g>
      <circle cx="22" cy="22" r="6.5" fill="#101827" />
      <circle cx="22" cy="22" r="6.5" fill="none" stroke="#c7923e" strokeWidth="0.7" opacity="0.7" />
      <circle cx="22" cy="22" r="2.4" fill="#c7923e" />
    </svg>
  );
}

const LINKS: { page: Page; label: string }[] = [
  { page: "problems", label: "Problems" },
  { page: "simulator", label: "Simulator" },
  { page: "library", label: "Library" },
  { page: "explorer", label: "Knowledge" },
  { page: "profile", label: "Profile" },
];

const MORE_LINKS: { page: Page; label: string; desc: string }[] = [
  { page: "research", label: "Research Foundation", desc: "From text to interactive solution" },
  { page: "evaluation", label: "Evaluation", desc: "Sample metrics & methodology" },
  { page: "sources", label: "Sources & References", desc: "Structured citations for every insight" },
  { page: "ask", label: "Ask DharmaLens", desc: "Rule-based problem consultation" },
];

const BOTTOM: { page: Page; label: string; icon: typeof Home }[] = [
  { page: "home", label: "Home", icon: Home },
  { page: "problems", label: "Problems", icon: Grid3X3 },
  { page: "library", label: "Library", icon: LibraryBig },
  { page: "ask", label: "Ask", icon: Sparkles },
  { page: "profile", label: "Profile", icon: UserRound },
];

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useProfile();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light manuscript mode" : "Switch to dark Kurukshetra mode"}
      title={theme === "dark" ? "Manuscript mode" : "Kurukshetra mode"}
      className={`focus-ring relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gold/40 text-gold transition-all duration-300 hover:border-amberglow hover:shadow-glow ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const { route, navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || route.page !== "home";
  const inkText = solid ? "text-ink" : "text-ivory";
  const softText = (active: boolean) =>
    active ? "text-amberglow" : solid ? "text-soft hover:text-ink" : "text-ivory/65 hover:text-ivory";

  const go = (page: Page, scenarioId?: string) => {
    setOpen(false);
    navigate(page, scenarioId ? { scenarioId } : undefined);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-all duration-500 ${
            solid ? "glass shadow-soft" : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className={`gold-rule transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => go("home")}
              className="focus-ring flex items-center gap-3"
              aria-label="DharmaLens home"
            >
              <LensMark />
              <div className="text-left leading-none">
                <span className={`font-display text-[19px] font-semibold tracking-[0.16em] transition-colors duration-500 ${inkText}`}>
                  DHARMALENS
                </span>
                <span className={`mt-1 hidden text-[9px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 sm:block ${solid ? "text-faint" : "text-ivory/45"}`}>
                  Ancient Wisdom · Modern Decisions
                </span>
              </div>
            </button>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {LINKS.map((l) => (
                <button
                  key={l.page}
                  onClick={() => go(l.page)}
                  data-active={route.page === l.page}
                  className={`link-underline focus-ring py-1 text-[13.5px] font-medium transition-colors ${softText(route.page === l.page)}`}
                >
                  {l.label}
                </button>
              ))}
              <div className="group relative">
                <button
                  className={`focus-ring flex items-center gap-1.5 py-1 text-[13.5px] font-medium transition-colors ${softText(false)}`}
                  aria-haspopup="true"
                >
                  More <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute right-0 top-full w-72 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="glass overflow-hidden rounded-2xl p-2 shadow-lift">
                    {MORE_LINKS.map((m) => (
                      <button
                        key={m.page}
                        onClick={() => go(m.page)}
                        className="focus-ring flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-gold/10"
                      >
                        <div>
                          <div className="text-[13px] font-semibold text-ink">{m.label}</div>
                          <div className="mt-0.5 font-mono text-[10px] tracking-wide text-faint">{m.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />
              <Btn
                variant="gold"
                className="px-5 py-2.5"
                onClick={() => go("simulator", "credit-where-due")}
                arrow
              >
                Start Decision
              </Btn>
            </div>

            <div className="flex items-center gap-2.5 lg:hidden">
              <ThemeToggle />
              <button
                className={`focus-ring rounded-lg p-2 transition-colors duration-500 ${inkText}`}
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {/* gold journey progress */}
        <motion.div
          aria-hidden="true"
          className="h-[2px] origin-left bg-gradient-to-r from-bronze via-gold to-amberglow"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] bg-navy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 opacity-[0.08] text-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <Square yantra />
            </motion.div>
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <LensMark />
                <span className="font-mono text-[13px] font-semibold tracking-[0.34em] text-ivory">
                  DHARMALENS
                </span>
              </div>
              <button
                className="focus-ring rounded-lg p-2 text-ivory"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col px-6" aria-label="Mobile">
              {[
                { page: "home" as Page, label: "Home", n: "01" },
                { page: "problems" as Page, label: "Problems", n: "02" },
                { page: "simulator" as Page, label: "Decision Simulator", n: "03" },
                { page: "library" as Page, label: "Scenario Library", n: "04" },
                { page: "explorer" as Page, label: "Knowledge Explorer", n: "05" },
                { page: "ask" as Page, label: "Ask DharmaLens", n: "06" },
                { page: "profile" as Page, label: "Decision Profile", n: "07" },
                { page: "research" as Page, label: "Research Foundation", n: "08" },
                { page: "evaluation" as Page, label: "Evaluation", n: "09" },
                { page: "sources" as Page, label: "Sources & References", n: "10" },
              ].map((l, i) => (
                <motion.button
                  key={l.page}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.45, ease: EASE }}
                  onClick={() => go(l.page)}
                  className={`focus-ring flex items-baseline gap-4 border-b border-white/10 py-4 text-left ${
                    route.page === l.page ? "text-amberglow" : "text-ivory"
                  }`}
                >
                  <span className="font-mono text-[10px] text-amberglow/70">{l.n}</span>
                  <span className="font-display text-[22px] font-medium">{l.label}</span>
                </motion.button>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-6 pt-8 font-mono text-[9.5px] leading-relaxed uppercase tracking-[0.2em] text-ivory/35"
            >
              Interpretations are modern applications of selected contexts — not quotations.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)] lg:hidden"
        aria-label="Quick navigation"
      >
        <div className="glass mx-3 mb-3 flex items-center justify-between rounded-2xl px-1.5 py-1.5 shadow-lift">
          {BOTTOM.map((b) => {
            const active = route.page === b.page;
            const Icon = b.icon;
            const isAsk = b.page === "ask";
            return (
              <button
                key={b.page}
                onClick={() => go(b.page)}
                aria-label={b.label}
                className={`focus-ring relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-2 transition-colors ${
                  isAsk
                    ? "mx-1 -my-3 rounded-2xl border border-gold/50 bg-navy py-3 text-amberglow shadow-glow"
                    : active
                      ? "text-gold"
                      : "text-faint"
                }`}
              >
                <Icon className={isAsk ? "h-5 w-5" : "h-[18px] w-[18px]"} />
                <span className={`font-mono text-[8.5px] font-medium uppercase tracking-[0.12em] ${isAsk ? "text-amberglow" : ""}`}>
                  {b.label}
                </span>
                {active && !isAsk && (
                  <motion.span
                    layoutId="bottomnav-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-gold"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function Square({ yantra = false }: { yantra?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true" fill="none">
      <rect x="30" y="30" width="140" height="140" stroke="currentColor" strokeWidth="0.6" />
      <rect x="55" y="55" width="90" height="90" stroke="currentColor" strokeWidth="0.6" transform="rotate(45 100 100)" />
      <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.6" />
      {yantra && (
        <>
          <path d="M100 36 L164 136 L36 136 Z" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100 164 L36 64 L164 64 Z" stroke="currentColor" strokeWidth="0.5" />
        </>
      )}
    </svg>
  );
}
