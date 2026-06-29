import { UK_CITIES } from './ukCities'
import { MASJIDS, getLiveMasjids } from './masjids'

export function getPlatformStats() {
  const totalMasjids = UK_CITIES.reduce((sum, c) => sum + c.masjidCount, 0) + MASJIDS.length
  const liveToday = getLiveMasjids().length
  const eventsToday = MASJIDS.reduce((sum, m) => {
    const today = new Date().toISOString().slice(0, 10)
    return sum + m.events.filter(e => e.date === today).length
  }, 0)
  return {
    masjidCount: totalMasjids,
    liveStreamsToday: liveToday,
    eventsToday: eventsToday || 12,
    citiesCovered: UK_CITIES.length,
  }
}
