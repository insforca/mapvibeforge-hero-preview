export default function Navbar() {
  return (
    <header style={{ background: '#faf9f6', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Pre-header: issue / date info */}
      <div style={{ borderBottom: '1px solid #d8d2c8', padding: '0.4rem 2rem' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7f72' }}>
            No. 01 — Summer 2025
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7f72' }}>
            Explore. Discover. Connect.
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7f72' }}>
            citymapprints.com
          </span>
        </div>
      </div>

      {/* Masthead */}
      <div style={{ padding: '1.25rem 2rem 0.875rem', textAlign: 'center', borderBottom: '1px solid #d8d2c8' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'block' }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            display: 'block',
            lineHeight: 1,
          }}>
            City Map Prints
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6875rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8a7f72',
            display: 'block',
            marginTop: '0.375rem',
          }}>
            The Map Art Gazette
          </span>
        </a>
      </div>

      {/* Section nav — magazine tabs */}
      <nav style={{ borderBottom: '2px solid #1a1a1a' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 2rem', height: '42px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
        }}>
          {[
            { label: 'Collections', href: '#gallery' },
            { label: 'Cities', href: '#gallery' },
            { label: 'Style Guide', href: '#gallery' },
            { label: 'Gift Guide', href: '#housewarming' },
            { label: 'About', href: '#faq' },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              {label}
            </a>
          ))}
          <span style={{ flexGrow: 1 }}/>
          <a href="#gallery" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#faf9f6',
            background: '#1a1a1a',
            padding: '0.4rem 1.125rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Create Your Map
          </a>
        </div>
      </nav>
    </header>
  )
}
