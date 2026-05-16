export default function Footer() {
  return (
    <footer
      style={{
        background: '#1a1a1a',
        color: '#faf9f6',
        padding: '4rem 2rem 3rem',
        borderTop: '1px solid #e8e3dc',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Top row: wordmark + links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Wordmark */}
          <a
            href="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.375rem',
              fontWeight: 500,
              color: '#faf9f6',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            City Map Prints
          </a>

          {/* Nav links */}
          <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Gallery', href: '#gallery' },
              { label: 'About', href: '#about' },
              { label: 'Privacy', href: '#privacy' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#8a7f72',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '2rem',
          }}
        />

        {/* Bottom row: tagline + copyright */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#c8b89a',
              letterSpacing: '0.01em',
            }}
          >
            The map art gazette for spaces that inspire.
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 300,
              color: '#8a7f72',
              letterSpacing: '0.04em',
            }}
          >
            &copy; 2025 City Map Prints
          </p>
        </div>
      </div>
    </footer>
  )
}
