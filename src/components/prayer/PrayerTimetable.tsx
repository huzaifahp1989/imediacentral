import type { Timings } from '../../lib/types'
import { getNextPrayer } from '../../lib/prayerTimes'

type Props = { timings: Timings; cityName?: string }

export default function PrayerTimetable({ timings, cityName }: Props) {
  const next = getNextPrayer(timings)
  const prayers: { key: keyof Timings; label: string }[] = [
    { key: 'Fajr', label: 'Fajr' },
    { key: 'Sunrise', label: 'Sunrise' },
    { key: 'Dhuhr', label: 'Zuhr' },
    { key: 'Asr', label: 'Asr' },
    { key: 'Maghrib', label: 'Maghrib' },
    { key: 'Isha', label: 'Isha' },
  ]

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>
        {cityName ? `Today's Prayer Times — ${cityName}` : "Today's Prayer Times"}
      </h2>
      <div className="prayer-grid">
        {prayers.map(p => (
          <div
            key={p.key}
            className={`prayer-cell ${next.name === p.label || (p.label === 'Zuhr' && next.name === 'Dhuhr') ? 'active' : ''}`}
          >
            <div className="prayer-cell-name">{p.label}</div>
            <div className="prayer-cell-time">{timings[p.key]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
