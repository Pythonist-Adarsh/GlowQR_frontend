'use client';

import { useState, useEffect } from 'react';
import { ARExperience } from './ARExperience';
import { ClientReviewFlow } from './ClientReviewFlow';
import { API_BASE_URL } from '@/lib/api-config';

export function ReviewPageOrchestrator({ initialData, isEmbedded = false }: { initialData: any, isEmbedded?: boolean }) {
  const [showAR, setShowAR] = useState(true);

  useEffect(() => {
    if (!isEmbedded) {
      const slug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
      if (slug) {
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

  if (showAR) {
    return (
      <ARExperience 
        businessData={initialData} 
        plan={initialData.plan || 'premium'} 
        onComplete={() => setShowAR(false)} 
      />
    );
  }

  if (isEmbedded) {
    return <ClientReviewFlow initialData={initialData} isPreview={true} />;
  }

  return (
    <div className="min-h-[100dvh] bg-slate-900 flex items-center justify-center p-0 sm:p-4 md:p-8">
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[90vh] sm:max-w-[400px] bg-slate-900 sm:rounded-[2.5rem] sm:overflow-hidden relative shadow-2xl flex flex-col">
        <ClientReviewFlow initialData={initialData} isPreview={false} />
      </div>
    </div>
  );
}
