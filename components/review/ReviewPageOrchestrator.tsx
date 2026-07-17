'use client';
import { useState, useEffect } from 'react';
import { ARExperience } from './ARExperience';
import { ClientReviewFlow } from './ClientReviewFlow';
import { getThemeVariables } from './themeUtils';
import { API_BASE_URL } from '@/lib/api-config';
import { trackEvent } from '@/lib/analytics';

export function ReviewPageOrchestrator({ initialData, isEmbedded = false }: { initialData: any, isEmbedded?: boolean }) {
  const [showAR, setShowAR] = useState(true);

  useEffect(() => {
    if (!isEmbedded) {
      const slug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
      if (slug) {
        trackEvent('qr_scanned', { 
          business_id: slug, 
          category: initialData.business_category || initialData.category 
        });
        fetch(`${API_BASE_URL}/api/scan/record`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qr_slug: slug,
            stage: 'scanned',
            device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
          })
        }).then(res => res.json()).then(data => {
            if (data.session_id) {
                sessionStorage.setItem('glowqr_scan_session', data.session_id);
            }
        }).catch(e => console.error(e));
      }
    }
  }, [isEmbedded]);

  const plan = initialData.plan || (initialData.theme === 'free' ? 'free' : initialData.theme === 'classic' ? 'basic' : 'premium');
  const themeVars = getThemeVariables(plan, initialData.primaryColor || initialData.brandColor);

  return (
    <div style={themeVars} className="h-full w-full bg-[var(--bg-primary)]">
      {showAR ? (
        <ARExperience 
          businessData={initialData} 
          plan={plan} 
          onComplete={() => setShowAR(false)} 
        />
      ) : isEmbedded ? (
        <ClientReviewFlow initialData={initialData} isPreview={true} />
      ) : (
        <div className="min-h-[100dvh] bg-[var(--bg-primary)] flex items-center justify-center p-0 sm:p-4 md:p-8">
          <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[90vh] sm:max-w-[400px] bg-[var(--bg-primary)] sm:rounded-[2.5rem] sm:overflow-hidden relative shadow-2xl flex flex-col">
            <ClientReviewFlow initialData={initialData} isPreview={false} />
          </div>
        </div>
      )}
    </div>
  );
}
