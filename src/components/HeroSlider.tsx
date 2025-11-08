import { useEffect, useState } from 'react'

type Slide = { title: string; sub: string }

const slides: Slide[] = [
  { title: 'Learn • Share • Promote', sub: 'Spreading Knowledge Through Media' },
  { title: 'Quran • Hadith • Radio • Blog', sub: 'A modern, spiritual Islamic hub' },
  { title: 'Inspire Hearts, Elevate Minds', sub: 'Clean, elegant, interactive experience' },
]

export default function HeroSlider() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="hero">
      <div className="overlay" />
      <div className="hero-content">
        <h1 className="slide-title">{slides[idx].title}</h1>
        <p className="slide-sub">{slides[idx].sub}</p>
        <div style={{ marginTop: 12 }}>
          <a className="btn btn-gold glow" href="#donate" title="Donate">Donate</a>
          <a className="btn btn-primary glow" href="#radio" style={{ marginLeft: 8 }} title="Radio">Listen Live</a>
        </div>
      </div>
      <div className="dots">
        {slides.map((_, i) => <span key={i} className={`dot ${i === idx ? 'active' : ''}`} />)}
      </div>
    </section>
  )
}
