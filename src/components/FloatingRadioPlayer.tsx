import { useState } from 'react'
import SimpleRadioPlayer from './SimpleRadioPlayer'

type Props = {
  src?: string
}

export default function FloatingRadioPlayer({ src = 'https://a4.asurahosting.com:7820/radio.mp3' }: Props) {
  // Start minimised by default when the site loads
  const [open, setOpen] = useState(false)
  return (
    <div className="floating-player" aria-live="polite">
      <div className="fp-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <strong>Live Radio</strong>
          <span style={{ fontSize: 12, color: '#374151' }}>Live</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setOpen(o => !o)}>{open ? 'Minimise' : 'Expand'}</button>
        </div>
      </div>
      {open && (
        <div className="fp-body">
          <SimpleRadioPlayer src={src} title="Live Stream" />
        </div>
      )}
    </div>
  )
}
