import { useReveal } from "../hooks/useReveal";

const VALUES = [
  {
    title: "No Compromise",
    desc: "Every part leaves our facility having passed inspection. We don't ship parts we wouldn't sign our name to. If it's not right, we reprint it — no questions.",
    accent: "var(--blk)",
    bg: "var(--blk)",
    titleColor: "var(--wht)",
    descColor: "var(--g5)",
    barColor: "var(--or)",
  },
  {
    title: "Speed Matters",
    desc: "A part that arrives a week late might as well not exist. 24h turnaround isn't marketing — it's our standard operating procedure. We've built the operation around it.",
    accent: "var(--blk)",
    bg: "var(--blk)",
    titleColor: "var(--wht)",
    descColor: "var(--g5)",
    barColor: "var(--or)",
  },
  {
    title: "Real Engineers",
    desc: "When you contact us, you talk to an engineer. We review your file, flag issues before printing, and tell you the truth about what will and won't work.",
    accent: "var(--blk)",
    bg: "var(--blk)",
    titleColor: "var(--wht)",
    descColor: "var(--g5)",
    barColor: "var(--or)",
  },
  {
    title: "Anyday. Anytime.",
    desc: "We don't believe engineers only have emergencies 9 to 5. When your launch is tomorrow and something breaks tonight, we are here. That's not a policy — it's a promise.",
    accent: "var(--or)",
    bg: "var(--or)",
    titleColor: "var(--blk)",
    descColor: "rgba(0,0,0,.5)",
    barColor: "var(--blk)",
  },
];

const FACILITY_ZONES = [
  {
    title: "FDM Print Floor",
    color: "var(--or)",
    desc: "5+ printers running simultaneously. Enclosed machines for ABS and Nylon. Climate-controlled room below 15% filament humidity.",
  },
  {
    title: "Electronics Bench",
    color: "var(--orm)",
    desc: "Soldering station, hot air rework, oscilloscope, wire harness tools. We assemble, test, and firmware-flash complete electronic units in-house.",
  },
  {
    title: "QC Station",
    color: "var(--ord)",
    desc: "Digital caliper measurement, photographic documentation, and functional test for every mechanical assembly. All before dispatch.",
  },
  {
    title: "Finishing Bay",
    color: "var(--s4)",
    desc: "Spray booth with RAL colour matching. Primer, filler, topcoat. Parts indistinguishable from injection moulded finish for presentation-grade deliverables.",
  },
];

const FACILITY_STATS = [
  {
    n: "5+",
    l: "FDM Printers",
    bg: "var(--blk)",
    nc: "var(--wht)",
    lc: "var(--g3)",
    ac: "var(--or)",
  },
  {
    n: "1k",
    l: "sq ft Facility",
    bg: "var(--blk)",
    nc: "var(--wht)",
    lc: "var(--g3)",
    ac: "var(--or)",
  },
  {
    n: "4",
    l: "Specialised Zones",
    bg: "var(--blk)",
    nc: "var(--wht)",
    lc: "var(--g3)",
    ac: "var(--or)",
  },
  {
    n: "BLR",
    l: "Based · India",
    bg: "var(--or)",
    nc: "var(--blk)",
    lc: "rgba(0,0,0,.4)",
  },
];

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

