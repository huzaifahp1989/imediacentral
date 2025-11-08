import Tabs from '../components/Tabs'

export default function Links() {
  const seed = [
    { title: 'Quran.com', url: 'https://quran.com', category: 'Quran' },
    { title: 'IslamQA', url: 'https://islamqa.info', category: 'Fatwa' },
    { title: 'Sunnah.com', url: 'https://sunnah.com', category: 'Hadith' },
    { title: 'QuranWBW', url: 'https://quranwbw.com', category: 'Learning' },
  ]

  const list = (filter?: string) => {
    const items = filter ? seed.filter(s => s.category === filter) : seed
    return (
      <div className="card" style={{ marginTop: 12 }}>
        <ul>
          {items.map((l) => (
            <li key={l.url}><a href={l.url} target="_blank" rel="noreferrer">{l.title}</a> — {l.category}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="content">
      <div className="card">
        <h2>Useful Islamic Links</h2>
        <p>Editable from Admin Panel (placeholder).</p>
      </div>

      <Tabs
        items={[
          { key: 'all', label: 'All', content: list() },
          { key: 'quran', label: 'Quran', content: list('Quran') },
          { key: 'hadith', label: 'Hadith', content: list('Hadith') },
          { key: 'fatwa', label: 'Fatwa', content: list('Fatwa') },
          { key: 'learning', label: 'Learning', content: list('Learning') },
        ]}
      />
    </div>
  )
}
