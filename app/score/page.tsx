'use client';

import { HealthCheckerFlow } from '@/components/health/HealthCheckerFlow';

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
    <div style={{ backgroundColor: theme.bgPrimary }} className="min-h-screen py-12 md:py-20 px-4 font-sans flex items-center justify-center">
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
      <div className="w-full">
        <HealthCheckerFlow />
      </div>
    </div>
  );
}
