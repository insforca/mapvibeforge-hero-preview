import HeroSection from '@/components/HeroSection'
import FilterNav from '@/components/FilterNav'
import GalleryGrid from '@/components/GalleryGrid'
import FaqSection, { faqJsonLd } from '@/components/FaqSection'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, published, stylesByFamily } from '@/lib/content'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'

export default function Home() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} — Gallery`,
    numberOfItems: published.length,
    itemListElement: published.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/prints/${e.slug}`,
      name: e.title,
    })),
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  }

  return (
    <>
      <JsonLd data={website} />
      <JsonLd data={itemList} />
      <JsonLd data={faqJsonLd()} />

      <HeroSection />
      <FilterNav />

      <section id="gallery" className="section">
        <div className="container">
          <div className="section-rule">
            <span className="eyebrow">The Gallery</span>
          </div>
          <h2 className="section-title">From the Library</h2>
          <p className="lede" style={{ marginBottom: '3rem' }}>
            The same city can be a sailor&rsquo;s chart, an architect&rsquo;s plan or a single fine line. Every entry
            links to its style and to the closest MapVibe Studio palette.
          </p>
          <GalleryGrid entries={published} />
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
            The Library
          </p>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            Four families of city maps
          </h2>
          <div className="style-list">
            {stylesByFamily().map(({ family, styles }) => (
              <a key={family.slug} href={`/styles#${family.slug}`} className="style-item">
                <span className="eyebrow">{styles.length} styles</span>
                <h3>{family.name}</h3>
                <p>{family.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  )
}
