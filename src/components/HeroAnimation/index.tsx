/**
 * HeroAnimation — spec-compliant lazy-loaded 3D hero component
 *
 * Spec contract (3d-hero-implementation-spec.md):
 *  ✅ Lazy-loaded via IntersectionObserver — never blocks LCP
 *  ✅ Three.js dynamically imported — not in main bundle
 *  ✅ All visible text (CTAs, headlines) in static HTML, not canvas
 *  ✅ Static image fallback on prefers-reduced-motion
 *  ✅ Static image fallback on low GPU tier (detected via deviceMemory / hardwareConcurrency)
 *  ✅ Scene is aria-hidden — decorative layer only
 *  ✅ Brand colors: Navy #1B2A4A / Gold #C9A96E / Surface #F5EDE4
 */
import { useEffect, useRef, useState, lazy, Suspense } from 'react'

// ── Dynamic import — Three.js chunk stays OUT of main bundle ──────
const Scene = lazy(() =>
  import('./Scene').then(m => ({ default: m.Scene }))
)

// ── GPU tier heuristic ────────────────────────────────────────────
function isLowPowerDevice(): boolean {
  // navigator.deviceMemory is Chrome-only; treat absence as capable
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (mem !== undefined && mem < 2) return true
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4) return true
  return false
}

function useReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ── Props ─────────────────────────────────────────────────────────
interface HeroAnimationProps {
  /** Shown as fallback when 3D is disabled. Must be a real image URL. */
  fallbackSrc: string
  fallbackAlt?: string
}

export function HeroAnimation({ fallbackSrc, fallbackAlt = 'MapVibe Studio map poster preview' }: HeroAnimationProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const [show3D, setShow3D] = useState(false)

  const reducedMotion = useReducedMotion()
  const lowPower      = isLowPowerDevice()
  const use3D         = !reducedMotion && !lowPower

  // ── IntersectionObserver — fires after LCP ───────────────────
  useEffect(() => {
    if (!use3D) return
    const el = wrapRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow3D(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [use3D])

  return (
    <div
      ref={wrapRef}
      className="hero-canvas-wrap"
      aria-hidden="true"   // entire decoration layer hidden from AT
    >
      {/* Static fallback — always in DOM, visible when 3D disabled */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallbackSrc}
        alt={fallbackAlt}
        className="hero-fallback"
        style={{ display: (!use3D || !show3D) ? 'block' : 'none' }}
        loading="lazy"
        decoding="async"
      />

      {/* 3D scene — only mounted after intersection + capability check */}
      {use3D && show3D && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
    </div>
  )
}
