#!/usr/bin/env node
/**
 * Export real MapVibe Studio posters (city × palette) as PNG.
 *
 * Opens the Studio editor with deep-link params, waits for the map to finish
 * loading, hides the editor controls and screenshots the poster frame.
 * The image is exactly what the customer sees (and orders) in the Studio.
 *
 * The editor only runs embedded in Shopify or on localhost (OriginGate in
 * mapvibe-studio/src/App.tsx), so run the Studio locally first:
 *   cd ../mapvibe-studio && npm ci && npx vite --port 5179
 *
 * Usage:
 *   node scripts/gallery/studio-export.mjs --city lisbon --theme tk_blueprint
 *   node scripts/gallery/studio-export.mjs --all           # every city × every Studio palette
 *   options: --force  --scale 2  --base http://localhost:5179  --headed
 *
 * Output: work/studio/<city>__<theme>.png   (work/ is git-ignored)
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..')
const taxonomy = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'taxonomy.json'), 'utf8'))

const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback
}

const BASE = opt('base', 'http://localhost:5179')
const SCALE = Number(opt('scale', '2'))
const OUT_DIR = path.join(ROOT, 'work', 'studio')
const CHROME =
  process.env.CHROME_PATH ??
  ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome']
    .find((p) => fs.existsSync(p))

const studioThemes = [...new Set(taxonomy.styles.filter((s) => s.family === 'mapvibe-studio').map((s) => s.studioTheme))]

function jobs() {
  if (flag('all')) return taxonomy.cities.flatMap((c) => studioThemes.map((t) => ({ city: c, theme: t })))
  const city = taxonomy.cities.find((c) => c.slug === opt('city'))
  const theme = opt('theme')
  if (!city || !theme) {
    console.error('Need --city <slug> --theme <studio theme id>, or --all.\nCities:', taxonomy.cities.map((c) => c.slug).join(', '), '\nThemes:', studioThemes.join(', '))
    process.exit(1)
  }
  return [{ city, theme }]
}

function editorUrl(city, theme) {
  const u = new URL(BASE)
  u.searchParams.set('city', city.name)
  u.searchParams.set('country', city.country)
  u.searchParams.set('lat', String(city.lat))
  u.searchParams.set('lng', String(city.lng))
  u.searchParams.set('style', theme)
  return u.toString()
}

async function exportOne(page, { city, theme }) {
  const file = path.join(OUT_DIR, `${city.slug}__${theme}.png`)
  if (fs.existsSync(file) && !flag('force')) return { file, skipped: true }

  await page.goto(editorUrl(city, theme), { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await page.locator('canvas.maplibregl-canvas').first().waitFor({ timeout: 60_000 })
  await page.locator('.mvs-poster-city').first().waitFor({ timeout: 60_000 })
  // Let tiles, fonts and the theme settle.
  await page.waitForLoadState('networkidle', { timeout: 45_000 }).catch(() => {})
  await page.waitForTimeout(2500)

  await page.addStyleTag({
    content: `.map-controls, .mvs-map-primary-controls, .maplibregl-ctrl, .maplibregl-ctrl-attrib,
      .mvs-modal-backdrop, .mvs-modal, .updates-modal-backdrop, .updates-modal { display: none !important; }`,
  })
  // The poster is the smallest ancestor of the map that also holds the poster text.
  const found = await page.evaluate(() => {
    let el = document.querySelector('.maplibregl-map')
    while (el && !el.querySelector('.mvs-poster-city')) el = el.parentElement
    if (!el) return false
    el.setAttribute('data-export-poster', '')
    return true
  })
  if (!found) throw new Error('poster element not found')
  await page.waitForTimeout(300)
  await page.locator('[data-export-poster]').screenshot({ path: file, animations: 'disabled' })
  return { file, skipped: false }
}

async function main() {
  if (!CHROME) throw new Error('Chrome not found. Set CHROME_PATH.')
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch({ executablePath: CHROME, headless: !flag('headed') })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: SCALE,
    locale: 'en-US',
  })
  const page = await context.newPage()
  const list = jobs()
  let ok = 0
  for (const [i, job] of list.entries()) {
    const label = `[${i + 1}/${list.length}] ${job.city.slug} × ${job.theme}`
    try {
      const { file, skipped } = await exportOne(page, job)
      ok++
      console.log(`${label} ${skipped ? 'skipped (exists)' : '→ ' + path.relative(ROOT, file)}`)
    } catch (err) {
      console.error(`${label} FAILED: ${err.message.split('\n')[0]}`)
    }
  }
  await browser.close()
  console.log(`done: ${ok}/${list.length}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
