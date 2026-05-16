import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MapVibe — City Map Prints for Inspired Interiors',
  description: 'Curated city map prints for interiors, gifting, and travel-inspired spaces. Custom wall art for New York, London, Paris, Tokyo and 500+ cities worldwide.',
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
