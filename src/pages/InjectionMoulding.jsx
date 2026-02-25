import { useReveal } from '../hooks/useReveal'
import { useNavigate } from 'react-router-dom'
import { Ticker, Footer, SectionHeader } from '../components/Shared'

const TICKER = ['Injection Moulding','High Volume','100+ Units','ABS · PP · Nylon','Precision Tooling','Pan India']

const STEPS = [
  { n:'01', t:'Design for Moulding', d:'We review your CAD for draft angles, wall thickness, and gate placement. Free DFM review included.', icon:
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="2" stroke="#f05c1e" strokeWidth="1.5" fill="none"/>
      <path d="M14 24 L22 32 L34 16" stroke="#f05c1e" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  },
  { n:'02', t:'Tooling & Mould', d:'CNC-machined steel or aluminium mould. Typical tooling lead time: 7–14 days for single-cavity.', icon:
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="14" width="32" height="20" rx="1" stroke="#f05c1e" strokeWidth="1.5" fill="none"/>
      <rect x="16" y="20" width="16" height="8" stroke="#c44820" strokeWidth="1" fill="none"/>
      <line x1="24" y1="6" x2="24" y2="14" stroke="#f05c1e" strokeWidth="2"/>
    </svg>
  },
  { n:'03', t:'Trial Shot', d:'First article inspection — dimensions, surface quality, warpage. We iterate until it\'s right.', icon:
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" stroke="#f05c1e" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="24" r="4" fill="#f05c1e"/>
    </svg>
  },
  { n:'04', t:'Production Run', d:'High-speed injection moulding — cycle times from 15–60 seconds. 100 to 100,000 units.', icon:
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="20" width="40" height="8" rx="1" fill="#f05c1e" opacity=".3"/>
      <rect x="4" y="20" width="28" height="8" rx="1" fill="#f05c1e"/>
      <path d="M32 8 L44 24 L32 40" stroke="#f05c1e" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  },
  { n:'05', t:'Post-Processing', d:'Degating, deburring, secondary machining, assembly inserts, and painting if required.', icon:
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" stroke="#f05c1e" strokeWidth="1.5" fill="none"/>
      <path d="M16 24 Q20 18 24 24 Q28 30 32 24" stroke="#f05c1e" strokeWidth="2" fill="none"/>
    </svg>
  },
]

const MATERIALS = [
  { name:'ABS',   spec:'General Purpose',  desc:'High impact resistance. Perfect for enclosures, handles, and consumer goods.' },
  { name:'PP',    spec:'Living Hinges',     desc:'Fatigue resistant. Ideal for snap-fit parts, containers, and living hinges.' },
  { name:'Nylon', spec:'Engineering Grade', desc:'Excellent wear and chemical resistance. Used in gears, bushings, and brackets.' },
  { name:'HDPE',  spec:'Chemical Resistant',desc:'Outstanding chemical resistance and low friction coefficient for fluid-contact parts.' },
]

const SPECS = [
  { label:'Min Order',     val:'100',     unit:'units' },
  { label:'Tolerance',     val:'±0.05',   unit:'mm' },
  { label:'Max Part Size', val:'400×300', unit:'mm' },
  { label:'Lead Time',     val:'7–14',    unit:'days' },
  { label:'Cavity Count',  val:'1–8',     unit:'cavities' },
  { label:'Surface Ra',    val:'0.8–3.2', unit:'μm Ra' },
]

export default function InjectionMoulding() {
  const nav = useNavigate()
  useReveal()

  return (
    <div className="page-injection">
      {/* Hero */}
      <section className="inj-hero">
        <div className="inj-hero-bg"/>
        <div className="eyebrow or">Manufacturing Service</div>
        <h1 className="inj-h1">INJECTION<br/><em>MOULDING.</em></h1>
        <div className="hero-bot rv">
          <p className="hero-desc" style={{ color: 'var(--g5)' }}>
            High-volume, high-precision plastic parts — from DFM review to finished production run. 100 to 100,000 units, 7-day tooling lead time.
          </p>
          <div className="hero-btns">
            <button className="btn-or" onClick={() => document.getElementById('contact-sec')?.scrollIntoView({ behavior:'smooth' })}>Get a Quote</button>
            <button className="btn-ghost" onClick={() => nav('/')}>← Back</button>
          </div>
        </div>
      </section>

      <Ticker items={TICKER} bg="var(--or)" />

      {/* Specs grid */}
      <div className="inj-specs-grid">
        {SPECS.map(s => (
          <div className="inj-spec-card rv" key={s.label}>
            <div className="inj-spec-label">{s.label}</div>
            <div className="inj-spec-val">{s.val}</div>
            <div className="inj-spec-sub">{s.unit}</div>
          </div>
        ))}
      </div>

      {/* Process */}
      <section className="sec-pad">
        <SectionHeader title="The Process" sub="Step by Step" />
        <div className="inj-process">
          {STEPS.map(s => (
            <div className="inj-step rv" key={s.n}>
              <div className="inj-step-n">{s.n}</div>
              <div className="inj-step-icon">{s.icon}</div>
              <div className="inj-step-t">{s.t}</div>
              <p className="inj-step-d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="sec-pad" style={{ background: 'var(--s1)' }}>
        <SectionHeader title="Materials" sub="Injection Grade Polymers" />
        <div className="inj-materials">
          {MATERIALS.map(m => (
            <div className="inj-mat rv" key={m.name}>
              <div className="inj-mat-name">{m.name}</div>
              <div className="inj-mat-tag">{m.spec}</div>
              <p className="inj-mat-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta-band">
        <h2 className="cta-h rv">SCALE UP<br/><em>WITH US.</em></h2>
        <p className="cta-s rv d1">Send us your CAD file and production requirements — we'll send back a full quote within 24 hours.</p>
        <div className="cta-btns rv d2">
          <button className="btn-or" onClick={() => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }}>
            Get a Quote →
          </button>
          <button className="btn-ghost" onClick={() => nav('/vacuum-forming')}>Vacuum Forming →</button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
