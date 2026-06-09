import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  eyebrow?: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`reveal-section px-6 py-28 md:px-12 md:py-36 lg:px-20 ${className}`}
    >
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-ember">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-bold tracking-tight text-cream md:text-5xl">
          {title}
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-cream-muted md:text-lg">
          {children}
        </div>
      </div>
    </section>
  )
}
