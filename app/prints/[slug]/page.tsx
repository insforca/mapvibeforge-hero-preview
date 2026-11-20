import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GalleryGrid from '@/components/GalleryGrid'
import JsonLd from '@/components/JsonLd'
import MapPrint from '@/components/MapPrint'
import {
  SITE_URL,
  getCity,
  getEntry,
  getFamily,
  getFormat,
  getSpace,
  getStyle,
  published,
  relatedEntries,
  studioStyleFor,
  studioUrl,
} from '@/lib/content'
import { SITE_NAME } from '@/lib/site'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return published.map((e) => ({ slug: e.slug }))
}

const SOURCE_NOTE: Record<string, string> = {
  'studio-render': 'Rendered in MapVibe Studio from OpenStreetMap data. This is the print you can order.',
  'public-domain': 'A historical map in the public domain, shown for reference.',
  'ai-inspiration': 'A digitally created style study for inspiration. The scene is not a photograph.',
  illustration: 'An editorial illustration of the style, not an exact map of the city.',
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const entry = getEntry((await params).slug)
  if (!entry) return {}
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/prints/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: `/prints/${entry.slug}`,
      images: entry.image ? [{ url: entry.image.src, width: entry.image.width, height: entry.image.height, alt: entry.alt }] : undefined,
    },
  }
}

export default async function PrintPage({ params }: { params: Promise<Params> }) {
  const entry = getEntry((await params).slug)
  if (!entry) notFound()
  const city = getCity(entry.city)
  const style = getStyle(entry.style)
  const family = style ? getFamily(style.family) : undefined
  const format = getFormat(entry.format)
  const space = entry.space ? getSpace(entry.space) : undefined
  const studioStyle = style && (style.family === 'mapvibe-studio' ? style : studioStyleFor(style))
  const { sameStyle, sameCity } = relatedEntries(entry)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': entry.image ? 'ImageObject' : 'CreativeWork',
    name: entry.title,
    description: entry.description,
    url: `${SITE_URL}/prints/${entry.slug}`,
    ...(entry.image ? { contentUrl: `${SITE_URL}${entry.image.src}`, creditText: entry.credit ?? SITE_NAME } : {}),
    genre: style?.name,
    contentLocation: city ? { '@type': 'City', name: city.name, containedInPlace: { '@type': 'Country', name: city.country } } : undefined,
    isPartOf: style ? { '@type': 'CollectionPage', name: `${style.name} City Maps`, url: `${SITE_URL}/styles/${style.slug}` } : undefined,
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container">
        <p className="crumbs" style={{ paddingTop: '2rem' }}>
          <a href="/">Home</a> / <a href="/styles">Styles</a> / <a href={`/styles/${style?.slug}`}>{style?.name}</a>
        </p>
        <article className="entry">
          <div className="entry__media">
            <MapPrint entry={entry} variant="default" sizes="(max-width: 900px) 100vw, 55vw" priority />
          </div>
          <div className="entry__info">
            <p className="eyebrow">{entry.subtitle}</p>
            <h1>{entry.title}</h1>
            <p className="prose">{entry.description}</p>

            <dl className="facts">
              <dt>City</dt>
              <dd>
                {city?.name}, {city?.country}
              </dd>
              <dt>Style</dt>
              <dd>
                <a href={`/styles/${style?.slug}`}>{style?.name}</a>
              </dd>
              <dt>Family</dt>
              <dd>
                <a href={`/styles#${family?.slug}`}>{family?.name}</a>
              </dd>
              <dt>Format</dt>
              <dd>{format?.name}</dd>
              {space && (
                <>
                  <dt>Setting</dt>
                  <dd>{space.name}</dd>
                </>
              )}
            </dl>

            {studioStyle && (
              <>
                <a className="btn" href={studioUrl(entry.city, studioStyle.studioTheme)}>
                  Create Yours in This Style
                </a>
                <p className="note">
                  {style?.family === 'mapvibe-studio'
                    ? `Opens MapVibe Studio with ${city?.name} in ${studioStyle.name}.`
                    : `Opens MapVibe Studio with ${city?.name} in ${studioStyle.name}, the closest Studio palette.`}
                </p>
              </>
            )}
            <p className="note">{SOURCE_NOTE[entry.source]}</p>
          </div>
        </article>
      </div>

      {sameStyle.length > 0 && (
        <section className="section section--paper">
          <div className="container">
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>
              More in {style?.name}
            </h2>
            <GalleryGrid entries={sameStyle} />
          </div>
        </section>
      )}
      {sameCity.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>
              {city?.name} in other styles
            </h2>
            <GalleryGrid entries={sameCity} />
          </div>
        </section>
      )}
    </>
  )
}
