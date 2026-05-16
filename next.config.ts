import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Transpile packages that use ESM
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
