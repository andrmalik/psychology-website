/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  // Добавляем настройки для заголовка
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Добавляем для мобильных устройств
          {
            key: 'Viewport-Fit',
            value: 'cover'
          }
        ],
      },
    ]
  },
  // Добавляем важные настройки
  reactStrictMode: true,
  swcMinify: true,
  // Оптимизация изображений
  images: {
    domains: ['localhost'], // Добавьте ваши домены
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Оптимизация для мобильных
  experimental: {
    optimizeCss: true, // Оптимизация CSS
    scrollRestoration: true, // Улучшенная прокрутка
  },
  // Компрессия
  compress: true,
}

module.exports = nextConfig