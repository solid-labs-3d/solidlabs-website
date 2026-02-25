import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─── FAQ Knowledge Base ──────────────────────────────────
   Each entry: keywords to match, and a response.
   'human' flag triggers the handoff banner.
─────────────────────────────────────────────────────────── */
const FAQ = [
  {
    keys: ['price', 'cost', 'how much', 'rate', 'pricing', 'quote', 'charges'],
    answer: "Pricing depends on material, complexity, and quantity. FDM parts start around ₹200 for small prints. For an exact quote, share your CAD file and we'll get back within 2 hours!",
    chips: ['Get a quote', 'Materials', 'Turnaround time'],
  },
  {
    keys: ['turnaround', 'time', 'fast', '24h', 'deliver', 'delivery', 'how long', 'speed'],
    answer: "Standard turnaround is 24 hours for FDM prints. SLA and multi-part orders may take 2–3 days. Bulk orders and injection moulding are quoted separately.",
    chips: ['Shipping', 'SLA printing', 'Get a quote'],
  },
  {
    keys: ['material', 'pla', 'petg', 'abs', 'tpu', 'resin', 'filament', 'plastic'],
    answer: "We stock PLA+, PETG, ABS, TPU, and ASA for FDM. For SLA we use standard, tough, and flexible resins. Carbon fibre composite and injection-grade polymers available on request.",
    chips: ['SLA printing', 'Carbon fibre', 'Injection moulding'],
  },
  {
    keys: ['fdm', 'fused', 'deposition', 'fdm printing', '3d print', 'how does fdm'],
    answer: "FDM (Fused Deposition Modelling) melts filament and deposits it layer-by-layer to build your part. It's fast, affordable, and great for functional prototypes and enclosures.",
    chips: ['Learn more', 'Materials', 'Turnaround time'],
  },
  {
    keys: ['sla', 'resin', 'stereolithography', 'photopolymer', 'sla print'],
    answer: "SLA uses UV light to cure liquid resin layer-by-layer — producing ultra-smooth surfaces with ±0.05mm accuracy. Great for jewellery, dental, and presentation models.",
    chips: ['SLA specs', 'FDM vs SLA', 'Get a quote'],
  },
  {
    keys: ['injection', 'moulding', 'molding', 'injection mould', 'tooling'],
    answer: "Injection moulding is ideal for high-volume production runs. We do mould design, tooling, and production — minimum quantities from 100 units. Perfect for consumer product launches.",
    chips: ['Minimum order', 'Turnaround time', 'Get a quote'],
  },
  {
    keys: ['vacuum', 'forming', 'thermoform', 'vacuum form'],
    answer: "Vacuum forming heats a plastic sheet and forms it over a mould using suction. Great for trays, covers, packaging and large thin-walled parts. Fast tooling, low cost per unit.",
    chips: ['Materials', 'Injection moulding', 'Get a quote'],
  },
  {
    keys: ['carbon', 'carbon fibre', 'carbon fiber', 'composite', 'cfrp'],
    answer: "We work with CFRP — hand-layup and prepreg carbon fibre composites for aerospace, automotive, and sports applications. Extremely lightweight and strong.",
    chips: ['Carbon fibre page', 'SLA printing', 'Get a quote'],
  },
  {
    keys: ['ship', 'shipping', 'deliver', 'pan india', 'bangalore', 'bengaluru', 'location'],
    answer: "We're based in Bengaluru and ship pan-India via courier. Most metros receive orders in 1–2 business days after dispatch. International shipping is available on request.",
    chips: ['Turnaround time', 'Get a quote', 'Contact us'],
  },
  {
    keys: ['file', 'format', 'stl', 'step', 'cad', 'upload', 'send'],
    answer: "We accept STL, STEP, OBJ, and 3MF files. For injection moulding and vacuum forming, STEP or IGES is preferred. Just email your file to hello@solidlabs.in!",
    chips: ['Get a quote', 'Contact us', 'Turnaround time'],
  },
  {
    keys: ['paint', 'finish', 'surface', 'smooth', 'post process', 'color', 'colour'],
    answer: "We offer post-processing: sanding (120–800 grit), primer + spray paint (RAL/Pantone matched), acetone vapour polish for ABS, epoxy coating, and heat-set brass inserts.",
    chips: ['Get a quote', 'Materials', 'Learn more'],
  },
  {
    keys: ['b2b', 'business', 'bulk', 'corporate', 'precision', 'oem', 'partner'],
    answer: "Our B2B precision service handles repeat orders, tight tolerances (±0.1mm), and multi-part assemblies. We work with startups, R&D labs, and OEMs across India.",
    chips: ['Precision B2B page', 'Get a quote', 'Contact us'],
  },
  {
    keys: ['hello', 'hi', 'hey', 'howdy', 'good', 'morning', 'evening'],
    answer: "Hey there! ✨ I'm Imagenie, your SolidLabs guide. I can help with pricing, materials, turnaround times, or any of our services. What are you working on today?",
    chips: ['Pricing', 'Materials', 'Services', 'Get a quote'],
  },
  {
    keys: ['thanks', 'thank you', 'cheers', 'awesome', 'great', 'perfect'],
    answer: "Happy to help! Is there anything else you'd like to know? Our team is also available on WhatsApp if you need detailed support. 🚀",
    chips: ['Contact us', 'Get a quote', 'Services'],
  },
]

