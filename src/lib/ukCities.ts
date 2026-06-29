import type { UKCity } from './types'

export const UK_CITIES: UKCity[] = [
  { id: 'london', name: 'London', region: 'England', lat: 51.5074, lng: -0.1278, masjidCount: 420 },
  { id: 'birmingham', name: 'Birmingham', region: 'England', lat: 52.4862, lng: -1.8904, masjidCount: 160 },
  { id: 'leicester', name: 'Leicester', region: 'England', lat: 52.6369, lng: -1.1398, masjidCount: 95 },
  { id: 'bradford', name: 'Bradford', region: 'England', lat: 53.7960, lng: -1.7594, masjidCount: 110 },
  { id: 'manchester', name: 'Manchester', region: 'England', lat: 53.4808, lng: -2.2426, masjidCount: 85 },
  { id: 'blackburn', name: 'Blackburn', region: 'England', lat: 53.7488, lng: -2.4878, masjidCount: 45 },
  { id: 'oldham', name: 'Oldham', region: 'England', lat: 53.5409, lng: -2.1114, masjidCount: 38 },
  { id: 'dewsbury', name: 'Dewsbury', region: 'England', lat: 53.6910, lng: -1.6320, masjidCount: 32 },
  { id: 'bolton', name: 'Bolton', region: 'England', lat: 53.5785, lng: -2.4299, masjidCount: 28 },
  { id: 'sheffield', name: 'Sheffield', region: 'England', lat: 53.3811, lng: -1.4701, masjidCount: 42 },
  { id: 'derby', name: 'Derby', region: 'England', lat: 52.9225, lng: -1.4746, masjidCount: 25 },
  { id: 'nottingham', name: 'Nottingham', region: 'England', lat: 52.9548, lng: -1.1581, masjidCount: 35 },
  { id: 'coventry', name: 'Coventry', region: 'England', lat: 52.4068, lng: -1.5197, masjidCount: 22 },
  { id: 'luton', name: 'Luton', region: 'England', lat: 51.8787, lng: -0.4200, masjidCount: 30 },
  { id: 'slough', name: 'Slough', region: 'England', lat: 51.5105, lng: -0.5950, masjidCount: 18 },
  { id: 'glasgow', name: 'Glasgow', region: 'Scotland', lat: 55.8642, lng: -4.2518, masjidCount: 20 },
  { id: 'cardiff', name: 'Cardiff', region: 'Wales', lat: 51.4816, lng: -3.1791, masjidCount: 15 },
  { id: 'newcastle', name: 'Newcastle', region: 'England', lat: 54.9783, lng: -1.6178, masjidCount: 18 },
  { id: 'liverpool', name: 'Liverpool', region: 'England', lat: 53.4084, lng: -2.9916, masjidCount: 22 },
  { id: 'leeds', name: 'Leeds', region: 'England', lat: 53.8008, lng: -1.5491, masjidCount: 40 },
  { id: 'bristol', name: 'Bristol', region: 'England', lat: 51.4545, lng: -2.5879, masjidCount: 16 },
  { id: 'edinburgh', name: 'Edinburgh', region: 'Scotland', lat: 55.9533, lng: -3.1883, masjidCount: 12 },
  { id: 'huddersfield', name: 'Huddersfield', region: 'England', lat: 53.6458, lng: -1.7850, masjidCount: 24 },
  { id: 'rochdale', name: 'Rochdale', region: 'England', lat: 53.6097, lng: -2.1561, masjidCount: 20 },
  { id: 'preston', name: 'Preston', region: 'England', lat: 53.7632, lng: -2.7031, masjidCount: 14 },
]

export function getCityById(id: string): UKCity | undefined {
  return UK_CITIES.find(c => c.id === id)
}

export function getCityByName(name: string): UKCity | undefined {
  const q = name.toLowerCase().trim()
  return UK_CITIES.find(c => c.name.toLowerCase() === q || c.id === q)
}

export function searchCities(query: string): UKCity[] {
  const q = query.toLowerCase().trim()
  if (!q) return UK_CITIES
  return UK_CITIES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.region.toLowerCase().includes(q) ||
    c.id.includes(q)
  )
}
