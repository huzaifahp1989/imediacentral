import { useEffect, useState } from 'react'
import { MASJID_FALLBACK, resolveImageUrl } from '../../lib/images'

type Props = {
  src?: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

export default function MasjidImage({ src, alt, className, style }: Props) {
  const [url, setUrl] = useState(() => resolveImageUrl(src))

  useEffect(() => {
    setUrl(resolveImageUrl(src))
  }, [src])

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (url !== MASJID_FALLBACK) setUrl(MASJID_FALLBACK)
      }}
    />
  )
}
