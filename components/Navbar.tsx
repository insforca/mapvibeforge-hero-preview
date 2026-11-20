import { EDITION, SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import { studioUrl } from '@/lib/content'

const SECTIONS = [
  { label: 'All Styles', href: '/styles' },
  { label: 'Antique', href: '/styles#antique' },
  { label: '20th Century', href: '/styles#twentieth-century' },
  { label: 'Contemporary', href: '/styles#contemporary' },
  { label: 'MapVibe Studio', href: '/styles#mapvibe-studio' },
  { label: 'About', href: '/#faq' },
]

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="preheader">
        <div className="container">
          <span>
            No. {EDITION.number} — {EDITION.season}
          </span>
          <span>Antique · Modern · Contemporary</span>
          <span>citymapprints.com</span>
        </div>
      </div>

      <div className="masthead">
        <a href="/">
          <span className="masthead__name">{SITE_NAME}</span>
          <span className="masthead__tag">{SITE_TAGLINE}</span>
        </a>
      </div>

      <nav className="sections-nav" aria-label="Sections">
        <div className="container">
          {SECTIONS.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
          <span className="spacer" />
          <a className="btn" href={studioUrl()}>
            Create Your Map
          </a>
        </div>
      </nav>
    </header>
  )
}
