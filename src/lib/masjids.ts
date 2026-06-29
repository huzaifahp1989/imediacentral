import type { Masjid } from './types'
import { LEICESTER_MASJIDS } from './leicesterMasjids'
import { DEWSBURY_MASJIDS } from './dewsburyMasjids'
import { BIRMINGHAM_MASJIDS } from './birminghamMasjids'
import { COVENTRY_MASJIDS } from './coventryMasjids'
import { photoForId } from './images'

const ytLive = (channelId: string) =>
  `https://www.youtube.com/embed/live_stream?channel=${channelId}`

const OTHER_MASJIDS: Masjid[] = [
  {
    id: 'm4',
    slug: 'east-london-masjid',
    name: 'East London Mosque & London Muslim Centre',
    cityId: 'london',
    address: '82–92 Whitechapel Road',
    postcode: 'E1 1JQ',
    lat: 51.5174,
    lng: -0.0618,
    phone: '020 7650 3000',
    email: 'info@eastlondonmosque.org.uk',
    website: 'https://www.eastlondonmosque.org.uk',
    facebook: 'https://www.facebook.com/eastlondonmosque',
    youtube: 'https://www.youtube.com/@theeastlondonmosque',
    coverImage: photoForId('m4'),
    gallery: [],
    description: 'One of the UK\'s largest masjids, serving East London since 1910.',
    history: 'Founded in 1910, the East London Mosque is a landmark institution for British Muslims.',
    jumuahTimes: ['13:15', '14:00', '14:45'],
    services: ['madrasah', 'funeral', 'nikah', 'food-bank', 'counselling', 'youth-club', 'womens-facilities', 'disabled-access', 'parking'],
    liveStream: {
      platform: 'audio',
      url: 'https://mixlr.com/embed/eastlondonmosque',
      pageUrl: 'https://www.eastlondonmosque.org.uk/live-audio',
      isLive: false,
      alwaysOn: true,
      title: 'East London Mosque — Live Audio (Mixlr)',
    },
    events: [],
    announcements: ['Friday khutbah also on official Facebook page.'],
    parkingInfo: 'No visitor parking. Nearest tube: Aldgate East or Whitechapel.',
    rating: 4.9,
    reviewCount: 890,
    featured: true,
  },
  {
    id: 'm7',
    slug: 'bradford-grand-mosque',
    name: 'Al-Jamia Suffa-Tul-Islam Grand Mosque (Bradford Grand Mosque)',
    cityId: 'bradford',
    address: 'Horton Park Avenue, Little Horton',
    postcode: 'BD5 0LD',
    lat: 53.7840,
    lng: -1.7686,
    phone: '01274 732497',
    email: 'info@bradfordgrandmosque.co.uk',
    website: 'https://www.bradfordgrandmosque.co.uk',
    facebook: 'https://www.facebook.com/bradfordgrandmosque',
    youtube: 'https://www.youtube.com/bradfordgrandmosque',
    coverImage: photoForId('m7'),
    gallery: [],
    description: 'Bradford Grand Mosque — capacity for 3,000 worshippers.',
    jumuahTimes: ['13:00', '14:00'],
    services: ['madrasah', 'funeral', 'nikah', 'food-bank', 'youth-club', 'parking'],
    liveStream: {
      platform: 'youtube',
      url: ytLive('UCoZkXk2V40eN1-3Vq8_W5yA'),
      pageUrl: 'https://www.youtube.com/bradfordgrandmosque',
      isLive: false,
      title: 'Bradford Grand Mosque — Official YouTube',
    },
    events: [],
    announcements: ['Food bank donations welcome every Saturday.'],
    parkingInfo: 'Parking at Horton Park Avenue.',
    rating: 4.7,
    reviewCount: 167,
    featured: true,
  },
  {
    id: 'm8',
    slug: 'manchester-central-mosque',
    name: 'Manchester Central Mosque',
    cityId: 'manchester',
    address: '20 Upper Park Road, Victoria Park',
    postcode: 'M14 5RU',
    lat: 53.4572,
    lng: -2.2203,
    phone: '0161 224 4119',
    email: 'info@manchestercentralmosque.org',
    website: 'https://manchestercentralmosque.org',
    facebook: 'https://www.facebook.com/MCMVICTORIAPARK',
    youtube: 'https://www.youtube.com/@MCMVICTORIAPARK',
    coverImage: photoForId('m8'),
    gallery: [],
    description: 'Manchester Central Mosque (Jamiat ul Muslimeen) — serving since 1948.',
    jumuahTimes: ['13:00', '14:00'],
    services: ['madrasah', 'funeral', 'nikah', 'counselling', 'disabled-access'],
    events: [],
    announcements: [],
    rating: 4.8,
    reviewCount: 1135,
  },
]

export const MASJIDS: Masjid[] = [
  ...LEICESTER_MASJIDS,
  ...DEWSBURY_MASJIDS,
  ...BIRMINGHAM_MASJIDS,
  ...COVENTRY_MASJIDS,
  ...OTHER_MASJIDS,
]

export function getMasjidBySlug(slug: string): Masjid | undefined {
  return MASJIDS.find(m => m.slug === slug)
}

export function getMasjidsByCity(cityId: string): Masjid[] {
  return MASJIDS.filter(m => m.cityId === cityId)
}

export function searchMasjids(query: string, cityId?: string): Masjid[] {
  const q = query.toLowerCase().trim()
  let list = cityId ? getMasjidsByCity(cityId) : MASJIDS
  if (!q) return list
  return list.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.address.toLowerCase().includes(q) ||
    m.postcode.toLowerCase().includes(q)
  )
}

export function getLiveMasjids(): Masjid[] {
  return MASJIDS.filter(m => m.liveStream && (m.liveStream.isLive || m.liveStream.alwaysOn))
}

export function getEmasjidMasjids(cityId?: string): Masjid[] {
  const list = cityId ? getMasjidsByCity(cityId) : MASJIDS
  return list.filter(m => m.liveStream?.platform === 'emasjid' || m.emasjidSlug)
}

export function getFeaturedMasjids(): Masjid[] {
  return MASJIDS.filter(m => m.featured)
}

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

export const SERVICE_LABELS: Record<string, string> = {
  madrasah: 'Madrasah',
  funeral: 'Funeral Service',
  nikah: 'Nikah Service',
  'food-bank': 'Food Bank',
  counselling: 'Counselling',
  'youth-club': 'Youth Club',
  'womens-programme': 'Women\'s Programme',
  'womens-facilities': 'Women\'s Facilities',
  'disabled-access': 'Disabled Access',
  parking: 'Parking',
}
