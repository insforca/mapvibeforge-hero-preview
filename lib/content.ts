import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'
import rawTaxonomy from '@/content/taxonomy.json'

/* ---------- Schemas ---------- */

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a kebab-case slug')

const TaxonomySchema = z.object({
  families: z.array(z.object({ slug, name: z.string(), description: z.string() })),
  styles: z.array(
    z.object({
      slug,
      name: z.string(),
      family: slug,
      studioTheme: z.string(),
      era: z.string(),
      summary: z.string(),
      body: z.string(),
      traits: z.array(z.string()),
    }),
  ),
  formats: z.array(z.object({ slug, name: z.string() })),
  spaces: z.array(z.object({ slug, name: z.string() })),
  cities: z.array(
    z.object({
      slug,
      name: z.string(),
      country: z.string(),
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
  ),
})

export const SVG_STYLES = ['manhattan', 'paris', 'london', 'barcelona', 'amsterdam', 'tokyo', 'rome', 'grid'] as const

const EntrySchema = z
  .object({
    slug,
    status: z.enum(['draft', 'approved', 'retired']),
    order: z.number().optional(),
    title: z.string().min(3),
    subtitle: z.string(),
    city: slug,
    style: slug,
    format: slug,
    space: slug.optional(),
    source: z.enum(['studio-render', 'public-domain', 'ai-inspiration', 'illustration']),
    image: z
      .object({
        src: z.string().startsWith('/'),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        blurDataURL: z.string().optional(),
      })
      .optional(),
    svg: z.enum(SVG_STYLES).optional(),
    description: z.string().min(20),
    alt: z.string().min(10),
    credit: z.string().optional(),
    note: z.string().optional(),
  })
  .refine((e) => e.image || e.svg, { message: 'entry needs an image or an svg' })
  .refine((e) => e.format !== 'in-space' || e.space, { message: 'format "in-space" needs a space' })

export type Taxonomy = z.infer<typeof TaxonomySchema>
export type Style = Taxonomy['styles'][number]
export type Family = Taxonomy['families'][number]
export type City = Taxonomy['cities'][number]
export type Entry = z.infer<typeof EntrySchema>

/* ---------- Loading (runs at build time) ---------- */

const GALLERY_DIR = path.join(process.cwd(), 'content', 'gallery')

function load() {
  const taxonomy = TaxonomySchema.parse(rawTaxonomy)
  const known = {
    family: new Set(taxonomy.families.map((f) => f.slug)),
    style: new Set(taxonomy.styles.map((s) => s.slug)),
    format: new Set(taxonomy.formats.map((f) => f.slug)),
    space: new Set(taxonomy.spaces.map((s) => s.slug)),
    city: new Set(taxonomy.cities.map((c) => c.slug)),
  }
  for (const s of taxonomy.styles) {
    if (!known.family.has(s.family)) throw new Error(`taxonomy: style "${s.slug}" has unknown family "${s.family}"`)
  }

  const entries: Entry[] = []
  const slugs = new Set<string>()
  for (const file of fs.readdirSync(GALLERY_DIR).filter((f) => f.endsWith('.json')).sort()) {
    const raw = JSON.parse(fs.readFileSync(path.join(GALLERY_DIR, file), 'utf8'))
    const parsed = EntrySchema.safeParse(raw)
    if (!parsed.success) {
      throw new Error(`content/gallery/${file}: ${parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`)
    }
    const e = parsed.data
    if (`${e.slug}.json` !== file) throw new Error(`content/gallery/${file}: slug "${e.slug}" must match the file name`)
    if (slugs.has(e.slug)) throw new Error(`duplicate slug "${e.slug}"`)
    slugs.add(e.slug)
    for (const key of ['city', 'style', 'format'] as const) {
      if (!known[key].has(e[key])) throw new Error(`content/gallery/${file}: unknown ${key} "${e[key]}"`)
    }
    if (e.space && !known.space.has(e.space)) throw new Error(`content/gallery/${file}: unknown space "${e.space}"`)
    entries.push(e)
  }
  // Real images first, then illustrations; stable by order, then slug.
  entries.sort((a, b) => Number(!a.image) - Number(!b.image) || (a.order ?? 1e9) - (b.order ?? 1e9) || a.slug.localeCompare(b.slug))
  return { taxonomy, entries }
}

const { taxonomy, entries: allEntries } = load()

/* ---------- Queries ---------- */

export const SITE_URL = 'https://citymapprints.com'

/** Collections (city, space…) get their own page only past this size. */
export const COLLECTION_MIN = 8

export { taxonomy }

export const published = allEntries.filter((e) => e.status === 'approved')

export function getEntry(slugValue: string) {
  return published.find((e) => e.slug === slugValue)
}

export function getStyle(slugValue: string) {
  return taxonomy.styles.find((s) => s.slug === slugValue)
}

export function getFamily(slugValue: string) {
  return taxonomy.families.find((f) => f.slug === slugValue)
}

export function getCity(slugValue: string) {
  return taxonomy.cities.find((c) => c.slug === slugValue)
}

export function getFormat(slugValue: string) {
  return taxonomy.formats.find((f) => f.slug === slugValue)
}

export function getSpace(slugValue: string) {
  return taxonomy.spaces.find((s) => s.slug === slugValue)
}

export function entriesForStyle(styleSlug: string) {
  return published.filter((e) => e.style === styleSlug)
}

export function stylesByFamily() {
  return taxonomy.families.map((family) => ({
    family,
    styles: taxonomy.styles
      .filter((s) => s.family === family.slug)
      .map((style) => ({ style, count: entriesForStyle(style.slug).length })),
  }))
}

export function relatedEntries(entry: Entry, limit = 4) {
  const sameStyle = published.filter((e) => e.slug !== entry.slug && e.style === entry.style)
  const sameCity = published.filter((e) => e.slug !== entry.slug && e.city === entry.city && e.style !== entry.style)
  return { sameStyle: sameStyle.slice(0, limit), sameCity: sameCity.slice(0, limit) }
}

/** Shopify product page that embeds the MapVibe Studio editor (iframe). */
export const STUDIO_EDITOR_PAGE = 'https://mapvibestudio.com/products/mapvibe-city-map-print'

/**
 * Link to the MapVibe Studio editor for a city + Studio palette.
 * The editor reads ?city=&country=&lat=&lng=&style= (mapvibe-studio posterStore.ts),
 * but the Shopify section must copy them onto the iframe src
 * (vault: "Spec de lançamento" §3, snippet in "Shopify deep links").
 * Without city/theme it links to the store home.
 */
export function studioUrl(citySlug?: string, studioTheme?: string) {
  const url = new URL(citySlug || studioTheme ? STUDIO_EDITOR_PAGE : 'https://mapvibestudio.com/')
  const city = citySlug ? getCity(citySlug) : undefined
  if (city) {
    url.searchParams.set('city', city.name)
    url.searchParams.set('country', city.country)
    url.searchParams.set('lat', String(city.lat))
    url.searchParams.set('lng', String(city.lng))
  }
  if (studioTheme) url.searchParams.set('style', studioTheme)
  url.searchParams.set('utm_source', 'citymapprints')
  return url.toString()
}

/** Name of the Studio palette a style links to (for "closest in Studio" copy). */
export function studioStyleFor(style: Style) {
  return taxonomy.styles.find((s) => s.family === 'mapvibe-studio' && s.studioTheme === style.studioTheme)
}
