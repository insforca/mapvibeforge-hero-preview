import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, stylesByFamily, taxonomy } from '@/lib/content'

export const metadata: Metadata = {
  title: 'All Map Styles',
  description:
    'Every style in the library: portolan charts, engraved city plans, Edo woodblock maps, Swiss relief, transit diagrams, figure-ground, risograph and the MapVibe Studio palettes.',
  alternates: { canonical: '/styles' },
}

export default function StylesPage() {
  const groups = stylesByFamily()
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'All Map Styles',
          url: `${SITE_URL}/styles`,
          hasPart: taxonomy.styles.map((s) => ({ '@type': 'CreativeWork', name: s.name, url: `${SITE_URL}/styles/${s.slug}` })),
        }}
      />
      <header className="page-head">
        <div className="container">
          <p className="crumbs">
            <a href="/">Home</a> / Styles
          </p>
          <h1>The Library of Map Styles</h1>
          <p className="lede">
            {taxonomy.styles.length} ways to draw a city, grouped in four families. Open a style to see it across
            cities, formats and rooms.
          </p>
        </div>
      </header>

      <div className="container">
        {groups.map(({ family, styles }) => (
          <section key={family.slug} id={family.slug} className="family">
            <div className="family__head">
              <h2>{family.name}</h2>
              <p className="lede">{family.description}</p>
            </div>
            <div className="style-list">
              {styles.map(({ style, count }) => (
                <a key={style.slug} href={`/styles/${style.slug}`} className="style-item">
                  <span className="eyebrow">{style.era}</span>
                  <h3>{style.name}</h3>
                  <p>{style.summary}</p>
                  <span className="count">{count > 0 ? `${count} in the gallery` : 'Coming to the gallery'}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
