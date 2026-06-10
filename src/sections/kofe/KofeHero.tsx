import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { getLenis } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'

const KOFE_VIDEO = '/kofe.mp4'
const KOFE_BG = '/kofebg.png'
const VIDEO_PLAYBACK_RATE = 1.2

type Phase = 'idle' | 'playing' | 'done'

export function KofeHero() {
  const isLoading = useAppStore((s) => s.isLoading)
  const activeProduct = useAppStore((s) => s.activeProduct)
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')

  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    setVideoEl(node)
  }, [])

  useEffect(() => {
    if (activeProduct !== 'kofe') {
      setPhase('idle')
    }
  }, [activeProduct])

  useEffect(() => {
    if (isLoading || activeProduct !== 'kofe' || !videoEl) return

    const video = videoEl
    let started = false
    let ended = false

    video.pause()
    video.currentTime = 0
    setPhase('idle')
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()

    const removeScrollTriggers = () => {
      window.removeEventListener('wheel', start, true)
      window.removeEventListener('touchmove', start, true)
      window.removeEventListener('keydown', onKeyDown)
    }

    const finish = () => {
      if (ended) return
      ended = true
      removeScrollTriggers()
      video.pause()
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 0.001)
      }
      requestAnimationFrame(() => {
        setPhase('done')
        document.body.style.overflow = ''
        getLenis()?.start()
        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
    }

    const start = () => {
      if (started || ended) return
      started = true
      removeScrollTriggers()
      getLenis()?.stop()
      setPhase('playing')
      video.preload = 'auto'
      if (video.readyState < 2) video.load()
      video.playbackRate = VIDEO_PLAYBACK_RATE
      video.play().catch(() => finish())
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'Space', 'End'].includes(e.code)) start()
    }

    video.addEventListener('ended', finish, { once: true })
    window.addEventListener('wheel', start, { passive: true, capture: true })
    window.addEventListener('touchmove', start, { passive: true, capture: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      video.removeEventListener('ended', finish)
      removeScrollTriggers()
      document.body.style.overflow = ''
      if (started && !ended) getLenis()?.start()
      video.pause()
    }
  }, [isLoading, activeProduct, videoEl])

  const hintHidden = phase !== 'idle'

  return (
    <section
      id="kofe-top"
      className="kofe-hero-section"
      aria-label="KOFÈ"
      style={{ backgroundImage: `url(${KOFE_BG})` }}
    >
      <div className="box-stage sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <div className="box-media-layer">
          <video
            ref={setVideoRef}
            src={KOFE_VIDEO}
            className={`kofe-hero-video box-video ${phase === 'idle' ? 'invisible opacity-0' : ''}`}
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </div>

      <div
        className={`fixed bottom-[30px] left-1/2 z-[46] flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#3d2a1a] transition-opacity duration-400 ${
          hintHidden ? 'pointer-events-none opacity-0' : 'opacity-90'
        }`}
      >
        <span>Scroll</span>
        <span className="hint-arrow relative h-6 w-px bg-[#3d2a1a] opacity-70" />
      </div>
    </section>
  )
}
