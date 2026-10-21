---
name: fletaris-brand
description: >
  Authoritative brand specification for Fletaris — a fleet intelligence platform for aircraft
  portfolio managers. Use this skill whenever producing ANY designed output for Fletaris: UI
  components, React/HTML artifacts, pitch decks, documents, one-pagers, landing page copy,
  social assets, email templates, or any other visual or written deliverable. Also use when
  asked about Fletaris colors, fonts, logos, tone, naming, or design decisions. If the task
  involves Fletaris and has any visual, written, or brand dimension — read this skill first.
  Never guess Fletaris brand tokens from memory; always load this file. This includes tasks
  that seem minor, like a single button color or a heading font choice.
---

# Fletaris Brand Specification
**Version:** 1.3 (October 2026 — marketing website rules added, §12; positioning without a fixed horizon)
**Previous:** 1.2 (April 2026 — dark mode added)
**Source:** Brand_Guide_Style.pdf — Adobe Illustrator, April 9 2026 (31 pages, fully read)
**Authority:** This file supersedes all previous brand references including system prompt descriptions.

---

## 1. Identity

| Element | Value |
|---|---|
| Product name | **Fletaris** — capital F only. Never FLETARIS, never fletaris, never Aertix. |
| Parent company | Uchuva Tech (real name TBD; use "Fletaris" in all external materials) |
| Category | Fleet intelligence platform — regulated asset management, starting with aviation |
| Tagline territory | "Intelligence layer for regulated asset management" |
| Design tone | Bloomberg meets modern SaaS — data-dense, professional, institutional. Never light, playful, or startup-casual. |

---

## 2. Color Palette

### Primary colors

| Name | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|
| **Teal** | `#00C4CC` | 0 · 196 · 204 | 84 / 0 / 0 / 0 | Primary accent — interactive elements, highlights, active states, links, icon mark, teal dot on "t" in wordmark |
| **Navy** | `#1E2D4A` | 28 · 43 · 69 | 63 / 79 / 40 / 47 | Primary dark — sidebar background, document headers, section backgrounds, headings on light surfaces |
| **White** | `#FFFFFF` | 255 · 255 · 255 | 0 / 0 / 0 / 0 | Card backgrounds, body text on dark surfaces, logo on dark backgrounds |

> **Critical:** Navy is `#1E2D4A` — not `#0A1628`. The darker value was the pre-V1.1 token and is retired. Use `#1E2D4A` on all surfaces going forward.

### Secondary colors

| Name | Hex | Usage |
|---|---|---|
| Black | `#020202` | True black for text on light surfaces where maximum contrast is needed |
| Dark navy alt | `#26384A` | Hover states, secondary dark surfaces |
| Teal light | `#ADFFE4` | Teal tints, hover highlights, subtle backgrounds |

### Functional / status colors (RAG system — locked, do not alter)

| Name | Hex | Usage |
|---|---|---|
| Success / Green | `#22C55E` | Healthy, compliant, within limits |
| Warning / Amber | `#F59E0B` | Attention needed, approaching limits |
| Danger / Red | `#EF4444` | Critical, overdue, out of limits |
| Info / Purple | `#8B5CF6` | Informational states, notifications |
| Neutral / Gray | `#94A3B8` | No data, inactive, unknown status |

### Tailwind config — exact replacement block

```ts
// tailwind.config.ts
darkMode: 'class',   // required for dark mode toggle

theme: {
  extend: {
    colors: {
      brand: {
        navy:         '#1E2D4A',
        'navy-alt':   '#26384A',
        teal:         '#00C4CC',
        'teal-light': '#ADFFE4',
        black:        '#020202',
        white:        '#FFFFFF',
      },
      status: {
        green:  '#22C55E',
        amber:  '#F59E0B',
        red:    '#EF4444',
        purple: '#8B5CF6',
        gray:   '#94A3B8',
      },
      surface: {
        // Light mode
        page:    '#F8FAFC',
        card:    '#FFFFFF',
        border:  '#E2E8F0',
        muted:   '#94A3B8',
        // Dark mode
        'dark-base':   '#0B1120',
        'dark-page':   '#111827',
        'dark-card':   '#1C2638',
        'dark-border': '#2D3F5C',
        'dark-header': '#152032',
      },
      text: {
        primary:          '#020202',
        secondary:        '#64748B',
        'dark-primary':   '#F1F5F9',
        'dark-secondary': '#94A3B8',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'system-ui', 'sans-serif'],
      body: ['Outfit', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'monospace'],
    },
  },
},
```

