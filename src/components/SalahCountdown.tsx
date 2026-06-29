import { useEffect, useState } from 'react'

type Props = { nextPrayerName?: string; nextPrayerTime?: Date }

export default function SalahCountdown({ nextPrayerName = 'Asr', nextPrayerTime }: Props) {
  const target = nextPrayerTime ?? new Date(Date.now() + 1000 * 60 * 45) // placeholder 45 mins
  const [delta, setDelta] = useState(target.getTime() - Date.now())
  useEffect(() => {
    const t = setInterval(() => setDelta(target.getTime() - Date.now()), 1000)
    return () => clearInterval(t)
  }, [target])
  const h = Math.max(0, Math.floor(delta / 3600000))
  const m = Math.max(0, Math.floor((delta % 3600000) / 60000))
  const s = Math.max(0, Math.floor((delta % 60000) / 1000))

  return (
    <div className="card" style={{ textAlign: 'center', background: 'var(--emerald-50)', borderColor: 'var(--emerald)' }}>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Next Prayer</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--emerald)' }}>{nextPrayerName}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8, fontVariantNumeric: 'tabular-nums' }}>
        {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </div>
    </div>
  )
}
