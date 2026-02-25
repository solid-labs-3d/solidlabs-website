import { useReveal } from '../hooks/useReveal'
import { useNavigate } from 'react-router-dom'
import { Ticker, Footer, SectionHeader } from '../components/Shared'

// ══════════════════════════════════════════
// VACUUM FORMING
// ══════════════════════════════════════════
const VAC_TICKER = ['Vacuum Forming','Large Format','PETG · ABS · HIPS','Low Tooling Cost','Fast Lead Time']

const VAC_STEPS = [
  { n:'01', t:'Sheet Clamping',   d:'Thermoplastic sheet is clamped into the frame and secured.' },
  { n:'02', t:'Heating',          d:'Sheet is heated to forming temperature (120–200°C depending on material).' },
  { n:'03', t:'Forming',          d:'Vacuum is applied, drawing the sheet tightly over the mould.' },
  { n:'04', t:'Cooling & Release',d:'Part cools, dimensionally stable, then released from mould.' },
]

const VAC_MATERIALS = [
  { name:'PETG',  spec:'Food Safe · Clear',  desc:'Excellent clarity and impact resistance. Food-safe grade available.' },
  { name:'ABS',   spec:'Rigid · Paintable',  desc:'Good heat resistance and dimensional stability. Easy to paint.' },
  { name:'HIPS',  spec:'Lightweight',         desc:'High impact polystyrene — economical, great for trays and packaging.' },
  { name:'HDPE',  spec:'Chemical Resistant',  desc:'Chemical and UV resistant. Outdoor and industrial applications.' },
  { name:'Acrylic',spec:'Optical Grade',      desc:'Pristine clarity, scratch resistant. Signage and display applications.' },
  { name:'PP',    spec:'Flexible',            desc:'Excellent fatigue life. Living hinges, reusable containers.' },
]

