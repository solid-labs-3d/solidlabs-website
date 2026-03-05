import { useState, useEffect, useRef } from "react";
import { useReveal } from "../hooks/useReveal";

/* ── Printer animation hook ───────────────────── */
function usePrinterAnimation(running) {
  const svgRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({
    x: 148,
    dir: 1,
    layerCount: 0,
    layerY: 162,
    pct: 0,
  });

  useEffect(() => {
    if (!running || !svgRef.current) return;

    const svg = svgRef.current;
    const layersGroup = svg.querySelector("#print-layers");
    const s = stateRef.current;

    // Pre-seed 8 layers
    for (let i = 0; i < 8; i++) {
      const ly = s.layerY - i * 4;
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      rect.setAttribute("x", "30");
      rect.setAttribute("y", String(ly));
      rect.setAttribute("width", "260");
      rect.setAttribute("height", "3");
      rect.setAttribute("fill", i % 2 === 0 ? "#f05c1e" : "#c44820");
      rect.setAttribute("opacity", String(0.5 + i * 0.05));
      layersGroup.appendChild(rect);
      s.layerCount++;
    }

    animRef.current = setInterval(() => {
      s.x += s.dir * 3;
      if (s.x > 226 || s.x < 30) {
        s.dir *= -1;
        const ly = s.layerY - s.layerCount * 4;
        if (ly > 40) {
          const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
          );
          rect.setAttribute("x", "30");
          rect.setAttribute("y", String(ly));
          rect.setAttribute("width", "260");
          rect.setAttribute("height", "3");
          rect.setAttribute(
            "fill",
            s.layerCount % 2 === 0 ? "#f05c1e" : "#c44820",
          );
          rect.setAttribute("opacity", "0.9");
          layersGroup.appendChild(rect);
          s.layerCount++;
        }
      }
      const nb = svg.querySelector("#nozzle-body");
      const nt = svg.querySelector("#nozzle-tip");
      const nd = svg.querySelector("#nozzle-dot");
      if (nb) nb.setAttribute("x", String(s.x));
      if (nt)
        nt.setAttribute(
          "points",
          `${s.x + 7},68 ${s.x + 21},68 ${s.x + 18},76 ${s.x + 10},76`,
        );
      if (nd) nd.setAttribute("cy", String(s.layerY - s.layerCount * 4 + 2));
    }, 40);

    return () => clearInterval(animRef.current);
  }, [running]);

  return svgRef;
}

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

/* ── Progress counter hook ────────────────────── */
function useProgressCounter(running) {
  const [pct, setPct] = useState(67);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(
      () => setPct((p) => Math.min(100, parseFloat((p + 0.08).toFixed(1)))),
      150,
    );
    return () => clearInterval(t);
  }, [running]);
  return pct;
}

/* ── Camera tab ───────────────────────────────── */
function CamTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        fontFamily: "var(--ff-mono)",
        fontSize: "7.5px",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        padding: 9,
        background: active ? "var(--or)" : "var(--s1)",
        color: active ? "var(--blk)" : "var(--g4)",
        border: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

