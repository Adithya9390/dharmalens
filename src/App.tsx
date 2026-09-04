import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { AppProviders, useProfile, useRouter } from "./state/store";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Library from "./pages/Library";
import Simulator from "./pages/Simulator";
import Explorer from "./pages/Explorer";
import Ask from "./pages/Ask";
import Profile from "./pages/Profile";
import Research from "./pages/Research";
import Evaluation from "./pages/Evaluation";
import Sources from "./pages/Sources";
import { EASE } from "./components/ui";

function ThemeVeil() {
  const { theme } = useProfile();
  const prev = useRef(theme);
  const [veil, setVeil] = useState(false);
  useEffect(() => {
    if (prev.current !== theme) {
      prev.current = theme;
      setVeil(true);
      const t = window.setTimeout(() => setVeil(false), 750);
      return () => window.clearTimeout(t);
    }
  }, [theme]);
  return (
    <AnimatePresence>
      {veil && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[150]"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(199,146,62,0.22) 0%, var(--bg) 62%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

function Shell() {
  const { route } = useRouter();
  const { toast } = useProfile();

  const key = `${route.page}-${route.scenarioId ?? ""}-${route.filter ?? ""}`;

  const page = (() => {
    switch (route.page) {
      case "home":
        return <Home />;
      case "problems":
        return <Problems />;
      case "library":
        return <Library />;
      case "simulator":
        return <Simulator />;
      case "explorer":
        return <Explorer />;
      case "ask":
        return <Ask />;
      case "profile":
        return <Profile />;
      case "research":
        return <Research />;
      case "evaluation":
        return <Evaluation />;
      case "sources":
        return <Sources />;
      default:
        return <Home />;
    }
  })();

  return (
    <div className="flex min-h-screen flex-col">
      <Cursor />
      <ThemeVeil />
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {page}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-24 left-1/2 z-[99] -translate-x-1/2 lg:bottom-8"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2.5 rounded-full border border-amberglow/40 bg-navy px-5 py-3 shadow-lift">
              <CheckCircle2 className="h-4 w-4 text-amberglow" />
              <span className="text-[13px] font-semibold text-ivory">{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProviders>
        <Shell />
      </AppProviders>
    </MotionConfig>
  );
}
