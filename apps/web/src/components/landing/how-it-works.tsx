"use client";

import { motion } from "framer-motion";
import { Chip } from "@/components/ui/chip";
import { Wallet, Settings, Shield, Zap, FileText } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Wallet,
    you: "Connect your wallet",
    autopilot: "Creates your smart account",
    detail: "A non-custodial smart account is deployed for you on Robinhood Chain.",
  },
  {
    num: "02",
    icon: Settings,
    you: "Pick a rule template",
    autopilot: "Shows you exactly what it will do",
    detail: "Choose take-profit or recurring buy. Fill in your targets and limits.",
  },
  {
    num: "03",
    icon: Shield,
    you: "Sign the limits",
    autopilot: "Only those exact actions, nothing more",
    detail: "You sign a session key that restricts what the keeper can do — specific contracts, specific functions, spending caps, expiry.",
  },
  {
    num: "04",
    icon: Zap,
    you: "Walk away",
    autopilot: "Watches prices and executes when triggered",
    detail: "Every 15 seconds our keeper checks prices. When a rule triggers, it simulates first, then executes.",
  },
  {
    num: "05",
    icon: FileText,
    you: "Get a receipt",
    autopilot: "Sends you the execution receipt",
    detail: "Every execution logs the trigger price, amounts, tx hash, and a Telegram notification.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Chip variant="outline" size="md" className="mb-4">
            How it works
          </Chip>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Set it once, we handle the rest.
          </h2>
          <p className="text-muted text-lg max-w-lg mx-auto">
            Five steps from connecting your wallet to automatic execution —
            your funds never leave your control.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface border border-border rounded-[var(--radius-lg)] p-5 grid grid-cols-[auto_1fr_1fr] md:grid-cols-[48px_1fr_1fr] gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5 font-mono">{step.num} · You</p>
                  <p className="font-medium text-sm">{step.you}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed hidden md:block">{step.detail}</p>
                </div>
                <div className="border-l border-border pl-4">
                  <p className="text-xs text-muted mb-0.5 font-mono">{step.num} · Hasp</p>
                  <p className="font-medium text-sm text-accent">{step.autopilot}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
