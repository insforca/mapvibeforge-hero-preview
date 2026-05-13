/**
 * useMapTexture
 * Draws a procedural city-map on an offscreen canvas and returns a
 * Three.js CanvasTexture. All colours come from the MapVibe design tokens.
 * The texture is purely decorative — no readable text is embedded here.
 */
import { useMemo } from 'react'
import * as THREE from 'three'

export type MapTheme = {
  bg:        string
  blockFill: string
  roadMajor: string
  roadMinor: string
  water:     string
  accent:    string
  label:     string   // city name bottom strip
  coords:    string   // coordinate line
}

// ── Four theme variants the animation cycles through ──────────────
export const MAP_THEMES: MapTheme[] = [
  {
    // Classic MapVibe — Navy on Surface
    bg:        '#F5EDE4',
    blockFill: '#EDE5D8',
    roadMajor: '#1B2A4A',
    roadMinor: '#2E3F5F',
    water:     '#B8CDE0',
    accent:    '#C9A96E',
    label:     '#1B2A4A',
    coords:    '#C9A96E',
  },
  {
    // Midnight — Gold on deep navy
    bg:        '#0D1B33',
    blockFill: '#122140',
    roadMajor: '#C9A96E',
    roadMinor: '#8A7050',
    water:     '#0A1628',
    accent:    '#E8C98A',
    label:     '#F5EDE4',
    coords:    '#C9A96E',
  },
  {
    // Chalk — White with soft grey roads
    bg:        '#FFFFFF',
    blockFill: '#F4F4F2',
    roadMajor: '#C9A96E',
    roadMinor: '#D8D8D4',
    water:     '#D0E8F0',
    accent:    '#1B2A4A',
    label:     '#1B2A4A',
    coords:    '#8A6A40',
  },
  {
    // Forest — Dark green
    bg:        '#1A2E1A',
    blockFill: '#1F361F',
    roadMajor: '#C9A96E',
    roadMinor: '#4A6B3A',
    water:     '#0F2A20',
    accent:    '#8AB870',
    label:     '#F5EDE4',
    coords:    '#C9A96E',
  },
]

function buildMapCanvas(theme: MapTheme, size = 512): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width  = size
  c.height = Math.round(size * (24 / 18)) // 18:24 poster ratio
  const ctx = c.getContext('2d')!
  const W = c.width, H = c.height

  // Background
  ctx.fillStyle = theme.bg
  ctx.fillRect(0, 0, W, H)

  // ── Water band (left side) ────────────────────────────────────
  ctx.fillStyle = theme.water
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(W * 0.28, 0)
  ctx.quadraticCurveTo(W * 0.22, H * 0.45, W * 0.18, H)
  ctx.lineTo(0, H)
  ctx.closePath()
  ctx.fill()

  // ── City blocks ──────────────────────────────────────────────
  ctx.fillStyle = theme.blockFill
  const blockDefs = [
    [0.32, 0.05, 0.18, 0.12],
    [0.55, 0.04, 0.22, 0.10],
    [0.80, 0.06, 0.16, 0.14],
    [0.32, 0.22, 0.14, 0.16],
    [0.50, 0.20, 0.20, 0.14],
    [0.74, 0.24, 0.22, 0.12],
    [0.30, 0.42, 0.16, 0.14],
    [0.50, 0.40, 0.18, 0.16],
    [0.72, 0.42, 0.24, 0.14],
    [0.32, 0.62, 0.20, 0.12],
    [0.57, 0.60, 0.16, 0.14],
    [0.77, 0.64, 0.18, 0.12],
    [0.30, 0.80, 0.18, 0.10],
    [0.52, 0.78, 0.22, 0.12],
    [0.78, 0.82, 0.16, 0.10],
  ]
  for (const [x, y, w, h] of blockDefs) {
    ctx.fillRect(Math.round(x * W), Math.round(y * H), Math.round(w * W), Math.round(h * H))
  }

  // ── Minor roads (grid) ───────────────────────────────────────
  ctx.strokeStyle = theme.roadMinor
  ctx.lineWidth = 1
  for (let i = 0; i < 24; i++) {
    const y = Math.round((i / 24) * H)
    ctx.beginPath(); ctx.moveTo(W * 0.22, y); ctx.lineTo(W, y); ctx.stroke()
  }
  for (let i = 0; i < 18; i++) {
    const x = Math.round((i / 18) * W)
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }

  // ── Major roads ──────────────────────────────────────────────
  ctx.strokeStyle = theme.roadMajor
  ctx.lineWidth = 2.5
  // Horizontal
  for (const frac of [0.18, 0.36, 0.54, 0.72, 0.88]) {
    const y = Math.round(frac * H)
    ctx.beginPath(); ctx.moveTo(W * 0.20, y); ctx.lineTo(W, y); ctx.stroke()
  }
  // Vertical
  for (const frac of [0.30, 0.50, 0.70, 0.88]) {
    const x = Math.round(frac * W)
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }
  // Diagonal boulevard
  ctx.beginPath()
  ctx.moveTo(W * 0.28, 0)
  ctx.lineTo(W * 0.72, H)
  ctx.stroke()

  // ── Accent / gold main avenue ────────────────────────────────
  ctx.strokeStyle = theme.accent
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.moveTo(W * 0.22, H * 0.38)
  ctx.lineTo(W, H * 0.38)
  ctx.stroke()

  // ── Bottom text strip (decorative, not readable CTA) ─────────
  const stripH = Math.round(H * 0.10)
  ctx.fillStyle = theme.label + 'EE'
  ctx.fillRect(0, H - stripH, W, stripH)

  // City name — decorative texture element, not a content CTA
  ctx.fillStyle = theme.bg
  ctx.font = `bold ${Math.round(W * 0.07)}px 'Playfair Display', serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('NEW YORK', W / 2, H - stripH + stripH * 0.38)

  // Coord line
  ctx.fillStyle = theme.coords
  ctx.font = `${Math.round(W * 0.038)}px 'DM Sans', sans-serif`
  ctx.letterSpacing = '0.12em'
  ctx.fillText('40.7128° N  74.0060° W', W / 2, H - stripH + stripH * 0.72)

  return c
}

export function useMapTexture(themeIndex: number, size = 512): THREE.CanvasTexture {
  return useMemo(() => {
    const theme = MAP_THEMES[themeIndex % MAP_THEMES.length]
    const canvas = buildMapCanvas(theme, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeIndex, size])
}
