import Tabs from '../components/Tabs'
import SimpleRadioPlayer from '../components/SimpleRadioPlayer'

export default function Radio() {
  const listenLive = (
    <div className="card">
      <h2>Listen Live</h2>
      <p>Stream the station, 24/7.</p>
      <SimpleRadioPlayer src="https://a4.asurahosting.com:7820/radio.mp3" title="Live Stream" />
    </div>
  )

  const nowPlaying = (
    <div className="card">
      <h3 className="card-title">Now Playing / Up Next</h3>
      <p>Powered by Firebase Functions (placeholder). Shows current show and upcoming segments.</p>
    </div>
  )

  const schedule = (
    <div className="card">
      <h3 className="card-title">Weekly Schedule</h3>
      <p>Editable via Admin Dashboard (placeholder). Download as PDF (coming soon).</p>
    </div>
  )

  const requests = (
    <div className="card">
      <h3 className="card-title">Song/Message Requests</h3>
      <p>Submit a dua, announcement, or request (placeholder form).</p>
    </div>
  )

  return (
    <div className="content">
      <Tabs
        items={[
          { key: 'live', label: 'Listen Live', content: listenLive },
          { key: 'now', label: 'Now Playing', content: nowPlaying },
          { key: 'schedule', label: 'Weekly Schedule', content: schedule },
          { key: 'requests', label: 'Requests', content: requests },
        ]}
      />
    </div>
  )
}
