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
  const [cycleCount, setCycleCount] = useState(0);
  const idxRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // derive dynamic phases from props
  const PHASES: { name: Phase; dur: number }[] = [
    { name: "breathe-in", dur: inhaleMs },
    { name: "hold", dur: holdMs },
    { name: "breathe-out", dur: exhaleMs },
  ];

  useEffect(() => {
    if (!isRunning) {
      setPhase("breathe-in");
      idxRef.current = 0;
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const run = () => {
      const p = PHASES[idxRef.current % PHASES.length];
      setPhase(p.name);

      // Increment cycle count when completing a full cycle (back to breathe-in)
      if (p.name === "breathe-in" && idxRef.current > 0) {
        setCycleCount(prev => prev + 1);
      }

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

  // Smooth, gentle scale animation - noticeable but not dramatic
  const scaleValue = isRunning ? (phase === "breathe-in" ? 1.05 : phase === "hold" ? 1.03 : 0.98) : 1;

  // Subtle gradients matching the page theme - very gentle transitions
  const phaseGradients = {
    "breathe-in": "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.12))", // Soft purple (matches page)
    "hold": "linear-gradient(135deg, rgba(167, 139, 250, 0.18), rgba(139, 92, 246, 0.12))", // Lighter purple
    "breathe-out": "linear-gradient(135deg, rgba(186, 230, 253, 0.2), rgba(147, 197, 253, 0.12))", // Very soft blue
  };

  const currentGradient = phaseGradients[phase];

  return (
    <div
      aria-label="Breathing exercise"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "0 20px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Main Breathing Circle - Clean & Smooth */}
      <div style={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
      }}>
        <motion.div
          aria-hidden
          role="img"
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            position: "relative",
            overflow: "hidden",
          }}
          animate={{
            scale: scaleValue,
            background: currentGradient,
            boxShadow: isRunning
              ? phase === "breathe-in"
                ? "0 25px 70px rgba(99, 102, 241, 0.18), inset 0 0 60px rgba(255, 255, 255, 0.12)"
                : phase === "hold"
                ? "0 22px 65px rgba(139, 92, 246, 0.16), inset 0 0 55px rgba(255, 255, 255, 0.1)"
                : "0 20px 60px rgba(147, 197, 253, 0.15), inset 0 0 50px rgba(255, 255, 255, 0.08)"
              : "0 20px 60px rgba(100, 116, 139, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.06)",
          }}
          transition={{
            duration: phaseDurSec,
            ease: "easeInOut",
          }}
        >
          {/* Subtle noise texture overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          {/* Animated Breathing Dots - Visual Cue */}
          {isRunning && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 0 12px rgba(255, 255, 255, 0.6)",
                  }}
                  animate={{
                    y: phase === "breathe-in" 
                      ? [-8, -8] 
                      : phase === "hold" 
                      ? [0, 0] 
                      : [8, 8],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: phaseDurSec,
                    delay: i * 0.15,
                    ease: "easeInOut",
                    opacity: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />
              ))}
            </div>
          )}

          {/* Phase Label - Ambient Floating Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Main Phase Text */}
              <motion.div
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.98)",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  textShadow: `
                    0 0 20px ${phase === "breathe-in" 
                      ? "rgba(99, 102, 241, 0.5)" 
                      : phase === "hold" 
                      ? "rgba(167, 139, 250, 0.45)" 
                      : "rgba(147, 197, 253, 0.45)"},
                    0 2px 16px rgba(0, 0, 0, 0.25),
                    0 1px 8px rgba(0, 0, 0, 0.15)
                  `,
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
                animate={{
                  textShadow: isRunning
                    ? `
                      0 0 ${phase === "breathe-in" ? "25px" : "20px"} ${
                        phase === "breathe-in" 
                          ? "rgba(99, 102, 241, 0.6)" 
                          : phase === "hold" 
                          ? "rgba(167, 139, 250, 0.5)" 
                          : "rgba(147, 197, 253, 0.5)"
                      },
                      0 2px 16px rgba(0, 0, 0, 0.25),
                      0 1px 8px rgba(0, 0, 0, 0.15)
                    `
                    : `
                      0 0 18px rgba(167, 139, 250, 0.4),
                      0 2px 12px rgba(0, 0, 0, 0.2)
                    `,
                }}
                transition={{ duration: phaseDurSec, ease: "easeInOut" }}
              >
                {label.replace(" ", "\u00A0")}
              </motion.div>

              {/* Duration Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.9)",
                  letterSpacing: "1px",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.2)",
                  marginTop: "2px",
                }}
              >
                {phaseDurSec}s
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Cycle Counter - Minimal Bottom */}
          {cycleCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              style={{
                position: "absolute",
                bottom: "50px",
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.8)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                textShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
              }}
            >
              Cycle {cycleCount}
            </motion.div>
          )}
        </motion.div>

        {/* Glassmorphic Control Buttons */}
        <div style={{ 
          display: "flex", 
          gap: 20, 
          alignItems: "center",
          justifyContent: "center",
        }}>
        <motion.button
          type="button"
          onClick={() => {
            if (!isRunning) {
              const i = PHASES.findIndex((p) => p.name === phase);
              idxRef.current = i >= 0 ? i : 0;
            }
            setIsRunning((s) => !s);
          }}
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: isRunning 
              ? "linear-gradient(135deg, rgba(239, 68, 68, 0.16), rgba(220, 38, 38, 0.1))"
              : "linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(79, 70, 229, 0.12))",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: isRunning 
              ? "2px solid rgba(239, 68, 68, 0.35)" 
              : "2px solid rgba(99, 102, 241, 0.35)",
            boxShadow: isRunning
              ? "0 10px 35px rgba(239, 68, 68, 0.2), inset 0 0 25px rgba(255, 255, 255, 0.12)"
              : "0 10px 35px rgba(99, 102, 241, 0.2), inset 0 0 25px rgba(255, 255, 255, 0.12)",
            fontWeight: 700,
            fontSize: 24,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isRunning ? "rgba(239, 68, 68, 0.85)" : "rgba(99, 102, 241, 0.85)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          whileHover={{ 
            scale: 1.08,
            boxShadow: isRunning
              ? "0 14px 45px rgba(239, 68, 68, 0.28), inset 0 0 30px rgba(255, 255, 255, 0.15)"
              : "0 14px 45px rgba(99, 102, 241, 0.28), inset 0 0 30px rgba(255, 255, 255, 0.15)",
          }}
          whileTap={{ scale: 0.96 }}
          aria-pressed={isRunning}
          aria-label={isRunning ? "Pause breathing exercise" : "Start breathing exercise"}
        >
          {isRunning ? (
            // Pause Icon - Two vertical bars
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="9" y1="5" x2="9" y2="19" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
              <line x1="15" y1="5" x2="15" y2="19" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
            </svg>
          ) : (
            // Play Icon - Triangle pointing right
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}>
              <path 
                d="M8 5.5v13l11-6.5L8 5.5z" 
                fill="currentColor" 
                opacity="0.9"
              />
            </svg>
          )}
        </motion.button>

        <motion.button
          type="button"
          onClick={() => {
            setIsRunning(false);
            setPhase("breathe-in");
            setCycleCount(0);
            idxRef.current = 0;
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(100, 116, 139, 0.1))",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "2px solid rgba(148, 163, 184, 0.35)",
            boxShadow: "0 8px 28px rgba(100, 116, 139, 0.18), inset 0 0 25px rgba(255, 255, 255, 0.1)",
            fontWeight: 700,
            fontSize: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(100, 116, 139, 0.85)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          whileHover={{ 
            scale: 1.08,
            boxShadow: "0 10px 35px rgba(100, 116, 139, 0.25), inset 0 0 30px rgba(255, 255, 255, 0.15)",
          }}
          whileTap={{ scale: 0.96 }}
          aria-label="Reset breathing exercise"
        >
          {/* Reset Icon - Simplified circular arrow */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" opacity="0.9"/>
            <path d="M3 3v5h5" opacity="0.9"/>
          </svg>
        </motion.button>
        </div>
      </div>
    </div>
  );
}

