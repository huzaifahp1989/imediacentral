import Tabs from '../components/Tabs'

export default function About() {
  const mission = (
    <div className="card">
      <h3 className="card-title">Our Mission</h3>
      <p>To educate, inspire, and serve the community through authentic Islamic content and services.</p>
    </div>
  )
  const team = (
    <div className="card">
      <h3 className="card-title">Team</h3>
      <p>Volunteers, presenters, and admins — profiles managed via Admin Dashboard (placeholder).</p>
    </div>
  )
  const partners = (
    <div className="card">
      <h3 className="card-title">Partners & Sponsors</h3>
      <p>Local masajid, community groups, and sponsors featured here (placeholder).</p>
    </div>
  )

  return (
    <div className="content">
      <div className="card">
        <h2>About Islam Media Central</h2>
        <p>Short description of mission and services. Contact details and branding settings will be managed via Admin Dashboard (placeholder).</p>
      </div>

      <Tabs
        items={[
          { key: 'mission', label: 'Mission', content: mission },
          { key: 'team', label: 'Team', content: team },
          { key: 'partners', label: 'Partners', content: partners },
        ]}
      />
    </div>
  )
}
