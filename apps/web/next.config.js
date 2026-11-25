/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
