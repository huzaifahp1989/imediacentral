import { useEffect, useMemo, useState } from 'react'
import Tabs from '../components/Tabs'
import SalahCountdown from '../components/SalahCountdown'

type Timings = {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string;
}

type Settings = {
  method: string; // Aladhan method code as string (e.g., '10' for Moonsighting Committee)
  school: number; // 0 = Shafi/Maliki/Hanbali, 1 = Hanafi
  offsets: { Fajr: number; Dhuhr: number; Asr: number; Maghrib: number; Isha: number }
}

function parseTimeToDate(t: string): Date | null {
  // t like "05:12" or "05:12 (BST)"; we only need HH:MM in local timezone (Leicester: Europe/London)
  const match = t.match(/(\d{1,2}):(\d{2})/)
  if (!match) return null
  const now = new Date()
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(match[1], 10), parseInt(match[2], 10), 0, 0)
  return d
}

function addMinutesToTimeString(t: string, minutes: number): string {
  const d = parseTimeToDate(t)
  if (!d || !Number.isFinite(minutes)) return t
  d.setMinutes(d.getMinutes() + minutes)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

function applyOffsets(t: Timings, offsets: Settings['offsets']): Timings {
  return {
    Fajr: addMinutesToTimeString(t.Fajr, offsets.Fajr),
    Sunrise: t.Sunrise,
    Dhuhr: addMinutesToTimeString(t.Dhuhr, offsets.Dhuhr),
    Asr: addMinutesToTimeString(t.Asr, offsets.Asr),
    Maghrib: addMinutesToTimeString(t.Maghrib, offsets.Maghrib),
    Isha: addMinutesToTimeString(t.Isha, offsets.Isha),
  }
}

function Timetable({ timings }: { timings: Timings | null }) {
  if (!timings) {
    return (
      <div className="card">
        <p>Loading Leicester prayer times…</p>
      </div>
    )
  }
  return (
    <div className="card">
      <h2>Today’s Salah Times — Leicester, UK</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        <div className="widget"><strong>Fajr</strong><div>{timings.Fajr}</div></div>
        <div className="widget"><strong>Sunrise</strong><div>{timings.Sunrise}</div></div>
        <div className="widget"><strong>Dhuhr</strong><div>{timings.Dhuhr}</div></div>
        <div className="widget"><strong>Asr</strong><div>{timings.Asr}</div></div>
        <div className="widget"><strong>Maghrib</strong><div>{timings.Maghrib}</div></div>
        <div className="widget"><strong>Isha</strong><div>{timings.Isha}</div></div>
      </div>
      <p style={{ color: '#374151', fontSize: 13, marginTop: 8 }}>Source: Aladhan API (city: Leicester, United Kingdom). Adjustments can be tuned in Settings.</p>
    </div>
  )
}

export default function Salah() {
  const [timings, setTimings] = useState<Timings | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem('imc_salah_settings')
      if (raw) return JSON.parse(raw)
    } catch {}
    // Default to Moonsighting Committee method and Hanafi Asr for Leicester; no offsets
    return { method: '10', school: 1, offsets: { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 } }
  })

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      try {
        setError(null)
        const today = new Date()
        const key = `imc_salah_${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}_${settings.method}_${settings.school}`
        // Try cache first
        try {
          const cached = localStorage.getItem(key)
          if (cached) {
            const t: Timings = JSON.parse(cached)
            setTimings(applyOffsets(t, settings.offsets))
            return
          }
        } catch {}
        // Fetch with selected method and school
        const url = `https://api.aladhan.com/v1/timingsByCity?city=Leicester&country=United%20Kingdom&method=${settings.method}&school=${settings.school}`
        const res = await fetch(url, { signal: controller.signal })
        const json = await res.json()
        const t: Timings = json?.data?.timings
        if (!t) throw new Error('Timings not available')
        // Cache raw timings for the day
        try { localStorage.setItem(key, JSON.stringify(t)) } catch {}
        setTimings(applyOffsets(t, settings.offsets))
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError(e?.message || 'Failed to load timings')
      }
    }
    run()
    return () => controller.abort()
  }, [settings.method, settings.school, settings.offsets])

  const next = useMemo(() => {
    if (!timings) return { name: 'Loading…', time: new Date(Date.now() + 30 * 60 * 1000) }
    const now = new Date()
    const order: Array<{ name: string; date: Date | null }> = [
      { name: 'Fajr', date: parseTimeToDate(timings.Fajr) },
      { name: 'Dhuhr', date: parseTimeToDate(timings.Dhuhr) },
      { name: 'Asr', date: parseTimeToDate(timings.Asr) },
      { name: 'Maghrib', date: parseTimeToDate(timings.Maghrib) },
      { name: 'Isha', date: parseTimeToDate(timings.Isha) },
    ]
    const upcoming = order.find(x => x.date && x.date.getTime() > now.getTime())
    if (upcoming?.date) return { name: upcoming.name, time: upcoming.date }
    // If day passed, next is Fajr of next day; fallback to Isha remaining
    const fajr = parseTimeToDate(timings.Fajr)
    if (fajr) {
      const t = new Date(fajr)
      t.setDate(t.getDate() + 1)
      return { name: 'Fajr', time: t }
    }
    return { name: 'Isha', time: new Date(now.getTime() + 60 * 60 * 1000) }
  }, [timings])

  const today = (
    <div>
      <Timetable timings={timings} />
      {error && (
        <div className="card" style={{ borderColor: '#ef4444' }}>
          <p style={{ color: '#ef4444' }}>{error}</p>
        </div>
      )}
      <SalahCountdown nextPrayerName={next.name} nextPrayerTime={next.time} />
    </div>
  )

  const settingsUI = (
    <div className="card">
      <h3 className="card-title">Settings</h3>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <label className="widget">
          <div><strong>Calculation Method</strong></div>
          <select value={settings.method} onChange={(e) => {
            const v = e.target.value
            const next = { ...settings, method: v }
            setSettings(next)
            try { localStorage.setItem('imc_salah_settings', JSON.stringify(next)) } catch {}
          }}>
            <option value="10">Moonsighting Committee</option>
            <option value="3">Muslim World League</option>
            <option value="2">ISNA</option>
            <option value="5">Egyptian General Authority</option>
            <option value="4">Umm al-Qura (Makkah)</option>
          </select>
        </label>
        <label className="widget">
          <div><strong>Juristic School (Asr)</strong></div>
          <select value={settings.school} onChange={(e) => {
            const v = parseInt(e.target.value, 10)
            const next = { ...settings, school: v }
            setSettings(next)
            try { localStorage.setItem('imc_salah_settings', JSON.stringify(next)) } catch {}
          }}>
            <option value={0}>Shafi/Maliki/Hanbali (shadow factor 1)</option>
            <option value={1}>Hanafi (shadow factor 2)</option>
          </select>
        </label>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12, marginTop: 12 }}>
        {(['Fajr','Dhuhr','Asr','Maghrib','Isha'] as const).map(name => (
          <label key={name} className="widget">
            <div><strong>{name} Offset (mins)</strong></div>
            <input type="number" value={settings.offsets[name]}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10) || 0
                const next = { ...settings, offsets: { ...settings.offsets, [name]: v } }
                setSettings(next)
                try { localStorage.setItem('imc_salah_settings', JSON.stringify(next)) } catch {}
              }} />
          </label>
        ))}
      </div>
      <p style={{ color: '#374151', fontSize: 13, marginTop: 8 }}>Set your preferred method and Asr juristic school. Use offsets to match local Leicester mosque timetable exactly.</p>
    </div>
  )

  const week = (
    <div className="card">
      <h3 className="card-title">This Week</h3>
      <p>Weekly timetable table (placeholder). Will integrate calculations or CSV import.</p>
    </div>
  )

  const month = (
    <div className="card">
      <h3 className="card-title">Monthly Timetable</h3>
      <p>Downloadable PDF and printable view (placeholder).</p>
    </div>
  )

  return (
    <div className="content">
      <Tabs
        items={[
          { key: 'today', label: 'Today', content: today },
          { key: 'week', label: 'Week', content: week },
          { key: 'month', label: 'Month', content: month },
          { key: 'settings', label: 'Settings', content: settingsUI },
        ]}
      />
    </div>
  )
}
