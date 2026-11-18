"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusDot } from "@/components/ui/status-dot";
import { Chip } from "@/components/ui/chip";
import { ProgressBar } from "@/components/ui/data-panel";
import { TrendingUp, Check, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated counter
function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono">
      {prefix}
      {display.toFixed(2)}
    </span>
  );
}

export function DemoCard() {
  const [phase, setPhase] = useState<"watching" | "triggered" | "receipt">(
    "watching"
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("triggered"), 3000),
      setTimeout(() => setPhase("receipt"), 5000),
      setTimeout(() => setPhase("watching"), 8000),
    ];
    const interval = setInterval(() => {
      setPhase("watching");
      timers.push(
        setTimeout(() => setPhase("triggered"), 3000),
        setTimeout(() => setPhase("receipt"), 5000),
        setTimeout(() => setPhase("watching"), 8000)
      );
    }, 8500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute inset-0 rounded-[var(--radius-lg)] bg-accent/5 blur-xl" />

      <div className="relative bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Take-Profit Rule</p>
              <p className="text-xs text-muted">PEPE → USDG at 3×</p>
            </div>
          </div>
          <StatusDot
            status={phase === "receipt" ? "online" : "online"}
            label={phase === "receipt" ? "Executed" : "Watching"}
          />
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Price row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Current price</span>
            <span className="font-mono text-sm">
              $
              {phase === "watching" ? (
                <AnimatedNumber value={0.0000234} />
              ) : (
                <span className="text-positive">0.0000702</span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Target (3× entry)</span>
            <span className="font-mono text-sm text-muted">$0.0000702</span>
          </div>

          {/* Progress */}
          <ProgressBar
            value={phase === "watching" ? 65 : 100}
            variant={phase === "watching" ? "accent" : "positive"}
            label="Progress to trigger"
          />

          {/* Receipt overlay */}
          <AnimatePresence>
            {phase === "receipt" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-surface-2 border border-positive/20 rounded-[var(--radius-md)] p-4 space-y-2"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-positive/20 flex items-center justify-center">
                    <Check size={14} className="text-positive" />
                  </div>
                  <span className="text-sm font-medium text-positive">
                    Execution Complete
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Sold</span>
                  <span className="font-mono">50% PEPE</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Received</span>
                  <span className="font-mono text-positive">1,247.50 USDG</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Tx</span>
                  <span className="font-mono text-accent text-[10px]">
                    0x7f3a...c921
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === "triggered" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 py-2"
            >
              <ArrowRightLeft size={14} className="text-accent animate-spin" />
              <span className="text-xs text-accent">Executing swap...</span>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <Chip variant="accent" size="sm">Testnet</Chip>
          <span className="text-[10px] text-muted/50 font-mono">
            Example data
          </span>
        </div>
      </div>
    </div>
  );
}
