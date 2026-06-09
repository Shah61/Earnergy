import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { gsap } from '@/lib/gsap'

export function useGsapContext<T extends HTMLElement>(
  setup: (ctx: gsap.Context) => void,
  deps: unknown[] = [],
) {
  const scopeRef = useRef<T>(null)

  useEffect(() => {
    if (!scopeRef.current) return

    const ctx = gsap.context(() => {
      setup(ctx)
    }, scopeRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef as RefObject<T>
}
