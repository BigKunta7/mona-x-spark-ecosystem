/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration optimisée pour MONA x SPARK
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },

  // Images optimisées
  images: {
    domains: [
      'supabase.co',
      'backblaze.com',
      'cloudflare.com',
      'replicate.delivery'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // PWA Configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Optimisations pour MONA x SPARK
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Variables d'environnement
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Configuration pour Supabase
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },

  // TypeScript et ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 