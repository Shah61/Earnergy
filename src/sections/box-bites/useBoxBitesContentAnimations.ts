import { type RefObject, useEffect } from 'react'

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v
}

function smooth(t: number) {
  return t * t * (3 - 2 * t)
}

function lerpKeys<T extends Record<string, number>>(
  keys: Array<T & { p: number }>,
  p: number,
  fields: (keyof T)[],
) {
  let a = keys[0]
  let b = keys[keys.length - 1]
  for (let i = 0; i < keys.length - 1; i++) {
    if (p >= keys[i].p && p <= keys[i + 1].p) {
      a = keys[i]
      b = keys[i + 1]
      break
    }
  }
  if (p <= keys[0].p) a = b = keys[0]
  const span = b.p - a.p || 1
  const t = smooth(clamp((p - a.p) / span, 0, 1))
  const o: Record<string, number> = {}
  fields.forEach((f) => {
    o[f as string] = a[f] + (b[f] - a[f]) * t
  })
  return o as T
}

function sstep(a: number, b: number, p: number) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return t * t * (3 - 2 * t)
}

export function useBoxBitesContentAnimations(
  rootRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cleanups: Array<() => void> = []

    // ---- 3D nutrition table ----
    const tz = root.querySelector<HTMLElement>('#tz')
    const card = root.querySelector<HTMLElement>('#card3d')
    const faller = root.querySelector<HTMLImageElement>('#faller')
    const fshadow = root.querySelector<HTMLElement>('#fshadow')
    const overlay = root.querySelector<HTMLElement>('#theadOverlay')

    if (tz && card && faller && fshadow && overlay) {
      const tableZone = tz
      const cardEl = card
      const fallerEl = faller
      const fshadowEl = fshadow
      const overlayEl = overlay
      const tstage = tableZone.querySelector<HTMLElement>('.tstage')!
      const rows = Array.from(cardEl.querySelectorAll<HTMLElement>('.row'))

      const FALL = [
        { p: 0.0, idx: -1.6 },
        { p: 0.1, idx: -1.6 },
        { p: 0.18, idx: 0 },
        { p: 0.26, idx: 0 },
        { p: 0.32, idx: 1 },
        { p: 0.4, idx: 1 },
        { p: 0.46, idx: 2 },
        { p: 0.54, idx: 2 },
        { p: 0.6, idx: 3 },
        { p: 0.68, idx: 3 },
        { p: 0.74, idx: 4 },
        { p: 0.82, idx: 4 },
        { p: 0.88, idx: 5 },
        { p: 1.0, idx: 5 },
      ]
      const CAM = [
        { p: 0.0, rx: 52, s: 0.8 },
        { p: 0.1, rx: 26, s: 1.06 },
        { p: 0.22, rx: 15, s: 1.3 },
        { p: 0.86, rx: 10, s: 1.34 },
        { p: 1.0, rx: 7, s: 1.16 },
      ]
      const DROPS = [0.18, 0.32, 0.46, 0.6, 0.74, 0.88]

      let vh = 0
      let vw = 0
      let mobile = false
      let rowY: number[] = []
      let cardH = 1
      const cur = { idx: -1.6, rx: 52, s: 0.8 }
      let targetP = 0
      let landed = -1
      let rafId = 0

      const crumbs: Array<{
        el: HTMLElement
        x: number
        y: number
        vx: number
        vy: number
        rot: number
        vr: number
        life: number
      }> = []
      let crumbRAF = 0
      const COLORS = [
        '#5a3a22',
        '#7a4a26',
        '#3a2417',
        '#c9a25e',
        '#e7d4a6',
        '#8a5a2e',
      ]

      function measure() {
        vw = tstage.clientWidth
        vh = tstage.clientHeight
        mobile = vw < 760
        cardH = cardEl.offsetHeight
        rowY = rows.map((r) => r.offsetTop + r.offsetHeight / 2)
      }

      function idxToY(idx: number) {
        if (idx <= 0) {
          const top = -cardH * 0.34
          const y0 = rowY[0]
          const t = (idx + 1.6) / 1.6
          return top + (y0 - top) * clamp(t, 0, 1)
        }
        const i = Math.floor(idx)
        const f = idx - i
        const a = rowY[Math.min(i, 5)]
        const b = rowY[Math.min(i + 1, 5)]
        return a + (b - a) * f
      }

      function progress() {
        const r = tableZone.getBoundingClientRect()
        const d = tableZone.offsetHeight - vh
        return d <= 0 ? 0 : clamp(-r.top / d, 0, 1)
      }

      function countUp(row: HTMLElement) {
        const to = parseFloat(row.dataset.to ?? '0')
        const dec = parseInt(row.dataset.dec ?? '0', 10)
        const unit = row.dataset.unit ?? ''
        const val = row.querySelector<HTMLElement>('.val')
        if (!val) return
        if (REDUCED) {
          val.textContent = `${to.toFixed(dec)}${unit}`
          return
        }
        const dur = 900
        let t0: number | null = null
        const step = (ts: number) => {
          if (!t0) t0 = ts
          const p = Math.min((ts - t0) / dur, 1)
          const e = 1 - (1 - p) ** 3
          val.textContent = `${(to * e).toFixed(dec)}${unit}`
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }

      function burst(x: number, y: number) {
        if (REDUCED) return
        const n = 10 + Math.floor(Math.random() * 5)
        for (let i = 0; i < n; i++) {
          const el = document.createElement('span')
          el.className = 'crumb'
          const sz = 3 + Math.random() * 5.5
          el.style.width = `${sz}px`
          el.style.height = `${sz * (0.7 + Math.random() * 0.5)}px`
          el.style.background = COLORS[(Math.random() * COLORS.length) | 0]
          cardEl.appendChild(el)
          const ang = Math.PI * (1.05 + Math.random() * 0.9)
          const sp = 2.2 + Math.random() * 3.4
          crumbs.push({
            el,
            x: x + (Math.random() * 30 - 15),
            y: y + 8,
            vx: Math.cos(ang) * sp,
            vy: -Math.abs(Math.sin(ang)) * sp * 1.25 - 1.2,
            rot: Math.random() * 360,
            vr: Math.random() * 14 - 7,
            life: 1,
          })
        }
        if (!crumbRAF) crumbRAF = requestAnimationFrame(stepCrumbs)
      }

      function stepCrumbs() {
        crumbRAF = 0
        for (let i = crumbs.length - 1; i >= 0; i--) {
          const c = crumbs[i]
          c.vy += 0.32
          c.x += c.vx
          c.y += c.vy
          c.rot += c.vr
          c.life -= 0.022
          if (c.life <= 0) {
            c.el.remove()
            crumbs.splice(i, 1)
            continue
          }
          c.el.style.transform = `translate(-50%,-50%) translateZ(48px) translate(${c.x}px,${c.y}px) rotate(${c.rot}deg)`
          c.el.style.left = '0px'
          c.el.style.top = '0px'
          c.el.style.opacity = String(Math.min(1, c.life * 1.6))
        }
        if (crumbs.length) crumbRAF = requestAnimationFrame(stepCrumbs)
      }

      function setLanded(n: number) {
        if (n === landed) return
        const prev = landed
        landed = n
        rows.forEach((r, i) => {
          r.classList.toggle('on', i === n)
          r.classList.toggle('done', i <= n && n >= 0)
        })
        if (n > prev) {
          for (let i = Math.max(prev + 1, 0); i <= n; i++) countUp(rows[i])
        }
        if (n >= 0 && n > prev && !REDUCED) {
          cardEl.classList.remove('jolt')
          void cardEl.offsetWidth
          cardEl.classList.add('jolt')
          burst(cardEl.offsetWidth / 2, rowY[n])
        }
      }

      function landedFor(p: number) {
        let n = -1
        for (let i = 0; i < DROPS.length; i++) {
          if (p >= DROPS[i] - 0.005) n = i
        }
        return n
      }

      function render() {
        const f = lerpKeys(FALL, targetP, ['idx'])
        const c = lerpKeys(CAM, targetP, ['rx', 's'])
        const k = REDUCED ? 1 : 0.1
        cur.idx += (f.idx - cur.idx) * k
        cur.rx += (c.rx - cur.rx) * k
        cur.s += (c.s - cur.s) * k

        const s = mobile ? Math.min(cur.s, 1.04) : cur.s
        const rx = mobile ? cur.rx * 0.8 : cur.rx
        const follow =
          clamp(idxToY(Math.max(cur.idx, 0)) - rowY[0], 0, cardH) *
          0.62 *
          (s > 1.1 ? 1 : 0.4)
        cardEl.style.transform = `translateY(${-follow}px) rotateX(${rx}deg) scale(${s})`

        const y = idxToY(cur.idx)
        const falling = Math.abs(f.idx - cur.idx)
        const squash = clamp(1 - falling * 0.16, 0.86, 1)
        const rot = Math.sin(cur.idx * 2.2) * 6
        fallerEl.style.transform = `translate(-50%,-50%) translateZ(46px) rotate(${rot}deg) scale(${2 - squash},${squash})`
        fallerEl.style.top = `${y}px`
        fallerEl.style.opacity = String(clamp((targetP - 0.06) / 0.05, 0, 1))

        const h = clamp(falling, 0, 1)
        fshadowEl.style.top = `${y + (mobile ? 26 : 34)}px`
        fshadowEl.style.transform = `translateX(-50%) scale(${1 + h * 0.7})`
        fshadowEl.style.opacity = String(
          clamp((targetP - 0.08) / 0.05, 0, 1) * (0.85 - h * 0.45),
        )

        overlayEl.style.opacity = String(clamp(1 - (targetP - 0.55) / 0.12, 0, 1))
        overlayEl.style.transform = `translateY(${-clamp((targetP - 0.55) / 0.12, 0, 1) * 30}px)`
        rafId = requestAnimationFrame(render)
      }

      const onScroll = () => {
        targetP = progress()
        setLanded(landedFor(targetP))
      }
      const onResize = () => {
        measure()
        onScroll()
      }

      const initTable = () => {
        measure()
        onScroll()
        rafId = requestAnimationFrame(render)
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        window.addEventListener('orientationchange', onResize)
      }

      if (fallerEl.complete) initTable()
      else {
        fallerEl.addEventListener('load', initTable)
        fallerEl.addEventListener('error', initTable)
      }

      cleanups.push(() => {
        cancelAnimationFrame(rafId)
        cancelAnimationFrame(crumbRAF)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
        crumbs.forEach((c) => c.el.remove())
      })
    }

    // ---- into the pouch ----
    const sz = root.querySelector<HTMLElement>('#sz')
    if (sz) {
      const pouchZone = sz
      const sstage = pouchZone.querySelector<HTMLElement>('.sstage')!
      const shead = root.querySelector<HTMLElement>('#shead')!
      const wrap = root.querySelector<HTMLElement>('#pouchwrap')!
      const pimg = root.querySelector<HTMLImageElement>('#pouchImg')!
      const mouth = root.querySelector<HTMLElement>('#mouth')!
      const iris = root.querySelector<HTMLElement>('#iris')!
      const inside = root.querySelector<HTMLElement>('#inside')!
      const fallworld = root.querySelector<HTMLElement>('#fallworld')!
      const speckl = root.querySelector<HTMLElement>('#speckl')!
      const insidehead = root.querySelector<HTMLElement>('#insidehead')!
      const stations = Array.from(
        root.querySelectorAll<HTMLElement>('.station'),
      )
      const landing = root.querySelector<HTMLElement>('#landing')!
      const stamp = root.querySelector<HTMLElement>('#stamp')!

      const DIVE_IN = 0.3
      const DIVE_FULL = 0.42
      const FALL_END = 0.88
      const STA_P = [0.475, 0.575, 0.675, 0.775]
      const LAND_P = 0.88

      let vh = 0
      let vw = 0
      let mobile = false
      let FH = 0
      let targetP = 0
      let rafId = 0
      const cur = { rise: 1, rx: 0, sc: 1, m: 0, ir: 0, fall: 0 }
      let seeded = false

      function fit() {
        vw = sstage.clientWidth
        vh = sstage.clientHeight
        mobile = vw < 760
        const gap = vh * 0.95
        const y0 = vh * 0.62
        stations.forEach((s, i) => {
          s.style.top = `${y0 + gap * i - s.offsetHeight / 2}px`
        })
        landing.style.top = `${y0 + gap * 4 - 40}px`
        FH = y0 + gap * 4 + vh * 0.55
        fallworld.style.height = `${FH}px`
        speckl.style.height = `${FH}px`
        seedSpecks()
      }

      function seedSpecks() {
        if (seeded) return
        seeded = true
        const cols = ['#5a3a22', '#7a4a26', '#c9a25e', '#e7d4a6', '#8a5a2e']
        for (let i = 0; i < 46; i++) {
          const s = document.createElement('span')
          s.className = 'speck'
          const sz2 = 2 + Math.random() * 6
          s.style.width = `${sz2}px`
          s.style.height = `${sz2 * (0.7 + Math.random() * 0.5)}px`
          s.style.left = `${Math.random() * 100}%`
          s.style.top = `${Math.random() * 100}%`
          s.style.background = cols[(Math.random() * cols.length) | 0]
          s.style.opacity = String(0.18 + Math.random() * 0.4)
          speckl.appendChild(s)
        }
      }

      function progress() {
        const r = pouchZone.getBoundingClientRect()
        const d = pouchZone.offsetHeight - vh
        return d <= 0 ? 0 : clamp(-r.top / d, 0, 1)
      }

      function render() {
        const p = targetP
        const k = REDUCED ? 1 : 0.09

        const rise = (1 - sstep(0, 0.1, p)) * 180
        const rx = -sstep(0.1, 0.34, p) * 58
        const sc =
          1 + sstep(0.1, DIVE_IN, p) * 0.9 + sstep(DIVE_IN, DIVE_FULL, p) * 2.3
        const down = sstep(0.1, DIVE_FULL, p) * vh * 0.22
        const m = sstep(0.16, 0.34, p)
        const ir = sstep(0.33, DIVE_FULL, p)

        cur.rise += (rise - cur.rise) * k
        cur.rx += (rx - cur.rx) * k
        cur.sc += (sc - cur.sc) * k
        cur.m += (m - cur.m) * k
        cur.ir += (ir - cur.ir) * k

        const bob = REDUCED
          ? 0
          : Math.sin(Date.now() / 1400) * 5 * (1 - sstep(0.1, 0.2, p))
        wrap.style.transform = `translate(-50%,-50%) translateY(${cur.rise + bob + down}px) rotateX(${cur.rx}deg) scale(${cur.sc})`
        wrap.style.opacity = String(
          clamp(p / 0.05, 0, 1) * (1 - sstep(0.4, 0.45, p)),
        )
        mouth.style.opacity = String(cur.m)
        mouth.style.transform = `translate(-50%,-50%) scale(${0.2 + cur.m * 0.95})`
        iris.style.transform = `translate(-50%,-50%) scale(${cur.ir * (mobile ? 6.5 : 5.2)})`
        iris.style.opacity = cur.ir > 0.01 ? '1' : '0'

        shead.style.opacity = String(
          clamp(p / 0.03, 0, 1) * (1 - sstep(0.16, 0.26, p)),
        )
        shead.style.transform = `translateY(${-sstep(0.16, 0.26, p) * 36}px)`

        const vis = sstep(0.39, DIVE_FULL, p)
        inside.style.opacity = String(vis)
        inside.style.pointerEvents = 'none'
        const fall = sstep(DIVE_FULL, FALL_END, p)
        cur.fall += (fall - cur.fall) * (REDUCED ? 1 : 0.1)
        const ty = -cur.fall * (FH - vh)
        fallworld.style.transform = `translateY(${ty}px)`
        speckl.style.transform = `translateY(${ty * 0.55}px)`
        insidehead.classList.toggle('show', p > DIVE_FULL - 0.01 && p < 0.56)

        rafId = requestAnimationFrame(render)
      }

      function update(p: number) {
        stations.forEach((s, i) => {
          s.classList.toggle('on', p >= STA_P[i])
        })
        const land = p >= LAND_P - 0.015
        landing.classList.toggle('show', land)
        stamp.classList.toggle('show', land)
      }

      const onScroll = () => {
        targetP = progress()
        update(targetP)
      }
      const onResize = () => {
        fit()
        onScroll()
      }

      const initPouch = () => {
        fit()
        onScroll()
        rafId = requestAnimationFrame(render)
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        window.addEventListener('orientationchange', onResize)
      }

      if (pimg.complete) initPouch()
      else {
        pimg.addEventListener('load', initPouch)
        pimg.addEventListener('error', initPouch)
      }

      cleanups.push(() => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      })
    }

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [rootRef])
}
