import { NavLink, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Radio from './pages/Radio'
import Articles from './pages/Articles'
import Salah from './pages/Salah'
import Zakat from './pages/Zakat'
import Links from './pages/Links'
import About from './pages/About'
import Contact from './pages/Contact'
import Kids from './pages/Kids'
import Events from './pages/Events'
import HadithPage from './pages/Hadith'
import AnnouncementModal from './components/AnnouncementModal'
import Footer from './components/Footer'
import FloatingRadioPlayer from './components/FloatingRadioPlayer'

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="app">
      <AnnouncementModal title="Jummah Reminder" message="Join us for Jummah today." />
      <header className="app-header">
        <div className="brand">
          <img src="/quran.svg" alt="Quran" />
          <div className="title">Islam Media Central</div>
        </div>
        <nav className={`primary-nav tabs ${navOpen ? 'open' : ''}`}>
          <NavLink to="/" end className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/radio" className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>Radio</NavLink>
          <NavLink to="/salah" className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>Salah Times</NavLink>
          <NavLink to="/links" className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>Links</NavLink>
          <NavLink to="/events" className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>Events</NavLink>
          <NavLink to="/kids" className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>Kids</NavLink>
          <NavLink to="/about" className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => `tab ${isActive ? 'active' : ''}`}>Contact</NavLink>
          <a id="donate" className="btn btn-gold glow" href="#" style={{ marginLeft: 8 }}>Donate</a>
        </nav>
        <div>
          <button className="mobile-toggle" onClick={() => setNavOpen(x => !x)} aria-expanded={navOpen} aria-controls="primary-nav">Menu</button>
          <button className="mobile-toggle" onClick={() => setSidebarOpen(x => !x)} aria-expanded={sidebarOpen} aria-controls="sidebar">Sidebar</button>
        </div>
      </header>

      <Sidebar open={sidebarOpen} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/hadith" element={<HadithPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/salah" element={<Salah />} />
        <Route path="/zakat" element={<Zakat />} />
        <Route path="/links" element={<Links />} />
        <Route path="/events" element={<Events />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

      <FloatingRadioPlayer />
    </div>
  )
}
