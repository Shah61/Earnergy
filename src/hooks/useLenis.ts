import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let lenisInstance: Lenis | null = null

/** Access the live Lenis instance (e.g. to stop/start scrolling) */
export function getLenis() {
  return lenisInstance
}

/** Force page back to top — used on reload and after loading screen */
export function scrollToTop() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  document.body.style.overflow = ''
  lenisInstance?.scrollTo(0, { immediate: true })
  ScrollTrigger.refresh()
}

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisInstance = lenis
    scrollToTop()

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenisInstance = null
      lenis.destroy()
    }
  }, [enabled])
}
