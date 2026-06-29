import { getPlatformStats } from '../../lib/stats'

export default function StatsBar() {
  const stats = getPlatformStats()

  const items = [
    { value: stats.masjidCount.toLocaleString() + '+', label: 'UK Masjids' },
    { value: String(stats.liveStreamsToday), label: "Today's Live Streams" },
    { value: String(stats.eventsToday), label: "Today's Events" },
    { value: String(stats.citiesCovered), label: 'Cities Covered' },
  ]

  return (
    <div className="stats-bar">
      {items.map(item => (
        <div key={item.label} className="stat-card animate-in">
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
