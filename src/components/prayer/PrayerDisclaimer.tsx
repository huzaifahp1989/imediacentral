import { PRAYER_DISCLAIMER } from '../../lib/prayerTimes'

export default function PrayerDisclaimer() {
  return (
    <div className="disclaimer" role="note">
      <strong>Important:</strong> {PRAYER_DISCLAIMER}
    </div>
  )
}
