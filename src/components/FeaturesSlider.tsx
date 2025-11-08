import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Slide = { title: string; sub: string; to: string }
const slides: Slide[] = [
  { title: 'Quran', sub: 'Read and reflect with trusted resources', to: '/links' },
  { title: 'Hadith', sub: 'Browse collections and daily hadith', to: '/articles' },
  { title: 'Live Radio', sub: 'Listen live — programs and schedules', to: '/radio' },
  { title: 'Kids Zone', sub: 'Stories, quizzes, games and competitions', to: '/kids' },
  { title: 'Blog & News', sub: 'Latest articles from imediac.com', to: '/articles' },
  { title: 'Podcast', sub: 'Talks and series — coming soon', to: '/articles' },
]

export default function FeaturesSlider() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="banner-slider" aria-label="Latest features">
      <div className="banner-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, idx) => (
          <div key={idx} className="banner-slide">
            <div>
              <div className="banner-title">{s.title}</div>
              <div className="banner-sub">{s.sub}</div>
            </div>
            <div>
              <Link to={s.to} className="btn btn-primary">Explore</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="banner-controls">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`banner-dot ${idx === i ? 'active' : ''}`}
            onClick={() => setI(idx)}
            role="button"
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
