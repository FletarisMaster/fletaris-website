'use client';

import { useEffect } from 'react';
import { LIFECYCLE_VIEWS, type LifecycleView } from '@/lib/airLifecycleViews';

// Replaces `<script src="/js/air-lifecycle.js">` (see WaitlistBehavior for why). /air's
// markup is still an injected HTML string (airBody.ts), so this drives it through the DOM
// exactly as the old script did; F36 rebuilds /air as real components.

function render(v: LifecycleView) {
  const set = (id: string, html: string) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  set('lc-msn', `${v.msn}<span class="reg">${v.reg}</span>`);
  set('lc-sub', v.sub);
  set(
    'lc-tracks',
    v.tracks
      .map((tr) => {
        const bars = tr.bars
          .map((b) => {
            const flag = b.flag ? `<div class="lc-flag" style="left:0;">${b.flag}</div>` : '';
            return `<div class="lc-bar ${b.cls}" style="left:${b.l}%;width:${b.w}%;">${flag}${b.t}</div>`;
          })
          .join('');
        return `<div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">${tr.name}</div><div class="lc-track-sub">${tr.sub}</div></div><div class="lc-bar-area">${bars}</div></div>`;
      })
      .join('')
  );
  set(
    'lc-foot',
    v.alerts
      .map(
        (a) =>
          `<div class="lc-alert"><div class="lc-alert-dot" style="background:${a.dot};"></div><div class="lc-alert-text"><b style="color:${a.tone};">${a.name}</b>${a.body}<span class="when">${a.when}</span></div></div>`
      )
      .join('')
  );
  set('lc-leg-r', v.legR);
}

export default function AirLifecycleTabs() {
  useEffect(() => {
    // The default tab (msn7842) is pre-rendered in the static markup, so nothing is
    // rendered on mount — only in response to a tab click.
    const tabs = Array.from(document.querySelectorAll<HTMLElement>('.lc-tab'));
    const onClick = (e: Event) => {
      const tab = e.currentTarget as HTMLElement;
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-view') ?? 'fleet';
      render(LIFECYCLE_VIEWS[key] ?? LIFECYCLE_VIEWS.fleet);
    };
    tabs.forEach((t) => t.addEventListener('click', onClick));
    return () => tabs.forEach((t) => t.removeEventListener('click', onClick));
  }, []);
  return null;
}
