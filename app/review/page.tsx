import ReviewFlow from '@/components/review/ReviewFlow';
import { Suspense } from 'react';

export default function ReviewPage() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">Loading review experience...</div>}>
        <ReviewFlow />
      </Suspense>
    </main>
  );
}
