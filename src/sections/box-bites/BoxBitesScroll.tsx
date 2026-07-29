import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { KineticText } from '@/components/ui/kinetic-text'
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
  const activeProduct = useAppStore((s) => s.activeProduct)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('playing')
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
    if (isLoading || activeProduct !== 'box-bites' || !videoRef.current) return

    const video = videoRef.current
    let settled = false
    let disarmGesture: (() => void) | null = null

    const freeze = () => {
      if (settled) return
      settled = true

      video.pause()
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 0.001)
      }

      requestAnimationFrame(() => {
        setPhase('frozen')
        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
    }

    const play = () => {
      video.playbackRate = VIDEO_PLAYBACK_RATE
      return video.play()
    }

    /* iOS blocks autoplay outright in Low Power Mode (and with "Auto-Play
       Video Previews" off) however the element is configured — a user gesture
       is the only thing that lifts it. Keep the opening frame visible while
       waiting, then run the animation the moment they interact. */
    const GESTURES = ['pointerdown', 'touchstart', 'keydown', 'wheel'] as const

    const armGestureStart = () => {
      if (disarmGesture) return

      const onGesture = () => {
        disarmGesture?.()
        settled = false
        setPhase('playing')
        video.currentTime = 0
        void play().catch(() => armGestureStart())
      }

      GESTURES.forEach((type) =>
        window.addEventListener(type, onGesture, { once: true, passive: true }),
      )
      disarmGesture = () => {
        GESTURES.forEach((type) => window.removeEventListener(type, onGesture))
        disarmGesture = null
      }
    }

    const startPlayback = () => {
      // Muted, inline autoplay is normally allowed, so one retry covers a
      // transient failure before we treat it as genuinely blocked.
      void play().catch(() => {
        window.setTimeout(() => {
          void play().catch(() => {
            video.pause()
            video.currentTime = 0
            armGestureStart()
          })
        }, 150)
      })
    }

    setPhase('playing')
    video.preload = 'auto'
    video.currentTime = 0

    if (video.readyState >= 2) {
      startPlayback()
    } else {
      video.addEventListener('canplay', startPlayback, { once: true })
    }

    video.addEventListener('ended', freeze)

    return () => {
      video.removeEventListener('canplay', startPlayback)
      video.removeEventListener('ended', freeze)
      disarmGesture?.()
      video.pause()
    }
  }, [isLoading, activeProduct])

  const showStill = phase === 'frozen' && stillReady

  useEffect(() => {
    if (!showStill) {
      setCopyVisible(false)
      return
    }

    const timer = window.setTimeout(() => setCopyVisible(true), 180)
    return () => window.clearTimeout(timer)
  }, [showStill])

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
                autoPlay
                preload="auto"
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
    </section>
  )
}
