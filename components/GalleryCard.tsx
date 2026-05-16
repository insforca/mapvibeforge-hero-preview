import Image from 'next/image'
import type { GalleryItem } from '@/lib/gallery-data'

interface GalleryCardProps {
  item: GalleryItem
}

export default function GalleryCard({ item }: GalleryCardProps) {
  return (
    <article
      id={item.anchor}
      style={{
        background: '#f5f2ed',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease',
      }}
      className="gallery-card"
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          overflow: 'hidden',
          background: '#e8e3dc',
        }}
      >
        <Image
          src={item.imageUrl}
          alt={item.altText}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#8a7f72',
            marginBottom: '0.5rem',
          }}
        >
          {item.city} — {item.theme}
        </p>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.0625rem',
            fontWeight: 400,
            color: '#1a1a1a',
            lineHeight: 1.3,
            marginBottom: '0.625rem',
            letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8125rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: '#8a7f72',
            marginBottom: '1rem',
          }}
        >
          {item.description}
        </p>

        <a
          href="#gallery"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            textDecoration: 'none',
            borderBottom: '1px solid #1a1a1a',
            paddingBottom: '1px',
          }}
        >
          Create this map →
        </a>
      </div>
    </article>
  )
}
