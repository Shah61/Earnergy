import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { BACKGROUND_SRC } from '@/sections/box-bites/constants'
import { useAppStore } from '@/stores/useAppStore'

const VIDEO_SRC = '/photos/loadingScreen.mp4'
const MIN_DISPLAY_MS = 2800
const POST_VIDEO_DELAY_MS = 400
const WHITE_HOLD_MS = 450

/**
 * Bite-reveal exit: the white cover gets "bitten" away.
 * Each bite is a hole in an SVG mask — a main circle ringed with scallop
 * bumps (tooth marks) plus a few crumbs — chomped in from the screen edges,
 * then one final giant bite swallows the whole screen.
 *
 * Positions are fractions of the viewport (fx, fy). Radii are in viewBox
 * units where the viewport height = 100.
 */
const BITES = [
  { fx: 0.16, fy: 0.0, r: 11, rot: 12 },   // top edge
  { fx: 1.0, fy: 0.36, r: 13, rot: 44 },   // right edge
  { fx: 0.46, fy: 1.0, r: 12, rot: -18 },  // bottom edge
  { fx: 0.0, fy: 0.6, r: 12, rot: 76 },    // left edge
  { fx: 0.84, fy: 0.04, r: 10, rot: -52 }, // top-right corner
  { fx: 0.3, fy: 0.46, r: 9, rot: 20 },    // a cheeky mid-screen chomp
]
const BUMPS = 9

export function LoadingScreen() {
  const setLoadingComplete = useAppStore((s) => s.setLoadingComplete)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasExitedRef = useRef(false)

  const [isVisible, setIsVisible] = useState(true)
  const [isReady, setIsReady] = useState(false)

  // viewBox matches the real viewport aspect so the bites stay perfectly round
  const [aspect] = useState(() =>
    typeof window === 'undefined' ? 16 / 9 : window.innerWidth / Math.max(window.innerHeight, 1),
  )
  const VW = 100 * aspect
  const VH = 100
  // final bite must cover the farthest corner from center
  const SWALLOW_R = Math.sqrt((VW / 2) ** 2 + (VH / 2) ** 2) + 14

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
      scale: 1.02,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
    })
      .to({}, { duration: WHITE_HOLD_MS / 1000 })
      // chomp, chomp, chomp — bites pop in from the edges
      .to('.loader-bite', {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(2.2)',
        stagger: 0.09,
      })
      // a tiny shake on each chomp so it feels physical
      .to(
        '.loader-bitecover',
        {
          keyframes: [{ x: -4 }, { x: 3 }, { x: -2 }, { x: 1 }, { x: 0 }],
          duration: 0.55,
        },
        '<',
      )
      // the final bite swallows the whole screen
      .to(
        '.loader-bite-swallow',
        {
          attr: { r: SWALLOW_R },
          duration: 0.75,
          ease: 'power3.in',
        },
        '-=0.05',
      )
  }, [setLoadingComplete])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.backgroundColor = '#ffffff'

    // every bite starts collapsed at its own center, ready to chomp open
    const bites = gsap.utils.toArray<SVGGElement>('.loader-bite')
    bites.forEach((el) => {
      gsap.set(el, { scale: 0, svgOrigin: el.dataset.origin })
    })

    return () => {
      document.body.style.overflow = ''
      document.body.style.backgroundColor = ''
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
      className="loader-overlay fixed inset-0 z-[100] overflow-hidden bg-white"
      aria-hidden={!isVisible}
      aria-label="Loading"
    >
      {/* the page background, waiting underneath the white cover */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${BACKGROUND_SRC})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* the white cover — bites get punched out of it via the mask */}
      <svg
        className="loader-bitecover absolute inset-0 z-[2] h-full w-full will-change-transform"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <mask id="bb-bite-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={VW} height={VH}>
            {/* white = cover stays, black = bitten away */}
            <rect width={VW} height={VH} fill="white" />
            {BITES.map((b, i) => {
              const x = b.fx * VW
              const y = b.fy * VH
              return (
                <g key={i} className="loader-bite" data-origin={`${x} ${y}`} fill="black">
                  {/* main chomp */}
                  <circle cx={x} cy={y} r={b.r} />
                  {/* scalloped tooth marks around the rim */}
                  {Array.from({ length: BUMPS }, (_, j) => {
                    const a = ((b.rot + (j * 360) / BUMPS) * Math.PI) / 180
                    return (
                      <circle
                        key={j}
                        cx={x + Math.cos(a) * b.r}
                        cy={y + Math.sin(a) * b.r}
                        r={b.r * (0.26 + 0.08 * ((i + j) % 3))}
                      />
                    )
                  })}
                  {/* a few crumbs flicked off the bite */}
                  {Array.from({ length: 3 }, (_, j) => {
                    const a = ((b.rot + 36 + j * 105) * Math.PI) / 180
                    const d = b.r * (1.55 + 0.22 * j)
                    return (
                      <circle
                        key={`c${j}`}
                        cx={x + Math.cos(a) * d}
                        cy={y + Math.sin(a) * d}
                        r={0.8 + 0.3 * ((i + j) % 2)}
                      />
                    )
                  })}
                </g>
              )
            })}
            {/* the final swallow — grows from the center to clear the screen */}
            <circle className="loader-bite-swallow" cx={VW / 2} cy={VH / 2} r="0" fill="black" />
          </mask>
        </defs>
        <rect width={VW} height={VH} fill="#ffffff" mask="url(#bb-bite-mask)" />
      </svg>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <video
          ref={videoRef}
          className="loader-video block h-auto w-[220px] max-w-[70vw] object-contain will-change-[transform,opacity]"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  )
}