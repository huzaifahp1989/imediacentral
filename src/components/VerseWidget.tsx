import { useEffect, useState } from 'react'

const verses = [
  { text: 'Indeed, in the remembrance of Allah do hearts find rest.', ref: 'Quran 13:28' },
  { text: 'The best of you are those who learn the Quran and teach it.', ref: 'Bukhari' },
  { text: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.', ref: 'Muslim' },
]

export default function VerseWidget() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % verses.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="card" style={{ background: 'linear-gradient(180deg, #fff, #f9fafb)', borderColor: '#eef2f7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--gold)' }} />
        <div>
          <strong>{verses[i].text}</strong>
          <div style={{ fontSize: 13, opacity: 0.8 }}>{verses[i].ref}</div>
        </div>
      </div>
    </div>
  )
}
