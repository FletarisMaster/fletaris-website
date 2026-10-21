# DESIGN.md — fletaris.com

The design system for the public website, in the DESIGN.md format (awesome-design-md / Google
Stitch) so any coding agent builds new pages the same way. Reasons and history:
`docs/brand/website-brand-decisions.md` (W1–W23). Brand source: the `fletaris-brand` skill v1.3
(`docs/brand/fletaris-brand-skill/SKILL.md`, §12 for the website).

## 1. Visual theme and atmosphere

Institutional and specific: aircraft lessors and investors should feel they are looking at a
working product run by people who know redelivery. Light pages with real aviation footage up
front, the product shown as readable records, and one interactive moment (the fleet timeline).
Never dark-with-glow, never decorative motion, never stock "AI" ornament.

## 2. Colour palette and roles

| Token | Hex | Role |
|---|---|---|
| `brand.navy` | `#1E2D4A` | Headlines and emphasis on light; nav bar; timeline band; closing band and footer |
| hero tint | `#152032` (brand dark header) at 75% | Flat tint over hero footage (no gradients) |
| `brand.teal` | `#00C4CC` | Lines and fills only: forward line, buttons on navy, small markers. Never body text on white |
| brand dark | `#0B1120` `#111827` `#152032` `#2D3F5C` | Record card (card, header/foresight block, border); only on the footage hero |
| white | `#FFFFFF` | Page ground, record cards, form card |
| `surface.band` | `#F1F5F9` | Alternate section ground, active list rows |
| `text.body` | `#475569` | Running text on light |
| `text.secondary` | `#64748B` | Captions, sources, notes |
| on-navy text | `#E2E8F0` / `#CBD5E1` | Ledes / secondary text on navy |
| status | `#EF4444` `#F59E0B` `#22C55E` | Only for readiness states (tags, timeline ticks). On dark: text `#F87171` / `#FCD34D` / `#4ADE80` on a 15% tint (brand Option A). Errors on light: `#991B1B` on `#FEE2E2` |
| neutrals | slate `#334155` `#475569` `#64748B` `#94A3B8` `#CBD5E1` `#E2E8F0` | Text and lines; no other greys |

## 3. Typography rules

- Outfit for headlines and body; Poppins for nav, buttons and small labels; JetBrains Mono only
  inside product data (timeline axis and playhead).
- Section headlines: sentence case, Outfit SemiBold, `clamp(30px, 3.6vw, 46px)`, tracking −0.02em.
- Caps (Outfit Bold, uppercase) in exactly two places per page: the hero line and the closing band.
  Hero lines are five or six words and no more than two lines on desktop.
- Body 16–19px, leading 1.6; captions 13–14px. Use the scale 12 / 13 / 14 / 15 / 16 / 18 / 22 / 24px
  plus the clamps above; no half-pixel sizes.
- Copy never fixes a horizon: "months ahead", not "next 24 months".

## 4. Component stylings

- **Buttons:** radius 3px. Navy fill on light, teal fill with navy text on navy. One label: "Request
  early access" (investors: "Get the investor deck").
- **Record card** (`RecordCard`, data in `src/lib/heroRecords.ts`): built like the Fletaris Air hangar
  card on the brand dark tokens (card `#111827`, header and foresight block `#152032`, border
  `#2D3F5C`, radius 4px, flat). Header (kind · updated today); ID in teal mono + type; operator line;
  three usage figures (sentence-case grey labels, Outfit tabular values); last route/track; four
  domains with a RAG dot and a word (OK / Watch / Action); foresight block with the event date, one
  status pill, "N days ahead", a measured bar with its value on the right edge, and the finding in
  words. All values synthetic; "Example data" or "Illustrative example" note. Fades in when the hub
  montage moves on (every 4.5 s).
- **Footage hero** (`HeroVideo`): full-bleed muted loop + poster + flat tint, caps line, lede, email
  field, record card bottom-right, pause button top-right; /air adds the forward line.
- **Capability list** (`CapabilityTabs`): questions as tabs on the left, a cropped product clip
  on the right with a pause button.
- **Lists over cards:** compact rows (thumbnail, title, persona, status) instead of card grids.
- **Tables** for roles from 720px up; stacked definition lists on phones.

## 5. Layout principles

- Container `max-w-content` (1440px) with 20px / 40px side padding; sections
  `py-[clamp(64px,7vw,104px)]`.
- Two-column splits `7fr / 5fr` from 940px (`md`), one column below.
- Order of the argument, not stock order. Hub: footage hero → five fleets → timeline → three
  questions → monitor → market → team and investors → closing band. Air: footage hero → demo →
  three questions → timeline → roles → closing band. No section appears on both pages except the
  closing band (form) and the footer.

## 6. Depth and elevation

Flat. No shadows on resting elements, no blur, no glow. Separation comes from tone steps (white /
band / navy) and space.

## 7. Do's and don'ts

Do: real footage and photos (credited), product clips cut from the demo, sourced numbers in
sentences, one form per page, pause buttons on every loop, `prefers-reduced-motion` respected.

Don't: AI-generated imagery, readable livery/registrations/faces, eyebrow labels, 01/02/03
numbering, count-ups, fade-in on scroll, pills, gradients, identical card grids, "Not X. It's Y."
copy, invented customers or metrics, fixed time horizons in copy.

## 8. Responsive behaviour

Breakpoints `sm` 720 / `md` 940 / `lg` 1140. Below `md`: the nav becomes the menu, splits stack,
the hero card sits under the email field, the fleet list uses 72px thumbnails, the roles table
becomes a list. Nothing scrolls sideways. Touch targets ≥ 44px for controls.

## 9. Agent prompt guide

"Build a fletaris.com section in the site's system: light ground, navy sentence-case H2 (Outfit
SemiBold), body in Outfit 16–18px slate, teal only as a line or fill, radius 3px, no shadows or
gradients. If it shows the product, use an HTML record card with example data or a cropped clip
from the demo, labelled as example data. Say 'months ahead', never a fixed number of months."
