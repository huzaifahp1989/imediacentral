export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha'

export type Timings = Record<PrayerName, string>

export type CalculationMethod = '2' | '3' | '4' | '5' | '10'

export type PrayerSettings = {
  method: CalculationMethod
  school: 0 | 1
  offsets: Record<Exclude<PrayerName, 'Sunrise'>, number>
}

export type UKCity = {
  id: string
  name: string
  region: string
  lat: number
  lng: number
  masjidCount: number
}

export type MasjidService =
  | 'madrasah'
  | 'funeral'
  | 'nikah'
  | 'food-bank'
  | 'counselling'
  | 'youth-club'
  | 'womens-programme'
  | 'parking'
  | 'womens-facilities'
  | 'disabled-access'

export type LiveStream = {
  platform: 'youtube' | 'facebook' | 'website' | 'audio' | 'radio' | 'emasjid'
  url: string
  pageUrl?: string
  isLive: boolean
  alwaysOn?: boolean
  scheduledAt?: string
  title?: string
}

export type MasjidEvent = {
  id: string
  title: string
  speaker?: string
  date: string
  time: string
  venue: string
  posterUrl?: string
  bookingUrl?: string
  description?: string
}

export type MasjidReview = {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export type Masjid = {
  id: string
  slug: string
  name: string
  cityId: string
  address: string
  postcode: string
  lat: number
  lng: number
  phone?: string
  email?: string
  website?: string
  facebook?: string
  instagram?: string
  youtube?: string
  coverImage: string
  gallery: string[]
  description: string
  history?: string
  jumuahTimes: string[]
  services: MasjidService[]
  liveStream?: LiveStream
  events: MasjidEvent[]
  announcements: string[]
  parkingInfo?: string
  rating: number
  reviewCount: number
  featured?: boolean
  emasjidSlug?: string
}

export type PlatformStats = {
  masjidCount: number
  liveStreamsToday: number
  eventsToday: number
  citiesCovered: number
}
