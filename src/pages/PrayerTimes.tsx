import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Tabs from '../components/Tabs'
import SalahCountdown from '../components/SalahCountdown'
import PrayerTimetable from '../components/prayer/PrayerTimetable'
import PrayerDisclaimer from '../components/prayer/PrayerDisclaimer'
import QiblaCompass from '../components/prayer/QiblaCompass'
import { UK_CITIES, getCityById } from '../lib/ukCities'
import type { PrayerSettings, Timings } from '../lib/types'
import {
  CALCULATION_METHODS,
  fetchMonthlyCalendar,
  fetchTimingsByCity,
  fetchTimingsByCoords,
  fetchWeather,
  getNextPrayer,
  loadFavouriteCity,
  loadSettings,
  lookupPostcode,
  saveFavouriteCity,
  saveSettings,
} from '../lib/prayerTimes'

export default function PrayerTimes() {
  const [searchParams] = useSearchParams()
  const [cityId, setCityId] = useState(() => searchParams.get('city') || loadFavouriteCity())
  const [timings, setTimings] = useState<Timings | null>(null)
  const [hijri, setHijri] = useState('')
  const [gregorian, setGregorian] = useState('')
  const [weather, setWeather] = useState<{ temp: number; description: string; icon: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<PrayerSettings>(loadSettings)
  const [postcode, setPostcode] = useState('')
  const [monthly, setMonthly] = useState<Array<{ date: string; timings: Timings }>>([])
  const [loadingMonth, setLoadingMonth] = useState(false)
  const [isFavourite, setIsFavourite] = useState(cityId === loadFavouriteCity())

  const city = getCityById(cityId) ?? UK_CITIES[2]

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      try {
        setError(null)
        const result = await fetchTimingsByCity(city.name, 'United Kingdom', settings, controller.signal)
        setTimings(result.timings)
        setHijri(result.hijri)
        setGregorian(result.gregorian)
        const w = await fetchWeather(city.lat, city.lng)
        setWeather(w)
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== 'AbortError') setError(e.message)
      }
    }
    run()
    return () => controller.abort()
  }, [cityId, city.name, city.lat, city.lng, settings])

  const next = useMemo(() => {
    if (!timings) return { name: 'Loading…', time: new Date(Date.now() + 1800000) }
    return getNextPrayer(timings)
  }, [timings])

  const handlePostcode = async () => {
    const result = await lookupPostcode(postcode)
    if (!result) { setError('Postcode not found'); return }
    const match = UK_CITIES.find(c => c.name.toLowerCase() === result.city.toLowerCase())
    if (match) {
      setCityId(match.id)
    } else {
      try {
        const data = await fetchTimingsByCoords(result.lat, result.lng, settings)
        setTimings(data.timings)
        setHijri(data.hijri)
        setGregorian(data.gregorian)
        setWeather(await fetchWeather(result.lat, result.lng))
      } catch {
        setError('Could not load prayer times for this postcode')
      }
    }
  }

  const detectLocation = () => {
    if (!navigator.geolocation) { setError('Geolocation not supported'); return }
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      let nearest = UK_CITIES[0]
      let minDist = Infinity
      for (const c of UK_CITIES) {
        const d = Math.hypot(c.lat - latitude, c.lng - longitude)
        if (d < minDist) { minDist = d; nearest = c }
      }
      setCityId(nearest.id)
    }, () => setError('Location access denied'))
  }

  const loadMonth = async () => {
    setLoadingMonth(true)
    try {
      const now = new Date()
      const data = await fetchMonthlyCalendar(city.name, now.getMonth() + 1, now.getFullYear(), settings)
      setMonthly(data)
    } catch {
      setError('Failed to load monthly timetable')
    } finally {
      setLoadingMonth(false)
    }
  }

  const toggleFavourite = () => {
    saveFavouriteCity(cityId)
    setIsFavourite(true)
  }

  const updateSettings = (partial: Partial<PrayerSettings>) => {
    const next = { ...settings, ...partial }
    setSettings(next)
    saveSettings(next)
  }

  const printTimetable = () => window.print()

  const shareTimetable = async () => {
    const text = `${city.name} Prayer Times\n${gregorian}\nFajr: ${timings?.Fajr} | Zuhr: ${timings?.Dhuhr} | Asr: ${timings?.Asr} | Maghrib: ${timings?.Maghrib} | Isha: ${timings?.Isha}`
    if (navigator.share) {
      await navigator.share({ title: `${city.name} Prayer Times`, text })
    } else {
      await navigator.clipboard.writeText(text)
      alert('Timetable copied to clipboard')
    }
  }

  const todayTab = (
    <div>
      <div className="grid grid-compass" style={{ marginBottom: 16 }}>
        <div className="card">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>Gregorian</div>
              <strong>{gregorian || '…'}</strong>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>Hijri</div>
              <strong className="font-ar">{hijri || '…'}</strong>
            </div>
            {weather && (
              <div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Weather</div>
                <strong>{weather.icon} {weather.temp}°C — {weather.description}</strong>
              </div>
            )}
          </div>
        </div>
        <QiblaCompass lat={city.lat} lng={city.lng} />
      </div>

      {timings && <PrayerTimetable timings={timings} cityName={city.name} />}
      {error && <div className="card" style={{ borderColor: '#ef4444' }}><p style={{ color: '#ef4444' }}>{error}</p></div>}
      <SalahCountdown nextPrayerName={next.name} nextPrayerTime={next.time} />
      <PrayerDisclaimer />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
        <button className="btn btn-emerald" onClick={shareTimetable}>Share Timetable</button>
        <button className="btn" onClick={printTimetable}>Print Timetable</button>
        <button className="btn btn-gold" onClick={toggleFavourite} disabled={isFavourite}>
          {isFavourite ? '★ Favourite City' : 'Save Favourite City'}
        </button>
      </div>
    </div>
  )

  const monthTab = (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className="btn btn-emerald" onClick={loadMonth} disabled={loadingMonth}>
          {loadingMonth ? 'Loading…' : 'Load Monthly Timetable'}
        </button>
        <button className="btn" onClick={printTimetable}>Print</button>
      </div>
      {monthly.length > 0 && (
        <div className="timetable-scroll card" style={{ padding: 0 }}>
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Date</th><th>Fajr</th><th>Sunrise</th><th>Zuhr</th><th>Asr</th><th>Maghrib</th><th>Isha</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map(row => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.timings.Fajr}</td>
                  <td>{row.timings.Sunrise}</td>
                  <td>{row.timings.Dhuhr}</td>
                  <td>{row.timings.Asr}</td>
                  <td>{row.timings.Maghrib}</td>
                  <td>{row.timings.Isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <PrayerDisclaimer />
    </div>
  )

  const settingsTab = (
    <div className="card">
      <h3 className="card-title">Calculation Settings</h3>
      <div className="grid grid-2">
        <label className="widget">
          <div><strong>Calculation Method</strong></div>
          <select value={settings.method} onChange={e => updateSettings({ method: e.target.value as PrayerSettings['method'] })}>
            {CALCULATION_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </label>
        <label className="widget">
          <div><strong>Madhab (Asr)</strong></div>
          <select value={settings.school} onChange={e => updateSettings({ school: parseInt(e.target.value, 10) as 0 | 1 })}>
            <option value={0}>Shafi/Maliki/Hanbali</option>
            <option value={1}>Hanafi</option>
          </select>
        </label>
      </div>
      <div className="grid grid-prayer-offsets" style={{ marginTop: 12 }}>
        {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map(name => (
          <label key={name} className="widget">
            <div><strong>{name} Offset (mins)</strong></div>
            <input type="number" value={settings.offsets[name]}
              onChange={e => updateSettings({ offsets: { ...settings.offsets, [name]: parseInt(e.target.value, 10) || 0 } })} />
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <div className="content">
      <div className="page-header">
        <h1>UK Prayer Times</h1>
        <p>Accurate salah times for every major UK city</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="grid grid-fit-sm">
          <label>
            <strong>Select City</strong>
            <select value={cityId} onChange={e => { setCityId(e.target.value); setIsFavourite(e.target.value === loadFavouriteCity()) }} style={{ width: '100%', padding: 10, borderRadius: 10, marginTop: 6 }}>
              {UK_CITIES.map(c => <option key={c.id} value={c.id}>{c.name}, {c.region}</option>)}
            </select>
          </label>
          <label>
            <strong>Search by Postcode</strong>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <input type="text" placeholder="e.g. LE1 5WW" value={postcode} onChange={e => setPostcode(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid var(--border)' }} />
              <button className="btn btn-emerald" onClick={handlePostcode}>Go</button>
            </div>
          </label>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-sky" onClick={detectLocation} style={{ width: '100%' }}>📍 Detect My Location</button>
          </div>
        </div>
      </div>

      <Tabs items={[
        { key: 'today', label: 'Today', content: todayTab },
        { key: 'month', label: 'Monthly', content: monthTab },
        { key: 'settings', label: 'Settings', content: settingsTab },
      ]} />
    </div>
  )
}
