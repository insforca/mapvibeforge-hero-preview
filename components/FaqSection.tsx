const faqs = [
  {
    question: 'What is a city map print?',
    answer:
      'A city map print is a fine art reproduction of a city\'s street network, rendered in a curated editorial style. Our prints transform real cartographic data into wall-worthy artwork — printed on archival paper and designed to complement considered interiors.',
  },
  {
    question: 'Can I customize the map style?',
    answer:
      'Yes. You can select from several editorial color palettes — from warm travertine neutrals to Japandi-inspired ivory and charcoal — and adjust the map center, zoom, and orientation to frame the exact neighborhood you love.',
  },
  {
    question: 'Which cities are available?',
    answer:
      'We currently offer map prints for over 500 cities worldwide, including New York, London, Paris, Tokyo, Barcelona, Amsterdam, Rome, Copenhagen, Lisbon, Sydney, and many more. If your city isn\'t listed, contact us — we can accommodate custom requests.',
  },
  {
    question: 'Are map prints good housewarming gifts?',
    answer:
      'A city map print is one of the most personal and lasting housewarming gifts you can give. Choose a print of someone\'s hometown, the city where they met their partner, or the neighborhood of their new home. We offer gift packaging and handwritten notes.',
  },
  {
    question: 'Are the maps based on real street data?',
    answer:
      'Yes. All MapVibe prints are generated from real OpenStreetMap data, ensuring geographic accuracy. We then apply our editorial styling on top — so every print is both artistically considered and cartographically precise.',
  },
  {
    question: 'Can I create minimalist wall art from any city?',
    answer:
      'Absolutely. Our minimalist style strips the map back to essential lines — no labels, no markers, just pure street geometry in a warm, restrained palette. It\'s the cleanest way to honor a place without decorative excess.',
  },
]

export default function FaqSection() {
  return (
    <section
      id="faq"
      style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '6rem 2rem',
      }}
    >
      {/* Heading */}
      <div style={{ marginBottom: '4rem' }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8a7f72',
            marginBottom: '0.75rem',
          }}
        >
          Questions &amp; Answers
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 400,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
          }}
        >
          Common Questions
        </h2>
      </div>

      {/* FAQ items */}
      <div>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              borderTop: '1px solid #e8e3dc',
              padding: '2.25rem 0',
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1875rem',
                fontWeight: 400,
                color: '#1a1a1a',
                lineHeight: 1.35,
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              {faq.question}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9375rem',
                fontWeight: 300,
                lineHeight: 1.75,
                color: '#8a7f72',
                maxWidth: '680px',
              }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
        {/* Bottom border */}
        <div style={{ borderTop: '1px solid #e8e3dc' }} />
      </div>
    </section>
  )
}
