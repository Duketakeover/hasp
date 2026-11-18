# Hasp: Wallet Automation on Robinhood Chain (3-Week Testnet MVP Spec)

Name: **Hasp**. Tagline: **"Stay steady."** Before using "Hood" or "Robinhood" in the product name or logo, read the brand guidelines at https://docs.robinhood.com/chain/brand-guidelines.

> How to use this file: put it in the repo root as `SPEC.md`. Give Antigravity one phase at a time (see Section 12). Never ask it to build everything in one go.

---

## 1. What we are building

A non-custodial "if this happens, do that" tool for onchain wallets on Robinhood Chain.

Users create rules once. Their own smart account then executes those rules automatically inside strict limits the user signs. We never hold funds.

**Launch rule templates (MVP):**
1. **Take-profit:** when a token reaches N times the user's entry price, sell X% into USDG (optionally park it in a yield vault).
2. **Recurring buy (DCA):** buy a chosen token with a fixed USDG amount on a schedule.

**Stretch templates (only if ahead of schedule):** rebalance to target mix, stop-loss.

**Headline pitch:** "Cash-out autopilot: move speculative profits into steadier assets automatically, without giving up custody."

### Non-goals (do not build)
- No custody, pooled funds, or deposits into our contracts.
- No leverage, borrowing, or perps.
- No investment advice, signals, or recommendations.
- No fiat on/off-ramp, no naira handling.
- No custom Solidity in the MVP (see Section 5). Mock contracts for testnet are the only exception.

---

## 2. Target network facts (verify each one on Day 1)

Source of truth: https://docs.robinhood.com/chain (read these pages first: connecting, account-abstraction, stock-tokens, building-with-stock-tokens, oracles-and-price-feeds, contracts).

| Item | Value | Status |
|---|---|---|
| Testnet chain ID | 46630 | Confirmed in docs |
| Mainnet chain ID | 4663 | Confirmed in docs |
| Testnet RPC | https://rpc.testnet.chain.robinhood.com (or Alchemy: `https://robinhood-testnet.g.alchemy.com/v2/<KEY>`) | Confirmed in docs |
| Testnet explorer | https://explorer.testnet.chain.robinhood.com | Confirmed in docs |
| Testnet faucet | https://faucet.testnet.chain.robinhood.com | Confirmed in docs |
| Gas token | ETH | Confirmed |
| Account abstraction | ERC-4337 and EIP-7702 supported; Alchemy primary, ZeroDev alternative | Confirmed for mainnet docs; VERIFY testnet |
| EntryPoint addresses | v0.6, v0.7, v0.8 are listed in the account-abstraction docs page | VERIFY which exist on testnet |
| Stock Tokens | ERC-20, 18 decimals, Chainlink feed per token, `uiMultiplier()` per ERC-8056 | Confirmed |
| Stock Token trading status | `GET https://api.robinhood.com/rhj/assets` returns `tradingCapabilities` per session | Confirmed; check before any stock-token trade |
| USDG | Primary stablecoin, 6 decimals | VERIFY address on the docs "Token Contracts" page |
| Uniswap, Morpho, Chainlink feeds on testnet | Unknown | **VERIFY on Day 1. If missing, use mocks (Section 9).** |

If any VERIFY item fails, do not guess. Use the fallback in Section 9 and record the result in `docs/verified-facts.md`.

---

## 3. Architecture

```
[Next.js web app] <--> [Supabase Postgres] <--> [Keeper service (Node/TS)]
       |                                              |
       | wallet connect + sign session key            | price reads, simulation, userops
       v                                              v
 [User smart account (ZeroDev Kernel, ERC-4337)] <-- [Bundler + Paymaster (Alchemy/ZeroDev)]
       |
       v
 [Robinhood Chain: DEX router, USDG, Stock Tokens, Chainlink feeds, optional yield vault]
```

**Principles**
- The user's smart account holds all funds. Only the user can withdraw.
- The keeper holds a **session key** that is restricted by an onchain policy (allowed contracts, allowed functions, token allowlist, spend caps, expiry, rate limit).
- The keeper simulates every action before sending and refuses anything outside guard limits.
- Everything the keeper does is logged and visible to the user.

---

## 4. Tech stack

