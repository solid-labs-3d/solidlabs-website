import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { Ticker, Footer, SectionHeader } from "../components/Shared";
import { addToCart } from "../components/Cart";

const TICKER_ITEMS = [
  "SL Originals",
  "D2C Products",
  "Anyday · Anytime",
  "Bengaluru · India",
  "24h Turnaround",
  "PLA+ · PETG · ABS · TPU",
  "Precision B2B",
  "Extreme Engineering",
  "Electronics Assembly",
];

export default function Home() {
  const nav = useNavigate();
  useReveal();

  const goQuote = () => {
    window.scrollTo(0, 0);
    setTimeout(
      () =>
        document
          .getElementById("contact-sec")
          ?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  };

  return (
    <div className="page-home" style = {{marginTop: 15}}>
      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-bgmark">
          <svg
            width="520"
            height="480"
            viewBox="0 0 520 480"
            fill="none"
            opacity="1"
          >
            <polygon points="60,8 420,8 460,90 100,90" fill="#f05c1e" />
            <polygon points="40,140 400,140 440,222 80,222" fill="#c44820" />
            <polygon points="20,272 380,272 420,354 60,354" fill="#7a2e0f" />
            <polygon points="0,400 340,400 380,472 40,472" fill="#3d1608" />
          </svg>
        </div>
        <div className="hero-bgtext" aria-hidden="true">
          3D PRINTING · INNOVATION · BENGALURU · INDIA
        </div>
        <div className="hero-eye">
          Bengaluru, India · Precision 3D Printing Since 2024
        </div>
        <h1 className="hero-h1">
          SOLID
          <br />
          IDEAS.
          <br />
          <em>REAL FAST.</em>
        </h1>
        <div className="hero-bot">
          <p className="hero-desc">
            From CAD file to physical part in 24 hours. Consumer products
            shipped daily. Electronics assembled and tested. We make things —
            properly.
          </p>
          <div className="hero-btns">
            <button className="btn-or" onClick={() => nav("/originals")}>
              Shop Originals
            </button>
            <button className="btn-ghost" onClick={() => nav("/precision")}>
              B2B Precision →
            </button>
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker items={TICKER_ITEMS} bg="var(--or)" />

      {/* ── STATS ── */}
      <div className="stats-bar">
        {[
          {
            n: "12",
            s: "K+",
            l: "Parts Shipped",
            d: "Across India since launch",
          },
          {
            n: "98",
            s: "%",
            l: "First-Pass Accuracy",
            d: "Parts pass QC on first print",
          },
          { n: "24", s: "h", l: "Turnaround", d: "File to physical part" },
          { n: "7", s: "+", l: "Years R&D", d: "Precision 3D printing" },
        ].map((s, i) => (
          <div className={`sb-item rv d${i + 1}`} key={s.l}>
            <div className="sb-n">
              {s.n}
              <span>{s.s}</span>
            </div>
            <div className="sb-l">{s.l}</div>
            <div className="sb-d">{s.d}</div>
          </div>
        ))}
      </div>

      {/* ── WHAT WE BUILD ── */}
      <section className="sec-pad">
        <SectionHeader title="What We Build" sub="03 — Three Lines" />
        <div className="prod-grid">
          {[
            {
              cls: "or-card",
              n: "01 — D2C",
              name: "SL Originals",
              desc: "Designed products — keychains, desk organisers, hardware accessories, phone stands, cable managers, and more. Ready to ship in 2–3 days.",
              page: "/originals",
              accent: "var(--or)",
              btnLabel: "SHOP NOW →",
              specs: [
                { label: "SHIPS IN", value: "2-3 DAYS" },
                { label: "COLOURS", value: "14+" },
                { label: "MATERIAL", value: "PLA+/PETG" },
              ],
            },
            {
              cls: "yw-card",
              n: "02 — B2B",
              name: "Precision Print",
              desc: "Functional prototypes and production runs for engineers, startups, and product teams. Tight tolerances, multiple materials, fast delivery.",
              page: "/precision",
              accent: "var(--yw)",
              btnLabel: "GET QUOTE →",
              specs: [
                { label: "TOLERANCE", value: "±0.2MM" },
                { label: "BATCH", value: "1–500" },
                { label: "LEAD TIME", value: "24H–7D" },
              ],
            },
            {
              cls: "bl-card",
              n: "03 — EXTREME",
              name: "Extreme Eng.",
              desc: "Electronics sourcing, PCB enclosures, full assembly, IoT integration, jigs and fixtures. For engineers who need more than a print.",
              page: "/extreme",
              accent: "var(--bl)",
              btnLabel: "EXPLORE →",
              specs: [
                { label: "ELECTRONICS", value: "SOURCED" },
                { label: "FIRMWARE", value: "FLASHED" },
                { label: "ASSEMBLY", value: "TESTED" },
              ],
            },
          ].map((c) => (
            <div
              className={`prod-card ${c.cls} rv`}
              key={c.name}
              onClick={() => nav(c.page)}
              style={{ cursor: "pointer" }}
            >
              <div className="pc-num">{c.n}</div>

              <div className="pc-mark">
                <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
                  <polygon
                    points="10,2 68,2 76,20 18,20"
                    fill={c.accent}
                    opacity=".9"
                  />
                  <polygon
                    points="6,28 64,28 72,46 14,46"
                    fill={c.accent}
                    opacity=".6"
                  />
                  <polygon
                    points="2,54 60,54 68,72 10,72"
                    fill={c.accent}
                    opacity=".35"
                  />
                </svg>
              </div>

              <div className="pc-name">{c.name}</div>
              <p className="pc-desc">{c.desc}</p>

              <div className="pc-specs">
                {c.specs.map((sp) => (
                  <div className="pc-spec-item" key={sp.label}>
                    <span className="pc-spec-label">{sp.label}</span>
                    <span className="pc-spec-value" style={{ color: c.accent }}>
                      {sp.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="pc-btn"
                style={{ background: c.accent, color: "var(--blk)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  nav(c.page);
                }}
              >
                {c.btnLabel}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      {/* <section className="sec-pad" style={{ background: "var(--s1)" }}>
        <SectionHeader title="All Services" sub="Full Capability Stack" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 2,
            background: "var(--s2)",
          }}
        >
          {[
            {
              name: "FDM 3D Printing",
              tag: "Most Popular",
              route: "/learn",
              spec: "0.2mm layers · PLA+ PETG ABS TPU · 24h",
            },
            {
              name: "SLA Resin Printing",
              tag: "High Detail",
              route: "/sla-printing",
              spec: "0.05mm layers · Standard / Tough / Flex",
            },
            {
              name: "Injection Moulding",
              tag: "High Volume",
              route: "/injection-moulding",
              spec: "100+ units · ABS PP HDPE Nylon",
            },
            {
              name: "Vacuum Forming",
              tag: "Large Format",
              route: "/vacuum-forming",
              spec: "PETG ABS HIPS · Up to 600×400mm",
            },
            {
              name: "Carbon Fibre",
              tag: "Lightweight",
              route: "/carbon-fibre",
              spec: "CFRP · Hand layup · 1.5 g/cm³",
            },
            {
              name: "Extreme Engineering",
              tag: "R&D",
              route: "/extreme",
              spec: "Multi-material · Embedded electronics",
            },
          ].map((s) => (
            <div
              key={s.name}
              onClick={() => nav(s.route)}
              style={{
                background: "var(--blk)",
                padding: "40px 32px",
                cursor: "none",
                transition: "background .2s",
              }}
              className="rv"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--s1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--blk)")
              }
            >
              <div
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 8,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--or)",
                  marginBottom: 12,
                }}
              >
                {s.tag}
              </div>
              <div
                style={{
                  fontFamily: "var(--ff-cond)",
                  fontWeight: 800,
                  fontSize: 24,
                  marginBottom: 10,
                }}
              >
                {s.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 9,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--g3)",
                  borderTop: "1px solid var(--s2)",
                  paddingTop: 12,
                }}
              >
                {s.spec}
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── HOW IT WORKS ── */}
      <section className="sec-pad">
        <div className="how-header">
          <SectionHeader title="How It Works" />
          <button
            className="btn-full-guide"
            onClick={() => {
              window.scrollTo(0, 0);
              nav("/how-it-works");
            }}
          >
            FULL GUIDE →
          </button>
        </div>
        <div className="how-steps">
          {[
            {
              n: "01",
              t: "Upload File",
              d: "Send your STL, STEP, or describe what you need via WhatsApp.",
              Icon: () => (
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <rect
                    x="8"
                    y="6"
                    width="26"
                    height="34"
                    rx="2"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="14"
                    y1="16"
                    x2="28"
                    y2="16"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="14"
                    y1="23"
                    x2="28"
                    y2="23"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="14"
                    y1="30"
                    x2="22"
                    y2="30"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="30,28 36,34 30,40"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="36"
                    y1="34"
                    x2="24"
                    y2="34"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
            {
              n: "02",
              t: "Get Quote",
              d: "We respond with price, lead time, and material options within 2 hours.",
              Icon: () => (
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <rect
                    x="6"
                    y="10"
                    width="36"
                    height="24"
                    rx="3"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                  />
                  <rect
                    x="6"
                    y="10"
                    width="36"
                    height="8"
                    rx="3"
                    fill="var(--or)"
                    fillOpacity="0.2"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="12"
                    y1="26"
                    x2="22"
                    y2="26"
                    stroke="var(--or)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="30"
                    x2="18"
                    y2="30"
                    stroke="var(--or)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="28"
                    y="24"
                    width="8"
                    height="6"
                    rx="1"
                    stroke="var(--or)"
                    strokeWidth="2"
                  />
                </svg>
              ),
            },
            {
              n: "03",
              t: "We Print",
              d: "Your part is sliced, printed, and quality-checked against spec.",
              Icon: () => (
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <rect
                    x="10"
                    y="20"
                    width="28"
                    height="16"
                    rx="2"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                  />
                  <rect
                    x="16"
                    y="12"
                    width="16"
                    height="10"
                    rx="1"
                    stroke="var(--or)"
                    strokeWidth="2"
                  />
                  <line
                    x1="24"
                    y1="6"
                    x2="24"
                    y2="12"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="34" cy="28" r="2" fill="var(--or)" />
                  <line
                    x1="16"
                    y1="38"
                    x2="32"
                    y2="38"
                    stroke="var(--or)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="16"
                    y1="34"
                    x2="32"
                    y2="34"
                    stroke="var(--or)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <line
                    x1="16"
                    y1="30"
                    x2="32"
                    y2="30"
                    stroke="var(--or)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
              ),
            },
            {
              n: "04",
              t: "QC Check",
              d: "Every part is measured with digital calipers. Reject and reprint if out of spec.",
              Icon: () => (
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <rect
                    x="6"
                    y="14"
                    width="36"
                    height="20"
                    rx="2"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="6"
                    y1="22"
                    x2="42"
                    y2="22"
                    stroke="var(--or)"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                  <text
                    x="9"
                    y="35"
                    fontFamily="monospace"
                    fontSize="7"
                    fill="var(--or)"
                  >
                    ±0.2mm OK
                  </text>
                  <line
                    x1="14"
                    y1="8"
                    x2="14"
                    y2="14"
                    stroke="var(--or)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="24"
                    y1="8"
                    x2="24"
                    y2="14"
                    stroke="var(--or)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="34"
                    y1="8"
                    x2="34"
                    y2="14"
                    stroke="var(--or)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
            {
              n: "05",
              t: "Delivered",
              d: "Packaged and dispatched same day if confirmed before 2pm IST.",
              Icon: () => (
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <rect
                    x="4"
                    y="18"
                    width="28"
                    height="18"
                    rx="2"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M32 22 L44 22 L44 36 L32 36"
                    stroke="var(--or)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 26 L40 26 L44 30"
                    stroke="var(--or)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="14"
                    cy="38"
                    r="4"
                    stroke="var(--or)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="36"
                    cy="38"
                    r="4"
                    stroke="var(--or)"
                    strokeWidth="2"
                  />
                  <circle cx="14" cy="38" r="1.5" fill="var(--or)" />
                  <circle cx="36" cy="38" r="1.5" fill="var(--or)" />
                </svg>
              ),
            },
          ].map((s) => (
            <div className="how-step rv" key={s.n}>
              <div className="how-icon">
                <s.Icon />
              </div>
              <div className="how-step-n">{s.n}</div>
              <div className="how-step-t">{s.t}</div>
              <p className="how-step-d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT SPLIT ── */}
      <div id="about-home">
        {/* LEFT — orange panel */}
        <div className="ab-l rv">
          <div className="ab-eyebrow">SOLIDLABS · SINCE 2024</div>
          <div className="ab-big">
            EVERY SOLID OBJECT STARTED AS AN IDEA. WE CLOSE THAT GAP.
          </div>
          <div className="ab-founded">
            <div className="ab-year">2024</div>
            <div className="ab-fl">FOUNDED · BENGALURU GARAGE</div>
          </div>
        </div>

        {/* RIGHT — dark panel */}
        <div className="ab-r rv d1">
          <div className="ab-body">
            <p className="ab-txt">
              SolidLabs is a focused precision workshop. Not a marketplace, not
              an aggregator. <strong>We make things — properly.</strong> From
              consumer products to complex electronic assemblies, we handle it
              all in-house with a team of engineers who care.
            </p>
            <p className="ab-txt" style={{ marginTop: 24 }}>
              We don't outsource. We don't chase volume for its own sake. When
              you talk to us, you talk to the person who will make your part.
            </p>
          </div>

          <div className="stats-row">
            {[
              { n: "5", s: "+", l: "PRINTERS" },
              { n: "15", s: "+", l: "CLIENTS" },
              { n: "5", s: "+", l: "TEAM" },
              { n: "7K", s: "+", l: "PARTS" },
            ].map((s) => (
              <div className="si-item" key={s.l}>
                <div className="si-n">
                  {s.n}
                  <span className="si-plus">{s.s}</span>
                </div>
                <div className="si-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="sec-pad" style={{ background: "var(--s1)" }}>
        <SectionHeader
          title="What Clients Say"
          sub="Field Reports · Real Work"
        />
        <div className="rev-grid">
          {[
            {
              quote:
                "SolidLabs turned our CAD into working prototypes overnight. The quality was spot-on — we went straight from print to investor demo.",
              name: "Arjun Mehta",
              role: "CTO · Robotics Startup",
            },
            {
              quote:
                "We've tried 4 print services. SolidLabs is the only one that actually reads the brief. Tolerances were bang on for our PCB enclosures.",
              name: "Priya Nair",
              role: "Hardware Lead · IoT Company",
            },
            {
              quote:
                "Ordered a batch of 50 functional parts for our lab. Every single one passed QC. That's not normal — that's remarkable.",
              name: "Dr. Venkat R.",
              role: "Research Engineer · IISc",
            },
          ].map((r) => (
            <div className="rev-card rv" key={r.name}>
              <div className="rev-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="rev-star" />
                ))}
              </div>
              <p className="rev-txt">{r.quote}</p>
              <div className="rev-auth">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--or)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--ff-cond)",
                    fontWeight: 900,
                    fontSize: 20,
                    color: "var(--blk)",
                  }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="sec-pad" style={{ background: "var(--blk)" }}>
        <div className="tb-header">
          <SectionHeader title="Trusted By" />
          <div className="tb-sub">CLIENT PORTFOLIO · 340+ COMPANIES</div>
        </div>

        <div className="tb-grid">
          {[
            { n: "CLIENT 01", t: "IOT STARTUP" },
            { n: "CLIENT 02", t: "AERIAL SYSTEMS CO." },
            { n: "CLIENT 03", t: "INDUSTRIAL AUTOMATION CO." },
            { n: "CLIENT 04", t: "D2C HARDWARE BRAND" },
            { n: "CLIENT 05", t: "MEDTECH STARTUP" },
            { n: "CLIENT 06", t: "ROBOTICS TEAM" },
            { n: "CLIENT 07", t: "CONSUMER GOODS CO." },
            { n: "CLIENT 08", t: "TECH COMPANY BLR" },
            { n: "CLIENT 09", t: "ENGINEERING CONSULTANCY" },
            { n: "CLIENT 10", t: "UAV SYSTEMS" },
            { n: "CLIENT 11", t: "DESIGN STUDIO" },
            { n: "CLIENT 12", t: "ROBOTICS COMPETITION" },
          ].map((c) => (
            <div className="tb-cell rv" key={c.n}>
              <div className="tb-name">{c.n}</div>
              <div className="tb-type">{c.t}</div>
            </div>
          ))}
        </div>

        <div className="tb-footer">
          340+ CLIENTS · STARTUPS · ENTERPRISES · RESEARCH LABS · D2C BRANDS
        </div>
      </section>

      {/* ── SUPPORT ── */}
      {/* ── SUPPORT ── */}
      <section id="support">
        {/* Top row */}
        <div className="support-top">
          <div className="support-top-l">
            <div className="support-eyebrow">ALWAYS ON · SUPPORT</div>
            <div className="support-headline rv">
              ANYDAY,
              <br />
              <em>ANYTIME</em>
              <br />
              WE ARE
              <br />
              HERE.
            </div>
          </div>
          <div className="support-top-r">
            <button className="btn-full-guide" onClick={() => nav("/learn")}>
              EXTENDED SUPPORT →
            </button>
            <div className="support-clock">
              <svg width="150" height="150" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#f05c1e"
                  strokeWidth="3"
                  fill="none"
                />
                {/* hour hand — static */}
                <line
                  x1="60"
                  y1="60"
                  x2="80"
                  y2="60"
                  stroke="#f0ede6"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 60 60"
                    to="360 60 60"
                    dur="6s"
                    repeatCount="indefinite"
                  />{" "}
                </line>
                {/* minute hand — rotates */}
                <line
                  x1="60"
                  y1="60"
                  x2="88"
                  y2="60"
                  stroke="#f0ede6"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="90 60 60"
                    to="450 60 60"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </line>
                <circle cx="60" cy="60" r="4" fill="#f05c1e" />
              </svg>
            </div>
            <p className="support-clock-desc">
              We don't clock out. When you need us — before a launch, after
              midnight, over the weekend — we're here.
            </p>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="support-grid">
          {[
            {
              t: "Extended Hours",
              d: "Far beyond standard business hours. We're available throughout your project at every stage.",
              h: "Mon–Sat · 8am – 10pm IST",
              Icon: () => (
                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                  />
                  <line
                    x1="12"
                    y1="12"
                    x2="12"
                    y2="7"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="12"
                    x2="16"
                    y2="12"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
            {
              t: "Direct Response",
              d: "No ticketing hell. A real engineer who knows your project responds within the hour.",
              h: "Avg response · <60 min",
              Icon: () => (
                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="13"
                    rx="2"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                  />
                  <line
                    x1="3"
                    y1="10"
                    x2="21"
                    y2="10"
                    stroke="#f05c1e"
                    strokeWidth="1.2"
                    opacity="0.5"
                  />
                  <line
                    x1="7"
                    y1="14"
                    x2="13"
                    y2="14"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
            {
              t: "Free Revisions",
              d: "If a print doesn't meet spec, we reprint it. No questions, no extra charges.",
              h: "Reprints within · 12 hours",
              Icon: () => (
                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                  <path
                    d="M4 12 A8 8 0 1 1 12 20"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="4,8 4,12 8,12"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              t: "Pan-India Reach",
              d: "Shipping to every pin code. Same-day dispatch for orders confirmed before 2pm IST.",
              h: "Same-day dispatch · Before 2pm",
              Icon: () => (
                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 2 C7 2 4 6 4 10 C4 16 12 22 12 22 C12 22 20 16 20 10 C20 6 17 2 12 2Z"
                    stroke="#f05c1e"
                    strokeWidth="1.8"
                  />
                </svg>
              ),
            },
          ].map((s) => (
            <div className="sg-item rv" key={s.t}>
              <div className="sg-icon">
                <s.Icon />
              </div>
              <div className="sg-title">{s.t}</div>
              <div className="sg-desc">{s.d}</div>
              <div className="sg-hours">{s.h}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      {/* ── CTA ── */}
      {/* ── PROMISE BAR ── */}
      <section id="cta-promise">
        <div className="cta-top">
          <div className="cta-top-l">
            <div className="cta-eyebrow">OUR PROMISE</div>
            <h3 className="cta-promise">
              Anyday, Anytime — we are here to <br></br> support you, always.
            </h3>
          </div>
          <div className="cta-top-r">
            <svg width="64" height="56" viewBox="0 0 80 72" fill="none">
              <polygon
                points="10,2 68,2 76,20 18,20"
                fill="var(--or)"
                opacity=".35"
              />
              <polygon
                points="6,28 64,28 72,46 14,46"
                fill="var(--or)"
                opacity=".2"
              />
              <polygon
                points="2,54 60,54 68,72 10,72"
                fill="var(--or)"
                opacity=".08"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta-band">
        <div className="cta-main">
          <h2 className="cta-h rv">
            START YOUR
            <br />
            <em>BUILD.</em>
          </h2>
          <p className="cta-s rv d1">
            Upload a file or describe what you need. We respond within 2<br />
            hours with a quote — anyday, anytime.
          </p>
          <div className="cta-btns rv d2">
            <button className="btn-or" onClick={goQuote}>
              SEND A FILE
            </button>
            <button className="btn-ghost" onClick={() => nav("/contact")}>
              [EMAIL PROTECTED]
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      {/* ── CONTACT ── */}
      <div id="contact-sec">
        {/* LEFT */}
        <div className="con-l">
          <h2 className="con-t rv">
            GET IN
            <br />
            TOUCH
          </h2>

          <div className="con-det rv d1">
            <div className="cd-l">EMAIL</div>
            <a className="cd-v" href="mailto:hello@solidlabs.in">
              [email protected]
            </a>
          </div>

          <div className="con-det rv d2">
            <div className="cd-l">PHONE / WHATSAPP</div>
            <a className="cd-v" href="https://wa.me/919876543210">
              +91 98765 43210
            </a>
          </div>

          <div className="con-det rv d3">
            <div className="cd-l">LOCATION</div>
            <span className="cd-v">Bengaluru, Karnataka, India</span>
          </div>

          <div className="con-det rv d4">
            <div className="cd-l">SUPPORT HOURS</div>
            <span className="cd-v" style={{ color: "var(--or)" }}>
              Anyday · 8am – 10pm IST
            </span>
          </div>

          <p className="con-note rv d5">
            You'll hear from a real engineer, not a bot. We review every file
            before printing and flag any issues upfront — that's how we maintain
            98% first-pass accuracy.
          </p>
        </div>

        {/* RIGHT */}
        <div className="con-r">
          <div className="con-r-eyebrow">SEND A MESSAGE</div>

          <div className="ff">
            <label className="fl">NAME</label>
            <input className="fi" type="text" placeholder="Your name" />
          </div>

          <div className="ff">
            <label className="fl">EMAIL</label>
            <input className="fi" type="email" placeholder="you@company.com" />
          </div>

          <div className="ff">
            <label className="fl">PROJECT BRIEF</label>
            <textarea
              className="ft"
              placeholder="Describe your part, quantity, material, timeline..."
            />
          </div>

          <div className="ff">
            <label className="fl">UPLOAD FILE (STL, STEP, OBJ, PDF, PNG)</label>
            <div
              id="fup"
              onClick={() => document.getElementById("file-inp").click()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginBottom: 8 }}
              >
                <line
                  x1="12"
                  y1="16"
                  x2="12"
                  y2="4"
                  stroke="var(--g3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polyline
                  points="8,8 12,4 16,8"
                  stroke="var(--g3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4"
                  y1="20"
                  x2="20"
                  y2="20"
                  stroke="var(--g3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="fup-label">DROP FILE OR CLICK TO UPLOAD</div>
              <input
                type="file"
                accept=".stl,.step,.obj,.pdf,.png"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (f)
                    document.getElementById("fup").style.borderColor =
                      "#f05c1e";
                }}
                style={{ display: "none" }}
                id="file-inp"
              />
            </div>
          </div>

          <button
            className="fsub"
            onClick={(e) => {
              e.target.textContent = "Sent! We'll reply within 2 hours →";
              e.target.style.background = "#22cc44";
            }}
          >
            SEND MESSAGE →
          </button>
        </div>
      </div>

      <Footer
        links={[
          { label: "Privacy", href: "#" },
          { label: "Instagram", href: "#" },
          { label: "LinkedIn", href: "#" },
        ]}
      />
    </div>
  );
}
