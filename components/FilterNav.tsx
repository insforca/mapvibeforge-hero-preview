const filters = [
  { label: 'New York', href: '#new-york' },
  { label: 'London', href: '#london' },
  { label: 'Paris', href: '#paris' },
  { label: 'Tokyo', href: '#tokyo' },
  { label: 'Mediterranean Vibes', href: '#mediterranean-vibes' },
  { label: 'Housewarming', href: '#housewarming' },
  { label: 'Minimalist', href: '#minimalist' },
]

export default function FilterNav() {
  return (
    <>
      <style>{`
        .filter-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 400;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 0.02em;
          padding: 0.25rem 0.875rem;
          flex-shrink: 0;
          border-bottom: 1px solid transparent;
          transition: border-color 0.15s ease;
        }
        .filter-link:hover {
          border-bottom-color: #1a1a1a;
        }
      `}</style>
      <div
        style={{
          background: '#faf9f6',
          borderTop: '1px solid #e8e3dc',
          borderBottom: '1px solid #e8e3dc',
          position: 'sticky',
          top: '64px',
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            height: '52px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              color: '#8a7f72',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              flexShrink: 0,
              marginRight: '1rem',
            }}
          >
            Browse by
          </span>

          {filters.map((filter) => (
            <a
              key={filter.href}
              href={filter.href}
              className="filter-link"
            >
              {filter.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