### Google Fonts import + ThemeProvider (layout.tsx)

```tsx
import { Poppins, Outfit } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

// html tag requires suppressHydrationWarning — next-themes adds 'dark' class server-side
// ThemeProvider wraps all children
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${outfit.variable} font-sans bg-surface-page dark:bg-surface-dark-page`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 3. Typography

### Typefaces

| Role | Font | Usage |
|---|---|---|
| **Primary** | **Poppins** | Headings, navigation labels, sidebar items, UI labels, logo wordmark, captions |
| **Secondary** | **Outfit** | Body text, data tables, descriptions, form inputs, headlines in marketing copy |

Both are Google Fonts — no file purchase or hosting required.

### Typography usage rules (from brand guide p.22)

| Context | Font | Weight / Treatment |
|---|---|---|
| Subtitles / section labels | Outfit Medium | All caps (documents and decks; on the website, sentence case, see §12) |
| Big headlines / page titles | Outfit Bold | All caps (on the website: only the hero line and the closing band, see §12) |
| Straplines / taglines | Outfit Extra Bold | All caps |
| Caption text | Poppins | Regular |
| Body / copy text | Outfit | Regular |
| Headlines (editorial) | Outfit | Bold |
| Navigation / UI labels | Poppins | Medium or SemiBold |

### Critical — tabular numerals rule

Poppins uses proportional numerals. In all data table cells displaying numeric aviation data (FH, FC, TSN, CSN, LLP values, hours remaining, dates, percentages), apply:

```css
font-variant-numeric: tabular-nums;
font-family: 'Outfit', system-ui, sans-serif; /* prefer Outfit for data columns */
```

In Tailwind: `font-body tabular-nums` on all `<td>` elements containing numbers.

**Never display misaligned aviation data columns.** This is a hard quality rule.

---

## 4. Logo System

### Icon mark
A compass with integrated pen nib needle, sparkle/star accent, and partial orbit arc.
Concept: navigation + intelligence + precision. Style: filled, high-contrast, single-color or teal.

### Wordmark
"Fletaris" — Poppins SemiBold or Bold, mixed case (capital F only). Teal accent dot replaces the tittle on the letter "t".

### Logo variations and surface assignments (locked)

| File | Description | Use on |
|---|---|---|
| `Logo_Variation_7.png` | Horizontal — teal icon + white wordmark | **App sidebar** (navy background) — PRIMARY app logo |
| `Logo_Variation_4.png` | Horizontal — teal icon + navy wordmark | **Landing page**, light backgrounds, pitch deck light slides |
| `Logo_Variation_2.png` | Stacked — all white (icon above wordmark) | Pitch deck title slides on navy background, boardroom presentations |
| `Logo_Variation_3.png` | Stacked — teal icon + white wordmark | Marketing headers on dark backgrounds |
| `Logo_Variation_6.png` | Horizontal — all white | Secondary horizontal use on dark surfaces |
| `Logo_Variation_text_1.png` | Wordmark only — navy + teal dot | Documents: NDA, data collection template, Excel headers |
| `Logo_Variation_text_3.png` | Wordmark only — white + teal dot | Dark surface documents, email footers |
| App icon | Icon in navy rounded-square container | Favicon, browser tab, app shortcut, sidebar avatar (32×32 or 64×64) |
| Social avatar | Icon in navy circle | LinkedIn, Twitter/X profile picture |

### Logo rules (from brand guide — non-negotiable)

- **Clear space:** Minimum 25% of logo height on all four sides
- **Preferred backgrounds:** White, neutral gray, navy `#1E2D4A`
- **Never:** Drop shadows · Color changes · Low-contrast backgrounds · Blur effects · Stretching or distortion
- **Casing:** Always "Fletaris" — capital F, lowercase remainder. No exceptions.

