#!/usr/bin/env node
/**
 * Turn exported Studio posters (work/studio/<city>__<theme>.png) into gallery
 * assets and draft entries.
 *
 *   node scripts/gallery/studio-ingest.mjs            # new files only
 *   node scripts/gallery/studio-ingest.mjs --force    # rebuild images (entries are never overwritten)
 *   node scripts/gallery/studio-ingest.mjs --sheet    # also write work/studio-contact-sheet.jpg
 *
 * Writes:
 *   public/gallery/studio/<slug>.webp     1000 px wide
 *   content/gallery/<slug>.json           status "draft" (a human approves)
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..')
const IN_DIR = path.join(ROOT, 'work', 'studio')
const IMG_DIR = path.join(ROOT, 'public', 'gallery', 'studio')
const ENTRY_DIR = path.join(ROOT, 'content', 'gallery')
const taxonomy = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'taxonomy.json'), 'utf8'))
const force = process.argv.includes('--force')
const sheet = process.argv.includes('--sheet')

fs.mkdirSync(IMG_DIR, { recursive: true })

const results = []
for (const file of fs.readdirSync(IN_DIR).filter((f) => f.endsWith('.png')).sort()) {
  const [citySlug, theme] = file.replace(/\.png$/, '').split('__')
  const city = taxonomy.cities.find((c) => c.slug === citySlug)
  const style = taxonomy.styles.find((s) => s.family === 'mapvibe-studio' && s.studioTheme === theme)
  if (!city || !style) {
    console.warn(`skip ${file}: unknown city or Studio theme`)
    continue
  }
  const slug = `${city.slug}-${style.slug}`
  const out = path.join(IMG_DIR, `${slug}.webp`)
  const src = path.join(IN_DIR, file)

  if (force || !fs.existsSync(out)) {
    await sharp(src).resize({ width: 1000 }).webp({ quality: 82 }).toFile(out)
  }
  const meta = await sharp(out).metadata()
  const blur = await sharp(src).resize({ width: 12 }).webp({ quality: 40 }).toBuffer()

  const entryFile = path.join(ENTRY_DIR, `${slug}.json`)
  if (!fs.existsSync(entryFile)) {
    const entry = {
      slug,
      status: 'draft',
      title: `${city.name} in ${style.name}`,
      subtitle: `${city.name} · ${style.name} · Flat`,
      city: city.slug,
      style: style.slug,
      format: 'flat',
      source: 'studio-render',
      image: {
        src: `/gallery/studio/${slug}.webp`,
        width: meta.width,
        height: meta.height,
        blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
      },
      description: `${city.name}, ${city.country}, drawn in the ${style.name} palette from MapVibe Studio. ${style.summary}`,
      alt: `${style.name} city map poster of ${city.name}, ${city.country}, with the city name and coordinates at the foot of the print`,
      credit: 'MapVibe Studio · map data © OpenStreetMap contributors',
      note: 'Draft: templated title and description. Write an editorial title and two unique sentences before approving.',
    }
    fs.writeFileSync(entryFile, JSON.stringify(entry, null, 2) + '\n')
    results.push({ slug, created: true })
  } else {
    results.push({ slug, created: false })
  }
}

console.log(`${results.length} posters · ${results.filter((r) => r.created).length} new draft entries`)

if (sheet) {
  // Contact sheet: one row per city, one column per palette.
  const files = fs.readdirSync(IMG_DIR).filter((f) => f.endsWith('.webp')).sort()
  const cols = [...new Set(taxonomy.styles.filter((s) => s.family === 'mapvibe-studio').map((s) => s.slug))]
  const rows = taxonomy.cities.map((c) => c.slug).filter((c) => files.some((f) => f.startsWith(`${c}-`)))
  const W = 160, H = 226, PAD = 6
  const composites = []
  for (const [r, citySlug] of rows.entries()) {
    for (const [c, styleSlug] of cols.entries()) {
      const f = path.join(IMG_DIR, `${citySlug}-${styleSlug}.webp`)
      if (!fs.existsSync(f)) continue
      composites.push({ input: await sharp(f).resize(W, H, { fit: 'cover' }).toBuffer(), left: PAD + c * (W + PAD), top: PAD + r * (H + PAD) })
    }
  }
  const out = path.join(ROOT, 'work', 'studio-contact-sheet.jpg')
  await sharp({ create: { width: PAD + cols.length * (W + PAD), height: PAD + rows.length * (H + PAD), channels: 3, background: '#faf9f6' } })
    .composite(composites)
    .jpeg({ quality: 80 })
    .toFile(out)
  console.log(`contact sheet → ${path.relative(ROOT, out)} (${rows.length} cities × ${cols.length} palettes)`)
}
