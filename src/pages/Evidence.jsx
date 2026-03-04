import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { addToCart } from '../components/Cart'
import { getProductsByCategoryName } from '../api/apiClient'

export default function Evidence() {

  useReveal()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchEvidence = async () => {

      try {

        const res = await getProductsByCategoryName("field_evidence")

        console.log("Evidence:", res)

        setProjects(res)

      } catch (err) {

        console.error(err)
        setError(err.message)

      } finally {

        setLoading(false)

      }

    }

    fetchEvidence()

  }, [])

  return (
    <div style={{ background: 'var(--blk)' }}>

      {/* HERO */}
      <section style={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '140px 48px 68px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--s2)'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 60% 40%,rgba(240,92,30,.06),transparent 70%)'
        }} />

        <div className="eyebrow or rv" style={{ position: 'relative' }}>
          05 — Portfolio · Field Evidence
        </div>

        <h1 className="rv d1" style={{
          fontFamily: 'var(--ff-cond)',
          fontWeight: 900,
          fontSize: 'clamp(64px,12vw,148px)',
          lineHeight: .85,
          letterSpacing: '.01em',
          marginBottom: 28,
          position: 'relative'
        }}>
          WORK<br />WE'RE<br />
          <em style={{ fontStyle: 'italic', color: 'var(--or)' }}>PROUD OF.</em>
        </h1>

        <p className="rv d2" style={{
          fontSize: 15,
          color: 'var(--g5)',
          maxWidth: 520,
          lineHeight: 1.8,
          fontWeight: 300,
          position: 'relative'
        }}>
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

          {loading && (
            <div style={{ color: "#fff", padding: 40 }}>
              Loading projects...
            </div>
          )}

          {error && (
            <div style={{ color: "red", padding: 40 }}>
              Error loading projects
            </div>
          )}

          {!loading && !error && projects.map((p, i) => (
            <div
              key={p.id}
              className={`ev-card rv d${(i % 3) + 1}`}
            >

              <div className="ev-tag or">
                {p.category}
              </div>

              <div className="ev-title">
                {p.name}
              </div>

              <p className="ev-desc">
                {p.description}
              </p>

              {/* IMAGE */}
              {p.image_url && (
                <div style={{
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "center"
                }}>
                  <img
                    src={p.image_url}
                    alt={p.name}
                    style={{
                      width: 120,
                      height: 80,
                      objectFit: "contain"
                    }}
                  />
                </div>
              )}

              <div className="ev-meta">
                Material: {p.material || "PLA+"}
              </div>

              {/* ADD TO CART BUTTON */}
              <div style={{ marginTop: 12 }}>
                <button
                  className="obtn"
                  onClick={() =>
                    addToCart(p.id, p.name, p.price)
                  }
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--blk)', borderTop: '1px solid var(--s2)' }}>
        <div className="site-footer">

          <div className="fl-logo">
            <svg width="28" height="26" viewBox="0 0 56 52" fill="none">
              <polygon points="8,1 46,1 52,14 14,14" fill="#f05c1e" />
              <polygon points="5,20 43,20 49,33 11,33" fill="#c44820" />
              <polygon points="2,39 40,39 46,52 8,52" fill="#7a2e0f" />
            </svg>
            <span className="fl-name">SOLIDLABS</span>
          </div>

          <div className="fl-copy">
            © 2025 SolidLabs · Field Evidence · Bengaluru
          </div>

        </div>
      </footer>

    </div>
  )
}