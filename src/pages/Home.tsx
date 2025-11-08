import HeroSlider from '../components/HeroSlider'
import VerseWidget from '../components/VerseWidget'
import SalahCountdown from '../components/SalahCountdown'
import FeaturesSlider from '../components/FeaturesSlider'
import { Link } from 'react-router-dom'
import QuoteSlider from '../components/QuoteSlider'
import QuickZakatCalculator from '../components/QuickZakatCalculator'
import FeedList from '../components/FeedList'

export default function Home() {
  const features = [
    { title: 'Quran', to: '/links', desc: 'Read and reflect' },
    { title: 'Hadith', to: '/articles', desc: 'Authentic collections' },
    { title: 'Live Radio', to: '/radio', desc: 'Stream the station' },
    { title: 'Kids Zone', to: '/kids', desc: 'Stories & quizzes' },
    { title: 'Blog', to: '/articles', desc: 'Latest posts' },
    { title: 'Podcast', to: '/articles', desc: 'Talks & series' },
  ]

  return (
    <div className="content">
      <HeroSlider />

      <div style={{ marginTop: 16 }}>
        <FeaturesSlider />
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <VerseWidget />
        <SalahCountdown nextPrayerName="Asr" />
      </div>

      <div className="feature-grid" style={{ marginTop: 16 }}>
        {features.map(f => (
          <Link key={f.title} className="feature-card" to={f.to}>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </Link>
        ))}
      </div>

      {/* About + Quote slider section */}
      <section style={{ marginTop: 16 }}>
        <div className="card">
          <h3 className="card-title">About Islam Media Central</h3>
          <p>
            We are dedicated to sharing authentic Islamic knowledge, community updates, and live programming.
            Explore our radio, salah times, kids zone, and community events — all tailored for Leicester.
          </p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 12 }}>
            <div className="widget">
              <strong>Live Radio</strong>
              <div>24/7 stream, reminders, and special programs.</div>
              <div style={{ marginTop: 8 }}><Link className="btn btn-gold" to="/radio">Tune In</Link></div>
            </div>
            <div className="widget">
              <strong>Prayer Timetable</strong>
              <div>Accurate Leicester timings with configurable methods.</div>
              <div style={{ marginTop: 8 }}><Link className="btn" to="/salah">View Times</Link></div>
            </div>
            <div className="widget">
              <strong>Community & Events</strong>
              <div>Workshops, charity drives, and local announcements.</div>
              <div style={{ marginTop: 8 }}><Link className="btn" to="/events">See Events</Link></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <a className="btn btn-gold glow" href="#">Donate</a>
            <Link className="btn" to="/contact">Contact Us</Link>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <QuoteSlider />
        </div>
      </section>

      {/* Quick Zakat Calculator section */}
      <section style={{ marginTop: 16 }}>
        <div className="card">
          <h3 className="card-title">Quick Zakat Calculator</h3>
          <p>Estimate your Zakat in minutes. For detailed assets and nisab, use the full calculator.</p>
          <QuickZakatCalculator />
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/zakat">Open Full Calculator</Link>
          </div>
        </div>
      </section>

      {/* Latest posts from imediac.com */}
      <section style={{ marginTop: 16 }}>
        <div className="card">
          <h3 className="card-title">Latest Posts</h3>
          <p>Recent articles from imediac.com</p>
          <FeedList feedUrl="https://imediac.com/feeds" limit={3} />
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/articles">View More</Link>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Competitions & Giveaways</h3>
        <p>Be the first to know! Check the Kids Zone for the latest challenges and prizes.</p>
      </section>
    </div>
  )
}
