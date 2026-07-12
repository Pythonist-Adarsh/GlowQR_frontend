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
    <div className="min-h-screen font-sans flex flex-col bg-[var(--bg-primary)] transition-colors duration-300">
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
        [data-theme='dark'] {
          --bg-primary: #000000;
          --bg-card: #111111;
          --text-primary: #ffffff;
          --text-secondary: #cccccc;
          --accent: #4B7CFF;
          --border-default: #333333;
          --success-main: #10B981;
        }
      `}} />
      <div className="w-full flex-1 flex items-start justify-center px-4 pt-32 pb-20">
        <HealthCheckerFlow />
      </div>
    </div>
  );
}