export function VacuumForming() {
  const nav = useNavigate()
  useReveal()
  return (
    <div className="page-vacuum">
      <section className="vac-hero">
        <div className="vac-hero-bg"/>
        <div className="eyebrow or">Manufacturing Service</div>
        <h1 className="vac-h1">VACUUM<br/><em>FORMING.</em></h1>
        <div className="hero-bot rv">
          <p className="hero-desc" style={{ color:'var(--g5)' }}>
            Low-cost tooling, large format parts, fast turnaround. Perfect for packaging, covers, trays, and display forms up to 600×400mm.
          </p>
          <div className="hero-btns">
            <button className="btn-or" onClick={() => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }}>Get a Quote</button>
            <button className="btn-ghost" onClick={() => nav('/')}>← Back</button>
          </div>
        </div>
      </section>

      <Ticker items={VAC_TICKER} bg="var(--or)" />

      {/* Specs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, background:'var(--s2)' }}>
        {[
          { label:'Max Sheet Size', val:'600×400', unit:'mm' },
          { label:'Min Wall',       val:'0.8',     unit:'mm' },
          { label:'Depth Ratio',    val:'1:1',     unit:'max' },
          { label:'Lead Time',      val:'3–5',     unit:'days' },
        ].map(s => (
          <div key={s.label} style={{ background:'var(--blk)', padding:'40px 32px' }} className="rv">
            <div style={{ fontFamily:'var(--ff-mono)', fontSize:8, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--g3)', marginBottom:10 }}>{s.label}</div>
            <div style={{ fontFamily:'var(--ff-cond)', fontWeight:900, fontSize:'clamp(28px,4vw,48px)', color:'var(--or)' }}>{s.val}</div>
            <div style={{ fontSize:12, color:'var(--g5)', marginTop:6 }}>{s.unit}</div>
          </div>
        ))}
      </div>

      <section className="sec-pad">
        <SectionHeader title="The Process" sub="4 Steps" />
        <div className="vac-steps">
          {VAC_STEPS.map(s => (
            <div className="vac-step rv" key={s.n}>
              <div className="vac-step-n">{s.n}</div>
              <div className="vac-step-t">{s.t}</div>
              <p className="vac-step-d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec-pad" style={{ background:'var(--s1)' }}>
        <SectionHeader title="Materials" sub="Thermoplastic Sheets" />
        <div className="vac-materials">
          {VAC_MATERIALS.map(m => (
            <div className="vac-mat rv" key={m.name}>
              <div className="vac-mat-name">{m.name}</div>
              <div className="vac-mat-spec">{m.spec}</div>
              <p className="vac-mat-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta-band">
        <h2 className="cta-h rv">FORM YOUR<br/><em>IDEA.</em></h2>
        <div className="cta-btns rv d1">
          <button className="btn-or" onClick={() => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }}>Get a Quote →</button>
          <button className="btn-ghost" onClick={() => nav('/injection-moulding')}>Injection Moulding →</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

// ══════════════════════════════════════════
// SLA PRINTING
// ══════════════════════════════════════════
const SLA_TICKER = ['SLA Resin Printing','0.05mm Layers','Ultra Smooth','Dental · Jewellery · Display','Standard · Tough · Flexible']

const SLA_RESINS = [
  { name:'Standard Resin', tag:'General Purpose', desc:'High detail, smooth surface. Best for display models, concept proofs, and detailed miniatures.' },
  { name:'Tough Resin',    tag:'ABS-Like',        desc:'Simulates ABS properties. Impact resistant for functional prototypes and snap-fit tests.' },
  { name:'Flexible Resin', tag:'Rubber-Like',     desc:'Shore A 50–80. Gaskets, grips, wearables, and flexible structures.' },
  { name:'Dental Resin',   tag:'Biocompatible',   desc:'ISO 10993 biocompatible. Surgical guides, dental models, and orthotics.' },
  { name:'Castable Resin', tag:'Lost-PLA Casting', desc:'Burns clean at 600°C. Jewellery casting, investment casting patterns.' },
  { name:'High-Temp Resin',tag:'Heat Resistant',  desc:'Deflects at 238°C. Functional testing near heat sources, custom jigs.' },
]

export function SLAPrinting() {
  const nav = useNavigate()
  useReveal()
  return (
    <div className="page-sla">
      <section className="sla-hero">
        <div className="sla-hero-bg"/>
        <div className="sla-hero-grid"/>
        <div className="eyebrow bl">High-Precision Printing</div>
        <h1 className="sla-h1">SLA<br/><em>PRINTING.</em></h1>
        <div className="hero-bot rv">
          <p className="hero-desc" style={{ color:'rgba(100,140,200,.8)' }}>
            Stereolithography — UV-cured resin printing at ±0.05mm accuracy. Ultra-smooth surfaces straight off the build plate.
          </p>
          <div className="hero-btns">
            <button className="btn-bl" onClick={() => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }}>Get a Quote</button>
            <button className="btn-ghost" onClick={() => nav('/')}>← Back</button>
          </div>
        </div>
      </section>

      <div style={{ background:'var(--bl)', borderBottom:'1px solid rgba(0,0,0,.2)' }}>
        <div className="ticker"><div className="ticker-track">
          {[...SLA_TICKER,...SLA_TICKER].map((t,i) => <span className="ti" key={i} style={{ color:'var(--wht)' }}>{t} <span className="td">·</span></span>)}
        </div></div>
      </div>

      {/* Specs */}
      <div className="sla-specs">
        {[
          { label:'Layer Height', val:'0.025', unit:'–0.1 mm' },
          { label:'XY Accuracy',  val:'±0.05', unit:'mm' },
          { label:'Build Volume', val:'290×165', unit:'×185 mm' },
          { label:'Wavelength',   val:'405',   unit:'nm UV' },
        ].map(s => (
          <div className="sla-spec rv" key={s.label}>
            <div className="sla-spec-label">{s.label}</div>
            <div className="sla-spec-val">{s.val}</div>
            <div className="sla-spec-sub">{s.unit}</div>
          </div>
        ))}
      </div>

      {/* How SLA Works */}
      <section className="sec-pad">
        <SectionHeader title="How SLA Works" sub="The Process" />
        <div className="sla-process">
          <div className="sla-proc-text rv">
            <div className="eyebrow bl" style={{ marginBottom:24 }}>Photopolymerisation</div>
            <p style={{ fontSize:15, lineHeight:1.85, color:'var(--g5)', marginBottom:24 }}>
              A UV laser traces each layer of your part on a vat of liquid photopolymer resin. The resin cures (solidifies) wherever the laser touches, building up the part layer by layer from bottom to top.
            </p>
            <p style={{ fontSize:15, lineHeight:1.85, color:'var(--g5)', marginBottom:32 }}>
              Because the laser spot is only ~0.085mm wide and positioned with galvanometer mirrors, SLA can produce extremely fine details — far beyond what FDM achieves.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {['No layer lines on XY faces','Excellent surface finish Ra 0.8–1.6μm','Fine feature resolution down to 0.3mm','Wide resin selection for specific properties'].map(f => (
                <div key={f} style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <div style={{ width:6, height:6, background:'var(--bl)', borderRadius:'50%', flexShrink:0 }}/>
                  <span style={{ fontSize:13, color:'var(--g5)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sla-proc-visual rv d1">
            {/* Simplified SLA diagram SVG */}
            <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
              <rect x="20" y="10" width="160" height="100" rx="2" fill="#0a0f1a" stroke="rgba(30,122,255,.3)" strokeWidth="1"/>
              <text x="100" y="30" textAnchor="middle" fill="rgba(30,122,255,.5)" fontSize="8" fontFamily="monospace">RESIN VAT</text>
              {/* Resin */}
              <rect x="24" y="40" width="152" height="65" fill="rgba(30,122,255,.08)"/>
              {/* Part being built */}
              <rect x="70" y="80" width="60" height="20" fill="rgba(30,122,255,.4)" rx="1"/>
              <rect x="74" y="68" width="52" height="12" fill="rgba(30,122,255,.6)" rx="1"/>
              {/* Laser beam */}
              <line x1="100" y1="10" x2="100" y2="68" stroke="var(--bl)" strokeWidth="1" opacity=".6"/>
              <circle cx="100" cy="68" r="3" fill="var(--bl)"/>
              {/* UV source */}
              <circle cx="100" cy="6" r="4" fill="var(--bl)"/>
              <text x="100" y="135" textAnchor="middle" fill="var(--g4)" fontSize="7" fontFamily="monospace">UV LASER SOURCE</text>
              {/* Build platform */}
              <rect x="60" y="100" width="80" height="4" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
              <line x1="100" y1="104" x2="100" y2="140" stroke="#333" strokeWidth="1" strokeDasharray="4 2"/>
              <rect x="85" y="140" width="30" height="6" fill="#282828"/>
              <text x="100" y="165" textAnchor="middle" fill="var(--g4)" fontSize="7" fontFamily="monospace">BUILD PLATFORM</text>
              {/* Arrows showing layer stacking */}
              <text x="100" y="200" textAnchor="middle" fill="rgba(30,122,255,.5)" fontSize="8" fontFamily="monospace">LAYER BY LAYER ↑</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Resins */}
      <section className="sec-pad" style={{ background:'var(--s1)' }}>
        <SectionHeader title="Resin Library" sub="6 Material Options" />
        <div className="sla-resins">
          {SLA_RESINS.map(r => (
            <div className="sla-resin rv" key={r.name}>
              <div className="sla-resin-name">{r.name}</div>
              <div className="sla-resin-tag">{r.tag}</div>
              <p className="sla-resin-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ex-cta-band">
        <h2 className="ex-cta-h rv">DETAIL AT<br/><em>SCALE.</em></h2>
        <div className="cta-btns rv d1">
          <button className="btn-bl" onClick={() => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }}>Get a Quote →</button>
          <button className="btn-ghost" onClick={() => nav('/learn')}>FDM vs SLA →</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

// ══════════════════════════════════════════
// CARBON FIBRE
// ══════════════════════════════════════════
const CF_TICKER = ['Carbon Fibre','CFRP Composites','Lightweight','High Strength','Aerospace Grade','Hand Layup · Prepreg']

const CF_APPS = [
  { name:'Aerospace',      tag:'Structural', desc:'Frame brackets, fairings, structural ribs. Meets aerospace lightweighting requirements.' },
  { name:'Automotive',     tag:'Body & Aero', desc:'Splitters, diffusers, mirror housings, interior trim. Show-quality finish available.' },
  { name:'Sports & Cycling',tag:'Performance',desc:'Handlebars, seat posts, frame reinforcements. Sub-gram weight savings per part.' },
  { name:'Robotics',       tag:'Structural', desc:'Robot arms, drone frames, end-effectors. Stiff, light, and vibration-damping.' },
  { name:'Electronics',    tag:'EMI Shielding',desc:'CF composites provide inherent EMI shielding for sensitive electronics enclosures.' },
  { name:'Custom',         tag:'Any Application',desc:'Tell us what you\'re building — if carbon makes sense, we\'ll make it work.' },
]

export function CarbonFibre() {
  const nav = useNavigate()
  useReveal()
  return (
    <div className="page-carbon">
      <section className="cf-hero">
        <div className="cf-hero-bg"/>
        <div className="cf-hero-weave"/>
        <div className="eyebrow yw">Advanced Composites</div>
        <h1 className="cf-h1">CARBON<br/><em>FIBRE.</em></h1>
        <div className="hero-bot rv">
          <p className="hero-desc" style={{ color:'rgba(180,160,80,.7)' }}>
            CFRP hand-layup and prepreg composites. Stronger than steel at a fraction of the weight — for aerospace, automotive, and performance applications.
          </p>
          <div className="hero-btns">
            <button className="btn-yw" onClick={() => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }}>Get a Quote</button>
            <button className="btn-ghost" onClick={() => nav('/')}>← Back</button>
          </div>
        </div>
      </section>

      <div style={{ background:'var(--yw)', borderBottom:'1px solid rgba(0,0,0,.2)' }}>
        <div className="ticker"><div className="ticker-track">
          {[...CF_TICKER,...CF_TICKER].map((t,i) => <span className="ti" key={i} style={{ color:'#1a1400' }}>{t} <span className="td">·</span></span>)}
        </div></div>
      </div>

      {/* Properties */}
      <div className="cf-properties">
        {[
          { label:'Density',           val:'1.5',    unit:'g/cm³ (vs steel 7.8)' },
          { label:'Tensile Strength',  val:'3,500',  unit:'MPa (T300 fibre)' },
          { label:'Elastic Modulus',   val:'230',    unit:'GPa' },
          { label:'Specific Stiffness',val:'10×',    unit:'stiffer than steel by mass' },
        ].map(p => (
          <div className="cf-prop rv" key={p.label}>
            <div className="cf-prop-label">{p.label}</div>
            <div className="cf-prop-val">{p.val}</div>
            <div className="cf-prop-sub">{p.unit}</div>
          </div>
        ))}
      </div>

      {/* Layup process */}
      <section className="sec-pad">
        <SectionHeader title="Our Process" sub="Hand Layup + Prepreg" />
        <div className="cf-layup">
          <div className="cf-layup-text rv">
            <div className="eyebrow yw" style={{ marginBottom:24 }}>Method</div>
            {[
              { n:'01', t:'Mould Preparation', d:'Machined aluminium or composite mould. Release agent applied. Peel ply for secondary bonding.' },
              { n:'02', t:'Ply Cutting',       d:'Pre-preg plies cut to net shape using CNC cutting table. 0°/90° and ±45° orientations.' },
              { n:'03', t:'Layup',             d:'Plies laid in precise sequence. Fibre orientation tuned for load path. Vacuum bagging applied.' },
              { n:'04', t:'Cure',              d:'Autoclave or oven cure at 120–180°C under 6 bar pressure. Full matrix consolidation.' },
              { n:'05', t:'Finish',            d:'CNC trimming, sanding, optional clear lacquer, matte or gloss finish.' },
            ].map(s => (
              <div key={s.n} style={{ display:'flex', gap:20, marginBottom:24 }}>
                <div style={{ fontFamily:'var(--ff-mono)', fontSize:8, letterSpacing:'.2em', color:'var(--yw)', minWidth:24, paddingTop:4 }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily:'var(--ff-cond)', fontWeight:800, fontSize:18, marginBottom:4 }}>{s.t}</div>
                  <div style={{ fontSize:13, color:'var(--g5)', lineHeight:1.7 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cf-layup-visual rv d1" style={{ background:'rgba(240,192,32,.04)', border:'1px solid rgba(240,192,32,.1)' }}>
            {/* Carbon weave pattern SVG */}
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <defs>
                <pattern id="cf-weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="10" height="10" fill="rgba(240,192,32,.15)"/>
                  <rect x="10" y="10" width="10" height="10" fill="rgba(240,192,32,.15)"/>
                  <rect x="0" y="10" width="10" height="10" fill="rgba(240,192,32,.06)"/>
                  <rect x="10" y="0" width="10" height="10" fill="rgba(240,192,32,.06)"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#cf-weave)"/>
              <rect width="200" height="200" fill="none" stroke="rgba(240,192,32,.3)" strokeWidth="1"/>
              <text x="100" y="105" textAnchor="middle" fill="rgba(240,192,32,.5)" fontSize="10" fontFamily="monospace">CFRP WEAVE</text>
              <text x="100" y="120" textAnchor="middle" fill="rgba(240,192,32,.3)" fontSize="8" fontFamily="monospace">2×2 Twill · T300</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="sec-pad" style={{ background:'var(--s1)' }}>
        <SectionHeader title="Applications" sub="Where We've Done It" />
        <div className="cf-applications">
          {CF_APPS.map(a => (
            <div className="cf-app rv" key={a.name}>
              <div className="cf-app-name">{a.name}</div>
              <div className="cf-app-tag">{a.tag}</div>
              <p className="cf-app-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ex-cta-band" style={{ background:'#060602', borderTop:'1px solid rgba(240,192,32,.1)' }}>
        <h2 className="ex-cta-h rv" style={{ color:'var(--yw)' }}>LIGHTER.<br/>STRONGER.</h2>
        <div className="cta-btns rv d1">
          <button className="btn-yw" onClick={() => { nav('/'); setTimeout(()=>document.getElementById('contact-sec')?.scrollIntoView({behavior:'smooth'}),80) }}>Get a Quote →</button>
          <button className="btn-ghost" onClick={() => nav('/extreme')}>Extreme Engineering →</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