// Human handoff triggers
const HUMAN_KEYS = ['talk to human', 'agent', 'person', 'real person', 'help', 'support', 'call', 'whatsapp', 'contact', 'speak', 'complex', 'specific', 'custom']

// Page navigation chips
const CHIP_ROUTES = {
  'SLA specs':          '/sla-printing',
  'SLA printing':       '/sla-printing',
  'Carbon fibre page':  '/carbon-fibre',
  'Carbon fibre':       '/carbon-fibre',
  'Injection moulding': '/injection-moulding',
  'Precision B2B page': '/precision',
  'Learn more':         '/learn',
}

// Greeting on first open
const GREETING = {
  answer: "Hi! I'm **Imagenie** ✨ — your SolidLabs genie. Ask me about pricing, materials, turnaround, or any of our services. What can I conjure up for you?",
  chips: ['Pricing', 'Materials', 'Turnaround time', 'Services'],
  isGreeting: true,
}

function matchFAQ(text) {
  const t = text.toLowerCase()
  // Check for human handoff first
  if (HUMAN_KEYS.some(k => t.includes(k))) return { human: true }
  // Check chip shortcuts
  if (t === 'services') return {
    answer: "We offer: FDM 3D printing, SLA resin printing, injection moulding, vacuum forming, carbon fibre composites, and extreme engineering projects. What would you like to explore?",
    chips: ['FDM printing', 'SLA printing', 'Injection moulding', 'Vacuum forming', 'Carbon fibre'],
  }
  if (t === 'contact us') return {
    answer: "You can reach us at:\n📧 hello@solidlabs.in\n📱 WhatsApp: +91 98XXX XXXXX\n📍 Bengaluru, Karnataka\n\nOr use the quote form on the homepage!",
    chips: ['Get a quote', 'Turnaround time'],
  }
  if (t === 'get a quote') return {
    answer: "Head to our contact form to get an exact quote — just share your file and requirements. We respond within 2 hours! Want me to take you there?",
    chips: ['Yes, show me the form', 'Materials', 'Turnaround time'],
    goQuote: true,
  }
  if (t === 'yes, show me the form') return { goQuote: true, navigate: '/' }
  if (t === 'fdm vs sla') return {
    answer: "FDM = faster, cheaper, wider material choice. Perfect for prototypes and functional parts.\n\nSLA = smoother surface finish, higher detail, great for display models, jewellery, and dental.",
    chips: ['FDM pricing', 'SLA pricing', 'Get a quote'],
  }
  // Match FAQ entries
  const matched = FAQ.find(f => f.keys.some(k => t.includes(k)))
  return matched || { answer: "I'm not sure about that specific question! Let me connect you with our team for a detailed answer.", human: true }
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Render bold **text** in messages
function renderText(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : p)
}

// Genie SVG avatar
const GenieAvatar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="10" rx="6" ry="7" fill="#f05c1e"/>
    <ellipse cx="12" cy="10" rx="4" ry="5" fill="#c44820"/>
    <circle  cx="10" cy="9"  r="1.2"  fill="#f0ede6"/>
    <circle  cx="14" cy="9"  r="1.2"  fill="#f0ede6"/>
    <path d="M9 13 Q12 15.5 15 13" stroke="#f0ede6" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M12 17 Q10 20 8 22 Q12 21 16 22 Q14 20 12 17Z" fill="#7a2e0f"/>
    <circle cx="19" cy="5" r="2" fill="#f0c020"/>
    <path d="M18 3 L21 5 L19 8 L16 5Z" fill="#f0c020" opacity=".6"/>
  </svg>
)

