import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { cart, addToCart, increaseQty, decreaseQty, getCartItem } from '../components/Cart'
import { getProductsByCategoryName } from '../api/apiClient'


function EvidenceCard({ p, i }) {

  const [qty,setQty] = useState(0)

  useEffect(()=>{

    const update = () => {
      const item = getCartItem(p.id)
      setQty(item ? item.qty : 0)
    }

    update()

    cart.listeners.push(update)

    return () => {
      cart.listeners = cart.listeners.filter(f => f !== update)
    }

  },[p.id])

  return (
    <div className={`ev-card rv d${(i % 3) + 1}`}>

      <div className="ev-tag or">
        {p.category}
      </div>

      <div className="ev-title">
        {p.name}
      </div>

      <p className="ev-desc">
        {p.description}
      </p>

      {p.image_url && (
        <div style={{
          margin:"10px 0",
          display:"flex",
          justifyContent:"center"
        }}>
          <img
            src={p.image_url}
            alt={p.name}
            style={{
              width:120,
              height:80,
              objectFit:"contain"
            }}
          />
        </div>
      )}

      <div className="ev-meta">
        Material: {p.material || "PLA+"}
      </div>

      <div style={{marginTop:12}}>

        {qty === 0 ? (

          <button
            className="obtn"
            onClick={() => addToCart(p.id, p.name, p.price)}
          >
            Add to Cart
          </button>

        ) : (

          <div style={{display:"flex",gap:10,alignItems:"center"}}>

            <button onClick={()=>decreaseQty(p.id)}>
              -
            </button>

            <span>{qty}</span>

            <button onClick={()=>increaseQty(p.id)}>
              +
            </button>

          </div>

        )}

      </div>

    </div>
  )
}


export default function Evidence() {

  useReveal()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchEvidence = async () => {

      try {

        const res = await getProductsByCategoryName("field_evidence")
        setProjects(res)

      } catch (err) {

        console.error(err)
        setError(err.message)

      } finally {

        setLoading(false)

      }

    }

    fetchEvidence()

  }, [])

  return (

    <div style={{ background: 'var(--blk)' }}>

      <section className="sec-pad">

        <div className="ev-grid">

          {loading && (
            <div style={{ color: "#fff", padding: 40 }}>
              Loading projects...
            </div>
          )}

          {error && (
            <div style={{ color: "red", padding: 40 }}>
              Error loading projects
            </div>
          )}

          {!loading && !error && projects.map((p, i) => (
            <EvidenceCard
              key={p.id}
              p={p}
              i={i}
            />
          ))}

        </div>

      </section>

    </div>

  )
}