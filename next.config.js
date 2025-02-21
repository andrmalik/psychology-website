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
        ],
      },
    ]
  },
  // Оптимизация изображений
  images: {
    domains: ['localhost'],
  },
  // Только поддерживаемые экспериментальные функции
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig