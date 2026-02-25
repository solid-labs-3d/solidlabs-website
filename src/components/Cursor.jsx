import { useEffect, useRef } from 'react'
import { PAGE_COLORS } from '../App'

export default function Cursor({ page }) {
  const curDot   = useRef(null)
  const curRing  = useRef(null)
  const pos      = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const pageRef  = useRef(page)   // ← add this

  // Keep pageRef in sync whenever page changes
  useEffect(() => {
    pageRef.current = page                                    // ← always current
    const c = PAGE_COLORS[page] || PAGE_COLORS.home
    if (curDot.current)  curDot.current.style.background   = c.solid
    if (curRing.current) curRing.current.style.borderColor = c.ring
  }, [page])

  useEffect(() => {
    const dot  = curDot.current
    const ring = curRing.current
    if (!dot || !ring) return

    const onMove = e => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const tick = setInterval(() => {
      pos.current.rx += (pos.current.mx - pos.current.rx) * .12
      pos.current.ry += (pos.current.my - pos.current.ry) * .12
      ring.style.left = pos.current.rx + 'px'
      ring.style.top  = pos.current.ry + 'px'
    }, 16)

    const expand = () => {
      const c = PAGE_COLORS[pageRef.current] || PAGE_COLORS.home  // ← use ref
      dot.style.width  = '20px'
      dot.style.height = '20px'
      dot.style.background = c.hover
    }
    const shrink = () => {
      const c = PAGE_COLORS[pageRef.current] || PAGE_COLORS.home  // ← use ref
      dot.style.width  = '8px'
      dot.style.height = '8px'
      dot.style.background = c.solid
    }

    const targets = document.querySelectorAll('a, button, .oc, .yc, .prod-card, .ev-card, .chip')
    targets.forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    document.addEventListener('mousemove', onMove)

    return () => {
      document.removeEventListener('mousemove', onMove)
      clearInterval(tick)
      targets.forEach(el => {                                      // ← also clean up hover listeners
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <div id="cur"   ref={curDot} />
      <div id="cur-r" ref={curRing} />
    </>
  )
}