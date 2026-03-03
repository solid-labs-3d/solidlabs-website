import { useState, useRef, useEffect } from "react"

export default function LoginModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])

  const inputsRef = useRef([])

  useEffect(() => {
    if (open) {
      setStep("phone")
      setPhone("")
      setOtp(["", "", "", ""])
    }
  }, [open])

  if (!open) return null

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const updated = [...otp]
    updated[index] = value
    setOtp(updated)

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus()
    }

    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const verifyOtp = () => {
    if (otp.join("") === "0000") {
      onSuccess()
      onClose()
    } else {
      alert("Invalid OTP")
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        
        <div style={headerStyle}>
          <div style={titleStyle}>Login</div>
          <button onClick={onClose} style={closeStyle}>✕</button>
        </div>

        {step === "phone" && (
          <>
            <div style={labelStyle}>Enter Mobile Number</div>

            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setPhone(e.target.value)
                }
              }}
              style={inputStyle}
              placeholder="10 Digit Number"
            />

            <button
              style={buttonStyle}
              disabled={phone.length !== 10}
              onClick={() => setStep("otp")}
            >
              Send OTP →
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <div style={labelStyle}>Enter 4 Digit OTP</div>

            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  style={otpBoxStyle}
                />
              ))}
            </div>

            <button style={buttonStyle} onClick={verifyOtp}>
              Verify →
            </button>

            <div style={hintStyle}>Temporary OTP: 0000</div>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Styles ───────────────────────── */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
}

const modalStyle = {
  width: 380,
  background: "#060606",
  border: "1px solid #1e1e1e",
  padding: 30
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 28
}

const titleStyle = {
  fontFamily: "var(--ff-cond, 'Barlow Condensed')",
  fontWeight: 900,
  fontSize: 22,
  color: "#f0ede6",
  letterSpacing: ".06em"
}

const closeStyle = {
  background: "transparent",
  border: "none",
  color: "#777",
  cursor: "pointer",
  fontSize: 14
}

const labelStyle = {
  fontFamily: "var(--ff-mono)",
  fontSize: 8,
  letterSpacing: ".18em",
  textTransform: "uppercase",
  color: "#9ab200",
  marginBottom: 12
}

const inputStyle = {
  width: "100%",
  padding: "14px 12px",
  background: "#0e0e0e",
  border: "1px solid #1e1e1e",
  color: "#f0ede6",
  marginBottom: 24,
  fontFamily: "var(--ff-mono)",
  fontSize: 14
}

const otpBoxStyle = {
  width: 60,
  height: 60,
  textAlign: "center",
  background: "#0e0e0e",
  border: "1px solid #1e1e1e",
  color: "#c8e600",
  fontSize: 22,
  fontWeight: 900
}

const buttonStyle = {
  width: "100%",
  padding: "14px 0",
  background: "#c8e600",
  border: "none",
  fontFamily: "var(--ff-mono)",
  fontSize: 9,
  letterSpacing: ".18em",
  textTransform: "uppercase",
  cursor: "pointer",
  color: "#000"
}

const hintStyle = {
  marginTop: 14,
  fontSize: 10,
  color: "#555",
  fontFamily: "var(--ff-mono)"
}