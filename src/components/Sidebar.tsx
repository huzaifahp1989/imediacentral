import { Link } from 'react-router-dom'
import FeedList from './FeedList'

type Props = { open?: boolean }

export default function Sidebar({ open = false }: Props) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="widget">
        <h3>Latest Articles</h3>
        <FeedList feedUrl="https://imediac.com/feeds" limit={3} />
        <div style={{ marginTop: 8 }}>
          <Link to="/articles">View all articles</Link>
        </div>
      </div>

      <div className="widget">
        <h3>Live Radio</h3>
        <audio controls preload="none" style={{ width: '100%' }}>
          <source src="https://icecast.maxxwave.co.uk/radioseerah" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <Link to="/radio">Open full player</Link>
      </div>

      <div className="widget">
        <h3>Useful Links</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li><a href="https://quran.com" target="_blank" rel="noreferrer">Quran.com</a></li>
          <li><Link to="/links">More links</Link></li>
        </ul>
      </div>

      <div className="widget">
        <h3>Salah Times (Today)</h3>
        <p>Leicester, UK — Europe/London (placeholder).</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>Fajr: 06:00 / Iqamah: 06:30</li>
          <li>Dhuhr: 12:30 / Iqamah: 13:30</li>
          <li>Asr: 15:45 / Iqamah: 16:15</li>
          <li>Maghrib: Sunset</li>
          <li>Isha: 19:30 / Iqamah: 20:00</li>
        </ul>
        <Link to="/salah">View timetable</Link>
      </div>

      <div className="widget">
        <h3>Quick Zakat Calculator</h3>
        <p>Enter amount to estimate 2.5%:</p>
        <QuickZakatWidget />
        <Link to="/zakat">Full calculator</Link>
      </div>
    </aside>
  )
}

function QuickZakatWidget() {
  const [amount, setAmount] = useState<string>('')
  const value = parseFloat(amount || '0')
  const zakat = isNaN(value) ? 0 : +(value * 0.025).toFixed(2)
  return (
    <div>
      <input
        type="number"
        placeholder="Enter GBP amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 8 }}
      />
      <div className="card">
        <strong>Zakat (2.5%): </strong>£{zakat}
      </div>
    </div>
  )
}

import { useState } from 'react'
