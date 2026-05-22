import { Suspense } from 'react';
import { ClientReviewFlow } from '@/components/review/ClientReviewFlow';

export default function ReviewPage() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">Loading review experience...</div>}>
        <ClientReviewFlow />
      </Suspense>
    </main>
  );
}
