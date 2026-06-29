import { qiblaDirection } from '../../lib/prayerTimes'

type Props = { lat: number; lng: number }

export default function QiblaCompass({ lat, lng }: Props) {
  const bearing = qiblaDirection(lat, lng)
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h3 className="card-title">Qibla Direction</h3>
      <div className="qibla-compass">
        <div className="qibla-needle" style={{ transform: `rotate(${bearing}deg)` }} />
        <span className="qibla-label">Qibla</span>
      </div>
      <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)' }}>
        {Math.round(bearing)}° from North
      </p>
    </div>
  )
}
