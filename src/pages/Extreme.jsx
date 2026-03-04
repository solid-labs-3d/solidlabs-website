import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

/* ────────────────────────────────────────────────
   Animated capability bars on scroll
──────────────────────────────────────────────── */
function useCapabilityBars() {
  useEffect(() => {
    const fills = document.querySelectorAll(".ex-bar-fill[data-width]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            setTimeout(() => {
              el.style.width = el.dataset.width + "%";
            }, 120);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 },
    );
    fills.forEach((f) => observer.observe(f));
    return () => observer.disconnect();
  }, []);
}

/* ────────────────────────────────────────────────
   Imagenie mini chatbot — extreme-themed
──────────────────────────────────────────────── */
const EX_FAQ = [
  {
    keys: ["sla", "resin", "sla print"],
    answer:
      "Our SLA printers use 405nm UV resin at 0.025–0.1mm layers — 0.05mm accuracy, 290×165×185mm build volume. Used for dental, jewellery, display masters, and anything that needs mirror-smooth surfaces FDM can't touch.",
    chips: ["SLA specs", "Resin types"],
  },
  {
    keys: ["injection", "mould", "molding"],
    answer:
      "Injection moulding from 100 units. Aluminium tooling in 7–14 days, ±0.05mm, up to 8-cavity. ABS, PP, Nylon, HDPE. Perfect when you need production volumes at per-unit economics.",
    chips: ["Tooling lead time", "Minimum order"],
  },
  {
    keys: ["vacuum", "thermoform", "forming"],
    answer:
      "Vacuum forming for large-format covers, trays, and packaging. Max sheet 600×400mm, 0.8mm min wall, PETG / ABS / HIPS / Acrylic / PP. 3–5 day lead time, low tooling cost.",
    chips: ["Vacuum materials", "Lead time"],
  },
  {
    keys: ["carbon", "cf", "cfrp", "fibre", "fiber"],
    answer:
      "Carbon fibre hand layup — 1.5 g/cm³, 3,500 MPa tensile strength. 10× stiffer than steel by mass. Used in aerospace brackets, robotics arms, cycling components, and custom performance parts.",
    chips: ["CF specs", "Applications"],
  },
  {
    keys: ["cnc", "machining", "mill", "turning"],
    answer:
      "CNC machining is coming Q3 2025. Aluminium 6061, stainless steel, ±0.05mm, 3-axis mill + turning. Early booking open now — lock in launch pricing.",
    chips: ["Book early", "Materials"],
  },
  {
    keys: ["iot", "wifi", "ble", "lora", "lte", "connectivity"],
    answer:
      "We build field-deployable IoT hardware — WiFi 6, BLE 5.0, LoRa, LTE-M. IP65 enclosures, battery management, MQTT/REST. We've built things that run in monsoons.",
    chips: ["IoT specs", "Lead time"],
  },
  {
    keys: ["assembly", "pcb", "solder", "firmware", "flash"],
    answer:
      "Complete hardware assembly: PCB mounting, wire harness, solder & crimp, firmware flashing, and functional testing. You get a working unit, not parts in a bag.",
    chips: ["Assembly process", "Lead time"],
  },
  {
    keys: ["enclosure", "ip54", "ip65"],
    answer:
      "3D printed enclosures to ±0.1mm accuracy. M3 boss columns, snap-fit lids, cable routing channels, gasket grooves. IP54 with PETG. Matched to your PCB footprint.",
    chips: ["Enclosure specs", "Materials"],
  },
  {
    keys: ["electronics", "source", "arduino", "esp32", "stm32", "rpi"],
    answer:
      "We mount PCBs, solder wire harnesses, install headers and connectors, flash firmware, and run functional tests. Delivered as a complete working unit — not parts in a bag. We don't cut corners here.",
    chips: ["What can you source?", "Lead time"],
  },
  {
    keys: ["quote", "price", "cost", "how much"],
    answer:
      "Send us your brief at hello@solidlabs.in or use the contact form. We quote within 2 hours for standard builds, same day for complex assemblies. No ghost quotes — we tell you what it actually costs.",
    chips: ["Contact us"],
  },
  {
    keys: ["lead time", "how long", "turnaround", "timeline"],
    answer:
      "Electronics sourcing: same week. PCB enclosures: 2–5 days. Full assembly: 48h for standard builds. SLA: 1–3 days. Injection moulding: 7–14 days for tooling + run. Carbon fibre: 5–10 days depending on complexity.",
    chips: ["SLA", "Assembly", "Injection"],
  },
  {
    keys: ["hi", "hello", "hey", "sup"],
    answer:
      "Hey! I'm Imagenie — built to answer your Extreme Engineering questions. Ask me about SLA printing, injection moulding, carbon fibre, CNC, IoT builds, or anything else on this page.",
    chips: ["What can you do?", "Get a quote"],
  },
  {
    keys: ["thanks", "thank you", "cheers"],
    answer:
      "Anytime! If you need a quote or have a complex brief, ping us at hello@solidlabs.in — we're usually back within 2 hours.",
    chips: ["Get a quote"],
  },
];

const CHIP_ACTIONS = {
  "SLA specs": "sla print specs",
  "Resin types": "resin types",
  "Tooling lead time": "injection mould lead time",
  "Minimum order": "minimum order injection",
  "Vacuum materials": "vacuum materials",
  "Lead time": "lead time",
  "CF specs": "carbon fibre specs",
  Applications: "carbon fibre applications",
  "Book early": "cnc machining early booking",
  Materials: "cnc materials",
  "IoT specs": "iot connectivity specs",
  "Assembly process": "assembly process",
  "Enclosure specs": "enclosure specs",
  "What can you source?": "electronics sourcing",
  "Contact us": "how to get a quote",
  SLA: "sla",
  Assembly: "assembly",
  Injection: "injection moulding",
  "What can you do?": "what services do you offer",
  "Get a quote": "how to get a quote",
};

function getAnswer(input) {
  const q = input.toLowerCase();
  for (const faq of EX_FAQ) {
    if (faq.keys.some((k) => q.includes(k))) return faq;
  }
  return {
    answer:
      "Good question — I'll be honest, that's outside my FAQ. Drop us a message at hello@solidlabs.in and an engineer will reply within 2 hours.",
    chips: ["Get a quote", "Lead time"],
  };
}

