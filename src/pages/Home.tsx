import HomeHero from '../components/home/HomeHero'
import StatsBar from '../components/home/StatsBar'
import VerseWidget from '../components/VerseWidget'
import SalahCountdown from '../components/SalahCountdown'
import { Link } from 'react-router-dom'
import QuoteSlider from '../components/QuoteSlider'
import FeedList from '../components/FeedList'
import MasjidCard from '../components/masjid/MasjidCard'
import { getFeaturedMasjids, getLiveMasjids } from '../lib/masjids'

export default function Home() {
  const featured = getFeaturedMasjids().slice(0, 3)
  const liveCount = getLiveMasjids().length

  return (
    <div className="content">
      <HomeHero />
      <StatsBar />

      <section style={{ marginTop: 48 }}>
        <div className="grid grid-2">
          <VerseWidget />
          <div>
            <SalahCountdown nextPrayerName="Asr" />
            <div style={{ marginTop: 12 }}>
              <Link to="/prayer-times" className="btn btn-emerald" style={{ width: '100%', textAlign: 'center' }}>
                View Full Prayer Times
              </Link>
            </div>
          </div>
        </div>
      </section>

      {liveCount > 0 && (
        <section style={{ marginTop: 32 }}>
          <div className="section-header">
            <h2>Live Now</h2>
            <Link to="/live-streams" className="btn btn-sky">All Live Streams</Link>
          </div>
          <div className="grid-auto">
            {getLiveMasjids().slice(0, 3).map(m => <MasjidCard key={m.id} masjid={m} />)}
          </div>
        </section>
      )}

      <section style={{ marginTop: 32 }}>
        <div className="section-header">
          <h2>Featured Masjids</h2>
          <Link to="/masjids" className="btn btn-emerald">Browse Directory</Link>
        </div>
        <div className="grid-auto">
          {featured.map(m => <MasjidCard key={m.id} masjid={m} />)}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <div className="card glass-card">
          <h3 className="card-title">About Islam Media Central</h3>
          <p>
            The UK's premier Islamic platform for prayer times, masjid directory, live streams,
            community events, and Islamic services. Trusted by Muslims across every major UK city.
          </p>
          <div className="grid grid-3" style={{ marginTop: 12 }}>
            <div className="widget">
              <strong>Prayer Times</strong>
              <div>Accurate UK timings with Hijri dates, Qibla, and monthly timetables.</div>
              <div style={{ marginTop: 8 }}><Link className="btn btn-emerald" to="/prayer-times">View Times</Link></div>
            </div>
            <div className="widget">
              <strong>Masjid Directory</strong>
              <div>Find masjids in Leicester, London, Birmingham, and every UK city.</div>
              <div style={{ marginTop: 8 }}><Link className="btn" to="/masjids">Find Masjid</Link></div>
            </div>
            <div className="widget">
              <strong>Live & Events</strong>
              <div>Watch live Jumu'ah, lectures, and community events near you.</div>
              <div style={{ marginTop: 8 }}><Link className="btn btn-gold" to="/events">See Events</Link></div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <QuoteSlider />
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <div className="card">
          <h3 className="card-title">Latest Posts</h3>
          <FeedList feedUrl="https://imediac.com/feeds" limit={3} />
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/articles">View More</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
