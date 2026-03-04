import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../components/Cart'
import { getProductsByCategoryName } from '../api/apiClient'

const TICKER_ITEMS = [
  'PLA+ Filament','2–3 Day Shipping','14+ Colours',
  'Designed in Bengaluru','PETG / PLA+ / TPU',
  'Custom Orders Welcome','Quality Checked','Same Day Dispatch',
]

function ProductCard({ product, delay='' }) {

  return (
    <div className={`oc rv ${delay}`}>

      {/* SKU */}
      <div className="oc-num">{product.sku}</div>

      {/* IMAGE */}
      <div className="oc-icon">
        <img
          src={product.image_url}
          alt={product.name}
          style={{ width:88, height:88, objectFit:'contain' }}
        />
      </div>

      {/* NAME */}
      <div className="oc-name">{product.name}</div>

      {/* DESCRIPTION */}
      <div className="oc-desc">{product.description}</div>

      {/* PRICE */}
      <div className="oc-bot">
        <div className="oc-price">
          ₹{Number(product.price).toLocaleString('en-IN')}
        </div>

        <button
          className="obtn"
          onClick={() => addToCart(product.name, Number(product.price))}
        >
          Add to Cart
        </button>
      </div>

    </div>
  )
}

export default function Originals() {

  const nav = useNavigate()
  useReveal()

  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  const openCart = () =>
    document.getElementById('cart-overlay')?.classList.toggle('open')

 useEffect(() => {

  const fetchProducts = async () => {

    try {

      const res = await getProductsByCategoryName('originals')

      console.log("Products:", res)

      setProducts(res)

    } catch(err) {

      console.error(err)
      setError(err.message)

    } finally {

      setLoading(false)

    }

  }

  fetchProducts()

}, [])

  return (
    <div style={{ background:'#0a0400' }}>

      {/* HERO */}
      <section className="or-hero">
        <div className="or-hero-bg"/>
        <div className="or-hero-grid"/>
        <div className="eyebrow or rv" style={{ position:'relative' }}>
          01 — SL Originals · D2C Collection
        </div>

        <h1 className="or-h1 rv d1" style={{ position:'relative' }}>
          DESIGNED<br/>HERE.<br/><em>SHIPPED FAST.</em>
        </h1>

        <div className="rv d2"
          style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'flex-end',
            borderTop:'1px solid #2a1200',
            paddingTop:24,
            flexWrap:'wrap',
            gap:16
          }}
        >
          <p style={{
            fontSize:14,
            color:'#666',
            maxWidth:400,
            lineHeight:1.8
          }}>
            Our own line of 3D printed consumer products.
            Designed in Bengaluru, printed in-house,
            and shipped to your door in 2–3 days.
          </p>

          <button className="obtn" onClick={openCart}>
            View Cart
          </button>

        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:'var(--or)', borderBottom:'1px solid rgba(0,0,0,.15)' }}>
        <div className="ticker">
          <div className="ticker-track">

            {[...TICKER_ITEMS,...TICKER_ITEMS].map((t,i)=>(
              <span key={i} className="ti" style={{ color:'var(--blk)' }}>
                {t} <span className="td">·</span>
              </span>
            ))}

          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="or-grid" style={{ background:'#200c00' }}>

        {/* Loading */}
        {loading && (
          <div style={{color:"#fff",padding:40}}>Loading products...</div>
        )}

        {/* Error */}
        {error && (
          <div style={{color:"red",padding:40}}>
            Error loading products
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && products.map((p,i)=>(
          <ProductCard
            key={p.id}
            product={p}
            delay={`d${(i%4)+1}`}
          />
        ))}

        {/* Custom Order Card (unchanged) */}
        <div className="oc or-highlight rv" style={{background:'var(--or)'}}>

          <div className="oc-num">SL-Custom</div>

          <div className="oc-name">Custom Order</div>

          <div className="oc-desc" style={{ color:'rgba(0,0,0,.5)' }}>
            Your idea, our materials and machines.
            Send a sketch, file, or reference.
          </div>

          <div className="oc-bot">

            <div className="oc-price por" style={{ color:'var(--blk)' }}>
              Price on Request
            </div>

            <button
              className="obtn"
              style={{ background:'var(--blk)', color:'var(--or)' }}
              onClick={()=>{
                nav('/')
                setTimeout(()=>{
                  document.getElementById('contact-sec')
                    ?.scrollIntoView({behavior:'smooth'})
                },80)
              }}
            >
              Brief Us →
            </button>

          </div>
        </div>

      </div>

    </div>
  )
}