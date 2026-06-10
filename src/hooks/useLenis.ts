import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let lenisInstance: Lenis | null = null
let tickFn: ((time: number) => void) | null = null
let currentScrollRoot: LenisScrollRoot = { type: 'window' }

const LENIS_OPTIONS = {
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
}

export type LenisScrollRoot =
  | { type: 'window' }
  | { type: 'element'; wrapper: HTMLElement; content: HTMLElement }

function attachTicker(lenis: Lenis) {
  detachTicker()
  tickFn = (time: number) => {
    lenis.raf(time * 1000)
  }
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tickFn)
  gsap.ticker.lagSmoothing(0)
}

function detachTicker() {
  if (tickFn) {
    gsap.ticker.remove(tickFn)
    tickFn = null
  }
}

export function destroyLenis() {
  detachTicker()
  lenisInstance?.destroy()
  lenisInstance = null
}

export function getScrollRoot() {
  return currentScrollRoot
}

/** Subscribe to the active Lenis / scroll-root updates (window or kofe panel). */
export function subscribeToScroll(callback: () => void) {
  const lenis = getLenis()
  lenis?.on('scroll', callback)

  const root = currentScrollRoot
  if (root.type === 'element') {
    root.wrapper.addEventListener('scroll', callback, { passive: true })
  } else {
    window.addEventListener('scroll', callback, { passive: true })
  }

  callback()

  return () => {
    lenis?.off('scroll', callback)
    if (root.type === 'element') {
      root.wrapper.removeEventListener('scroll', callback)
    } else {
      window.removeEventListener('scroll', callback)
    }
  }
}

export function createLenis(root: LenisScrollRoot = { type: 'window' }) {
  destroyLenis()
  currentScrollRoot = root

  lenisInstance =
    root.type === 'window'
      ? new Lenis(LENIS_OPTIONS)
      : new Lenis({
          ...LENIS_OPTIONS,
          wrapper: root.wrapper,
          content: root.content,
        })

  attachTicker(lenisInstance)
  return lenisInstance
}

/** Access the live Lenis instance (e.g. to stop/start scrolling) */
export function getLenis() {
  return lenisInstance
}

/** Current scroll offset for the active root (Lenis virtual or native). */
export function getScrollY() {
  if (lenisInstance) return lenisInstance.scroll
  if (currentScrollRoot.type === 'element') return currentScrollRoot.wrapper.scrollTop
  return window.scrollY
}

/** Force scroll root back to top */
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

export function useLenis(enabled = true, root: LenisScrollRoot = { type: 'window' }) {
  useEffect(() => {
    if (!enabled) return
    createLenis(root)
    scrollToTop()
    return () => {
      destroyLenis()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- root elements are stable refs
  }, [enabled])
}
