import { useReveal } from '../hooks/useReveal'
import { useNavigate } from 'react-router-dom'

const TICKER_ITEMS = [
  '±0.2mm Tolerance','PLA+ · PETG · ABS · TPU · Nylon',
  '24h Turnaround','1–500 Parts','QC Measured','CAD Review Included',
]
 const isMobile = window.innerWidth <= 720;
const CAPABILITIES = [
  {
    n:'01', name:'Rapid Prototyping',
    desc:'CAD file to physical part in 24 hours. Functional, dimensional, and aesthetic prototypes for engineers who can\'t wait.',
    specs:'Turnaround: 24h · Min: 1 piece · Tolerance: ±0.2mm',
    icon:(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{marginBottom:20}}>
        <rect x="6" y="6" width="28" height="36" rx="2" fill="#1a1a0a" stroke="#3a3008" strokeWidth="1.5"/>
        <polygon points="28,6 36,14 28,14" fill="#2a2a0a"/>
        <line x1="12" y1="20" x2="30" y2="20" stroke="#f0c020" strokeWidth="1.5"/>
        <line x1="12" y1="26" x2="24" y2="26" stroke="#3a3008" strokeWidth="1.5"/>
        <line x1="12" y1="32" x2="22" y2="32" stroke="#3a3008" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    n:'02', name:'Batch Production',
    desc:'Consistent quality at scale. Small to medium production runs with tight dimensional accuracy and multiple finish options.',
    specs:'Batch: 10–500 · Finish: Sanded/Raw · Lead: 5–7 days',
    icon:(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{marginBottom:20}}>
        <rect x="4"  y="18" width="10" height="22" rx="1" fill="#2a2a0a" stroke="#f0c020" strokeWidth="1"/>
        <rect x="16" y="12" width="10" height="28" rx="1" fill="#2a2a0a" stroke="#f0c020" strokeWidth="1"/>
        <rect x="28" y="6"  width="10" height="34" rx="1" fill="#2a2a0a" stroke="#f0c020" strokeWidth="1"/>
        <rect x="4"  y="40" width="34" height="3"  rx="1" fill="#3a3008"/>
      </svg>
    ),
  },
  {
    n:'03', name:'Custom Enclosures',
    desc:'PCB-ready enclosures with ±0.1mm accuracy. Snap-fits, M3 boss columns, cable routing, flush lids, IP54 rated.',
    specs:'Accuracy: ±0.1mm · PCB-Ready · Snap-fit · IP54',
    icon:(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{marginBottom:20}}>
        <rect x="8"  y="8"  width="32" height="32" rx="3" fill="#1a1a0a" stroke="#f0c020" strokeWidth="1.5"/>
        <rect x="14" y="14" width="20" height="20" rx="2" fill="#2a2a0a"/>
        <line x1="14" y1="24" x2="8"  y2="24" stroke="#f0c020" strokeWidth="1" opacity=".5"/>
        <line x1="34" y1="24" x2="40" y2="24" stroke="#f0c020" strokeWidth="1" opacity=".5"/>
        <line x1="24" y1="14" x2="24" y2="8"  stroke="#f0c020" strokeWidth="1" opacity=".5"/>
        <rect x="18" y="18" width="12" height="12" rx="1" fill="#f0c020" opacity=".2"/>
      </svg>
    ),
  },
  {
    n:'04', name:'Jigs & Fixtures',
    desc:'Production jigs, assembly fixtures, and drill guides. PETG, ABS, or Nylon. Up to 50kg load. Repeatable to 0.1mm.',
    specs:'PETG · ABS · PA12 · 50kg rating · 0.1mm repeat',
    icon:(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{marginBottom:20}}>
        <polygon points="24,4 42,13 42,35 24,44 6,35 6,13" fill="none" stroke="#f0c020" strokeWidth="1.5"/>
        <polygon points="24,12 34,17 34,31 24,36 14,31 14,17" fill="#1a1a0a"/>
        <circle cx="24" cy="24" r="5" fill="#f0c020" opacity=".3"/>
        <circle cx="24" cy="24" r="2" fill="#f0c020"/>
      </svg>
    ),
  },
  {
    n:'05', name:'Multi-Material',
    desc:'PLA+, PETG, ABS, TPU, and Nylon — in the same order or the same part. We advise on material choice for your use-case.',
    specs:'PLA+ · PETG · ABS · TPU · PA12 Nylon',
    icon:(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{marginBottom:20}}>
        <rect x="6"  y="8"  width="36" height="24" rx="2" fill="#1a1a0a" stroke="#f0c020" strokeWidth="1.5"/>
        <rect x="10" y="12" width="10" height="6"  rx="1" fill="#f0c020" opacity=".5"/>
        <rect x="24" y="12" width="12" height="6"  rx="1" fill="#f0c020" opacity=".3"/>
        <line x1="10" y1="22" x2="38" y2="22" stroke="#2a2a0a" strokeWidth="1"/>
        <rect x="10" y="25" width="5" height="5" rx=".5" fill="#f0c020" opacity=".6"/>
        <rect x="19" y="25" width="5" height="5" rx=".5" fill="#f0c020" opacity=".6"/>
        <rect x="28" y="25" width="5" height="5" rx=".5" fill="#f0c020" opacity=".4"/>
        <rect x="6"  y="36" width="36" height="8" rx="1" fill="#2a2a0a"/>
      </svg>
    ),
  },
]

