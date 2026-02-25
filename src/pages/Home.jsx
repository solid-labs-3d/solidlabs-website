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
    <div className="page-home">
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
          Bengaluru, India · Precision 3D Printing Since 2018
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
              desc: "Consumer products designed, printed, and shipped from our studio. Smart desk accessories, home organizers, maker tools.",
              page: "/originals",
              accent: "var(--or)",
            },
            {
              cls: "yw-card",
              n: "02 — B2B",
              name: "Precision B2B",
              desc: "High-tolerance FDM parts for startups, R&D labs, and OEMs. NDA-ready. 0.1mm tolerances. Weekly batch deliveries.",
              page: "/precision",
              accent: "var(--yw)",
            },
            {
              cls: "bl-card",
              n: "03 — R&D",
              name: "Extreme Eng.",
              desc: "Prototype rigs, multi-material assemblies, embedded electronics, load-bearing structures. When ordinary isn't enough.",
              page: "/extreme",
              accent: "var(--bl)",
            },
          ].map((c) => (
            <div
              className={`prod-card ${c.cls} rv`}
              key={c.name}
              onClick={() => nav(c.page)}
              style={{ cursor: "none" }}
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
              <button
                className="btn-or"
                style={{ background: c.accent, color: "var(--blk)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  nav(c.page);
                }}
              >
                Explore →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="sec-pad" style={{ background: "var(--s1)" }}>
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
      </section>

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
        <div className="ab-l rv">
          <div>
            <div className="ab-big">
              BUILT IN
              <br />
              BENGALURU.
            </div>
            <div className="ab-sn" style={{ marginTop: 16 }}>
              Since 2018
            </div>
            <div className="ab-sl">7+ Years of Precision Manufacturing</div>
          </div>
          <div>
            <button
              className="btn-ghost"
              style={{ borderColor: "rgba(0,0,0,.3)", color: "var(--blk)" }}
              onClick={() => nav("/about")}
            >
              Our Story →
            </button>
          </div>
        </div>
        <div className="ab-r rv d1">
          <p className="ab-txt">
            SolidLabs started in a garage with one printer and a stubborn idea:{" "}
            <strong>
              quality manufacturing shouldn't need a factory floor.
            </strong>
            Today we run 24 hours a day, shipping to startups, research labs,
            and makers across India.
          </p>
          <div className="stats-row">
            {[
              { n: "12K+", l: "Parts Shipped" },
              { n: "98%", l: "First-Pass QC" },
              { n: "24h", l: "Turnaround" },
            ].map((s) => (
              <div key={s.l}>
                <div className="si-n">{s.n}</div>
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

      {/* ── SUPPORT ── */}
      <section id="support">
        <div className="support-headline rv">
          ANYDAY,
          <br />
          <em>ANYTIME</em>
          <br />
          WE ARE HERE.
        </div>
        <div className="support-grid">
          {[
            {
              t: "WhatsApp Direct",
              d: "Message us directly. Real engineers, not bots.",
              h: "Mon–Sun · 7am–11pm",
            },
            {
              t: "Email Support",
              d: "2-hour response SLA on all technical queries.",
              h: "Always On",
            },
            {
              t: "File Review",
              d: "We check your design before printing. No surprise failures.",
              h: "Free",
            },
            {
              t: "Anytime",
              d: "Emergency prints and urgent orders accepted at any hour.",
              h: "24/7 · Always",
              clock: true,
            },
          ].map((s) => (
            <div className="sg-item rv" key={s.t}>
              {s.clock && (
                <div className="clock-ring" style={{ marginBottom: 8 }}>
                  <svg width="60" height="60" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      stroke="#1e1e1e"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M60 14 A46 46 0 1 1 59.99 14"
                      stroke="#f05c1e"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="290 290"
                    />
                    <line
                      x1="60"
                      y1="60"
                      x2="60"
                      y2="28"
                      stroke="#f0ede6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="60"
                      y1="60"
                      x2="88"
                      y2="60"
                      stroke="#f0ede6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="60" cy="60" r="4" fill="#f05c1e" />
                    <line
                      x1="60"
                      y1="18"
                      x2="60"
                      y2="24"
                      stroke="#555"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              )}
              <div className="sg-title">{s.t}</div>
              <div className="sg-desc">{s.d}</div>
              <div className="sg-hours">{s.h}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta-band">
        <h2 className="cta-h rv">
          READY TO
          <br />
          <em>BUILD?</em>
        </h2>
        <p className="cta-s rv d1">
          Upload your file, get a quote in 2 hours, receive your part the next
          day. It really is that simple.
        </p>
        <div className="cta-btns rv d2">
          <button className="btn-or" onClick={goQuote}>
            Get a Quote →
          </button>
          <button className="btn-ghost" onClick={() => nav("/learn")}>
            How It Works
          </button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <div id="contact-sec">
        <div className="con-l">
          <h2 className="con-t rv">
            LET'S BUILD
            <br />
            SOMETHING.
          </h2>
          <div className="con-det rv d1">
            <div className="cd-l">Email</div>
            <a className="cd-v" href="mailto:hello@solidlabs.in">
              hello@solidlabs.in
            </a>
          </div>
          <div className="con-det rv d2">
            <div className="cd-l">WhatsApp</div>
            <a className="cd-v" href="https://wa.me/919800000000">
              +91 98000 00000
            </a>
          </div>
          <div className="con-det rv d3">
            <div className="cd-l">Location</div>
            <span className="cd-v">Bengaluru, Karnataka 560001</span>
          </div>
        </div>
        <div className="con-r">
          <div className="ff">
            <label className="fl">Your Name</label>
            <input className="fi" type="text" placeholder="Ravi Kumar" />
          </div>
          <div className="ff">
            <label className="fl">Email</label>
            <input className="fi" type="email" placeholder="ravi@startup.in" />
          </div>
          <div className="ff">
            <label className="fl">Project Brief</label>
            <textarea
              className="ft"
              placeholder="Describe your part — material, quantity, deadline…"
            />
          </div>
          <div className="ff">
            <label className="fl">Attach File (STL / STEP)</label>
            <div id="fup">
              <div
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 9,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--g3)",
                  marginBottom: 8,
                }}
              >
                Drag & drop your file here
              </div>
              <input
                type="file"
                accept=".stl,.step,.obj,.3mf"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (f)
                    document.getElementById("fup").style.borderColor =
                      "#f05c1e";
                }}
                style={{ display: "none" }}
                id="file-inp"
              />
              <label
                htmlFor="file-inp"
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 8,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--or)",
                  cursor: "pointer",
                }}
              >
                Or click to browse
              </label>
            </div>
          </div>
          <button
            className="fsub"
            onClick={(e) => {
              e.target.textContent = "Sent! We'll reply within 2 hours →";
              e.target.style.background = "#22cc44";
            }}
          >
            Send Request →
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
