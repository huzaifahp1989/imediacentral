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
    <div className="card">
      <strong>Next Prayer:</strong> {nextPrayerName} — in {h}h {m}m {s}s
    </div>
  )
}
