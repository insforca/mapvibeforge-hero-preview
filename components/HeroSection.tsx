import CityMapSvg from '@/components/CityMapSvg'

const COVER_LINES = [
  { city: 'London', label: 'Heritage', blurb: 'Thames-side living & the art of the framed map wall' },
  { city: 'Barcelona', label: 'Mediterranean', blurb: 'Eixample geometry as interior statement' },
  { city: 'Amsterdam', label: 'Canal Quarter', blurb: "The canal city's concentric beauty, in print" },
]

export default function HeroSection() {
  return (
    <section style={{ background: '#faf9f6', borderBottom: '1px solid #d8d2c8' }}>
      {/* Cover rule */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ borderBottom: '1px solid #d8d2c8', padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a7f72' }}>
            This Issue
          </span>
          <div style={{ flex: 1, height: '1px', background: '#d8d2c8' }}/>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a7f72' }}>
            The Art of Cartography: Inside Curated Homes
          </span>
        </div>
      </div>

      {/* Main cover grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '0',
          minHeight: '560px',
        }}>

          {/* LEFT — Editorial cover text */}
          <div style={{
            padding: '3.5rem 3.5rem 3.5rem 0',
            borderRight: '1px solid #d8d2c8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#8a7f72',
                marginBottom: '1.25rem',
              }}>
                Cover Story — Issue No. 01
              </p>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                fontWeight: 400,
                lineHeight: 1.08,
                color: '#1a1a1a',
                letterSpacing: '-0.025em',
                marginBottom: '1.5rem',
              }}>
                The Art of<br />Cartography:<br />
                <em style={{ fontStyle: 'italic' }}>Inside Curated Homes</em>
              </h1>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 300,
                lineHeight: 1.75,
                color: '#8a7f72',
                maxWidth: '380px',
                marginBottom: '2rem',
              }}>
                How a framed city map became the defining object of the considered interior — from Japandi studios to Mediterranean villas.
              </p>
              <a href="#gallery" style={{
                display: 'inline-block',
                background: '#1a1a1a',
                color: '#faf9f6',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
              }}>
                Browse the Collection
              </a>
            </div>

            {/* Cover lines — 3 teaser items */}
            <div style={{ marginTop: '2.5rem', borderTop: '1px solid #d8d2c8', paddingTop: '1.5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c8b89a',
                marginBottom: '1rem',
              }}>
                Also in this issue
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {COVER_LINES.map(({ city, label, blurb }) => (
                  <div key={city} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#c8b89a',
                      paddingTop: '2px',
                      whiteSpace: 'nowrap',
                      minWidth: '70px',
                    }}>
                      {label}
                    </span>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: 300,
                      color: '#4a4743',
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      {blurb}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Cover image: large framed Manhattan map */}
          <div style={{
            padding: '2.5rem 0 2.5rem 3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            {/* Main feature print */}
            <div style={{
              width: '100%',
              maxWidth: '440px',
              aspectRatio: '3/4',
              background: '#e8e2d4',
              padding: '14px',
              boxSizing: 'border-box',
              boxShadow: '0 20px 64px rgba(26,26,26,0.14)',
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: '#fff',
                padding: '10px',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 0 0 0.75px rgba(26,26,26,0.1)',
              }}>
                <CityMapSvg style="manhattan" city="New York" width="100%" height="100%"/>
              </div>
            </div>

            {/* Small Paris print, overlapping bottom-right */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              width: '140px',
              aspectRatio: '3/4',
              background: '#e8e2d4',
              padding: '8px',
              boxSizing: 'border-box',
              boxShadow: '0 8px 28px rgba(26,26,26,0.16)',
              transform: 'rotate(-1.5deg)',
            }}>
              <div style={{ width: '100%', height: '100%', background: '#fff', padding: '5px', boxSizing: 'border-box', boxShadow: 'inset 0 0 0 0.5px rgba(26,26,26,0.08)' }}>
                <CityMapSvg style="paris" city="Paris" width="100%" height="100%"/>
              </div>
            </div>

            {/* Issue stamp */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '64px',
              height: '64px',
              border: '1.5px solid #1a1a1a',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#faf9f6',
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7f72', lineHeight: 1.2, textAlign: 'center' }}>Issue</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', color: '#1a1a1a', lineHeight: 1 }}>01</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.45rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a7f72' }}>2025</span>
            </div>
          </div>

        </div>
      </div>

      {/* Cover banner — like a magazine bottom strip */}
      <div style={{
        background: '#1a1a1a',
        padding: '0.75rem 2rem',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
        }}>
          {['New York · London · Paris · Tokyo', 'Barcelona · Amsterdam · Rome · Copenhagen', '500+ Cities Worldwide'].map((text, i) => (
            <span key={i} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#c8b89a',
              whiteSpace: 'nowrap',
            }}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
