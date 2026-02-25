import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    tag:'D2C · SL Originals', tagClass:'or',
    title:'Consumer Keychain Collection',
    desc:'Full product line development — from concept sketches to production-ready STL files, colour variant selection, and packaging. 2,000+ units shipped.',
    meta:'2,000+ units · PLA+ · 14 colours',
    visual:(
      <div style={{ display:'flex', gap:2, margin:'8px 0' }}>
        <div style={{ height:40, flex:1, background:'#f05c1e', opacity:.8 }}/>
        <div style={{ height:40, flex:1, background:'#c44820', opacity:.8 }}/>
        <div style={{ height:40, flex:1, background:'#0a0a0a', border:'1px solid #2a2a2a' }}/>
        <div style={{ height:40, flex:1, background:'#f0ede6', opacity:.7 }}/>
      </div>
    ),
  },
  {
    tag:'B2B · Precision', tagClass:'yw',
    title:'Aerospace Bracket Prototype',
    desc:'48-hour turnaround on a bracket assembly for a UAV startup. ABS material, ±0.15mm critical dimensions, CAD review flagged one tolerance issue before print.',
    meta:'48h turnaround · ABS · ±0.15mm',
    visual:(
      <div style={{ height:80, background:'var(--s2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'8px 0' }}>
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <polygon points="10,40 110,40 106,20 14,20" fill="#1e1e1e" stroke="#f0c020" strokeWidth="1"/>
          <polygon points="14,20 106,20 100,4 20,4"   fill="#2a2a1a" stroke="#f0c020" strokeWidth=".8"/>
          <line x1="40" y1="20" x2="40" y2="40" stroke="#f0c020" strokeWidth=".8"/>
          <line x1="80" y1="20" x2="80" y2="40" stroke="#f0c020" strokeWidth=".8"/>
        </svg>
      </div>
    ),
  },
  {
    tag:'Extreme Eng.', tagClass:'bl',
    title:'IoT Asset Tracker',
    desc:'Complete hardware unit — ESP32 board, custom IP65 PETG enclosure, BLE + LoRa, 3000mAh battery pack. Firmware flashed and field-tested in Bengaluru rail yards.',
    meta:'ESP32 · LoRa · BLE · IP65 · Firmware',
    visual:(
      <div style={{ height:80, background:'#020408', border:'1px solid rgba(30,122,255,.12)', display:'flex', alignItems:'center', justifyContent:'center', margin:'8px 0' }}>
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
          <rect x="10" y="8"  width="80" height="34" rx="3" fill="#060a12" stroke="rgba(30,122,255,.4)" strokeWidth="1"/>
          <rect x="18" y="16" width="24" height="16" rx="2" fill="rgba(30,122,255,.1)" stroke="rgba(30,122,255,.3)" strokeWidth=".8"/>
          <circle cx="72" cy="24" r="8"  fill="rgba(30,122,255,.2)" stroke="rgba(30,122,255,.5)" strokeWidth="1"/>
          <circle cx="72" cy="24" r="3"  fill="#1e7aff" opacity=".6"/>
        </svg>
      </div>
    ),
  },
  {
    tag:'B2B · Batch', tagClass:'yw',
    title:'Medical Device Housing',
    desc:'200-unit batch run for a medical startup\'s diagnostic device housing. PETG, food-safe resin finishing, all units measured and documented. Zero rejects.',
    meta:'200 units · PETG · Zero rejects · Documented',
    visual:null,
  },
  {
    tag:'D2C · Launch', tagClass:'or',
    title:'Desk Organiser Range',
    desc:'New SL Originals product line. Three size variants, six colour options, co-designed with a Bengaluru industrial designer. Launched via Instagram in Q2 2024.',
    meta:'3 variants · 6 colours · Instagram launch',
    visual:null,
  },
  {
    tag:'Extreme Eng.', tagClass:'bl',
    title:'Robotics Competition Build',
    desc:'Full 48-hour emergency build for a national robotics team — chassis, electronics mount, motor controller housing. Printed, assembled, and tested overnight. Team placed 2nd.',
    meta:'48h emergency · Full assembly · Team placed 2nd',
    visual:null,
  },
]

export default function Evidence() {
  useReveal()

  return (
    <div style={{ background:'var(--blk)' }}>

      {/* HERO */}
      <section style={{ minHeight:'65vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'140px 48px 68px', position:'relative', overflow:'hidden', borderBottom:'1px solid var(--s2)' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 60% 40%,rgba(240,92,30,.06),transparent 70%)' }}/>
        <div className="eyebrow or rv" style={{ position:'relative' }}>05 — Portfolio · Field Evidence</div>
        <h1 className="rv d1" style={{ fontFamily:'var(--ff-cond)', fontWeight:900, fontSize:'clamp(64px,12vw,148px)', lineHeight:.85, letterSpacing:'.01em', marginBottom:28, position:'relative' }}>
          WORK<br/>WE'RE<br/><em style={{ fontStyle:'italic', color:'var(--or)' }}>PROUD OF.</em>
        </h1>
        <p className="rv d2" style={{ fontSize:15, color:'var(--g5)', maxWidth:520, lineHeight:1.8, fontWeight:300, position:'relative' }}>
          Real projects for real clients. We don't do renders. These are parts that exist in the world — shipped, installed, running.
        </p>
      </section>

      {/* PROJECTS */}
      <section className="sec-pad">
        <div className="sh rv">
          <h2 className="sh-t">Recent Projects</h2>
          <span className="sh-s">Select Works</span>
        </div>
        <div className="ev-grid">
          {PROJECTS.map((p,i) => (
            <div key={p.title} className={`ev-card rv d${(i%3)+1}`}>
              <div className={`ev-tag ${p.tagClass}`}>{p.tag}</div>
              <div className="ev-title">{p.title}</div>
              <p className="ev-desc">{p.desc}</p>
              {p.visual}
              <div className="ev-meta">{p.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'var(--blk)', borderTop:'1px solid var(--s2)' }}>
        <div className="site-footer">
          <div className="fl-logo">
            <svg width="28" height="26" viewBox="0 0 56 52" fill="none">
              <polygon points="8,1 46,1 52,14 14,14"  fill="#f05c1e"/>
              <polygon points="5,20 43,20 49,33 11,33" fill="#c44820"/>
              <polygon points="2,39 40,39 46,52 8,52"  fill="#7a2e0f"/>
            </svg>
            <span className="fl-name">SOLIDLABS</span>
          </div>
          <div className="fl-copy">© 2025 SolidLabs · Field Evidence · Bengaluru</div>
        </div>
      </footer>
    </div>
  )
}
