'use client'

/**
 * BoxBitesStory — drop under your hero section:  <BoxBitesStory />
 *
 * Required files in /public:
 *   /boxbite.png  /oat.png  /chocolate.png  /hoodia.png  /box-bites-pouch.png
 *
 * All styles are embedded and scoped under .bb-story (keyframes prefixed bb-).
 * Don't put overflow-x:hidden on a wrapper around this component — it breaks
 * position:sticky. Keep it on html/body instead.
 *
 * Acts: 1) ingredient constellation camera  2) 3D nutrition table + falling
 * biscuit + crumbs  3) DIVE: camera rises ABOVE the pouch, the pouch lies back,
 * mouth opens, we plunge straight down — inside is a free-fall shaft with speed
 * lines rushing up the left/right edges and benefit words flying past — then a
 * clean fade back out to the pouch and the RM30 stamp.
 */

import { useEffect } from 'react'

const BITE = '/boxbite.png'
const OAT = '/oat.png'
const CHOC = '/chocolate.png'
const HOODIA = '/hoodia.png'
const POUCH = '/box-bites-pouch.png'
const BB_BG = '/background2.png'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.bb-story{
  --green:#74c157; --green-lt:#84d067; --green-dk:#579f3d;
  --forest:#0e2e16; --forest-2:#10421e;
  --cream:#f6f2e7; --white:#ffffff;
  font-family:"Manrope",system-ui,sans-serif;color:var(--forest);
  line-height:1.5;-webkit-font-smoothing:antialiased;
  --bb-page-bg:url('${BB_BG}');
  background:var(--bb-page-bg) center/cover no-repeat;
}
.bb-story *{box-sizing:border-box;margin:0;padding:0}
.bb-story img{max-width:none}

/* ================= ACT 1: constellation ================= */
.bb-story .experience{position:relative;height:840vh}
.bb-story .stage{position:sticky;top:0;height:100svh;width:100%;overflow:hidden;
  background:var(--bb-page-bg) center/cover no-repeat}
.bb-story .stage-inner{position:absolute;inset:0;animation:bb-enter 1.05s ease both}
@keyframes bb-enter{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}

.bb-story .world{position:absolute;top:0;left:0;width:1600px;height:1000px;transform-origin:0 0;will-change:transform}
.bb-story .links{position:absolute;inset:0;width:1600px;height:1000px;overflow:visible}
.bb-story .links path{fill:none;stroke:var(--white);stroke-width:2.6;opacity:.82;stroke-linecap:round;stroke-dasharray:9 11;animation:bb-flow 1.6s linear infinite}
@keyframes bb-flow{to{stroke-dashoffset:-40}}

.bb-story .node{position:absolute;transform:translate(-50%,-50%)}
.bb-story .floatwrap{animation:bb-floatidle 6s ease-in-out infinite alternate}
.bb-story .cut{display:block;width:100%;height:auto;transform-origin:center;filter:drop-shadow(0 22px 26px rgba(22,50,16,.4))}
.bb-story .cut.pop{animation:bb-pop .72s cubic-bezier(.2,.9,.3,1.2)}
@keyframes bb-pop{0%{transform:scale(.7)}45%{transform:scale(1.12)}68%{transform:scale(.95)}84%{transform:scale(1.04)}100%{transform:scale(1)}}
@keyframes bb-floatidle{from{transform:translateY(-7px)}to{transform:translateY(7px)}}

.bb-story .tag-prod{position:absolute;left:50%;bottom:-30px;transform:translateX(-50%);font-family:"Anton",sans-serif;letter-spacing:.18em;text-transform:uppercase;font-size:24px;color:var(--white);white-space:nowrap;text-shadow:0 3px 14px rgba(22,50,16,.5)}
.bb-story .badge{position:absolute;left:50%;bottom:-26px;transform:translateX(-50%);font-family:"Anton",sans-serif;letter-spacing:.16em;text-transform:uppercase;font-size:16px;color:var(--white);white-space:nowrap;text-shadow:0 2px 10px rgba(22,50,16,.5)}

.bb-story .intro{position:absolute;z-index:7;top:0;left:0;right:0;padding:clamp(26px,6vh,60px) 24px 96px;text-align:center;pointer-events:none;will-change:opacity,transform;
  background:linear-gradient(to bottom, rgba(74,140,48,.94) 0%, rgba(116,193,87,.55) 52%, rgba(116,193,87,0) 100%)}
.bb-story .intro .script{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(26px,4.4vw,44px);color:var(--white);line-height:.88;margin-bottom:10px;opacity:.96}
.bb-story .intro .pill{display:inline-block;font-family:"Anton",sans-serif;letter-spacing:.2em;text-transform:uppercase;font-size:12px;color:var(--white);background:var(--forest-2);padding:8px 15px;border-radius:999px;margin-bottom:14px}
.bb-story .intro h1{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(32px,6.2vw,66px);line-height:.96;color:var(--white);text-shadow:0 4px 24px rgba(20,45,18,.4)}
.bb-story .intro p{max-width:48ch;margin:16px auto 0;font-size:clamp(14px,1.7vw,17px);color:rgba(255,255,255,.94)}

.bb-story .cap{position:absolute;z-index:7;width:min(390px,84vw);opacity:0;pointer-events:none;transition:opacity .45s ease;will-change:opacity,transform}
.bb-story .cap .kicker{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--forest-2);margin-bottom:12px;display:inline-flex;align-items:center;gap:10px}
.bb-story .cap .kicker::before{content:"";width:26px;height:2px;background:var(--forest-2)}
.bb-story .cap h2{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(30px,4.8vw,50px);line-height:1.0;color:var(--white);margin-bottom:16px;text-shadow:0 3px 20px rgba(22,50,16,.34);opacity:0;transform:translateY(10px);transition:opacity .5s ease .12s, transform .5s ease .12s}
.bb-story .cap.show h2{opacity:1;transform:none}
.bb-story .cap .type{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:clamp(14px,1.6vw,16px);line-height:1.65;color:var(--forest);max-width:36ch;min-height:5.2em;font-weight:500}
.bb-story .cap .type .cur{display:inline-block;width:.6ch;background:var(--forest-2);color:transparent;animation:bb-blink .9s steps(1) infinite;margin-left:1px}
@keyframes bb-blink{50%{opacity:0}}
.bb-story .cap.show{opacity:1}
.bb-story .cap.left{left:clamp(28px,6vw,84px);top:50%;transform:translateY(-50%);text-align:left}
.bb-story .cap.right{right:clamp(28px,6vw,84px);top:50%;transform:translateY(-50%);text-align:right}
.bb-story .cap.right .kicker{flex-direction:row-reverse}
.bb-story .cap.right .type{margin-left:auto}
.bb-story .cap.center{left:50%;bottom:clamp(48px,10vh,104px);transform:translateX(-50%);text-align:center}
.bb-story .cap.center .kicker{justify-content:center}
.bb-story .cap.center .type{margin-left:auto;margin-right:auto}

