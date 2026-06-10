/**
 * BoxBitesHeader — animated, interactive site header.
 *
 * Render once at page/layout level, above your sections.
 * Needs /photos/logo2.png in /public. Styles are scoped under .bbh-root.
 */

import { useEffect, useRef, useState, type MouseEvent } from 'react'

const LOGO = '/photos/logo2.png'

export type HeaderLink = { label: string; href: string }

const DEFAULT_LINKS: HeaderLink[] = [
  { label: 'Story', href: '#story' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Nutrition', href: '#nutrition' },
  { label: 'Why Hoodia', href: '#hoodia' },
]

const TICKER =
  'Goodbye Sugar ✦ Hello Energy ✦ Healthy Cookies That Box Your Cravings ✦ Smart Products · Smarter Business ✦ '

const css = `
.bbh-root{
  --bbh-yellow:#f5c518; --bbh-ink:#14110a; --bbh-cream:#f6f2e7;
  --bbh-forest:#0e2e16; --bbh-glass:rgba(13,40,20,.78);
  font-family:"Manrope",system-ui,sans-serif;
}
.bbh-root *{box-sizing:border-box;margin:0;padding:0}

.bbh-ticker{position:fixed;z-index:62;top:0;left:0;right:0;height:30px;overflow:hidden;
  background:var(--bbh-yellow);color:var(--bbh-ink);
  transform:translateY(0);transition:transform .45s cubic-bezier(.4,0,.2,1)}
.bbh-ticker--off{transform:translateY(-100%)}
.bbh-ticker-track{display:flex;width:max-content;height:100%;align-items:center;
  animation:bbh-marquee 26s linear infinite}
.bbh-ticker:hover .bbh-ticker-track{animation-play-state:paused}
.bbh-ticker-track span{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.22em;
  text-transform:uppercase;white-space:nowrap;padding-right:.22em}
@keyframes bbh-marquee{to{transform:translateX(-50%)}}

.bbh-header{position:fixed;z-index:61;left:0;right:0;top:30px;display:flex;justify-content:center;
  padding:14px 16px 0;pointer-events:none;
  transition:top .45s cubic-bezier(.4,0,.2,1), transform .45s cubic-bezier(.4,0,.2,1)}
.bbh-header--scrolled{top:0}
.bbh-header--hidden{transform:translateY(-130%)}

.bbh-bar{pointer-events:auto;display:flex;align-items:center;gap:clamp(14px,2.6vw,34px);
  width:min(1160px,100%);padding:10px 14px;border-radius:999px;
  border:1px solid transparent;background:transparent;
  transition:background .45s ease, border-color .45s ease, box-shadow .45s ease,
             width .45s cubic-bezier(.4,0,.2,1), padding .45s ease,
             opacity .6s ease, transform .6s cubic-bezier(.2,.9,.3,1.2);
  opacity:0;transform:translateY(-26px)}
.bbh-root--in .bbh-bar{opacity:1;transform:translateY(0)}
.bbh-header--scrolled .bbh-bar{width:min(1060px,100%);
  background:var(--bbh-glass);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
  border-color:rgba(255,255,255,.14);box-shadow:0 18px 44px rgba(8,20,10,.35);
  padding:8px 10px 8px 14px}

.bbh-logo{display:block;flex:0 0 auto;line-height:0;border-radius:10px;outline-offset:3px}
.bbh-logo img{height:40px;width:auto;border-radius:9px;display:block;
  box-shadow:0 6px 18px rgba(8,20,10,.3);
  transform:rotate(-160deg) scale(.4);opacity:0;
  transition:height .45s ease}
.bbh-root--in .bbh-logo img{animation:bbh-logoin .85s cubic-bezier(.2,.9,.3,1.25) .1s both}
@keyframes bbh-logoin{0%{transform:rotate(-160deg) scale(.4);opacity:0}
  70%{transform:rotate(8deg) scale(1.06);opacity:1}100%{transform:rotate(0) scale(1);opacity:1}}
.bbh-header--scrolled .bbh-logo img{height:32px}
.bbh-logo:hover img{animation:bbh-wobble .7s ease}
@keyframes bbh-wobble{0%{transform:rotate(0)}25%{transform:rotate(-6deg) scale(1.04)}
  55%{transform:rotate(5deg)}80%{transform:rotate(-2deg)}100%{transform:rotate(0)}}

.bbh-links{display:flex;align-items:center;gap:clamp(10px,2vw,26px);list-style:none;margin-left:auto}
.bbh-links li{opacity:0;transform:translateY(-12px);
  transition:opacity .5s ease, transform .55s cubic-bezier(.2,.9,.3,1.2)}
.bbh-root--in .bbh-links li{opacity:1;transform:none}
.bbh-links a{position:relative;display:inline-block;padding:8px 2px;text-decoration:none;
  font-weight:800;font-size:13.5px;letter-spacing:.06em;color:var(--bbh-cream);
  text-shadow:0 2px 10px rgba(8,20,10,.35);transition:transform .25s ease}
.bbh-links a::after{content:"";position:absolute;left:0;right:0;bottom:2px;height:2px;
  background:var(--bbh-yellow);border-radius:2px;transform:scaleX(0);transform-origin:left;
  transition:transform .3s cubic-bezier(.4,0,.2,1)}
.bbh-links a:hover{transform:translateY(-2px)}
.bbh-links a:hover::after{transform:scaleX(1)}

.bbh-cta{position:relative;display:inline-flex;align-items:center;gap:8px;overflow:hidden;
  flex:0 0 auto;padding:11px 20px;border-radius:999px;text-decoration:none;
  background:var(--bbh-yellow);color:var(--bbh-ink);
  font-family:"Anton",sans-serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase;
  box-shadow:0 10px 26px rgba(8,20,10,.3), inset 0 -2px 0 rgba(0,0,0,.14);
  opacity:0;transform:scale(.7);will-change:transform;
  transition:opacity .5s ease .35s, box-shadow .3s ease}
.bbh-root--in .bbh-cta{animation:bbh-ctain .6s cubic-bezier(.2,.9,.3,1.3) .35s both}
@keyframes bbh-ctain{0%{transform:scale(.7);opacity:0}60%{transform:scale(1.08);opacity:1}100%{transform:scale(1);opacity:1}}
.bbh-cta::before{content:"";position:absolute;top:-20%;bottom:-20%;width:34%;left:0;
  background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,.75) 50%,transparent 100%);
  transform:translateX(-160%) skewX(-18deg);transition:transform .55s ease}
.bbh-cta:hover::before{transform:translateX(420%) skewX(-18deg)}
.bbh-cta:hover{box-shadow:0 14px 32px rgba(8,20,10,.4), inset 0 -2px 0 rgba(0,0,0,.14)}
.bbh-cta .bbh-dot{width:7px;height:7px;border-radius:50%;background:var(--bbh-ink);
  animation:bbh-pulse 1.8s ease-in-out infinite}
@keyframes bbh-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.55);opacity:.55}}

.bbh-burger{display:none;flex:0 0 auto;width:42px;height:42px;border:0;border-radius:50%;
  background:var(--bbh-yellow);cursor:pointer;position:relative;
  box-shadow:0 8px 20px rgba(8,20,10,.3)}
.bbh-burger span{position:absolute;left:12px;right:12px;height:2.4px;border-radius:2px;
  background:var(--bbh-ink);transition:transform .35s cubic-bezier(.4,0,.2,1), opacity .25s ease, top .35s ease}
.bbh-burger span:nth-child(1){top:15px}
.bbh-burger span:nth-child(2){top:20px}
.bbh-burger span:nth-child(3){top:25px}
.bbh-burger--open span:nth-child(1){top:20px;transform:rotate(45deg)}
.bbh-burger--open span:nth-child(2){opacity:0;transform:scaleX(.2)}
.bbh-burger--open span:nth-child(3){top:20px;transform:rotate(-45deg)}

.bbh-menu{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;
  justify-content:center;padding:90px 30px 40px;
  background:radial-gradient(120% 110% at 50% 20%, #84d067 0%, #74c157 52%, #579f3d 100%);
  clip-path:circle(0px at calc(100% - 38px) 52px);visibility:hidden;
  transition:clip-path .6s cubic-bezier(.4,0,.2,1), visibility 0s linear .6s}
.bbh-menu--open{clip-path:circle(150% at calc(100% - 38px) 52px);visibility:visible;
  transition:clip-path .65s cubic-bezier(.4,0,.2,1)}
.bbh-menu a.bbh-mlink{display:block;text-decoration:none;font-family:"Anton",sans-serif;
  font-size:clamp(38px,10vw,64px);line-height:1.18;color:var(--bbh-cream);
  text-shadow:0 4px 22px rgba(16,40,20,.35);
  opacity:0;transform:translateY(26px);
  transition:opacity .4s ease, transform .5s cubic-bezier(.2,.9,.3,1.2)}
.bbh-menu a.bbh-mlink:hover{color:var(--bbh-yellow)}
.bbh-menu--open a.bbh-mlink{opacity:1;transform:none}
.bbh-menu--open a.bbh-mlink:nth-child(1){transition-delay:.12s}
.bbh-menu--open a.bbh-mlink:nth-child(2){transition-delay:.19s}
.bbh-menu--open a.bbh-mlink:nth-child(3){transition-delay:.26s}
.bbh-menu--open a.bbh-mlink:nth-child(4){transition-delay:.33s}
.bbh-menu .bbh-mcta{margin-top:30px;align-self:flex-start;opacity:0;transform:translateY(20px);
  transition:opacity .4s ease .4s, transform .5s cubic-bezier(.2,.9,.3,1.2) .4s}
.bbh-menu--open .bbh-mcta{opacity:1;transform:none}
.bbh-menu .bbh-mfoot{margin-top:auto;font-family:"Anton",sans-serif;font-size:11px;
  letter-spacing:.28em;text-transform:uppercase;color:rgba(16,40,20,.7);
  opacity:0;transition:opacity .4s ease .5s}
.bbh-menu--open .bbh-mfoot{opacity:1}

@media (max-width:860px){
  .bbh-links{display:none}
  .bbh-cta--bar{display:none}
  .bbh-burger{display:block;margin-left:auto}
}
@media (prefers-reduced-motion:reduce){
  .bbh-ticker-track{animation:none}
  .bbh-cta .bbh-dot{animation:none}
  .bbh-logo:hover img{animation:none}
  .bbh-root--in .bbh-logo img{animation:none;transform:none;opacity:1}
  .bbh-root--in .bbh-cta{animation:none;transform:none;opacity:1}
  .bbh-bar,.bbh-links li,.bbh-menu,.bbh-menu a.bbh-mlink{transition-duration:.01s}
}
`

export function BoxBitesHeader({
  visible = true,
  links = DEFAULT_LINKS,
  ctaLabel = 'Get 2-Pack · RM30',
  ctaHref = '#buy',
  onNavigate,
}: {
  visible?: boolean
  links?: HeaderLink[]
  ctaLabel?: string
  ctaHref?: string
  onNavigate?: (href: string) => void
}) {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const openRef = useRef(false)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  openRef.current = open

  useEffect(() => {
    if (!visible) return
    const t = window.setTimeout(() => setMounted(true), 80)
    return () => window.clearTimeout(t)
  }, [visible])

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY.current
      lastY.current = y
      setScrolled(y > 24)
      if (openRef.current) {
        setHidden(false)
        return
      }
      if (dy > 6 && y > 160) setHidden(true)
      else if (dy < -6) setHidden(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.3}px)`
    }
    const onLeave = () => {
      el.style.transition = 'transform .45s cubic-bezier(.2,.9,.3,1.4)'
      el.style.transform = 'translate(0,0)'
      window.setTimeout(() => {
        el.style.transition = ''
      }, 460)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [mounted])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const nav = (e: MouseEvent, href: string) => {
    setOpen(false)
    if (onNavigate) {
      e.preventDefault()
      onNavigate(href)
    }
  }

  const toTop = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (onNavigate) onNavigate('#top')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tickerOff = scrolled || hidden || !mounted

  if (!visible) return null

  return (
    <div className={`bbh-root${mounted ? ' bbh-root--in' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className={`bbh-ticker${tickerOff ? ' bbh-ticker--off' : ''}`} aria-hidden="true">
        <div className="bbh-ticker-track">
          <span>{TICKER.repeat(3)}</span>
          <span>{TICKER.repeat(3)}</span>
        </div>
      </div>

      <header
        className={`bbh-header${scrolled || !mounted ? ' bbh-header--scrolled' : ''}${hidden ? ' bbh-header--hidden' : ''}`}
      >
        <nav className="bbh-bar" aria-label="Main">
          <a className="bbh-logo" href="#top" onClick={toTop} aria-label="Earnergy — back to top">
            <img src={LOGO} alt="Earnergy — Smart Products, Smarter Business" />
          </a>

          <ul className="bbh-links">
            {links.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: `${0.18 + i * 0.07}s` }}>
                <a href={l.href} onClick={(e) => nav(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            ref={ctaRef}
            className="bbh-cta bbh-cta--bar"
            href={ctaHref}
            onClick={(e) => nav(e, ctaHref)}
          >
            <span className="bbh-dot" aria-hidden="true" />
            {ctaLabel}
          </a>

          <button
            type="button"
            className={`bbh-burger${open ? ' bbh-burger--open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        className={`bbh-menu${open ? ' bbh-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        {links.map((l) => (
          <a key={l.href} className="bbh-mlink" href={l.href} onClick={(e) => nav(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a className="bbh-cta bbh-mcta" href={ctaHref} onClick={(e) => nav(e, ctaHref)}>
          <span className="bbh-dot" aria-hidden="true" />
          {ctaLabel}
        </a>
        <div className="bbh-mfoot">Smart Products · Smarter Business</div>
      </div>
    </div>
  )
}

export default BoxBitesHeader
