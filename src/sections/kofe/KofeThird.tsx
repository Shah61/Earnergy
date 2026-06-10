const IMAGE1 = 'kofe/nondairy.png'   // Nondairy creamer (milk splash)
const IMAGE2 = 'kofe/arabica.png'   // Arabica coffee beans
const IMAGE3 = 'kofe/coconut.png'   // Coconut
const IMAGE4 = 'kofe/vanilla.png'   // Vanilla pods
const IMAGE5 = 'kofe/tricalcium.png'   // Tricalcium phosphate (powder bowl)
const IMAGE6 = 'kofe/chicory.png'   // Chicory root
const IMAGE7 = 'kofe/stevia.png'   // Stevia leaves
const IMAGE8 = 'kofe/mct.png'   // MCT oil drop
const IMAGE9 = 'kofe/probiotic.png'   // Probiotic
const IMAGE10 = 'kofe/monkfruit.png' // Monk fruit
const PACKSHOT = 'kofe/kofebox.png' // 2-box Kofé packshot

import { useEffect } from 'react'
import { getScrollRoot, getScrollY, subscribeToScroll } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'

type Ing = { src: string; name: string; desc: string }
const INGREDIENTS: Ing[] = [
  { src: IMAGE1, name: 'Nondairy Creamer', desc: 'Lactose-free alternative to milk — a creamy, smooth and rich taste in every sip.' },
  { src: IMAGE2, name: 'Arabica Coffee', desc: 'Natural caffeine to boost focus & energy, rich in cell-protecting antioxidants.' },
  { src: IMAGE3, name: 'Coconut Milk', desc: 'Healthy fats (MCFA) for quick energy, with a naturally creamy, smooth taste.' },
  { src: IMAGE4, name: 'Vanilla Flavour', desc: 'A soothing aroma and natural sweetness, with mild antioxidant properties.' },
  { src: IMAGE5, name: 'Tricalcium Phosphate', desc: 'A source of calcium for strong bones & teeth — supports muscle and nerve function.' },
  { src: IMAGE6, name: 'Chicory Root (Inulin)', desc: 'Prebiotic fiber that nourishes good gut bacteria and supports digestion.' },
  { src: IMAGE7, name: 'Stevia', desc: 'Natural zero-calorie sweetener that helps maintain healthy blood sugar levels.' },
  { src: IMAGE8, name: 'MCT Oil', desc: 'Quick source of energy, ideal for keto — supports weight management and brain function.' },
  { src: IMAGE9, name: 'Probiotic', desc: 'Balances good bacteria in the gut, enhancing immune and digestive health.' },
  { src: IMAGE10, name: 'Monk Fruit', desc: 'Natural zero-calorie sweetener, rich in antioxidants.' },
]

/* zoom factor per dive level */
const Z = 3.4
/* where the NEXT level nests inside the current one (fractions of item size).
   Varied directions = the winding steadicam path. */
const OFFSETS = [
  { x: 0.155, y: -0.04 },  // into the O of KOFÉ
  { x: -0.14, y: 0.11 },
  { x: 0.18, y: 0.05 },
  { x: -0.07, y: -0.16 },
  { x: 0.13, y: 0.14 },
  { x: -0.18, y: -0.03 },
  { x: 0.05, y: 0.17 },
  { x: 0.15, y: -0.12 },
  { x: -0.13, y: -0.09 },
  { x: 0.03, y: 0.15 },
  { x: -0.1, y: 0.02 },
]
const LEVELS = 12 // 0 = title, 1..10 = ingredients, 11 = packshot
const TRAVEL = 0.58 // share of each level's scroll spent moving (rest = dwell)
const PACKSHOT_SCALE = 0.5 * 1.15 // 50% base size + 15% bigger
const MONK_LEVEL = 10 // last ingredient before packshot
const PACKSHOT_REVEAL = 10.12 // hide monk fruit once packshot takes over

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Anton&family=Caveat:wght@600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.kf-root{
  --cream:#f3e9d7; --cream-lt:#f9f2e4;
  --esp:#2a1a0e; --esp-2:#3a2417; --latte:#c89a6b; --gold:#c9a25e; --yellow:#f5c518;
  --tx:#2a1a0e; --tx-soft:rgba(42,26,14,.78); --tx-kick:#8a6238;
  font-family:"Manrope",system-ui,sans-serif;color:var(--tx);
  line-height:1.5;-webkit-font-smoothing:antialiased;background:var(--cream);
}
.kf-root *{box-sizing:border-box;margin:0;padding:0}

