import { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { sendContactEmail } from "../api/apiClient";

/* ── Named export — call from anywhere to open the modal ── */
export function openContactModal() {
  window.dispatchEvent(new Event("open-contact-modal"));
}

/* ── Animations ── */
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Modal-only styled components ── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease;
  overflow-y: auto;
`;

const ModalShell = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.25s ease;
  scrollbar-width: thin;
  scrollbar-color: var(--or) transparent;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(240, 92, 30, 0.4);
  background: var(--blk);
  color: var(--or);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: var(--or);
    color: var(--blk);
    border-color: var(--or);
  }
`;

/* ── Shared inner form with full API integration ── */
function ContactInner() {
  const fileInputRef = useRef(null);
  const dropZoneRef  = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      if (dropZoneRef.current) {
        dropZoneRef.current.style.borderColor = "#f05c1e";
        dropZoneRef.current.querySelector(".fup-label").textContent = f.name;
      }
    }
  };

  const handleSubmit = async () => {
    const { name, email, description } = form;

    if (!name || !email || !description) {
      setErrorMsg("Name, email, and message are required.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await sendContactEmail({ name, email, description, file });
      setStatus("success");
      setForm({ name: "", email: "", description: "" });
      setFile(null);
      if (dropZoneRef.current) {
        dropZoneRef.current.style.borderColor = "";
        dropZoneRef.current.querySelector(".fup-label").textContent =
          "DROP FILE OR CLICK TO UPLOAD";
      }
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Failed to send. Please try again."
      );
      setStatus("error");
    }
  };

  return (
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
            hello@solidlabs.in
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
          <input
            className="fi"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="ff">
          <label className="fl">EMAIL</label>
          <input
            className="fi"
            type="email"
            name="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="ff">
          <label className="fl">PROJECT BRIEF</label>
          <textarea
            className="ft"
            name="description"
            placeholder="Describe your part, quantity, material, timeline..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="ff">
          <label className="fl">UPLOAD FILE (STL, STEP, OBJ, PDF, PNG)</label>
          <div
            id="fup"
            ref={dropZoneRef}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginBottom: 8 }}
            >
              <line x1="12" y1="16" x2="12" y2="4" stroke="var(--g3)" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="8,8 12,4 16,8" stroke="var(--g3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="4" y1="20" x2="20" y2="20" stroke="var(--g3)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="fup-label">DROP FILE OR CLICK TO UPLOAD</div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Error message */}
        {status === "error" && (
          <p style={{ color: "#ef4444", fontSize: 13, margin: "8px 0 0", fontFamily: "var(--ff-cond)", letterSpacing: "0.04em" }}>
            ✕ {errorMsg}
          </p>
        )}

        {/* Success message */}
        {status === "success" && (
          <p style={{ color: "#22c55e", fontSize: 13, margin: "8px 0 0", fontFamily: "var(--ff-cond)", letterSpacing: "0.04em" }}>
            ✓ Sent! We'll reply within 2 hours.
          </p>
        )}

        <button
          className="fsub"
          onClick={handleSubmit}
          disabled={status === "loading"}
          style={status === "loading" ? { opacity: 0.6, cursor: "not-allowed" } : {}}
        >
          {status === "loading" ? "SENDING..." : "SEND MESSAGE →"}
        </button>
      </div>
    </div>
  );
}

/* ── Modal instance — lives globally, opens on event ── */
export function ContactModal() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <Overlay
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) setOpen(false); }}
    >
      <ModalShell>
        <CloseBtn onClick={() => setOpen(false)} aria-label="Close">✕</CloseBtn>
        <ContactInner />
      </ModalShell>
    </Overlay>
  );
}

/* ── Default export — inline on-page version (used in Home.jsx) ── */
export default function ContactCard() {
  return <ContactInner />;
}