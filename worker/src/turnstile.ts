const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** True when Cloudflare confirms the token. Missing token, network error or timeout → false. */
export async function verifyTurnstile(token: string | undefined, ip: string | null, secret: string): Promise<boolean> {
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const r = await fetch(SITEVERIFY, { method: 'POST', body: form, signal: AbortSignal.timeout(5000) });
    const data = (await r.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