### App icon / favicon implementation

The designer specifies the icon inside a **navy rounded-square container** (not bare icon). This solves small-size legibility. Implementation:

```html
<!-- Favicon: generate from icon on #1E2D4A rounded-square at 64×64, export as favicon.ico -->
<!-- Sidebar avatar (32×32): navy rounded-square bg, teal icon centered, border-radius ~6px -->
```

Save logo files to: `fletaris-personal/public/images/`

```
logo-sidebar.png        → Logo_Variation_7 (horizontal, teal+white)
logo-light.png          → Logo_Variation_4 (horizontal, teal+navy)  
logo-stacked-white.png  → Logo_Variation_2 (stacked, all white)
logo-wordmark.png       → Logo_Variation_text_1 (navy wordmark)
logo-icon-square.png    → Icon in navy rounded square (app icon / favicon source)
logo-icon-circle.png    → Icon in navy circle (social avatar)
```

---

## 5. Iconography

### Brand icon set (marketing use)
21 teal-filled circular icons provided in brand package. Style: filled circle, white icon cutout, teal `#00C4CC`. Covers: email, home, globe, profile, social platforms, calendar, chat, charts.
Use in: landing page, marketing materials, pitch decks.

### App UI icons (product use)
Use **Lucide React** (already available in Next.js stack). Icon style: outline, stroke-width 1.5.
Color: `text-brand-teal` for active/accent icons, `text-gray-400` for inactive, `text-white` for icons on navy backgrounds.
Never use filled icons in the app UI — outline only for consistency.

---

## 6. Document Brand Tokens (Word / Excel — Arial stays)

For `.docx` and `.xlsx` files generated by scripts, fonts must be Arial (system font, no install required). Brand colors apply to fills and accents only:

| Element | Value |
|---|---|
| Header fill | `#1E2D4A` (navy) |
| Header text | `#FFFFFF` (white) |
| Section title fill | `#00C4CC` (teal) |
| Section title text | `#1E2D4A` (navy) or `#FFFFFF` depending on contrast |
| Body text | `#020202` (near-black) |
| Alternating row fill | `#F8FAFC` (light gray) |
| Border / divider | `#E2E8F0` |
| Font (all elements) | Arial (locked — Word/Excel compatibility) |

---

## 7. Dark Mode — Direction A (true dark)

Dark mode is implemented and live in the app. Activated via toggle at the bottom of the sidebar. Persists across sessions via localStorage. Defaults to system preference on first load.

### Dark mode surface hierarchy

In light mode: page → card → sidebar (darkest anchor).
In dark mode: base (darkest) → page → card → sidebar (mid-tone elevation).
The sidebar `#1E2D4A` stays unchanged in both modes — it reads as elevated mid-tone in dark context without any modification.

### Complete token reference — light vs dark

| Token | Light | Dark |
|---|---|---|
| Page background | `#F8FAFC` | `#111827` |
| Card / panel background | `#FFFFFF` | `#1C2638` |
| Table header row | `#1E2D4A` | `#152032` |
| Outermost base | `#F8FAFC` | `#0B1120` |
| Border / divider | `#E2E8F0` | `#2D3F5C` |
| Text primary | `#020202` | `#F1F5F9` |
| Text secondary | `#64748B` | `#94A3B8` |
| Sidebar background | `#1E2D4A` | `#1E2D4A` — **unchanged** |
| Sidebar hover | `#26384A` | `#26384A` — **unchanged** |
| Teal accent | `#00C4CC` | `#00C4CC` — **unchanged** |
| Status green | `#22C55E` | `#22C55E` — **unchanged** |
| Status amber | `#F59E0B` | `#F59E0B` — **unchanged** |
| Status red | `#EF4444` | `#EF4444` — **unchanged** |

### Status badge treatment in dark mode — Option A (15% opacity)

Never use solid light badge fills on dark backgrounds. Use the opacity variant pattern:

