import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useAppStore } from '@/stores/useAppStore'

const VIDEO_SRC = '/photos/loadingScreen.mp4'
const MIN_DISPLAY_MS = 2800
const POST_VIDEO_DELAY_MS = 500

export function LoadingScreen() {
  const setLoadingComplete = useAppStore((s) => s.setLoadingComplete)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasExitedRef = useRef(false)

  const [isVisible, setIsVisible] = useState(true)
  const [isReady, setIsReady] = useState(false)

  const exitLoader = useCallback(() => {
    if (hasExitedRef.current || !overlayRef.current) return
    hasExitedRef.current = true

    const video = videoRef.current
    if (video) video.pause()

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false)
        setLoadingComplete()
      },
    })

    tl.to('.loader-video', {
      scale: 1.04,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.inOut',
    })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        '-=0.45',
      )
      .to(
        overlayRef.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power4.inOut',
        },
        '-=0.35',
      )
  }, [setLoadingComplete])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let videoEnded = false
    let minElapsed = false

    const tryExit = () => {
      if (videoEnded && minElapsed) {
        window.setTimeout(exitLoader, POST_VIDEO_DELAY_MS)
      }
    }

    const minTimer = window.setTimeout(() => {
      minElapsed = true
      tryExit()
    }, MIN_DISPLAY_MS)

    const onCanPlay = () => {
      setIsReady(true)
      video.play().catch(() => {
        videoEnded = true
        tryExit()
      })
    }

    const onEnded = () => {
      videoEnded = true
      tryExit()
    }

    video.addEventListener('canplaythrough', onCanPlay)
    video.addEventListener('ended', onEnded)

    return () => {
      window.clearTimeout(minTimer)
      video.removeEventListener('canplaythrough', onCanPlay)
      video.removeEventListener('ended', onEnded)
    }
  }, [exitLoader])

  useEffect(() => {
    if (!isReady || !overlayRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.loader-video', {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }, overlayRef)

    return () => ctx.revert()
  }, [isReady])

  if (!isVisible) return null

  return (
    <div
      ref={overlayRef}
      className="loader-overlay fixed inset-0 z-[100] flex items-center justify-center bg-white will-change-[clip-path,opacity]"
      aria-hidden={!isVisible}
      aria-label="Loading"
    >
      <video
        ref={videoRef}
        className="loader-video block h-auto w-auto max-h-[min(80svh,900px)] max-w-[min(92vw,1280px)] object-contain will-change-[transform,opacity]"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}
