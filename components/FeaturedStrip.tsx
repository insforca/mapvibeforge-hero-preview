import CityMapSvg from '@/components/CityMapSvg'
import { featuredItems } from '@/lib/gallery-data'

export default function FeaturedStrip() {
  return (
    <section
      style={{
        background: '#f5f2ed',
        padding: '5rem 0',
        borderTop: '1px solid #e8e3dc',
        borderBottom: '1px solid #e8e3dc',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: '2.5rem' }}>
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
            Curated Picks
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              fontWeight: 400,
              color: '#1a1a1a',
              letterSpacing: '-0.02em',
            }}
          >
            Editor&rsquo;s Selection
          </h2>
        </div>
      </div>

      {/* Scrollable strip */}
      <style>{`
        .featured-strip {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 0 2rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
          max-width: 1400px;
          margin: 0 auto;
        }
        .featured-strip::-webkit-scrollbar {
          display: none;
        }
        .featured-card {
          flex: 0 0 320px;
          background: #faf9f6;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease;
          cursor: pointer;
        }
        .featured-card:hover {
          transform: translateY(-3px);
        }
      `}</style>

      <div className="featured-strip">
        {featuredItems.map((item) => (
          <article key={item.id} className="featured-card">
            {/* Map print — landscape mat */}
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                background: '#ede8dc',
                padding: '12px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <div style={{ width: '100%', height: '100%', background: '#fff', padding: '6px', boxSizing: 'border-box', boxShadow: 'inset 0 0 0 0.5px rgba(26,26,26,0.1)' }}>
                <CityMapSvg style={item.mapStyle} city={item.city} width="100%" height="100%"/>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem' }}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8a7f72',
                  marginBottom: '0.375rem',
                }}
              >
                {item.city} — {item.occasion}
              </p>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: '#1a1a1a',
                  lineHeight: 1.35,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.title}
              </h3>

              <a
                href={`#${item.anchor}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#8a7f72',
                  textDecoration: 'none',
                  borderBottom: '1px solid #c8b89a',
                  paddingBottom: '1px',
                }}
              >
                View collection
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
