import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "breathe-in" | "hold" | "breathe-out";

type Props = {
  inhaleMs?: number;
  holdMs?: number;
  exhaleMs?: number;
};

export default function BreathingCircle({ inhaleMs = 4000, holdMs = 2000, exhaleMs = 6000 }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("breathe-in");
  const idxRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // derive dynamic phases from props
  const PHASES: { name: Phase; dur: number }[] = [
    { name: "breathe-in", dur: inhaleMs },
    { name: "hold", dur: holdMs },
    { name: "breathe-out", dur: exhaleMs },
  ];

  useEffect(() => {
    // restart timers if running and durations changed
    if (!isRunning) {
      setPhase("breathe-in");
      idxRef.current = 0;
      return;
    }

    // clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const run = () => {
      const p = PHASES[idxRef.current % PHASES.length];
      setPhase(p.name);
      timerRef.current = window.setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % PHASES.length;
        run();
      }, p.dur);
    };

    run();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, inhaleMs, holdMs, exhaleMs]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const label = phase === "breathe-in" ? "Breathe In" : phase === "hold" ? "Hold" : "Breathe Out";
  const phaseDurSec = (PHASES.find((p) => p.name === phase)!.dur / 1000) || 0;

  return (
    <div
      aria-label="Breathing exercise"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        gap: 16,
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      <motion.div
        aria-hidden
        role="img"
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--breath-bg)",
          boxShadow: "var(--breath-shadow)",
          willChange: "transform, box-shadow",
        }}
        animate={{ scale: isRunning ? (phase === "breathe-in" ? 1.14 : phase === "hold" ? 1.06 : 0.9) : 1 }}
        transition={{ duration: phaseDurSec, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={label}
            style={{
              background: "rgba(255,255,255,0.88)",
              padding: "8px 12px",
              borderRadius: 999,
              fontWeight: 700,
              color: "var(--label-color)",
              display: "inline-block",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.36, ease: "easeInOut" }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={() => {
            if (!isRunning) {
              const i = PHASES.findIndex((p) => p.name === phase);
              idxRef.current = i >= 0 ? i : 0;
            }
            setIsRunning((s) => !s);
          }}
          style={{
            minWidth: 96,
            height: 44,
            padding: "0 16px",
            borderRadius: 12,
            background: isRunning ? "linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.06))" : "#ffffff",
            border: "1px solid rgba(15,23,42,0.06)",
            boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
            fontWeight: 700,
            cursor: "pointer",
          }}
          aria-pressed={isRunning}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsRunning(false);
            setPhase("breathe-in");
            idxRef.current = 0;
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }}
          style={{
            minWidth: 96,
            height: 44,
            padding: "0 16px",
            borderRadius: 12,
            background: "#ffffff",
            border: "1px solid rgba(15,23,42,0.06)",
            boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