export default function Imagenie() {
  const [open,       setOpen]       = useState(false)
  const [msgs,       setMsgs]       = useState([])
  const [input,      setInput]      = useState('')
  const [typing,     setTyping]     = useState(false)
  const [showHandoff,setShowHandoff]= useState(false)
  const [chips,      setChips]      = useState(GREETING.chips)
  const msgsEnd = useRef(null)
  const field   = useRef(null)
  const navigate = useNavigate()
  const greeted  = useRef(false)

  // Scroll to bottom on new messages
  useEffect(() => {
    msgsEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  // Show greeting on first open
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true
      setTimeout(() => {
        setMsgs([{ role: 'bot', text: GREETING.answer, time: now() }])
        setChips(GREETING.chips)
      }, 400)
    }
    if (open) field.current?.focus()
  }, [open])

  const addBotMsg = (text, newChips, handoff) => {
    setTyping(false)
    setMsgs(m => [...m, { role: 'bot', text, time: now() }])
    setChips(newChips || [])
    if (handoff) setShowHandoff(true)
  }

  const respond = text => {
    const userMsg = text.trim()
    if (!userMsg) return
    setMsgs(m => [...m, { role: 'user', text: userMsg, time: now() }])
    setInput('')
    setTyping(true)
    setChips([])
    setShowHandoff(false)

    setTimeout(() => {
      const res = matchFAQ(userMsg)
      if (res.navigate) { navigate(res.navigate); return }
      if (res.goQuote && !res.answer) {
        navigate('/')
        setTimeout(() => document.getElementById('contact-sec')?.scrollIntoView({ behavior: 'smooth' }), 80)
        addBotMsg("Here's the contact form! Fill in your requirements and we'll get back within 2 hours. 🚀", ['Materials', 'Services'])
        return
      }
      addBotMsg(
        res.human ? "I'll connect you with our team for that! Our engineers are available Mon–Sat, 9am–7pm. Or reach us on WhatsApp anytime." : res.answer,
        res.chips || [],
        res.human
      )
    }, 700 + Math.random() * 400)
  }

  const onKey = e => { if (e.key === 'Enter') respond(input) }

  return (
    <>
      {/* Chat panel */}
      <div className={`imagenie-panel ${open ? 'open' : ''}`}>
        {/* Header */}
        <div className="imagenie-head">
          <div className="imagenie-avatar"><GenieAvatar /></div>
          <div className="imagenie-title">
            <div className="imagenie-name">IMAGENIE</div>
            <div className="imagenie-status">
              <span className="imagenie-status-dot"/>
              SolidLabs AI · Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="imagenie-msgs">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="msg-bubble">{renderText(m.text)}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          ))}
          {typing && (
            <div className="typing-indicator">
              <span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/>
            </div>
          )}
          <div ref={msgsEnd}/>
        </div>

        {/* Human handoff */}
        {showHandoff && (
          <div className="imagenie-handoff">
            <span className="imagenie-handoff-icon">👋</span>
            <div>
              A real person from our team will help!
              <a className="imagenie-handoff-cta" href="mailto:hello@solidlabs.in">
                Email: hello@solidlabs.in →
              </a>
              <a className="imagenie-handoff-cta" href="https://wa.me/919800000000" target="_blank" rel="noreferrer">
                WhatsApp us →
              </a>
            </div>
          </div>
        )}

        {/* Quick reply chips */}
        {chips.length > 0 && (
          <div className="imagenie-chips">
            {chips.map(c => (
              <button key={c} className="chip" onClick={() => respond(c)}>{c}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="imagenie-input">
          <input
            ref={field}
            className="imagenie-field"
            placeholder="Ask anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
          />
          <button className="imagenie-send" onClick={() => respond(input)} aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        className={`imagenie-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close Imagenie' : 'Open Imagenie'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0ede6" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <GenieAvatar />
        )}
        {!open && <span className="imagenie-notif"/>}
      </button>
    </>
  )
}
