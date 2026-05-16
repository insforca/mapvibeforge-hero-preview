import { galleryItems } from '@/lib/gallery-data'
import GalleryCard from './GalleryCard'

export default function GalleryGrid() {
  return (
    <section
      id="gallery"
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8a7f72',
            marginBottom: '0.75rem',
          }}
        >
          The Collection
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 400,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
          }}
        >
          City Map Prints
        </h2>
      </div>

      {/* CSS for card hover effect */}
      <style>{`
        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(26,26,26,0.08);
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
