import MapPrint from '@/components/MapPrint'
import { getCity, getStyle, type Entry } from '@/lib/content'

interface Props {
  entries: Entry[]
  headingLevel?: 'h2' | 'h3'
}

export default function GalleryGrid({ entries, headingLevel = 'h3' }: Props) {
  const Title = headingLevel
  return (
    <div className="gallery">
      {entries.map((entry) => {
        const city = getCity(entry.city)
        const style = getStyle(entry.style)
        return (
          <a key={entry.slug} href={`/prints/${entry.slug}`} className="card">
            <div className="card__media">
              <MapPrint entry={entry} />
            </div>
            <div className="card__body">
              <p className="eyebrow card__meta">
                {city?.name} · {style?.name}
              </p>
              <Title className="card__title">{entry.title}</Title>
            </div>
          </a>
        )
      })}
    </div>
  )
}