.bb-story .rail{position:absolute;z-index:8;left:clamp(18px,3vw,34px);top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:14px}
.bb-story .rail .seg{width:2px;height:34px;background:rgba(16,40,20,.3);border-radius:2px;overflow:hidden;position:relative}
.bb-story .rail .seg i{position:absolute;inset:0;background:var(--white);transform:scaleY(0);transform-origin:top;transition:transform .35s ease;border-radius:2px}
.bb-story .rail .seg.on i{transform:scaleY(1)}
.bb-story .keepscroll{position:absolute;z-index:8;bottom:clamp(18px,4vh,34px);right:clamp(20px,5vw,46px);font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(16,40,20,.74);opacity:0;transition:opacity .5s ease}

/* ================= ACT 2: 3D nutrition table ================= */
.bb-story .tablezone{position:relative;height:720vh}
.bb-story .tstage{position:sticky;top:0;height:100svh;width:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;
  background:var(--bb-page-bg) center/cover no-repeat}
.bb-story .thead-overlay{position:absolute;z-index:8;top:clamp(22px,5vh,52px);left:0;right:0;text-align:center;pointer-events:none;will-change:opacity,transform}
.bb-story .thead-overlay .kicker{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--forest-2)}
.bb-story .thead-overlay h2{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(30px,5.4vw,54px);color:var(--white);line-height:1;text-shadow:0 3px 20px rgba(22,50,16,.34);margin-top:8px}
.bb-story .persp{perspective:1300px;perspective-origin:50% 38%;width:min(620px,92vw)}
.bb-story .card3d{position:relative;transform-style:preserve-3d;will-change:transform;background:var(--white);border-radius:22px;padding:10px 0 4px;
  box-shadow:0 60px 110px rgba(20,46,16,.45), 0 18px 40px rgba(20,46,16,.3)}
.bb-story .card3d .chead{display:flex;justify-content:space-between;align-items:baseline;padding:16px 26px 14px;border-bottom:3px solid var(--forest-2)}
.bb-story .card3d .chead .t{font-weight:800;font-size:clamp(18px,2.6vw,24px);color:var(--forest-2)}
.bb-story .card3d .chead .u{font-weight:800;font-size:clamp(13px,1.8vw,16px);color:var(--forest-2)}
.bb-story .row{display:flex;justify-content:space-between;align-items:center;padding:clamp(13px,2.1vh,19px) 26px;border-bottom:1.5px solid rgba(16,66,30,.18);transition:background .35s ease}
.bb-story .row:last-child{border-bottom:none;border-radius:0 0 22px 22px}
.bb-story .row .lab{font-weight:600;font-size:clamp(15px,2vw,19px);color:var(--forest-2)}
.bb-story .row .val{font-weight:700;font-size:clamp(15px,2vw,19px);color:var(--forest-2);font-variant-numeric:tabular-nums}
.bb-story .row.on{background:rgba(116,193,87,.18)}
.bb-story .row.on .lab{font-weight:800}
.bb-story .row.done .val{color:var(--forest)}
.bb-story .faller{position:absolute;left:50%;top:0;width:clamp(56px,9vw,74px);z-index:4;pointer-events:none;will-change:transform,opacity;filter:drop-shadow(0 14px 14px rgba(20,46,16,.38))}
.bb-story .fshadow{position:absolute;left:50%;width:clamp(48px,8vw,64px);height:12px;border-radius:50%;background:rgba(16,50,18,.3);z-index:3;pointer-events:none;will-change:transform,opacity;filter:blur(3px)}
.bb-story .card3d.jolt{animation:bb-jolt .42s cubic-bezier(.3,.7,.3,1)}
@keyframes bb-jolt{0%{margin-top:0}30%{margin-top:7px}65%{margin-top:-3px}100%{margin-top:0}}
.bb-story .crumb{position:absolute;z-index:5;pointer-events:none;border-radius:46% 54% 58% 42%/50% 44% 56% 50%;will-change:transform,opacity;box-shadow:0 1px 2px rgba(20,46,16,.3)}

/* ================= ACT 3: dive into the pouch ================= */
.bb-story .smartzone{position:relative;height:920vh}
.bb-story .sstage{position:sticky;top:0;height:100svh;width:100%;overflow:hidden;
  background:var(--bb-page-bg) center/cover no-repeat}

.bb-story .shead{position:absolute;z-index:8;top:clamp(20px,4.5vh,48px);left:0;right:0;text-align:center;pointer-events:none;will-change:opacity}
.bb-story .shead .kicker{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--forest-2)}
.bb-story .shead h2{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(26px,4.6vw,48px);color:var(--white);line-height:1.04;text-shadow:0 3px 20px rgba(22,50,16,.34);margin-top:8px}
.bb-story .shead .script{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(20px,3vw,30px);color:var(--forest-2);margin-top:6px}

/* camera sits ABOVE the pouch: perspective-origin is pushed to the very top so
   when the pouch lies back (negative rotateX) we look DOWN into the opening */
.bb-story .divewrap{position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;
  perspective:1150px;perspective-origin:50% 6%;will-change:opacity}
