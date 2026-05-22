import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Google Sans'", "'Plus Jakarta Sans'", 'Roboto', 'sans-serif'],
        display: ["'Google Sans'", "'Plus Jakarta Sans'", 'Roboto', 'sans-serif'],
        body: ["'Google Sans'", "'Plus Jakarta Sans'", 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#111111',
          light: '#333333',
          dark: '#000000',
          accent: '#111111',
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
