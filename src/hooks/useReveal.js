import { useEffect } from 'react'

export function useReveal(dep = []) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('vis')
      })
    }, { threshold: .08, rootMargin: '0px 0px -30px 0px' })

    document.querySelectorAll('.rv:not(.vis)').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, dep)
}
