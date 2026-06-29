import type { LiveStream } from './types'

export const EMASJID_LISTEN_URL = 'https://emasjidlive.co.uk/listen/'

export type EmasjidChannel = {
  slug: string
  name: string
  region: string
  live: boolean
}

/** Official eMasjid Live mini player embed (per eMasjid terms) */
export function emasjidStream(slug: string, title?: string): LiveStream {
  return {
    platform: 'emasjid',
    url: `https://emasjidlive.co.uk/miniplayer/${slug}`,
    pageUrl: `https://emasjidlive.co.uk/listen/${slug}`,
    isLive: false,
    alwaysOn: true,
    title: title ?? 'eMasjid Live',
  }
}

/** Leicester masjids on eMasjid Live */
export const EMASJID_LEICESTER: EmasjidChannel[] = [
  { slug: 'peacecentre', name: 'As-Salaam Trust — The Peace Centre', region: 'Leicester', live: true },
  { slug: 'darularqameducationaltrust', name: 'Darul Arqam Educational Trust', region: 'Leicester', live: true },
  { slug: 'jamemasjid', name: 'Jame Masjid', region: 'Leicester', live: true },
  { slug: 'madanimasjid', name: 'Madani Masjid', region: 'Leicester', live: true },
  { slug: 'knightonmasjid', name: 'Madrasah Ta\'leemul Qur\'an (Knighton)', region: 'Leicester', live: true },
  { slug: 'abuhurairah', name: 'Masjid Abu Hurairah', region: 'Leicester', live: true },
  { slug: 'masjidadamoadby', name: 'Masjid Adam (A.S), Oadby', region: 'Leicester', live: true },
  { slug: 'masjidalfurqan', name: 'Masjid Al Furqan', region: 'Leicester', live: true },
  { slug: 'abdullahibnmasud', name: 'Masjid e Abdullah Ibn Mas\'ud (RA)', region: 'Leicester', live: true },
  { slug: 'muadhibnjabal', name: 'Masjid Muadh Ibn Jabal', region: 'Leicester', live: true },
  { slug: 'masjidmuhammad', name: 'Masjid Muhammad', region: 'Leicester', live: true },
  { slug: 'bukhari', name: 'Masjid-ul-Imam-il-Bukhari', region: 'Leicester', live: true },
  { slug: 'masjidaisha', name: 'Masjid Aisha', region: 'Leicester', live: false },
  { slug: 'alehsaanacademy', name: 'Al Ehsaan Academy', region: 'Leicester', live: false },
  { slug: 'darulihsaan', name: 'Darul Ihsaan', region: 'Leicester', live: false },
  { slug: 'alqalaminstitute', name: 'Al-Qalam Institute', region: 'Leicester', live: false },
  { slug: 'assafwah', name: 'As-Safwah Institute', region: 'Leicester', live: false },
  { slug: 'darulfathhamiltontrust_bi', name: 'Darul Fath — Baytul Ihsaan', region: 'Leicester', live: false },
  { slug: 'darulfathhamiltontrust_hh', name: 'Darul Fath — The Hamilton Hub', region: 'Leicester', live: false },
]