function ExImagenie() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      from: "bot",
      text: "Hey — I'm Imagenie. Ask me anything about our manufacturing capabilities. SLA, injection moulding, carbon fibre, IoT builds, CNC — anything on this page.",
      chips: ["What services?", "Get a quote", "CNC machining"],
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const faq = getAnswer(text);
      setMsgs((m) => [
        ...m,
        { from: "bot", text: faq.answer, chips: faq.chips },
      ]);
      setTyping(false);
    }, 700);
  };

  const handleChip = (chip) => {
    send(CHIP_ACTIONS[chip] || chip);
  };

  useEffect(() => {
    const el = document.getElementById("ex-chat-msgs");
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 27,
          right: 25,
          zIndex: 9000,
          width: 70,
          height: 69,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg,#1e7aff,#0d5cd4)",
          boxShadow: "0 4px 24px rgba(30,122,255,.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "float 3s ease-in-out infinite",
        }}
        title="Ask Imagenie"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line
              x1="4"
              y1="4"
              x2="16"
              y2="16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="4"
              x2="4"
              y2="16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
            <ellipse
              cx="24"
              cy="18"
              rx="10"
              ry="12"
              fill="rgba(255,255,255,.9)"
            />
            <ellipse cx="24" cy="18" rx="5" ry="6" fill="#1e7aff" />
            <circle cx="24" cy="18" r="2" fill="white" />
            <path
              d="M14 30 Q10 44 24 46 Q38 44 34 30 Q30 36 24 36 Q18 36 14 30Z"
              fill="rgba(255,255,255,.85)"
            />
            <line
              x1="18"
              y1="28"
              x2="12"
              y2="40"
              stroke="rgba(255,255,255,.6)"
              strokeWidth="1.5"
            />
            <line
              x1="30"
              y1="28"
              x2="36"
              y2="40"
              stroke="rgba(255,255,255,.6)"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 28,
            zIndex: 8999,
            width: 360,
            maxHeight: 520,
            display: "flex",
            flexDirection: "column",
            background: "rgba(6,10,18,.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(30,122,255,.25)",
            borderRadius: 4,
            boxShadow: "0 16px 48px rgba(0,0,0,.6)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "rgba(30,122,255,.12)",
              borderBottom: "1px solid rgba(30,122,255,.18)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#1e7aff",
                boxShadow: "0 0 8px #1e7aff",
                animation: "ldot 1.4s ease infinite",
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--ff-cond)",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "white",
                  letterSpacing: ".02em",
                }}
              >
                IMAGENIE
              </div>
              <div
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: "7px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(30,122,255,.6)",
                }}
              >
                Extreme Eng. · AI Assistant
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            id="ex-chat-msgs"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.from === "bot" ? "flex-start" : "flex-end",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    maxWidth: "84%",
                    padding: "10px 13px",
                    borderRadius:
                      m.from === "bot"
                        ? "2px 12px 12px 12px"
                        : "12px 2px 12px 12px",
                    background:
                      m.from === "bot" ? "rgba(30,122,255,.12)" : "#1e7aff",
                    border:
                      m.from === "bot"
                        ? "1px solid rgba(30,122,255,.2)"
                        : "none",
                    fontSize: 13,
                    color: m.from === "bot" ? "#c8d8f0" : "white",
                    lineHeight: 1.55,
                  }}
                >
                  {m.text}
                </div>
                {m.chips && m.from === "bot" && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 5,
                      paddingLeft: 4,
                    }}
                  >
                    {m.chips.map((c) => (
                      <button
                        key={c}
                        onClick={() => handleChip(c)}
                        style={{
                          fontFamily: "var(--ff-mono)",
                          fontSize: "8px",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          background: "rgba(30,122,255,.1)",
                          color: "#1e7aff",
                          border: "1px solid rgba(30,122,255,.3)",
                          borderRadius: 2,
                          cursor: "pointer",
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  padding: "10px 13px",
                  background: "rgba(30,122,255,.08)",
                  border: "1px solid rgba(30,122,255,.15)",
                  borderRadius: "2px 12px 12px 12px",
                  width: "fit-content",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#1e7aff",
                      animation: `ldot 1.2s ease ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(30,122,255,.15)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about SLA, CF, IoT builds..."
              style={{
                flex: 1,
                background: "rgba(30,122,255,.06)",
                border: "1px solid rgba(30,122,255,.2)",
                borderRadius: 2,
                padding: "8px 12px",
                color: "#c8d8f0",
                fontSize: 13,
                fontFamily: "var(--ff-body)",
                outline: "none",
              }}
            />
            <button
              onClick={() => send(input)}
              style={{
                padding: "8px 14px",
                background: "#1e7aff",
                border: "none",
                borderRadius: 2,
                color: "white",
                fontFamily: "var(--ff-mono)",
                fontSize: "9px",
                letterSpacing: ".1em",
                cursor: "pointer",
              }}
            >
              →
            </button>
          </div>

          {/* Handoff */}
          <div
            style={{
              padding: "8px 14px 10px",
              background: "rgba(0,0,0,.3)",
              borderTop: "1px solid rgba(30,122,255,.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "rgba(100,130,170,.6)" }}>
              Talk to an engineer
            </span>
            <a
              href="mailto:hello@solidlabs.in"
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "8px",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#1e7aff",
                textDecoration: "none",
              }}
            >
              hello@solidlabs.in
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ────────────────────────────────────────────────
   Static data
──────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Arduino · ESP32 · STM32",
  "SLA · Resin · 0.05mm",
  "Carbon Fibre · CFRP · 3,500 MPa",
  "Injection Moulding · 100+ Units",
  "Vacuum Forming · Large Format",
  "PCB Mounting · Wire Harness",
  "Firmware Flashing · Functional Test",
  "IoT · WiFi · BLE · LoRa · LTE",
  "±0.1mm Enclosures",
  "CNC Machining — Coming Q3 2025",
];

const STATS = [
  { n: "9", s: "+", l: "Manufacturing Methods", d: "Under one roof" },
  { n: "0", s: "MOQ", l: "Min Order Qty", d: "Single units accepted" },
  { n: "48", s: "h", l: "Complex Assembly", d: "File to tested unit" },
  { n: "360", s: "°", l: "Full Service", d: "Design to delivery" },
];

const CAP_BARS = [
  { label: "Mechanical Design", w: 95, color: "#1e7aff" },
  { label: "PCB Enclosures", w: 93, color: "#1e7aff" },
  { label: "Electronics Sourcing", w: 84, color: "#1e7aff" },
  { label: "SLA Resin Printing", w: 90, color: "#1e7aff" },
  { label: "Carbon Fibre Layup", w: 82, color: "#1e7aff" },
  { label: "Full Assembly", w: 80, color: "#1e7aff" },
  { label: "IoT Integration", w: 75, color: "#1e7aff" },
  { label: "Injection Moulding", w: 78, color: "#1e7aff" },
  { label: "Vacuum Forming", w: 80, color: "#1e7aff" },
  { label: "Firmware Dev.", w: 62, color: "var(--yw)", pctColor: "var(--yw)" },
  {
    label: "CNC Machining",
    w: 78,
    color: "#555",
    pctColor: "#555",
    suffix: " — Soon",
  },
];

/* ────────────────────────────────────────────────
   SVG visuals
──────────────────────────────────────────────── */
const ElectronicsSVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    <rect
      x="20"
      y="20"
      width="200"
      height="160"
      rx="4"
      fill="#060a12"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
    />
    <polyline
      points="40,60 60,60 60,80 100,80"
      fill="none"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1.5"
    />
    <polyline
      points="200,60 180,60 180,100 140,100"
      fill="none"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1.5"
    />
    <polyline
      points="80,140 80,110 140,110"
      fill="none"
      stroke="rgba(30,122,255,.15)"
      strokeWidth="1"
    />
    <rect
      x="100"
      y="70"
      width="50"
      height="40"
      rx="2"
      fill="#0a1020"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    <rect
      x="106"
      y="76"
      width="38"
      height="28"
      rx="1"
      fill="#1e7aff"
      opacity=".12"
    />
    <text
      x="112"
      y="92"
      fontFamily="'DM Mono'"
      fontSize="6"
      fill="rgba(30,122,255,.6)"
      letterSpacing=".08em"
    >
      ESP32
    </text>
    <circle cx="68" cy="44" r="5" fill="#1e7aff" opacity=".7" />
    <circle cx="68" cy="44" r="2.5" fill="white" opacity=".3" />
    <rect
      x="160"
      y="64"
      width="8"
      height="12"
      rx="1"
      fill="#1a2030"
      stroke="#2a3a4a"
      strokeWidth=".8"
    />
    <rect
      x="160"
      y="84"
      width="8"
      height="12"
      rx="1"
      fill="#1a2030"
      stroke="#2a3a4a"
      strokeWidth=".8"
    />
    <line x1="20" y1="80" x2="28" y2="80" stroke="#888" strokeWidth="2" />
    <line x1="20" y1="88" x2="28" y2="88" stroke="#888" strokeWidth="2" />
    <line x1="20" y1="96" x2="28" y2="96" stroke="#888" strokeWidth="2" />
    <line x1="20" y1="104" x2="28" y2="104" stroke="#888" strokeWidth="2" />
    <rect
      x="20"
      y="20"
      width="200"
      height="2"
      fill="rgba(30,122,255,.3)"
      style={{ animation: "scan 3s linear infinite" }}
    />
  </svg>
);

const EnclosuresSVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    <rect
      x="30"
      y="30"
      width="180"
      height="140"
      rx="6"
      fill="#060a12"
      stroke="rgba(30,122,255,.25)"
      strokeWidth="1.5"
    />
    <rect
      x="30"
      y="30"
      width="180"
      height="60"
      rx="6"
      fill="none"
      stroke="rgba(30,122,255,.12)"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <rect
      x="46"
      y="48"
      width="148"
      height="86"
      rx="3"
      fill="#0a1218"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
    />
    <rect
      x="54"
      y="56"
      width="20"
      height="16"
      rx="1"
      fill="#1e7aff"
      opacity=".15"
      stroke="rgba(30,122,255,.3)"
      strokeWidth=".8"
    />
    <rect
      x="84"
      y="56"
      width="32"
      height="16"
      rx="1"
      fill="#1e7aff"
      opacity=".1"
      stroke="rgba(30,122,255,.25)"
      strokeWidth=".8"
    />
    <circle
      cx="50"
      cy="52"
      r="4"
      fill="none"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    <circle
      cx="190"
      cy="52"
      r="4"
      fill="none"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    <circle
      cx="50"
      cy="130"
      r="4"
      fill="none"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    <circle
      cx="190"
      cy="130"
      r="4"
      fill="none"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    <line
      x1="30"
      y1="178"
      x2="210"
      y2="178"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1"
    />
    <text
      x="105"
      y="192"
      fontFamily="'DM Mono'"
      fontSize="7"
      fill="rgba(30,122,255,.5)"
      letterSpacing=".1em"
    >
      ±0.1mm
    </text>
  </svg>
);

const AssemblySVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    <rect
      x="20"
      y="60"
      width="200"
      height="120"
      rx="4"
      fill="#060a12"
      stroke="rgba(30,122,255,.15)"
      strokeWidth="1"
    />
    <rect
      x="30"
      y="70"
      width="80"
      height="52"
      rx="3"
      fill="#0a1218"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
    />
    <line
      x1="160"
      y1="30"
      x2="128"
      y2="90"
      stroke="#444"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <polygon points="125,88 131,84 136,96 130,100" fill="#c44820" />
    <circle cx="130" cy="94" r="3" fill="#f05c1e" opacity=".8" />
    <path
      d="M110 90 Q130 110 150 95 Q170 80 185 100"
      fill="none"
      stroke="#1e7aff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M110 98 Q135 118 155 103"
      fill="none"
      stroke="rgba(30,122,255,.5)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle
      cx="195"
      cy="130"
      r="14"
      fill="none"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1.5"
    />
    <polyline
      points="188,130 193,136 203,123"
      fill="none"
      stroke="#1e7aff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IoTSVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    <circle
      cx="120"
      cy="100"
      r="28"
      fill="#060a12"
      stroke="rgba(30,122,255,.35)"
      strokeWidth="2"
    />
    <circle
      cx="120"
      cy="100"
      r="16"
      fill="#0a1220"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
    />
    <circle cx="120" cy="100" r="5" fill="#1e7aff" opacity=".8" />
    <circle
      cx="120"
      cy="100"
      r="44"
      fill="none"
      stroke="rgba(30,122,255,.1)"
      strokeWidth="1"
      strokeDasharray="5 5"
      style={{ animation: "rotate 12s linear infinite" }}
    />
    <circle
      cx="120"
      cy="100"
      r="62"
      fill="none"
      stroke="rgba(30,122,255,.06)"
      strokeWidth="1"
      strokeDasharray="8 8"
      style={{ animation: "rotate 20s linear infinite reverse" }}
    />
    {[
      {
        cx: 60,
        cy: 60,
        label: "WiFi",
        lx: 53,
        ly: 64,
        ex1: 68,
        ey1: 67,
        ex2: 96,
        ey2: 88,
      },
      {
        cx: 180,
        cy: 60,
        label: "BLE",
        lx: 173,
        ly: 64,
        ex1: 172,
        ey1: 67,
        ex2: 144,
        ey2: 88,
      },
      {
        cx: 60,
        cy: 148,
        label: "LoRa",
        lx: 52,
        ly: 152,
        ex1: 68,
        ey1: 143,
        ex2: 96,
        ey2: 114,
      },
      {
        cx: 180,
        cy: 148,
        label: "LTE",
        lx: 173,
        ly: 152,
        ex1: 172,
        ey1: 143,
        ex2: 144,
        ey2: 114,
      },
    ].map((n) => (
      <g key={n.label}>
        <circle
          cx={n.cx}
          cy={n.cy}
          r="10"
          fill="#060a12"
          stroke="rgba(30,122,255,.35)"
          strokeWidth="1.5"
        />
        <text
          x={n.lx}
          y={n.ly}
          fontFamily="'DM Mono'"
          fontSize="5.5"
          fill="rgba(30,122,255,.6)"
        >
          {n.label}
        </text>
        <line
          x1={n.ex1}
          y1={n.ey1}
          x2={n.ex2}
          y2={n.ey2}
          stroke="rgba(30,122,255,.2)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </g>
    ))}
  </svg>
);

const SLASVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    {/* resin vat */}
    <rect
      x="30"
      y="120"
      width="180"
      height="50"
      rx="3"
      fill="#060a12"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1.5"
    />
    <rect
      x="34"
      y="124"
      width="172"
      height="42"
      rx="2"
      fill="rgba(30,122,255,.06)"
    />
    {/* resin surface shimmer */}
    <line
      x1="34"
      y1="135"
      x2="206"
      y2="135"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
      strokeDasharray="8 4"
    />
    {/* build platform */}
    <rect
      x="80"
      y="60"
      width="80"
      height="8"
      rx="1"
      fill="#0e1624"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    {/* printed part on platform */}
    <rect
      x="95"
      y="68"
      width="50"
      height="52"
      rx="2"
      fill="#0a1828"
      stroke="rgba(30,122,255,.35)"
      strokeWidth="1"
    />
    <rect
      x="99"
      y="72"
      width="42"
      height="44"
      rx="1"
      fill="rgba(30,122,255,.08)"
    />
    {/* layer lines on part */}
    {[76, 82, 88, 94, 100, 106, 112].map((y) => (
      <line
        key={y}
        x1="99"
        y1={y}
        x2="141"
        y2={y}
        stroke="rgba(30,122,255,.15)"
        strokeWidth="1"
      />
    ))}
    {/* laser beam */}
    <line
      x1="120"
      y1="10"
      x2="120"
      y2="120"
      stroke="rgba(30,122,255,.5)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
      style={{ animation: "scan 2s linear infinite" }}
    />
    <circle cx="120" cy="120" r="5" fill="#1e7aff" opacity=".8" />
    <circle cx="120" cy="120" r="10" fill="rgba(30,122,255,.2)" />
    {/* UV label */}
    <text
      x="128"
      y="18"
      fontFamily="'DM Mono'"
      fontSize="7"
      fill="rgba(30,122,255,.6)"
      letterSpacing=".12em"
    >
      405nm UV
    </text>
    {/* dimension note */}
    <text
      x="40"
      y="185"
      fontFamily="'DM Mono'"
      fontSize="6"
      fill="rgba(30,122,255,.4)"
      letterSpacing=".1em"
    >
      0.025–0.1mm layers · ±0.05mm XY
    </text>
  </svg>
);

const CarbonSVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    {/* background carbon weave pattern */}
    <defs>
      <pattern
        id="cfweave"
        x="0"
        y="0"
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
      >
        <rect width="16" height="16" fill="#06090e" />
        <rect x="0" y="0" width="8" height="8" fill="rgba(100,120,160,.06)" />
        <rect x="8" y="8" width="8" height="8" fill="rgba(100,120,160,.06)" />
        <line
          x1="0"
          y1="8"
          x2="8"
          y2="0"
          stroke="rgba(30,122,255,.07)"
          strokeWidth=".8"
        />
        <line
          x1="8"
          y1="16"
          x2="16"
          y2="8"
          stroke="rgba(30,122,255,.07)"
          strokeWidth=".8"
        />
        <line
          x1="8"
          y1="0"
          x2="16"
          y2="8"
          stroke="rgba(30,122,255,.05)"
          strokeWidth=".8"
        />
        <line
          x1="0"
          y1="8"
          x2="8"
          y2="16"
          stroke="rgba(30,122,255,.05)"
          strokeWidth=".8"
        />
      </pattern>
    </defs>
    <rect width="240" height="200" fill="url(#cfweave)" />
    {/* part silhouette - bracket */}
    <polygon
      points="40,160 80,60 160,60 200,160"
      fill="none"
      stroke="rgba(30,122,255,.35)"
      strokeWidth="2"
    />
    <polygon
      points="50,155 80,75 160,75 190,155"
      fill="rgba(10,20,35,.8)"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
    />
    {/* ply layers visible at edge */}
    {[0, 1, 2, 3].map((i) => (
      <line
        key={i}
        x1={42 + i * 3}
        y1={158 - i}
        x2={82 + i * 2}
        y2={62 + i}
        stroke={`rgba(30,122,255,${0.3 - i * 0.06})`}
        strokeWidth="1.5"
      />
    ))}
    {/* property callouts */}
    <circle
      cx="60"
      cy="100"
      r="18"
      fill="rgba(6,10,18,.9)"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1"
    />
    <text
      x="47"
      y="97"
      fontFamily="'DM Mono'"
      fontSize="6.5"
      fill="rgba(30,122,255,.8)"
      letterSpacing=".05em"
    >
      1.5
    </text>
    <text
      x="44"
      y="107"
      fontFamily="'DM Mono'"
      fontSize="5"
      fill="rgba(30,122,255,.5)"
      letterSpacing=".05em"
    >
      g/cm³
    </text>
    <circle
      cx="180"
      cy="100"
      r="22"
      fill="rgba(6,10,18,.9)"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1"
    />
    <text
      x="162"
      y="97"
      fontFamily="'DM Mono'"
      fontSize="6"
      fill="rgba(30,122,255,.8)"
    >
      3,500
    </text>
    <text
      x="164"
      y="107"
      fontFamily="'DM Mono'"
      fontSize="5"
      fill="rgba(30,122,255,.5)"
    >
      MPa
    </text>
    {/* 10x label */}
    <text
      x="96"
      y="125"
      fontFamily="'DM Mono'"
      fontSize="8"
      fill="rgba(30,122,255,.6)"
      letterSpacing=".1em"
    >
      10× steel
    </text>
    <text
      x="98"
      y="137"
      fontFamily="'DM Mono'"
      fontSize="6"
      fill="rgba(30,122,255,.4)"
    >
      by mass
    </text>
  </svg>
);

const InjectionSVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    {/* mould halves */}
    <rect
      x="20"
      y="20"
      width="90"
      height="160"
      rx="3"
      fill="#060a12"
      stroke="rgba(30,122,255,.25)"
      strokeWidth="1.5"
    />
    <rect
      x="130"
      y="20"
      width="90"
      height="160"
      rx="3"
      fill="#060a12"
      stroke="rgba(30,122,255,.25)"
      strokeWidth="1.5"
    />
    {/* cavity */}
    <rect
      x="80"
      y="60"
      width="80"
      height="80"
      rx="2"
      fill="rgba(30,122,255,.08)"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1"
    />
    {/* part in cavity */}
    <rect
      x="86"
      y="66"
      width="68"
      height="68"
      rx="2"
      fill="rgba(30,122,255,.15)"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    {/* injection channel */}
    <rect
      x="110"
      y="10"
      width="20"
      height="54"
      rx="1"
      fill="rgba(30,122,255,.2)"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
    />
    {/* melt flow arrows */}
    <polygon points="117,55 123,55 120,64" fill="#1e7aff" opacity=".7" />
    {/* ejector pins */}
    <line
      x1="30"
      y1="90"
      x2="80"
      y2="90"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
    <line
      x1="30"
      y1="110"
      x2="80"
      y2="110"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
    <line
      x1="160"
      y1="90"
      x2="210"
      y2="90"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
    <line
      x1="160"
      y1="110"
      x2="210"
      y2="110"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
    {/* spec label */}
    <text
      x="72"
      y="160"
      fontFamily="'DM Mono'"
      fontSize="6"
      fill="rgba(30,122,255,.5)"
      letterSpacing=".1em"
    >
      100+ units · ±0.05mm
    </text>
  </svg>
);

const VacuumSVG = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
    {/* sheet being formed */}
    <path
      d="M20 80 Q60 82 80 100 Q120 140 160 100 Q180 82 220 80"
      fill="none"
      stroke="rgba(30,122,255,.5)"
      strokeWidth="2"
    />
    {/* flat sheet above */}
    <rect
      x="20"
      y="60"
      width="200"
      height="14"
      rx="2"
      fill="#0a1218"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1"
    />
    {/* mould tool */}
    <path
      d="M60 140 Q120 110 180 140"
      fill="none"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
      strokeDasharray="5 4"
    />
    <ellipse
      cx="120"
      cy="150"
      rx="70"
      ry="25"
      fill="#060a12"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1.5"
    />
    {/* vacuum arrows */}
    {[70, 100, 120, 140, 170].map((x) => (
      <line
        key={x}
        x1={x}
        y1="80"
        x2={x}
        y2="100"
        stroke="rgba(30,122,255,.25)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    ))}
    {[70, 100, 120, 140, 170].map((x) => (
      <polygon
        key={x}
        points={`${x - 3},98 ${x + 3},98 ${x},104`}
        fill="rgba(30,122,255,.3)"
      />
    ))}
    {/* heater */}
    <rect
      x="20"
      y="20"
      width="200"
      height="16"
      rx="2"
      fill="#1a0808"
      stroke="#f05c1e"
      strokeWidth="1"
      opacity=".6"
    />
    <text
      x="88"
      y="32"
      fontFamily="'DM Mono'"
      fontSize="7"
      fill="rgba(240,92,30,.7)"
      letterSpacing=".1em"
    >
      HEATER
    </text>
    {/* spec */}
    <text
      x="44"
      y="190"
      fontFamily="'DM Mono'"
      fontSize="6"
      fill="rgba(30,122,255,.4)"
      letterSpacing=".1em"
    >
      600×400mm · PETG · ABS · HIPS
    </text>
  </svg>
);

const CNCSVG = () => (
  <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
    <rect
      x="20"
      y="30"
      width="180"
      height="130"
      rx="4"
      fill="#06090f"
      stroke="rgba(30,122,255,.2)"
      strokeWidth="1"
    />
    <rect
      x="35"
      y="100"
      width="150"
      height="40"
      rx="2"
      fill="#0a1018"
      stroke="rgba(30,122,255,.25)"
      strokeWidth="1"
    />
    <rect
      x="75"
      y="88"
      width="70"
      height="14"
      rx="1"
      fill="rgba(30,122,255,.15)"
      stroke="rgba(30,122,255,.35)"
      strokeWidth="1"
    />
    <rect
      x="95"
      y="36"
      width="30"
      height="56"
      rx="2"
      fill="#0e1624"
      stroke="rgba(30,122,255,.3)"
      strokeWidth="1"
    />
    <rect
      x="103"
      y="76"
      width="14"
      height="20"
      rx="1"
      fill="#1e7aff"
      opacity=".2"
    />
    <circle
      cx="110"
      cy="92"
      r="10"
      fill="none"
      stroke="rgba(30,122,255,.15)"
      strokeWidth="1.9"
    />
    <circle
      cx="110"
      cy="92"
      r="10"
      fill="none"
      stroke="#1e7aff"
      strokeWidth="1.9"
      strokeDasharray="14 43"
      style={{
        animation: "rotate 1.4s linear infinite",
        transformOrigin: "110px 92px", // ← this is the fix
      }}
    />
    <path
      d="M76 88 Q72 82 68 86"
      fill="none"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M145 88 Q149 82 152 86"
      fill="none"
      stroke="rgba(30,122,255,.4)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="155"
      x2="68"
      y2="155"
      stroke="rgba(30,122,255,.35)"
      strokeWidth="1"
    />
    <polygon points="68,152 68,158 74,155" fill="rgba(30,122,255,.35)" />
    <text
      x="40"
      y="169"
      fontFamily="'DM Mono'"
      fontSize="7"
      fill="rgba(30,122,255,.4)"
      letterSpacing=".1em"
    >
      X · Y · Z · A
    </text>
    <text
      x="110"
      y="169"
      fontFamily="'DM Mono'"
      fontSize="7"
      fill="rgba(30,122,255,.5)"
      letterSpacing=".1em"
    >
      ±0.05mm
    </text>
  </svg>
);

/* ────────────────────────────────────────────────
   All zoom capability items
──────────────────────────────────────────────── */
const ZOOM_ITEMS = [
  {
    num: "01 — Electronics",
    title: "ELECTRONICS",
    em: "SUPPLY",
    desc: "We mount PCBs, solder wire harnesses, install headers and connectors, flash firmware, and run functional tests. Delivered as a complete working unit — not parts in a bag. We don't cut corners here.",
    specs: [
      "Arduino",
      "ESP32",
      "STM32",
      "Raspberry Pi",
      "Sensors",
      "Custom PCB",
      "No MOQ",
    ],
    visual: <ElectronicsSVG />,
    link: null,
  },
  {
    num: "02 — Enclosures",
    title: "PCB-READY",
    em: "ENCLOSURES",
    desc: "3D printed enclosures engineered to ±0.1mm accuracy. Snap-fits, M3 boss columns for PCB mounting, cable routing channels, flush lids with gasket grooves. IP54 ratings achievable with PETG.",
    specs: [
      "±0.1mm",
      "M3 Boss Columns",
      "Snap-Fit Lid",
      "Cable Routing",
      "IP54 PETG",
      "Gasket Groove",
    ],
    visual: <EnclosuresSVG />,
    link: null,
  },
  {
    num: "03 — Assembly",
    title: "COMPLETE",
    em: "ASSEMBLY",
    desc: "We mount PCBs, solder wire harnesses, install headers and connectors, flash firmware, and run functional tests. Delivered as a complete working unit — not parts in a bag. We don't cut corners here.",
    specs: [
      "PCB Mount",
      "Wire Harness",
      "Solder & Crimp",
      "Firmware Flash",
      "Function Test",
      "Packaged",
    ],
    visual: <AssemblySVG />,
    link: null,
  },
  {
    num: "04 — IoT",
    title: "IOT",
    em: "INTEGRATION",
    desc: "WiFi, BLE, LoRa, and LTE-M connectivity. IP65 enclosures. Battery management circuits. Field-deployable sensor nodes, asset trackers, and edge devices. We've built things that run in monsoons.",
    specs: [
      "WiFi 6",
      "BLE 5.0",
      "LoRa",
      "LTE-M",
      "IP65",
      "Battery Mgmt",
      "MQTT / REST",
    ],
    visual: <IoTSVG />,
    link: null,
  },
  {
    num: "05 — SLA Printing",
    title: "CNC MACHINING",
    em: "PRECISION",
    desc: "Precision CNC machining for aluminium, steel, and engineering plastics. Tolerances to ±0.05mm. Combined with our 3D printing and electronics capabilities, this completes the full hardware manufacturing loop.",
    specs: [
      "0.025–0.1mm Layers",
      "±0.05mm XY",
      "Standard Resin",
      "Tough Resin",
      "Castable",
      "Dental / Biocompat.",
    ],
    visual: <SLASVG />,
    link: "/sla-printing",
  },
  // {
  //   num: "06 — Carbon Fibre",
  //   title: "CARBON",
  //   em: "FIBRE",
  //   desc: "Hand layup CFRP for parts where weight is the enemy. 1.5 g/cm³, 3,500 MPa tensile strength — 10× stiffer than steel by mass. Aerospace brackets, robotics arms, cycling components, custom performance hardware.",
  //   specs: [
  //     "1.5 g/cm³",
  //     "3,500 MPa",
  //     "230 GPa Modulus",
  //     "Hand Layup",
  //     "Prepreg Option",
  //     "Aerospace Grade",
  //   ],
  //   visual: <CarbonSVG />,
  //   link: "/carbon-fibre",
  // },
  // {
  //   num: "07 — Injection Moulding",
  //   title: "INJECTION",
  //   em: "MOULDING",
  //   desc: "When your quantities cross 100 units and per-unit economics matter, injection moulding is the answer. Aluminium tooling in 7–14 days. ±0.05mm accuracy. Up to 8 cavities. ABS, PP, Nylon, HDPE.",
  //   specs: [
  //     "Min 100 Units",
  //     "±0.05mm",
  //     "7–14 Day Tooling",
  //     "ABS · PP · Nylon",
  //     "Up to 8 Cavities",
  //     "0.8–3.2μm Ra",
  //   ],
  //   visual: <InjectionSVG />,
  //   link: "/injection-moulding",
  // },
  // {
  //   num: "08 — Vacuum Forming",
  //   title: "VACUUM",
  //   em: "FORMING",
  //   desc: "Large-format covers, protective housings, trays, and packaging. Max sheet 600×400mm, 0.8mm minimum wall, 1:1 depth ratio. Low tooling cost makes it ideal for prototypes and short runs before going to injection.",
  //   specs: [
  //     "600×400mm Sheet",
  //     "0.8mm Min Wall",
  //     "PETG · ABS · HIPS",
  //     "Acrylic · PP · HDPE",
  //     "3–5 Day Lead",
  //     "Low Tooling Cost",
  //   ],
  //   visual: <VacuumSVG />,
  //   link: "/vacuum-forming",
  // },
];

/* ────────────────────────────────────────────────
   Mini service card for the "our stack" overview
──────────────────────────────────────────────── */
const SERVICE_STACK = [
  {
    icon: "⬡",
    label: "FDM Printing",
    sub: "PLA · PETG · ABS · TPU · Nylon",
    link: "/learn",
  },
  {
    icon: "◈",
    label: "SLA Resin",
    sub: "0.025mm · UV 405nm",
    link: "/sla-printing",
  },
  {
    icon: "▣",
    label: "Injection Moulding",
    sub: "100+ units · ±0.05mm",
    link: "/injection-moulding",
  },
  {
    icon: "◻",
    label: "Vacuum Forming",
    sub: "600×400mm · PETG · HIPS",
    link: "/vacuum-forming",
  },
  {
    icon: "◆",
    label: "Carbon Fibre",
    sub: "1.5g/cm³ · 3,500 MPa",
    link: "/carbon-fibre",
  },
  {
    icon: "⬢",
    label: "Electronics Assy",
    sub: "PCB · Firmware · Full unit",
    link: null,
  },
  {
    icon: "◉",
    label: "IoT Integration",
    sub: "WiFi · BLE · LoRa · LTE-M",
    link: null,
  },
  {
    icon: "◎",
    label: "CNC Machining",
    sub: "±0.05mm — Q3 2025",
    link: null,
    soon: true,
  },
];

/* ────────────────────────────────────────────────
   Component
──────────────────────────────────────────────── */
export default function Extreme() {
  const nav = useNavigate();
  useReveal();
  useCapabilityBars();
  const goQuote = () => {
    nav("/");
    setTimeout(
      () =>
        document
          .getElementById("contact-sec")
          ?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  };

  return (
    <div style={{ background: "#020408" }}>
      {/* ══ HERO ══════════════════════════════════ */}
      <section className="ex-hero">
        <div className="ex-hero-grid" />
        <div className="ex-hero-glow" />
        <div className="ex-hero-scan" />
        <div className="ex-hero-data">
          {[
            ["SYS", "ONLINE"],
            ["MODE", "EXTREME ENG."],
            ["LOC", "BENGALURU"],
            ["BUILD", "v3.0.1"],
            ["STATUS", "ACCEPTING BRIEFS"],
          ].map(([k, v]) => (
            <div key={k} className="ex-data-line">
              {k}: <span>{v}</span>
            </div>
          ))}
        </div>
        <div className="eyebrow bl rv" style={{ position: "relative" }}>
          03 — Extreme Engineering · Full Hardware Stack
        </div>
        <h1
          className="ex-h1 rv d1"
          style={{ position: "relative", color: "var(--wht)" }}
        >
          BEYOND
          <br />
          PRINTING.
          <br />
          <em>WAY BEYOND.</em>
        </h1>
        <p className="ex-h1-sub rv d2">
         For engineers who need hardware sourced, electronics integrated, firmware flashed, and fully tested assemblies delivered. We go all the way — from bare PCB to working product.
        </p>
      </section>

      {/* ══ TICKER ════════════════════════════════ */}
      <div
        className="ex-ticker"
        style={{
          borderBottom: "1px solid rgba(30,122,255,.12)",
          backgroundColor: "#1e7aff",
        }}
      >
        <div className="ticker">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span className="ti" key={i}>
                {t} <span className="td">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STATS ═════════════════════════════════ */}
      <div className="ex-stats">
        {STATS.map((s, i) => (
          <div key={s.l} className={`ex-stat rv d${i}`}>
            <div className="ex-stat-n">
              {s.n}
              <span>{s.s}</span>
            </div>
            <div className="ex-stat-l">{s.l}</div>
            <div className="ex-stat-d">{s.d}</div>
          </div>
        ))}
      </div>


      {/* ══ ZOOM CAPABILITIES ═════════════════════ */}
      <div className="ex-zoom-sec">
        {ZOOM_ITEMS.map((item) => (
          <div
            key={item.num}
            className="ex-zoom-item rv"
            style={{
              background: "#020408",
              fontFamily: "var(--ff-mono)",
              fontSize: " 8px",
              letterSpacing: ".2em",
             
              border: "1px solid rgba(30,122,255,.15)",
            }}
          >
            <div>
              <div className="ex-cap-num" style={{ color: "#1e7aff" }}>
                {" "}
                {item.num}
              </div>
              <h2 className="ex-cap-title">
                {item.title}
                <br />
                <em>{item.em}</em>
              </h2>
              <p className="ex-cap-desc">{item.desc}</p>
              <div className="ex-cap-specs">
                {item.specs.map((s) => (
                  <div key={s} className="ex-spec">
                    {s}
                  </div>
                ))}
              </div>
              {item.link && (
                <Link
                  to={item.link}
                  style={{
                    display: "inline-block",
                    marginTop: 20,
                    fontFamily: "var(--ff-mono)",
                    fontSize: "9px",
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "#1e7aff",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(30,122,255,.3)",
                    paddingBottom: 2,
                  }}
                >
                  Full Spec Page →
                </Link>
              )}
            </div>
            <div className="ex-visual">{item.visual}</div>
          </div>
        ))}

        {/* CNC Coming Soon */}
        <div
          className="ex-zoom-item rv"
          style={{
            background: "#020408",
            border: "1px solid rgba(30,122,255,.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg,transparent,rgba(30,122,255,.5),transparent)",
              animation: "exscan 3s ease infinite",
            }}
          />
          <div>
            <div
              className="ex-cap-num"
              style={{ color: "rgba(30,122,255,.5)" }}
            >
              09 — Coming Soon
            </div>
            <h2 className="ex-cap-title">
              CNC
              <br />
              <em>MACHINING</em>
            </h2>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(30,122,255,.4)",
                padding: "6px 14px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  background: "#1e7aff",
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
                  color: "#1e7aff",
                }}
              >
                Machine Installing — Q3 2025
              </span>
            </div>
            <p className="ex-cap-desc">
              Precision CNC machining for aluminium, steel, and engineering
              plastics. Tolerances to ±0.05mm. This is the final piece in our
              full-loop hardware manufacturing capability — 3D print the
              prototype, injection mould the production part, machine the
              critical-tolerance metal components.
            </p>
            <p
              className="ex-cap-desc"
              style={{ marginTop: 12, color: "rgba(30,122,255,.6)" }}
            >
              Early booking briefs accepted now. Launch pricing locked in for
              customers who brief before go-live.
            </p>
            <div className="ex-cap-specs" style={{ marginTop: 24 }}>
              <div
                className="ex-spec"
                style={{
                  borderColor: "rgba(30,122,255,.6)",
                  color: "#1e7aff",
                  background: "rgba(30,122,255,.08)",
                }}
              >
                ⬡ Early Booking Open
              </div>
              {[
                "Aluminium 6061",
                "Stainless Steel",
                "±0.05mm",
                "3-Axis Mill",
                "Turning Available",
              ].map((s) => (
                <div key={s} className="ex-spec">
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div
            className="ex-visual"
            style={{ flexDirection: "column", gap: 20, alignItems: "center" }}
          >
            <div
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 9,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(30,122,255,.6)",
                border: "1px solid rgba(30,122,255,.25)",
                padding: "8px 20px",
                textAlign: "center",
              }}
            >
              INSTALLATION IN PROGRESS
            </div>
            <CNCSVG />
          </div>
        </div>
      </div>

      {/* ══ CAPABILITY BARS ═══════════════════════ */}
      <section
        className="sec-pad"
        style={{ background: "#020408", borderColor: "rgba(30,122,255,.1)" }}
      >
        <div className="sh rv" style={{ borderColor: "rgba(30,122,255,.12)" }}>
          <h2 className="sh-t" style={{ color: "#f0ede6" }}>
            Capability Stack
          </h2>
          <span
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "8.5px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "rgba(30,122,255,.3)",
            }}
          >
            Self-rated · Updated quarterly
          </span>
        </div>
        <div className="ex-bars rv d1">
          {CAP_BARS.map((b) => (
            <div key={b.label} className="ex-bar-row">
              <div className="ex-bar-label">{b.label}</div>
              <div className="ex-bar-track">
                <div
                  className="ex-bar-fill"
                  data-width={b.w}
                  style={{
                    width: 0,
                    background: b.color,
                    transition: "width 1s ease",
                  }}
                />
              </div>
              <div
                className="ex-bar-pct"
                style={{ color: b.pctColor || "#1e7aff" }}
              >
                {b.w}%{b.suffix || ""}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW WE WORK TOGETHER ══════════════════
      <section
        className="sec-pad"
        style={{
          background: "#030610",
          borderTop: "1px solid rgba(30,122,255,.1)",
          borderBottom: "1px solid rgba(30,122,255,.1)",
        }}
      >
        <div className="sh rv" style={{ borderColor: "rgba(30,122,255,.12)" }}>
          <h2 className="sh-t" style={{ color: "#f0ede6" }}>
            How It All Connects
          </h2>
          <span
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "8.5px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "rgba(30,122,255,.3)",
            }}
          >
            One brief → every process
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 2,
            background: "rgba(30,122,255,.06)",
          }}
          className="rv d1"
        >
          {[
            {
              n: "01",
              t: "Brief",
              d: "Tell us what you need. File, sketch, or just a description. We ask the right questions, pick the right process — you don't have to.",
            },
            {
              n: "02",
              t: "Process Selection",
              d: "FDM for speed and iteration. SLA for precision and finish. Injection for volumes. CF for weight-critical. We match your requirements to the right method.",
            },
            {
              n: "03",
              t: "Manufacture",
              d: "Everything happens in-house. No subcontracting. One QC standard across every process and every part, every time.",
            },
            {
              n: "04",
              t: "Delivery",
              d: "Complete tested units. Documented dimensions. Packed properly. We ship pan-India and coordinate international freight on request.",
            },
          ].map((s, i) => (
            <div
              key={s.n}
              style={{ background: "#030610", padding: "44px 28px" }}
              className={`rv d${i + 1}`}
            >
              <div
                style={{
                  fontFamily: "var(--ff-cond)",
                  fontWeight: 900,
                  fontSize: 72,
                  lineHeight: 1,
                  color: "rgba(30,122,255,.06)",
                  marginBottom: 22,
                  transition: "color .3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(30,122,255,.14)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(30,122,255,.06)")
                }
              >
                {s.n}
              </div>
              <div
                style={{
                  width: 28,
                  height: 2,
                  background: "#1e7aff",
                  marginBottom: 16,
                  opacity: 0.6,
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--ff-cond)",
                  fontWeight: 800,
                  fontSize: 20,
                  marginBottom: 10,
                  color: "#f0ede6",
                }}
              >
                {s.t}
              </h3>
              <p
                style={{
                  fontSize: 12.5,
                  color: "rgba(100,130,170,.7)",
                  lineHeight: 1.7,
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ══ CTA BAND ══════════════════════════════ */}
      <div className="ex-cta-band">
        <h2 className="ex-cta-h rv">
          WHAT DO YOU
          <br />
          NEED <em>BUILT?</em>
        </h2>
        <p
          className="rv d1"
          style={{
            fontSize: 14,
            color: "rgba(100,130,170,.7)",
            maxWidth: 480,
            lineHeight: 1.8,
            position: "relative",
          }}
        >
          If it needs SLA precision, carbon fibre strength, injection-moulded
          volumes, a circuit, an enclosure, and firmware — we've done it. If
          it's something we've never built before, we'll figure it out.
        </p>
        <div
          className="rv d2"
          style={{
            position: "relative",
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button className="btn-bl" onClick={goQuote}>
            Send Brief →
          </button>
          <a
            href="mailto:hello@solidlabs.in"
            className="btn-ghost"
            style={{
              borderColor: "rgba(30,122,255,.3)",
              color: "rgba(30,122,255,.7)",
            }}
          >
            hello@solidlabs.in
          </a>
        </div>
      </div>

      {/* ══ FOOTER ════════════════════════════════ */}
      <footer
        style={{
          background: "#020408",
          borderTop: "1px solid rgba(30,122,255,.1)",
        }}
      >
        <div className="site-footer">
          <div className="fl-logo">
            <svg width="28" height="26" viewBox="0 0 56 52" fill="none">
              <polygon points="8,1 46,1 52,14 14,14" fill="#1e7aff" />
              <polygon points="5,20 43,20 49,33 11,33" fill="#0d5cd4" />
              <polygon points="2,39 40,39 46,52 8,52" fill="#061e4a" />
            </svg>
            <span className="fl-name">SOLIDLABS</span>
          </div>
          <div className="fl-copy" style={{ color: "rgba(30,122,255,.3)" }}>
            © 2025 SolidLabs · Extreme Engineering · Bengaluru
          </div>
        </div>
      </footer>

      {/* ══ IMAGENIE CHATBOT ══════════════════════ */}
      <ExImagenie />
    </div>
  );
}
