import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartToggle } from "./Cart";
import { cart } from "./Cart"; // ← import cart store

const SL_LOGO = (
  <svg width="32" height="30" viewBox="0 0 56 52" fill="none">
    <polygon points="8,1 46,1 52,14 14,14" fill="#f05c1e" />
    <polygon points="5,20 43,20 49,33 11,33" fill="#c44820" />
    <polygon points="2,39 40,39 46,52 8,52" fill="#7a2e0f" />
  </svg>
);

const SERVICES = [
  { label: "FDM 3D Printing", path: "/learn" },
  { label: "SLA Printing", path: "/sla-printing" },
  { label: "Injection Moulding", path: "/injection-moulding" },
  { label: "Vacuum Forming", path: "/vacuum-forming" },
  { label: "Carbon Fibre", path: "/carbon-fibre" },
  { label: "Extreme Engineering", path: "/extreme" },
];

/* ── helper — fires the modal open event from anywhere ── */
export function openContactModal() {
  window.dispatchEvent(new Event("open-contact-modal"));
}

export default function Nav({ page }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [carbonOpen, setCarbonOpen] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const update = () => {
      const total = cart.items.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(total);
    };

    update(); // run on mount

    cart.listeners.push(update);

    return () => {
      cart.listeners = cart.listeners.filter((f) => f !== update);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (path) => {
    setMobileOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  /* ── Get Quote now opens the modal directly — no navigation ── */
  const goQuote = () => {
    setMobileOpen(false);
    openContactModal();
  };

  const [open, setOpen] = useState(false);

  const toggleCart = useCartToggle();
  return (
    <>
      <nav id="main-nav" className={scrolled ? "scrolled" : ""}>
        {/* Logo */}
        <Link className="nav-logo" to="/">
          {SL_LOGO}
          <div>
            <div className="nav-logo-text">SOLIDLABS</div>
            <div className="nav-logo-sub">3D Printing &amp; Innovation</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          <li>
            <Link
              to="/originals"
              className={page === "originals" ? "active" : ""}
            >
              SL Originals
            </Link>
          </li>
          <li>
            <Link
              to="/precision"
              className={page === "precision" ? "active" : ""}
            >
              Precision B2B
            </Link>
          </li>

          {/* Extreme Eng link (dropdown removed) */}
          <li>
            <Link to="/extreme" className={page === "extreme" ? "active" : ""}>
              EXTREAM ENG
            </Link>
          </li>

          <li className="nav-dropdown">
            <Link
              className={
                page === "carbonation" || page === "CarbonationBs"
                  ? "active"
                  : ""
              }
            >
              CARBONATION
            </Link>
            <div className="nav-dropdown-menu">
              <Link to="/carbonation">CN Division</Link>
              <Link to="/CarbonationBs">BS Series</Link>
            </div>
          </li>

          <li>
            <Link
              to="/greenloop"
              className={page === "greenloop" ? "active" : ""}
            >
              GREENLOOP
            </Link>
          </li>
          <li>
            <Link
              to="/how-it-works"
              className={page === "how-it-works" ? "active" : ""}
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              to="/evidence"
              className={page === "evidence" ? "active" : ""}
            >
              Field Evidence
            </Link>
          </li>
          <li>
            <Link to="/about" className={page === "about" ? "active" : ""}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/stream" className={page === "stream" ? "active" : ""}>
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  background: "#ff2222",
                  borderRadius: "50%",
                  animation: "ldot 1.4s ease infinite",
                  marginRight: 6,
                  verticalAlign: "middle",
                }}
              />
              Live
            </Link>
          </li>
        </ul>

        {/* Desktop actions */}
        <div className="nav-actions">
          <button className="nav-cart-btn" onClick={toggleCart}>
            Cart <span id="cart-count">{cartCount}</span>
          </button>
          <button className="nav-cta" onClick={goQuote}>
            Get Quote
          </button>

          {/* Hamburger */}
          <button
            id="nav-hamburger"
            aria-label="Open menu"
            className={mobileOpen ? "open" : ""}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={mobileOpen ? "open" : ""}
        role="dialog"
        aria-label="Navigation"
      >
        <ul>
          <li>
            <a onClick={() => goTo("/")}>Home</a>
          </li>
          <li>
            <a onClick={() => goTo("/originals")}>
              <span style={{ color: "var(--or)", marginRight: 8 }}></span>SL
              Originals
            </a>
          </li>
          <li>
            <a onClick={() => goTo("/precision")}>
              <span style={{ color: "var(--yw)", marginRight: 8 }}></span>
              Precision B2B
            </a>
          </li>
          <li>
            <a onClick={() => goTo("/extreme")}>
              <span style={{ color: "var(--bl)", marginRight: 8 }}></span>
              Extreme Eng
            </a>
          </li>

          {/* Carbonation — mobile accordion */}
          <li>
            <a
              onClick={() => setCarbonOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span>
                <span style={{ color: "var(--yw)", marginRight: 8 }}></span>
                Carbonation
              </span>
              <span
                style={{
                  fontSize: 11,
                  opacity: 0.5,
                  transform: carbonOpen ? "rotate(180deg)" : "rotate(0deg)",
                  display: "inline-block",
                  transition: "transform 0.2s",
                }}
              >
                ▼
              </span>
            </a>
            {carbonOpen && (
              <ul
                style={{
                  listStyle: "none",
                  padding: "4px 0 4px 28px",
                  margin: 0,
                }}
              >
                <li>
                  <a
                    onClick={() => goTo("/carbonation")}
                    style={{ fontSize: "0.88em", opacity: 0.8 }}
                  >
                    CN Division
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => goTo("/CarbonationBs")}
                    style={{ fontSize: "0.88em", opacity: 0.8 }}
                  >
                    BS Series
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a onClick={() => goTo("/greenloop")}>
              <span style={{ color: "var(--gr)", marginRight: 8 }}></span>
              Greenloop
            </a>
          </li>
          <li>
            <a onClick={() => goTo("/how-it-works")}>
              <span style={{ color: "var(--gr)", marginRight: 8 }}></span>How It
              Works
            </a>
          </li>
          <li>
            <a onClick={() => goTo("/evidence")}>Field Evidence</a>
          </li>
          <li>
            <a onClick={() => goTo("/about")}>About Us</a>
          </li>
          <li>
            <a onClick={() => goTo("/stream")}>
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  background: "#ff2222",
                  borderRadius: "50%",
                  animation: "ldot 1.4s ease infinite",
                  marginRight: 8,
                  verticalAlign: "middle",
                }}
              />
              Live Stream
            </a>
          </li>
        </ul>
        <div className="mob-nav-foot">
          <button
            className="btn-or"
            style={{ width: "100%", textAlign: "center" }}
            onClick={goQuote}
          >
            Get a Quote →
          </button>
          <div className="mob-nav-sub">Bengaluru · India · Anyday, Anytime</div>
        </div>
      </div>
    </>
  );
}
