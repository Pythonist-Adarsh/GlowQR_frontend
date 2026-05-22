'use client';
import dynamic from 'next/dynamic';

export const ClientReviewFlow = dynamic(() => import('@/components/review/ReviewFlow'), { ssr: false });
