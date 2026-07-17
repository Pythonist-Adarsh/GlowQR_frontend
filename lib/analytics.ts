import { sendGAEvent } from '@next/third-parties/google'

export function trackEvent(eventName: string, params?: Record<string, any>) {
  sendGAEvent('event', eventName, params)
}
