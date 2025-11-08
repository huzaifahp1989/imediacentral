import Tabs from '../components/Tabs'

const HADITH_OF_DAY = [
  {
    ref: 'Bukhari 1',
    text: 'Actions are but by intentions, and every man shall have only that which he intended.'
  },
  {
    ref: 'Muslim 45',
    text: 'The best among you are those who learn the Qur’an and teach it.'
  },
  {
    ref: 'Tirmidhi 1920',
    text: 'Whoever relieves a Muslim of a burden, Allah will relieve him of a burden on the Day of Resurrection.'
  },
]

function HadithCard({ text, ref }: { text: string; ref: string }) {
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3 className="card-title">{ref}</h3>
      <p style={{ fontSize: 18 }}>{text}</p>
    </div>
  )
}

export default function HadithPage() {
  const today = HADITH_OF_DAY[Math.floor(Math.random() * HADITH_OF_DAY.length)]

  const collectionGrid = (name: string) => (
    <div className="feature-grid" style={{ marginTop: 12 }}>
      {[1,2,3,4,5,6].map(n => (
        <div key={n} className="feature-card">
          <h4>{name} #{n}</h4>
          <p>A placeholder excerpt of a hadith for browsing. Admin CMS can populate real content.</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="content">
      <div className="card">
        <h2>Hadith</h2>
        <p>Daily reminder and browse popular collections. Soon: filter by book, chapter, and narrator.</p>
      </div>

      <Tabs
        items={[
          { key: 'daily', label: 'Hadith of the Day', content: <HadithCard ref={today.ref} text={today.text} /> },
          { key: 'bukhari', label: 'Sahih al-Bukhari', content: collectionGrid('Bukhari') },
          { key: 'muslim', label: 'Sahih Muslim', content: collectionGrid('Muslim') },
          { key: 'tirmidhi', label: 'Jami` at-Tirmidhi', content: collectionGrid('Tirmidhi') },
        ]}
      />
    </div>
  )
}
