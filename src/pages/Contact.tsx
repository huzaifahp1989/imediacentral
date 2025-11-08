import { useState } from 'react'
import Tabs from '../components/Tabs'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' })
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return alert('Spam detected')
    alert('Message sent (placeholder). Will integrate Firebase/EmailJS.')
  }

  const formTab = (
    <div className="card">
      <h3 className="card-title">Contact Form</h3>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <input type="text" placeholder="Name" value={form.name} onChange={update('name')} style={inputStyle} />
        <input type="email" placeholder="Email" value={form.email} onChange={update('email')} style={inputStyle} />
        <textarea placeholder="Message" value={form.message} onChange={update('message')} style={{...inputStyle, minHeight: 120}} />
        {/* honeypot */}
        <input type="text" value={form.honeypot} onChange={update('honeypot')} style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />
        <button type="submit" style={{ padding: 10, borderRadius: 8, border: '1px solid #e5e7eb', background: '#0ea5b7', color: '#fff' }}>Send</button>
      </form>
    </div>
  )

  const locationTab = (
    <div className="card">
      <h3 className="card-title">Location</h3>
      <p>Studio/office address and map embed (placeholder).</p>
    </div>
  )

  const socialTab = (
    <div className="card">
      <h3 className="card-title">Social</h3>
      <p>Links to Facebook, YouTube, and WhatsApp broadcast list (placeholder).</p>
    </div>
  )

  return (
    <div className="content">
      <div className="card">
        <h2>Contact Us</h2>
        <p>Reach out via the form, find our location, or connect on social platforms.</p>
      </div>

      <Tabs
        items={[
          { key: 'form', label: 'Form', content: formTab },
          { key: 'location', label: 'Location', content: locationTab },
          { key: 'social', label: 'Social', content: socialTab },
        ]}
      />
    </div>
  )
}

const inputStyle: React.CSSProperties = { width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }
