import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { KineticText } from '@/components/ui/kinetic-text'
import { getLenis } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'
import {
  BACKGROUND_SRC,
  BGMID_HEIGHT,
  BGMID_SRC,
  BGMID_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_PLAYBACK_RATE,
  VIDEO_SRC,
  VIDEO_WIDTH,
} from './constants'

type Phase = 'idle' | 'playing' | 'frozen'

export function BoxBitesScroll() {
  const isLoading = useAppStore((s) => s.isLoading)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [stillReady, setStillReady] = useState(false)
  const [copyVisible, setCopyVisible] = useState(false)

  useEffect(() => {
    if (isLoading) return

    const img = new Image()
    img.src = BGMID_SRC
    if (img.complete) {
      setStillReady(true)
    } else {
      img.onload = () => setStillReady(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading || !videoRef.current) return

    const video = videoRef.current
    let started = false
    let ended = false

    document.body.style.overflow = 'hidden'

    const freeze = () => {
      if (ended) return
      ended = true

      video.pause()
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 0.001)
      }

      requestAnimationFrame(() => {
        setPhase('frozen')
        document.body.style.overflow = ''
        getLenis()?.start()
        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
    }

    const start = () => {
      if (started) return
      started = true
      getLenis()?.stop()
      setPhase('playing')
      video.preload = 'auto'
      if (video.readyState < 2) video.load()
      video.playbackRate = VIDEO_PLAYBACK_RATE
      video.play().catch(() => freeze())
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'Space', 'End'].includes(e.code)) start()
    }

    video.addEventListener('ended', freeze, { once: true })
    window.addEventListener('wheel', start, { passive: true })
    window.addEventListener('touchmove', start, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      video.removeEventListener('ended', freeze)
      window.removeEventListener('wheel', start)
      window.removeEventListener('touchmove', start)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      if (started && !ended) getLenis()?.start()
      video.pause()
    }
  }, [isLoading])

  const showStill = phase === 'frozen' && stillReady

  useEffect(() => {
    if (!showStill) {
      setCopyVisible(false)
      return
    }

    const timer = window.setTimeout(() => setCopyVisible(true), 180)
    return () => window.clearTimeout(timer)
  }, [showStill])

  const hintHidden = phase !== 'idle'

  return (
    <section
      id="top"
      className={`box-bites-section relative ${
        isLoading ? 'pointer-events-none invisible' : 'visible'
      }`}
      style={{ backgroundImage: `url(${BACKGROUND_SRC})` }}
    >
      <div className="relative h-[100svh]">
        <div className="box-stage sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
          <div className="box-media-layer">
            <div className="box-media-stack relative">
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                width={VIDEO_WIDTH}
                height={VIDEO_HEIGHT}
                muted
                playsInline
                preload="metadata"
                className={`box-video ${
                  phase === 'idle' ? 'invisible opacity-0' : ''
                }`}
                style={{ visibility: showStill ? 'hidden' : 'visible' }}
              />

              <img
                src={BGMID_SRC}
                alt=""
                width={BGMID_WIDTH}
                height={BGMID_HEIGHT}
                draggable={false}
                className="box-mid-image"
                style={{
                  opacity: showStill ? 1 : 0,
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {showStill && (
            <div
              className={`box-hero-copy ${copyVisible ? 'box-hero-copy--revealed' : ''}`}
              aria-hidden={!copyVisible}
            >
              <aside className="box-hero-side box-hero-side--left">
                <p className="box-hero-script">Made with love</p>
                <p className="box-hero-blurb">
                  Small batches, hand-packed in every box — the kind of snack you actually look
                  forward to.
                </p>
              </aside>

              <aside className="box-hero-side box-hero-side--right">
                <p className="box-hero-script">Clean fuel</p>
                <p className="box-hero-blurb">
                  Oats, cacao &amp; hoodia — real ingredients, zero weird stuff you can&apos;t
                  pronounce.
                </p>
              </aside>

              <div className="box-hero-title">
                <KineticText
                  text="Box Bites"
                  as="h1"
                  className="box-hero-kinetic justify-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed bottom-[30px] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--box-cream)] transition-opacity duration-400 ${
          hintHidden ? 'pointer-events-none opacity-0' : 'opacity-90'
        }`}
      >
        <span>Scroll</span>
        <span className="hint-arrow relative h-6 w-px bg-[var(--box-cream)] opacity-70" />
      </div>
    </section>
  )
}
