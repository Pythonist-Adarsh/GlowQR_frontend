'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-config';

export const usePlanGate = (requiredPlan: 'trial' | 'basic' | 'premium') => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPlan, setCurrentPlan] = useState<string>('trial');

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setHasAccess(false);
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          const userPlan = (data?.user?.plan || 'trial').toLowerCase();
          setCurrentPlan(userPlan);
          
          const planOrder = { expired: 0, trial: 0, basic: 1, premium: 2 };
          const userLevel = planOrder[userPlan as keyof typeof planOrder] || 0;
          const requiredLevel = planOrder[requiredPlan];
          
          setHasAccess(userLevel >= requiredLevel);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Failed to check plan", error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlan();
  }, [requiredPlan]);

  return { hasAccess, loading, currentPlan };
};
