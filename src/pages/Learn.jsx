// Full content to be ported from solidlabs-v5.html
// See migration guide in README.md
import { useReveal } from '../hooks/useReveal'
import { Footer } from '../components/Shared'
import { useNavigate } from 'react-router-dom'

export default function Learn() {
  useReveal()
  const nav = useNavigate()
  return (
    <div className="page-learn">
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'160px 48px 80px', textAlign:'center' }}>
        <div style={{ fontFamily:'var(--ff-mono)', fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--or)', marginBottom:20 }}>
          Porting from v5
        </div>
        <h1 style={{ fontFamily:'var(--ff-cond)', fontWeight:900, fontSize:'clamp(52px,10vw,120px)', lineHeight:.87 }}>
          LEARN
        </h1>
        <p style={{ fontSize:14, color:'var(--g5)', marginTop:28, maxWidth:480, lineHeight:1.8 }}>
          Full content from solidlabs-v5.html — all CSS classes, SVGs, and interactions carry over directly into this component.
        </p>
        <div style={{ display:'flex', gap:12, marginTop:40 }}>
          <button className="btn-or" onClick={() => nav('/')}>← Home</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
