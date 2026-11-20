export default function NotFound() {
  return (
    <header className="page-head">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This map is not in the library.</h1>
        <p className="lede" style={{ marginBottom: '2rem' }}>
          The page may have moved, or the entry was retired.
        </p>
        <a className="btn" href="/styles">
          Browse the Styles
        </a>
      </div>
    </header>
  )
}
