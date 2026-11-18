# Design Notes — Hasp

> Observations from studying rooq.trade. For inspiration only. We build our own original identity.

## What We Observed at Rooq

### Layout
- Floating pill nav (centered, blur backdrop)
- Each section has dramatic breathing room: `clamp(64px, 8vw, 120px)` vertical padding
- Max container width ~1200px
- Alternating dark/light section rhythm keeps scroll engaging
- 5-step horizontal stepper tied to live interactive receipt widget

### Typography
- **Primary font:** Instrument Sans (neo-grotesque, humanist warmth)
- **Mono font:** IBM Plex Mono for all numbers, prices, addresses
- **H1 weight: regular (400)!** — counter-intuitively calm and editorial, not bold-shouting
- Tight tracking (`-0.02em`), `text-wrap: balance`, `line-height: 1.08`
- Body: 15–16px, `line-height: 1.55`

### Color
- Near-black: `#0c0f10` (obsidian with green/slate undertone)
- Surface: `#141a1c`
- Accent: **warm amber/terracotta** `#e9a67e` / `#d97746` — this is Rooq's signature
- Positive: `#32b88f` (minty emerald)
- Muted: `#718284`

### Cards
- `border-radius: 20px`
- 1px hairline borders, almost no shadows
- Generous 24–32px padding
- Flat elevation through tonal surface shifts

### Buttons
- Full pill shape everywhere (`border-radius: 9999px`)
- Primary = solid white bg with dark text
- Ghost = 1px border, transparent, hover fills

### Motion
- Very restrained: 150–200ms ease-out
- Interactive sliders update numbers instantly
- No particles, no WebGL, no scroll-jacking

### Signature interaction
- **Data masking** (••••••) with eye toggle = Rooq's identity

---

## Hasp Differentiation (Our Identity)

We study the **vibe** (quiet confidence, editorial luxury, premium dark fintech) but build everything differently:

| Element | Rooq | Hasp |
|---------|------|------|
| Accent color | Warm amber/terracotta | Electric blue `#2F7BFF` |
| Glow | Amber radial bloom | Blue radial glow |
| Font (primary) | Instrument Sans | Inter / Geist |
| Font (mono) | IBM Plex Mono | JetBrains Mono |
| H1 weight | Regular (400) | Bold (700) — we're more assertive |
| Background | `#0c0f10` (greenish) | `#0B0E11` (neutral) |
| Theme rhythm | Dark ↔ Light alternating | Consistently dark |
| Signature element | Privacy masking | Rule execution receipt |

## Our Design Principles

1. **Premium dark, monospace data** — all numbers in JetBrains Mono
2. **Blue glow accent** — single accent, one CSS variable, easy to swap
3. **Cards with inner glow** — accent glow on important cards
4. **Status dot** — live blinking dot for keeper health
5. **Generous spacing** — nothing crowded, everything breathes
6. **Mobile first** — 390px wide is the primary canvas

## Key Screens
- Landing: hero + glow + animated demo card
- App: dashboard with rule cards + keeper status
- Rule wizard: template picker → form → plain-language review → sign
- Rule detail: trigger progress bar + execution history
- Settings: Telegram + Revoke All (danger zone)
