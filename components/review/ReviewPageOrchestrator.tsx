'use client';

import { useState } from 'react';
import { ARExperience } from './ARExperience';
import { ClientReviewFlow } from './ClientReviewFlow';

export function ReviewPageOrchestrator({ initialData, isEmbedded = false }: { initialData: any, isEmbedded?: boolean }) {
  const [showAR, setShowAR] = useState(true);

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
    return <ClientReviewFlow initialData={initialData} />;
  }

  return (
    <div className="min-h-[100dvh] bg-slate-900 flex items-center justify-center p-0 sm:p-4 md:p-8">
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[90vh] sm:max-w-[400px] bg-slate-900 sm:rounded-[2.5rem] sm:overflow-hidden relative shadow-2xl flex flex-col">
        <ClientReviewFlow initialData={initialData} />
      </div>
    </div>
  );
}
