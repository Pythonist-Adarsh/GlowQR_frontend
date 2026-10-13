'use client';
import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export function EventTracker({ eventName, params }: { eventName: string; params?: Record<string, any> }) {
  const hasFired = useRef(false);
  // Serialize params so the effect only re-runs when values actually change
  const serializedParams = JSON.stringify(params ?? {});

  useEffect(() => {
    if (!hasFired.current) {
      hasFired.current = true;
      trackEvent(eventName, params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, serializedParams]);

  return null;
}
