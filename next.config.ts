import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'https://glowqr.onrender.com/auth/:path*',
      },
    ];
  },
}

export default nextConfig
