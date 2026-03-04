import { useState, useEffect } from 'react'
import LoginModal from './LoginModal'
import { createCart, updateCart } from "../api/apiClient"

/* ───────────────── CART STORE ───────────────── */

export const cart = { items: [], listeners: [] }

export async function addToCart(product_id, name, price) {

  let cart_id = localStorage.getItem("cart_id")

  /* create cart first time */

  if (!cart_id) {

    const cart = await createCart()

    cart_id = cart.id

    localStorage.setItem("cart_id", cart_id)
  }

  /* update backend */

  await updateCart(cart_id, product_id, "add")

  /* update frontend */

  cart.items.push({
    id: Date.now(),
    product_id,
    name,
    price
  })

  cart.listeners.forEach(fn => fn([...cart.items]))
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

  const total = items.reduce((s, i) => s + i.price, 0)

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
              <div className="cart-item" key={item.id}>
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
                  <div className="cart-item-price">
                    ₹{item.price.toLocaleString()}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      fontFamily: 'var(--ff-mono)',
                      fontSize: 7,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      padding: '4px 8px',
                      background: 'var(--s2)',
                      color: 'var(--g4)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
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