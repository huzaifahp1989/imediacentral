import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import MasjidCard from '../components/masjid/MasjidCard'
import { searchMasjids, MASJIDS } from '../lib/masjids'
import { searchCities } from '../lib/ukCities'

type Filter = 'all' | 'masjid' | 'city' | 'event' | 'stream' | 'service'

export default function SearchPage() {
  const [params] = useSearchParams()
  const initialQ = params.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [filter, setFilter] = useState<Filter>('all')

  const results = useMemo(() => {
    const q = query.trim()
    const masjids = q ? searchMasjids(q) : MASJIDS
    const cities = q ? searchCities(q) : []
    const events = MASJIDS.flatMap(m =>
      m.events
        .filter(e => !q || e.title.toLowerCase().includes(q.toLowerCase()) || e.speaker?.toLowerCase().includes(q.toLowerCase()))
        .map(e => ({ ...e, masjid: m }))
    )
    const streams = MASJIDS.filter(m => m.liveStream?.isLive && (!q || m.name.toLowerCase().includes(q.toLowerCase())))
    const services = MASJIDS.filter(m =>
      !q || m.services.some(s => s.includes(q.toLowerCase())) || m.name.toLowerCase().includes(q.toLowerCase())
    )
    return { masjids, cities, events, streams, services }
  }, [query])

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'masjid', label: 'Masjids' },
    { key: 'city', label: 'Cities' },
    { key: 'event', label: 'Events' },
    { key: 'stream', label: 'Live Streams' },
    { key: 'service', label: 'Services' },
  ]

  return (
    <div className="content">
      <div className="page-header">
        <h1>Search</h1>
        <p>Find masjids, cities, events, and services across the UK</p>
      </div>

      <form className="search-box" style={{ marginBottom: 24 }} onSubmit={e => e.preventDefault()}>
        <input
          type="search"
          placeholder="City, postcode, masjid name, speaker, event…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="search-filters">
        {filters.map(f => (
          <button
            key={f.key}
            type="button"
            className={`filter-chip ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {(filter === 'all' || filter === 'city') && results.cities.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h2>Cities ({results.cities.length})</h2>
          <div className="city-grid">
            {results.cities.map(c => (
              <Link key={c.id} to={`/masjids/${c.id}`} className="city-card">
                <h3>{c.name}</h3>
                <span>{c.region} — {c.masjidCount}+ masjids</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(filter === 'all' || filter === 'masjid') && results.masjids.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h2>Masjids ({results.masjids.length})</h2>
          <div className="grid grid-auto">
            {results.masjids.map(m => <MasjidCard key={m.id} masjid={m} />)}
          </div>
        </section>
      )}

      {(filter === 'all' || filter === 'event') && results.events.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h2>Events ({results.events.length})</h2>
          <div className="grid grid-auto">
            {results.events.map(e => (
              <div key={e.id} className="card">
                <h3>{e.title}</h3>
                {e.speaker && <p>Speaker: {e.speaker}</p>}
                <p>{e.date} at {e.time}</p>
                <Link to={`/masjid/${e.masjid.slug}`} className="btn btn-emerald">View Masjid</Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {(filter === 'all' || filter === 'stream') && results.streams.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h2>Live Streams ({results.streams.length})</h2>
          <div className="grid grid-auto">
            {results.streams.map(m => (
              <div key={m.id} className="card">
                <span className="badge badge-live">● Live</span>
                <h3><Link to={`/masjid/${m.slug}`}>{m.name}</Link></h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {(filter === 'all' || filter === 'service') && results.services.length > 0 && (
        <section>
          <h2>Services ({results.services.length})</h2>
          <div className="grid grid-auto">
            {results.services.map(m => (
              <div key={m.id} className="card">
                <h3><Link to={`/masjid/${m.slug}`}>{m.name}</Link></h3>
                <p>{m.services.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {query && results.masjids.length === 0 && results.cities.length === 0 && results.events.length === 0 && (
        <div className="card"><p>No results for "{query}". Try a different city or masjid name.</p></div>
      )}
    </div>
  )
}
