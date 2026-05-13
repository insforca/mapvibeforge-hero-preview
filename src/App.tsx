/**
 * App — standalone 3D hero preview page
 *
 * All CTAs, headlines, and copy live in static HTML.
 * The canvas is purely decorative (aria-hidden).
 * Layout mirrors MapVibe Studio's hero section structure.
 */
import { motion } from 'framer-motion'
import { HeroAnimation } from './components/HeroAnimation'

// Fallback: simple navy gradient image (data URI — no external dep)
const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%231B2A4A'/%3E%3Cstop offset='1' stop-color='%230D1B33'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='700' fill='url(%23g)'/%3E%3C/svg%3E"

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0D1B33]">

      {/* ── Top nav — static HTML ─────────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          {/* Logo text — HTML, not canvas */}
          <span className="font-serif text-xl font-bold text-[#F5EDE4] tracking-wide">
            MapVibe
          </span>
          <span className="text-[#C9A96E] font-ui text-sm font-semibold tracking-widest uppercase">
            Studio
          </span>
        </div>

        {/* Preview badge */}
        <span className="bg-[#C9A96E]/20 text-[#C9A96E] text-xs font-semibold font-ui px-3 py-1 rounded-pill border border-[#C9A96E]/40">
          3D Hero · Preview Build
        </span>
      </header>

      {/* ── Hero section ─────────────────────────────────────── */}
      <section className="relative flex-1 flex items-center justify-center min-h-[640px] px-6">

        {/* 3D canvas layer — decoration only, aria-hidden ─── */}
        <HeroAnimation fallbackSrc={FALLBACK} />

        {/* Hero copy — z-index above canvas, in HTML DOM ──── */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">

          <motion.p
            className="text-[#C9A96E] font-ui text-sm font-semibold tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium City Map Art
          </motion.p>

          <motion.h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5EDE4] leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Your city,
            <br />
            <span className="text-[#C9A96E]">your style.</span>
          </motion.h1>

          <motion.p
            className="font-ui text-base md:text-lg text-[#F5EDE4]/75 leading-relaxed mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
          >
            62 hand-curated map styles. Any city in the world. Museum-quality prints
            delivered to your door.
          </motion.p>

          {/* CTAs — always in DOM, never interaction-dependent (spec §4 risk 4) */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <a
              href="https://app.mapvibestudio.com"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-[#1B2A4A] text-[#1B2A4A] hover:text-[#F5EDE4] font-ui font-semibold text-sm px-8 h-12 rounded-card transition-colors duration-150"
            >
              Start for free
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
            </a>

            <a
              href="https://app.mapvibestudio.com"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-[#F5EDE4] font-ui font-semibold text-sm px-8 h-12 rounded-card border border-[#F5EDE4]/30 transition-colors duration-150"
            >
              Try the editor
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Feature strip — static copy ──────────────────────── */}
      <motion.footer
        className="relative z-10 py-6 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {[
            '62+ map styles',
            'Any city worldwide',
            'Museum-quality prints',
            'Ships to US & Canada',
          ].map(feat => (
            <span key={feat} className="flex items-center gap-2 text-[#F5EDE4]/55 font-ui text-xs">
              <span className="w-1 h-1 rounded-full bg-[#C9A96E] flex-shrink-0" aria-hidden="true" />
              {feat}
            </span>
          ))}
        </div>

        {/* Approval note — visible only in preview */}
        <p className="text-center text-[#C9A96E]/60 font-ui text-xs mt-4">
          🔒 Internal preview — pending approval before live integration
        </p>
      </motion.footer>
    </div>
  )
}
