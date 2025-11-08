import Tabs from '../components/Tabs'

export default function Kids() {
  const leaderboard = [
    { name: 'Aisha', score: 98 },
    { name: 'Yusuf', score: 92 },
    { name: 'Fatimah', score: 89 },
  ]

  const stories = [
    { title: 'Kindness of the Prophet ﷺ', desc: 'A gentle story about mercy and compassion.' },
    { title: 'Honesty of Abu Bakr', desc: 'Truthfulness and trust.' },
  ]
  const quizzes = [
    { title: 'Five Pillars', desc: 'Test your knowledge of the pillars of Islam.' },
    { title: 'Prophets Quiz', desc: 'How many prophets can you name?' },
  ]
  const games = [
    { title: 'Word Match', desc: 'Match Islamic terms and meanings.' },
    { title: 'Memory Cards', desc: 'Find pairs of virtues and deeds.' },
  ]
  const competitions = [
    { title: 'Ramadan Challenge', desc: 'Daily good deeds leaderboard.' },
    { title: 'Recitation Contest', desc: 'Memorize and recite short surahs.' },
  ]

  const grid = (items: { title: string; desc: string }[]) => (
    <div className="feature-grid" style={{ marginTop: 12 }}>
      {items.map(i => (
        <div key={i.title} className="feature-card">
          <h4>{i.title}</h4>
          <p>{i.desc}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="content">
      <div className="card">
        <h2>Kids Zone</h2>
        <p>Stories, quizzes, games, and competitions — all in one fun, educational space.</p>
      </div>

      <Tabs
        items={[
          { key: 'stories', label: 'Stories', content: grid(stories) },
          { key: 'quizzes', label: 'Quizzes', content: grid(quizzes) },
          { key: 'games', label: 'Games', content: grid(games) },
          { key: 'competitions', label: 'Competitions', content: grid(competitions) },
        ]}
      />

      <div className="card" style={{ marginTop: 16 }}>
        <h3 className="card-title">Top Scorers</h3>
        <ul>
          {leaderboard.map(l => (<li key={l.name}>{l.name} — {l.score}</li>))}
        </ul>
      </div>
    </div>
  )
}
