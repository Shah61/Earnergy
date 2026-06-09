import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useAppStore } from '@/stores/useAppStore'
import { Section } from '@/components/ui/Section'

export function Content() {
  const isLoading = useAppStore((s) => s.isLoading)

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.from(section, {
          y: 64,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  return (
    <main
      className={`relative z-10 bg-ink transition-opacity duration-700 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Section eyebrow="Stack" title="Everything wired in">
        <p>
          React 19 and TypeScript form the foundation. Tailwind CSS v4 handles
          styling with a warm, espresso-toned design system baked into CSS
          variables.
        </p>
        <p>
          The 3D layer runs on Three.js via React Three Fiber, with Drei
          utilities for materials, lighting, and effects. Tweak live values in
          development with Leva.
        </p>
      </Section>

      <Section eyebrow="Motion" title="Scroll that feels intentional">
        <p>
          Lenis drives buttery smooth scrolling, synced with GSAP ScrollTrigger
          for scroll-linked 3D rotation and section reveals. Global state lives
          in a lightweight Zustand store.
        </p>
      </Section>

      <Section eyebrow="Build" title="Start creating">
        <p>
          Run <code className="text-ember">npm run dev</code> to launch the dev
          server. Edit components in <code className="text-ember">src/components</code>,
          extend the store in <code className="text-ember">src/stores</code>, and
          shape your scene in{' '}
          <code className="text-ember">src/components/canvas</code>.
        </p>
      </Section>

      <footer className="border-t border-ink-muted px-6 py-12 text-center text-sm text-cream-muted md:px-12 lg:px-20">
        Earnergy Kofe &mdash; {new Date().getFullYear()}
      </footer>
    </main>
  )
}
