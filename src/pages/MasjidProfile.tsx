import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Tabs from '../components/Tabs'
import MasjidMap, { directionsUrl } from '../components/masjid/MasjidMap'
import MasjidImage from '../components/masjid/MasjidImage'
import StreamPlayer from '../components/streams/StreamPlayer'
import PrayerDisclaimer from '../components/prayer/PrayerDisclaimer'
import { getMasjidBySlug, SERVICE_LABELS } from '../lib/masjids'
import { toggleFavouriteMasjid, loadFavouriteMasjids } from '../lib/prayerTimes'
import { getCityById } from '../lib/ukCities'

export default function MasjidProfile() {
  const { slug = '' } = useParams()
  const masjid = getMasjidBySlug(slug)
  const [isFav, setIsFav] = useState(() => loadFavouriteMasjids().includes(masjid?.id ?? ''))

  if (!masjid) {
    return (
      <div className="content">
        <div className="card"><p>Masjid not found. <Link to="/masjids">Browse directory</Link></p></div>
      </div>
    )
  }

  const city = getCityById(masjid.cityId)

  const overview = (
    <div>
      {masjid.history && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 className="card-title">History</h3>
          <p>{masjid.history}</p>
        </div>
      )}
      <div className="card">
        <h3 className="card-title">About</h3>
        <p>{masjid.description}</p>
      </div>
      {masjid.announcements.length > 0 && (
        <div className="card" style={{ marginTop: 16 }}>
          <h3 className="card-title">Announcements</h3>
          <ul>{masjid.announcements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </div>
      )}
    </div>
  )

  const prayerTab = (
    <div>
      <div className="card">
        <h3 className="card-title">Jumu'ah Times</h3>
        <div className="grid grid-jumuah">
          {masjid.jumuahTimes.map(t => (
            <div key={t} className="prayer-cell">
              <div className="prayer-cell-name">Jumu'ah</div>
              <div className="prayer-cell-time">{t}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, color: 'var(--muted)' }}>
          For daily prayer times, see the <Link to={`/prayer-times?city=${masjid.cityId}`}>city timetable</Link>.
        </p>
      </div>
      <PrayerDisclaimer />
    </div>
  )

  const servicesTab = (
    <div className="info-grid">
      {masjid.services.map(s => (
        <div key={s} className="info-item">
          <strong>Service</strong>
          {SERVICE_LABELS[s] ?? s}
        </div>
      ))}
      {masjid.parkingInfo && (
        <div className="info-item">
          <strong>Parking</strong>
          {masjid.parkingInfo}
        </div>
      )}
    </div>
  )

  const eventsTab = (
    <div className="grid grid-auto">
      {masjid.events.length === 0 && <div className="card"><p>No upcoming events.</p></div>}
      {masjid.events.map(e => (
        <div key={e.id} className="card">
          {e.posterUrl && <MasjidImage src={e.posterUrl} alt={e.title} style={{ width: '100%', borderRadius: 12, marginBottom: 12 }} />}
          <h3 className="card-title">{e.title}</h3>
          {e.speaker && <p><strong>Speaker:</strong> {e.speaker}</p>}
          <p>{e.date} at {e.time} — {e.venue}</p>
          {e.description && <p>{e.description}</p>}
          {e.bookingUrl && <a className="btn btn-emerald" href={e.bookingUrl} target="_blank" rel="noopener noreferrer">Register</a>}
        </div>
      ))}
    </div>
  )

  const contactTab = (
    <div>
      <div className="info-grid" style={{ marginBottom: 16 }}>
        {masjid.phone && <div className="info-item"><strong>Phone</strong><a href={`tel:${masjid.phone}`}>{masjid.phone}</a></div>}
        {masjid.email && <div className="info-item"><strong>Email</strong><a href={`mailto:${masjid.email}`}>{masjid.email}</a></div>}
        {masjid.website && <div className="info-item"><strong>Website</strong><a href={masjid.website} target="_blank" rel="noopener noreferrer">Visit</a></div>}
        <div className="info-item"><strong>Address</strong>{masjid.address}, {masjid.postcode}</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {masjid.facebook && <a className="btn" href={masjid.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
        {masjid.instagram && <a className="btn" href={masjid.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
        {masjid.youtube && <a className="btn" href={masjid.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
        <a className="btn btn-emerald" href={directionsUrl(masjid.lat, masjid.lng)} target="_blank" rel="noopener noreferrer">Get Directions</a>
        <a className="btn btn-gold glow" href="#">Donate</a>
      </div>
      <MasjidMap lat={masjid.lat} lng={masjid.lng} name={masjid.name} />
    </div>
  )

  const streamTab = (
    <div>
      {masjid.liveStream ? (
        <StreamPlayer stream={masjid.liveStream} masjidName={masjid.name} />
      ) : (
        <div className="stream-offline">
          No live stream currently available.
        </div>
      )}
      {masjid.youtube && (
        <a className="btn" href={masjid.youtube} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12 }}>
          View Official YouTube Channel
        </a>
      )}
    </div>
  )

  const galleryTab = (
    <div className="grid grid-gallery">
      {[masjid.coverImage, ...masjid.gallery].map((img, i) => (
        <MasjidImage key={i} src={img} alt={`${masjid.name} gallery ${i + 1}`} style={{ width: '100%', borderRadius: 16, height: 160, objectFit: 'cover' }} />
      ))}
    </div>
  )

  return (
    <div className="content">
      <MasjidImage src={masjid.coverImage} alt={masjid.name} className="profile-cover" />
      <div className="profile-header-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: '0 0 8px' }}>{masjid.name}</h1>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{masjid.address}, {masjid.postcode} — {city?.name}</p>
            <div className="stars" style={{ marginTop: 8 }}>
              {'★'.repeat(Math.round(masjid.rating))}{'☆'.repeat(5 - Math.round(masjid.rating))}
              <span style={{ color: 'var(--muted)', marginLeft: 6 }}>({masjid.reviewCount} reviews)</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {masjid.liveStream?.isLive && <span className="badge badge-live">● Live Now</span>}
            {masjid.liveStream?.alwaysOn && !masjid.liveStream?.isLive && (
              <span className="badge badge-emerald">● Official Stream</span>
            )}
            <button className="btn btn-gold" onClick={() => setIsFav(toggleFavouriteMasjid(masjid.id))}>
              {isFav ? '★ Favourited' : '☆ Favourite'}
            </button>
            <Link to={`/masjids/${masjid.cityId}`} className="btn">More in {city?.name}</Link>
          </div>
        </div>
      </div>

      <Tabs items={[
        { key: 'overview', label: 'Overview', content: overview },
        { key: 'prayer', label: 'Prayer Times', content: prayerTab },
        { key: 'stream', label: 'Live Stream', content: streamTab },
        { key: 'events', label: 'Events', content: eventsTab },
        { key: 'services', label: 'Services', content: servicesTab },
        { key: 'gallery', label: 'Gallery', content: galleryTab },
        { key: 'contact', label: 'Contact & Map', content: contactTab },
      ]} />
    </div>
  )
}