export default function About() {
  useReveal();
  const isMobile = window.innerWidth <= 720;

  return (
    <div style={{ background: "var(--blk)" }}>
      {/* HERO */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "140px 48px 68px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--s2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 60% 40%,rgba(240,92,30,.07),transparent 70%)",
          }}
        />
        {/* Decorative mark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "3%",
            transform: "translateY(-50%)",
            opacity: 0.04,
          }}
        >
          <svg width="500" height="460" viewBox="0 0 500 460" fill="none">
            <polygon points="60,8 420,8 460,90 100,90" fill="#f05c1e" />
            <polygon points="40,140 400,140 440,222 80,222" fill="#c44820" />
            <polygon points="20,272 380,272 420,354 60,354" fill="#7a2e0f" />
            <polygon points="0,400 340,400 380,472 40,472" fill="#3d1608" />
          </svg>
        </div>
         <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <LogoMark size={25} colors={["#f05c1e", "#c44820", "#7a2e0f"]} />
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
            ABOUT
            <em style={{ fontStyle: "normal", color: "#f05c1e" }}>-US</em>
          </span>
        </div>
        <div className="eyebrow or rv" style={{ position: "relative" }}>
          About — Our Story
        </div>
        <h1
          className="rv d1"
          style={{
            fontFamily: "var(--ff-cond)",
            fontWeight: 900,
            fontSize: "clamp(64px,12vw,148px)",
            lineHeight: 0.85,
            letterSpacing: ".01em",
            marginBottom: 28,
            position: "relative",
          }}
        >
          BUILT ON
          <br />
          <em style={{ fontStyle: "italic", color: "var(--or)" }}>SOLID</em>
          <br />
          GROUND.
        </h1>
        <p
          className="rv d2"
          style={{
            fontSize: 15,
            color: "var(--g5)",
            maxWidth: 580,
            lineHeight: 1.8,
            fontWeight: 300,
            position: "relative",
          }}
        >
          Not a marketplace. Not a service aggregator. A focused workshop —
          obsessed with precision, speed, and the satisfaction of making real
          things.
        </p>
      </section>

      {/* MANIFESTO SPLIT */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "70vh",
          borderBottom: "1px solid var(--s2)",
        }}
      >
        <div className="ab-l rv">
          <div>
            <div
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "8.5px",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,.35)",
                marginBottom: 22,
              }}
            >
              01 — Our Belief
            </div>
            <h2
              style={{
                fontFamily: "var(--ff-cond)",
                fontWeight: 900,
                fontSize: "clamp(36px,5vw,60px)",
                lineHeight: 0.92,
                letterSpacing: ".01em",
                color: "var(--blk)",
              }}
            >
              EVERY SOLID OBJECT STARTED AS AN IDEA.
              <br />
              WE CLOSE THAT GAP.
            </h2>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--ff-cond)",
                fontWeight: 900,
                fontSize: 52,
                color: "var(--blk)",
                lineHeight: 1,
              }}
            >
              2024
            </div>
            <div
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 8,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,.4)",
              }}
            >
              Founded in Bengaluru
            </div>
          </div>
        </div>

        <div className="ab-r rv d1">
          <div>
            <div className="eyebrow" style={{ color: "var(--g3)" }}>
              Who We Are
            </div>
            <p className="ab-txt" style={{ marginTop: 18 }}>
              SolidLabs started in a Bengaluru garage in 2024 with one printer
              and one client. Today we run a facility with 5+ production
              printers, a full electronics assembly bench, and a small but
              deeply expert team of engineers and designers.
              <br />
              <br />
              We serve three kinds of people: <strong>engineers</strong> who
              need precision parts fast, <strong>makers</strong> who want to see
              their ideas solid, and <strong>everyday people</strong> who
              deserve products designed with real care.
              <br />
              <br />
              We don't outsource. We take fewer orders than we could — so every
              one gets the attention it deserves.
            </p>
          </div>
          <div className="stats-row">
            {[
              { n: "5+", l: "Printers" },
              { n: "2+", l: "Years" },
              { n: "15+", l: "Clients" },
              { n: "5+", l: "Team" },
            ].map((s) => (
              <div key={s.l}>
                <div className="si-n">
                  {s.n.replace("+", "")}
                  <span style={{ color: "var(--or)" }}>+</span>
                </div>
                <div className="si-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="sec-pad" style={{ background: "var(--blk)" }}>
        <div className="sh rv">
          <h2 className="sh-t">What We Stand For</h2>
          <span className="sh-s">03 — Values</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 2,
            background: "var(--s2)",
          }}
        >
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              style={{
                background: v.bg,
                padding: "44px 28px",
                cursor: "none",
                transition: "background .2s",
              }}
              className={`rv d${i}`}
              onMouseEnter={(e) => {
                if (v.bg === "var(--blk)")
                  e.currentTarget.style.background = "#141414";
              }}
              onMouseLeave={(e) => {
                if (v.bg === "var(--blk)")
                  e.currentTarget.style.background = "var(--blk)";
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 2,
                  background: v.barColor,
                  marginBottom: 24,
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--ff-cond)",
                  fontWeight: 900,
                  fontSize: 26,
                  marginBottom: 12,
                  color: v.titleColor,
                }}
              >
                {v.title}
              </h3>
              <p style={{ fontSize: 13, color: v.descColor, lineHeight: 1.75 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FACILITY */}
      <section
        className="sec-pad"
        style={{ background: "var(--s1)", borderTop: "1px solid var(--s2)" }}
      >
        <div className="sh rv">
          <h2 className="sh-t">The Facility</h2>
          <span className="sh-s">04 — Where We Work</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "start",
          }}
          className="rv"
        >
          {/* Zones list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {FACILITY_ZONES.map((z) => (
              <div
                key={z.title}
                style={{ borderLeft: `2px solid ${z.color}`, paddingLeft: 20 }}
              >
                <div
                  style={{
                    fontFamily: "var(--ff-cond)",
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 6,
                  }}
                >
                  {z.title}
                </div>
                <p
                  style={{ fontSize: 13, color: "var(--g5)", lineHeight: 1.7 }}
                >
                  {z.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stats grid + blurb */}
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                background: "var(--s2)",
              }}
            >
              {FACILITY_STATS.map((s) => (
                <div
                  key={s.l}
                  style={{ background: s.bg, padding: "28px 20px" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--ff-cond)",
                      fontWeight: 900,
                      fontSize: 44,
                      lineHeight: 1,
                      color: s.nc,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 8,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: s.lc,
                      marginTop: 6,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--g5)",
                lineHeight: 1.7,
                marginTop: 24,
              }}
            >
              We're not a distributed fulfilment network or an outsourcing
              layer. Everything happens under one roof, with one team,
              accountable to the same quality bar.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{ background: "var(--blk)", borderTop: "1px solid var(--s2)" }}
      >
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
            © 2026 SolidLabs · Bengaluru · Founded 2024 · Anyday, Anytime.
          </div>
        </div>
      </footer>
    </div>
  );
}
