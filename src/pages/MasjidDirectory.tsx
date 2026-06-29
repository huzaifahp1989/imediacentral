import { Link } from 'react-router-dom'
import { UK_CITIES } from '../lib/ukCities'
import { getFeaturedMasjids } from '../lib/masjids'
import MasjidCard from '../components/masjid/MasjidCard'

export default function MasjidDirectory() {
  const featured = getFeaturedMasjids()

  return (
    <div className="content">
      <div className="page-header">
        <h1>UK Masjid Directory</h1>
        <p>Find masjids in every city across the United Kingdom</p>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2>Browse by City</h2>
        <div className="city-grid">
          {UK_CITIES.map(city => (
            <Link key={city.id} to={`/masjids/${city.id}`} className="city-card">
              <h3>{city.name}</h3>
              <span>{city.region}</span>
              <span className="badge badge-emerald">{city.masjidCount}+ Masjids</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Featured Masjids</h2>
        <div className="grid grid-auto">
          {featured.map(m => <MasjidCard key={m.id} masjid={m} />)}
        </div>
      </section>
    </div>
  )
}
