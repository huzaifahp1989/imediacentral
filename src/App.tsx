import { NavLink, Route, Routes } from 'react-router-dom'

import { useState } from 'react'

import Sidebar from './components/Sidebar'

import Home from './pages/Home'

import Radio from './pages/Radio'

import Articles from './pages/Articles'

import Salah from './pages/Salah'

import PrayerTimes from './pages/PrayerTimes'

import Zakat from './pages/Zakat'

import Links from './pages/Links'

import About from './pages/About'

import Contact from './pages/Contact'

import Kids from './pages/Kids'

import Events from './pages/Events'

import HadithPage from './pages/Hadith'

import MasjidDirectory from './pages/MasjidDirectory'

import CityMasjids from './pages/CityMasjids'

import MasjidProfile from './pages/MasjidProfile'

import LiveStreams from './pages/LiveStreams'

import Khutbah from './pages/Khutbah'

import SearchPage from './pages/SearchPage'

import AnnouncementModal from './components/AnnouncementModal'

import Footer from './components/Footer'

import FloatingRadioPlayer from './components/FloatingRadioPlayer'



const NAV_LINKS = [

  { to: '/', end: true, label: 'Home' },

  { to: '/prayer-times', label: 'Prayer Times' },

  { to: '/masjids', label: 'Masjids' },

  { to: '/live-streams', label: 'Live' },

  { to: '/events', label: 'Events' },

  { to: '/radio', label: 'Radio' },

  { to: '/search', label: 'Search' },

  { to: '/kids', label: 'Kids' },

  { to: '/about', label: 'About' },

] as const



export default function App() {

  const [navOpen, setNavOpen] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeNav = () => setNavOpen(false)



  return (

    <div className="app">

      <AnnouncementModal title="Jummah Reminder" message="Join us for Jummah today." />

      <header className="app-header">

        <div className="brand">

          <img src="/logo.svg" alt="Islam Media Central" onError={(e) => { (e.target as HTMLImageElement).src = '/quran.svg' }} />

          <div className="title">Islam Media Central</div>

        </div>

        <nav className={`primary-nav tabs ${navOpen ? 'open' : ''}`} id="primary-nav" aria-label="Main navigation">

          {NAV_LINKS.map(({ to, label, ...rest }) => (

            <NavLink

              key={to}

              to={to}

              {...rest}

              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}

              onClick={closeNav}

            >

              {label}

            </NavLink>

          ))}

          <a id="donate" className="btn btn-gold glow" href="#" onClick={closeNav}>Donate</a>

        </nav>

        <div className="header-actions">

          <button

            type="button"

            className="mobile-toggle"

            onClick={() => setNavOpen(x => !x)}

            aria-expanded={navOpen}

            aria-controls="primary-nav"

          >

            {navOpen ? 'Close' : 'Menu'}

          </button>

          <button

            type="button"

            className="mobile-toggle desktop-only"

            onClick={() => setSidebarOpen(x => !x)}

            aria-expanded={sidebarOpen}

            aria-controls="sidebar"

          >

            Sidebar

          </button>

        </div>

      </header>



      <Sidebar open={sidebarOpen} />

      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/salah" element={<Salah />} />
          <Route path="/masjids" element={<MasjidDirectory />} />
          <Route path="/masjids/:cityId" element={<CityMasjids />} />
          <Route path="/masjid/:slug" element={<MasjidProfile />} />
          <Route path="/live-streams" element={<LiveStreams />} />
          <Route path="/khutbah" element={<Khutbah />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/hadith" element={<HadithPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/zakat" element={<Zakat />} />
          <Route path="/links" element={<Links />} />
          <Route path="/events" element={<Events />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>



      <FloatingRadioPlayer />

    </div>

  )

}

