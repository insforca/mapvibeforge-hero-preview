import { FAQS } from '@/lib/site'

export default function FaqSection() {
  return (
    <section id="faq" className="section">
      <div className="container container--narrow">
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
          Questions &amp; Answers
        </p>
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>
          Common Questions
        </h2>
        {FAQS.map((faq) => (
          <div key={faq.question} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>
    </section>
  )
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
