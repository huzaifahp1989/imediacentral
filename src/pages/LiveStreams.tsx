import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getLiveMasjids, getEmasjidMasjids, getMasjidsByCity } from '../lib/masjids'
import { getCityById } from '../lib/ukCities'
import { EMASJID_LISTEN_URL } from '../lib/emasjid'
import StreamPlayer from '../components/streams/StreamPlayer'
import MasjidCard from '../components/masjid/MasjidCard'

type StreamFilter =
  | 'all'
  | 'leicester'
  | 'dewsbury'
  | 'birmingham'
  | 'coventry'
  | 'emasjid-leicester'
  | 'emasjid-dewsbury'
  | 'emasjid-birmingham'
  | 'emasjid-coventry'

const CITY_LABELS: Record<string, string> = {
  leicester: 'Leicester',
  dewsbury: 'Dewsbury',
  birmingham: 'Birmingham',
  coventry: 'Coventry',
}

export default function LiveStreams() {
  const [filter, setFilter] = useState<StreamFilter>('all')
  const allStreams = getLiveMasjids()
  const emasjidLeicester = getEmasjidMasjids('leicester')
  const emasjidDewsbury = getEmasjidMasjids('dewsbury')
  const emasjidBirmingham = getEmasjidMasjids('birmingham')
  const emasjidCoventry = getEmasjidMasjids('coventry')
  const leicesterAll = getMasjidsByCity('leicester')
  const dewsburyAll = getMasjidsByCity('dewsbury')
  const birminghamAll = getMasjidsByCity('birmingham')
  const coventryAll = getMasjidsByCity('coventry')

  const displayed = (() => {
    switch (filter) {
      case 'leicester':
        return allStreams.filter(m => m.cityId === 'leicester')
      case 'dewsbury':
        return allStreams.filter(m => m.cityId === 'dewsbury')
      case 'birmingham':
        return allStreams.filter(m => m.cityId === 'birmingham')
      case 'coventry':
        return allStreams.filter(m => m.cityId === 'coventry')
      case 'emasjid-leicester':
        return emasjidLeicester.filter(m => m.liveStream)
      case 'emasjid-dewsbury':
        return emasjidDewsbury.filter(m => m.liveStream)
      case 'emasjid-birmingham':
        return emasjidBirmingham.filter(m => m.liveStream)
      case 'emasjid-coventry':
        return emasjidCoventry.filter(m => m.liveStream)
      default:
        return allStreams
    }
  })()

  const emasjidGrid = filter === 'emasjid-leicester' ? emasjidLeicester
    : filter === 'emasjid-dewsbury' ? emasjidDewsbury
      : filter === 'emasjid-birmingham' ? emasjidBirmingham
        : filter === 'emasjid-coventry' ? emasjidCoventry
          : null

  const cityBrowse = filter === 'leicester' ? leicesterAll
    : filter === 'dewsbury' ? dewsburyAll
      : filter === 'birmingham' ? birminghamAll
        : filter === 'coventry' ? coventryAll
          : null

  const emasjidTotal = emasjidLeicester.length + emasjidDewsbury.length + emasjidBirmingham.length + emasjidCoventry.length

  return (
    <div className="content">
      <div className="page-header">
        <h1>Live Masjid Streams</h1>
        <p>Official live audio from masjids across the UK via eMasjid Live and masjid websites</p>
      </div>

      <div className="card glass-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 className="card-title" style={{ marginBottom: 4 }}>Powered by eMasjid Live</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>
              {emasjidTotal} masjids on the official eMasjid platform across Leicester, Dewsbury, Birmingham, and Coventry.
            </p>
          </div>
          <a
            className="btn btn-emerald glow"
            href={EMASJID_LISTEN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open eMasjid Live →
          </a>
        </div>
      </div>

      <div className="search-filters">
        {([
          ['all', `All (${allStreams.length})`],
          ['birmingham', `Birmingham (${birminghamAll.filter(m => m.liveStream).length})`],
          ['coventry', `Coventry (${coventryAll.filter(m => m.liveStream).length})`],
          ['leicester', `Leicester (${leicesterAll.filter(m => m.liveStream).length})`],
          ['dewsbury', `Dewsbury (${dewsburyAll.filter(m => m.liveStream).length})`],
          ['emasjid-birmingham', `eMasjid Birmingham (${emasjidBirmingham.length})`],
          ['emasjid-coventry', `eMasjid Coventry (${emasjidCoventry.length})`],
          ['emasjid-leicester', `eMasjid Leicester (${emasjidLeicester.length})`],
          ['emasjid-dewsbury', `eMasjid Dewsbury (${emasjidDewsbury.length})`],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`filter-chip ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {emasjidGrid ? (
        <div className="grid grid-auto">
          {emasjidGrid.map(m => (
            <div key={m.id} className="card">
              <StreamPlayer stream={m.liveStream!} masjidName={m.name} />
              <div style={{ padding: '16px 0 0' }}>
                <span className="badge badge-emerald">eMasjid Live</span>
                <h3 style={{ margin: '8px 0 4px' }}>
                  <Link to={`/masjid/${m.slug}`}>{m.name}</Link>
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{m.address}, {m.postcode}</p>
              </div>
            </div>
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="card"><p>No official streams in this category right now.</p></div>
      ) : (
        <div className="grid grid-auto">
          {displayed.map(m => {
            const city = getCityById(m.cityId)
            return (
              <div key={m.id} className="card">
                <StreamPlayer stream={m.liveStream!} masjidName={m.name} />
                <div style={{ padding: '16px 0 0' }}>
                  <span className="badge badge-emerald">
                    {m.liveStream!.platform === 'emasjid' ? 'eMasjid Live' : 'Official Stream'}
                  </span>
                  <h3 style={{ margin: '8px 0 4px' }}>
                    <Link to={`/masjid/${m.slug}`}>{m.name}</Link>
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                    {city?.name} — {m.liveStream!.title}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {cityBrowse && (
        <section style={{ marginTop: 32 }}>
          <h2>All {CITY_LABELS[cityBrowse[0]?.cityId ?? ''] ?? cityBrowse[0]?.cityId} Masjids ({cityBrowse.length})</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
            Full directory with eMasjid Live streams where available.
          </p>
          <div className="grid grid-auto">
            {cityBrowse.map(m => <MasjidCard key={m.id} masjid={m} />)}
          </div>
          <Link to={`/masjids/${cityBrowse[0]?.cityId}`} className="btn btn-emerald" style={{ marginTop: 16 }}>
            View on Map
          </Link>
        </section>
      )}

      {filter === 'all' && (
        <>
          <section style={{ marginTop: 32 }}>
            <h2>Birmingham Masjids ({birminghamAll.length})</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
              {emasjidBirmingham.length} with eMasjid Live — including Birmingham Jame Masjid, Al-Habib Trust, and Kings Heath Masjid.
            </p>
            <div className="grid grid-auto">
              {birminghamAll.slice(0, 6).map(m => <MasjidCard key={m.id} masjid={m} />)}
            </div>
            <Link to="/masjids/birmingham" className="btn btn-emerald" style={{ marginTop: 16 }}>
              View All Birmingham Masjids
            </Link>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2>Coventry Masjids ({coventryAll.length})</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
              {emasjidCoventry.length} with eMasjid Live — including Masjid Zeenatul Islam and Masjid-e-Zakariya.
            </p>
            <div className="grid grid-auto">
              {coventryAll.map(m => <MasjidCard key={m.id} masjid={m} />)}
            </div>
            <Link to="/masjids/coventry" className="btn btn-emerald" style={{ marginTop: 16 }}>
              View All Coventry Masjids
            </Link>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2>Dewsbury Masjids ({dewsburyAll.length})</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
              {emasjidDewsbury.length} with eMasjid Live — including Markazi Masjid, Darul Ilm, Zakaria Masjid, and more.
            </p>
            <div className="grid grid-auto">
              {dewsburyAll.slice(0, 6).map(m => <MasjidCard key={m.id} masjid={m} />)}
            </div>
            <Link to="/masjids/dewsbury" className="btn btn-emerald" style={{ marginTop: 16 }}>
              View All Dewsbury Masjids
            </Link>
          </section>
        </>
      )}

      <p style={{ marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
        Only official masjid streams via eMasjid Live and masjid websites. Unofficial streams are never shown.
      </p>
    </div>
  )
}
