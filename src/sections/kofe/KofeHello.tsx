const IMAGE_CUP = 'kofe/cup.png'     // latte cup photo (also used inside the wordmark)
const IMAGE_PACK = 'kofe/kofebox.png'   // Spanish Latte pack front
const IMAGE_BRAND = 'photos/kofeWallpaper.jpeg' // dark brand card (kofé / prebiotics+probiotics)
const IMAGE_BEANS = '/arabica.png' // coffee beans cutout (parallax drift)

import { useEffect } from 'react'
import { getScrollRoot, getScrollY, subscribeToScroll } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'

const CLAIMS = [
  { t: 'Dairy-Free Creamy Blend', s: 'with coconut milk', tone: 'dark' },
  { t: 'No White Sugar', s: 'sweetened naturally with monk fruit', tone: 'cream' },
  { t: 'Boost Focus & Energy', s: 'arabica coffee + MCT oil', tone: 'gold' },
  { t: 'Supports Gut Health', s: 'prebiotics (inulin) + probiotics', tone: 'dark' },
  { t: 'Keto-Friendly & Low GI', s: 'ideal for modern lifestyles', tone: 'cream' },
  { t: 'Rich & Smooth Taste', s: 'indulgence without guilt', tone: 'gold' },
]

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Anton&family=Caveat:wght@600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.ks-root{
  --cream:#f3e9d7; --cream-lt:#f9f2e4; --esp:#2a1a0e; --esp-2:#3a2417;
  --gold:#c9a25e; --yellow:#f5c518; --ink:#14110a;
  font-family:"Manrope",system-ui,sans-serif;color:var(--esp);
  line-height:1.5;-webkit-font-smoothing:antialiased;background:var(--cream);
}
.ks-root *{box-sizing:border-box;margin:0;padding:0}

.ks-zone{position:relative;height:900vh}
.ks-stage{position:relative;height:100svh;width:100%;overflow:hidden;background:var(--cream)}
.ks-stage::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:60;
  background:radial-gradient(80% 72% at 50% 50%, transparent 60%, rgba(20,10,4,.26) 100%)}

/* ---------- gallery (behind the gate) ---------- */
.ks-track{position:absolute;top:0;left:0;height:100%;display:flex;align-items:stretch;will-change:transform}
.ks-panel{position:relative;flex:0 0 auto;width:82vw;height:100%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:8vh 7vw;gap:14px}
.ks-panel.dark{background:var(--esp);color:var(--cream)}
.ks-panel.cream{background:var(--cream);color:var(--esp)}
.ks-panel.gold{background:#e9c34a;color:var(--ink)}
.ks-kick{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.3em;text-transform:uppercase;opacity:.75}
.ks-num{font-family:"JetBrains Mono",monospace;font-size:14px;letter-spacing:.24em;opacity:.65}
.ks-claim{font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(40px,7.4vw,108px);line-height:.98;max-width:11ch}
.ks-sub{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(20px,3vw,32px);color:inherit;opacity:.85}
.ks-photo{height:min(62vh,560px);width:auto;filter:drop-shadow(0 28px 36px rgba(20,10,4,.32))}
.ks-photo.card{height:min(56vh,500px);border-radius:18px;box-shadow:0 34px 60px rgba(20,10,4,.35)}
.ks-prep{font-family:"JetBrains Mono",monospace;font-size:clamp(13px,1.6vw,16px);letter-spacing:.06em;opacity:.85;max-width:42ch}
.ks-handoff .ks-claim{font-size:clamp(34px,5.6vw,76px)}

/* parallax bean layers */
.ks-par{position:absolute;top:0;left:0;height:100%;width:100%;pointer-events:none;will-change:transform}
.ks-par.back{z-index:1;opacity:.5}
.ks-par.front{z-index:30;opacity:.9}
.ks-bean{position:absolute;will-change:transform;filter:drop-shadow(0 10px 14px rgba(20,10,4,.3))}
.ks-bean img{display:block;width:100%;height:auto}
.ks-trackwrap{position:absolute;inset:0;z-index:10}

/* ---------- the gate (masked wordmark, splits open) ---------- */
.ks-gate{position:absolute;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:var(--cream);will-change:transform;text-align:center;padding:0 5vw}
.ks-gate.gl{clip-path:inset(0 50% 0 0)}
.ks-gate.gr{clip-path:inset(0 0 0 50%)}
.ks-gk{font-family:"Anton",sans-serif;font-size:clamp(11px,1.5vw,14px);letter-spacing:.34em;text-transform:uppercase;color:var(--gold);margin-bottom:1vh}
.ks-word{font-family:"Playfair Display",serif;font-weight:800;line-height:.84;letter-spacing:-.01em;
  font-size:clamp(120px,30vw,460px);
  background-image:url(${'__CUP__'});background-size:auto 170%;background-position:4% 50%;background-repeat:no-repeat;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  will-change:background-position,transform;
  filter:drop-shadow(0 6px 26px rgba(42,26,14,.25))}
.ks-gs{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(20px,3.4vw,36px);color:var(--gold);margin-top:1.4vh}
.ks-gsub{font-family:"Anton",sans-serif;font-size:clamp(10px,1.3vw,13px);letter-spacing:.32em;text-transform:uppercase;color:var(--esp-2);opacity:.8;margin-top:2.2vh}

.ks-hint{position:absolute;z-index:55;bottom:clamp(16px,4vh,32px);left:50%;transform:translateX(-50%);
  font-family:"Anton",sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--esp-2);
  opacity:.75;transition:opacity .4s ease}

