import type { PrayerSettings, Timings } from './types'

export const PRAYER_DISCLAIMER =
  'Prayer times are provided as a guide only. Please refer to your local Masjid for the correct Jama\'ah and prayer timings as these may vary.'

export const CALCULATION_METHODS: { value: string; label: string }[] = [
  { value: '10', label: 'Moonsighting Committee' },
  { value: '3', label: 'Muslim World League' },
  { value: '2', label: 'ISNA' },
  { value: '5', label: 'Egyptian General Authority' },
  { value: '4', label: 'Umm al-Qura (Makkah)' },
]

export const DEFAULT_SETTINGS: PrayerSettings = {
  method: '10',
  school: 1,
  offsets: { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 },
}

export function parseTimeToDate(t: string): Date | null {
  const match = t.match(/(\d{1,2}):(\d{2})/)
  if (!match) return null
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(match[1], 10), parseInt(match[2], 10))
}

export function addMinutesToTimeString(t: string, minutes: number): string {
  const d = parseTimeToDate(t)
  if (!d || !Number.isFinite(minutes)) return t
  d.setMinutes(d.getMinutes() + minutes)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function applyOffsets(t: Timings, offsets: PrayerSettings['offsets']): Timings {
  return {
    Fajr: addMinutesToTimeString(t.Fajr, offsets.Fajr),
    Sunrise: t.Sunrise,
    Dhuhr: addMinutesToTimeString(t.Dhuhr, offsets.Dhuhr),
    Asr: addMinutesToTimeString(t.Asr, offsets.Asr),
    Maghrib: addMinutesToTimeString(t.Maghrib, offsets.Maghrib),
    Isha: addMinutesToTimeString(t.Isha, offsets.Isha),
  }
}

export function normalizeTimings(raw: Record<string, string>): Timings {
  return {
    Fajr: raw.Fajr?.replace(/\s*\(.*\)/, '') ?? '',
    Sunrise: raw.Sunrise?.replace(/\s*\(.*\)/, '') ?? '',
    Dhuhr: (raw.Dhuhr ?? raw.Zuhr ?? '').replace(/\s*\(.*\)/, ''),
    Asr: raw.Asr?.replace(/\s*\(.*\)/, '') ?? '',
    Maghrib: raw.Maghrib?.replace(/\s*\(.*\)/, '') ?? '',
    Isha: raw.Isha?.replace(/\s*\(.*\)/, '') ?? '',
  }
}

export function getNextPrayer(timings: Timings): { name: string; time: Date } {
  const now = new Date()
  const order = [
    { name: 'Fajr', date: parseTimeToDate(timings.Fajr) },
    { name: 'Dhuhr', date: parseTimeToDate(timings.Dhuhr) },
    { name: 'Asr', date: parseTimeToDate(timings.Asr) },
    { name: 'Maghrib', date: parseTimeToDate(timings.Maghrib) },
    { name: 'Isha', date: parseTimeToDate(timings.Isha) },
  ]
  const upcoming = order.find(x => x.date && x.date.getTime() > now.getTime())
  if (upcoming?.date) return { name: upcoming.name, time: upcoming.date }
  const fajr = parseTimeToDate(timings.Fajr)
  if (fajr) {
    const t = new Date(fajr)
    t.setDate(t.getDate() + 1)
    return { name: 'Fajr', time: t }
  }
  return { name: 'Isha', time: new Date(now.getTime() + 3600000) }
}

export function qiblaDirection(lat: number, lng: number): number {
  const kaabaLat = 21.4225 * Math.PI / 180
  const kaabaLng = 39.8262 * Math.PI / 180
  const userLat = lat * Math.PI / 180
  const userLng = lng * Math.PI / 180
  const y = Math.sin(kaabaLng - userLng)
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(kaabaLng - userLng)
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}

export async function fetchTimingsByCity(
  city: string,
  country: string,
  settings: PrayerSettings,
  signal?: AbortSignal
): Promise<{ timings: Timings; hijri: string; gregorian: string }> {
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${settings.method}&school=${settings.school}`
  const res = await fetch(url, { signal })
  const json = await res.json()
  const t = normalizeTimings(json?.data?.timings ?? {})
  const hijri = json?.data?.date?.hijri
    ? `${hijri.day} ${hijri.month.en} ${hijri.year} AH`
    : ''
  const gregorian = json?.data?.date?.gregorian
    ? `${gregorian.day} ${gregorian.month.en} ${gregorian.year}`
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return { timings: applyOffsets(t, settings.offsets), hijri, gregorian }
}

export async function fetchTimingsByCoords(
  lat: number,
  lng: number,
  settings: PrayerSettings,
  signal?: AbortSignal
): Promise<{ timings: Timings; hijri: string; gregorian: string }> {
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${settings.method}&school=${settings.school}`
  const res = await fetch(url, { signal })
  const json = await res.json()
  const t = normalizeTimings(json?.data?.timings ?? {})
  const hijri = json?.data?.date?.hijri
    ? `${json.data.date.hijri.day} ${json.data.date.hijri.month.en} ${json.data.date.hijri.year} AH`
    : ''
  const gregorian = json?.data?.date?.gregorian
    ? `${json.data.date.gregorian.day} ${json.data.date.gregorian.month.en} ${json.data.date.gregorian.year}`
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return { timings: applyOffsets(t, settings.offsets), hijri, gregorian }
}

export async function fetchMonthlyCalendar(
  city: string,
  month: number,
  year: number,
  settings: PrayerSettings,
  signal?: AbortSignal
): Promise<Array<{ date: string; timings: Timings }>> {
  const url = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(city)}&country=United%20Kingdom&method=${settings.method}&school=${settings.school}`
  const res = await fetch(url, { signal })
  const json = await res.json()
  return (json?.data ?? []).map((day: { date: { gregorian: { date: string } }; timings: Record<string, string> }) => ({
    date: day.date.gregorian.date,
    timings: applyOffsets(normalizeTimings(day.timings), settings.offsets),
  }))
}

export async function lookupPostcode(postcode: string): Promise<{ lat: number; lng: number; city: string } | null> {
  const clean = postcode.replace(/\s+/g, '').toUpperCase()
  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`)
    const json = await res.json()
    if (json.status !== 200) return null
    return {
      lat: json.result.latitude,
      lng: json.result.longitude,
      city: json.result.admin_district || json.result.parish || json.result.region,
    }
  } catch {
    return null
  }
}

