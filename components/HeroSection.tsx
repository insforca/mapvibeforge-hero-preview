import CityMapSvg from '@/components/CityMapSvg'
import { getStyle, studioUrl } from '@/lib/content'
import { EDITION } from '@/lib/site'

const COVER_LINES = ['portolan-chart', 'swiss-topography', 'figure-ground']

export default function HeroSection() {
  const lines = COVER_LINES.map(getStyle).filter((s) => s !== undefined)
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__rule">
          <span className="eyebrow">This Issue</span>
          <span className="line" />
          <span className="eyebrow">How Cities Have Been Drawn</span>
        </div>

        <div className="hero__grid">
          <div className="hero__text">
            <div>
              <p className="eyebrow">The Library — Issue No. {EDITION.number}</p>
              <h1 className="hero__title">
                Maps collected from places
                <br />
                <em>that stay with us.</em>
              </h1>
              <p className="lede hero__lede">
                A library of city map styles, from sailors&rsquo; charts and engraved plans to Swiss relief and
                figure-ground studies, seen flat, framed and on the walls where they live.
              </p>
              <div className="hero__actions">
                <a className="btn" href="/styles">
                  Browse the Styles
                </a>
                <a className="btn btn--ghost" href={studioUrl()}>
                  Create Your Own
                </a>
              </div>
            </div>

            <div className="hero__lines">
              <p className="eyebrow" style={{ color: '#a08f70', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                Also in this issue
              </p>
              {lines.map((style) => (
                <a key={style.slug} href={`/styles/${style.slug}`} className="hero__line">
                  <span className="eyebrow">{style.name}</span>
                  <p>{style.summary}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="hero__art" aria-hidden="true">
            <div className="print hero__print">
              <div className="print__mount">
                <CityMapSvg style="manhattan" city="New York" />
              </div>
            </div>
            <div className="print print--sm hero__print--small">
              <div className="print__mount">
                <CityMapSvg style="paris" city="Paris" />
              </div>
            </div>
            <div className="hero__stamp">
              <small>Issue</small>
              <b>{EDITION.number}</b>
              <small>{EDITION.season.split(' ')[1]}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__banner">
        <div className="container">
          <span>Antique Charts · Engraved Plans · Woodblock Maps</span>
          <span>Swiss Relief · Transit Diagrams · Figure-Ground</span>
          <span>MapVibe Studio Palettes</span>
        </div>
      </div>
    </section>
  )
}