- **Web:** Next.js (App Router), TypeScript, Tailwind, wagmi + viem, shadcn/ui.
- **Accounts:** ZeroDev SDK (`@zerodev/sdk`, Kernel account, `@zerodev/permissions` for session-key policies). Verify package names and chain support against current ZeroDev docs.
- **Bundler/paymaster:** Alchemy (primary) with a Gas Manager policy; ZeroDev paymaster as alternative.
- **Backend keeper:** Node.js + TypeScript, `tsx`, runs as a single long-lived process (Railway or Fly.io).
- **Database:** Supabase (Postgres).
- **Notifications:** Telegram bot (simplest for a crypto audience).
- **Testing:** Vitest for logic, Playwright for one end-to-end flow, optional Foundry for mock contracts.
- **Hosting:** Vercel (web), Railway/Fly (keeper).

**UI libraries:** Tailwind with CSS variables for design tokens, shadcn/ui as the base, Framer Motion for animation, `next/font` for Inter (or Geist) and a monospace font (JetBrains Mono or Geist Mono).

**Fallback if ZeroDev does not support chain 46630:** use `permissionless.js` with a Safe 4337 account (the docs list a Safe Module Setup contract), or the EIP-7702 delegation path. Decide on Day 1.

---

## 4A. UI and design direction (important)

**Design-first rule:** the polished design exists from the very start, not as a final coat of paint. The project is built in public, so every milestone must produce screenshots and clips that look finished and are ready to post. Build each screen first as a fully styled static screen with realistic mock data, then wire it to real logic as the backend features land. No lorem ipsum, no default component-library look, no unstyled placeholder pages at any point.

**Design quality bar (check every screen):**
- Real, believable copy and numbers (clearly labelled as testnet or example data).
- Designed empty states, loading skeletons, error states and success states.
- Consistent spacing scale, one type scale, hairline borders, nothing misaligned.
- Looks sharp on a phone (390px wide) and on desktop (1440px wide), in high resolution.
- No layout shift, smooth 60fps animation, no console errors.
- If it would not look good as a screenshot on social media, it is not done.

