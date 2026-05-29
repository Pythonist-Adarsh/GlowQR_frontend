export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000')
  : 'https://glowqr.onrender.com';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://glowqrfrontend.vercel.app';
