"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DemoCard } from "./demo-card";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/15 blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Chip variant="accent" size="md" className="mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-positive status-dot text-positive" />
              Live on Robinhood Chain Testnet
            </Chip>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              Cash-out
              <br />
              <span className="text-accent">autopilot.</span>
            </h1>

            <p className="text-lg text-muted max-w-md mb-8 leading-relaxed">
              Move speculative profits into steadier assets automatically,
              without giving up custody. Set rules once — your smart account
              handles the rest.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="xl" asChild>
                <Link href="/app">
                  Launch app
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <a href="#how-it-works">How it works</a>
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted/60">
              Non-custodial · Open source · Testnet only
            </p>
          </motion.div>

          {/* Right: Animated demo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <DemoCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
