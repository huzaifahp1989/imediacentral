import Tabs from '../components/Tabs'
import FeedList from '../components/FeedList'

export default function Articles() {
  const latest = (
    <div>
      <FeedList feedUrl="https://imediac.com/feeds" limit={8} />
    </div>
  )
  const placeholder = (label: string) => (
    <div className="feature-grid" style={{ marginTop: 12 }}>
      {[1,2,3,4,5,6].map(n => (
        <div key={n} className="feature-card">
          <h4>{label} Post #{n}</h4>
          <p>Coming soon.</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="content">
      <div className="card">
        <h2>Articles</h2>
        <p>Latest posts fetched from imediac.com/feeds. Categories & filters coming soon.</p>
      </div>

      <Tabs
        items={[
          { key: 'latest', label: 'Latest', content: latest },
          { key: 'reminders', label: 'Reminders', content: placeholder('Reminders') },
          { key: 'community', label: 'Community', content: placeholder('Community') },
          { key: 'kids', label: 'Kids', content: placeholder('Kids') },
        ]}
      />
    </div>
  )
}