export async function fetchWeather(lat: number, lng: number): Promise<{ temp: number; description: string; icon: string } | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=Europe%2FLondon`
    const res = await fetch(url)
    const json = await res.json()
    const temp = Math.round(json?.current?.temperature_2m ?? 0)
    const code = json?.current?.weather_code ?? 0
    const desc = weatherCodeToText(code)
    return { temp, description: desc, icon: weatherIcon(code) }
  } catch {
    return null
  }
}

function weatherCodeToText(code: number): string {
  if (code === 0) return 'Clear sky'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 49) return 'Foggy'
  if (code <= 59) return 'Drizzle'
  if (code <= 69) return 'Rain'
  if (code <= 79) return 'Snow'
  if (code <= 99) return 'Thunderstorm'
  return 'Cloudy'
}

function weatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 69) return '🌧️'
  if (code <= 79) return '❄️'
  if (code <= 99) return '⛈️'
  return '☁️'
}

export function loadSettings(): PrayerSettings {
  try {
    const raw = localStorage.getItem('imc_prayer_settings')
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS
}

export function saveSettings(settings: PrayerSettings): void {
  try { localStorage.setItem('imc_prayer_settings', JSON.stringify(settings)) } catch { /* ignore */ }
}

export function loadFavouriteCity(): string {
  return localStorage.getItem('imc_favourite_city') || 'leicester'
}

export function saveFavouriteCity(cityId: string): void {
  try { localStorage.setItem('imc_favourite_city', cityId) } catch { /* ignore */ }
}

export function loadFavouriteMasjids(): string[] {
  try {
    const raw = localStorage.getItem('imc_favourite_masjids')
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

export function toggleFavouriteMasjid(id: string): boolean {
  const favs = loadFavouriteMasjids()
  const idx = favs.indexOf(id)
  if (idx >= 0) {
    favs.splice(idx, 1)
    localStorage.setItem('imc_favourite_masjids', JSON.stringify(favs))
    return false
  }
  favs.push(id)
  localStorage.setItem('imc_favourite_masjids', JSON.stringify(favs))
  return true
}
