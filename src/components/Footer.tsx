export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid container">
        <div>
          <h4>About</h4>
          <p>Islam Media Central — a modern Islamic media hub for Quran, Hadith, Radio, Blog, and community learning.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <form style={{ display: 'grid', gap: 8 }} onSubmit={(e) => { e.preventDefault(); alert('Message sent (placeholder)') }}>
            <input placeholder="Name" style={input} />
            <input placeholder="Email" style={input} />
            <textarea placeholder="Message" style={{ ...input, minHeight: 100 }} />
            <button className="btn btn-primary">Send</button>
          </form>
        </div>
        <div>
          <h4>Links</h4>
          <ul>
            <li><a href="https://quran.com" target="_blank" rel="noreferrer">Quran.com</a></li>
            <li><a href="#donate">Donate</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="container ticker">“The best among you are those who have the best manners and character.” — Tirmidhi</div>
    </footer>
  )
}

const input: React.CSSProperties = { padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }
