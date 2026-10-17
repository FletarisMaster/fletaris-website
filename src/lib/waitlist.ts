// Waitlist submission — shared by the hub (/) and /air forms. Both pages render the same
// element ids (#waitlist-form, #email, #fleetsize, …), so one binder serves both.
//
// NEXT_PUBLIC_* values are inlined at build time (output: 'export').

/** The Cloudflare Worker that receives signups and writes them to Notion (see /worker). */
export const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_URL || 'https://fletaris-waitlist.uchuva-tech.workers.dev';

/**
 * Cloudflare Turnstile site key (public by design). Empty = no widget is rendered and no
 * token is sent, so the form keeps working until the widget is created in Cloudflare.
 */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

/** The Privacy Policy lives on the app host (F02). */
export const PRIVACY_POLICY_URL = 'https://app.fletaris.com/legal/privacy';

/** Privacy Policy version shown at the form; sent with each signup as the consent record. */
export const PRIVACY_POLICY_VERSION = '1.1.0';

export const WAITLIST_CONTACT_EMAIL = 'operations@fletaris.com';

/** The notice under both forms (Sam, 2026-10-02). Followed by a "Privacy Policy" link. */
export const WAITLIST_PRIVACY_LINE =
  'We use these details only to contact you about early access, and keep them for up to 12 months.';

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; theme?: 'dark' | 'light' | 'auto'; size?: 'normal' | 'flexible' | 'compact' }
  ) => string;
  getResponse: (widgetId: string) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileLoading: Promise<TurnstileApi> | null = null;

export function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!turnstileLoading) {
    turnstileLoading = new Promise<TurnstileApi>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = TURNSTILE_SCRIPT;
      s.async = true;
      s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing')));
      s.onerror = () => {
        turnstileLoading = null;
        reject(new Error('turnstile failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return turnstileLoading;
}

const UTM_KEY = 'fletaris-utm';

/**
 * UTM tags from the landing URL. Kept for the browser session so a visitor who lands on `/`
 * with tags and signs up on `/air` is still attributed. Storage can throw (private mode).
 */
export function campaignTags(): { source?: string; medium?: string; campaign?: string } | undefined {
  const q = new URLSearchParams(window.location.search);
  const fromUrl = {
    source: q.get('utm_source') || undefined,
    medium: q.get('utm_medium') || undefined,
    campaign: q.get('utm_campaign') || undefined,
  };
  try {
    if (fromUrl.source || fromUrl.medium || fromUrl.campaign) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const saved = sessionStorage.getItem(UTM_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return fromUrl.source || fromUrl.medium || fromUrl.campaign ? fromUrl : undefined;
  }
}

/** `/air` → "air". The hub (`/`) isn't a vertical, so it sends none. */
function verticalFromPath(path: string): string | undefined {
  const seg = path.split('/')[1];
  return ['air', 'drone', 'land', 'sea', 'space'].includes(seg) ? seg : undefined;
}

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

/**
 * Wires the waitlist form currently in the DOM: validation, Turnstile, and the POST to the
 * Worker. Called from a client component's effect, so it runs after every navigation —
 * client-side (next/link) included. Returns a cleanup that undoes everything.
 */
export function bindWaitlistForm(): () => void {
  const form = document.getElementById('waitlist-form') as HTMLFormElement | null;
  if (!form) return () => {};
  campaignTags(); // capture landing-page UTM tags now, before a client-side nav drops the query


  const success = document.getElementById('form-success');
  const errBanner = document.getElementById('form-error-banner');
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const btnLabel = btn?.firstChild?.nodeType === Node.TEXT_NODE ? btn.firstChild : null;
  const btnText = btnLabel?.textContent ?? '';
  const slot = form.querySelector<HTMLElement>('[data-turnstile-slot]');
  const field = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null)?.value ?? '';
  // Marks a field group invalid: red border (has-error), aria-invalid on its control, and its
  // [data-field-error] message shown. The control's aria-describedby points at that message.
  const setErr = (groupId: string, on: boolean) => {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.classList.toggle('has-error', on);
    group.querySelector('input, select')?.setAttribute('aria-invalid', String(on));
    const msg = group.querySelector<HTMLElement>('[data-field-error]');
    if (msg) msg.hidden = !on;
  };

  let cancelled = false;
  let widgetId: string | null = null;
  let turnstile: TurnstileApi | null = null;

  if (TURNSTILE_SITE_KEY && slot) {
    loadTurnstile()
      .then((api) => {
        if (cancelled) return;
        turnstile = api;
        widgetId = api.render(slot, { sitekey: TURNSTILE_SITE_KEY, theme: 'dark', size: 'flexible' });
      })
      .catch(() => {
        /* handled at submit time: no token → the user is told how to reach us */
      });
  }

  function showError(message: string) {
    if (!errBanner) return;
    errBanner.textContent = message;
    errBanner.style.display = 'block';
  }

  function setBusy(busy: boolean) {
    if (!btn) return;
    btn.disabled = busy;
    if (btnLabel) btnLabel.textContent = busy ? 'Sending… ' : btnText;
  }

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (errBanner) errBanner.style.display = 'none';

    const emailBad = !isEmail(field('email'));
    const fleetBad = !field('fleetsize');
    setErr('group-email', emailBad);
    setErr('group-fleetsize', fleetBad);
    if (emailBad || fleetBad) {
      document.getElementById(emailBad ? 'email' : 'fleetsize')?.focus();
      return;
    }

    let turnstileToken: string | undefined;
    if (TURNSTILE_SITE_KEY) {
      turnstileToken = widgetId && turnstile ? turnstile.getResponse(widgetId) : undefined;
      if (!turnstileToken) {
        showError(
          `Please wait for the verification check to finish. If it doesn't load, email ${WAITLIST_CONTACT_EMAIL}.`
        );
        return;
      }
    }

    setBusy(true);
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: field('firstname').trim(),
          lastname: field('lastname').trim(),
          email: field('email').trim(),
          company: field('company').trim(),
          fleetsize: field('fleetsize'),
          vertical: verticalFromPath(window.location.pathname),
          source: window.location.pathname,
          utm: campaignTags(),
          policyVersion: PRIVACY_POLICY_VERSION,
          website: field('website'),
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (cancelled) return;
      form!.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        // The form (and the focused button) just disappeared: move focus to the confirmation so
        // keyboard and screen-reader users land on it and hear it.
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    } catch {
      if (cancelled) return;
      setBusy(false);
      if (widgetId && turnstile) turnstile.reset(widgetId); // tokens are single-use
      showError(`Something went wrong. Please try again, or email ${WAITLIST_CONTACT_EMAIL}.`);
    }
  }

  const clearOnEdit = (groupId: string) => () => setErr(groupId, false);
  const editListeners: Array<[HTMLElement, () => void]> = [];
  for (const id of ['email', 'fleetsize']) {
    const el = document.getElementById(id);
    if (!el) continue;
    const fn = clearOnEdit(`group-${id}`);
    el.addEventListener('input', fn);
    el.addEventListener('change', fn);
    editListeners.push([el, fn]);
  }

  form.addEventListener('submit', onSubmit);
  // The button ships disabled in the static HTML so a submit before hydration can't
  // reload the page and silently drop the entry; enable it now that a handler exists.
  if (btn) btn.disabled = false;

  return () => {
    cancelled = true;
    form.removeEventListener('submit', onSubmit);
    for (const [el, fn] of editListeners) {
      el.removeEventListener('input', fn);
      el.removeEventListener('change', fn);
    }
    if (widgetId && turnstile) turnstile.remove(widgetId);
  };
}
