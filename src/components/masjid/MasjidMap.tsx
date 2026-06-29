type Props = {
  lat: number
  lng: number
  name?: string
  height?: number
}

export default function MasjidMap({ lat, lng, name = 'Masjid', height = 320 }: Props) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
  return (
    <iframe
      title={`Map of ${name}`}
      className="map-embed"
      style={{ height }}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}

export function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}
