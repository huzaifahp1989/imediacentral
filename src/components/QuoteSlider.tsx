import { useEffect, useState } from 'react'

type Quote = { text: string; source?: string }

const quotes: Quote[] = [
  { text: 'Verily, in the remembrance of Allah do hearts find rest.', source: 'Qur’an 13:28' },
  { text: 'The best among you are those who learn the Qur’an and teach it.', source: 'Bukhari' },
  { text: 'Whoever relieves a believer’s distress, Allah will relieve his distress on the Day of Resurrection.', source: 'Muslim' },
  { text: 'Be mindful of Allah, and He will be mindful of you.', source: 'Tirmidhi' },
  { text: 'Spread peace, feed others, and pray at night; you will enter Paradise in peace.', source: 'Tirmidhi' },
]

export default function QuoteSlider() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % quotes.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="banner-slider" aria-label="Short Islamic quotes">
      <div className="banner-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {quotes.map((q, idx) => (
          <div key={idx} className="banner-slide">
            <div>
              <div className="banner-title font-ar" style={{ fontWeight: 700 }}>{q.text}</div>
              {q.source && <div className="banner-sub">{q.source}</div>}
            </div>
            <div>
              {/* Decorative gold accent button style reused for visual balance */}
              <button className="btn btn-gold" aria-hidden>•</button>
            </div>
          </div>
        ))}
      </div>
      <div className="banner-controls">
        {quotes.map((_, idx) => (
          <span
            key={idx}
            className={`banner-dot ${idx === i ? 'active' : ''}`}
            onClick={() => setI(idx)}
            role="button"
            aria-label={`Go to quote ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