const MATERIALS = [
  { name:'PLA+',     best:'Prototypes, consumer, display models',    strength:'High',   heat:'60°C',  flex:'Low',    price:'₹₹' },
  { name:'PETG',     best:'Enclosures, outdoor, mechanical parts',   strength:'V. High',heat:'80°C',  flex:'Medium', price:'₹₹' },
  { name:'ABS',      best:'Automotive, heat-exposed, machinable',    strength:'High',   heat:'105°C', flex:'Low-Med',price:'₹₹₹' },
  { name:'TPU',      best:'Grips, gaskets, wearables, shock absorb', strength:'Medium', heat:'70°C',  flex:'V. High',price:'₹₹₹' },
  { name:'PA12 Nylon',best:'Jigs, fixtures, functional production',  strength:'V. High',heat:'120°C', flex:'Medium', price:'₹₹₹₹' },
]

const PROCESS_STEPS = [
  { n:'01', t:'File Upload',     d:'Send us your STL, STEP, or OBJ file. We accept incomplete files too — send what you have and we\'ll advise.' },
  { n:'02', t:'CAD Review',      d:'An engineer checks your file for printability, wall thickness issues, and tolerance risks — before we print a single layer.' },
  { n:'03', t:'Quote & Confirm', d:'You get a clear breakdown — material, quantity, finish, and lead time. Confirm and we start the same day.' },
  { n:'04', t:'Print & QC',      d:'Every part is measured with digital calipers. Any deviation triggers a reprint. You get what you specified — not a near-miss.' },
]

function LogoMark({ size = 60, colors = ["#f05c1e", "#c44820", "#7a2e0f"] }) {
  const s = size,
    h = Math.round(size * 0.917);
  return (
    <svg width={s} height={h} viewBox="0 0 56 52" fill="none">
      <polygon points="8,1 46,1 52,14 14,14" fill={colors[0]} />
      <polygon points="5,20 43,20 49,33 11,33" fill={colors[1]} />
      <polygon points="2,39 40,39 46,52 8,52" fill={colors[2]} />
    </svg>
  );
}

