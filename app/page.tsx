import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FilterNav from '@/components/FilterNav'
import GalleryGrid from '@/components/GalleryGrid'
import FeaturedStrip from '@/components/FeaturedStrip'
import FaqSection from '@/components/FaqSection'
import Footer from '@/components/Footer'
import { galleryItems } from '@/lib/gallery-data'

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'MapVibe City Map Prints Gallery',
  description: 'Curated city map prints for interiors, gifting, and travel-inspired spaces.',
  numberOfItems: galleryItems.length,
  itemListElement: galleryItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mapvibe.co/#${item.anchor}`,
    image: `https://mapvibe.co/maps/${item.anchor}.png`,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a city map print?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A city map print is a fine art reproduction of a city's street network, rendered in a curated editorial style. Our prints transform real cartographic data into wall-worthy artwork — printed on archival paper and designed to complement considered interiors.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize the map style?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can select from several editorial color palettes — from warm travertine neutrals to Japandi-inspired ivory and charcoal — and adjust the map center, zoom, and orientation to frame the exact neighborhood you love.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cities are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We currently offer map prints for over 500 cities worldwide, including New York, London, Paris, Tokyo, Barcelona, Amsterdam, Rome, Copenhagen, Lisbon, Sydney, and many more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are map prints good housewarming gifts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A city map print is one of the most personal and lasting housewarming gifts you can give. Choose a print of someone's hometown, the city where they met their partner, or the neighborhood of their new home.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are the maps based on real street data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All MapVibe prints are generated from real OpenStreetMap data, ensuring geographic accuracy. We then apply our editorial styling on top — so every print is both artistically considered and cartographically precise.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I create minimalist wall art from any city?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Our minimalist style strips the map back to essential lines — no labels, no markers, just pure street geometry in a warm, restrained palette.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main style={{ backgroundColor: '#faf9f6', minHeight: '100vh' }}>
        <Navbar />
        <HeroSection />
        <FilterNav />
        <GalleryGrid />
        <FeaturedStrip />
        <FaqSection />
        <Footer />
      </main>
    </>
  )
}
