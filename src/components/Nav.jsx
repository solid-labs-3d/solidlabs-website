import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartToggle } from './Cart'

const SL_LOGO = (
  <svg width="32" height="30" viewBox="0 0 56 52" fill="none">
    <polygon points="8,1 46,1 52,14 14,14"  fill="#f05c1e"/>
    <polygon points="5,20 43,20 49,33 11,33" fill="#c44820"/>
    <polygon points="2,39 40,39 46,52 8,52"  fill="#7a2e0f"/>
  </svg>
)

const SERVICES = [
  { label: 'FDM 3D Printing',      path: '/learn' },
  { label: 'SLA Printing',         path: '/sla-printing' },
  { label: 'Injection Moulding',   path: '/injection-moulding' },
  { label: 'Vacuum Forming',       path: '/vacuum-forming' },
  { label: 'Carbon Fibre',         path: '/carbon-fibre' },
  { label: 'Extreme Engineering',  path: '/extreme' },
]

export default function Nav({ page }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const goTo = path => {
    setMobileOpen(false)
    navigate(path)
    window.scrollTo(0, 0)
  }

  const goQuote = () => {
    goTo('/')
    setTimeout(() => {
      document.getElementById('contact-sec')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  const [open, setOpen] = useState(false);

  const toggleCart = useCartToggle()
  return (
    <>
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        {/* Logo */}
        <Link className="nav-logo" to="/">{SL_LOGO}
          <div>
            <div className="nav-logo-text">SOLIDLABS</div>
            <div className="nav-logo-sub">3D Printing &amp; Innovation</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><Link to="/originals"  className={page==='originals'  ?'active':''}>SL Originals</Link></li>
          <li><Link to="/precision"  className={page==='precision'  ?'active':''}>Precision B2B</Link></li>

          {/* Services dropdown */}
          {/* Extreme Eng link (dropdown removed) */}
<li>
  <Link to="/extreme" className={page === 'extreme' ? 'active' : ''}>
    EXTREAM ENG </Link>
</li>


<li className="nav-dropdown">
  <Link
    
    className={page === "carbonation" || page === "CarbonationBs" ? "active" : ""}
  >
    CARBONATION
  </Link>

  <div className="nav-dropdown-menu">
    <Link to="/carbonation">CN Division</Link>
    <Link to="/CarbonationBs">BS Series</Link>
  </div>
</li>




<li>
  <Link to="/greenloop" className={page === 'greenloop' ? 'active' : ''}>
    GREENLOOP
  </Link>
</li>
<li><Link to="/how-it-works" className={page==='how-it-works'?'active':''}>How It Works</Link></li>

          <li><Link to="/evidence"   className={page==='evidence'   ?'active':''}>Field Evidence</Link></li>
          <li><Link to="/about"      className={page==='about'      ?'active':''}>About Us</Link></li>
          <li>
            <Link to="/stream" className={page==='stream'?'active':''}>
              <span style={{display:'inline-block',width:6,height:6,background:'#ff2222',borderRadius:'50%',animation:'ldot 1.4s ease infinite',marginRight:6,verticalAlign:'middle'}}/>
              Live
            </Link>
          </li>
        </ul>

        {/* Desktop actions */}
        <div className="nav-actions">
           <button
      className="nav-cart-btn"
      onClick={toggleCart}
    >
      Cart <span id="cart-count">0</span>
    </button>
          <button className="nav-cta" onClick={goQuote}>Get Quote</button>

          {/* Hamburger */}
          <button
            id="nav-hamburger"
            aria-label="Open menu"
            className={mobileOpen ? 'open' : ''}
            onClick={() => setMobileOpen(v => !v)}
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div id="mobile-nav" className={mobileOpen ? 'open' : ''} role="dialog" aria-label="Navigation">
        <ul>
          <li><a onClick={() => goTo('/')}>Home</a></li>
          <li><a onClick={() => goTo('/originals')}><span style={{color:'var(--or)',marginRight:8}}>●</span>SL Originals</a></li>
          <li><a onClick={() => goTo('/precision')}><span style={{color:'var(--yw)',marginRight:8}}>●</span>Precision B2B</a></li>
          <li><a onClick={() => goTo('/extreme')}><span style={{color:'var(--bl)',marginRight:8}}>●</span>Extreme Eng</a></li>
          <li><a onClick={() => goTo('/carbonation')}><span style={{color:'var(--yw)',marginRight:8}}>●</span>Carbonation</a></li>
          <li><a onClick={() => goTo('/greenloop')}><span style={{color:'var(--gr)',marginRight:8}}>●</span>Greenloop</a></li>
          <li><a onClick={() => goTo('/learn')}>FDM Printing</a></li>
          <li><a onClick={() => goTo('/sla-printing')}>SLA Printing</a></li>
          <li><a onClick={() => goTo('/injection-moulding')}>Injection Moulding</a></li>
          <li><a onClick={() => goTo('/vacuum-forming')}>Vacuum Forming</a></li>
          <li><a onClick={() => goTo('/carbon-fibre')}>Carbon Fibre</a></li>
          <li><a onClick={() => goTo('/evidence')}>Field Evidence</a></li>
          <li><a onClick={() => goTo('/about')}>About Us</a></li>
          <li>
            <a onClick={() => goTo('/stream')}>
              <span style={{display:'inline-block',width:7,height:7,background:'#ff2222',borderRadius:'50%',animation:'ldot 1.4s ease infinite',marginRight:8,verticalAlign:'middle'}}/>
              Live Stream
            </a>
          </li>
        </ul>
        <div className="mob-nav-foot">
          <button className="btn-or" style={{width:'100%',textAlign:'center'}} onClick={goQuote}>Get a Quote →</button>
          <div className="mob-nav-sub">Bengaluru · India · Anyday, Anytime</div>
        </div>
      </div>
    </>
  )
}
