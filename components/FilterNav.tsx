import { taxonomy } from '@/lib/content'

/** Crawlable browse bar: plain links to the library, no JS filtering. */
export default function FilterNav() {
  return (
    <nav className="browse" aria-label="Browse the library">
      <div className="container">
        <span className="eyebrow">Browse by</span>
        {taxonomy.families.map((f) => (
          <a key={f.slug} href={`/styles#${f.slug}`}>
            {f.name}
          </a>
        ))}
        {taxonomy.styles
          .filter((s) => s.family !== 'mapvibe-studio')
          .map((s) => (
            <a key={s.slug} href={`/styles/${s.slug}`}>
              {s.name}
            </a>
          ))}
      </div>
    </nav>
  )
}
