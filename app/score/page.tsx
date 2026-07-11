'use client';

import { HealthCheckerFlow } from '@/components/health/HealthCheckerFlow';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

export default function ScorePage() {
  const theme = {
    bgPrimary: '#FAFAF8',
    bgCard: '#FFFFFF',
    textPrimary: '#1F2430',
    textSecondary: '#62687A',
    accent: '#2F5FE0',
    borderDefault: '#E2E4E9',
    successMain: '#0F835A',
  };

  return (
    <div style={{ backgroundColor: theme.bgPrimary }} className="min-h-screen font-sans flex flex-col">
      <LandingNavbar forceScrolled={true} />
      
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --bg-primary: ${theme.bgPrimary};
          --bg-card: ${theme.bgCard};
          --text-primary: ${theme.textPrimary};
          --text-secondary: ${theme.textSecondary};
          --accent: ${theme.accent};
          --border-default: ${theme.borderDefault};
          --success-main: ${theme.successMain};
        }
      `}} />
      <div className="w-full flex-1 flex items-start justify-center px-4 pt-32 pb-20">
        <HealthCheckerFlow />
      </div>
    </div>
  );
}
