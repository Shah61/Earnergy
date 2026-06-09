import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useAppStore } from '@/stores/useAppStore'
import { Scene } from '@/components/canvas/Scene'

export function Hero() {
  const isLoading = useAppStore((s) => s.isLoading)
  const isSceneReady = useAppStore((s) => s.isSceneReady)
  const setScrollProgress = useAppStore((s) => s.setScrollProgress)

  useEffect(() => {
    if (isLoading) return

    const trigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => setScrollProgress(self.progress),
    })

    return () => trigger.kill()
  }, [isLoading, setScrollProgress])

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 48,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  return (
    <header
      id="hero"
      className={`relative h-[100svh] overflow-hidden transition-opacity duration-700 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Scene />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24 lg:px-20">
        <div className="hero-copy max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-ember-glow">
            Earnergy Kofe
          </p>
          <h1 className="font-display text-balance text-5xl font-extrabold leading-[0.95] tracking-tight text-cream md:text-7xl lg:text-8xl">
            Crafted energy,
            <br />
            <span className="text-ember">poured slow.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream-muted md:text-lg">
            A premium starter built with React Three Fiber, GSAP, Lenis, and
            Zustand — ready for your next immersive experience.
          </p>
        </div>

        <div
          className={`mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream-muted transition-opacity duration-700 ${
            isSceneReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-block h-px w-8 bg-ember" />
          Scroll to explore
        </div>
      </div>
    </header>
  )
}
