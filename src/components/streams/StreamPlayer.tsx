import type { LiveStream } from '../../lib/types'

type Props = {
  stream: LiveStream
  masjidName?: string
}

export default function StreamPlayer({ stream, masjidName }: Props) {
  const title = stream.title ?? `${masjidName ?? 'Masjid'} Live`

  if (stream.platform === 'audio' || stream.platform === 'radio') {
    if (stream.url.includes('mixlr.com')) {
      return (
        <div>
          <iframe
            className="stream-player"
            style={{ height: 120, minHeight: 120 }}
            src={stream.url}
            title={title}
            allow="autoplay"
          />
          {stream.pageUrl && (
            <a className="btn btn-emerald" href={stream.pageUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12 }}>
              Open on Masjid Website
            </a>
          )}
        </div>
      )
    }
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <span className="badge badge-emerald" style={{ marginBottom: 12 }}>
          {stream.alwaysOn ? '● Official Radio' : '● Official Audio'}
        </span>
        <h3 className="card-title">{title}</h3>
        <audio controls style={{ width: '100%', marginTop: 12 }} src={stream.url} preload="none">
          Your browser does not support audio playback.
        </audio>
        {stream.pageUrl && (
          <a className="btn btn-emerald" href={stream.pageUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12 }}>
            Open on Masjid Website
          </a>
        )}
      </div>
    )
  }

  if (stream.platform === 'emasjid') {
    return (
      <div>
        <iframe
          className="stream-player"
          style={{ height: 200, minHeight: 200, background: '#fff' }}
          src={stream.url}
          title={title}
          allow="autoplay"
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {stream.pageUrl && (
            <a className="btn btn-emerald" href={stream.pageUrl} target="_blank" rel="noopener noreferrer">
              Listen on eMasjid Live
            </a>
          )}
          <a className="btn btn-sky" href="https://emasjidlive.co.uk/listen/" target="_blank" rel="noopener noreferrer">
            Browse All Masjids
          </a>
        </div>
      </div>
    )
  }

  if (stream.platform === 'youtube') {
    return (
      <div>
        <iframe
          className="stream-player"
          src={stream.url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {stream.pageUrl && (
          <a className="btn" href={stream.pageUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12 }}>
            View on YouTube
          </a>
        )}
      </div>
    )
  }

  if (stream.platform === 'facebook') {
    return (
      <iframe
        className="stream-player"
        src={stream.url}
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  if (stream.platform === 'website') {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Official live stream hosted on the masjid website.</p>
        <a className="btn btn-emerald" href={stream.url} target="_blank" rel="noopener noreferrer">
          Open Live Stream
        </a>
      </div>
    )
  }

  return (
    <div className="stream-offline">
      No live stream currently available.
    </div>
  )
}

export function hasActiveStream(stream?: LiveStream): boolean {
  if (!stream) return false
  return stream.isLive || stream.alwaysOn === true
}