@media (max-width:780px){
  .ks-panel{width:94vw;padding:7vh 6vw}
  .ks-word{font-size:34vw}
  .ks-photo{height:min(46vh,420px)}
}
`

export default function KofeHello() {
  const activeProduct = useAppStore((s) => s.activeProduct)

  useEffect(() => {
    if (activeProduct !== 'kofe') return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)
    const smooth = (t: number) => t * t * (3 - 2 * t)
    const cleanup: Array<() => void> = []
    const $ = (id: string) => document.getElementById(id)

    const zone = $('ks-zone'), stage = $('ks-stage')
    const track = $('ks-track')
    const gateL = $('ks-gl'), gateR = $('ks-gr')
    const words = [gateL, gateR].map((g) => g?.querySelector('.ks-word')) as HTMLElement[]
    const parBack = $('ks-pback'), parFront = $('ks-pfront')
    const hint = $('ks-hint')
    if (!zone || !stage || !track || !gateL || !gateR) return

    /* parallax beans: scatter instances of the beans cutout on two depths */
    const beans: { el: HTMLElement; fx: number; fy: number; depth: number; ph: number }[] = []
    const makeBeans = (layer: HTMLElement | null, n: number, depth: number, size: [number, number]) => {
      if (!layer) return
      for (let i = 0; i < n; i++) {
        const el = document.createElement('div')
        el.className = 'ks-bean'
        const img = document.createElement('img')
        img.src = IMAGE_BEANS; img.alt = ''
        el.appendChild(img)
        const w = size[0] + Math.random() * (size[1] - size[0])
        el.style.width = `${w}px`
        el.style.transform = `rotate(${Math.random() * 360}deg)`
        layer.appendChild(el)
        beans.push({ el, fx: Math.random() * 3, fy: 0.08 + Math.random() * 0.84, depth, ph: Math.random() * Math.PI * 2 })
      }
    }
    makeBeans(parBack, reduced ? 4 : 9, 0.5, [40, 90])
    makeBeans(parFront, reduced ? 3 : 7, 1.45, [60, 130])
    cleanup.push(() => beans.forEach((b) => b.el.remove()))

    const CUP_END = 0.30
    const SPLIT_END = 0.42
    const DOLLY_START = 0.42
    const BG_START = 2
    const BG_END = 102

    let vw = 0, vh = 0, trackW = 0, zoneStart = 0, targetP = 0, raf = 0
    const cur = { bg: BG_START, sc: 1, door: 0, x: 0 }
    const fit = () => {
      vw = stage.clientWidth; vh = stage.clientHeight
      trackW = track.scrollWidth
    }
    const measureZoneStart = () => {
      const root = getScrollRoot()
      const scrollY = getScrollY()
      if (root.type === 'element') {
        const w = root.wrapper.getBoundingClientRect()
        const z = zone.getBoundingClientRect()
        zoneStart = scrollY + (z.top - w.top)
      } else {
        zoneStart = scrollY + zone.getBoundingClientRect().top
      }
    }
    const scrollRange = () => Math.max(zone.offsetHeight - vh, 1)
    const progress = () => {
      const range = scrollRange()
      return clamp((getScrollY() - zoneStart) / range, 0, 1)
    }
    /* Lenis moves content via transform, so CSS sticky/fixed break — counter-scroll with translateY */
    const updatePin = () => {
      const inZone = getScrollY() - zoneStart
      const range = scrollRange()
      if (inZone >= 0 && inZone < range) {
        stage.style.transform = `translateY(${inZone}px)`
      } else if (inZone >= range) {
        stage.style.transform = `translateY(${range}px)`
      } else {
        stage.style.transform = ''
      }
    }

    const render = () => {
      if (!reduced) {
        updatePin()
        targetP = progress()
      }
      const p = targetP, k = reduced ? 1 : 0.09
      const t = reduced ? 0 : Date.now()

      /* phase 1: pan cup from start of K through to é */
      const mt = smooth(clamp(p / CUP_END, 0, 1))
      const bgTgt = BG_START + mt * (BG_END - BG_START)
      const scTgt = 1 + mt * 0.07
      /* phase 2: split gate only after cup reaches é */
      const dt = p < CUP_END ? 0 : smooth(clamp((p - CUP_END) / (SPLIT_END - CUP_END), 0, 1))
      /* phase 3: dolly after split */
      const gp = smooth(clamp((p - DOLLY_START) / (1 - DOLLY_START), 0, 1))
      const xTgt = -gp * Math.max(trackW - vw, 0)

      cur.bg += (bgTgt - cur.bg) * k
      cur.sc += (scTgt - cur.sc) * k
      cur.door += (dt - cur.door) * k
      cur.x += (xTgt - cur.x) * k

      words.forEach((w) => {
        if (!w) return
        w.style.backgroundPosition = `${cur.bg}% 50%`
        w.style.transform = `scale(${cur.sc})`
      })
      gateL.style.transform = `translateX(${-cur.door * 62}vw)`
      gateR.style.transform = `translateX(${cur.door * 62}vw)`
      const gateGone = cur.door > 0.995
      gateL.style.visibility = gateGone ? 'hidden' : 'visible'
      gateR.style.visibility = gateGone ? 'hidden' : 'visible'

      track.style.transform = `translateX(${cur.x}px)`

      /* parallax layers ride the same dolly at different speeds */
      if (parBack) parBack.style.transform = `translateX(${cur.x * 0.5}px)`
      if (parFront) parFront.style.transform = `translateX(${cur.x * 1.45}px)`
      for (const b of beans) {
        const bob = reduced ? 0 : Math.sin(t / 1600 + b.ph) * 8
        const rot = reduced ? 0 : Math.sin(t / 2400 + b.ph) * 10
        b.el.style.left = `${b.fx * vw}px`
        b.el.style.top = `calc(${b.fy * 100}% + ${bob}px)`
        b.el.style.rotate = `${rot}deg`
      }

      if (hint) hint.style.opacity = p < 0.05 ? '0.75' : '0'
      raf = requestAnimationFrame(render)
    }

    const onScroll = () => {
      targetP = progress()
    }
    const onResize = () => {
      fit()
      measureZoneStart()
      onScroll()
    }
    const resetStage = () => {
      stage.style.transform = ''
    }

    fit()
    measureZoneStart()
    onScroll()
    render()

    cleanup.push(subscribeToScroll(onScroll))
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    cleanup.push(() => {
      cancelAnimationFrame(raf)
      resetStage()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    })

    return () => { cleanup.forEach((fn) => fn()) }
  }, [activeProduct])

  return (
    <div className="ks-root">
      <style dangerouslySetInnerHTML={{ __html: css.replace('__CUP__', IMAGE_CUP) }} />

      <section className="ks-zone" id="ks-zone" aria-label="Kofé — Spanish Latte showcase">
        <div className="ks-stage" id="ks-stage">

          {/* the gallery wall (revealed when the gate splits) */}
          <div className="ks-trackwrap">
            <div className="ks-par back" id="ks-pback" aria-hidden="true"></div>
            <div className="ks-track" id="ks-track">

              <div className="ks-panel cream">
                <div className="ks-kick">Earnergy presents</div>
                <img className="ks-photo" src={IMAGE_CUP} alt="Kofé Spanish Latte" />
                <div className="ks-claim" style={{ fontSize: 'clamp(30px,4.6vw,62px)' }}>Spanish Latte</div>
                <div className="ks-sub">a Spanish latte that serves a purpose</div>
              </div>

              <div className="ks-panel dark">
                <img className="ks-photo card" src={IMAGE_BRAND} alt="kofé — goodbye sugar, hello energy" />
              </div>

              {CLAIMS.map((c, i) => (
                <div className={`ks-panel ${c.tone}`} key={c.t}>
                  <div className="ks-num">{String(i + 1).padStart(2, '0')} / 06</div>
                  <div className="ks-claim">{c.t}</div>
                  <div className="ks-sub">{c.s}</div>
                </div>
              ))}

              <div className="ks-panel cream">
                <img className="ks-photo" src={IMAGE_PACK} alt="Kofé Spanish Latte pack" />
                <div className="ks-kick">with prebiotics + probiotics</div>
                <div className="ks-prep">Mix 1 sachet (25g) with 150ml of hot water.</div>
              </div>

              <div className="ks-panel dark ks-handoff">
                <div className="ks-kick">next</div>
                <div className="ks-claim">Now — the ten ingredients.</div>
                <div className="ks-sub">keep scrolling to dive in</div>
              </div>

            </div>
            <div className="ks-par front" id="ks-pfront" aria-hidden="true"></div>
          </div>

          {/* the gate: masked wordmark in two halves that split apart */}
          <div className="ks-gate gl" id="ks-gl">
            <div className="ks-gk">Earnergy presents</div>
            <div className="ks-word">kofé</div>
            <div className="ks-gs">goodbye sugar, hello energy</div>
            <div className="ks-gsub">Spanish Latte · with prebiotics + probiotics</div>
          </div>
          <div className="ks-gate gr" id="ks-gr" aria-hidden="true">
            <div className="ks-gk">Earnergy presents</div>
            <div className="ks-word">kofé</div>
            <div className="ks-gs">goodbye sugar, hello energy</div>
            <div className="ks-gsub">Spanish Latte · with prebiotics + probiotics</div>
          </div>

          <div className="ks-hint" id="ks-hint">Scroll</div>
        </div>
      </section>
    </div>
  )
}