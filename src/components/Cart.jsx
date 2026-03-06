import { useState, useEffect } from 'react'
import LoginModal from './LoginModal'
import { createCart, updateCart, placeOrder } from "../api/apiClient"

/* ───────────────── CART STORE ───────────────── */

export const cart = {
  items: [],
  listeners: []
}

function notify() {
  cart.listeners.forEach(fn => fn([...cart.items]))
}

function openWhatsApp(items, total) {
  const phone = "918123120292"

  const itemLines = items.map(item =>
    `• ${item.name} (Product No: ${item.sku}) x${item.qty} = ₹${(item.price * item.qty).toLocaleString()}`
  ).join("\n")

  const message =
`🛒 *New Order Received!*

${itemLines}

─────────────────
💰 *Total: ₹${total.toLocaleString()}*

_Sent from SolidLabs website_`

  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank")
}

export function getCartItem(product_id) {
  return cart.items.find(i => i.product_id === product_id)
}

export async function increaseQty(product_id) {
  const cart_id = localStorage.getItem("cart_id")
  await updateCart(cart_id, product_id, "increase")
  const item = cart.items.find(i => i.product_id === product_id)
  if (item) item.qty += 1
  notify()
}

export async function decreaseQty(product_id) {
  const cart_id = localStorage.getItem("cart_id")
  await updateCart(cart_id, product_id, "decrease")
  const item = cart.items.find(i => i.product_id === product_id)
  if (!item) return
  if (item.qty > 1) {
    item.qty -= 1
  } else {
    cart.items = cart.items.filter(i => i.product_id !== product_id)
  }
  notify()
}

export async function addToCart(product_id, name, price, sku) {

  let cart_id = localStorage.getItem("cart_id")

  if (!cart_id) {
    const cartData = await createCart()
    cart_id = cartData.id
    localStorage.setItem("cart_id", cart_id)
  }

  const res = await updateCart(cart_id, product_id, "add")

  if (res.cart_id) {
    localStorage.setItem("cart_id", res.cart_id)
  }

  const existing = cart.items.find(i => i.product_id === product_id)

  if (existing) {
    existing.qty += 1
  } else {
    cart.items.push({
      product_id,
      name,
      price,
      sku,        // ← stored here
      qty: 1
    })
  }

  notify()
}

export async function removeFromCart(product_id) {
  const cart_id = localStorage.getItem("cart_id")
  await updateCart(cart_id, product_id, "remove")
  cart.items = cart.items.filter(i => i.product_id !== product_id)
  cart.listeners.forEach(fn => fn([...cart.items]))
}

/* ───────────────── CART COMPONENT ───────────────── */

let toggleCartExternal = null

export default function Cart() {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  const handlePlaceOrder = async () => {
    try {

      const cart_id = localStorage.getItem("cart_id")
      const user_id = localStorage.getItem("user_id")

      if (!cart_id || !user_id) {
        alert("Missing cart or user")
        return
      }

      await placeOrder(cart_id, user_id)

      // capture BEFORE clearing
      const orderItems = [...cart.items]
      const orderTotal = orderItems.reduce((s, i) => s + (i.price * i.qty), 0)

      alert("Order placed successfully!")

      // clear cart
      cart.items = []
      notify()
      setOpen(false)

      // open whatsapp
      openWhatsApp(orderItems, orderTotal)

    } catch (err) {
      console.error(err)
      alert("Failed to place order")
    }
  }

  useEffect(() => {
    toggleCartExternal = () => setOpen(prev => !prev)
  }, [])

  useEffect(() => {
    cart.listeners.push(setItems)
    return () => {
      cart.listeners = cart.listeners.filter(f => f !== setItems)
    }
  }, [])

  const total = items.reduce((s, i) => s + (i.price * i.qty), 0)

  return (
    <>
      <div id="cart-overlay" className={open ? 'open' : ''}>
        <div className="cart-head">
          <div className="cart-head-t">Cart ({items.length})</div>
          <button
            className="cart-close"
            onClick={() => setOpen(false)}
          >
            Close ✕
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">No items yet.</div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.product_id}>
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div style={{
                    fontFamily: 'var(--ff-mono)',
                    fontSize: 8,
                    color: 'var(--g3)',
                    marginTop: 4
                  }}>
                    PLA+ · Orange
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 6
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => decreaseQty(item.product_id)}
                      style={{ padding: "4px 10px", cursor: "pointer" }}
                    >
                      -
                    </button>

                    <span style={{ minWidth: 20, textAlign: "center" }}>
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item.product_id)}
                      style={{ padding: "4px 10px", cursor: "pointer" }}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-price">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-total">
            <div className="cart-total-l">Total</div>
            <div className="cart-total-n">
              ₹{total.toLocaleString()}
            </div>
          </div>

          <button
            className="btn-or"
            style={{ width: '100%', textAlign: 'center' }}
            onClick={() => {
              if (!authorized) {
                setShowLogin(true)
              } else {
                handlePlaceOrder()
              }
            }}
          >
            Proceed to Order →
          </button>
        </div>
      </div>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={async (user) => {
          localStorage.setItem("user_id", user.id)  // ← set first
          setAuthorized(true)
          await handlePlaceOrder()                   // ← then place order
        }}
      />
    </>
  )
}

/* ───────────────── NAVBAR TOGGLE EXPORT ───────────────── */

export function useCartToggle() {
  return () => {
    if (toggleCartExternal) toggleCartExternal()
  }
}