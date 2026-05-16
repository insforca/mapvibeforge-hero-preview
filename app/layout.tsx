import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'City Map Prints — The Map Art Gazette',
  description: 'Curated city map prints for interiors, gifting, and travel-inspired spaces. The editorial source for map wall art — New York, London, Paris, Tokyo and 500+ cities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