**Goal:** a sleek, premium, dark fintech look in the same spirit as Rooq (https://rooq.trade, @rooqtrade on X): quiet, confident, high-end, with a warm glow behind the hero and clean data cards. It must feel *similar in vibe* but be an **original identity**.

**Do not copy:** Rooq's name, logo, wording, illustrations, GIFs, icons or exact layouts. Study the feel, spacing and structure, then make our own.

**Reference material (give these to Antigravity):**
- Save the screenshots of Rooq's X profile, article and posts into `/design/reference/`.
- Have the agent open https://rooq.trade in its browser and study: top navigation, hero, the interactive "own it or trade it" comparison, the step-by-step "from deposit to receipt" flow, the "what each person sees" explainer, the "check it yourself" link-card grid, FAQ and footer.
- It should write a short `docs/design-notes.md` describing what it observed (spacing, type scale, card style, motion) before building anything.

### Visual language
- **Mood:** near-black background, one strong accent, soft radial glow behind the hero, thin hairline borders, generous spacing, nothing cluttered.
- **Accent:** default to electric blue `#2F7BFF` with a blue-to-transparent radial glow (this keeps us visually distinct from Rooq's orange). Make the accent a single CSS variable so it can be swapped to another colour in minutes.
- **Typography:** clean sans-serif (Inter or Geist) for headings and body, with a monospace font for all numbers, prices, addresses, block numbers and tx hashes. Headlines large and tight; muted grey for secondary text.
- **Shapes:** rounded cards (16px radius), pill buttons and chips, 1px low-contrast borders, subtle inner glow on important cards.
- **Data panels:** a monospace "terminal-style" card showing rule details and live status, in the style of a compact data table with a thin progress bar (used for "how close the price is to your trigger").
- **Motion:** subtle only. Count-up numbers, soft fades between steps, a gentle glow pulse on the live status dot. Respect `prefers-reduced-motion`.
- **Mobile first:** most users will be on phones. Use bottom sheets for review/confirm, large tap targets, no horizontal scrolling.

### Design tokens (put in `globals.css`, adjust freely)
```css
:root {
  --bg: #0B0E11;
  --surface: #12161A;
  --surface-2: #181D22;
  --border: rgba(255,255,255,0.08);
  --text: #F5F7FA;
  --muted: #8B95A1;
  --accent: #2F7BFF;
  --accent-glow: rgba(47,123,255,0.28);
  --positive: #3DDC97;
  --warning: #FF6B5A;   /* used for risk, triggers, liquidation-style warnings */
  --radius: 16px;
}
```

### Page structure
**Landing page**
1. Top nav: wordmark, Rules, How it works, Docs, and a "Launch app" button.
2. Hero: one big headline, one sentence of support, one primary button. Behind it, the soft glow. Beside or below it, an animated demo card showing a rule firing (price climbing to a trigger, then a receipt appears).
3. "Own it or automate it": an interactive slider comparing what happens with and without autopilot.
4. "Set it once, we handle the rest": a 5-step stepper: Connect, Set a rule, Sign limits, Hasp runs, Get a receipt. Each step shows "what you do" and "what autopilot can do" side by side.
5. "Check it yourself" grid of link cards: contracts and what they do, live system status, risks in plain words, docs.
6. FAQ accordion (Is this real money? Who holds my funds? Can it take my money? What if it fails? Is it audited?).
7. Footer with testnet and risk disclaimers.

**App**
- Dashboard: active rules as cards with status chips, a live "Keeper online" dot, recent executions, total value protected/moved.
- New rule wizard: template picker (segmented control), form with sliders for multiples and percentages, a plain-language preview card, then a review sheet showing the exact limits being signed.
- Rule detail: trigger progress bar, execution history, pause and revoke.
- Execution receipt card: what triggered, price, amounts, tx link, in monospace.
- Settings: Telegram, "Revoke all" in a clearly marked danger zone.
- Always label demo content with a visible "Testnet, example data" badge.

### Brand assets
- Wordmark only for now (text logo); a simple glyph can come later.
- Social/OG image (1200x630): dark background with glow, a short headline and the logo only. Keep text minimal; details belong in the post.

---

## 5. Why no custom Solidity in the MVP

Session-key restrictions are provided by the ZeroDev permissions system (call policy, spending limit, rate limit, timestamp policy). This keeps the attack surface small and the build vibecode-friendly. Only add a custom policy contract after the MVP works and only with human review.

---

## 6. Repo structure

```
/apps/web            Next.js app
/apps/keeper         Node keeper service
/packages/shared     Types, zod schemas, chain config, ABIs
/packages/rules      Pure functions: trigger evaluation, guard checks (fully unit-tested)
/contracts           Mock contracts for testnet only (MockToken, MockDex, MockOracle)
/design/reference    Reference screenshots (Rooq) for visual study only
/docs                verified-facts.md, design-notes.md, runbook.md, threat-model.md
SPEC.md
```

---

## 7. Data model (Postgres)

```sql
users(id, address unique, telegram_chat_id, created_at)

accounts(id, user_id, smart_account_address, chain_id, created_at)

rules(
  id, user_id, account_id,
  template text,                 -- 'TAKE_PROFIT' | 'DCA' | later 'REBALANCE','STOP_LOSS'
  params jsonb,                  -- validated by zod per template
  status text,                   -- ACTIVE | EXECUTING | COMPLETED | FAILED | PAUSED | REVOKED | EXPIRED
  session_key_address text,
  permission_blob text,          -- serialized signed permission account
  max_total_usd numeric,         -- hard cap across all runs
  expires_at timestamptz,
  created_at, updated_at
)

executions(
  id, rule_id, status,           -- SIMULATED | SUBMITTED | CONFIRMED | FAILED | SKIPPED
  trigger_price numeric, amount_in text, amount_out text,
  userop_hash text, tx_hash text,
  reason text,                   -- why skipped/failed (guard name)
  created_at
)

events(id, rule_id, level, message, created_at)   -- audit log shown in UI
```

Row-level security: users can only read their own rows. The keeper uses a service key stored only in server env vars.

---

## 8. Rule templates (zod schemas)

### TAKE_PROFIT
```ts
{
  tokenIn: Address,              // token to sell
  tokenOut: Address,             // default USDG
  entryPriceUsd: number,         // captured at rule creation from the price source
  targetMultiple: number,        // e.g. 3 means trigger at 3x entry
  sellPercent: number,           // 1..100 of balance at trigger time
  maxSlippageBps: number,        // default 200, hard max 500
  parkInVault?: Address          // optional yield vault for the proceeds
}
```
Trigger: `currentPriceUsd >= entryPriceUsd * targetMultiple`, confirmed on two consecutive checks (anti-spike).

### DCA
```ts
{
  tokenIn: Address,              // usually USDG
  tokenOut: Address,
  amountPerRun: string,          // in tokenIn units
  intervalSeconds: number,       // min 3600
  maxRuns: number,
  maxSlippageBps: number
}
```
Trigger: `now >= lastRunAt + intervalSeconds` and `runsCompleted < maxRuns`.

---

## 9. Price sources and testnet fallbacks

**Priority order**
1. **Stock Tokens:** the Chainlink feed for that token (read `latestRoundData`, reject if stale beyond the feed heartbeat).
2. **Other tokens (e.g. memecoins):** DEX pool price via a time-weighted average, plus a quoter call for the actual executable price.
3. **Sanity check:** if two sources exist and differ by more than 5%, skip and log.

**Testnet fallback (likely needed):** deploy in `/contracts`:
- `MockToken` (ERC-20, mintable, 18 decimals) to act as a "memecoin."
- `MockOracle` (owner can set price).
- `MockDex` with `swapExactIn(tokenIn, tokenOut, amountIn, minOut, recipient)` priced from `MockOracle`.

Add an **admin-only Demo page** (`/admin/demo`) with a slider that sets the mock price. This lets you trigger rules live on camera for the Open House demo and pitches.

---

## 10. Keeper logic (apps/keeper)

Loop every 15 seconds:

1. Load all `ACTIVE` rules not expired.
2. For each rule, fetch price(s) and evaluate the trigger using `packages/rules` (pure function, no network).
3. If triggered, atomically set status to `EXECUTING` (DB row lock) so no duplicate runs.
4. Run **guards** (all must pass, otherwise log `SKIPPED` with the guard name):
   - Price data fresh and sources agree.
   - Pool liquidity above a minimum.
   - Price impact below the rule's limit.
   - Executable quote within `maxSlippageBps` of oracle price.
   - Stock Token: `tradingCapabilities` says tradable for the current session.
   - Amount within `max_total_usd` and the daily cap.
   - Gas cost below a cap.
   - Global kill switch not enabled.
5. Build a batched UserOperation: `approve` plus `swap` (plus optional vault `deposit`). The recipient of every swap **must be the user's own smart account**.
6. **Simulate** (bundler estimate / `eth_call`). If simulation fails, mark `FAILED` with the revert reason and notify the user.
7. Sign with the session key and submit via the bundler. Wait for receipt (timeout 60 s).
8. Write the `executions` row, update the rule (`COMPLETED`, or back to `ACTIVE` for DCA), send a Telegram message.

**Reliability rules**
- Idempotency key per (rule, trigger window).
- Max 2 retries with backoff, then `FAILED`.
- A `/health` endpoint plus heartbeat row in the DB; the web app shows "Keeper last seen X seconds ago" and a warning banner if older than 2 minutes.
- Graceful shutdown: finish in-flight executions.

---

## 11. Session-key policy (critical, review by hand)

For each rule, the user signs a permission with these restrictions:

- **Allowed targets:** only the DEX router (or MockDex), the specific token contracts in the rule, and the optional vault.
- **Allowed functions:** `approve` (spender must equal the router), the swap function, and vault `deposit`. Nothing else.
- **Swap recipient:** must equal the user's smart account address.
- **Native ETH value:** 0.
- **Spending limit:** maximum amount of `tokenIn` per period, matching `max_total_usd`.
- **Rate limit:** at most N operations per day.
- **Expiry:** default 30 days, max 90.
- **Revocation:** the "Revoke all" button removes every active permission from the account in one transaction.

Write `docs/threat-model.md` covering: stolen session key, malicious token (honeypot), price manipulation, keeper downtime, wrong policy configuration. The worst case from a stolen session key must be "can execute allowed swaps up to the cap," never "can drain the wallet."

---

## 12. Three-week plan (15 working days)

### Week 1: Design-first foundation, polished UI with mock data, working smart account

(The order below changed so the product looks finished from Day 2 onward. Backend features are then wired into the already-polished screens.)

**Day 1: Verification spike (do not skip)**
- Read the Robinhood Chain docs pages listed in Section 2.
- Confirm on testnet: bundler support, EntryPoint versions, Uniswap/Morpho/Chainlink availability, USDG and Stock Token addresses, ZeroDev support for chain 46630.
- Write results to `docs/verified-facts.md`. Choose ZeroDev vs Safe/permissionless fallback.
- **Design (Section 4A):** study the reference screenshots and rooq.trade, write `docs/design-notes.md`, set the design tokens and fonts, and build the base components (button, card, chip, tabs, slider, data panel, bottom sheet).
- *Acceptance:* a one-page decision record exists, and a component sheet page looks polished on phone and desktop.

**Day 2: Project setup and the full landing page**
- Monorepo, shared types, chain config, env handling, Supabase schema, CI (lint + tests).
- Complete landing page per Section 4A: nav, hero with glow and animated demo card, "own it or automate it" slider, 5-step stepper, "check it yourself" cards, FAQ, footer. Deploy it to Vercel.
- *Acceptance:* `pnpm test` and `pnpm build` pass, the landing page is live on a preview URL and passes the design quality bar. **Post-ready: landing page reveal.**

**Day 3: App shell with polished mock data**
- Build every app screen in the final style using realistic mock data: dashboard, new-rule wizard (both templates), review bottom sheet, rule detail with trigger progress bar, execution receipt card, activity log, settings with "Revoke all." Include empty, loading, error and success states.
- *Acceptance:* the full app flow can be clicked through with mock data and passes the design quality bar. **Post-ready: app UI preview.**

**Day 4: Smart account and mock contracts**
- Wallet connect, create the Kernel (or Safe) account on testnet, show address and balances in the real UI, fund from faucet. Deploy MockToken, MockOracle, MockDex if real DEX is absent.
- *Acceptance:* one sponsored transaction from the smart account is confirmed on the explorer, and the dashboard shows the real account address and balances.

**Day 5: Session key proof**
- Include a one-click batched swap (approve plus swap) from the smart account as the first step.
- Create a session key with the Section 11 policy. Prove two things with tests: an **allowed** swap succeeds, and a **disallowed** call (wrong recipient, wrong contract, over cap) is rejected. Show both outcomes in the UI.
- *Acceptance:* automated test covers both cases. This is the most important day of the project.

### Week 2: Keeper and rules

**Day 6:** `packages/rules`: trigger evaluators and guard functions with full unit tests (edge cases: stale price, spike, zero balance, expired rule).

**Day 7:** Price service: Chainlink reader, pool TWAP reader, mock oracle reader, staleness and deviation checks.

**Day 8:** Keeper loop: load rules, evaluate, lock, guard, simulate. Dry-run mode only (no sending).

**Day 9:** Keeper execution: build userop, sign with session key, submit, confirm, log, Telegram notification. First live automatic execution.
- *Acceptance:* move mock price with the demo slider, rule fires within 30 seconds, funds land in the user's account.

**Day 10:** DCA template, `max_total_usd` and daily caps, idempotency, retry logic, heartbeat and health banner.

### Week 3: Product, safety, and launch material

**Day 11:** Wire the existing rule builder to real logic: real price previews, plain-language summary, review sheet showing the exact limits being signed, session-key signing flow, rule saved to the database. Keep the design identical to the Day 3 shell.

**Day 12:** Wire the dashboard and rule detail to real data: live rule status, trigger progress bar from real prices, real execution receipts, activity log, keeper health dot, pause/resume, working "Revoke all." Remove all remaining mock data except the clearly labelled demo mode.

**Day 13:** Safety pass: threat model doc, fuzz the rule schemas, test honeypot token (sell reverts), test thin-liquidity pool, test keeper restart mid-execution, secrets audit (no keys in client code or git).

**Day 14:** Polish and docs: complete the landing page sections (stepper, "own it or automate it" slider, "check it yourself" cards, FAQ), motion polish, OG image, clear risk disclosures (Section 14), onboarding, error messages, runbook, Playwright end-to-end test, and a mobile design review.

**Day 15:** Demo and submission: 2-minute demo video using the demo slider, testnet deployment live, README, Open House submission (check https://openhouse.arbitrum.io for open rounds).

### Cut list if you fall behind (in this order)
1. Optional vault parking.
2. Telegram (use email or in-app only).
3. Playwright test (keep unit tests).
4. DCA (ship take-profit only).
Never cut: session-key policy tests, simulation before send, "Revoke all," and the design polish of the landing page and the demo flow.

---

## 12A. Build-in-public plan (shareable moments)

Every milestone below must produce clean, high-resolution screenshots and a short screen recording that are ready to post. Always keep the "Testnet, example data" badge visible so followers know what they are looking at.

| Day | Shareable moment | Asset to capture |
|---|---|---|
| 2 | Landing page reveal | Full-page scroll recording, hero screenshot with glow |
| 3 | App UI preview (mock data) | Dashboard, rule builder and receipt screenshots |
| 5 | "Hasp can only do what you allow" | Clip: an allowed swap succeeds, a disallowed one is blocked |
| 9 | **First automatic execution** | Clip: move the demo price slider, rule fires, receipt appears, Telegram alert |
| 12 | Live dashboard | Screenshots with real testnet data, keeper-online dot |
| 13 | "We tried to break it" | Safety tests recap: honeypot token, thin pool, keeper restart |
| 15 | Public testnet launch and demo video | 2-minute demo, launch thread assets |

**Capture rules**
- Add a `/demo` seed mode with clean, attractive example data so screenshots are always presentable.
- Record at 2x resolution; export screenshots at 1440px desktop and 390px mobile widths.
- Build a reusable `og`/social image generator route: dark background with glow, a short headline and the logo only (minimal text, details go in the post). Leave a small corner space for the creator's profile picture.
- Each milestone gets a one-line summary written in `docs/progress-log.md` so posts are easy to write.

---

## 13. How to work with Antigravity

- Use planning mode and **review the plan before it executes**.
- Give it one day's scope at a time, with the acceptance line from Section 12.
- Start every session with: "Read SPEC.md and docs/verified-facts.md. Do not assume any contract address or API; use only verified facts or ask me."
- Require tests with every feature, and make it run them.
- Tell it explicitly: never put private keys, service keys or API keys in client code or commit them; use `.env` and `.env.example`.
- After Day 5 and Day 9, review the session-key policy and signing code yourself line by line, or have a second model review it with the threat model.

**Starter prompt for Day 1:**
> Read SPEC.md. Visit the Robinhood Chain docs pages listed in Section 2. For each VERIFY item, check it and write the finding with a source URL into docs/verified-facts.md. Mark anything you cannot confirm as UNKNOWN. Then propose, in the plan, whether we use ZeroDev Kernel or the Safe/permissionless fallback, and why. Do not write application code yet.

**Starter prompt for the design foundation (Day 2):**
> Read SPEC.md Section 4A. Open the screenshots in /design/reference and browse https://rooq.trade. Write docs/design-notes.md describing the layout, spacing, type scale, card style and motion you observe. Then build our own original design system: tokens in globals.css, base components, and a static landing hero with a blue glow. Match the premium dark vibe, but do not copy Rooq's name, logo, copy, illustrations or exact layout. Show me a screenshot at phone width and desktop width for review.

**Starter prompt for the app shell (Day 3):**
> Read SPEC.md Sections 4A and 12. Build every app screen in the final visual style using realistic mock data: dashboard, new-rule wizard for both templates, review bottom sheet, rule detail with a trigger progress bar, execution receipt card, activity log and settings with a danger zone. Include empty, loading, error and success states. Apply the design quality bar in Section 4A. Screenshot every screen at 390px and 1440px and show me before moving on. Do not wire any backend yet.

**Starter prompt for Day 5:**
> Implement the session-key policy exactly as described in SPEC.md Section 11 for the MockDex swap. Write tests proving an allowed swap succeeds and that each of these is rejected: wrong recipient, wrong contract, wrong function, amount over the cap, expired permission, and rate limit exceeded. Show me the policy config for review before moving on.

---

## 14. Risk disclosures to show users

- Automation runs only while our keeper service is online. If it is down, rules do not fire.
- Prices can be manipulated or stale on thin markets; we apply limits but cannot guarantee exits.
- Some tokens cannot be sold (honeypots). Simulation catches many cases but not all.
- Stock Tokens are tokenized debt securities issued by Robinhood Assets (Jersey) Limited and are not available in some jurisdictions (including the US, Canada, UK, Switzerland). Check eligibility.
- This is a tool, not financial advice.

## 15. Legal and compliance notes (get professional advice before mainnet)

- Automated execution on behalf of users may attract regulatory attention in some countries even when non-custodial. Get a fintech lawyer's view before real money.
- Stay non-custodial and rule-based; do not recommend assets or strategies.
- Restrict access by jurisdiction where required (see Robinhood's restricted list at https://docs.robinhood.com/rhj).

## 16. Success criteria for the testnet MVP

- End-to-end demo: create rule, move mock price, automatic execution, funds in user account, Telegram alert.
- At least 3 external testers complete the flow without help.
- Zero executions outside policy across all tests.
- Trigger-to-submission under 30 seconds in 95% of runs.
- "Revoke all" works and the keeper can no longer act afterwards (tested).

## 17. After the MVP

Rebalance and stop-loss templates, yield-vault parking on mainnet, agent-proposed rules with user approval, multi-asset conditions, then a professional security review before any mainnet release with capped balances.
