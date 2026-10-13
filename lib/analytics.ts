import { sendGAEvent } from '@next/third-parties/google';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Returns UTM / referral attribution stored in localStorage by UTMTracker.
 * Returns an empty object if nothing is stored or attribution has expired.
 * Keys are prefixed with `first_` so GA4 treats them as first-touch parameters.
 */
export function getStoredUTMs(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const timestampStr = localStorage.getItem('glowqr_utm_timestamp');
    const timestamp = timestampStr ? parseInt(timestampStr, 10) : 0;
    if (!timestamp || Date.now() - timestamp > THIRTY_DAYS_MS) {
      return {};
    }

    const utms: Record<string, string> = {};
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const;

    keys.forEach(k => {
      const val = localStorage.getItem(`glowqr_${k}`);
      if (val) utms[`first_${k}`] = val;
    });

    const ref = localStorage.getItem('glowqr_referrer');
    if (ref) utms['first_referrer'] = ref;

    return utms;
  } catch {
    return {};
  }
}

/**
 * Returns true only for internal / admin traffic that should NOT pollute GA4.
 *
 * Rules (intentionally narrow — normal client users are NEVER excluded):
 *  1. localhost / 127.0.0.1 — local development
 *  2. Any URL under /admin — the admin panel itself
 *     (the admin_session cookie is httpOnly and cannot be read client-side,
 *      but every admin page is under /admin, so the pathname check is sufficient)
 */
export function isInternalTraffic(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname;

  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return true;
  }

  // Admin panel — all admin routes are mounted under /admin
  if (window.location.pathname.startsWith('/admin')) {
    return true;
  }

  return false;
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (isInternalTraffic()) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GA4 suppressed – internal] ${eventName}`, params);
    }
    return;
  }

  if (params) {
    // Strip PII fields before sending to GA4
    const safeParams = { ...params };
    delete safeParams.email;
    delete safeParams.password;
    delete safeParams.phone;
    delete safeParams.full_name;
    sendGAEvent('event', eventName, safeParams);
  } else {
    sendGAEvent('event', eventName);
  }
}