/** Dewsbury masjids on eMasjid Live */
export const EMASJID_DEWSBURY: EmasjidChannel[] = [
  { slug: 'darulilmdewsbury', name: 'Darul Ilm, Thornhill Lees', region: 'Dewsbury', live: true },
  { slug: 'alhira', name: 'Madrasah Al Hira', region: 'Dewsbury', live: true },
  { slug: 'talha', name: 'Masjid Talha', region: 'Dewsbury', live: true },
  { slug: 'masjidurrahman', name: 'Masjid Ur Rahman', region: 'Dewsbury', live: true },
  { slug: 'meudewsbury', name: 'Masjid-e-Umar', region: 'Dewsbury', live: true },
  { slug: 'zakariamasjid', name: 'Zakaria Masjid', region: 'Dewsbury', live: true },
  { slug: 'ilaahi', name: 'Ilaahi Masjid', region: 'Dewsbury', live: false },
  { slug: 'ita', name: 'Islamic Tarbiyah Academy', region: 'Dewsbury', live: false },
  { slug: 'madina_academy', name: 'Madina Academy', region: 'Dewsbury', live: false },
  { slug: 'madnimasjiddewsburytown', name: 'Madni Jamia Masjid', region: 'Dewsbury', live: false },
  { slug: 'masjidassalaam', name: 'Masjid As-Salaam', region: 'Dewsbury', live: false },
  { slug: 'masjidbaituttauheed', name: 'Masjid Bait-Ut-Tauheed', region: 'Dewsbury', live: false },
  { slug: 'masjidheera', name: 'Masjid Heera', region: 'Dewsbury', live: false },
  { slug: 'masjidnoordewsbury', name: 'Masjid Noor', region: 'Dewsbury', live: false },
  { slug: 'masjidbilaldewsbury', name: 'Masjid E Bilal', region: 'Dewsbury', live: false },
  { slug: 'usic', name: 'Upper Soothill Islamic Centre', region: 'Dewsbury', live: false },
]

/** Birmingham masjids on eMasjid Live */
export const EMASJID_BIRMINGHAM: EmasjidChannel[] = [
  { slug: 'birminghamjamemasjid', name: 'Birmingham Jame Masjid', region: 'Birmingham', live: true },
  { slug: 'alhabib', name: 'Al-Habib Trust', region: 'Birmingham', live: true },
  { slug: 'kingsheathmasjid', name: 'Kings Heath Masjid', region: 'Birmingham', live: true },
  { slug: 'masjidnaqeebulislam', name: 'Masjid Naqeebul Islam', region: 'Birmingham', live: true },
  { slug: 'masjidulmadni', name: 'Masjid Ul Madni', region: 'Birmingham', live: true },
  { slug: 'masjidyousufsheldon', name: 'Masjid Yousuf, Sheldon', region: 'Birmingham', live: true },
  { slug: 'jamimosque', name: 'Jami Mosque & Islamic Centre', region: 'Birmingham', live: false },
  { slug: 'goa', name: 'Green Oak Academy', region: 'Birmingham', live: false },
  { slug: 'gbmf', name: 'Great Barr Muslim Foundation', region: 'Birmingham', live: false },
  { slug: 'masjidalfalaah', name: 'Masjid Al Falaah', region: 'Birmingham', live: false },
  { slug: 'masjidtaqwa', name: 'Masjid Taqwa, Sparkbrook', region: 'Birmingham', live: false },
]

/** Coventry masjids on eMasjid Live */
export const EMASJID_COVENTRY: EmasjidChannel[] = [
  { slug: 'zeenatul_islam_coventry', name: 'Masjid Zeenatul Islam', region: 'Coventry', live: true },
  { slug: 'masjidezakariya', name: 'Masjid-e-Zakariya', region: 'Coventry', live: true },
  { slug: 'tqtrust', name: 'Ta\'leem-ul-Quran Trust', region: 'Coventry', live: true },
  { slug: 'uewt', name: 'Umar Educational & Welfare Trust', region: 'Coventry', live: true },
  { slug: 'islamicacademycoventry', name: 'Islamic Academy of Coventry', region: 'Coventry', live: false },
]

export const EMASJID_CHANNELS = [
  ...EMASJID_LEICESTER,
  ...EMASJID_DEWSBURY,
  ...EMASJID_BIRMINGHAM,
  ...EMASJID_COVENTRY,
]

export function getEmasjidChannels(region?: string): EmasjidChannel[] {
  if (!region) return EMASJID_CHANNELS
  const q = region.toLowerCase()
  return EMASJID_CHANNELS.filter(c => c.region.toLowerCase() === q)
}
