import { Link } from 'react-router-dom'
import MasjidImage from '../components/masjid/MasjidImage'
import { MASJIDS } from '../lib/masjids'
import { getCityById } from '../lib/ukCities'

export default function Khutbah() {
  const khutbahMasjids = MASJIDS.filter(m => m.liveStream?.isLive || m.jumuahTimes.length > 0)

  return (
    <div className="content">
      <div className="page-header">
        <h1>Friday Khutbah</h1>
        <p>Watch live Jumu'ah khutbahs from masjids across the UK</p>
      </div>

      <div className="grid grid-auto">
        {khutbahMasjids.map(m => {
          const city = getCityById(m.cityId)
          return (
            <div key={m.id} className="card">
              <MasjidImage src={m.coverImage} alt={m.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }} />
              <h3 style={{ margin: '0 0 8px' }}>
                <Link to={`/masjid/${m.slug}`}>{m.name}</Link>
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{city?.name}</p>
              <p style={{ margin: '8px 0' }}>Jumu'ah: {m.jumuahTimes.join(', ')}</p>
              {m.liveStream?.isLive ? (
                <Link to={`/masjid/${m.slug}`} className="btn btn-emerald">Watch Live Khutbah</Link>
              ) : (
                <Link to={`/masjid/${m.slug}`} className="btn">View Masjid</Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
