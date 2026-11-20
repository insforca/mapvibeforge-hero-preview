import { SITE_NAME } from '@/lib/site'
import { studioUrl } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <a href="/" className="site-footer__brand">
            {SITE_NAME}
          </a>
          <nav aria-label="Footer">
            <a href="/styles">Styles</a>
            <a href="/#gallery">Gallery</a>
            <a href="/#faq">About</a>
            <a href={studioUrl()}>MapVibe Studio</a>
          </nav>
        </div>
        <div className="site-footer__bottom">
          <em>Maps collected from places that stay with us.</em>
          <small>
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </small>
        </div>
      </div>
    </footer>
  )
}
