'use client';

import { useEffect } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const;
const STORAGE_PREFIX = 'glowqr_';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function UTMTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hasNewTrackingParams = UTM_KEYS.some(key => searchParams.has(key));

      const now = Date.now();
      const existingTimestampStr = localStorage.getItem(`${STORAGE_PREFIX}utm_timestamp`);
      const existingTimestamp = existingTimestampStr ? parseInt(existingTimestampStr, 10) : 0;
      const isExpired = !existingTimestamp || (now - existingTimestamp > THIRTY_DAYS_MS);

      if (hasNewTrackingParams) {
        // New UTM parameters found in URL: capture or update them with fresh 30-day timestamp
        UTM_KEYS.forEach(key => {
          const val = searchParams.get(key);
          if (val) {
            localStorage.setItem(`${STORAGE_PREFIX}${key}`, val);
          }
        });
        localStorage.setItem(`${STORAGE_PREFIX}utm_timestamp`, now.toString());

        if (document.referrer) {
          localStorage.setItem(`${STORAGE_PREFIX}referrer`, document.referrer);
        }
      } else if (isExpired && existingTimestampStr) {
        // Expired past 30 days and no new UTM params: clean up stale attribution
        UTM_KEYS.forEach(key => localStorage.removeItem(`${STORAGE_PREFIX}${key}`));
        localStorage.removeItem(`${STORAGE_PREFIX}utm_timestamp`);
        localStorage.removeItem(`${STORAGE_PREFIX}referrer`);
      }
    } catch {
      // Ignore localStorage exceptions (e.g. restricted iframe or quota exceeded)
    }
  }, []);

  return null;
}
