import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

/* ── Layer anatomy diagram — generated in React ── */
function LayerDiagram() {
  const TOTAL = 20;
  const TOP_SOLID = 4;
  const BOT_SOLID = 4;
  const CELLS = 10;

  const rows = Array.from({ length: TOTAL }, (_, i) => {
    const rowNum = TOTAL - i; // 20 at top, 1 at bottom
    const fromBottom = i; // 0 = row 20 (top), 19 = row 1 (bottom)
    const fromTop = TOTAL - 1 - i; // 0 = row 1 (bottom), 19 = row 20 (top)

    if (fromBottom < TOP_SOLID) {
      // rows 20,19,18,17 — top solid orange, brightest at top
      const brightness = 0.75 + (TOP_SOLID - 1 - fromBottom) * 0.08;
      return { type: "top", rowNum, brightness };
    } else if (fromTop < BOT_SOLID) {
      // rows 04,03,02,01 — bottom solid brown, darkest at bottom
      const brightness = 0.55 - fromTop * 0.12;
      return { type: "bot", rowNum, brightness };
    } else {
      return { type: "mid", rowNum };
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Row number */}
          <span
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 7,
              color: "#444",
              width: 14,
              textAlign: "right",
              flexShrink: 0,
              lineHeight: "15px",
            }}
          >
            {String(row.rowNum).padStart(2, "0")}
          </span>

          {/* Row bar */}
          {row.type === "top" && (
            <div
              style={{
                flex: 1,
                height: 13,
                background: `rgba(240, 92, 30, ${row.brightness})`,
                borderRadius: 1,
              }}
            />
          )}

          {row.type === "bot" && (
            <div
              style={{
                flex: 1,
                height: 13,
                background: `rgba(90, 28, 6, ${row.brightness})`,
                borderRadius: 1,
              }}
            />
          )}

          {row.type === "mid" && (
            <div
              style={{
                flex: 1,
                height: 13,
                display: "flex",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              {/* Left orange wall — same width as right */}
              <div
                style={{
                  width: "18%",
                  background: "rgba(210, 75, 20, 0.88)",
                  flexShrink: 0,
                }}
              />
              {/* Dark inner cells */}
              {Array.from({ length: CELLS }).map((_, ci) => (
                <div
                  key={ci}
                  style={{
                    flex: 1,
                    background: ci % 2 === 0 ? "rgb(255 247 247 / 28%)" : "#202020",
                    borderLeft: "1px solid #282828",
                  }}
                />
              ))}
              {/* Right orange wall — same width as left */}
              <div
                style={{
                  width: "18%",
                  background: "rgba(210, 75, 20, 0.88)",
                  flexShrink: 0,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Animated quality/capability bars ─────────── */
function useAnimatedBars() {
  useEffect(() => {
    const fills = document.querySelectorAll(".qf-level-fill, .fil-bar-fill");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.transition = "width 0.9s ease";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    fills.forEach((f) => obs.observe(f));
    return () => obs.disconnect();
  }, []);
}

/* ── Data ──────────────────────────────────────── */
const PRINTER_PARTS = [
  {
    n: "01",
    name: "Extruder & Nozzle",
    role: "Melts & Deposits",
    desc: "The hot end melts filament to 200–250°C. A 0.4mm nozzle deposits precise beads of molten plastic layer by layer.",
    icon: (
      <svg width="64" height="80" viewBox="0 0 72 80" fill="none">
        <rect x="18" y="8" width="36" height="24" rx="2" fill="#2a2a2a" />
        <line
          x1="20"
          y1="16"
          x2="52"
          y2="16"
          stroke="#f05c1e"
          strokeWidth="1.5"
          opacity=".5"
        />
        <line
          x1="20"
          y1="22"
          x2="52"
          y2="22"
          stroke="#f05c1e"
          strokeWidth="1"
          opacity=".3"
        />
        <rect x="26" y="6" width="8" height="4" rx="1" fill="#f05c1e" />
        <polygon points="22,32 50,32 44,50 28,50" fill="#444" />
        <polygon points="28,50 44,50 40,62 32,62" fill="#f05c1e" />
        <circle cx="36" cy="64" r="4" fill="#f05c1e" />
        <line
          x1="36"
          y1="68"
          x2="36"
          y2="78"
          stroke="#f05c1e"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".7"
        />
      </svg>
    ),
  },
  {
    n: "02",
    name: "Build Plate",
    role: "Foundation",
    desc: "The heated bed holds the print at 60°C for PLA. The origin crosshair is home — where every print starts.",
    icon: (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        <rect x="4" y="30" width="72" height="10" rx="2" fill="#2a2a2a" />
        <rect x="4" y="24" width="72" height="8" rx="1" fill="#1e1e1e" />
        <line x1="4" y1="26" x2="76" y2="26" stroke="#333" strokeWidth=".8" />
        <line x1="4" y1="29" x2="76" y2="29" stroke="#333" strokeWidth=".8" />
        <line x1="16" y1="24" x2="16" y2="32" stroke="#333" strokeWidth=".8" />
        <line x1="40" y1="24" x2="40" y2="32" stroke="#333" strokeWidth=".8" />
        <line x1="64" y1="24" x2="64" y2="32" stroke="#333" strokeWidth=".8" />
        <line
          x1="38"
          y1="20"
          x2="42"
          y2="20"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <line
          x1="40"
          y1="18"
          x2="40"
          y2="22"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <polygon points="20,6 54,6 58,18 24,18" fill="#f0ede6" opacity=".6" />
        <polygon points="18,18 52,18 56,24 22,24" fill="#f0ede6" opacity=".3" />
      </svg>
    ),
  },
  {
    n: "03",
    name: "Motion System",
    role: "XYZ Positioning",
    desc: "Stepper motors drive the printhead across three axes with sub-millimetre precision. Movement pattern determines quality.",
    icon: (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        <rect x="8" y="26" width="64" height="6" rx="3" fill="#2a2a2a" />
        <rect x="34" y="20" width="12" height="18" rx="2" fill="#444" />
        <circle cx="40" cy="29" r="4" fill="#f05c1e" />
        <rect x="4" y="4" width="6" height="52" rx="2" fill="#1e1e1e" />
        <rect x="70" y="4" width="6" height="52" rx="2" fill="#1e1e1e" />
        <text
          x="36"
          y="56"
          fontFamily="'DM Mono'"
          fontSize="7"
          fill="#444"
          letterSpacing=".1em"
        >
          X·Y·Z
        </text>
      </svg>
    ),
  },
  {
    n: "04",
    name: "Filament Spool",
    role: "Raw Material",
    desc: "1.75mm diameter filament — ~330m per 1kg spool. Fed into the hot end via bowden tube or direct drive.",
    icon: (
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
        <ellipse cx="18" cy="35" rx="14" ry="30" fill="#2a2a2a" />
        <ellipse cx="52" cy="35" rx="14" ry="30" fill="#1e1e1e" />
        <rect x="18" y="8" width="34" height="54" fill="#222" />
        <path
          d="M18 15 Q35 12 52 15"
          fill="none"
          stroke="#f05c1e"
          strokeWidth="3"
          opacity=".9"
        />
        <path
          d="M18 21 Q35 18 52 21"
          fill="none"
          stroke="#c44820"
          strokeWidth="3"
          opacity=".7"
        />
        <path
          d="M18 27 Q35 24 52 27"
          fill="none"
          stroke="#f05c1e"
          strokeWidth="3"
          opacity=".5"
        />
        <path
          d="M18 33 Q35 30 52 33"
          fill="none"
          stroke="#c44820"
          strokeWidth="3"
          opacity=".35"
        />
        <ellipse cx="35" cy="35" rx="6" ry="6" fill="#141414" />
      </svg>
    ),
  },
  {
    n: "05",
    name: "Frame & Hardware",
    role: "Structure",
    desc: "Aluminium extrusion, hardened steel rods, hex bolts. Frame rigidity directly determines print quality.",
    icon: (
      <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
        <polygon points="36,4 62,18 62,46 36,60 10,46 10,18" fill="#2a2a2a" />
        <polygon points="36,12 54,22 54,42 36,52 18,42 18,22" fill="#141414" />
        <circle cx="36" cy="32" r="6" fill="#111" />
        <polygon points="36,4 62,18 54,22 36,12" fill="#f05c1e" opacity=".4" />
        <rect x="31" y="44" width="10" height="16" rx="2" fill="#2a2a2a" />
      </svg>
    ),
  },
  {
    n: "06",
    name: "Control Board",
    role: "The Brain",
    desc: "The microcontroller reads G-code and commands motors, temperature, and fans — 100+ times per second.",
    icon: (
      <svg width="72" height="56" viewBox="0 0 76 60" fill="none">
        <rect
          x="6"
          y="10"
          width="64"
          height="40"
          rx="2"
          fill="#162016"
          stroke="#1e3a1e"
          strokeWidth="1.5"
        />
        <polyline
          points="14,20 14,30 30,30 30,40"
          fill="none"
          stroke="#2a5a2a"
          strokeWidth="1.5"
        />
        <polyline
          points="62,20 50,20 50,40"
          fill="none"
          stroke="#2a5a2a"
          strokeWidth="1.5"
        />
        <rect
          x="28"
          y="16"
          width="18"
          height="12"
          rx="1"
          fill="#1e1e1e"
          stroke="#333"
          strokeWidth="1"
        />
        <rect
          x="30"
          y="18"
          width="14"
          height="8"
          rx=".5"
          fill="#f05c1e"
          opacity=".7"
        />
        <text
          x="31"
          y="24"
          fontFamily="'DM Mono'"
          fontSize="4.5"
          fill="rgba(0,0,0,.6)"
          letterSpacing=".05em"
        >
          MCU
        </text>
      </svg>
    ),
  },
];

const FILAMENTS = [
  {
    name: "PLA+",
    tag: "Most Common",
    highlight: true,
    bars: [
      { l: "Strength", v: "High", w: 78, c: "#f05c1e" },
      { l: "Flex", v: "Low", w: 20, c: "#f05c1e" },
      { l: "Heat", v: "60°C", w: 40, c: "#f05c1e" },
      { l: "Ease", v: "Easy", w: 95, c: "#f05c1e" },
    ],
    best: "Best for: Prototypes, display models, consumer products, D2C goods.",
  },
  {
    name: "PETG",
    tag: "Functional",
    bars: [
      { l: "Strength", v: "V.High", w: 88, c: "#c44820" },
      { l: "Flex", v: "Med", w: 48, c: "#c44820" },
      { l: "Heat", v: "80°C", w: 55, c: "#c44820" },
      { l: "Ease", v: "Med", w: 65, c: "#c44820" },
    ],
    best: "Best for: Enclosures, outdoor, food-safe, mechanical parts.",
  },
  {
    name: "ABS",
    tag: "Engineering",
    bars: [
      { l: "Strength", v: "High", w: 82, c: "#7a2e0f" },
      { l: "Flex", v: "Low", w: 32, c: "#7a2e0f" },
      { l: "Heat", v: "105°C", w: 75, c: "#7a2e0f" },
      { l: "Ease", v: "Hard", w: 35, c: "#7a2e0f" },
    ],
    best: "Best for: Automotive, heat-exposed, machinable prototypes.",
  },
  {
    name: "TPU",
    tag: "Flexible",
    bars: [
      { l: "Strength", v: "Med", w: 52, c: "#666" },
      { l: "Flex", v: "V.High", w: 95, c: "#666" },
      { l: "Heat", v: "70°C", w: 45, c: "#666" },
      { l: "Ease", v: "Med", w: 58, c: "#666" },
    ],
    best: "Best for: Grips, gaskets, phone cases, wearables, shock absorb.",
  },
];

const LAYER_LEGEND = [
  {
    title: "Top Skin Layers",
    value: "4–6 solid layers · Fully dense · ↑ Strongest surface",
    desc: "The final solid layers that cap the top of the part. These are fully dense — no infill gaps. They bridge cleanly over the internal structure and create a smooth, airtight top surface. The last 4–6 layers are printed solid regardless of infill settings.",
    style: { borderColor: "#f05c1e" },
    valColor: "#f05c1e",
  },
  {
    title: "Outer Perimeter Walls",
    value: "2–4 walls · 0.4mm each · Visible surface",
    desc: "The visible shell of your part — printed on every single layer. Wall count controls strength and surface finish. We use 4 perimeter walls as standard: this gives a smooth exterior and resists lateral forces. More walls = stronger, smoother part.",
    style: {},
    valColor: "",
  },
  {
    title: "Gyroid Infill",
    value: "40% density · Equal strength all directions",
    desc: "The internal lattice between the walls. We use gyroid infill — a mathematically optimal pattern that gives equal strength in all directions. At 40% you get ~85% of solid strength at a fraction of the material. Functional parts go to 60–80%.",
    style: { borderColor: "#333" },
    valColor: "",
  },
  {
    title: "Bottom Skin Layers",
    value: "4–6 solid layers · Build plate adhesion zone",
    desc: "The solid base layers at the bottom of the part — bonded directly to the build plate. These are critical for adhesion and flatness. Like the top skin, they are fully solid. The bottom skin determines whether your part warps or stays flat.",
    style: {},
    valColor: "",
  },
];

const PRINT_STEPS = [
  {
    n: "01",
    title: "Heat Up",
    desc: "The nozzle heats to 200–240°C depending on material. The bed heats to 50–110°C. This takes 3–5 minutes. Temperature stability before printing is critical — cold extrusion causes under-extrusion and layer adhesion failures.",
    icon: (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        <rect
          x="34"
          y="4"
          width="12"
          height="36"
          rx="6"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="2"
        />
        <rect
          x="36"
          y="24"
          width="8"
          height="18"
          rx="4"
          fill="#f05c1e"
          opacity=".8"
        />
        <circle cx="40" cy="48" r="10" fill="#f05c1e" />
        <circle cx="40" cy="48" r="6" fill="#c44820" />
        <line x1="46" y1="10" x2="50" y2="10" stroke="#333" strokeWidth="1.5" />
        <line x1="46" y1="18" x2="50" y2="18" stroke="#333" strokeWidth="1.5" />
        <line
          x1="46"
          y1="26"
          x2="52"
          y2="26"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <text x="54" y="29" fontFamily="'DM Mono'" fontSize="8" fill="#f05c1e">
          220°
        </text>
      </svg>
    ),
  },
  {
    n: "02",
    title: "First Layer",
    desc: "The most critical layer. The nozzle moves slowly at 20–30% of normal speed. Perfect bed adhesion here means the rest of the print succeeds. Too close = nozzle scrapes the bed. Too far = spaghetti.",
    icon: (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        <rect x="4" y="46" width="72" height="8" rx="1" fill="#2a2a2a" />
        <rect
          x="8"
          y="40"
          width="64"
          height="7"
          rx="1"
          fill="#f05c1e"
          opacity=".6"
        />
        <polygon points="30,10 50,10 46,26 34,26" fill="#444" />
        <polygon points="34,26 46,26 43,34 37,34" fill="#f05c1e" />
        <line
          x1="8"
          y1="36"
          x2="72"
          y2="36"
          stroke="#2a2a2a"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <polygon points="72,33 72,39 78,36" fill="#333" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Layer Stacking",
    desc: "Each layer fuses to the one below through controlled heat. At 0.2mm layer height, a 40mm tall part requires 200 individual layers. The Z-axis moves up exactly 0.2mm between each — precise to ±0.001mm.",
    icon: (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        <polygon points="10,4  66,4  72,16 16,16" fill="#f05c1e" opacity=".9" />
        <polygon points="6,20  62,20 68,32 12,32" fill="#c44820" opacity=".7" />
        <polygon points="2,36  58,36 64,48 8,48" fill="#7a2e0f" opacity=".5" />
        <polygon points="0,52 54,52 60,60 6,60" fill="#f05c1e" opacity=".2" />
        <polygon points="50,0 60,0 58,8 52,8" fill="#444" />
        <circle cx="54" cy="8" r="2" fill="#f05c1e" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Cooling & Bridging",
    desc: "A part cooling fan blasts the extruded plastic immediately after deposition. Fast cooling = sharper details. For bridges (unsupported horizontal spans), cooling speed determines whether the print droops or holds clean.",
    icon: (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        <rect x="6" y="20" width="14" height="34" rx="1" fill="#2a2a2a" />
        <rect x="60" y="20" width="14" height="34" rx="1" fill="#2a2a2a" />
        <rect
          x="20"
          y="18"
          width="40"
          height="6"
          rx="1"
          fill="#f0ede6"
          opacity=".7"
        />
        <line
          x1="40"
          y1="4"
          x2="40"
          y2="14"
          stroke="#888"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <polygon points="37,13 43,13 40,18" fill="#888" />
        <line
          x1="28"
          y1="6"
          x2="32"
          y2="14"
          stroke="#666"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1="52"
          y1="6"
          x2="48"
          y2="14"
          stroke="#666"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <text
          x="28"
          y="8"
          fontFamily="'DM Mono'"
          fontSize="6"
          fill="#555"
          letterSpacing=".05em"
        >
          COOL
        </text>
      </svg>
    ),
  },
  {
    n: "05",
    title: "Part Release & QC",
    desc: "Once complete, the bed cools and the part releases. We remove it, measure critical dimensions with digital calipers, and visually inspect every face. Any deviation from spec triggers a reprint — no exceptions.",
    icon: (
      <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
        <rect x="6" y="18" width="68" height="10" rx="1" fill="#2a2a2a" />
        <rect x="6" y="8" width="12" height="10" rx="1" fill="#444" />
        <rect x="6" y="28" width="12" height="10" rx="1" fill="#444" />
        <rect x="44" y="8" width="12" height="10" rx="1" fill="#f05c1e" />
        <rect x="44" y="28" width="12" height="10" rx="1" fill="#f05c1e" />
        <line x1="14" y1="18" x2="14" y2="22" stroke="#555" strokeWidth="1.5" />
        <line x1="22" y1="18" x2="22" y2="21" stroke="#555" strokeWidth="1" />
        <line x1="30" y1="18" x2="30" y2="22" stroke="#555" strokeWidth="1.5" />
        <line x1="38" y1="18" x2="38" y2="21" stroke="#555" strokeWidth="1" />
        <text x="56" y="24" fontFamily="'DM Mono'" fontSize="7" fill="#f05c1e">
          ±0.2
        </text>
      </svg>
    ),
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

const QUALITY_FACTORS = [
  {
    name: "Layer Height",
    lo: "0.05mm",
    mid: "0.20mm",
    hi: "0.40mm",
    barW: "55%",
    desc: "Thinner layers = finer detail but longer print time. Our default 0.2mm balances quality and speed. For visual parts we go to 0.1mm; for structural parts 0.3mm.",
  },
  {
    name: "Print Speed",
    lo: "20mm/s",
    mid: "60mm/s",
    hi: "200mm/s",
    barW: "35%",
    desc: "Slower speeds give filament more time to cool and bond. We print at conservative speeds for every production part — fast printers are for demos, not deliverables.",
  },
  {
    name: "Infill Density",
    lo: "10%",
    mid: "40%",
    hi: "100%",
    barW: "40%",
    desc: "Higher infill = heavier, stronger, slower, more material. Our standard is 40% gyroid — equal strength in all directions. Functional parts may go to 60–80%.",
  },
  {
    name: "Wall Count",
    lo: "2 walls",
    mid: "4 walls",
    hi: "8 walls",
    barW: "45%",
    desc: "More perimeter walls = stronger shell, better surface finish. For functional parts we use 4–6 walls. Decorative models can use 2–3.",
  },
  {
    name: "Orientation",
    lo: "",
    mid: "Print orientation matters most",
    hi: "",
    barW: "80%",
    desc: "Parts are weakest between layers (Z-axis). We orient every model so the primary load direction is perpendicular to layer lines — the single biggest quality decision we make.",
  },
  {
    name: "Temperature",
    lo: "185°C",
    mid: "215°C",
    hi: "260°C",
    barW: "50%",
    desc: "Too cold = poor layer adhesion, under-extrusion. Too hot = stringing, drooping. We dial in exact temperatures for each material and brand of filament we run.",
  },
];

const FINISHING = [
  {
    title: "Sanding & Smoothing",
    desc: "Progressive grit sanding from 120 to 800 removes layer lines and creates a smooth surface ready for paint. Wet-sanding at final grit gives a near-polished result on functional and visible faces.",
  },
  {
    title: "Primer & Filler",
    desc: "High-build filler primer fills remaining micro surface texture after sanding. Applied in 2–3 coats, sanded between each. Hides the FDM origin completely and provides a uniform surface for topcoat adhesion.",
  },
  {
    title: "Spray Paint & Colour",
    desc: "Parts sprayed in our ventilated spray booth. We match RAL or Pantone colour references on request. Acrylic lacquer for consumer parts, two-part epoxy for outdoor or mechanical use. Clear coat for gloss or matte finish.",
  },
  {
    title: "Acetone Vapour Polish",
    desc: "ABS parts chemically smoothed using acetone vapour — melts the outer 0.1mm into a glass-smooth surface with zero sanding. Used for display models, presentation prototypes, and curved organic surfaces.",
  },
  {
    title: "Epoxy Coating",
    desc: "XTC-3D brush-on epoxy adds a hard, high-gloss shell over the printed part. Self-levels into layer lines. Creates a waterproof, chemically resistant surface. We account for the 0.5–1mm thickness in the pre-coating model.",
  },
  {
    title: "Heat-Set Brass Inserts",
    desc: "M2–M6 brass inserts pressed in with a soldering iron, creating durable threaded connections. Sized correctly for insert OD, installed flush. Parts with inserts can be assembled and disassembled like metal hardware.",
  },
];

export default function Learn() {
  const nav = useNavigate();
  useReveal();
  useAnimatedBars();
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
    <div style={{ background: "var(--blk)" }}>
      {/* ── HERO ── */}
      <section className="learn-hero">
        <div className="learn-hero-bg" />

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
          HOW
            <em style={{ fontStyle: "normal", color: "#f05c1e" }}>-IT-WORKS</em>
          </span>
        </div>
        <div className="eyebrow or rv">Education · How It Works</div>
        <h1 className="learn-h1 rv d1">
          HOW
          <br />
          <em>3D PRINTING</em>
          <br />
          WORKS.
        </h1>
        <p className="learn-sub rv d2">
          Everything about FDM printing — from machine parts to why your file
          becomes a solid object. Real mechanics, no fluff.
        </p>
      </section>

      {/* ── 01 PRINTER PARTS ── */}
      <section className="sec-pad" style={{ background: "var(--s1)" }}>
        <div className="sh rv">
          <h2 className="sh-t">Parts of a 3D Printer</h2>
          <span className="sh-s">01 — The Machine</span>
        </div>
        <div className="parts-grid">
          {PRINTER_PARTS.map((p, i) => (
            <div key={p.n} className={`part-card rv d${(i % 3) + 1}`}>
              <div className="part-num">{p.n}</div>
              <div className="part-icon">{p.icon}</div>
              <div className="part-name">{p.name}</div>
              <div className="part-role">{p.role}</div>
              <p className="part-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 02 FILAMENT GUIDE ── */}
      <section className="sec-pad" style={{ background: "var(--blk)" }}>
        <div className="sh rv">
          <h2 className="sh-t">Filament Guide</h2>
          <span className="sh-s">02 — Materials</span>
        </div>
        <div className="filament-chart">
          {FILAMENTS.map((f, i) => (
            <div
              key={f.name}
              className={`fil-col ${f.highlight ? "highlight" : ""} rv d${i + 1}`}
            >
              <div className="fil-name">{f.name}</div>
              <div className="fil-tag">{f.tag}</div>
              <div className="fil-bar-wrap">
                {f.bars.map((b) => (
                  <div key={b.l} className="fil-bar-row">
                    <div className="fil-bar-label">
                      {b.l}
                      <span>{b.v}</span>
                    </div>
                    <div className="fil-bar-track">
                      <div
                        className="fil-bar-fill"
                        style={{ width: `${b.w}%`, background: b.c }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="fil-best">{f.best}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 LAYER ANATOMY ── */}
      <section className="sec-pad">
        <div className="sh rv">
          <h2 className="sh-t">Anatomy of a Layer</h2>
          <span className="sh-s">03 — Layer Science</span>
        </div>
        <div className="layer-infog rv">
          {/* Left: visual */}
          <div className="layer-visual">
            <div
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "8.5px",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--g3)",
                marginBottom: 20,
              }}
            >
              Cross-section · 20 layers shown · ↑ top skin stronger ↑
            </div>
            <LayerDiagram />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 8,
                  color: "var(--g3)",
                  letterSpacing: ".1em",
                }}
              >
                ↓ Base layer (bottom skin)
              </span>
              <span
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 8,
                  color: "var(--or)",
                  letterSpacing: ".1em",
                }}
              >
                ↑ Top layer (top skin)
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              {[
                { c: "#f05c1e", label: "Top/bottom skin (solid)" },
                { c: "#c44820", label: "Perimeter walls" },
                {
                  c: "#1e1e1e",
                  label: "Infill (gyroid 40%)",
                  border: "1px solid #333",
                },
              ].map((lg) => (
                <div
                  key={lg.label}
                  style={{ display: "flex", alignItems: "center", gap: 7 }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 10,
                      background: lg.c,
                      border: lg.border || "none",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 8,
                      color: "var(--g4)",
                      letterSpacing: ".1em",
                    }}
                  >
                    {lg.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: legend */}
          <div className="layer-legend">
            {LAYER_LEGEND.map((ll) => (
              <div key={ll.title} className="ll-item" style={ll.style}>
                <div className="ll-title">{ll.title}</div>
                <div
                  className="ll-value"
                  style={ll.valColor ? { color: ll.valColor } : {}}
                >
                  {ll.value}
                </div>
                <p className="ll-desc">{ll.desc}</p>
              </div>
            ))}
            {/* settings box */}
            <div
              style={{
                background: "var(--s1)",
                padding: "18px 20px",
                borderLeft: "3px solid var(--or)",
                marginTop: 4,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 8,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--g3)",
                  marginBottom: 12,
                }}
              >
                Our Standard Settings
              </div>
              {[
                ["Layer height", "0.2mm"],
                ["Wall count", "4 perimeters"],
                ["Infill pattern", "Gyroid 40%"],
                ["Top/bottom skins", "6 layers"],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--ff-mono)",
                    fontSize: 9,
                    borderBottom:
                      i < arr.length - 1 ? "1px solid var(--s2)" : "none",
                    paddingBottom: i < arr.length - 1 ? 8 : 0,
                    marginBottom: i < arr.length - 1 ? 8 : 0,
                  }}
                >
                  <span style={{ color: "var(--g4)" }}>{k}</span>
                  <span style={{ color: "var(--or)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 PRINT PROCESS ── */}
      <section className="sec-pad" style={{ background: "var(--s1)" }}>
        <div className="sh rv">
          <h2 className="sh-t">The Printing Process</h2>
          <span className="sh-s">04 — Step by Step</span>
        </div>
        <div className="deep-steps">
          {PRINT_STEPS.map((s, i) => (
            <div key={s.n} className={`deep-step rv d${(i % 4) + 1}`}>
              <div className="ds-num">{s.n}</div>
              <div className="ds-content">
                <h3 className="ds-title">{s.title}</h3>
                <p className="ds-desc">{s.desc}</p>
              </div>
              <div className="ds-visual">{s.icon}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 QUALITY FACTORS ── */}
      <section className="sec-pad">
        <div className="sh rv">
          <h2 className="sh-t">What Determines Quality</h2>
          <span className="sh-s">05 — Quality Factors</span>
        </div>
        <div className="quality-grid">
          {QUALITY_FACTORS.map((q, i) => (
            <div key={q.name} className={`qf-item rv d${(i % 3) + 1}`}>
              <div className="qf-name">{q.name}</div>
              <div className="qf-bar-wrap">
                <div
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 8,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--g3)",
                    marginBottom: 6,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{q.lo}</span>
                  <span style={{ color: "var(--or)" }}>{q.mid}</span>
                  <span>{q.hi}</span>
                </div>
                <div className="qf-level">
                  <div className="qf-level-fill" style={{ width: q.barW }} />
                </div>
              </div>
              <p className="qf-desc">{q.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 PAINTING & FINISHING ── */}
      <section className="sec-pad" style={{ background: "var(--s1)" }}>
        <div className="sh rv">
          <h2 className="sh-t">Painting &amp; Finishing</h2>
          <span className="sh-s">06 — Post-Processing</span>
        </div>
        <p
          className="rv"
          style={{
            fontSize: 15,
            color: "var(--g5)",
            maxWidth: 680,
            lineHeight: 1.85,
            marginBottom: 64,
          }}
        >
          A printed part is just the beginning. Post-processing determines
          whether your part looks raw or production-ready. We offer a full
          finishing pipeline — from sanding to spray-booth colour matching.
        </p>
        <div className="quality-grid">
          {FINISHING.map((f, i) => (
            <div key={f.title} className={`qf-item rv d${(i % 3) + 1}`}>
              <div
                style={{
                  width: 32,
                  height: 3,
                  background: "var(--or)",
                  marginBottom: 18,
                }}
              />
              <div className="qf-name">{f.title}</div>
              <p className="qf-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "100px 48px",
          background: "var(--blk)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 28,
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--s2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%,rgba(240,92,30,.06),transparent 70%)",
          }}
        />
        <h2
          style={{
            fontFamily: "var(--ff-cond)",
            fontWeight: 900,
            fontSize: "clamp(44px,8vw,96px)",
            lineHeight: 0.88,
            position: "relative",
          }}
          className="rv"
        >
          READY TO
          <br />
          <em style={{ fontStyle: "italic", color: "var(--or)" }}>PRINT?</em>
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--g5)",
            fontWeight: 300,
            maxWidth: 380,
            lineHeight: 1.8,
            position: "relative",
          }}
          className="rv d1"
        >
          Now you know how it works — let's build something together.
        </p>
        <div
          style={{ display: "flex", gap: 16, position: "relative" }}
          className="rv d2"
        >
          <button className="btn-or" onClick={goQuote}>
            Get a Quote
          </button>
          <button className="btn-ghost" onClick={() => nav("/")}>
            Back to Home
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
            © 2026 SolidLabs · How 3D Printing Works · Bengaluru
          </div>
        </div>
      </footer>
    </div>
  );
}
