// ── SolidLabs Logo SVG ──────────────────────────────────
export function SLLogo({ width = 56, height = 52 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 56 52" fill="none">
      <polygon points="8,1 46,1 52,14 14,14"  fill="#f05c1e"/>
      <polygon points="5,20 43,20 49,33 11,33" fill="#c44820"/>
      <polygon points="2,39 40,39 46,52 8,52"  fill="#7a2e0f"/>
    </svg>
  )
}

// ── Scrolling Ticker ────────────────────────────────────
export function Ticker({ items, className = '', bg = 'var(--or)', textClass = '' }) {
  return (
    <div style={{ background: bg, borderBottom: '1px solid rgba(0,0,0,.15)' }} className={className}>
      <div className="ticker">
        <div className="ticker-track">
          {[...items, ...items].map((item, i) => (
            <span className={`ti ${textClass}`} key={i}>
              {item} <span className="td">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Shared Footer ───────────────────────────────────────
export function Footer({ links = [] }) {
  return (
    <footer className="site-footer">
      <div className="fl-logo">
        <SLLogo width={28} height={24} />
        <div>
          <div className="fl-name">SOLIDLABS</div>
          <div className="fl-copy">© 2025 SolidLabs · Bengaluru · All rights reserved</div>
        </div>
      </div>
      {links.length > 0 && (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ fontFamily: 'var(--ff-mono)', fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--g3)', textDecoration: 'none', filter: 'brightness(5)' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </footer>
  )
}

// ── Section Header ──────────────────────────────────────
export function SectionHeader({ title, sub, className = '' }) {
  return (
    <div className={`sh rv ${className}`}>
      <h2 className="sh-t">{title}</h2>
      {sub && <span className="sh-s">{sub}</span>}
    </div>
  )
}

// ── Eyebrow label ───────────────────────────────────────
export function Eyebrow({ children, color = '' }) {
  return <div className={`eyebrow ${color}`}>{children}</div>
}
