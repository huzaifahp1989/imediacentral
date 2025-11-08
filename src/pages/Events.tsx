import { useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import { EventItem, saveEvent, upcomingEvents, pastEvents } from '../lib/eventsStore'

function EventCard({ item }: { item: EventItem }) {
  const dt = new Date(item.datetime)
  const dateStr = dt.toLocaleString()
  return (
    <div className="card" style={{ display: 'grid', gap: 8 }}>
      {item.imageDataUrl && (
        <img src={item.imageDataUrl} alt={item.title} style={{ width: '100%', borderRadius: 8 }} />
      )}
      <h3 className="card-title" style={{ marginBottom: 0 }}>{item.title}</h3>
      <p style={{ margin: 0, color: '#374151' }}>{item.venue} — {dateStr}</p>
      {item.guestSpeakers?.length ? (
        <p style={{ margin: 0 }}>Guests: {item.guestSpeakers.join(', ')}</p>
      ) : null}
      {item.description && <p style={{ marginTop: 6 }}>{item.description}</p>}
    </div>
  )
}

function AddEventForm({ onSaved }: { onSaved: () => void }) {
  const [title, setTitle] = useState('')
  const [venue, setVenue] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('')
  const [description, setDescription] = useState('')
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined)
  const [saving, setSaving] = useState(false)

  const onFile = (file?: File) => {
    if (!file) { setImageDataUrl(undefined); return }
    const reader = new FileReader()
    reader.onload = () => setImageDataUrl(String(reader.result))
    reader.readAsDataURL(file)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !venue || !date) { alert('Please fill Title, Venue, and Date'); return }
    const dtStr = new Date(`${date}T${time || '00:00'}`).toISOString()
    const item: EventItem = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      title, venue, datetime: dtStr,
      guestSpeakers: guests ? guests.split(',').map(s => s.trim()).filter(Boolean) : undefined,
      description: description || undefined,
      imageDataUrl,
    }
    setSaving(true)
    try {
      saveEvent(item)
      setTitle(''); setVenue(''); setDate(''); setTime(''); setGuests(''); setDescription(''); setImageDataUrl(undefined)
      onSaved()
      alert('Event saved locally. For admin uploads, we can integrate Firebase storage and Firestore next.')
    } finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} className="card" style={{ display: 'grid', gap: 10 }}>
      <h3 className="card-title">Add Event</h3>
      <input type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} style={input} />
      <input type="text" placeholder="Venue" value={venue} onChange={e => setVenue(e.target.value)} style={input} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={input} />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} style={input} />
      </div>
      <input type="text" placeholder="Guest Speakers (comma-separated)" value={guests} onChange={e => setGuests(e.target.value)} style={input} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{...input, minHeight: 120}} />
      <div>
        <label className="btn">
          Upload Banner Image
          <input type="file" accept="image/*" onChange={e => onFile(e.target.files?.[0])} style={{ display: 'none' }} />
        </label>
        {imageDataUrl && <span style={{ marginLeft: 8, fontSize: 12 }}>Selected ✓</span>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Event'}</button>
    </form>
  )
}

export default function Events() {
  const [upcoming, setUpcoming] = useState<EventItem[]>([])
  const [past, setPast] = useState<EventItem[]>([])

  const refresh = () => {
    setUpcoming(upcomingEvents())
    setPast(pastEvents())
  }

  useEffect(() => { refresh() }, [])

  const upcomingTab = (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
      {upcoming.length === 0 && <div className="card"><p>No upcoming events yet.</p></div>}
      {upcoming.map(e => (<EventCard key={e.id} item={e} />))}
    </div>
  )

  const pastTab = (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
      {past.length === 0 && <div className="card"><p>No past events found.</p></div>}
      {past.map(e => (<EventCard key={e.id} item={e} />))}
    </div>
  )

  const addTab = (<AddEventForm onSaved={refresh} />)

  return (
    <div className="content">
      <div className="card">
        <h2>Events</h2>
        <p>Upload community events: venue, date, guest speakers, and more. Currently stored locally for testing.</p>
      </div>

      <Tabs
        items={[
          { key: 'upcoming', label: 'Upcoming', content: upcomingTab },
          { key: 'past', label: 'Past', content: pastTab },
          { key: 'add', label: 'Add Event', content: addTab },
        ]}
      />
    </div>
  )
}

const input: React.CSSProperties = { width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)', background: '#fff' }
