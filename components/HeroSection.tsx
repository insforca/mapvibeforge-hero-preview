import CityMapSvg from '@/components/CityMapSvg'

export default function HeroSection() {
  return (
    <section
      style={{
        background: '#faf9f6',
        padding: '6rem 2rem 5rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Left: Text */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8a7f72',
              marginBottom: '1.5rem',
            }}
          >
            City Map Art
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#1a1a1a',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Maps That Make<br />a Home
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#8a7f72',
              marginBottom: '2.5rem',
              maxWidth: '440px',
            }}
          >
            Curated city map prints for interiors, gifting, and travel-inspired spaces.
          </p>

          <a
            href="#gallery"
            style={{
              display: 'inline-block',
              background: '#1a1a1a',
              color: '#faf9f6',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0.875rem 2rem',
              border: 'none',
            }}
          >
            Create Your Map
          </a>
        </div>

        {/* Right: Three framed city map prints, stacked editorially */}
        <div style={{ position: 'relative', height: '540px' }}>

          {/* Back — Paris, rotated right */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              width: '210px',
              height: '285px',
              transform: 'rotate(2.5deg)',
              boxShadow: '0 10px 36px rgba(26,26,26,0.13)',
              background: '#ede8dc',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ width: '100%', height: '100%', background: '#fff', padding: '6px', boxSizing: 'border-box', boxShadow: 'inset 0 0 0 0.5px rgba(26,26,26,0.1)' }}>
              <CityMapSvg style="paris" city="Paris" width="100%" height="100%"/>
            </div>
          </div>

          {/* Middle — Manhattan, rotated left */}
          <div
            style={{
              position: 'absolute',
              top: '3rem',
              left: '1rem',
              width: '230px',
              height: '310px',
              transform: 'rotate(-2deg)',
              boxShadow: '0 10px 36px rgba(26,26,26,0.13)',
              background: '#ede8dc',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ width: '100%', height: '100%', background: '#fff', padding: '6px', boxSizing: 'border-box', boxShadow: 'inset 0 0 0 0.5px rgba(26,26,26,0.1)' }}>
              <CityMapSvg style="manhattan" city="New York" width="100%" height="100%"/>
            </div>
          </div>

          {/* Front — Tokyo, centered, slight tilt */}
          <div
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              left: '50%',
              transform: 'translateX(-50%) rotate(0.8deg)',
              width: '195px',
              height: '262px',
              boxShadow: '0 16px 48px rgba(26,26,26,0.18)',
              background: '#ede8dc',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ width: '100%', height: '100%', background: '#fff', padding: '6px', boxSizing: 'border-box', boxShadow: 'inset 0 0 0 0.5px rgba(26,26,26,0.1)' }}>
              <CityMapSvg style="tokyo" city="Tokyo" width="100%" height="100%"/>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
