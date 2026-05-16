import Image from 'next/image'

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

        {/* Right: Editorial image collage */}
        <div
          style={{
            position: 'relative',
            height: '540px',
          }}
        >
          {/* Back image */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '3rem',
              width: '220px',
              height: '300px',
              boxShadow: '0 8px 32px rgba(26,26,26,0.10)',
              background: '#f5f2ed',
              transform: 'rotate(2deg)',
            }}
          >
            <Image
              src="https://picsum.photos/seed/interior1/440/600"
              alt="City map art print in warm modern interior"
              fill
              style={{ objectFit: 'cover' }}
              sizes="220px"
            />
          </div>

          {/* Middle image */}
          <div
            style={{
              position: 'absolute',
              top: '4rem',
              left: '2rem',
              width: '240px',
              height: '320px',
              boxShadow: '0 8px 32px rgba(26,26,26,0.10)',
              background: '#f5f2ed',
              transform: 'rotate(-1.5deg)',
            }}
          >
            <Image
              src="https://picsum.photos/seed/mapwall/480/640"
              alt="Editorial city map print in styled living room"
              fill
              style={{ objectFit: 'cover' }}
              sizes="240px"
            />
          </div>

          {/* Front image */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%) rotate(0.5deg)',
              width: '200px',
              height: '270px',
              boxShadow: '0 12px 40px rgba(26,26,26,0.14)',
              background: '#f5f2ed',
            }}
          >
            <Image
              src="https://picsum.photos/seed/villa/400/533"
              alt="Framed city map art print for home decor"
              fill
              style={{ objectFit: 'cover' }}
              sizes="200px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