```tsx
// Green badge
<span className="bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400">
  AIRFRAME OK
</span>

// Amber badge
<span className="bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
  ENGINE WATCH
</span>

// Red badge
<span className="bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400">
  LEASE 42d
</span>

// Gray / neutral badge
<span className="bg-gray-100 text-gray-600 dark:bg-slate-500/15 dark:text-slate-400">
  NO DATA
</span>
```

### Standard dark variant pattern — apply to all components

```tsx
// Surface backgrounds
bg-surface-card          → + dark:bg-surface-dark-card
bg-surface-page          → + dark:bg-surface-dark-page
bg-white                 → + dark:bg-surface-dark-card

// Borders
border-surface-border    → + dark:border-surface-dark-border

// Text
text-brand-navy          → + dark:text-text-dark-primary
text-brand-black         → + dark:text-text-dark-primary
text-gray-600            → + dark:text-text-dark-secondary
text-slate-500           → + dark:text-text-dark-secondary

// Table headers
bg-brand-navy text-white → + dark:bg-surface-dark-header (text-white stays)

// Alternating table rows
bg-surface-page          → + dark:bg-surface-dark-page
bg-surface-card          → + dark:bg-surface-dark-card

// Input fields
bg-white border-surface-border → + dark:bg-surface-dark-card dark:border-surface-dark-border

// Focus rings — unchanged, teal works on all surfaces
focus:ring-brand-teal    → no dark: variant needed
```

### ThemeToggle component

Located at `src/components/ui/ThemeToggle.tsx`. Placed at the bottom of the sidebar above the version text. Shows Moon icon in light mode, Sun icon in dark mode. Uses `next-themes` `useTheme` hook. Requires `'use client'` directive and mounted state guard to prevent hydration mismatch.

### globals.css dark base

```css
.dark {
  --background: #111827;
  --foreground: #F1F5F9;
  color-scheme: dark;
}
```

---

## 8. Sidebar Logo Specification

Logo file: `public/images/logo-sidebar.png` (Logo_Variation_7 — horizontal, teal icon + white wordmark).

```tsx
<div className="px-3 py-4">
  <Image
    src="/images/logo-sidebar.png"
    alt="Fletaris"
    width={176}
    height={40}
    className="w-full max-w-[176px] h-auto object-contain object-left"
    priority
  />
</div>
```

Rules: fills sidebar width comfortably, 12px horizontal padding, 16px vertical padding, aspect ratio always preserved, `priority` prop set (above-the-fold). Adjust `height` prop to match actual PNG aspect ratio — verify with `identify public/images/logo-sidebar.png` before setting.

---

## 9. Design Tone Rules

These apply to every Fletaris deliverable — app screens, documents, pitch decks, and marketing:

1. **Data-dense, not sparse.** Show the data. Do not hide information behind clicks when it can be surfaced directly.
2. **Institutional, not startup-casual.** No gradients, no neon, no playful illustrations. Clean flat surfaces only.
3. **Navy as anchor, teal as signal.** Navy grounds every surface. Teal draws the eye to what matters: active states, key metrics, CTAs.
4. **White space is structural, not decorative.** Use it to separate logical sections, not to make things look "modern."
5. **Status colors carry meaning.** Green/amber/red are reserved for the RAG system. Do not use them decoratively.
6. **Typography is functional.** Outfit for reading (body, tables). Poppins for scanning (labels, nav, headings). Never mix them arbitrarily.
7. **Dark mode is additive, not a redesign.** Surface colors shift, brand colors (teal, navy, status) stay identical. The institutional tone must be equally present in both modes.

---

## 10. What Fletaris Is Not (brand positioning — for copy and messaging)

