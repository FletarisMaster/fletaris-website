// Investor deck request — the "For investors" form on the hub and /air (<InvestorForm />).
// Same Worker and same pattern as the waitlist binder (src/lib/waitlist.ts); the request is
// told apart by `kind: "investor"` (see worker/README.md).

import {
  campaignTags,
  isEmail,
  loadTurnstile,
  PRIVACY_POLICY_VERSION,
  TURNSTILE_SITE_KEY,
  WAITLIST_CONTACT_EMAIL,
  WAITLIST_ENDPOINT,
  type TurnstileApi,
} from '@/lib/waitlist';

/** The notice under the investor form. Followed by a "Privacy Policy" link. */
export const INVESTOR_PRIVACY_LINE =
  'We use these details only to send you the investor deck and follow up on it, and keep them for up to 12 months.';

/**
 * Sent as `fleetsize` as well as `kind`, so the older live Worker (which ignores `kind` and
 * requires a fleet size) still stores the request, marked the same way the new one marks it.
 */
const INVESTOR_FLEET_SIZE = 'Investor deck';

/**
 * Wires the investor form in the DOM (ids prefixed `investor-`, so it can share a page with
 * the waitlist form). Returns a cleanup that undoes everything.
 */
export function bindInvestorForm(): () => void {
  const form = document.getElementById('investor-form') as HTMLFormElement | null;
  if (!form) return () => {};
  campaignTags();

  const success = document.getElementById('investor-success');
  const errBanner = document.getElementById('investor-error-banner');
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const btnLabel = btn?.firstChild?.nodeType === Node.TEXT_NODE ? btn.firstChild : null;
  const btnText = btnLabel?.textContent ?? '';
  const slot = form.querySelector<HTMLElement>('[data-turnstile-slot]');
  const field = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value ?? '';
  const setErr = (groupId: string, on: boolean) => {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.classList.toggle('has-error', on);
    group.querySelector('input')?.setAttribute('aria-invalid', String(on));
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
        /* handled at submit time */
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

    const nameBad = !field('investor-name').trim();
    const emailBad = !isEmail(field('investor-email'));
    setErr('group-investor-name', nameBad);
    setErr('group-investor-email', emailBad);
    if (nameBad || emailBad) {
      document.getElementById(nameBad ? 'investor-name' : 'investor-email')?.focus();
      return;
    }

    let turnstileToken: string | undefined;
    if (TURNSTILE_SITE_KEY) {
      turnstileToken = widgetId && turnstile ? turnstile.getResponse(widgetId) : undefined;
      if (!turnstileToken) {
        showError(`Please wait for the verification check to finish. If it doesn't load, email ${WAITLIST_CONTACT_EMAIL}.`);
        return;
      }
    }

    setBusy(true);
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'investor',
          // One name field: the Worker's Notion title is "First Last", so the whole name goes first.
          firstname: field('investor-name').trim(),
          email: field('investor-email').trim(),
          company: field('investor-fund').trim(),
          fleetsize: INVESTOR_FLEET_SIZE,
          source: window.location.pathname,
          utm: campaignTags(),
          policyVersion: PRIVACY_POLICY_VERSION,
          website: field('investor-website'),
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (cancelled) return;
      form!.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    } catch {
      if (cancelled) return;
      setBusy(false);
      if (widgetId && turnstile) turnstile.reset(widgetId);
      showError(`Something went wrong. Please try again, or email ${WAITLIST_CONTACT_EMAIL}.`);
    }
  }

  const editListeners: Array<[HTMLElement, () => void]> = [];
  for (const id of ['investor-name', 'investor-email']) {
    const el = document.getElementById(id);
    if (!el) continue;
    const fn = () => setErr(`group-${id}`, false);
    el.addEventListener('input', fn);
    editListeners.push([el, fn]);
  }

  // "Request the investor deck" links elsewhere on the page (the fleet timeline) scroll here
  // by their #investors href; open the form (it sits in a <details>) and put the cursor in the
  // first field too.
  const onCtaClick = (e: Event) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a[data-investor-cta]');
    if (!a) return;
    (document.getElementById('investor-details') as HTMLDetailsElement | null)?.setAttribute('open', '');
    setTimeout(() => document.getElementById('investor-name')?.focus({ preventScroll: true }), 500);
  };
  document.addEventListener('click', onCtaClick);

  form.addEventListener('submit', onSubmit);
  if (btn) btn.disabled = false;

  return () => {
    cancelled = true;
    form.removeEventListener('submit', onSubmit);
    document.removeEventListener('click', onCtaClick);
    for (const [el, fn] of editListeners) el.removeEventListener('input', fn);
    if (widgetId && turnstile) turnstile.remove(widgetId);
  };
}
