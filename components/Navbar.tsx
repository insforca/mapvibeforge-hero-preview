export default function Navbar() {
  return (
    <nav
      style={{
        background: '#faf9f6',
        borderBottom: '1px solid #e8e3dc',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.375rem',
            fontWeight: 500,
            color: '#1a1a1a',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          MapVibe
        </a>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a
            href="#gallery"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 400,
              color: '#8a7f72',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Gallery
          </a>
          <a
            href="#about"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 400,
              color: '#8a7f72',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            About
          </a>
          <a
            href="#gallery"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 400,
              color: '#1a1a1a',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '1px',
            }}
          >
            Create Your Map →
          </a>
        </div>
      </div>
    </nav>
  )
}
