# Website brand decisions (fletaris.com)

**Status:** live decisions for the public website, recorded so they can be compared with the
main brand guide (the `fletaris-brand` skill, v1.2, April 2026) and folded into it, or
reverted, in a later brand update.
**Owner:** Sam. **Started:** 2026-10-16 (F36, direction "D · Ledger × Forward Line").
**Design canvas:** https://claude.ai/artifact/3MC7mwt3WKDrzyko5c7Qco (directions A–D + research notes).
**Revision 21 Oct 2026 (direction v2, "last major update of 2026"):** https://claude.ai/artifact/7oMwMpnvzakm1v3RMniFDD
(Samsara, MBA Aviation, Veryon, Anduril, Windward, Skydio, Motive studied). Rows marked **Rev. 21 Oct** below
were changed by it; W21–W23 are new. Sam approved the direction, caps, stock footage and the anonymous team line.
The same rules are folded into the `fletaris-brand` skill v1.3, §12 (`docs/brand/fletaris-brand-skill/SKILL.md`).

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
| W1 | Page ground | Dark mode is "additive"; app surfaces navy/dark | **Light first** (`#FFFFFF`, bands of `#F1F5F9`). **Rev. 21 Oct:** dark navy only for the footage hero, the fleet-timeline band and the closing band that runs into the footer | Deviation | Every lessor site and the strongest startup sites are light; dark + teal glow is the most common AI-generated tell |
| W2 | Headline case | Big headlines: Outfit Bold **ALL CAPS** | **Sentence case**, Outfit SemiBold (600), tight tracking (−0.02 to −0.025em). **Rev. 21 Oct:** Outfit Bold caps return in exactly two places per page, the hero line and the closing band (Samsara pattern) | **Deviation (Sam approved 2026-10-16)** | All ten reference sites use sentence case; all-caps on every heading read as shouting and as a template |
| W3 | Headline font | Outfit for headlines | Outfit (unchanged) | Same | |
| W4 | Body font | Outfit | Outfit (unchanged) | Same | |
| W5 | Nav, buttons, labels | Poppins Medium/SemiBold | Poppins (unchanged) | Same | |
| W6 | Monospace | JetBrains Mono for data columns | **Not used for decoration.** No mono eyebrow labels or meta strings; mono only inside product data if ever needed | Narrowing | Mono eyebrows are a listed AI tell |
| W7 | Navy | `#1E2D4A` primary dark | Navy for **all headline and emphasis text** on light, the nav bar, the one dark band, the footer | Same, more prominent | Lessor sites anchor on navy |
| W8 | Teal | `#00C4CC` accent: interactive, highlights | Teal **only as a line or a fill** (rules, the forward line, buttons on navy, numbers on navy). **Never as text on white** (2.2:1 contrast fails) | Narrowing | Accessibility + "one accent" discipline |
| W9 | Gradients, glow, blur | "No gradients, no neon, no blur" | None (unchanged); a flat tint over photos is allowed | Same | |
| W10 | Motion | Not covered | **Rev. 21 Oct:** the hero footage is the one ambient motion (with a pause button), plus the forward line drawn once and the fleet timeline (moves when dragged, plays once on first view). The demo no longer autoplays a loop. No section fade-ins, no count-ups. All off under `prefers-reduced-motion` and Data Saver | New | Motion everywhere is a listed tell; the forward line is the brand idea ("projected forward") |
| W11 | Signature motif | Not covered | **The forward line**: a thin teal line from "Today" to "Months ahead" (**Rev. 21 Oct:** no numbered month markers, W23). Used in the hero and as the interactive fleet timeline | New, proposed for the guide | Turns the positioning sentence into a visual everyone can recognise |
| W12 | Photography | Not covered | Real aviation photography only (no AI images); **no readable airline livery, registrations or recognisable faces** (crop, soften or retouch); B&W or flat navy tint allowed. Credits in `public/images/air/CREDITS.txt` | New | Trademark/credibility (F36 D2) and the "real images" request |
| W13 | Product imagery | Not covered | **Real product screens** from the demo recording, plainly captioned, always labelled **"Example data"**. **Rev. 21 Oct:** as short clips cropped to the panel the caption describes (readable), or as an HTML record card (W22); never a shrunk full-screen screenshot. No hand-drawn mock widgets | New | "Built, not a concept" is the strongest investor signal |
| W14 | Numbers | "Data-dense" | Only **sourced** figures; market numbers written **into sentences** with their sources underneath, not as giant stat tiles | New | Invented or context-free metrics are a tell and a credibility risk |
| W15 | Density | "Data-dense, not sparse" | Marketing pages are **spacious** (large type, wide margins); density lives in the product screens shown | Deviation (website only) | The site sells; the app works |
| W16 | Cards and radius | Not specified for web | Few cards; **rules and tables** instead of card grids; radius 3–4 px | New | Identical card grids are a tell |
| W17 | Logo on light | Landing page: **Logo_Variation_4** (teal icon + navy wordmark) | Logo sits on the **navy nav bar** (Variation 7 style, white wordmark) because the repo only has the dark-background file | Gap: needs the Variation 4 file | Add `logo-light` (Variation 4) to the repo to put the logo on white |
| W18 | Call to action | Not covered | One action everywhere: **"Request early access"** (F36 D5), with the email field in the hero; investors get a parallel **"Request the investor deck"** | New | One CTA; investors were missing a path |
| W19 | Copy voice | Institutional, not startup-casual | Institutional, plain, specific: no "Not X. It's Y.", no heavy em-dashes, no "supercharge"-type claims; say what the reader can do | Same, made explicit | Listed AI copy tells |
| W20 | Status colours | RAG only for status | RAG only inside product data and the fleet timeline's readiness states (unchanged) | Same | |

| W21 | Video | Not covered | **New 21 Oct.** Real stock or filmed footage only (no AI). 8–10 s muted loops, 1280×720 H.264 < 3 MB, poster frame, flat navy tint `#152032`/75%. No readable livery, registrations or faces. Script-started, on screen only, never under reduced motion or Data Saver, visible pause button (WCAG 2.2.2). Credits in `public/media/CREDITS.txt` | New | Samsara/Skydio/Veryon all lead with footage; Samsara's has no pause or poster, ours does |
| W22 | Product over footage | Not covered | **New 21 Oct.** The hero shows one asset's record as an HTML card over the footage, built like the Fletaris Air hangar card: identity, usage, last route/track, status by domain, and foresight (event, days, state, progress). Dark product panel, mono data, synthetic values, labelled "Example data" / "Illustrative example". The hub's card follows its five-fleet montage, same layout per asset class (`src/lib/heroRecords.ts`) | New | Veryon already uses apron footage; the record card is what is specific to Fletaris |
| W23 | Time horizon in copy | Positioning sentence said "next 12–24 months" | **New 21 Oct.** Never a fixed horizon in copy ("next 24 months", "12/24/36 months"); say "months ahead". A chart axis may keep its scale | Deviation (Sam, 21 Oct) | A fixed horizon read as rigid |

## Done in the 21 Oct revision

1. W2 settled: caps for the hero line and the closing band only.
2. W1/W15 marketing mode recorded in the brand skill v1.3 §12.
3. W11, W12, W13, W21, W22, W23 added to the brand skill v1.3 §12.

## To decide in the next brand-guide revision

1. Whether caps-in-two-places (W2) also applies to decks and print, or decks keep all-caps headlines.
2. Supply the light-background logo (W17).
3. Replace stock footage with filmed footage at an MRO or storage site when one is available (W21).
