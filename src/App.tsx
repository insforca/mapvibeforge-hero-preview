/**
 * App — MapVibe cinematic frame hero
 *
 * Renders the standalone cinematic-demo page full-viewport.
 * All copy, CTAs, and branding live inside /cinematic-demo/.
 */
export default function App() {
  return (
    <iframe
      src="/cinematic-demo/"
      title="MapVibe Studio"
      style={{
        display: 'block',
        width: '100vw',
        height: '100vh',
        border: 'none',
        overflow: 'hidden',
      }}
      scrolling="no"
      allowFullScreen
    />
  )
}