.kf-dive{position:relative;height:1250vh}
.kf-stage{position:relative;height:100svh;width:100%;overflow:hidden;background:var(--cream);will-change:background-color,transform}
.kf-stage::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:40;
  background:radial-gradient(78% 70% at 50% 50%, transparent 58%, rgba(20,10,4,.32) 100%)}
/* deep-dive palette flips text to cream */
.kf-stage.deep{--tx:#f3e9d7;--tx-soft:rgba(243,233,215,.82);--tx-kick:#c9a25e}

.kf-origin{position:absolute;left:50%;top:50%;width:0;height:0}
.kf-lv{position:absolute;left:0;top:0;will-change:transform,opacity;pointer-events:none;
  display:flex;align-items:center;justify-content:center}
.kf-lv img{display:block;width:100%;height:auto;filter:drop-shadow(0 .06em .1em rgba(20,10,4,.35))}

.kf-lv-packshot .kf-pack-stack{position:relative;width:100%}
.kf-lv-packshot .kf-pack-back,
.kf-lv-packshot .kf-pack-front{display:block;width:100%;height:auto;filter:drop-shadow(0 .08em .14em rgba(20,10,4,.38))}
.kf-lv-packshot .kf-pack-back{position:absolute;left:0;top:0;width:100%;transform:translate(-8%,6%) scale(.93);z-index:1;opacity:.95}
.kf-lv-packshot .kf-pack-front{position:relative;z-index:2;transform:translate(7%,-5%)}

/* level 0: the title card (pure type, photographed by the same camera) */
.kf-lv-title{flex-direction:column;text-align:center}
.kf-lv-title .k{font-family:"Anton",sans-serif;font-size:.085em;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.kf-lv-title .t{font-family:"Playfair Display",serif;font-weight:800;font-size:.36em;line-height:.94;color:var(--esp);letter-spacing:.01em}
.kf-lv-title .s{font-family:"Caveat",cursive;font-weight:700;font-size:.12em;color:var(--gold);margin-top:.18em}
.kf-lv-title .sub{font-family:"Anton",sans-serif;font-size:.06em;letter-spacing:.34em;text-transform:uppercase;color:var(--esp-2);margin-top:.5em;opacity:.85}

/* fixed-screen caption (alternates sides per level) */
.kf-cap{position:absolute;z-index:50;top:50%;width:min(400px,40vw);opacity:0;pointer-events:none;
  transition:opacity .35s ease;will-change:opacity;transform:translateY(-50%)}
.kf-cap.on{opacity:1}
.kf-cap.l{left:clamp(26px,6vw,90px);text-align:left}
.kf-cap.r{right:clamp(26px,6vw,90px);text-align:right}
.kf-count{font-family:"JetBrains Mono",monospace;font-size:clamp(14px,1.7vw,17px);letter-spacing:.2em;color:var(--tx-kick)}
.kf-count b{color:var(--tx);font-weight:500}
.kf-cap h3{font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(28px,4vw,48px);line-height:1.02;color:var(--tx);margin:10px 0 12px;transition:color .5s ease}
.kf-cap p{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:clamp(13px,1.5vw,15px);line-height:1.65;color:var(--tx-soft);max-width:34ch;min-height:5em;font-weight:500;transition:color .5s ease}
.kf-cap.r p{margin-left:auto}
.kf-cap p .cur{display:inline-block;width:.6ch;background:var(--tx-kick);color:transparent;animation:kf-blink .9s steps(1) infinite;margin-left:1px}
@keyframes kf-blink{50%{opacity:0}}

/* dive depth meter */
.kf-meter{position:absolute;z-index:50;left:clamp(16px,3vw,32px);top:50%;transform:translateY(-50%);
  display:flex;flex-direction:column;gap:10px}
.kf-meter i{width:2px;height:26px;border-radius:2px;background:var(--tx-soft);opacity:.25;transition:opacity .3s ease,background .5s ease}
.kf-meter i.on{opacity:1;background:var(--tx-kick)}
.kf-hint{position:absolute;z-index:50;bottom:clamp(16px,4vh,32px);right:clamp(18px,5vw,44px);
  font-family:"Anton",sans-serif;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--tx-soft);
  opacity:0;transition:opacity .5s ease,color .5s ease}

/* finale overlays (typographic only) */
.kf-price{position:absolute;z-index:50;left:50%;top:clamp(20px,6vh,56px);transform:translateX(-50%);text-align:center;
  opacity:0;pointer-events:none;will-change:opacity,transform}
.kf-price .a{font-family:"Anton",sans-serif;font-size:13px;letter-spacing:.32em;text-transform:uppercase;color:var(--tx-kick)}
.kf-price .b{font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(46px,8vw,86px);line-height:1;color:var(--tx);
  border-bottom:5px solid var(--yellow);display:inline-block;padding:0 .12em .04em}
.kf-price .c{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(19px,2.6vw,26px);color:var(--tx-kick);margin-top:8px}
.kf-finale-foot{position:absolute;z-index:50;left:0;right:0;bottom:clamp(18px,4.5vh,42px);text-align:center;
  opacity:0;pointer-events:none;will-change:opacity}
.kf-finale-foot .l1{font-family:"Anton",sans-serif;font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--tx-soft)}
.kf-finale-foot .l2{font-family:"JetBrains Mono",monospace;font-size:12.5px;letter-spacing:.12em;color:var(--tx-soft);margin-top:8px}

