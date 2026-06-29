import { Link } from 'react-router-dom'
import type { Masjid } from '../../lib/types'
import { getCityById } from '../../lib/ukCities'
import { formatDistance, haversineKm } from '../../lib/masjids'

import MasjidImage from './MasjidImage'

type Props = {
  masjid: Masjid
  userLat?: number
  userLng?: number
}

export default function MasjidCard({ masjid, userLat, userLng }: Props) {
  const city = getCityById(masjid.cityId)
  const distance = userLat != null && userLng != null
    ? formatDistance(haversineKm(userLat, userLng, masjid.lat, masjid.lng))
    : null

  return (
    <Link to={`/masjid/${masjid.slug}`} className="masjid-card">
      <MasjidImage
        src={masjid.coverImage}
        alt={masjid.name}
        className="masjid-card-image"
      />
      <div className="masjid-card-body">
        <h3>{masjid.name}</h3>
        <div className="masjid-card-meta">
          <span>{city?.name ?? masjid.cityId}</span>
          {distance && <span>• {distance}</span>}
          {masjid.liveStream?.isLive && <span className="badge badge-live">● Live</span>}
          {masjid.liveStream?.alwaysOn && !masjid.liveStream?.isLive && (
            <span className="badge badge-emerald">
              {masjid.liveStream.platform === 'emasjid' ? '● eMasjid Live' : '● Official Stream'}
            </span>
          )}
          {masjid.featured && <span className="badge badge-gold">Featured</span>}
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: '8px 0 0' }}>{masjid.address}</p>
        {masjid.jumuahTimes.length > 0 && (
          <p style={{ fontSize: 12, margin: '8px 0 0', color: 'var(--emerald)' }}>
            Jumu'ah: {masjid.jumuahTimes.join(', ')}
          </p>
        )}
        <div className="stars" style={{ marginTop: 8 }}>
          {'★'.repeat(Math.round(masjid.rating))}{'☆'.repeat(5 - Math.round(masjid.rating))}
          <span style={{ color: 'var(--muted)', marginLeft: 6, fontSize: 12 }}>
            ({masjid.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  )
}