Never position Fletaris as:
- An MRO or maintenance execution system (that's Ramco, Veryon, OASES)
- A financial/accounting platform (that's SPARTA, Leasepoint)
- A document management system (that's flydocs)

Always position Fletaris as: the intelligence layer between technical data and business decisions. The tool for the technical asset manager — the person who must translate fleet condition into forward-looking business consequences.

**The one-sentence positioning:** "Given the current technical state of this fleet, what does it mean for my business commitments in the months ahead?"

> **Copy rule (Oct 2026):** never lock the forecast to a fixed horizon ("next 24 months", "12/24/36 months", "+24 MO"). Say "months ahead", "the months ahead" or "what is coming". A chart may still have a scale on its axis.

---

## 12. Marketing Website (fletaris.com) — v1.3

The website sells; the app works. These rules apply to fletaris.com and its pages only. The full decision log with reasons is `docs/brand/website-brand-decisions.md` in the fletaris-website repo (W1–W23).

| Topic | Rule |
|---|---|
| Ground | Light pages (`#FFFFFF`, bands `#F1F5F9`). Dark navy is allowed for: the footage hero, the interactive fleet timeline band, and the closing call-to-action band that runs into the footer. No other dark sections. |
| Headlines | Sentence case, Outfit SemiBold, tight tracking (−0.02em). **Caps (Outfit Bold) in exactly two places per page:** the hero line and the closing band line. Hero headlines: five or six words, no more than two lines on desktop. |
| Nav, buttons, labels | Poppins Medium/SemiBold, sentence case. No tracked-caps eyebrow labels, no monospace labels, no 01/02/03 numbering. |
| Teal | Only as a line or a fill: the forward line, buttons on navy, small markers. Never as body text on white (fails contrast). |
| Footage (video) | Real stock or filmed footage only, never AI-generated. 8–10 s muted loops, 1280×720 H.264 under 3 MB, a JPEG/WebP poster, under a flat navy tint (`#16223A` at 70%). No readable airline livery, registrations or faces. Plays only from script, only on screen, never under reduced motion or Data Saver; always a visible pause button. One footage hero per page; no other ambient motion besides the forward line and the fleet timeline. |
| Product over footage | Show the product as an HTML record card over the footage, built like the Fletaris Air hangar card: identity (ID, type, operator), three usage stats, last route/track, four status chips (RAG), and foresight (next event in N days, state, progress bar, outcome). Dark product panel (`#0B1120`/92%, mono data). Same layout for drones, trucks, vessels and satellites with their own fields. All values synthetic. Never a shrunk screenshot. Always labelled "Example data" or "Illustrative example". |
| Product clips | Product screens appear as short clips or crops cut from the real demo recording, at a size where the figures can be read, captioned "From the live product, on example data". |
| Forward line | A thin teal line from "Today" to "Months ahead", drawn once (no numbered month ticks). |
| Numbers | Only sourced figures, written into sentences with sources underneath. No stat tiles, no count-ups, no invented traction. |
| Photography | Real photographs; the live vertical in colour, verticals still to come in black and white. Credits in `public/images/**/CREDITS.txt` and `public/media/CREDITS.txt`. |
| Radius, cards | Radius 3–4 px everywhere (no pills). Few cards; lists and tables instead of identical card grids. |
| One action | "Request early access" everywhere; investors get "Get the investor deck" on the hub. One form per page. |
| Team | Anonymous until founders choose otherwise: a list of areas of experience, every line true. |
| Copy voice | Institutional, plain, specific. No "Not X. It's Y.", no "supercharge/seamless/unlock", few em dashes. |

## 11. Quick Reference — Implementation Checklist

When producing any Fletaris artifact, verify:

- [ ] Navy is `#1E2D4A` (not `#0A1628`)
- [ ] Teal is `#00C4CC`
- [ ] Primary font is Poppins (headings/labels), secondary is Outfit (body/tables)
- [ ] Numeric data columns use `tabular-nums` + Outfit
- [ ] Logo variant matches the surface (see Section 4 table)
- [ ] No drop shadows, no gradients, no blur
- [ ] Status colors (green/amber/red) used only for RAG system — never decorative
- [ ] Name is "Fletaris" — capital F only
- [ ] Design tone is institutional and data-dense — not playful or minimal (website: spacious, see §12)
- [ ] Copy never fixes a horizon ("next 24 months"); say "months ahead"
- [ ] Website: caps only in the hero line and the closing band; footage has a poster and a pause button; product shown as an HTML record card or a readable clip
- [ ] Dark mode: all surfaces have `dark:` variants, sidebar has none (intentional)
- [ ] Dark mode: status badges use 15% opacity fill + lighter text (Option A)
- [ ] Dark mode: teal, navy, and status hex values are identical in both modes
