import Link from "next/link";
import { Chip } from "@/components/ui/chip";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold">hasp</span>
              <Chip variant="outline" size="sm">testnet</Chip>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Non-custodial wallet automation on Robinhood Chain. This is a testnet demo. No real funds.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <p className="text-muted text-xs font-medium uppercase tracking-wider">Product</p>
              <div className="space-y-2">
                <Link href="#rules" className="block text-muted hover:text-text transition-colors">Rules</Link>
                <Link href="#how-it-works" className="block text-muted hover:text-text transition-colors">How it works</Link>
                <Link href="/app" className="block text-muted hover:text-text transition-colors">Launch app</Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-muted text-xs font-medium uppercase tracking-wider">Chain</p>
              <div className="space-y-2">
                <a href="https://docs.robinhood.com/chain" target="_blank" rel="noopener noreferrer" className="block text-muted hover:text-text transition-colors">RH Chain docs</a>
                <a href="https://explorer.testnet.chain.robinhood.com" target="_blank" rel="noopener noreferrer" className="block text-muted hover:text-text transition-colors">Explorer</a>
                <a href="https://faucet.testnet.chain.robinhood.com" target="_blank" rel="noopener noreferrer" className="block text-muted hover:text-text transition-colors">Faucet</a>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-muted text-xs font-medium uppercase tracking-wider">Legal</p>
              <div className="space-y-2">
                <a href="https://docs.robinhood.com/rhj" target="_blank" rel="noopener noreferrer" className="block text-muted hover:text-text transition-colors">RH eligibility</a>
              </div>
            </div>
          </div>
        </div>

        {/* Risk disclosures */}
        <div className="border-t border-border pt-8 space-y-2">
          <p className="text-xs text-muted/60 leading-relaxed">
            ⚠️ <strong className="text-muted">Testnet only.</strong> This application runs on Robinhood Chain Testnet (chain ID 46630). All tokens are valueless test tokens. Do not send real funds.
          </p>
          <p className="text-xs text-muted/60 leading-relaxed">
            Automation runs only while the keeper service is online. Prices can be manipulated or stale on thin markets. Some tokens cannot be sold (honeypots) — simulation catches many cases but not all.
          </p>
          <p className="text-xs text-muted/60 leading-relaxed">
            Stock Tokens are tokenized debt securities issued by Robinhood Assets (Jersey) Limited. Not available in some jurisdictions including the US, Canada, UK, and Switzerland. This is not financial advice.
          </p>
          <p className="text-xs text-muted/40 mt-4">
            © 2026 Hasp. Built on Robinhood Chain.
          </p>
        </div>
      </div>
    </footer>
  );
}
