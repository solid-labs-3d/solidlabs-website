import { useState, useEffect } from "react"
import { createUser,attachUserToCart } from "../api/apiClient"

export default function LoginModal({ open, onClose, onSuccess }) {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    if (open) {
      setName("")
      setPhone("")
    }
  }, [open])

  if (!open) return null


  const handleLogin = async () => {

  if (!name || phone.length !== 10) {
    alert("Enter valid details");
    return;
  }

  try {

    const user = await createUser(name, phone);

    console.log("User returned:", user); // ← add this to see what comes back

    if (!user || !user.id) {
      alert("Login failed - no user returned");
      return;
    }

    const user_id = user.id;

    localStorage.setItem("user_id", user_id);

    const cart_id = localStorage.getItem("cart_id");

    if (cart_id) {
      await attachUserToCart(cart_id, user_id);
    }

    alert("Login successful");

    onSuccess(user);   // ← pass user here
    onClose();

  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};



  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>

        <div style={headerStyle}>
          <div style={titleStyle}>Login</div>
          <button onClick={onClose} style={closeStyle}>✕</button>
        </div>

        <div style={labelStyle}>Enter Name</div>

        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={inputStyle}
          placeholder="Your Name"
        />

        <div style={labelStyle}>Enter Mobile Number</div>

        <input
          type="tel"
          maxLength={10}
          value={phone}
          onChange={(e)=>{
            if(/^\d*$/.test(e.target.value)){
              setPhone(e.target.value)
            }
          }}
          style={inputStyle}
          placeholder="10 Digit Number"
        />

        <button
          style={buttonStyle}
          onClick={handleLogin}
        >
          Login →
        </button>

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