import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { searchCities } from '../../lib/ukCities'
import { searchMasjids } from '../../lib/masjids'

export default function HomeHero() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    const cities = searchCities(q)
    const masjids = searchMasjids(q)
    if (cities.length === 1 && masjids.length === 0) {
      navigate(`/masjids/${cities[0].id}`)
    } else {
      navigate(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  return (
    <section className="uk-hero animate-in">
      <div className="uk-hero-content">
        <h1>UK Masjids & Prayer Times</h1>
        <p>Discover masjids, accurate prayer times, live streams, and community events across the United Kingdom</p>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search your city or postcode"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search city or postcode"
          />
          <button type="submit">Search</button>
        </form>

        <div className="quick-actions">
          <Link to="/prayer-times" className="quick-action-btn">🕌 Find Prayer Times</Link>
          <Link to="/masjids" className="quick-action-btn">📍 Find Masjid</Link>
          <Link to="/live-streams" className="quick-action-btn">📺 Live Masjid Streams</Link>
          <Link to="/events" className="quick-action-btn">📅 Islamic Events</Link>
          <Link to="/khutbah" className="quick-action-btn">🎙️ Friday Khutbah</Link>
          <Link to="/radio" className="quick-action-btn">📻 Quran Radio</Link>
          <Link to="/masjids?nearby=1" className="quick-action-btn">🧭 Nearby Masjids</Link>
        </div>
      </div>
    </section>
  )
}
