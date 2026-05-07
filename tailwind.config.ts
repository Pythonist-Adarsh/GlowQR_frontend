import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Syne', 'sans-serif'],
        body: ['var(--font-body)', 'DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#3D261C',
          light: '#5C3D2E',
          dark: '#2D1B14',
          accent: '#F07C3C',
          gold: '#E8A051',
          coral: '#D94848',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'scale-in':
          'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        shimmer: 'shimmer 1.5s infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(240,124,60,0.25)' },
          '50%': { boxShadow: '0 0 28px rgba(240,124,60,0.55)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        brand: '0 4px 22px rgba(240, 124, 60, 0.28)',
        'brand-lg': '0 8px 36px rgba(240, 124, 60, 0.35)',
        accent: '0 4px 20px rgba(240, 124, 60, 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config
