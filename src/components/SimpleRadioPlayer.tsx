import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  title?: string
}

export default function SimpleRadioPlayer({ src, title = 'Radio Stream' }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errored, setErrored] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.9)
  const [muted, setMuted] = useState(false)
  const lastVolumeRef = useRef<number>(volume)

  // Load persisted controls
  useEffect(() => {
    try {
      const v = localStorage.getItem('imc_volume')
      const m = localStorage.getItem('imc_muted')
      if (v) setVolume(parseFloat(v))
      if (m) setMuted(m === '1')
    } catch {}
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = muted ? 0 : volume
    // persist
    try {
      localStorage.setItem('imc_volume', String(volume))
      localStorage.setItem('imc_muted', muted ? '1' : '0')
    } catch {}
  }, [volume, muted])

  const play = async () => {
    const audio = audioRef.current
    if (!audio) return
    setErrored(null)
    setLoading(true)
    try {
      await audio.play()
      setPlaying(true)
    } catch (e: any) {
      setErrored(e?.message || 'Playback blocked by browser. Please press Play again.')
      setPlaying(false)
    } finally {
      setLoading(false)
    }
  }

  const pause = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setPlaying(false)
    try { localStorage.setItem('imc_last_playing', '0') } catch {}
  }

  const toggleMute = () => {
    if (muted) {
      setMuted(false)
      setVolume(lastVolumeRef.current || 0.9)
    } else {
      lastVolumeRef.current = volume
      setMuted(true)
    }
  }

  const onError = () => {
    setErrored('Unable to load stream. Please try again or open the direct link.')
    setPlaying(false)
    setLoading(false)
  }

  return (
    <div className="radio-player" style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className={`btn ${isPlaying ? 'btn-gold' : ''}`} onClick={isPlaying ? pause : play} disabled={isLoading}>
          {isPlaying ? 'Pause' : isLoading ? 'Loading…' : 'Play'}
        </button>
        <button className="btn" onClick={toggleMute}>{muted ? 'Unmute' : 'Mute'}</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12 }}>Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </label>
        <a href={src} target="_blank" rel="noreferrer" className="btn" style={{ marginLeft: 'auto' }}>Open Stream</a>
      </div>

      <div className="card" style={{ margin: 0 }}>
        <h3 className="card-title" style={{ marginBottom: 6 }}>{title}</h3>
        <p style={{ margin: 0, opacity: 0.9 }}>
          {isPlaying ? 'Streaming live…' : 'Press Play to begin.'}
          {isPlaying && (
            <span className="eq" aria-hidden>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </span>
          )}
        </p>
      </div>

      {errored && (
        <div className="card" style={{ margin: 0, borderColor: '#ef4444' }}>
          <p style={{ color: '#ef4444' }}>{errored}</p>
        </div>
      )}

      <audio ref={audioRef} src={src} preload="none" onError={onError} />
    </div>
  )
}