export default function Stream() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [password, setPassword] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [activeCam, setActiveCam] = useState("Front View");
  useReveal();

  const svgRef = usePrinterAnimation(loggedIn);
  const pct = useProgressCounter(loggedIn);

  const connect = () => {
    if (!orderId.trim() || !password.trim()) {
      setShowErr(true);
      return;
    }
    setShowErr(false);
    setLoggedIn(true);
  };

  const disconnect = () => {
    setLoggedIn(false);
    setOrderId("");
    setPassword("");
  };

  const CAMS = ["Front View", "Top View", "Side View", "Nozzle Cam"];

  return (
    <div style={{ background: "var(--blk)" }}>
      {/* HERO */}
      <section
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "130px 48px 60px",
          position: "relative",
          borderBottom: "1px solid var(--s2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%,rgba(240,92,30,.05),transparent 70%)",
          }}
        />
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
            }}
          >
            LIVE
            <em style={{ fontStyle: "normal", color: "#f05c1e" }}>-STREM</em>
          </span>
        </div>
        <div className="eyebrow or rv" style={{ position: "relative" }}>
          06 — Live Stream · Track Your Print
        </div>
        <h1
          className="rv d1"
          style={{
            fontFamily: "var(--ff-cond)",
            fontWeight: 900,
            fontSize: "clamp(60px,11vw,130px)",
            lineHeight: 0.85,
            position: "relative",
          }}
        >
          YOUR
          <br />
          <em style={{ fontStyle: "italic", color: "var(--or)" }}>
            PRINT. LIVE.
          </em>
        </h1>
        <p
          className="rv d2"
          style={{
            fontSize: 14,
            color: "var(--g5)",
            maxWidth: 480,
            lineHeight: 1.8,
            fontWeight: 300,
            position: "relative",
          }}
        >
          Enter your order ID and password to watch your part being printed in
          real-time. Updated every 5 minutes.
        </p>
      </section>

      {/* STREAM SECTION */}
      <section className="sec-pad">
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {/* ── LOGIN PANEL ── */}
          {!loggedIn && (
            <div
              style={{
                background: "var(--s1)",
                border: "1px solid var(--s2)",
                padding: 40,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: "8.5px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--g3)",
                  marginBottom: 28,
                }}
              >
                Stream Access
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div className="ff">
                  <label className="fl">Order ID</label>
                  <input
                    className="fi"
                    type="text"
                    placeholder="SL-2025-####"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && connect()}
                  />
                </div>
                <div className="ff">
                  <label className="fl">Password</label>
                  <input
                    className="fi"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && connect()}
                  />
                </div>
              </div>
              {showErr && (
                <div
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 8,
                    color: "#ff4422",
                    marginBottom: 12,
                  }}
                >
                  Invalid credentials — contact support.
                </div>
              )}
              <button className="btn-or" onClick={connect}>
                Connect to Stream →
              </button>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--g3)",
                  marginTop: 16,
                  lineHeight: 1.65,
                }}
              >
                Your order ID and password are included in your order
                confirmation email. Stream goes live once your print starts.
              </p>
            </div>
          )}

          {/* ── STREAM VIEW ── */}
          {loggedIn && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Top bar */}
              <div
                style={{
                  background: "var(--s1)",
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      background: "rgba(200,0,0,.92)",
                      padding: "5px 12px",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        background: "#fff",
                        borderRadius: "50%",
                        animation: "ldot 1.4s ease infinite",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 8,
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "#fff",
                      }}
                    >
                      LIVE
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: "8.5px",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--g3)",
                      border: "1px solid var(--s2)",
                      padding: "5px 10px",
                    }}
                  >
                    {orderId}
                  </div>
                </div>
                <button
                  onClick={disconnect}
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: "7.5px",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    background: "var(--s2)",
                    color: "var(--g4)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Disconnect
                </button>
              </div>

              {/* Printer viewport */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                  background: "#050505",
                  border: "1px solid var(--s2)",
                  overflow: "hidden",
                }}
              >
                {/* Scanlines overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.15) 3px,rgba(0,0,0,.15) 4px)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    ref={svgRef}
                    id="stream-svg"
                    width="320"
                    height="220"
                    viewBox="0 0 320 220"
                    fill="none"
                  >
                    <rect
                      x="10"
                      y="10"
                      width="300"
                      height="200"
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="1"
                    />
                    <rect
                      x="30"
                      y="170"
                      width="260"
                      height="8"
                      rx="1"
                      fill="#1e1e1e"
                    />
                    <g id="print-layers" />
                    <rect
                      id="xrod"
                      x="30"
                      y="60"
                      width="260"
                      height="4"
                      rx="2"
                      fill="#2a2a2a"
                    />
                    <g id="nozzle-group">
                      <rect
                        id="nozzle-body"
                        x="148"
                        y="52"
                        width="24"
                        height="16"
                        rx="1"
                        fill="#333"
                      />
                      <polygon
                        id="nozzle-tip"
                        points="155,68 169,68 166,76 158,76"
                        fill="#f05c1e"
                      />
                      <circle
                        id="nozzle-dot"
                        cx="162"
                        cy="78"
                        r="3"
                        fill="#f05c1e"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Camera tabs */}
              <div style={{ display: "flex", gap: 2, background: "var(--s2)" }}>
                {CAMS.map((c) => (
                  <CamTab
                    key={c}
                    label={c}
                    active={activeCam === c}
                    onClick={() => setActiveCam(c)}
                  />
                ))}
              </div>

              {/* Print stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5,1fr)",
                  gap: 2,
                  background: "var(--s2)",
                }}
              >
                {[
                  { l: "Material", v: "PLA+ Orange", c: "var(--or)" },
                  { l: "Layer H.", v: "0.20mm", c: "var(--wht)" },
                  { l: "Progress", v: `${pct}%`, c: "var(--or)" },
                  { l: "ETA", v: "1h 24m", c: "var(--wht)" },
                  { l: "Nozzle", v: "215°C", c: "#ff6644" },
                ].map((s) => (
                  <div
                    key={s.l}
                    style={{ background: "var(--blk)", padding: "12px 14px" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 7,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--g3)",
                        marginBottom: 4,
                      }}
                    >
                      {s.l}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 10,
                        color: s.c,
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ background: "var(--blk)", padding: "16px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: "7.5px",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--g3)",
                    }}
                  >
                    Print Progress
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: "7.5px",
                      color: "var(--or)",
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <div style={{ height: 3, background: "var(--s2)" }}>
                  <div
                    style={{
                      height: "100%",
                      background: "var(--or)",
                      width: `${pct}%`,
                      transition: "width 2s ease",
                    }}
                  />
                </div>
              </div>

              {/* WhatsApp support bar */}
              <div
                style={{
                  marginTop: 2,
                  padding: "14px 20px",
                  background: "var(--s1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--g5)" }}>
                  Need help with your print?
                </span>
                <a
                  href="https://wa.me/919876543210"
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 8,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    padding: "9px 16px",
                    background: "#25d366",
                    color: "#000",
                    textDecoration: "none",
                  }}
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          )}
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
            © 2025 SolidLabs · Live Stream · Bengaluru
          </div>
        </div>
      </footer>
    </div>
  );
}
