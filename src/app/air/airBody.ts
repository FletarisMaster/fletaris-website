// Verbatim port of the original index.html body content (hero through the original
// footer), minus the old <nav> (replaced by the shared TopNav) and the inline
// lifecycle-widget <script> (ported to the AirLifecycleTabs client component, since scripts
// injected via dangerouslySetInnerHTML never execute). A "back to hub" strip is
// spliced in just above the original footer per the build spec §1.3.

import { PRIVACY_POLICY_URL, WAITLIST_PRIVACY_LINE } from '@/lib/waitlist';

// Browsers always re-serialize self-closing tags on non-void elements (and even
// drop the slash on void ones) when read back via .innerHTML — so a raw XHTML-style
// string never matches React's post-hydration comparison bit-for-bit. Normalizing
// self-closing syntax up front avoids spurious dangerouslySetInnerHTML hydration
// warnings instead of papering over them.
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

function normalizeSelfClosingTags(html: string): string {
  return html.replace(/<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*?)?)\s*\/>/g, (_match, tag: string, attrs: string) => {
    return VOID_ELEMENTS.has(tag.toLowerCase()) ? `<${tag}${attrs}>` : `<${tag}${attrs}></${tag}>`;
  });
}

const RAW_AIR_BODY_HTML = `
<!-- ───────── HERO ───────── -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-grid-overlay"></div>
  <div class="hero-w">
    <div class="hero-meta">
      <div class="hero-serial">/ 01 — INTELLIGENCE LAYER</div>
      <div class="hero-meta-mid">
        <span class="ln"></span>
        <span class="lbl">FLEET FORESIGHT FOR ASSET MANAGERS</span>
        <span class="ln"></span>
      </div>
      <div class="hero-vol">FILE — FLT/26207.MR/2026.05</div>
    </div>
    <h1 class="hero-title">
      Your fleet's<br/>
      technical<br/>
      condition.<br/>
      <span class="l2"><em>Projected forward.</em></span>
    </h1>
    <div class="hero-byline">
      <div class="hero-bl-l">
        <p>A forward view of maintenance, redelivery exposure, and compliance posture — built from records your team already keeps.</p>
        <div class="cta-row">
          <a href="#waitlist" class="btn btn-lg btn-primary">Request early access
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
      <div></div>
      <div class="hero-bl-stats">
        <div class="hero-bl-stat"><div class="l">Forward view</div><div class="v teal" style="font-size:22px;letter-spacing:0.04em;">ROLLING</div><div class="s">Rolling forward projection</div></div>
        <div class="hero-bl-stat"><div class="l">Redelivery exposure</div><div class="v red">42<span style="font-size:14px;color:rgba(255,255,255,0.5);">d</span></div><div class="s">MSN 6291 · action req.</div></div>
        <div class="hero-bl-stat"><div class="l">Open findings</div><div class="v">6</div><div class="s">3 awaiting review</div></div>
      </div>
    </div>
  </div>
  <div class="scroll-cue">SCROLL · CASE FILE 26207</div>
</section>

<!-- ───────── DIPTYCH ───────── -->
<section class="sec dip" id="problem">
  <div class="sec-w">
    <div class="sec-band">
      <div class="sec-serial">/ 02</div>
      <div>
        <div class="sec-eyebrow">The gap no tool addresses</div>
        <h2 class="sec-h">Three problems, <em>one forward view.</em></h2>
        <p class="sec-lede">Your records tell you what happened. Your spreadsheets tell you what's open. Nothing tells you what's coming — until Fletaris.</p>
      </div>
    </div>
    <div class="dip-grid">
      <div class="dip-side before">
        <div class="dip-tag before"><span class="dot"></span>BEFORE · WHAT YOU SEE TODAY</div>
        <h3 class="dip-headline">A desk of overdue spreadsheets, sticky notes, and a deadline you can't see clearly.</h3>
        <p class="dip-body">Four spreadsheets, three formats, two people who know which file is current. Redelivery does not postpone for reconciliation.</p>
        <div class="dip-evidence">
          <div class="dip-ev-row">
            <div class="dip-ev-icn"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L12.5 11.5H1.5L7 1.5Z" stroke="#FCA5A5" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 5.5V8.5" stroke="#FCA5A5" stroke-width="1.4" stroke-linecap="round"/><circle cx="7" cy="10.2" r="0.7" fill="#FCA5A5"/></svg></div>
            <div class="dip-ev-l">Fleet_tracking_v3_FINAL_v2.xlsx — version unknown</div>
            <div class="dip-ev-r">4 SHEETS</div>
          </div>
          <div class="dip-ev-row">
            <div class="dip-ev-icn"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#FCA5A5" stroke-width="1.4"/><path d="M7 4V7L9 9" stroke="#FCA5A5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div class="dip-ev-l">"Return in 47 days?" — sticky note, not a system</div>
            <div class="dip-ev-r">47d ?</div>
          </div>
          <div class="dip-ev-row">
            <div class="dip-ev-icn"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="#FCA5A5" stroke-width="1.4" stroke-linecap="round"/></svg></div>
            <div class="dip-ev-l">URGENT · OVERDUE · TBC — stamped on records, not tracked</div>
            <div class="dip-ev-r">3 GAPS</div>
          </div>
        </div>
      </div>
      <div class="dip-side after">
        <div class="dip-tag after"><span class="dot"></span>AFTER · WHAT FLETARIS SHOWS</div>
        <h3 class="dip-headline">One structured aircraft view. <em>Updated from your records, projected forward.</em></h3>
        <p class="dip-body">Every aircraft, every component, every milestone — current as of your last import, projected forward.</p>
        <div class="dip-card">
          <div class="dip-card-top">
            <div>
              <div class="dip-msn">MSN 6291</div>
              <div class="dip-reg">EI-FVL · Boeing 737-800</div>
            </div>
            <span class="dip-pill">UPDATED 14:32</span>
          </div>
          <div class="dip-fh">FH <b>31,047</b> · FC <b>8,204</b> · Op. <b>Ryanair (wet-lease)</b></div>
          <div class="dip-sep"></div>
          <div class="dip-meta-row">
            <div>
              <div class="dip-meta-l">LAST FLIGHT</div>
              <div class="dip-meta-v">DUB <span style="color:var(--teal);">→</span> LGW</div>
            </div>
            <div>
              <div class="dip-meta-l">RESERVE ADQ.</div>
              <div class="dip-meta-v">96.2%</div>
            </div>
          </div>
          <div class="dip-sep"></div>
          <div>
            <div class="dip-meta-l">REDELIVERY IN</div>
            <div class="dip-bm">
              <span class="n">42</span>
              <span class="u">days</span>
              <span class="s">Action req.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ───────── LIFECYCLE ───────── -->
<section class="sec lifecycle" id="lifecycle">
  <div class="sec-w" style="position:relative;">
    <div class="sec-band">
      <div class="sec-serial light">/ 03</div>
      <div>
        <div class="sec-eyebrow light">Asset lifecycle intelligence</div>
        <h2 class="sec-h light">Every event. Every aircraft. <em>Every month forward.</em></h2>
        <p class="sec-lede light">Maintenance, lease, and compliance commitments mapped against a rolling forward projection — every event, every component, current as of your last records update.</p>
      </div>
    </div>

    <div class="lc-stage" id="lc-stage">
      <!-- header -->
      <div class="lc-head">
        <div class="lc-head-l">
          <div class="lc-mark">
            <svg viewBox="0 0 24 24" fill="none"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#00C4CC"/></svg>
          </div>
          <div class="lc-titles">
            <div class="lc-msn" id="lc-msn">MSN 7842<span class="reg" id="lc-reg">EC-MKL</span></div>
            <div class="lc-sub" id="lc-sub">
              <span>A320-214</span>
              <span class="div">·</span>
              <span><b>Iberia Express</b> · wet lease</span>
              <span class="div">·</span>
              <span>Lease return <b>Q1 2027</b></span>
              <span class="div">·</span>
              <span>Rolling forward view</span>
            </div>
          </div>
        </div>
        <div class="lc-head-r">
          <div class="lc-live"><span class="led"></span>LIVE</div>
          <div class="lc-sync">SYNC 14:32 UTC</div>
        </div>
      </div>

      <!-- tabs -->
      <div class="lc-head-mid" role="tablist">
        <div class="lc-tab" data-view="fleet" role="tab">All fleet</div>
        <div class="lc-tab active" data-view="msn7842" role="tab">MSN 7842</div>
        <div class="lc-tab" data-view="msn6291" role="tab">MSN 6291</div>
        <div class="lc-tab" data-view="more" role="tab">+ 3 more</div>
      </div>

      <!-- axis -->
      <div class="lc-axis">
        <div class="lc-axis-l">FORWARD WINDOW</div>
        <div class="lc-axis-cells">
          <div class="lc-axis-cell q now" data-q="Q2 2026">MAY</div>
          <div class="lc-axis-cell">JUN</div>
          <div class="lc-axis-cell">JUL</div>
          <div class="lc-axis-cell q" data-q="Q3 2026">AUG</div>
          <div class="lc-axis-cell">SEP</div>
          <div class="lc-axis-cell">OCT</div>
          <div class="lc-axis-cell q" data-q="Q4 2026">NOV</div>
          <div class="lc-axis-cell">DEC</div>
          <div class="lc-axis-cell">JAN</div>
          <div class="lc-axis-cell q" data-q="Q1 2027">FEB</div>
          <div class="lc-axis-cell">MAR</div>
          <div class="lc-axis-cell">APR</div>
        </div>
      </div>

      <!-- tracks -->
      <div class="lc-tracks-wrap">
        <div class="lc-tracks" id="lc-tracks"><div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">Airframe · C-Check</div><div class="lc-track-sub">last 2024-08 · cycle 9,840</div></div><div class="lc-bar-area"><div class="lc-bar green-dim" style="left:0%;width:70%;">Within limits</div><div class="lc-bar green-solid" style="left:70%;width:14%;"><div class="lc-flag" style="left:0;">MILESTONE</div>C-Check</div><div class="lc-bar green-dim" style="left:84%;width:16%;">Post-check</div></div></div><div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">Engine 1 · LLP set</div><div class="lc-track-sub">CFM56-5B · 18,340 cyc remain</div></div><div class="lc-bar-area"><div class="lc-bar amber-dim" style="left:0%;width:50%;">Approaching limit</div><div class="lc-bar amber-solid" style="left:50%;width:18%;">Shop visit</div><div class="lc-bar green-dim" style="left:68%;width:32%;">Restored</div></div></div><div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">Engine 2 · shop visit</div><div class="lc-track-sub">CFM56-5B · 9 days perf delta</div></div><div class="lc-bar-area"><div class="lc-bar red-dim" style="left:0%;width:30%;">Risk window</div><div class="lc-bar red-solid" style="left:30%;width:18%;">Unplanned SV</div><div class="lc-bar green-dim" style="left:48%;width:52%;">Monitoring</div></div></div><div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">APU · LCF</div><div class="lc-track-sub">42 LCF remain</div></div><div class="lc-bar-area"><div class="lc-bar green-dim" style="left:0%;width:80%;">Within limits</div><div class="lc-bar amber-dim" style="left:80%;width:20%;">Approaching</div></div></div><div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">AD compliance</div><div class="lc-track-sub">AD 2024-08-13 open</div></div><div class="lc-bar-area"><div class="lc-bar green-dim" style="left:0%;width:45%;">Compliant</div><div class="lc-bar amber-solid" style="left:45%;width:10%;">AD 2024-08</div><div class="lc-bar green-dim" style="left:55%;width:45%;">Compliant</div></div></div><div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">Lease return</div><div class="lc-track-sub">conditions matrix review</div></div><div class="lc-bar-area"><div class="lc-bar teal-dim" style="left:0%;width:88%;">Monitoring</div><div class="lc-bar teal-solid" style="left:88%;width:12%;">Review window</div></div></div></div>
      </div>

      <!-- foot alerts -->
      <div class="lc-foot" id="lc-foot"><div class="lc-alert"><div class="lc-alert-dot" style="background:#22C55E;"></div><div class="lc-alert-text"><b style="color:#86EFAC;">Airframe</b>C-Check scheduled · within limits<span class="when">8.5 months</span></div></div><div class="lc-alert"><div class="lc-alert-dot" style="background:#F59E0B;"></div><div class="lc-alert-text"><b style="color:#FCD34D;">Engine 1</b>LLP limit reached · action window open<span class="when">6.0 months</span></div></div><div class="lc-alert"><div class="lc-alert-dot" style="background:#EF4444;"></div><div class="lc-alert-text"><b style="color:#FCA5A5;">Engine 2</b>Unplanned shop visit risk · 9d perf delta<span class="when">3.5 months</span></div></div><div class="lc-alert"><div class="lc-alert-dot" style="background:#00C4CC;"></div><div class="lc-alert-text"><b style="color:#00C4CC;">Lease return</b>Conditions matrix review window<span class="when">11 months</span></div></div></div>

      <!-- legend -->
      <div class="lc-legend">
        <div class="lc-leg-l">
          <span class="lc-leg-item"><span class="sw" style="background:rgba(34,197,94,0.55);border:1px solid rgba(34,197,94,0.85);"></span>Scheduled</span>
          <span class="lc-leg-item"><span class="sw" style="background:rgba(245,158,11,0.55);border:1px dashed var(--amber);"></span>Action window</span>
          <span class="lc-leg-item"><span class="sw" style="background:rgba(239,68,68,0.65);border:1px solid rgba(239,68,68,0.9);"></span>Risk</span>
          <span class="lc-leg-item"><span class="sw" style="background:rgba(0,196,204,0.45);border:1px solid var(--teal);box-shadow:0 0 6px rgba(0,196,204,0.4);"></span>Lease milestone</span>
          <span class="lc-leg-item"><span class="sw" style="background:transparent;border:1px solid rgba(255,255,255,0.3);"></span>Within limits</span>
        </div>
        <div class="lc-leg-r" id="lc-leg-r">6 ACTIVE TRACKS · <b>1 AIRCRAFT</b> · 14 FORWARD EVENTS</div>
      </div>
    </div>
  </div>
</section>

<!-- ───────── PILLARS ───────── -->
<section class="pillars" id="pillars">
  <div class="sec-w">
    <div class="sec-band pl-band">
      <div class="sec-serial">/ 04</div>
      <div>
        <div class="sec-eyebrow">Three pillars</div>
        <h2 class="sec-h">Technical data,<br/><em>translated into decisions.</em></h2>
      </div>
    </div>
    <div class="pl-stack">
      <div class="pl-col primary">
        <div class="pl-col-serial">/ 4.1 — FORESIGHT</div>
        <div class="pl-col-stat" style="display:flex;align-items:flex-end;gap:6px;line-height:0.85;">
          <svg width="112" height="96" viewBox="0 0 112 96" fill="none" style="flex-shrink:0;">
            <path d="M4 48 L102 48 M102 48 L74 20 M102 48 L74 76" stroke="#00C4CC" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="pl-col-eyebrow">Rolling forward projection</div>
        <h3 class="pl-col-h">See what's coming.</h3>
        <p class="pl-col-p">Project component life limits and shop visit forecasts forward. Know cost exposure before it becomes a constraint.</p>
      </div>
      <div class="pl-col">
        <div class="pl-col-serial">/ 4.2 — VISIBILITY</div>
        <div class="pl-col-stat">1<span class="small"></span></div>
        <div class="pl-col-eyebrow">Screen · entire portfolio</div>
        <h3 class="pl-col-h">One screen, every aircraft.</h3>
        <p class="pl-col-p">Your fleet on one dashboard, current as of your last import. Airframe, engines, APU, gear, ADs — one place.</p>
      </div>
      <div class="pl-col">
        <div class="pl-col-serial">/ 4.3 — READINESS</div>
        <div class="pl-col-stat">0</div>
        <div class="pl-col-eyebrow">Unplanned events at audit</div>
        <h3 class="pl-col-h">Arrive prepared.</h3>
        <p class="pl-col-p">Know your compliance and airworthiness posture before your next audit or redelivery. No last-minute surprises.</p>
      </div>
    </div>
  </div>
</section>

<!-- ───────── COST ───────── -->
<section class="sec quote">
  <div class="quote-w">
    <div class="quote-band">
      <div class="sec-serial light">/ 05</div>
      <div>
        <div class="sec-eyebrow light">The cost of not knowing</div>
        <h2 class="sec-h light">Unplanned events <em>don't announce themselves.</em></h2>
        <p class="sec-lede light">Three line items every asset manager carries, and three places Fletaris closes the window.</p>
      </div>
    </div>
    <div class="quote-card-grid">
      <div class="qc">
        <div class="qc-tag"><span class="dot" style="background:#EF4444;"></span>REDELIVERY DISPUTES</div>
        <div class="qc-num red">$2.4M<span class="u">avg.</span></div>
        <h3 class="qc-h">Position lost at the table</h3>
        <p class="qc-b">Conditions found at return that weren't tracked forward become leverage for the other side. Every discrepancy is a position already lost.</p>
        <div class="qc-foot">↑ Projected redelivery exposure forward</div>
      </div>
      <div class="qc">
        <div class="qc-tag"><span class="dot" style="background:#F59E0B;"></span>UNPLANNED SHOP VISITS</div>
        <div class="qc-num amber">5×<span class="u">premium</span></div>
        <h3 class="qc-h">More dollars, more days</h3>
        <p class="qc-b">The premium on an unplanned engine or APU visit versus a scheduled one is significant — in cost, in timing, and in aircraft availability.</p>
        <div class="qc-foot">↑ Forecast against the forward window</div>
      </div>
      <div class="qc">
        <div class="qc-tag"><span class="dot" style="background:#22C55E;"></span>COMPLIANCE AT AUDIT</div>
        <div class="qc-num green">100<span class="u">%</span></div>
        <h3 class="qc-h">Found by you, not by the auditor</h3>
        <p class="qc-b">A gap found by an auditor instead of by you comes with a deadline, a cost, and a counterparty watching. Posture, not paperwork.</p>
        <div class="qc-foot">↑ Real-time compliance monitoring</div>
      </div>
    </div>
  </div>
</section>

<!-- ───────── PERSONA ───────── -->
<section class="sec persona" id="persona">
  <div class="persona-w">
    <div class="sec-band persona-band">
      <div class="sec-serial light">/ 06</div>
      <div>
        <div class="sec-eyebrow light">Built for</div>
        <h2 class="sec-h light">The <em>Technical Asset Manager.</em></h2>
        <p class="sec-lede light">You carry the technical airworthiness of a portfolio that moves fast. Redeliveries, lease transitions, shop visit windows, reserve reconciliations — all running in parallel.</p>
      </div>
    </div>
    <div class="persona-grid">
      <div class="persona-l">
        <div class="persona-quote">
          "I'm not looking for a maintenance system. I have one. I'm looking for the layer above it — the one that tells me what next quarter looks like."
          <span class="who">— DIRECTOR, TECHNICAL ASSET MANAGEMENT · TIER-1 LESSOR</span>
        </div>
        <div class="persona-chips">
          <span class="chip-1">Aviation Asset Managers</span>
          <span class="chip-2">Independent CAMOs</span>
          <span class="chip-2">Transition Managers</span>
          <span class="chip-2">Fleet Directors</span>
          <span class="chip-2">Appraisers</span>
        </div>
      </div>
      <div>
        <div class="position-card">
          <div class="pc-head">WHERE FLETARIS SITS</div>
          <div class="pc-row">
            <div class="pc-mark"><svg viewBox="0 0 18 18" fill="none"><path d="M3 13L3 6L9 3L15 6V13" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 13L9 16L15 13" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 3V16" stroke="#94A3B8" stroke-width="1.5"/></svg></div>
            <div><div class="pc-name">Maintenance &amp; engineering systems</div><div class="pc-desc">Execution-layer tools for engineers and technicians</div></div>
            <div class="pc-role">Serves the<br/>engineer</div>
          </div>
          <div class="pc-row active">
            <div class="pc-mark"><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#00C4CC" stroke-width="1.5"/><path d="M9 5V9L11.5 11.5" stroke="#00C4CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div><div class="pc-name">Fletaris</div><div class="pc-desc">Fleet intelligence · Forward projection</div></div>
            <div class="pc-role">Serves the<br/>asset manager</div>
          </div>
          <div class="pc-row">
            <div class="pc-mark"><svg viewBox="0 0 18 18" fill="none"><rect x="3" y="4" width="12" height="10" rx="1" stroke="#94A3B8" stroke-width="1.5"/><path d="M5 7H13M5 10H9" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/></svg></div>
            <div><div class="pc-name">Lessor finance &amp; asset platforms</div><div class="pc-desc">Accounting-layer tools for finance teams</div></div>
            <div class="pc-role">Serves the<br/>accountant</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ───────── WAITLIST ───────── -->
<section class="waitlist" id="waitlist">
  <div class="waitlist-w">
    <div class="waitlist-l">
      <div class="waitlist-pill"><span class="dot"></span>Limited cohort · By invitation</div>
      <h2>Get <em>early access.</em></h2>
      <p class="waitlist-lede">We're onboarding a limited number of organizations for our initial release. No sales calls. No demos you didn't ask for.</p>
      <div class="waitlist-receipts">
        <div class="wl-rec">
          <div class="wl-rec-mark"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L7 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div class="wl-rec-l">No sales calls — direct outreach only</div>
          <div class="wl-rec-r">/ 01</div>
        </div>
        <div class="wl-rec">
          <div class="wl-rec-mark"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L7 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div class="wl-rec-l">Onboarding led by founders</div>
          <div class="wl-rec-r">/ 02</div>
        </div>
        <div class="wl-rec">
          <div class="wl-rec-mark"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L7 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div class="wl-rec-l">Records imported, never resold</div>
          <div class="wl-rec-r">/ 03</div>
        </div>
      </div>
    </div>

    <form id="waitlist-form" class="form-card">
      <div class="form-card-head">REQUEST ACCESS<span class="step">STEP 1 / 1</span></div>
      <div class="form-row">
        <div class="fld"><label>First name</label><input id="firstname" placeholder="Maria"/></div>
        <div class="fld"><label>Last name</label><input id="lastname" placeholder="Rodriguez"/></div>
      </div>
      <div class="fld" id="group-email"><label>Work email *</label><input id="email" type="email" placeholder="m.rodriguez@avcap.com" required/></div>
      <div class="fld"><label>Company</label><input id="company" placeholder="Aero Capital Partners"/></div>
      <div class="fld" id="group-fleetsize"><label>Fleet size *</label>
        <div class="select-wrap">
          <select id="fleetsize" required>
            <option value="" disabled selected>Select fleet size</option>
            <option>1 – 10 aircraft</option>
            <option>11 – 30 aircraft</option>
            <option>31 – 80 aircraft</option>
            <option>80+ aircraft</option>
          </select>
        </div>
      </div>
      <div class="turnstile-slot" data-turnstile-slot=""></div>
      <div id="form-error-banner" style="display:none;">Something went wrong. Please try again.</div>
      <button type="submit" class="btn-submit" disabled="">Join the waitlist
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <p class="form-privacy">${WAITLIST_PRIVACY_LINE} <a href="${PRIVACY_POLICY_URL}">Privacy Policy</a></p>
    </form>

    <div id="form-success" style="display:none;">
      <div class="s-title">You're on the list.</div>
      <div class="s-body">Direct outreach only — you'll hear from us if your portfolio is the right fit.</div>
    </div>
  </div>
</section>

<!-- ───────── back to hub strip ───────── -->
<div class="vertical-strip">
  <div class="vertical-strip-inner">
    <a href="/">← Fletaris hub</a>
    <span class="vs-sep">/</span>
    <a href="/air">Air</a>
    <span class="vs-sep">·</span>
    <span class="vs-soon">Drone (soon)</span>
    <span class="vs-sep">·</span>
    <span class="vs-soon">Land (soon)</span>
    <span class="vs-sep">·</span>
    <span class="vs-soon">Sea (soon)</span>
    <span class="vs-sep">·</span>
    <span class="vs-soon">Space (soon)</span>
  </div>
</div>

<!-- ───────── FOOTER ───────── -->
<footer class="foot">
  <div class="foot-inner">
    <div class="foot-top">
      <img class="foot-logo" src="/images/logo-horizontal-darkbg.png" alt="Fletaris"/>
      <div class="foot-tagline">Intelligence layer for <b>regulated asset management</b></div>
      <div class="foot-status"><span class="dot"></span>SYSTEMS NOMINAL · LAST SYNC 14:32 UTC</div>
    </div>
    <div class="foot-bottom">
      <div class="foot-l">
        <p class="foot-copy">© 2026 Uchuva Tech. All rights reserved.</p>
        <p class="foot-tm">Fletaris™ is a trademark of Uchuva Tech.</p>
      </div>
      <div class="foot-r">
        <a href="${PRIVACY_POLICY_URL}">Privacy</a>
        <div class="foot-vbar"></div>
        <a href="mailto:operations@fletaris.com">operations@fletaris.com</a>
        <div class="foot-vbar"></div>
        <div class="foot-pb">
          <span class="foot-pb-l">Powered by</span>
          <img src="/images/uchuva-sm.png" alt="Uchuva"/>
          <span class="foot-pb-name">Uchuva</span>
        </div>
      </div>
    </div>
  </div>
</footer>
`;

export const AIR_BODY_HTML = normalizeSelfClosingTags(RAW_AIR_BODY_HTML);
