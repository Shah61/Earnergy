import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { useAppStore } from '@/stores/useAppStore'
import {
  REVEAL_TRACK_VH,
  SCROLL_EASE,
  SCROLL_TRACK_VH,
  VIDEO_SRC,
} from './constants'

function revealUnit(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)))
}

function revealStyle(progress: number, start: number, end: number, drift = 28) {
  const t = revealUnit(progress, start, end)
  return {
    opacity: t,
    transform: `translateY(${(1 - t) * drift}px)`,
  }
}

const PILLS = ['No Added Sugar', 'High Fiber', 'Vegan'] as const

export function BoxBitesScroll() {
  const isLoading = useAppStore((s) => s.isLoading)
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hintHidden, setHintHidden] = useState(false)
  const [revealProgress, setRevealProgress] = useState(0)

  const scrubRatio =
    SCROLL_TRACK_VH / (SCROLL_TRACK_VH + REVEAL_TRACK_VH)

  useEffect(() => {
    if (isLoading || !trackRef.current || !videoRef.current) return

    const video = videoRef.current
    let trigger: ScrollTrigger | null = null
    let rafId = 0
    let destroyed = false
    let primed = false

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const EASE = reduce ? 1 : SCROLL_EASE

    let videoTarget = 0
    let videoCurrent = 0
    let revealTarget = 0
    let revealCurrent = 0
    let running = false

    const prime = () => {
      if (primed) return
      primed = true
      video.play().then(() => video.pause()).catch(() => {})
    }

    const render = () => {
      if (!video.duration) return

      try {
        video.currentTime = videoCurrent * video.duration
      } catch {
        /* seek can throw while buffering */
      }

      setRevealProgress(revealCurrent)
      setHintHidden(videoCurrent > 0.012 || revealCurrent > 0.02)
    }

    const loop = () => {
      videoCurrent += (videoTarget - videoCurrent) * EASE
      revealCurrent += (revealTarget - revealCurrent) * EASE

      const videoDone = Math.abs(videoTarget - videoCurrent) < 0.0006
      const revealDone = Math.abs(revealTarget - revealCurrent) < 0.0006

      if (videoDone) videoCurrent = videoTarget
      if (revealDone) revealCurrent = revealTarget

      render()

      if (videoDone && revealDone) {
        running = false
        return
      }

      rafId = requestAnimationFrame(loop)
    }

    const kick = () => {
      prime()
      if (!running) {
        running = true
        rafId = requestAnimationFrame(loop)
      }
    }

    const setup = () => {
      if (destroyed) return

      video.pause()
      video.currentTime = 0

      trigger = ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress

          if (p <= scrubRatio) {
            videoTarget = p / scrubRatio
            revealTarget = 0
          } else {
            videoTarget = 1
            revealTarget = (p - scrubRatio) / (1 - scrubRatio)
          }

          kick()
        },
      })

      const p = trigger.progress
      if (p <= scrubRatio) {
        videoCurrent = p / scrubRatio
        revealCurrent = 0
      } else {
        videoCurrent = 1
        revealCurrent = (p - scrubRatio) / (1 - scrubRatio)
      }

      videoTarget = videoCurrent
      revealTarget = revealCurrent
      render()
    }

    const onTouch = () => prime()

    if (video.readyState >= 1) {
      setup()
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true })
    }

    window.addEventListener('touchstart', onTouch, { passive: true })

    return () => {
      destroyed = true
      video.removeEventListener('loadedmetadata', setup)
      window.removeEventListener('touchstart', onTouch)
      trigger?.kill()
      cancelAnimationFrame(rafId)
    }
  }, [isLoading, scrubRatio])

  return (
    <section
      className={`box-bites-section relative transition-opacity duration-700 ${
        isLoading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-[26px] py-[22px]">
        <div
          className="flex items-center gap-[9px] text-sm font-extrabold tracking-[0.18em] text-[var(--box-ink)] transition-opacity duration-500"
          style={{ opacity: 1 - revealProgress * 0.85 }}
        >
          <span className="font-anton grid h-[18px] w-[18px] place-items-center rounded-full bg-[var(--box-yellow)] text-xs font-black text-[var(--box-ink)]">
            e
          </span>
          EARNERGY
        </div>
        <div
          className="grid h-10 w-10 place-items-center gap-[3px] rounded-xl bg-white/80 transition-opacity duration-500"
          style={{ opacity: 1 - revealProgress * 0.85 }}
          aria-label="Menu"
        >
          <span className="block h-0.5 w-4 rounded-sm bg-[var(--box-ink)]" />
          <span className="block h-0.5 w-4 rounded-sm bg-[var(--box-ink)]" />
          <span className="block h-0.5 w-4 rounded-sm bg-[var(--box-ink)]" />
        </div>
      </header>

      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${SCROLL_TRACK_VH + REVEAL_TRACK_VH}vh` }}
      >
        <div className="relative sticky top-0 h-[100svh] w-full overflow-hidden">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="box-video"
          />

          <div
            className="box-reveal-overlay pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-[6vw] text-center"
            style={{ opacity: Math.min(1, revealProgress * 1.15) }}
            aria-hidden={revealProgress < 0.05}
          >
            <div
              className="mb-5 flex items-center gap-2.5"
              style={revealStyle(revealProgress, 0, 0.22, 20)}
            >
              <span className="font-anton grid h-7 w-7 place-items-center rounded-full bg-[var(--box-yellow)] text-sm font-black text-[var(--box-ink)]">
                e
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.38em] text-[var(--box-ink)]">
                Earnergy
              </span>
            </div>

            <h1
              className="font-anton text-[clamp(52px,14vw,200px)] font-normal leading-[0.88] tracking-[0.01em] text-[var(--box-ink)] [text-shadow:0_4px_40px_rgba(255,255,255,0.55)]"
              style={revealStyle(revealProgress, 0.08, 0.38, 36)}
            >
              BOX
              <br />
              BITES
            </h1>

            <p
              className="mt-[0.55em] max-w-[18ch] text-[clamp(14px,2.4vw,24px)] font-semibold leading-snug tracking-[0.04em] text-[var(--box-ink)]/90"
              style={revealStyle(revealProgress, 0.28, 0.52, 24)}
            >
              goodbye sugar,
              <br />
              hello energy
            </p>

            <div
              className="mt-[1.6em] flex flex-wrap justify-center gap-2.5"
              style={revealStyle(revealProgress, 0.45, 0.72, 20)}
            >
              {PILLS.map((pill, i) => (
                <span
                  key={pill}
                  className="rounded-full border border-[var(--box-ink)]/12 bg-white/72 px-4 py-2 text-[clamp(10px,1.4vw,12px)] font-bold uppercase tracking-[0.16em] text-[var(--box-ink)] backdrop-blur-sm"
                  style={revealStyle(revealProgress, 0.5 + i * 0.06, 0.78 + i * 0.06, 16)}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-[30px] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--box-ink)] transition-opacity duration-400 ${
          hintHidden ? 'pointer-events-none opacity-0' : 'opacity-75'
        }`}
      >
        <span>Scroll</span>
        <span className="hint-arrow relative h-6 w-px bg-[var(--box-ink)] opacity-70" />
      </div>
    </section>
  )
}
