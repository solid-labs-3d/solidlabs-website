import { useReveal } from "../hooks/useReveal";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../components/Cart";

const TICKER_ITEMS = [
  "PLA+ Filament",
  "2–3 Day Shipping",
  "14+ Colours",
  "Designed in Bengaluru",
  "PETG / PLA+ / TPU",
  "Custom Orders Welcome",
  "Quality Checked",
  "Same Day Dispatch",
];

const PRODUCTS = [
  {
    id: "SL-001",
    name: "Keychain Set",
    price: 299,
    desc: "Set of 3 — standard loop, carabiner clip, and bottle opener. Solid PLA+, zero flex, lifetime use.",
    colors: ["#f05c1e", "#111", "#f0ede6", "#1e4a2a", "#2a1e4a"],
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle
          cx="40"
          cy="26"
          r="14"
          fill="none"
          stroke="#f05c1e"
          strokeWidth="2"
        />
        <circle
          cx="40"
          cy="26"
          r="7"
          fill="none"
          stroke="#c44820"
          strokeWidth="2"
        />
        <circle cx="40" cy="26" r="2.5" fill="#f05c1e" />
        <rect x="37" y="40" width="6" height="32" rx="3" fill="#c44820" />
        <rect x="34" y="55" width="12" height="14" rx="2" fill="#1a0800" />
        <polygon points="34,56 46,56 44,60 36,60" fill="#f05c1e" opacity=".5" />
        <polygon points="34,62 46,62 44,66 36,66" fill="#f05c1e" opacity=".3" />
      </svg>
    ),
  },
  {
    id: "SL-002",
    name: "Desk Organiser",
    price: 549,
    desc: "4-compartment modular desk tray. Holds pens, styluses, rulers, USB drives. Weighted base, no-tip design.",
    colors: ["#f05c1e", "#0a0a0a", "#f0ede6"],
    icon: (
      <svg width="88" height="72" viewBox="0 0 88 72" fill="none">
        <rect
          x="8"
          y="30"
          width="72"
          height="34"
          rx="2"
          fill="#0e0500"
          stroke="#2a1200"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="10"
          width="14"
          height="56"
          rx="1"
          fill="#200c00"
          stroke="#f05c1e"
          strokeWidth="1"
        />
        <rect
          x="32"
          y="18"
          width="14"
          height="48"
          rx="1"
          fill="#200c00"
          stroke="#c44820"
          strokeWidth="1"
        />
        <rect
          x="50"
          y="24"
          width="14"
          height="42"
          rx="1"
          fill="#200c00"
          stroke="#7a2e0f"
          strokeWidth="1"
        />
        <rect
          x="68"
          y="30"
          width="8"
          height="36"
          rx="1"
          fill="#200c00"
          stroke="#3a1400"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: "SL-003",
    name: "Cable Manager",
    price: 199,
    desc: "Triple-port adhesive cable clip. Routes USB-C, Lightning, and HDMI. Mounts anywhere. TPU base for grip.",
    colors: ["#f05c1e", "#111", "#f0ede6", "#4a2060"],
    icon: (
      <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
        <rect
          x="10"
          y="24"
          width="60"
          height="24"
          rx="4"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <circle
          cx="24"
          cy="36"
          r="7"
          fill="#0e0500"
          stroke="#c44820"
          strokeWidth="1"
        />
        <circle
          cx="40"
          cy="36"
          r="7"
          fill="#0e0500"
          stroke="#c44820"
          strokeWidth="1"
        />
        <circle
          cx="56"
          cy="36"
          r="7"
          fill="#0e0500"
          stroke="#c44820"
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="8"
          x2="24"
          y2="29"
          stroke="#f05c1e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="40"
          y1="4"
          x2="40"
          y2="29"
          stroke="#f05c1e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="8"
          x2="56"
          y2="29"
          stroke="#f05c1e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="43"
          x2="16"
          y2="64"
          stroke="#7a2e0f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="40"
          y1="43"
          x2="40"
          y2="68"
          stroke="#7a2e0f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="56"
          y1="43"
          x2="64"
          y2="64"
          stroke="#7a2e0f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "SL-004",
    name: "Phone Stand",
    price: 449,
    desc: "Minimalist angled phone dock. 65° viewing angle. Fits all phones up to 80mm wide. Non-slip TPU pads included.",
    colors: ["#f05c1e", "#111", "#f0ede6"],
    icon: (
      <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
        <polygon
          points="8,72 64,72 56,16 16,16"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <rect
          x="22"
          y="16"
          width="28"
          height="40"
          rx="3"
          fill="#0e0500"
          stroke="#c44820"
          strokeWidth="1"
        />
        <rect x="26" y="20" width="20" height="28" rx="2" fill="#1a0800" />
        <rect
          x="28"
          y="22"
          width="16"
          height="24"
          rx="1"
          fill="#f05c1e"
          opacity=".08"
        />
        <circle cx="36" cy="52" r="2" fill="#c44820" />
      </svg>
    ),
  },
  {
    id: "SL-005",
    name: "Cable Wrap",
    price: 149,
    desc: "Magnetic cable wrap with integrated clip. Keeps USB-C and audio cables tangle-free. Pack of 3.",
    colors: ["#f05c1e", "#111", "#f0ede6", "#2a4a6a"],
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle
          cx="36"
          cy="36"
          r="22"
          fill="none"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <circle
          cx="36"
          cy="36"
          r="14"
          fill="none"
          stroke="#c44820"
          strokeWidth="1"
        />
        <circle
          cx="36"
          cy="36"
          r="6"
          fill="#1a0800"
          stroke="#7a2e0f"
          strokeWidth="1"
        />
        <path
          d="M36 14 Q50 20 58 36 Q50 52 36 58"
          fill="none"
          stroke="#f05c1e"
          strokeWidth="1.5"
          opacity=".5"
        />
        <circle cx="36" cy="14" r="3" fill="#f05c1e" />
      </svg>
    ),
  },
  {
    id: "SL-006",
    name: "Headphone Hook",
    price: 349,
    desc: "Under-desk headphone hook. No tools required — attaches via adhesive tape. Holds up to 1.5kg.",
    colors: ["#f05c1e", "#111"],
    icon: (
      <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
        <rect
          x="8"
          y="6"
          width="56"
          height="10"
          rx="5"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <path
          d="M36 16 Q36 50 20 56"
          fill="none"
          stroke="#c44820"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect
          x="12"
          y="52"
          width="16"
          height="20"
          rx="8"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="62" r="4" fill="#f05c1e" opacity=".4" />
      </svg>
    ),
  },
  {
    id: "SL-007",
    name: "Wall Shelf Bracket",
    price: 699,
    desc: "Minimalist floating shelf bracket. Pair of 2. Rated at 8kg per bracket. Concealed fasteners.",
    colors: ["#f05c1e", "#111", "#f0ede6"],
    icon: (
      <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
        <rect
          x="6"
          y="8"
          width="8"
          height="56"
          rx="2"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="8"
          width="60"
          height="10"
          rx="2"
          fill="#140800"
          stroke="#c44820"
          strokeWidth="1"
        />
        <path
          d="M14 18 Q36 24 66 18"
          fill="none"
          stroke="#7a2e0f"
          strokeWidth="1"
        />
        <rect
          x="14"
          y="56"
          width="60"
          height="8"
          rx="2"
          fill="#1a0800"
          stroke="#3a1400"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: "SL-008",
    name: "Laptop Riser",
    price: 899,
    desc: 'Ergonomic 10° laptop elevation stand. Improves airflow and viewing angle. Holds up to 17" laptops, 5kg rating.',
    colors: ["#111", "#f0ede6"],
    icon: (
      <svg width="88" height="64" viewBox="0 0 88 64" fill="none">
        <polygon
          points="6,58 82,58 76,16 12,16"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <rect
          x="18"
          y="16"
          width="52"
          height="28"
          rx="2"
          fill="#0e0500"
          stroke="#c44820"
          strokeWidth="1"
        />
        <rect x="22" y="20" width="44" height="20" rx="1" fill="#1a0800" />
        <line
          x1="22"
          y1="28"
          x2="66"
          y2="28"
          stroke="#200c00"
          strokeWidth="1"
        />
        <line
          x1="22"
          y1="34"
          x2="66"
          y2="34"
          stroke="#200c00"
          strokeWidth="1"
        />
        <rect
          x="30"
          y="52"
          width="28"
          height="8"
          rx="2"
          fill="#f05c1e"
          opacity=".3"
        />
      </svg>
    ),
  },
  {
    id: "SL-009",
    name: "Monitor Riser",
    price: 1249,
    desc: "Hollow monitor stand with cable passthrough and keyboard storage underneath. 15kg capacity. Smooth surface.",
    colors: ["#f05c1e", "#111"],
    icon: (
      <svg width="88" height="72" viewBox="0 0 88 72" fill="none">
        <rect
          x="6"
          y="8"
          width="76"
          height="46"
          rx="3"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <rect x="10" y="12" width="68" height="38" rx="2" fill="#0e0500" />
        <rect x="14" y="16" width="60" height="30" rx="1" fill="#1a0800" />
        <rect
          x="34"
          y="54"
          width="20"
          height="10"
          rx="1"
          fill="#c44820"
          opacity=".4"
        />
        <rect
          x="24"
          y="64"
          width="40"
          height="6"
          rx="2"
          fill="#200c00"
          stroke="#c44820"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: "SL-010",
    name: "Card Holder",
    price: 299,
    desc: "Slim fan-style business card holder. Holds up to 30 cards. Spring mechanism for clean single-card dispense.",
    colors: ["#f05c1e", "#111", "#f0ede6", "#2a4a1a"],
    icon: (
      <svg width="76" height="68" viewBox="0 0 76 68" fill="none">
        <rect
          x="10"
          y="12"
          width="56"
          height="36"
          rx="3"
          fill="#140800"
          stroke="#f05c1e"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="8"
          width="48"
          height="32"
          rx="3"
          fill="#0e0500"
          stroke="#c44820"
          strokeWidth="1"
          transform="rotate(-6 38 34)"
        />
        <rect
          x="16"
          y="20"
          width="44"
          height="28"
          rx="3"
          fill="#0e0500"
          stroke="#7a2e0f"
          strokeWidth="1"
        />
        <line
          x1="18"
          y1="30"
          x2="58"
          y2="30"
          stroke="#f05c1e"
          strokeWidth="1.5"
          opacity=".3"
        />
        <line
          x1="18"
          y1="38"
          x2="50"
          y2="38"
          stroke="#f05c1e"
          strokeWidth="1"
          opacity=".2"
        />
        <rect
          x="28"
          y="52"
          width="20"
          height="10"
          rx="2"
          fill="#f05c1e"
          opacity=".25"
        />
      </svg>
    ),
  },
  {
    id: "SL-011",
    name: "Plant Pot Clip",
    price: 249,
    desc: "Railing or shelf-mount plant pot clip. Fits round pots 80–130mm. PETG construction — UV and moisture resistant.",
    colors: ["#1a3a1a", "#f05c1e", "#f0ede6"],
    icon: (
      <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
        <ellipse
          cx="36"
          cy="52"
          rx="24"
          ry="20"
          fill="#0e0500"
          stroke="#c44820"
          strokeWidth="1.5"
        />
        <path
          d="M22 52 Q22 32 36 12"
          fill="none"
          stroke="#3a2010"
          strokeWidth="2"
        />
        <path
          d="M50 52 Q50 32 36 12"
          fill="none"
          stroke="#3a2010"
          strokeWidth="2"
        />
        <path
          d="M16 48 Q28 44 36 12"
          fill="none"
          stroke="#f05c1e"
          strokeWidth="1.5"
          opacity=".6"
        />
        <ellipse
          cx="36"
          cy="68"
          rx="22"
          ry="8"
          fill="#1a0800"
          stroke="#c44820"
          strokeWidth="1"
        />
        <rect
          x="28"
          y="8"
          width="16"
          height="6"
          rx="1"
          fill="#200c00"
          stroke="#f05c1e"
          strokeWidth="1"
        />
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

function ProductCard({ product, delay = "" }) {
  return (
    <div className={`oc rv ${delay}`}>
      <div className="oc-num">{product.id}</div>
      <div className="oc-icon">{product.icon}</div>
      <div className="oc-name">{product.name}</div>
      <div className="oc-desc">{product.desc}</div>
      <div className="oc-colors">
        {product.colors.map((c, i) => (
          <div
            key={i}
            className="oc-col"
            style={{
              background: c,
              border:
                c === "#111" || c === "#0a0a0a" ? "1px solid #333" : "none",
            }}
          />
        ))}
      </div>
      <div className="oc-bot">
        <div className="oc-price">₹{product.price.toLocaleString("en-IN")}</div>
        <button
          className="obtn"
          onClick={() => addToCart(product.name, product.price)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Originals() {
  const nav = useNavigate();
  useReveal();
  const openCart = () =>
    document.getElementById("cart-overlay")?.classList.toggle("open");

  return (
    <div style={{ background: "#0a0400" }}>
      {/* HERO */}
      <section className="or-hero">
        <div className="or-hero-bg" />
        <div className="or-hero-grid" />
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
            SL-
            <em style={{ fontStyle: "normal", color: "#f05c1e" }}>ORIGINALS</em>
          </span>
        </div>
        <div className="eyebrow or rv" style={{ position: "relative" }}>
          01 — SL Originals · D2C Collection
        </div>
        <h1 className="or-h1 rv d1" style={{ position: "relative" }}>
          DESIGNED
          <br />
          HERE.
          <br />
          <em>SHIPPED FAST.</em>
        </h1>
        <div
          className="rv d2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #2a1200",
            paddingTop: 24,
            position: "relative",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "#666",
              maxWidth: 400,
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Our own line of 3D printed consumer products. Designed in Bengaluru,
            printed in-house, and shipped to your door in 2–3 days. Every object
            has a reason to exist.
          </p>
          <button className="obtn" onClick={openCart}>
            View Cart
          </button>
        </div>
      </section>

      {/* TICKER */}
      <div
        style={{
          background: "var(--or)",
          borderBottom: "1px solid rgba(0,0,0,.15)",
        }}
      >
        <div className="ticker">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span className="ti" key={i} style={{ color: "var(--blk)" }}>
                {t} <span className="td">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="or-grid" style={{ background: "#200c00" }}>
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} delay={`d${(i % 4) + 1}`} />
        ))}

        {/* Custom Order */}
        <div
          className="oc or-highlight rv"
          style={{ background: " var(--or)" }}
        >
          <div className="oc-num">SL-Custom</div>
          <div
            className="oc-icon"
            style={{ justifyContent: "flex-start", marginTop: "auto" }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <line
                x1="32"
                y1="4"
                x2="32"
                y2="60"
                stroke="rgba(0,0,0,.25)"
                strokeWidth="3"
              />
              <line
                x1="4"
                y1="32"
                x2="60"
                y2="32"
                stroke="rgba(0,0,0,.25)"
                strokeWidth="3"
              />
              <circle
                cx="32"
                cy="32"
                r="18"
                fill="none"
                stroke="rgba(0,0,0,.2)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <circle cx="32" cy="32" r="6" fill="rgba(0,0,0,.3)" />
            </svg>
          </div>
          <div className="oc-name">Custom Order</div>
          <div className="oc-desc" style={{ color: "rgba(0,0,0,.5)" }}>
            Your idea, our materials and machines. Send a sketch, file, or
            reference. We design and print within 48 hours.
          </div>
          <div className="oc-bot">
            <div className="oc-price por" style={{ color: "var(--blk)" }}>
              Price on Request
            </div>
            <button
              className="obtn"
              style={{ background: "var(--blk)", color: "var(--or)" }}
              onClick={() => {
                nav("/");
                setTimeout(
                  () =>
                    document
                      .getElementById("contact-sec")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  80,
                );
              }}
            >
              Brief Us →
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0a0400", borderTop: "1px solid #2a1200" }}>
        <div className="site-footer">
          <div className="fl-logo">
            <svg width="28" height="26" viewBox="0 0 56 52" fill="none">
              <polygon points="8,1 46,1 52,14 14,14" fill="#f05c1e" />
              <polygon points="5,20 43,20 49,33 11,33" fill="#c44820" />
              <polygon points="2,39 40,39 46,52 8,52" fill="#7a2e0f" />
            </svg>
            <span className="fl-name">SOLIDLABS</span>
          </div>
          <div className="fl-copy" style={{ color: "#2a1200" }}>
            © 2025 SolidLabs · SL Originals · Bengaluru
          </div>
        </div>
      </footer>
    </div>
  );
}
