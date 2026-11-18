"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@/components/ui/chip";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is this real money?",
    a: "Not yet. Hasp is currently running on Robinhood Chain Testnet only. Testnet tokens have no real value. We will announce mainnet availability separately.",
  },
  {
    q: "Who holds my funds?",
    a: "You do. Always. Your funds live in your own smart account on-chain. Hasp's keeper only holds a session key — a restricted permission that can only perform the exact actions you signed, within the caps you set.",
  },
  {
    q: "Can Hasp take my money?",
    a: "No. The session key we hold cannot transfer funds to us, cannot exceed your spending caps, and expires within 90 days. The worst case from a stolen keeper key is that allowed swaps could be executed up to your cap — not a full drain. You can revoke all permissions at any time with one transaction.",
  },
  {
    q: "What if the keeper goes down?",
    a: "Rules simply don't fire while the keeper is offline. Your funds remain safely in your smart account. The dashboard shows keeper health and warns you if it's been offline for more than 2 minutes.",
  },
  {
    q: "Is it audited?",
    a: "Not yet. Hasp is an MVP on testnet. We use ZeroDev's battle-tested session-key system and do not deploy custom Solidity in the MVP. A professional audit will happen before any mainnet release with real money.",
  },
  {
    q: "What are stock tokens?",
    a: "Stock tokens are ERC-20 tokens on Robinhood Chain that track the price of publicly traded equities. They are tokenized debt securities issued by Robinhood Assets (Jersey) Limited. They are not available in all jurisdictions — check eligibility at docs.robinhood.com/rhj.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Chip variant="outline" size="md" className="mb-4">FAQ</Chip>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Questions? Good.
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-2 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm">{faq.q}</span>
                <Plus
                  size={18}
                  className={`shrink-0 text-muted transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-4 text-sm text-muted leading-relaxed border-t border-border pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
