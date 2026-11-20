import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Gallery images are pre-sized WebP from scripts/gallery/*; skip Vercel's optimizer quota.
  images: { unoptimized: true },
}

export default nextConfig
