import { useState, useEffect } from 'react'
import LoginModal from './LoginModal'
import { createCart, updateCart } from "../api/apiClient"

/* ───────────────── CART STORE ───────────────── */

export const cart = {
  items: [],
  listeners: []
}

function notify() {
  cart.listeners.forEach(fn => fn([...cart.items]))
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

export async function addToCart(product_id, name, price) {

  let cart_id = localStorage.getItem("cart_id")

  if (!cart_id) {

    const cartData = await createCart()
    cart_id = cartData.id

    localStorage.setItem("cart_id", cart_id)
  }

  await updateCart(cart_id, product_id, "add")

  const existing = cart.items.find(i => i.product_id === product_id)

  if (existing) {
    existing.qty += 1
  } else {

    cart.items.push({
      product_id,
      name,
      price,
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

let toggleCartExternal = null   // used by navbar

export default function Cart() {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  /* Make navbar able to toggle cart */
  useEffect(() => {
    toggleCartExternal = () => setOpen(prev => !prev)
  }, [])

  /* Listen for cart item changes */
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
                      style={{
                        padding: "4px 10px",
                        cursor: "pointer"
                      }}
                    >
                      -
                    </button>

                    <span style={{ minWidth: 20, textAlign: "center" }}>
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item.product_id)}
                      style={{
                        padding: "4px 10px",
                        cursor: "pointer"
                      }}
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
                setOpen(false)
                document.getElementById('contact-sec')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Proceed to Order →
          </button>
        </div>
      </div>

      {/* LOGIN MODAL */}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => {
          setAuthorized(true)
          setOpen(false)
          document.getElementById('contact-sec')
            ?.scrollIntoView({ behavior: 'smooth' })
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