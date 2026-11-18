import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { RulesSection } from "@/components/landing/rules-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <Navbar />
      <Hero />
      <RulesSection />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
}
