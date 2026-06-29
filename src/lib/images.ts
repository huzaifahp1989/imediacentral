/** Local masjid illustrations — always available, no external CDN dependency */
export const MASJID_FALLBACK = '/masjid-placeholder.svg'

export const MASJID_PHOTOS = [
  '/masjids/masjid-1.svg',
  '/masjids/masjid-2.svg',
  '/masjids/masjid-3.svg',
  '/masjids/masjid-4.svg',
  '/masjids/masjid-5.svg',
  '/masjids/masjid-6.svg',
] as const

/** Hero background */
export const HERO_BG = MASJID_PHOTOS[1]

const BROKEN_HOSTS = ['images.unsplash.com', 'unsplash.com']

export function resolveImageUrl(src?: string): string {
  if (!src) return MASJID_FALLBACK
  if (BROKEN_HOSTS.some(host => src.includes(host))) {
    return photoForId(src)
  }
  return src
}

export function masjidPhoto(seed = 0): string {
  return MASJID_PHOTOS[Math.abs(seed) % MASJID_PHOTOS.length]
}

export function masjidGallery(seed: number, count = 2): string[] {
  return Array.from({ length: count }, (_, i) => masjidPhoto(seed + i + 1))
}

/** Hash string to stable photo index */
export function photoForId(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i)) | 0
  return masjidPhoto(h)
}
