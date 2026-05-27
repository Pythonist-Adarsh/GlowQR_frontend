'use client';

import { useState } from 'react';
import { ARExperience } from './ARExperience';
import { ClientReviewFlow } from './ClientReviewFlow';

export function ReviewPageOrchestrator({ initialData }: { initialData: any }) {
  // Using 'premium' as mock plan for demonstration. 
  // In a real app, this comes from the backend payload.
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

  return <ClientReviewFlow initialData={initialData} />;
}
