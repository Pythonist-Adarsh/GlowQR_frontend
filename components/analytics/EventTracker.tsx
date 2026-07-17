'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function EventTracker({ eventName, params }: { eventName: string; params?: Record<string, any> }) {
  useEffect(() => {
    trackEvent(eventName, params);
  }, [eventName, params]);
  
  return null;
}
