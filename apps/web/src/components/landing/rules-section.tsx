"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { TrendingUp, RefreshCw, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "take-profit",
    icon: TrendingUp,
    label: "Take-Profit",
    chip: "Most popular",
    chipVariant: "accent" as const,
    description:
      "Automatically sell a portion of your position when it hits your target multiple. Lock in gains without watching the charts.",
    example: "Sell 50% of PEPE when it reaches 3× my entry price",
  },
  {
    id: "dca",
    icon: RefreshCw,
    label: "Recurring Buy",
    chip: "DCA",
    chipVariant: "default" as const,
    description:
      "Buy a fixed amount of any token on a schedule. Dollar-cost average without thinking about it.",
    example: "Buy $50 of ETH every week",
  },
];

export function RulesSection() {
  const [active, setActive] = useState("take-profit");

  return (
    <section id="rules" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Chip variant="outline" size="md" className="mb-4">
            Rule templates
          </Chip>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Two rules. That&apos;s it.
          </h2>
          <p className="text-muted text-lg max-w-lg mx-auto">
            We built the two most useful automations, done right, instead of
            twenty half-baked ones.
          </p>
        </motion.div>

        <div className="flex gap-3 justify-center mb-10">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-medium border transition-all duration-200",
                active === t.id
                  ? "bg-accent text-white border-accent shadow-[0_0_20px_4px_var(--color-accent-glow)]"
                  : "bg-surface-2 text-muted border-border hover:border-border-hover hover:text-text"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {templates
          .filter((t) => t.id === active)
          .map((t) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto"
              >
                <Card variant="glow" className="text-center space-y-4">
                  <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-accent/10 flex items-center justify-center mx-auto">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{t.label}</h3>
                      <Chip variant={t.chipVariant}>{t.chip}</Chip>
                    </div>
                    <p className="text-muted">{t.description}</p>
                  </div>
                  <div className="bg-surface rounded-[var(--radius-md)] px-4 py-3 text-sm font-mono text-muted text-left border border-border">
                    <span className="text-muted/50 mr-2">eg.</span>
                    {t.example}
                  </div>
                </Card>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
}
