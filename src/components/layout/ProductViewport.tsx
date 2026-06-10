import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { createLenis, scrollToTop } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'
import { KofeHello, KofeHero, KofeThird } from '@/sections/kofe'

interface ProductViewportProps {
  children: ReactNode
}

export function ProductViewport({ children }: ProductViewportProps) {
  const isLoading = useAppStore((s) => s.isLoading)
  const activeProduct = useAppStore((s) => s.activeProduct)
  const contentRef = useRef<HTMLDivElement>(null)
  const kofeRef = useRef<HTMLDivElement>(null)
  const kofeContentRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    const content = contentRef.current
    const kofe = kofeRef.current
    if (!content || !kofe) return
    gsap.set(kofe, { xPercent: 100 })
    gsap.set(content, { xPercent: 0 })
  }, [])

  useEffect(() => {
    if (isLoading) return

    const kofe = kofeRef.current
    const kofeContent = kofeContentRef.current

    if (activeProduct === 'kofe' && kofe && kofeContent) {
      createLenis({ type: 'element', wrapper: kofe, content: kofeContent })
      scrollToTop()
    } else {
      createLenis({ type: 'window' })
      scrollToTop()
    }
  }, [activeProduct, isLoading])

  useLayoutEffect(() => {
    const content = contentRef.current
    const kofe = kofeRef.current
    if (!content || !kofe) return

    const isKofe = activeProduct === 'kofe'
    const duration = isFirstRender.current ? 0 : 0.85
    isFirstRender.current = false

    if (isKofe) {
      scrollToTop()
    }

    gsap.killTweensOf([content, kofe])

    const tween = gsap.timeline({
      defaults: { duration, ease: 'power3.inOut', overwrite: 'auto' },
      onComplete: () => {
        if (!isKofe) {
          scrollToTop()
        }
      },
    })

    tween.to(content, { xPercent: isKofe ? -100 : 0 }, 0)
    tween.to(kofe, { xPercent: isKofe ? 0 : 100 }, 0)

    return () => {
      tween.kill()
    }
  }, [activeProduct])

  const isKofe = activeProduct === 'kofe'

  return (
    <>
      <div ref={contentRef} className="product-content">
        {children}
      </div>
      <div
        ref={kofeRef}
        className={`product-kofe-layer${isKofe ? ' product-kofe-layer--active' : ''}`}
        aria-hidden={!isKofe}
      >
        <div ref={kofeContentRef} className="product-kofe-scroll">
          <KofeHero />
          <KofeHello />
          <KofeThird />
        </div>
      </div>
    </>
  )
}
