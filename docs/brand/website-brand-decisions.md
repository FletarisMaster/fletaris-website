# Website brand decisions (fletaris.com)

**Status:** live decisions for the public website, recorded so they can be compared with the
main brand guide (the `fletaris-brand` skill, v1.2, April 2026) and folded into it, or
reverted, in a later brand update.
**Owner:** Sam. **Started:** 2026-10-16 (F36, direction "D · Ledger × Forward Line").
**Design canvas:** https://claude.ai/artifact/3MC7mwt3WKDrzyko5c7Qco (directions A–D + research notes).

Each row says what the guide says, what the website does, and why. "Deviation" rows are the
ones to resolve in the next brand-guide revision.

## Why the website diverges at all

The guide was written for the app and for documents (data-dense, dark sidebar, tables). The
website has a different job: make an investor or a lessor stop scrolling and ask for more.
On 2026-10-16 Sam asked for a fresh, investor-grade look that does not read as AI-generated.
Research behind these decisions:

- **Lessor sites** (AerCap, SMBC Aviation Capital, Avolon, Sumisho Air Lease, BOC Aviation):
  light pages, photos of real aircraft, hard numbers up front, investor relations as a
  first-class section, navy and white.
- **Startup sites known for their brands** (Flexport, Mercury, Brex, Ramp, PostHog):
  sentence-case headlines, the product large in the first screen, real-world photography
  merged with the software UI, one accent colour, an email field in the hero.
- **Guides on the "AI-generated" look**
  ([capitalandcompute.net](https://capitalandcompute.net/blog/fix-ai-slop-design/),
  [impeccable.style](https://impeccable.style/slop),
  [925studios.co](https://www.925studios.co/blog/ai-slop-web-design-guide)): avoid dark mode
  with a glowing accent, tracked-caps eyebrow labels, monospace "A · B · C" meta strings,
  01/02/03 numbering on non-sequences, count-up stats, fade-up on every section, identical
  card grids, "Not X. It's Y." copy, and headlines any competitor could use.

## Decisions

| # | Topic | Brand guide says | Website does | Kind | Why |
|---|---|---|---|---|---|
| W1 | Page ground | Dark mode is "additive"; app surfaces navy/dark | **Light first** (`#FFFFFF`, bands of `#F1F5F9`), with exactly **one** dark navy band per page | Deviation | Every lessor site and the strongest startup sites are light; dark + teal glow is the most common AI-generated tell |
| W2 | Headline case | Big headlines: Outfit Bold **ALL CAPS** | **Sentence case**, Outfit SemiBold (600), tight tracking (−0.02 to −0.025em). Caps only for the logo and small labels | **Deviation (Sam approved 2026-10-16)** | All ten reference sites use sentence case; all-caps on every heading read as shouting and as a template |
| W3 | Headline font | Outfit for headlines | Outfit (unchanged) | Same | |
| W4 | Body font | Outfit | Outfit (unchanged) | Same | |
| W5 | Nav, buttons, labels | Poppins Medium/SemiBold | Poppins (unchanged) | Same | |
| W6 | Monospace | JetBrains Mono for data columns | **Not used for decoration.** No mono eyebrow labels or meta strings; mono only inside product data if ever needed | Narrowing | Mono eyebrows are a listed AI tell |
| W7 | Navy | `#1E2D4A` primary dark | Navy for **all headline and emphasis text** on light, the nav bar, the one dark band, the footer | Same, more prominent | Lessor sites anchor on navy |
| W8 | Teal | `#00C4CC` accent: interactive, highlights | Teal **only as a line or a fill** (rules, the forward line, buttons on navy, numbers on navy). **Never as text on white** (2.2:1 contrast fails) | Narrowing | Accessibility + "one accent" discipline |
| W9 | Gradients, glow, blur | "No gradients, no neon, no blur" | None (unchanged); a flat tint over photos is allowed | Same | |
| W10 | Motion | Not covered | **One** orchestrated motion per page: the forward line draws across the hero; the interactive fleet timeline moves only when the visitor drags it (or plays once on first view). No section fade-ins, no count-ups. All off under `prefers-reduced-motion` | New | Motion everywhere is a listed tell; the forward line is the brand idea ("projected forward") |
| W11 | Signature motif | Not covered | **The forward line**: a thin teal line from "Today" to "In 24 months" with time markers. Used in the hero and as the interactive fleet timeline | New, proposed for the guide | Turns the positioning sentence into a visual everyone can recognise |
| W12 | Photography | Not covered | Real aviation photography only (no AI images); **no readable airline livery, registrations or recognisable faces** (crop, soften or retouch); B&W or flat navy tint allowed. Credits in `public/images/air/CREDITS.txt` | New | Trademark/credibility (F36 D2) and the "real images" request |
| W13 | Product imagery | Not covered | **Real product screens** from the demo recording, shown large, light mode, plainly captioned, always labelled **"Example data"**. No hand-drawn mock widgets | New | "Built, not a concept" is the strongest investor signal |
| W14 | Numbers | "Data-dense" | Only **sourced** figures; market numbers written **into sentences** with their sources underneath, not as giant stat tiles | New | Invented or context-free metrics are a tell and a credibility risk |
| W15 | Density | "Data-dense, not sparse" | Marketing pages are **spacious** (large type, wide margins); density lives in the product screens shown | Deviation (website only) | The site sells; the app works |
| W16 | Cards and radius | Not specified for web | Few cards; **rules and tables** instead of card grids; radius 3–4 px | New | Identical card grids are a tell |
| W17 | Logo on light | Landing page: **Logo_Variation_4** (teal icon + navy wordmark) | Logo sits on the **navy nav bar** (Variation 7 style, white wordmark) because the repo only has the dark-background file | Gap: needs the Variation 4 file | Add `logo-light` (Variation 4) to the repo to put the logo on white |
| W18 | Call to action | Not covered | One action everywhere: **"Request early access"** (F36 D5), with the email field in the hero; investors get a parallel **"Request the investor deck"** | New | One CTA; investors were missing a path |
| W19 | Copy voice | Institutional, not startup-casual | Institutional, plain, specific: no "Not X. It's Y.", no heavy em-dashes, no "supercharge"-type claims; say what the reader can do | Same, made explicit | Listed AI copy tells |
| W20 | Status colours | RAG only for status | RAG only inside product data and the fleet timeline's readiness states (unchanged) | Same | |

## To decide in the next brand-guide revision

1. Adopt W2 (sentence case) for all marketing, or keep caps for print and decks only.
2. Adopt W1/W15 as a "marketing surface" mode next to the app's dark mode.
3. Add W11 (forward line) and W12/W13 (photography and product imagery rules) to the guide.
4. Supply the light-background logo (W17).
