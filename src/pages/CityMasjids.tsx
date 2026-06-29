import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCityById } from '../lib/ukCities'
import { getMasjidsByCity, haversineKm } from '../lib/masjids'
import MasjidCard from '../components/masjid/MasjidCard'
import MasjidMap from '../components/masjid/MasjidMap'

export default function CityMasjids() {
  const { cityId = 'leicester' } = useParams()
  const city = getCityById(cityId)
  const masjids = getMasjidsByCity(cityId)
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      )
    }
  }, [])

  const sorted = useMemo(() => {
    if (!userLoc) return masjids
    return [...masjids].sort((a, b) =>
      haversineKm(userLoc.lat, userLoc.lng, a.lat, a.lng) -
      haversineKm(userLoc.lat, userLoc.lng, b.lat, b.lng)
    )
  }, [masjids, userLoc])

  if (!city) {
    return (
      <div className="content">
        <div className="card"><p>City not found. <Link to="/masjids">Browse all cities</Link></p></div>
      </div>
    )
  }

  return (
    <div className="content">
      <div className="page-header">
        <h1>Masjids in {city.name}</h1>
        <p>{city.masjidCount}+ registered masjids in {city.name}, {city.region}</p>
      </div>

      {sorted.length > 0 && (
        <div className="card" style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
          <MasjidMap lat={city.lat} lng={city.lng} name={city.name} height={360} />
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="card">
          <p>No masjids registered yet for {city.name}. Check back soon or <Link to="/contact">contact us</Link> to register your masjid.</p>
        </div>
      ) : (
        <div className="grid grid-auto">
          {sorted.map(m => (
            <MasjidCard key={m.id} masjid={m} userLat={userLoc?.lat} userLng={userLoc?.lng} />
          ))}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Link to="/masjids" className="btn">← All Cities</Link>
        <Link to={`/prayer-times?city=${city.id}`} className="btn btn-emerald" style={{ marginLeft: 8 }}>
          Prayer Times for {city.name}
        </Link>
      </div>
    </div>
  )
}