/* footer */
.kf-outro{position:relative;min-height:74svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:70px 24px;
  background:radial-gradient(120% 90% at 50% 26%, var(--cream-lt) 0%, var(--cream) 52%, #e6d6bb 100%)}
.kf-outro .scr{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(42px,8vw,86px);line-height:.9;color:var(--gold)}
.kf-outro .scr .w{color:var(--esp);display:block}
.kf-outro .name{margin-top:18px;font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(20px,3vw,28px);color:var(--esp)}
.kf-outro .meta{margin-top:14px;font-size:13px;color:rgba(58,36,23,.72);line-height:1.8;max-width:46ch}
.kf-outro .badges{margin-top:20px;font-family:"Anton",sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(58,36,23,.6)}

@media (max-width:780px){
  .kf-cap{width:auto;left:18px!important;right:18px!important;text-align:left!important;
    top:auto!important;bottom:max(26px,7vh);transform:none!important}
  .kf-cap.r p{margin-left:0}
  .kf-cap p{min-height:6.2em}
  .kf-meter{display:none}
}
`

export default function KofeThird() {
  const activeProduct = useAppStore((s) => s.activeProduct)

  useEffect(() => {
    if (activeProduct !== 'kofe') return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)
    const smooth = (t: number) => t * t * (3 - 2 * t)
    const cleanup: Array<() => void> = []
    const $ = (id: string) => document.getElementById(id)

    const zone = $('kf-zone')
    const stage = $('kf-stage')
    const origin = $('kf-origin')
    if (!zone || !stage || !origin) return

    const lvEls = Array.from(origin.querySelectorAll('.kf-lv')) as HTMLElement[]
    const caps = INGREDIENTS.map((_, i) => $(`kf-cap${i}`)) as HTMLElement[]
    const meterTicks = Array.from(stage.querySelectorAll('.kf-meter i')) as HTMLElement[]
    const hint = $('kf-hint') as HTMLElement
    const price = $('kf-price') as HTMLElement
    const ffoot = $('kf-ffoot') as HTMLElement

    /* ---- world positions: each level nests inside the previous ---- */
    const P: { x: number; y: number }[] = [{ x: 0, y: 0 }]
    for (let i = 0; i < LEVELS - 1; i++) {
      const s = Math.pow(Z, -i)
      P.push({ x: P[i].x + OFFSETS[i].x * s, y: P[i].y + OFFSETS[i].y * s })
    }
    const posAt = (l: number) => {
      const i = clamp(Math.floor(l), 0, LEVELS - 1)
      const j = Math.min(i + 1, LEVELS - 1)
      const f = smooth(clamp(l - i, 0, 1))
      return { x: P[i].x + (P[j].x - P[i].x) * f, y: P[i].y + (P[j].y - P[i].y) * f }
    }

    /* ---- scroll → target level (travel + dwell per level) ---- */
    const levelTarget = (p: number) => {
      const seg = p * (LEVELS - 1)
      const i = Math.floor(seg)
      const fr = seg - i
      return clamp(i + smooth(clamp(fr / TRAVEL, 0, 1)), 0, LEVELS - 1)
    }

    /* ---- background depth: cream → espresso → cream ---- */
    const CREAM = [243, 233, 215]
    const DEEP = [26, 15, 7]
    const bgAt = (l: number) => {
      const t = clamp((l - 0.7) / 1.6, 0, 1) * clamp((10.55 - l) / 0.9, 0, 1)
      const c = CREAM.map((v, i) => Math.round(v + (DEEP[i] - v) * t))
      return { col: `rgb(${c[0]},${c[1]},${c[2]})`, deep: t > 0.5 }
    }

    let vw = 0, vh = 0, U = 0
    const fit = () => {
      vw = stage.clientWidth
      vh = stage.clientHeight
      U = Math.min(vw, vh) * (vw < 780 ? 0.78 : 0.62)
      lvEls.forEach((el) => {
        const isPackshot = el.classList.contains('kf-lv-packshot')
        const size = isPackshot ? U * PACKSHOT_SCALE : U
        el.style.width = `${size}px`
        if (el.classList.contains('kf-lv-title')) {
          el.style.height = `${U}px`
          el.style.fontSize = `${U}px` /* em-based type inside */
        }
      })
    }

    /* ---- typewriter ---- */
    let typeTimer: number | null = null
    const typeOut = (el: HTMLElement, text: string) => {
      if (typeTimer) { window.clearInterval(typeTimer); typeTimer = null }
      if (reduced) { el.textContent = text; return }
      let i = 0
      el.innerHTML = '<span class="cur">.</span>'
      typeTimer = window.setInterval(() => {
        i++
        if (i >= text.length) { el.textContent = text; window.clearInterval(typeTimer!); typeTimer = null; return }
        el.innerHTML = `${text.slice(0, i)}<span class="cur">.</span>`
      }, 16)
    }
    cleanup.push(() => { if (typeTimer) window.clearInterval(typeTimer) })

    let zoneStart = 0, targetP = 0, lCur = 0, raf = 0, activeCap = -2
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

    const setCap = (i: number) => {
      if (i === activeCap) return
      activeCap = i
      caps.forEach((c, idx) => c?.classList.toggle('on', idx === i))
      meterTicks.forEach((t, idx) => t.classList.toggle('on', idx <= i && i >= 0))
      if (i >= 0) {
        const p = caps[i]?.querySelector('p') as HTMLElement
        if (p) typeOut(p, INGREDIENTS[i].desc)
      }
    }

    const render = () => {
      if (!reduced) {
        updatePin()
        targetP = progress()
      }
      const lt = levelTarget(targetP)
      lCur += (lt - lCur) * (reduced ? 1 : 0.085)
      const F = posAt(lCur)
      const camScale = Math.pow(Z, lCur)

      for (let i = 0; i < LEVELS; i++) {
        const el = lvEls[i]
        const rel = Math.pow(Z, lCur - i) // on-screen scale of level i
        if (rel < 0.03 || rel > 24) { el.style.opacity = '0'; el.style.visibility = 'hidden'; continue }
        el.style.visibility = 'visible'
        const x = (P[i].x - F.x) * camScale * U
        const y = (P[i].y - F.y) * camScale * U
        /* fade in while approaching, fade out as it flies past the lens */
        const d = lCur - i
        let op = 1
        if (rel < 0.16) op = clamp((rel - 0.03) / 0.13, 0, 1)
        if (d > 0.5) op = clamp(1 - (d - 0.5) / 0.55, 0, 1)
        /* monk fruit + prior ingredients: gone before packshot finale */
        if (i >= 1 && i <= MONK_LEVEL && lCur >= PACKSHOT_REVEAL) {
          const hide = clamp((lCur - PACKSHOT_REVEAL) / 0.22, 0, 1)
          op *= 1 - hide
        }
        if (i === MONK_LEVEL && lCur >= PACKSHOT_REVEAL + 0.08) op = 0
        el.style.opacity = `${op}`
        el.style.zIndex = `${100 - i}`
        el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${rel})`
        if (op <= 0.01) el.style.visibility = 'hidden'
      }

      /* captions: only when settled on an ingredient level (1..10) */
      const near = Math.round(lCur)
      const settled = Math.abs(lCur - near) < 0.28
      setCap(settled && near >= 1 && near <= 10 ? near - 1 : -1)

      /* background depth + palette flip */
      const bg = bgAt(lCur)
      stage.style.backgroundColor = bg.col
      stage.classList.toggle('deep', bg.deep)

      if (hint) hint.style.opacity = targetP > 0.01 && targetP < 0.95 ? '0.8' : '0'

      /* finale typographic overlays */
      const fo = clamp((lCur - 10.55) / 0.35, 0, 1)
      if (price) {
        price.style.opacity = `${fo}`
        price.style.transform = `translateX(-50%) translateY(${(1 - fo) * -24}px)`
      }
      if (ffoot) ffoot.style.opacity = `${fo}`

      raf = requestAnimationFrame(render)
    }

    const onScroll = () => { targetP = progress() }
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
    <div className="kf-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="kf-dive" id="kf-zone" aria-label="Kofé — an infinite dive through ten ingredients">
        <div className="kf-stage" id="kf-stage">
          <div className="kf-origin" id="kf-origin">
            {/* level 0 — the title card the camera dives into */}
            <div className="kf-lv kf-lv-title">
              <div className="k">Earnergy presents</div>
              <div className="t">KOFÉ</div>
              <div className="s">Spanish Latte — goodbye sugar, hello energy</div>
              <div className="sub">scroll to dive in</div>
            </div>

            {/* levels 1–10 — each ingredient nested inside the last */}
            {INGREDIENTS.map((ing) => (
              <div className="kf-lv" key={ing.name}>
                <img src={ing.src} alt={ing.name} />
              </div>
            ))}

            {/* level 11 — the dive resolves onto the packshot (2-box stack) */}
            <div className="kf-lv kf-lv-packshot">
              <div className="kf-pack-stack">
                <img className="kf-pack-back" src={PACKSHOT} alt="" aria-hidden="true" />
                <img className="kf-pack-front" src={PACKSHOT} alt="Kofé Spanish Latte — 2 box bundle" />
              </div>
            </div>
          </div>

          {/* fixed captions, alternating sides */}
          {INGREDIENTS.map((ing, i) => (
            <div className={`kf-cap ${i % 2 === 0 ? 'r' : 'l'}`} id={`kf-cap${i}`} key={ing.name}>
              <div className="kf-count"><b>{String(i + 1).padStart(2, '0')}</b> / 10</div>
              <h3>{ing.name}</h3>
              <p></p>
            </div>
          ))}

          {/* depth meter */}
          <div className="kf-meter" aria-hidden="true">
            {INGREDIENTS.map((ing) => <i key={ing.name} />)}
          </div>
          <div className="kf-hint" id="kf-hint">Keep diving</div>

          {/* finale type */}
          <div className="kf-price" id="kf-price">
            <div className="a">2 Box Bundle</div>
            <div className="b">RM 30</div>
            <div className="c">with probiotics + prebiotics</div>
          </div>
          <div className="kf-finale-foot" id="kf-ffoot">
            <div className="l1">5 Sachets × 25g per box</div>
            <div className="l2">sustained energy · improved focus · gut health · keto friendly · no added sugar</div>
          </div>
        </div>
      </section>

      <footer className="kf-outro">
        <div className="scr">Goodbye Sugar,<span className="w">Hello Energy</span></div>
        <div className="name">Kofé — Spanish Latte</div>
        <p className="meta">Ten premium ingredients, one continuous dive. An Earnergy product — smart products, smarter business.</p>
        <div className="badges">No Added Sugar · Keto Friendly · Clean Ingredients</div>
      </footer>
    </div>
  )
}