.bb-story .pouch3d{position:relative;transform-style:preserve-3d;transform-origin:50% 9%;will-change:transform}
.bb-story .pouch3d>img{display:block;height:min(58vh,560px);width:auto;filter:drop-shadow(0 30px 34px rgba(20,46,16,.42))}
.bb-story .mouth{position:absolute;left:50%;top:6%;width:74%;aspect-ratio:2.5/1;transform:translate(-50%,-50%) scale(.6);
  border-radius:50%;opacity:0;will-change:opacity,transform;
  background:radial-gradient(62% 105% at 50% 40%, #3d2715 0%, #221307 55%, #100902 100%);
  box-shadow:inset 0 8px 16px rgba(0,0,0,.6), 0 0 0 4px rgba(255,255,255,.2), 0 -4px 12px rgba(255,255,255,.16)}

.bb-story .inside{position:absolute;inset:0;z-index:5;opacity:0;pointer-events:none;will-change:opacity,transform;
  background:radial-gradient(95% 85% at 50% 44%, #36220f 0%, #251407 48%, #110a04 100%)}
.bb-story .inside::before{content:"";position:absolute;inset:0;background:radial-gradient(46% 38% at 50% 42%, rgba(245,197,24,.10), transparent 70%)}
.bb-story .inside::after{content:"";position:absolute;inset:0;background:radial-gradient(80% 70% at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)}
.bb-story .tunnel{position:absolute;inset:0;overflow:hidden}
.bb-story .star{position:absolute;left:0;top:0;border-radius:50%;will-change:transform,opacity;
  background:radial-gradient(circle at 38% 32%, #fff7df 0%, #f5c518 55%, rgba(245,197,24,0) 100%)}
.bb-story .star.warm{background:radial-gradient(circle at 38% 32%, #ffe9c9 0%, #c9a25e 55%, rgba(201,162,94,0) 100%)}
.bb-story .streak{position:absolute;left:0;top:0;border-radius:3px;will-change:transform,opacity;
  background:linear-gradient(to bottom, rgba(255,243,210,0) 0%, rgba(255,243,210,.85) 45%, rgba(255,243,210,.85) 55%, rgba(255,243,210,0) 100%)}

.bb-story .insidehead{position:absolute;z-index:7;top:clamp(18px,4vh,42px);left:0;right:0;text-align:center;opacity:0;will-change:opacity;pointer-events:none}
.bb-story .insidehead .kicker{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#f5c518}
.bb-story .insidehead .script{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(20px,3vw,30px);color:var(--cream);margin-top:4px}

/* free-fall benefit words flying past while you drop */
.bb-story .drop{position:absolute;z-index:8;left:50%;top:50%;transform:translate(-50%,-50%);width:min(680px,90vw);text-align:center;
  opacity:0;pointer-events:none;transition:opacity .4s ease;will-change:opacity}
.bb-story .drop.show{opacity:1}
.bb-story .drop .idx{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.24em;color:#f5c518;margin-bottom:10px}
.bb-story .drop .t{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(34px,7vw,72px);line-height:1.04;color:var(--white);
  text-shadow:0 5px 30px rgba(0,0,0,.55);transform:translateY(26px);transition:transform .45s cubic-bezier(.2,.9,.3,1.15)}
.bb-story .drop.show .t{transform:none}
.bb-story .drop .t.small{font-size:clamp(24px,4.4vw,46px);color:var(--cream)}
.bb-story .drop .sub{margin-top:12px;font-family:"Caveat",cursive;font-weight:700;font-size:clamp(18px,2.8vw,28px);color:#f5c518;
  opacity:0;transition:opacity .45s ease .15s}
.bb-story .drop.show .sub{opacity:1}

/* exit: gentle fade back out — pouch returns front-on, centered */
.bb-story .exitwrap{position:absolute;inset:0;z-index:6;opacity:0;pointer-events:none;display:flex;align-items:center;justify-content:center;will-change:opacity}
.bb-story .pouchmini{will-change:transform}
.bb-story .pouchmini img{display:block;height:min(48vh,440px);width:auto;filter:drop-shadow(0 26px 30px rgba(20,46,16,.42))}
.bb-story .pouchmini img.pulse{animation:bb-ppulse .6s cubic-bezier(.2,.9,.3,1.2)}
@keyframes bb-ppulse{0%{transform:scale(1)}40%{transform:scale(1.05)}70%{transform:scale(.985)}100%{transform:scale(1)}}

.bb-story .stamp{position:absolute;z-index:8;left:calc(50% + clamp(80px,12vw,170px));top:21%;width:168px;height:168px;border-radius:50%;
  background:var(--forest-2);color:var(--white);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  box-shadow:0 24px 50px rgba(16,40,18,.45), inset 0 0 0 5px rgba(255,255,255,.25), inset 0 0 0 7px var(--forest-2), inset 0 0 0 9px rgba(255,255,255,.18);
  transform:rotate(-9deg) scale(0);opacity:0;will-change:transform,opacity}
.bb-story .stamp.show{animation:bb-stampin .55s cubic-bezier(.2,.9,.3,1.3) both}
@keyframes bb-stampin{0%{transform:rotate(14deg) scale(0);opacity:0}60%{transform:rotate(-12deg) scale(1.12);opacity:1}100%{transform:rotate(-9deg) scale(1);opacity:1}}
.bb-story .stamp .s1{font-family:"Anton",sans-serif;font-size:14px;letter-spacing:.2em}
.bb-story .stamp .s2{font-family:"Anton",sans-serif;font-size:46px;line-height:1;margin:3px 0}
.bb-story .stamp .s3{font-family:"Caveat",cursive;font-weight:700;font-size:20px;color:#f5c518}

.bb-story .benefits{position:absolute;z-index:8;left:0;right:0;bottom:clamp(16px,4vh,40px);text-align:center;pointer-events:none}
.bb-story .benefits .powered{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(18px,2.6vw,26px);color:var(--white);text-shadow:0 2px 12px rgba(22,50,16,.4);
  opacity:0;transform:translateY(12px);transition:opacity .5s ease,transform .5s ease}
.bb-story .benefits .rowc{margin-top:10px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;padding:0 16px}
.bb-story .bchip{font-family:"Anton",sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--white);
  border:1.5px solid rgba(255,255,255,.7);border-radius:999px;padding:8px 14px;background:rgba(16,66,30,.25);
  opacity:0;transform:translateY(14px);transition:opacity .45s ease,transform .5s cubic-bezier(.2,.9,.3,1.2)}
.bb-story .benefits.show .powered{opacity:1;transform:none}
.bb-story .benefits.show .bchip{opacity:1;transform:none}
.bb-story .benefits.show .bchip:nth-child(1){transition-delay:.05s}
.bb-story .benefits.show .bchip:nth-child(2){transition-delay:.15s}
.bb-story .benefits.show .bchip:nth-child(3){transition-delay:.25s}
.bb-story .benefits.show .bchip:nth-child(4){transition-delay:.35s}

/* ================= footer ================= */
.bb-story .outro{position:relative;min-height:88svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:70px 24px;
  background:var(--bb-page-bg) center/cover no-repeat}
.bb-story .outro .script{font-family:"Caveat",cursive;font-size:clamp(46px,9vw,96px);color:var(--white);line-height:.9;text-shadow:0 4px 26px rgba(22,50,16,.32)}
.bb-story .outro .script .w{color:var(--forest-2);display:block}
.bb-story .outro .made{margin-top:26px;max-width:46ch;font-size:14px;color:rgba(255,255,255,.94)}
.bb-story .outro .foot{margin-top:22px;font-size:12.5px;color:rgba(16,40,20,.78);line-height:1.7}
.bb-story .outro .price{margin-top:12px;display:inline-flex;gap:18px;flex-wrap:wrap;justify-content:center;font-size:13px;color:rgba(16,40,20,.9)}
.bb-story .outro .price b{color:var(--white);font-weight:800}
.bb-story .outro .badges{margin-top:22px;font-family:"Anton",sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(16,40,20,.7)}

@media (max-width:760px){
  .bb-story .cap{width:auto;left:18px!important;right:18px!important;text-align:left!important;top:auto!important;bottom:max(30px,9vh);transform:none!important}
  .bb-story .cap.right .kicker{flex-direction:row}
  .bb-story .cap.right .type{margin-left:0}
  .bb-story .cap .type{min-height:6.5em}
  .bb-story .rail{display:none}
  .bb-story .persp{perspective:1000px}
  .bb-story .pouch3d>img{height:min(46vh,420px)}
  .bb-story .drop .t{font-size:clamp(30px,9vw,46px)}
  .bb-story .stamp{width:120px;height:120px;left:auto;right:12px;top:14%}
  .bb-story .stamp .s2{font-size:32px}
  .bb-story .stamp .s1{font-size:11px}
  .bb-story .stamp .s3{font-size:15px}
  .bb-story .shead .script{display:none}
  .bb-story .benefits .powered{font-size:15px;padding:0 18px}
  .bb-story .bchip{font-size:9.5px;padding:6px 10px}
}
@media (prefers-reduced-motion:reduce){
  .bb-story .floatwrap,.bb-story .links path,.bb-story .stage-inner{animation:none}
  .bb-story .card3d.jolt{animation:none}
}
`

export default function BoxBitesHello() {
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)
    const smooth = (t: number) => t * t * (3 - 2 * t)
    const lerpKeys = (keys: any[], p: number, fields: string[]) => {
      let a = keys[0]
      let b = keys[keys.length - 1]
      for (let i = 0; i < keys.length - 1; i++) {
        if (p >= keys[i].p && p <= keys[i + 1].p) { a = keys[i]; b = keys[i + 1]; break }
      }
      if (p <= keys[0].p) { a = keys[0]; b = keys[0] }
      const span = b.p - a.p || 1
      const t = smooth(clamp((p - a.p) / span, 0, 1))
      const out: Record<string, number> = {}
      fields.forEach((f) => { out[f] = a[f] + (b[f] - a[f]) * t })
      return out
    }
    const cleanup: Array<() => void> = []
    const $ = (id: string) => document.getElementById(id)

    /* ================= ACT 1: constellation ================= */
    ;(() => {
      const exp = $('bb-exp'); if (!exp) return
      const stage = exp.querySelector('.stage') as HTMLElement
      const world = $('bb-world') as HTMLElement
      const intro = $('bb-intro') as HTMLElement
      const caps = Array.from(exp.querySelectorAll('.cap')) as HTMLElement[]
      const segs = Array.from(exp.querySelectorAll('.rail .seg')) as HTMLElement[]
      const keep = $('bb-keepscroll') as HTMLElement
      if (!stage || !world) return

      const NW = 1600, NH = 1000
      const imgs = ['bb-nodeProduct', 'bb-nodeOat', 'bb-nodeChoc', 'bb-nodeHoodia']
        .map((id) => $(id)?.querySelector('.cut'))
        .filter(Boolean) as HTMLElement[]
      const DESC = [
        'Hearty rolled oats, rich dark chocolate, and a touch of Hoodia — pressed into a single bite built to keep you powered, anywhere.',
        'Whole rolled oats release their energy slowly, so you stay powered through the afternoon without the sugar spike-and-crash.',
        'Rich dark chocolate makes every bite feel like a treat — the flavour you crave, minus the sugar guilt.',
        'A touch of Hoodia quietens the cravings between meals, so one small bite is genuinely enough.',
      ]
      const KEYS = [
        { p: 0.0, fx: 0.5, fy: 0.5, s: 1.0, ox: 0, oy: 0 },
        { p: 0.12, fx: 0.5, fy: 0.5, s: 1.0, ox: 0, oy: 0 },
        { p: 0.27, fx: 0.5, fy: 0.5, s: 1.95, ox: 0, oy: -0.07 },
        { p: 0.46, fx: 0.772, fy: 0.3, s: 2.55, ox: 0.17, oy: 0.03 },
        { p: 0.65, fx: 0.225, fy: 0.51, s: 2.55, ox: -0.17, oy: 0 },
        { p: 0.84, fx: 0.772, fy: 0.715, s: 2.55, ox: 0.17, oy: -0.02 },
        { p: 1.0, fx: 0.5, fy: 0.5, s: 1.0, ox: 0, oy: 0 },
      ]
      const BEAT = [[0.21, 0.35], [0.4, 0.54], [0.59, 0.73], [0.78, 0.92]]

      let vw = 0, vh = 0, kFit = 1, mobile = false, targetP = 0, active = -2, raf = 0
      const cur = { fx: 0.5, fy: 0.5, s: 1, ox: 0, oy: 0 }
      const fit = () => { vw = stage.clientWidth; vh = stage.clientHeight; mobile = vw < 760; kFit = Math.min(vw / NW, vh / NH) }
      const prog = () => { const r = exp.getBoundingClientRect(); const d = exp.offsetHeight - vh; return d <= 0 ? 0 : clamp(-r.top / d, 0, 1) }
      const beatFor = (p: number) => { for (let i = 0; i < BEAT.length; i++) if (p >= BEAT[i][0] && p <= BEAT[i][1]) return i; return -1 }

      const typeOut = (el: HTMLElement, text: string) => {
        if (reduced) { el.textContent = text; return }
        let i = 0
        el.innerHTML = '<span class="cur">.</span>'
        const timer = window.setInterval(() => {
          i++
          if (i >= text.length) { el.textContent = text; window.clearInterval(timer); return }
          el.innerHTML = `${text.slice(0, i)}<span class="cur">.</span>`
        }, 20)
        cleanup.push(() => window.clearInterval(timer))
      }
      const setBeat = (i: number) => {
        if (i === active) return
        active = i
        caps.forEach((c, idx) => c.classList.toggle('show', idx === i))
        segs.forEach((s, idx) => s.classList.toggle('on', idx <= i && i >= 0))
        if (i >= 0) {
          const im = imgs[i]
          if (im && !reduced) { im.classList.remove('pop'); void im.offsetWidth; im.classList.add('pop') }
          const t = caps[i]?.querySelector('.type') as HTMLElement
          if (t) typeOut(t, DESC[i])
        }
      }
      const render = () => {
        const tgt = lerpKeys(KEYS, targetP, ['fx', 'fy', 's', 'ox', 'oy'])
        const k = reduced ? 1 : 0.085
        cur.fx += (tgt.fx - cur.fx) * k; cur.fy += (tgt.fy - cur.fy) * k; cur.s += (tgt.s - cur.s) * k
        cur.ox += (tgt.ox - cur.ox) * k; cur.oy += (tgt.oy - cur.oy) * k
        const S = kFit * cur.s, ox = mobile ? 0 : cur.ox, oy = mobile ? 0 : cur.oy
        world.style.transform = `translate(${vw / 2 + ox * vw - cur.fx * NW * S}px, ${vh / 2 + oy * vh - cur.fy * NH * S}px) scale(${S})`
        if (intro) { intro.style.opacity = `${clamp(1 - targetP / 0.13, 0, 1)}`; intro.style.transform = `translateY(${-targetP * 44}px)` }
        if (keep) keep.style.opacity = targetP > 0.03 && targetP < 0.93 ? '0.9' : '0'
        raf = requestAnimationFrame(render)
      }
      const onScroll = () => { targetP = prog(); setBeat(beatFor(targetP)) }
      const onResize = () => { fit(); onScroll() }
      fit(); onScroll(); render()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)
      cleanup.push(() => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      })
    })()

    /* ================= ACT 2: nutrition table + falling biscuit + crumbs ================= */
    ;(() => {
      const tz = $('bb-tz'); if (!tz) return
      const tstage = tz.querySelector('.tstage') as HTMLElement
      const card = $('bb-card3d') as HTMLElement
      const faller = $('bb-faller') as HTMLImageElement
      const fshadow = $('bb-fshadow') as HTMLElement
      const overlay = $('bb-theadOverlay') as HTMLElement
      const rows = Array.from(card?.querySelectorAll('.row') ?? []) as HTMLElement[]
      if (!tstage || !card || !faller) return

      const FALL = [
        { p: 0.0, idx: -1.6 }, { p: 0.1, idx: -1.6 },
        { p: 0.18, idx: 0 }, { p: 0.26, idx: 0 },
        { p: 0.32, idx: 1 }, { p: 0.4, idx: 1 },
        { p: 0.46, idx: 2 }, { p: 0.54, idx: 2 },
        { p: 0.6, idx: 3 }, { p: 0.68, idx: 3 },
        { p: 0.74, idx: 4 }, { p: 0.82, idx: 4 },
        { p: 0.88, idx: 5 }, { p: 1.0, idx: 5 },
      ]
      const CAM = [
        { p: 0.0, rx: 52, s: 0.8 }, { p: 0.1, rx: 26, s: 1.06 },
        { p: 0.22, rx: 15, s: 1.3 }, { p: 0.86, rx: 10, s: 1.34 }, { p: 1.0, rx: 7, s: 1.16 },
      ]
      const DROPS = [0.18, 0.32, 0.46, 0.6, 0.74, 0.88]

      let vw = 0, vh = 0, mobile = false, rowY: number[] = [], cardH = 1, targetP = 0, landed = -1, raf = 0
      const cur = { idx: -1.6, rx: 52, s: 0.8 }
      const measure = () => {
        vw = tstage.clientWidth; vh = tstage.clientHeight; mobile = vw < 760
        cardH = card.offsetHeight
        rowY = rows.map((r) => r.offsetTop + r.offsetHeight / 2)
      }
      const prog = () => { const r = tz.getBoundingClientRect(); const d = tz.offsetHeight - vh; return d <= 0 ? 0 : clamp(-r.top / d, 0, 1) }
      const idxToY = (idx: number) => {
        if (idx <= 0) {
          const top = -cardH * 0.34, y0 = rowY[0] || 0
          return top + (y0 - top) * clamp((idx + 1.6) / 1.6, 0, 1)
        }
        const i = Math.floor(idx), f = idx - i
        const a = rowY[Math.min(i, 5)] || 0, b = rowY[Math.min(i + 1, 5)] ?? a
        return a + (b - a) * f
      }
      const countUp = (row: HTMLElement) => {
        const to = Number(row.dataset.to), dec = Number(row.dataset.dec), unit = row.dataset.unit || ''
        const val = row.querySelector('.val') as HTMLElement
        if (!val) return
        if (reduced) { val.textContent = `${to.toFixed(dec)}${unit}`; return }
        let t0: number | null = null
        const dur = 900
        const step = (ts: number) => {
          if (!t0) t0 = ts
          const p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3)
          val.textContent = `${(to * e).toFixed(dec)}${unit}`
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }

      /* crumb particles */
      type Crumb = { el: HTMLElement; x: number; y: number; vx: number; vy: number; rot: number; vr: number; life: number }
      let crumbs: Crumb[] = []
      let crumbRaf: number | null = null
      const COLORS = ['#5a3a22', '#7a4a26', '#3a2417', '#c9a25e', '#e7d4a6', '#8a5a2e']
      const stepCrumbs = () => {
        crumbRaf = null
        for (let i = crumbs.length - 1; i >= 0; i--) {
          const c = crumbs[i]
          c.vy += 0.32; c.x += c.vx; c.y += c.vy; c.rot += c.vr; c.life -= 0.022
          if (c.life <= 0) { c.el.remove(); crumbs.splice(i, 1); continue }
          c.el.style.transform = `translate(-50%,-50%) translateZ(48px) translate(${c.x}px,${c.y}px) rotate(${c.rot}deg)`
          c.el.style.opacity = `${Math.min(1, c.life * 1.6)}`
        }
        if (crumbs.length) crumbRaf = requestAnimationFrame(stepCrumbs)
      }
      const burst = (x: number, y: number) => {
        if (reduced) return
        const n = 10 + Math.floor(Math.random() * 5)
        for (let i = 0; i < n; i++) {
          const el = document.createElement('span')
          el.className = 'crumb'
          const sz = 3 + Math.random() * 5.5
          el.style.width = `${sz}px`
          el.style.height = `${sz * (0.7 + Math.random() * 0.5)}px`
          el.style.background = COLORS[(Math.random() * COLORS.length) | 0]
          el.style.left = '0px'; el.style.top = '0px'
          card.appendChild(el)
          const ang = Math.PI * (1.05 + Math.random() * 0.9)
          const sp = 2.2 + Math.random() * 3.4
          crumbs.push({ el, x: x + (Math.random() * 30 - 15), y: y + 8,
            vx: Math.cos(ang) * sp, vy: -Math.abs(Math.sin(ang)) * sp * 1.25 - 1.2,
            rot: Math.random() * 360, vr: Math.random() * 14 - 7, life: 1 })
        }
        if (!crumbRaf) crumbRaf = requestAnimationFrame(stepCrumbs)
      }
      cleanup.push(() => { if (crumbRaf) cancelAnimationFrame(crumbRaf); crumbs.forEach((c) => c.el.remove()); crumbs = [] })

      const setLanded = (n: number) => {
        if (n === landed) return
        const prev = landed
        landed = n
        rows.forEach((r, i) => { r.classList.toggle('on', i === n); r.classList.toggle('done', i <= n && n >= 0) })
        if (n > prev) for (let i = Math.max(prev + 1, 0); i <= n; i++) countUp(rows[i])
        if (n >= 0 && n > prev && !reduced) {
          card.classList.remove('jolt'); void card.offsetWidth; card.classList.add('jolt')
          burst(card.offsetWidth / 2, rowY[n])
        }
      }
      const landedFor = (p: number) => { let n = -1; for (let i = 0; i < DROPS.length; i++) if (p >= DROPS[i] - 0.005) n = i; return n }

      const render = () => {
        const f = lerpKeys(FALL, targetP, ['idx'])
        const c = lerpKeys(CAM, targetP, ['rx', 's'])
        const k = reduced ? 1 : 0.1
        cur.idx += (f.idx - cur.idx) * k; cur.rx += (c.rx - cur.rx) * k; cur.s += (c.s - cur.s) * k
        const s = mobile ? Math.min(cur.s, 1.04) : cur.s
        const rx = mobile ? cur.rx * 0.8 : cur.rx
        const follow = clamp(idxToY(Math.max(cur.idx, 0)) - (rowY[0] || 0), 0, cardH) * 0.62 * (s > 1.1 ? 1 : 0.4)
        card.style.transform = `translateY(${-follow}px) rotateX(${rx}deg) scale(${s})`
        const y = idxToY(cur.idx)
        const falling = Math.abs(f.idx - cur.idx)
        const squash = clamp(1 - falling * 0.16, 0.86, 1)
        faller.style.top = `${y}px`
        faller.style.opacity = `${clamp((targetP - 0.06) / 0.05, 0, 1)}`
        faller.style.transform = `translate(-50%,-50%) translateZ(46px) rotate(${Math.sin(cur.idx * 2.2) * 6}deg) scale(${2 - squash},${squash})`
        if (fshadow) {
          const h = clamp(falling, 0, 1)
          fshadow.style.top = `${y + (mobile ? 26 : 34)}px`
          fshadow.style.transform = `translateX(-50%) scale(${1 + h * 0.7})`
          fshadow.style.opacity = `${clamp((targetP - 0.08) / 0.05, 0, 1) * (0.85 - h * 0.45)}`
        }
        if (overlay) {
          const o = clamp((targetP - 0.55) / 0.12, 0, 1)
          overlay.style.opacity = `${1 - o}`
          overlay.style.transform = `translateY(${-o * 30}px)`
        }
        raf = requestAnimationFrame(render)
      }
      const onScroll = () => { targetP = prog(); setLanded(landedFor(targetP)) }
      const onResize = () => { measure(); onScroll() }
      measure(); onScroll(); render()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)
      cleanup.push(() => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      })
    })()

    /* ================= ACT 3: dive into the pouch ================= */
    ;(() => {
      const sz = $('bb-sz'); if (!sz) return
      const sstage = sz.querySelector('.sstage') as HTMLElement
      const shead = $('bb-shead') as HTMLElement
      const divewrap = $('bb-divewrap') as HTMLElement
      const pouch3d = $('bb-pouch3d') as HTMLElement
      const mouth = $('bb-mouth') as HTMLElement
      const inside = $('bb-inside') as HTMLElement
      const tunnel = $('bb-tunnel') as HTMLElement
      const insidehead = $('bb-insidehead') as HTMLElement
      const drops = [1, 2, 3, 4, 5, 6, 7].map((i) => $(`bb-drop${i}`)).filter(Boolean) as HTMLElement[]
      const exitwrap = $('bb-exitwrap') as HTMLElement
      const pouchMini = exitwrap?.querySelector('.pouchmini') as HTMLElement
      const pouchMiniImg = pouchMini?.querySelector('img') as HTMLImageElement
      const stamp = $('bb-stamp') as HTMLElement
      const benefits = $('bb-benefits') as HTMLElement
      if (!sstage || !divewrap || !pouch3d || !inside || !tunnel) return

      /* dive camera: the perspective-origin sits at the very TOP of the stage,
         so the eye is ABOVE the pouch. Negative rotateX lays the pouch onto its
         back (body recedes away/down) and we look DOWN into the opening, then
         plunge through it. */
      const DIVE = [
        { p: 0.0, rx: 0, s: 1.0, ty: 0 },
        { p: 0.1, rx: -10, s: 1.06, ty: 10 },
        { p: 0.2, rx: -52, s: 2.2, ty: 56 },
        { p: 0.3, rx: -76, s: 4.8, ty: 130 },
      ]
      const MOUTH_O = [{ p: 0.1, o: 0 }, { p: 0.17, o: 1 }]
      const MOUTH_S = [{ p: 0.1, m: 0.55 }, { p: 0.3, m: 2.3 }]
      /* seven free-fall text beats inside the shaft */
      const FEATW = Array.from({ length: 7 }, (_, i) => {
        const s = 0.335 + i * 0.069
        return [s, s + 0.057] as [number, number]
      })
      const STAMP_P = 0.9, BENE_P = 0.93

      /* free-fall shaft particles: vertical speed-lines hugging the LEFT and
         RIGHT edges (rushing up past you as you drop), plus a few faint motes
         in the middle for depth. No product images repeat here. */
      type Star = { el: HTMLElement; fx: number; fy: number; depth: number; tw: number; ph: number; streak: boolean }
      const stars: Star[] = []
      const N_LINES = reduced ? 10 : 34
      const N_DOTS = reduced ? 4 : 14
      for (let i = 0; i < N_LINES + N_DOTS; i++) {
        const streak = i < N_LINES
        const el = document.createElement('div')
        const depth = 0.4 + Math.random() * 0.6
        let fx: number
        if (streak) {
          el.className = 'streak'
          el.style.height = `${90 + Math.random() * 170}px`
          el.style.width = `${1.5 + depth * 2.2}px`
          /* hug the sides: 0–22% or 78–100% of the width */
          fx = Math.random() < 0.5 ? Math.random() * 0.22 : 0.78 + Math.random() * 0.22
        } else {
          el.className = Math.random() < 0.5 ? 'star warm' : 'star'
          const szp = (1.4 + Math.random() * 3) * depth
          el.style.width = `${szp}px`
          el.style.height = `${szp}px`
          fx = 0.25 + Math.random() * 0.5
        }
        el.style.opacity = '0'
        tunnel.appendChild(el)
        stars.push({ el, fx, fy: Math.random(), depth, tw: 2 + Math.random() * 4, ph: Math.random() * Math.PI * 2, streak })
      }
      cleanup.push(() => { stars.forEach((s) => s.el.remove()) })

      let vw = 0, vh = 0, targetP = 0, raf = 0, activeDrop = -1, exited = false
      const cur = { rx: 0, s: 1, ty: 0, mo: 0, ms: 0.55 }
      const fit = () => { vw = sstage.clientWidth; vh = sstage.clientHeight }
      const prog = () => { const r = sz.getBoundingClientRect(); const d = sz.offsetHeight - vh; return d <= 0 ? 0 : clamp(-r.top / d, 0, 1) }
      const dropFor = (p: number) => { for (let i = 0; i < FEATW.length; i++) if (p >= FEATW[i][0] && p <= FEATW[i][1]) return i; return -1 }

      const update = (p: number) => {
        const f = dropFor(p)
        if (f !== activeDrop) {
          activeDrop = f
          drops.forEach((el, i) => el.classList.toggle('show', i === f))
        }
        stamp?.classList.toggle('show', p >= STAMP_P)
        benefits?.classList.toggle('show', p >= BENE_P)
        if (p >= 0.86 && !exited) {
          exited = true
          if (pouchMiniImg && !reduced) { pouchMiniImg.classList.remove('pulse'); void pouchMiniImg.offsetWidth; pouchMiniImg.classList.add('pulse') }
        }
        if (p < 0.84) exited = false
      }

      const render = () => {
        const p = targetP
        const k = reduced ? 1 : 0.09
        const d = lerpKeys(DIVE, p, ['rx', 's', 'ty'])
        const mo = lerpKeys(MOUTH_O, p, ['o'])
        const ms = lerpKeys(MOUTH_S, p, ['m'])
        cur.rx += (d.rx - cur.rx) * k; cur.s += (d.s - cur.s) * k; cur.ty += (d.ty - cur.ty) * k
        cur.mo += (mo.o - cur.mo) * k; cur.ms += (ms.m - cur.ms) * k

        const bob = reduced || p > 0.1 ? 0 : Math.sin(Date.now() / 1400) * 6
        pouch3d.style.transform = `translateY(${cur.ty + bob}px) rotateX(${reduced ? 0 : cur.rx}deg) scale(${reduced ? 1 : cur.s})`
        if (mouth) {
          mouth.style.opacity = `${cur.mo}`
          mouth.style.transform = `translate(-50%,-50%) scale(${cur.ms})`
        }

        /* layer crossfades */
        const diveO = clamp(1 - (p - 0.27) / 0.06, 0, 1)
        divewrap.style.opacity = `${diveO}`
        const inO = clamp((p - 0.27) / 0.06, 0, 1) * clamp(1 - (p - 0.83) / 0.045, 0, 1)
        inside.style.opacity = `${inO}`
        inside.style.transform = `scale(${1.16 - clamp((p - 0.27) / 0.08, 0, 1) * 0.16})`
        if (insidehead) insidehead.style.opacity = `${clamp((p - 0.33) / 0.04, 0, 1) * clamp(1 - (p - 0.78) / 0.05, 0, 1)}`
        if (shead) shead.style.opacity = `${clamp(p / 0.03, 0, 1) * clamp(1 - (p - 0.09) / 0.07, 0, 1)}`

        /* exit: simple, clean — fade the pouch back in with a soft settle */
        if (exitwrap) {
          const eo = clamp((p - 0.845) / 0.045, 0, 1)
          exitwrap.style.opacity = `${eo}`
          if (pouchMini && !reduced) pouchMini.style.transform = `translateY(${(1 - eo) * 18}px) scale(${0.94 + eo * 0.06})`
        }

        /* free-fall shaft — you're dropping fast, so the side lines stream UP
           past the camera. Scroll drives descent; a time drift keeps motion
           alive between scrolls. */
        if (inO > 0.02) {
          const H = vh + 220
          const drift = reduced ? 0 : Date.now() * 0.11
          const fall = p * 2600 + drift
          for (const s of stars) {
            const speed = s.streak ? 0.9 + s.depth * 1.7 : s.depth * 0.8
            let y = (s.fy * H - fall * speed) % H
            if (y < 0) y += H
            y -= 110
            const tw = s.streak ? 1 : 0.7 + 0.3 * Math.sin(drift * 0.02 * s.tw + s.ph)
            const x = s.fx * vw
            s.el.style.transform = `translate(${x}px, ${y}px)`
            s.el.style.opacity = `${inO * (s.streak ? 0.35 + 0.55 * s.depth : 0.25 + 0.5 * s.depth) * tw}`
          }
        } else {
          for (const s of stars) s.el.style.opacity = '0'
        }

        raf = requestAnimationFrame(render)
      }
      const onScroll = () => { targetP = prog(); update(targetP) }
      const onResize = () => { fit(); onScroll() }
      fit(); onScroll(); render()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)
      cleanup.push(() => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      })
    })()

    return () => { cleanup.forEach((fn) => fn()) }
  }, [])

  return (
    <div className="bb-story">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ===== ACT 1: ingredient constellation ===== */}
      <section className="experience" id="bb-exp" aria-label="Box Bites ingredient tour">
        <div className="stage">
          <div className="stage-inner">
            <div className="world" id="bb-world">
              <svg className="links" viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 960 392 C 1060 330, 1130 320, 1212 312" />
                <path d="M 648 500 C 560 470, 500 500, 452 506" />
                <path d="M 960 608 C 1060 680, 1135 698, 1212 706" />
                <path d="M 1196 300 L 1216 311 L 1198 326" />
                <path d="M 470 492 L 449 506 L 470 520" />
                <path d="M 1198 692 L 1216 706 L 1197 720" />
              </svg>

              <div className="node product" id="bb-nodeProduct" style={{ left: 800, top: 500 }}>
                <div className="floatwrap" style={{ width: 380 }}>
                  <img className="cut" src={BITE} alt="Box Bites snack square" />
                </div>
                <div className="tag-prod">Box&nbsp;Bites</div>
              </div>

              <div className="node disc" id="bb-nodeOat" style={{ left: 1235, top: 300 }}>
                <div className="floatwrap" style={{ width: 300, animationDelay: '-1.4s' }}>
                  <img className="cut" src={OAT} alt="Rolled oats" />
                </div>
                <div className="badge">Rolled&nbsp;Oat</div>
              </div>

              <div className="node disc" id="bb-nodeChoc" style={{ left: 360, top: 510 }}>
                <div className="floatwrap" style={{ width: 230, animationDelay: '-3.1s' }}>
                  <img className="cut" src={CHOC} alt="Dark chocolate curl" />
                </div>
                <div className="badge">Dark&nbsp;Chocolate</div>
              </div>

              <div className="node disc" id="bb-nodeHoodia" style={{ left: 1235, top: 715 }}>
                <div className="floatwrap" style={{ width: 260, animationDelay: '-2.2s' }}>
                  <img className="cut" src={HOODIA} alt="Hoodia flower" />
                </div>
                <div className="badge">Hoodia</div>
              </div>
            </div>
          </div>

          <div className="intro" id="bb-intro">
            <div className="script">Goodbye Sugar, Hello Energy</div>
            <span className="pill">Premium Formula</span>
            <h1>Snack smart with<br />Box&nbsp;Bites</h1>
            <p>
              Made with hearty rolled oats, rich dark chocolate, and a touch of Hoodia — these bites are made to
              crush your cravings and keep you powered up anytime, anywhere.
            </p>
          </div>

          <div className="cap center"><span className="kicker">The bite</span><h2>Four things, one bite</h2><p className="type"></p></div>
          <div className="cap left"><span className="kicker">01 — Rolled Oat</span><h2>Oats for steady energy</h2><p className="type"></p></div>
          <div className="cap right"><span className="kicker">02 — Dark Chocolate</span><h2>A tasty mood lift</h2><p className="type"></p></div>
          <div className="cap left"><span className="kicker">03 — Hoodia</span><h2>Keeps hunger in check</h2><p className="type"></p></div>

          <nav className="rail" aria-hidden="true">
            <span className="seg"><i></i></span>
            <span className="seg"><i></i></span>
            <span className="seg"><i></i></span>
            <span className="seg"><i></i></span>
          </nav>
          <div className="keepscroll" id="bb-keepscroll">Keep scrolling</div>
        </div>
      </section>

      {/* ===== ACT 2: 3D nutrition table ===== */}
      <section className="tablezone" id="bb-tz" aria-label="Nutrition facts">
        <div className="tstage">
          <div className="thead-overlay" id="bb-theadOverlay">
            <div className="kicker">Per 100g</div>
            <h2>The numbers, bite by bite</h2>
          </div>
          <div className="persp">
            <div className="card3d" id="bb-card3d">
              <img className="faller" id="bb-faller" src={BITE} alt="" aria-hidden="true" />
              <div className="fshadow" id="bb-fshadow"></div>
              <div className="chead"><span className="t">Nutrition Facts</span><span className="u">Per 100g</span></div>
              <div className="row" data-to="507" data-dec="0" data-unit=" kcal"><span className="lab">Energy</span><span className="val">0 kcal</span></div>
              <div className="row" data-to="57.8" data-dec="1" data-unit=" g"><span className="lab">Carbohydrate</span><span className="val">0 g</span></div>
              <div className="row" data-to="6.9" data-dec="1" data-unit=" g"><span className="lab">Protein</span><span className="val">0 g</span></div>
              <div className="row" data-to="26.8" data-dec="1" data-unit=" g"><span className="lab">Fat</span><span className="val">0 g</span></div>
              <div className="row" data-to="24.6" data-dec="1" data-unit=" g"><span className="lab">Total Sugars</span><span className="val">0 g</span></div>
              <div className="row" data-to="469" data-dec="0" data-unit=" mg"><span className="lab">Sodium</span><span className="val">0 mg</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACT 3: dive into the pouch ===== */}
      <section className="smartzone" id="bb-sz" aria-label="Inside the pouch">
        <div className="sstage">
          <div className="shead" id="bb-shead">
            <div className="kicker">Smart Snacking</div>
            <h2>Come inside<br />the pouch</h2>
            <div className="script">scroll to open it up</div>
          </div>

          {/* phase A: camera rises above, pouch lies back, opens, we plunge in */}
          <div className="divewrap" id="bb-divewrap">
            <div className="pouch3d" id="bb-pouch3d">
              <img src={POUCH} alt="Box Bites pouch by Earnergy" />
              <div className="mouth" id="bb-mouth" aria-hidden="true"></div>
            </div>
          </div>

          {/* phase B: free-falling down the shaft */}
          <div className="inside" id="bb-inside" aria-hidden="true">
            <div className="tunnel" id="bb-tunnel"></div>
          </div>

          <div className="insidehead" id="bb-insidehead">
            <div className="kicker">Inside the Pouch</div>
            <div className="script">healthy cookies that box your cravings</div>
          </div>

          <div className="drop" id="bb-drop1"><div className="idx">01 / 07</div><div className="t">High Fiber</div></div>
          <div className="drop" id="bb-drop2"><div className="idx">02 / 07</div><div className="t">Craving Control</div></div>
          <div className="drop" id="bb-drop3"><div className="idx">03 / 07</div><div className="t">Longer Fullness</div></div>
          <div className="drop" id="bb-drop4"><div className="idx">04 / 07</div><div className="t">Diet Support</div></div>
          <div className="drop" id="bb-drop5"><div className="idx">05 / 07</div><div className="t">Healthy Cookie</div></div>
          <div className="drop" id="bb-drop6"><div className="idx">06 / 07</div><div className="t">Sustained Energy</div></div>
          <div className="drop" id="bb-drop7">
            <div className="t small">Enjoy guilt-free snacking<br />that supports your goals</div>
            <div className="sub">almost at the bottom…</div>
          </div>

          {/* phase C: clean exit — pouch fades back in, then the offer */}
          <div className="exitwrap" id="bb-exitwrap">
            <div className="pouchmini"><img src={POUCH} alt="" /></div>
          </div>
          <div className="stamp" id="bb-stamp">
            <span className="s1">2 PACK</span>
            <span className="s2">RM&nbsp;30</span>
            <span className="s3">only!</span>
          </div>
          <div className="benefits" id="bb-benefits">
            <div className="powered">Enjoy guilt-free snacking that supports your goals</div>
            <div className="rowc">
              <span className="bchip">High Fiber</span>
              <span className="bchip">Craving Control</span>
              <span className="bchip">Longer Fullness</span>
              <span className="bchip">Diet Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== footer ===== */}
      <footer className="outro">
        <div className="script">Goodbye Sugar,<span className="w">Hello Energy</span></div>
        <p className="made">Made with hearty rolled oats, rich dark chocolate, and a touch of Hoodia.</p>
        <div className="foot">Distributed by Earnergy Circle Solution · 202503225207 · (003764513-X)</div>
        <div className="price">
          <span>RM <b>15.00</b> sm</span>
          <span>RM <b>17.00</b> ss</span>
        </div>
        <div className="badges">Halal · MeSTI Certified · Made in Malaysia · Buatan Malaysia</div>
      </footer>
    </div>
  )
}