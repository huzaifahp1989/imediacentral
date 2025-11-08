import { useEffect, useState } from 'react'

type Props = { title: string; message: string }

export default function AnnouncementModal({ title, message }: Props) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const dismissed = localStorage.getItem('imc_announcement_dismissed')
    if (!dismissed) setOpen(true)
  }, [])
  const close = () => { setOpen(false); localStorage.setItem('imc_announcement_dismissed', '1') }
  if (!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <p>{message}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn" onClick={close}>Close</button>
          <a className="btn btn-primary" href="#events">View Details</a>
        </div>
      </div>
    </div>
  )
}
