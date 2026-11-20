import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GalleryGrid from '@/components/GalleryGrid'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, entriesForStyle, getFamily, getStyle, studioStyleFor, studioUrl, taxonomy } from '@/lib/content'

type Params = { style: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return taxonomy.styles.map((s) => ({ style: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const style = getStyle((await params).style)
  if (!style) return {}
  const hasEntries = entriesForStyle(style.slug).length > 0
  return {
    title: `${style.name} City Maps`,
    description: style.summary,
    alternates: { canonical: `/styles/${style.slug}` },
    // A style page without gallery entries is too thin to index yet.
    robots: hasEntries ? undefined : { index: false, follow: true },
    openGraph: { title: `${style.name} City Maps`, description: style.summary, url: `/styles/${style.slug}` },
  }
}

export default async function StylePage({ params }: { params: Promise<Params> }) {
  const style = getStyle((await params).style)
  if (!style) notFound()
  const family = getFamily(style.family)
  const entries = entriesForStyle(style.slug)
  const isStudio = style.family === 'mapvibe-studio'
  const studioStyle = isStudio ? style : studioStyleFor(style)
  const siblings = taxonomy.styles.filter((s) => s.family === style.family && s.slug !== style.slug)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${style.name} City Maps`,
          description: style.summary,
          url: `${SITE_URL}/styles/${style.slug}`,
          isPartOf: { '@type': 'CollectionPage', name: 'All Map Styles', url: `${SITE_URL}/styles` },
          hasPart: entries.map((e) => ({ '@type': 'CreativeWork', name: e.title, url: `${SITE_URL}/prints/${e.slug}` })),
        }}
      />
      <header className="page-head">
        <div className="container">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/styles">Styles</a> /{' '}
            <a href={`/styles#${family?.slug}`}>{family?.name}</a>
          </p>
          <h1>{style.name}</h1>
          <p className="eyebrow">{style.era}</p>
          <p className="prose" style={{ marginTop: '1.5rem' }}>
            {style.body}
          </p>
          <ul className="traits" aria-label="Characteristics">
            {style.traits.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {entries.length > 0 ? (
            <GalleryGrid entries={entries} headingLevel="h2" />
          ) : (
            <p className="lede">This style is being added to the gallery. New entries arrive with each issue.</p>
          )}
        </div>
      </section>

      {studioStyle && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="cta-band">
              <div>
                <h2>{isStudio ? `Make your city in ${style.name}` : `The closest in MapVibe Studio: ${studioStyle.name}`}</h2>
                <p className="lede">
                  {isStudio
                    ? 'Choose any city or neighbourhood, adjust the frame and order it as a print.'
                    : `${studioStyle.summary} Apply it to any city in MapVibe Studio.`}
                </p>
              </div>
              <a className="btn" href={studioUrl(undefined, studioStyle.studioTheme)}>
                Create Yours in This Style
              </a>
            </div>
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="section section--paper">
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>
              More in {family?.name}
            </p>
            <div className="style-list">
              {siblings.map((s) => (
                <a key={s.slug} href={`/styles/${s.slug}`} className="style-item">
                  <span className="eyebrow">{s.era}</span>
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
