import Image from 'next/image'
import CityMapSvg from '@/components/CityMapSvg'
import { getCity, type Entry } from '@/lib/content'

interface Props {
  entry: Entry
  variant?: 'default' | 'sm' | 'flat'
  sizes?: string
  priority?: boolean
}

/** Renders an entry's artwork: a photograph/scan when present, otherwise the SVG drawing in a mat. */
export default function MapPrint({ entry, variant = 'flat', sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw', priority }: Props) {
  if (entry.image) {
    return (
      <Image
        src={entry.image.src}
        width={entry.image.width}
        height={entry.image.height}
        alt={entry.alt}
        sizes={sizes}
        priority={priority}
        placeholder={entry.image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={entry.image.blurDataURL}
        style={{ width: '100%', height: 'auto' }}
      />
    )
  }

  const city = getCity(entry.city)
  const cls = variant === 'default' ? 'print' : `print print--${variant}`
  return (
    <div className={cls}>
      <div className="print__mount">
        <CityMapSvg style={entry.svg ?? 'grid'} city={city?.name ?? ''} label={entry.alt} />
      </div>
    </div>
  )
}
