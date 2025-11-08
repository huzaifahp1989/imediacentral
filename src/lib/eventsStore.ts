export type EventItem = {
  id: string
  title: string
  venue: string
  datetime: string // ISO string
  guestSpeakers?: string[]
  description?: string
  imageDataUrl?: string // base64 data URL
}

const KEY = 'imc_events'

export function loadEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as EventItem[]
  } catch {}
  return []
}

export function saveEvent(e: EventItem) {
  const all = loadEvents()
  const updated = [e, ...all].slice(0, 500) // cap to 500 to avoid storage bloat
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function upcomingEvents(now = new Date()): EventItem[] {
  const all = loadEvents()
  return all
    .filter(e => new Date(e.datetime).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
}

export function pastEvents(now = new Date()): EventItem[] {
  const all = loadEvents()
  return all
    .filter(e => new Date(e.datetime).getTime() < now.getTime())
    .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
}