export default function Precision() {
  const nav = useNavigate()
  useReveal()
  const goQuote = () => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }

  return (
    <div style={{ background:'#08070a' }}>

      {/* HERO */}
      <section className="yw-hero">
        <div className="yw-hero-bg"/>
        <div className="yw-hero-grid"/>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
         <LogoMark size={25} colors={["#f5d000", "#c9a800", "#7a6500"]} />
          <span
            style={{
              fontFamily: "Arial Narrow, sans-serif",
              fontWeight: 900,
              fontSize: 30,
              letterSpacing: ".08em",
              color: "#ffffff",
                fontSize: isMobile ? 25 : 30,
            }}
          >
            PRECISION
            <em style={{ fontStyle: "normal", color: "#f0c020" }}>-B2B </em>
          </span>
        </div>
        <div className="eyebrow yw rv" style={{ position:'relative' }}>02 — Precision B2B · Engineering Grade</div>
        <h1 className="yw-h1 rv d1" style={{ position:'relative' }}>
          PRECISION<br/>PARTS.<br/><em>ENGINEERED.</em>
        </h1>
        <div className="rv d2" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', borderTop:'1px solid #2a2208', paddingTop:24, position:'relative', flexWrap:'wrap', gap:16 }}>
          <p style={{ fontSize:14, color:'#666', maxWidth:460, lineHeight:1.8, fontWeight:300 }}>
            From rapid prototypes to production runs — engineered-grade 3D printing for startups, product designers, and manufacturing teams. Tight tolerances. Multiple materials. Real QC.
          </p>
          <button className="btn-yw" onClick={goQuote}>Get Quote →</button>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:'var(--yw)', borderBottom:'1px solid rgba(0,0,0,.15)' }}>
        <div className="ticker"><div className="ticker-track">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((t,i) => (
            <span className="ti" key={i} style={{ color:'var(--blk)' }}>{t} <span className="td">·</span></span>
          ))}
        </div></div>
      </div>

      {/* STATS */}
      <div className="stats-bar" style={{ background:'#0e0d08', borderColor:'#2a2208' }}>
        {[
          { n:'±0.2', s:'mm', l:'Default Tolerance', d:'FDM standard' },
          { n:'24',   s:'h',  l:'Min Turnaround',    d:'File to physical part' },
          { n:'500',  s:'+',  l:'Max Batch Size',    d:'Per production run' },
          { n:'5',    s:'+',  l:'Materials',          d:'PLA+ PETG ABS TPU Nylon' },
        ].map(s => (
          <div key={s.l} className="sb-item" style={{ borderColor:'#2a2208' }}>
            <div className="sb-n">{s.n}<span style={{ color:'var(--yw)' }}>{s.s}</span></div>
            <div className="sb-l" style={{ color:'#3a3008' }}>{s.l}</div>
            <div className="sb-d" style={{ color:'#555' }}>{s.d}</div>
          </div>
        ))}
      </div>

      {/* CAPABILITIES */}
      <section className="sec-pad" style={{ background:'#08070a', borderColor:'#2a2208' }}>
        <div className="sh rv" style={{ borderColor:'#2a2208' }}>
          <h2 className="sh-t">Services</h2>
          <span className="sh-s" style={{ color:'#3a3008',filter: "brightness(7)"  }}>04 — What We Offer</span>
        </div>
        <div className="yw-cap-grid">
          {CAPABILITIES.map((c,i) => (
            <div className={`yc rv d${(i%3)+1}`} key={c.n}>
              <div className="yc-n">{c.n}</div>
              {c.icon}
              <div className="yc-name">{c.name}</div>
              <p className="yc-desc">{c.desc}</p>
              <div className="yc-specs">{c.specs}</div>
            </div>
          ))}

          {/* CTA card */}
          <div className="yc yw-cta rv d2" style={{ backgroundColor:'#f0c020'}}>
            <div className="yc-n" style={{ color:'rgba(0,0,0,.3)'}}>Get Started</div>
            <div className="yc-name" style={{ fontSize:'clamp(32px,4vw,52px)', lineHeight:.9, marginBottom:16,color:'black' }}>
              WHAT DO YOU<br/>NEED BUILT?
            </div>
            <p className="yc-desc" style={{ color:'rgba(0,0,0,.3)'}}>Send your file. Get a quote within 2 hours. We review CAD and flag issues before printing.</p>
            <button className="btn-or" style={{ marginTop:'auto', alignSelf:'flex-start' }} onClick={goQuote}>
              Upload File →
            </button>
          </div>
        </div>
      </section>

      {/* MATERIALS TABLE */}
      <section className="sec-pad" style={{ background:'#06060a', borderColor:'#2a2208' }}>
        <div className="sh rv" style={{ borderColor:'#2a2208' }}>
          <h2 className="sh-t">Materials</h2>
          <span className="sh-s" style={{ color:'#3a3008',filter: "brightness(7)"  }}>05 — What We Print With</span>
        </div>
        <div className="rv d1" style={{ overflowX:'auto' }}>
          <table className="mat-table" style={{ width:'100%' }}>
            <thead>
              <tr>
                <th>Material</th>
                <th>Best For</th>
                <th>Strength</th>
                <th>Heat Resist.</th>
                <th>Flexibility</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map(m => (
                <tr key={m.name}>
                  <td>{m.name}</td>
                  <td style={{ fontSize:12 }}>{m.best}</td>
                  <td className="mat-highlight">{m.strength}</td>
                  <td>{m.heat}</td>
                  <td>{m.flex}</td>
                  <td style={{ color:'var(--yw)' }}>{m.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec-pad" style={{ background:'#08070a', borderColor:'#2a2208' }}>
        <div className="sh rv" style={{ borderColor:'#2a2208' }}>
          <h2 className="sh-t">Our Process</h2>
          <span className="sh-s" style={{ color:'#3a3008',filter: "brightness(7)"  }}>06 — How B2B Works</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, background:'#2a2208' }}>
          {PROCESS_STEPS.map((s,i) => (
            <div key={s.n} style={{ background:'#0e0d08', padding:'44px 28px' }} className={`rv d${i+1}`}>
              <div style={{ fontFamily:'var(--ff-cond)', fontWeight:900, fontSize:72, lineHeight:1, color:'#1a1808', marginBottom:22, transition:'color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#2a2208'}
                onMouseLeave={e=>e.currentTarget.style.color='#1a1808'}>
                {s.n}
              </div>
              <div style={{ width:28, height:2, background:'var(--yw)', marginBottom:16 }}/>
              <h3 style={{ fontFamily:'var(--ff-cond)', fontWeight:800, fontSize:20, marginBottom:10 }}>{s.t}</h3>
              <p style={{ fontSize:12.5, color:'var(--g5)', lineHeight:1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#06060a', borderTop:'1px solid #2a2208' }}>
        <div className="site-footer">
          <div className="fl-logo">
            <svg width="28" height="26" viewBox="0 0 56 52" fill="none">
              <polygon points="8,1 46,1 52,14 14,14"  fill="#f0c020"/>
              <polygon points="5,20 43,20 49,33 11,33" fill="#c49a10"/>
              <polygon points="2,39 40,39 46,52 8,52"  fill="#7a600a"/>
            </svg>
            <span className="fl-name">SOLIDLABS</span>
          </div>
          <div className="fl-copy" style={{ color:'#3a3008',filter: "brightness(7)"  }}>© 2025 SolidLabs · Precision B2B · Bengaluru</div>
        </div>
      </footer>
    </div>
  )
}
