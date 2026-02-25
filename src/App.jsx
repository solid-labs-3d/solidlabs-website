import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Cart from './components/Cart'
import Imagenie from './components/Imagenie'

import Home from './pages/Home'
import Originals from './pages/Originals'
import Precision from './pages/Precision'
import Extreme from './pages/Extreme'
import Learn from './pages/Learn'
import Evidence from './pages/Evidence'
import Stream from './pages/Stream'
import About from './pages/About'
import InjectionMoulding from './pages/InjectionMoulding'
import VacuumForming from './pages/VacuumForming'
import SLAPrinting from './pages/SLAPrinting'
import CarbonFibre from './pages/CarbonFibre'
import HowitWork from './pages/HowitWork'

// Page accent colours — used by cursor and nav
export const PAGE_COLORS = {
  home:              { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)',  hover: 'rgba(240,92,30,.4)'  },
  originals:         { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)',  hover: 'rgba(240,92,30,.4)'  },
  learn:             { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)',  hover: 'rgba(240,92,30,.4)'  },
  evidence:          { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)',  hover: 'rgba(240,92,30,.4)'  },
  stream:            { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)',  hover: 'rgba(240,92,30,.4)'  },
  about:             { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)',  hover: 'rgba(240,92,30,.4)'  },
  precision:         { solid: '#f0c020', ring: 'rgba(240,192,32,.35)', hover: 'rgba(240,192,32,.4)' },
  extreme:           { solid: '#1e7aff', ring: 'rgba(30,122,255,.35)', hover: 'rgba(30,122,255,.4)' },
  'injection-moulding': { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)', hover: 'rgba(240,92,30,.4)' },
  'vacuum-forming':     { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)', hover: 'rgba(240,92,30,.4)' },
  'sla-printing':       { solid: '#1e7aff', ring: 'rgba(30,122,255,.35)', hover: 'rgba(30,122,255,.4)' },
  'carbon-fibre':       { solid: '#f0c020', ring: 'rgba(240,192,32,.35)', hover: 'rgba(240,192,32,.4)' },
}

export default function App() {
  const location = useLocation()
  const page = location.pathname.replace('/', '') || 'home'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Cursor page={page} />
      <Nav page={page} />
      <Cart />
      <main>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/originals"           element={<Originals />} />
          <Route path="/precision"           element={<Precision />} />
          <Route path="/extreme"             element={<Extreme />} />
          <Route path="/learn"               element={<Learn />} />
          <Route path="/evidence"            element={<Evidence />} />
          <Route path="/stream"              element={<Stream />} />
          <Route path="/about"               element={<About />} />
          <Route path="/injection-moulding"  element={<InjectionMoulding />} />
          <Route path="/vacuum-forming"      element={<VacuumForming />} />
          <Route path="/sla-printing"        element={<SLAPrinting />} />
          <Route path="/carbon-fibre"        element={<CarbonFibre />} />
          <Route path="/how-it-works"       element={<HowitWork />} />
        </Routes>
      </main>
      {/* Imagenie chatbot — floats on all pages */}
      <Imagenie />
    </>
  )
}
