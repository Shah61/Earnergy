'use client'

/**
 * BoxBitesStory — drop under your hero section:  <BoxBitesStory />
 *
 * Required files in /public:
 *   /boxbite.webp  /oat.webp  /chocolate.webp  /hoodia.webp  /box-bites-pouch.webp
 *
 * All styles are embedded and scoped under .bb-story (keyframes prefixed bb-).
 * Don't put overflow-x:hidden on a wrapper around this component — it breaks
 * position:sticky. Keep it on html/body instead.
 *
 * RESPONSIVENESS NOTES (this revision):
 *  - Three device tiers, each with its own Act-1 camera path:
 *      phone  (<760px)        — tighter zoom, focused node parked in the upper
 *                               40% so the bottom caption never covers it,
 *                               shorter scroll runways
 *      tablet (760–1099px)    — desktop layout, slightly reduced zoom + side
 *                               offsets so captions don't collide with art
 *      desktop (>=1100px)     — original cinematic path
 *  - Extra CSS breakpoints: <=1100 (iPad), <=760 (phone), <=430 (small phone),
 *    plus a short-landscape query (max-height:520px) for rotated phones.
 *  - Safe-area insets (notch / home-indicator) on every pinned UI element.
 *  - Viewport-resize guard: iOS/Android URL-bar height wobble no longer
 *    re-fits the scenes mid-scroll (only real width/orientation changes do).
 *  - Layout re-measured after web fonts load (Act 2 row positions depend on
 *    Anton/Manrope metrics).
 *  - Fewer Act-3 particles on phones for smoother scrolling.
 */

import { useEffect } from 'react'
import { getLenis } from '@/hooks/useLenis'

const BITE = '/boxbite.webp'
const OAT = '/oat.webp'
const CHOC = '/chocolate.webp'
const HOODIA = '/hoodia.webp'
const BB_BG = '/background2.webp'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.bb-story{
  --green:#74c157; --green-lt:#84d067; --green-dk:#579f3d;
  --forest:#0e2e16; --forest-2:#10421e;
  --cream:#f6f2e7; --white:#ffffff;
  --safe-t:env(safe-area-inset-top,0px);
  --safe-b:env(safe-area-inset-bottom,0px);
  --safe-l:env(safe-area-inset-left,0px);
  --safe-r:env(safe-area-inset-right,0px);
  font-family:"Manrope",system-ui,sans-serif;color:var(--forest);
  line-height:1.5;-webkit-font-smoothing:antialiased;
  --bb-page-bg:url('${BB_BG}');
  background:var(--bb-page-bg) center/cover no-repeat;
}
.bb-story *{box-sizing:border-box;margin:0;padding:0}
.bb-story img{max-width:none}
.bb-story h1,.bb-story h2{text-wrap:balance}

/* ================= ACT 1: constellation ================= */
.bb-story .experience{position:relative;height:200vh}
.bb-story .stage{position:sticky;top:0;height:100vh;height:100svh;width:100%;overflow:hidden;
  background:var(--bb-page-bg) center/cover no-repeat}
.bb-story .stage-inner{position:absolute;inset:0;animation:bb-enter 1.05s ease both}
@keyframes bb-enter{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}

.bb-story .world{position:absolute;top:0;left:0;width:1600px;height:1000px;transform-origin:0 0;will-change:transform}
.bb-story .links{position:absolute;inset:0;width:1600px;height:1000px;overflow:visible}
.bb-story .links path{fill:none;stroke:var(--white);stroke-width:2.6;opacity:.82;stroke-linecap:round;stroke-dasharray:9 11;animation:bb-flow 1.6s linear infinite}
@keyframes bb-flow{to{stroke-dashoffset:-40}}

.bb-story .node{position:absolute;transform:translate(-50%,-50%);transition:opacity .45s ease}
.bb-story .node.disc{cursor:pointer}
.bb-story .node.disc .floatwrap{transition:filter .3s ease}
.bb-story .node.disc:hover .floatwrap{filter:brightness(1.08)}
/* while an ingredient is focused, everything else fades so its caption is
   never covered by other artwork */
.bb-story .world .links{transition:opacity .45s ease}
.bb-story .world.focused .node{opacity:.1}
.bb-story .world.focused .node.active{opacity:1}
.bb-story .world.focused .links{opacity:.12}
.bb-story .floatwrap{animation:bb-floatidle 6s ease-in-out infinite alternate}
.bb-story .cut{display:block;width:100%;height:auto;transform-origin:center;filter:drop-shadow(0 22px 26px rgba(22,50,16,.4))}
.bb-story .cut.pop{animation:bb-pop .72s cubic-bezier(.2,.9,.3,1.2)}
@keyframes bb-pop{0%{transform:scale(.7)}45%{transform:scale(1.12)}68%{transform:scale(.95)}84%{transform:scale(1.04)}100%{transform:scale(1)}}
@keyframes bb-floatidle{from{transform:translateY(-7px)}to{transform:translateY(7px)}}

.bb-story .tag-prod{position:absolute;left:50%;bottom:-30px;transform:translateX(-50%);font-family:"Anton",sans-serif;letter-spacing:.18em;text-transform:uppercase;font-size:24px;color:var(--white);white-space:nowrap;text-shadow:0 3px 14px rgba(22,50,16,.5)}
.bb-story .badge{position:absolute;left:50%;bottom:-26px;transform:translateX(-50%);font-family:"Anton",sans-serif;letter-spacing:.16em;text-transform:uppercase;font-size:16px;color:var(--white);white-space:nowrap;text-shadow:0 2px 10px rgba(22,50,16,.5)}

.bb-story .intro{position:absolute;z-index:7;top:0;left:0;right:0;
  padding:calc(clamp(22px,5vh,60px) + var(--safe-t)) clamp(16px,4vw,24px) clamp(64px,11vh,96px);
  text-align:center;pointer-events:none;will-change:opacity,transform;
  background:linear-gradient(to bottom, rgba(74,140,48,.94) 0%, rgba(116,193,87,.55) 52%, rgba(116,193,87,0) 100%)}
.bb-story .intro .script{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(22px,4.4vw,44px);color:var(--white);line-height:.88;margin-bottom:10px;opacity:.96}
.bb-story .intro .pill{display:inline-block;font-family:"Anton",sans-serif;letter-spacing:.2em;text-transform:uppercase;font-size:clamp(10px,1.4vw,12px);color:var(--white);background:var(--forest-2);padding:7px 14px;border-radius:999px;margin-bottom:12px}
.bb-story .intro h1{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(30px,6.2vw,66px);line-height:.98;color:var(--white);text-shadow:0 4px 24px rgba(20,45,18,.4)}
.bb-story .intro p{max-width:48ch;margin:14px auto 0;font-size:clamp(13px,1.7vw,17px);color:rgba(255,255,255,.94)}

.bb-story .cap{position:absolute;z-index:7;width:min(390px,84vw);opacity:0;pointer-events:none;transition:opacity .45s ease;will-change:opacity,transform}
.bb-story .cap .kicker{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--forest-2);margin-bottom:12px;display:inline-flex;align-items:center;gap:10px}
.bb-story .cap .kicker::before{content:"";width:26px;height:2px;background:var(--forest-2)}
.bb-story .cap h2{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(26px,4.8vw,50px);line-height:1.0;color:var(--white);margin-bottom:14px;text-shadow:0 3px 20px rgba(22,50,16,.34);opacity:0;transform:translateY(10px);transition:opacity .5s ease .12s, transform .5s ease .12s}
.bb-story .cap.show h2{opacity:1;transform:none}
.bb-story .cap .type{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:clamp(13px,1.6vw,16px);line-height:1.65;color:var(--forest);max-width:36ch;min-height:5.2em;font-weight:500}
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

.bb-story .keepscroll{position:absolute;z-index:8;bottom:calc(clamp(16px,4vh,34px) + var(--safe-b));right:calc(clamp(16px,5vw,46px) + var(--safe-r));font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(16,40,20,.74);opacity:0;transition:opacity .5s ease}
.bb-story .taphint{position:absolute;z-index:8;left:50%;bottom:calc(clamp(16px,4vh,34px) + var(--safe-b));transform:translateX(-50%);
  font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--forest-2);
  background:rgba(255,255,255,.6);backdrop-filter:blur(5px);padding:9px 16px;border-radius:999px;border:1px solid rgba(16,66,30,.16);
  opacity:0;transition:opacity .5s ease;pointer-events:none;white-space:nowrap}

/* ================= ACT 2: 3D nutrition table ================= */
.bb-story .tablezone{position:relative;height:100svh}
.bb-story .tstage{position:sticky;top:0;height:100vh;height:100svh;width:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;
  background:var(--bb-page-bg) center/cover no-repeat}
.bb-story .tstage.has-bite-cursor{cursor:none}
.bb-story .tstage.has-bite-cursor *{cursor:none}
.bb-bite-cursor{position:fixed;left:0;top:0;width:44px;height:auto;max-width:none;z-index:2147483646;pointer-events:none;
  opacity:0;visibility:hidden;display:block;will-change:transform;transform:translate3d(-120px,-120px,0) translate(-50%,-50%);
  filter:drop-shadow(0 10px 14px rgba(20,46,16,.45));transition:opacity .15s ease,visibility .15s ease}
.bb-bite-cursor.on{opacity:1;visibility:visible}
@keyframes bb-hintpulse{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.05)}}
.bb-story .thead-overlay{position:absolute;z-index:8;top:calc(clamp(20px,5vh,52px) + var(--safe-t));left:0;right:0;text-align:center;pointer-events:none;will-change:opacity,transform;padding:0 16px}
.bb-story .thead-overlay .kicker{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--forest-2)}
.bb-story .thead-overlay h2{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(26px,5.4vw,54px);color:var(--white);line-height:1.04;text-shadow:0 3px 20px rgba(22,50,16,.34);margin-top:8px}
.bb-story .persp{perspective:1300px;perspective-origin:50% 38%;width:min(620px,92vw)}
.bb-story .card3d{position:relative;transform-style:preserve-3d;will-change:transform;background:var(--white);border-radius:22px;padding:10px 0 4px;
  box-shadow:0 60px 110px rgba(20,46,16,.45), 0 18px 40px rgba(20,46,16,.3);transform:rotateX(14deg) scale(1.12);
  transition:box-shadow .45s cubic-bezier(.22,.9,.3,1)}
.bb-story .card3d.is-flat{box-shadow:0 36px 70px rgba(20,46,16,.38), 0 12px 28px rgba(20,46,16,.22)}
.bb-story .card3d .chead{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:clamp(12px,1.8vh,16px) clamp(16px,3.4vw,26px) clamp(10px,1.6vh,14px);border-bottom:3px solid var(--forest-2)}
.bb-story .card3d .chead .t{font-weight:800;font-size:clamp(16px,2.6vw,24px);color:var(--forest-2)}
.bb-story .card3d .chead .u{font-weight:800;font-size:clamp(12px,1.8vw,16px);color:var(--forest-2);white-space:nowrap}
.bb-story .row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:clamp(11px,2.1vh,19px) clamp(16px,3.4vw,26px);border-bottom:1.5px solid rgba(16,66,30,.18);
  position:relative;z-index:1;opacity:1;transform:translate3d(0,0,0) scale(1);transform-style:preserve-3d;
  transition:background .35s ease,transform .38s cubic-bezier(.22,.9,.3,1),box-shadow .38s cubic-bezier(.22,.9,.3,1)}
.bb-story .row:last-child{border-bottom:none;border-radius:0 0 22px 22px}
.bb-story .row .lab{font-weight:600;font-size:clamp(14px,2vw,19px);color:var(--forest-2)}
.bb-story .row .val{font-weight:700;font-size:clamp(14px,2vw,19px);color:var(--forest);font-variant-numeric:tabular-nums;white-space:nowrap}
@media (hover:hover) and (pointer:fine){
  .bb-story .row:hover{z-index:3;background:rgba(116,193,87,.22);transform:translate3d(0,-10px,36px) scale(1.035);
    box-shadow:0 22px 40px rgba(20,46,16,.28),0 4px 10px rgba(20,46,16,.12)}
  .bb-story .row:hover .lab{font-weight:800}
}
@media (prefers-reduced-motion:reduce){
  .bb-story .row{transition:background .2s ease,box-shadow .2s ease}
  .bb-story .row:hover{transform:translate3d(0,-4px,12px) scale(1.01)}
}

/* ================= ACT 3: dive into the pouch ================= */
/* stays a single screen until the user clicks "Dive in" — then the runway
   expands and scrolling scrubs the frames like before */
.bb-story .smartzone{position:relative;height:100svh}
.bb-story .smartzone.diving{height:920vh}
.bb-story .sstage{position:sticky;top:0;height:100vh;height:100svh;width:100%;overflow:hidden;
  background:var(--bb-page-bg) center/cover no-repeat}
.bb-story .divebtn{position:absolute;z-index:9;left:50%;bottom:calc(clamp(56px,11vh,110px) + var(--safe-b));transform:translateX(-50%);
  font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--forest-2);
  background:#f5c518;border:none;border-radius:999px;padding:14px 26px;cursor:pointer;
  box-shadow:0 16px 34px rgba(16,40,18,.35);transition:opacity .4s ease,transform .2s ease;animation:bb-hintpulse 2.4s ease-in-out infinite}
.bb-story .divebtn:hover{transform:translateX(-50%) scale(1.05)}
.bb-story .divebtn.off{opacity:0;pointer-events:none;animation:none}
/* escape hatch while diving — jumps back out and frees the scroll.
   NOTE: absolute (not fixed) — the transformed product-layer ancestor breaks
   position:fixed; the sticky stage pins anyway, so absolute tracks the screen */
.bb-story .diveoutbtn{position:absolute;z-index:40;right:calc(clamp(16px,3vw,34px) + var(--safe-r));bottom:calc(clamp(16px,4vh,34px) + var(--safe-b));
  font-family:"Anton",sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--box-cream,#fff);
  background:rgba(16,40,20,.55);backdrop-filter:blur(6px);border:1.5px solid rgba(255,255,255,.5);border-radius:999px;padding:11px 18px;cursor:pointer;
  opacity:0;pointer-events:none;transition:opacity .4s ease}
.bb-story .diveoutbtn.show{opacity:1;pointer-events:auto}
.bb-story .diveoutbtn:hover{background:rgba(16,40,20,.75)}

.bb-story .shead{position:absolute;z-index:8;top:calc(clamp(16px,4vh,40px) + var(--safe-t));left:0;right:0;text-align:center;pointer-events:none;will-change:opacity;padding:0 16px}
.bb-story .shead .kicker{font-family:"Anton",sans-serif;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:rgba(246,242,231,.78)}
.bb-story .shead h2{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(20px,3.4vw,38px);color:var(--cream);line-height:1.05;letter-spacing:.02em;text-shadow:0 2px 14px rgba(8,20,8,.45);margin-top:6px}
.bb-story .shead .script{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(15px,2.2vw,24px);color:rgba(246,242,231,.82);margin-top:4px}

/* cinematic frame-scrub canvas — an AI-rendered dive into the pouch, scrubbed
   by scroll. The canvas fills the stage; frames are drawn cover-fit. */
.bb-story .scrubwrap{position:absolute;inset:0;z-index:3;will-change:opacity;background:#0d2a12}
.bb-story .scrubwrap canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.bb-story .scrubvignette{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(to bottom, rgba(8,20,8,.6) 0%, rgba(8,20,8,.26) 15%, transparent 30%),
    radial-gradient(120% 95% at 50% 45%, transparent 58%, rgba(8,20,8,.55) 100%)}

.bb-story .insidehead{position:absolute;z-index:7;top:calc(clamp(16px,4vh,42px) + var(--safe-t));left:0;right:0;text-align:center;opacity:0;will-change:opacity;pointer-events:none;padding:0 16px}
.bb-story .insidehead .kicker{font-family:"Anton",sans-serif;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#f5c518}
.bb-story .insidehead .script{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(18px,3vw,30px);color:var(--cream);margin-top:4px}

/* free-fall benefit words flying past while you drop */
.bb-story .drop{position:absolute;z-index:8;left:50%;top:50%;transform:translate(-50%,-50%);width:min(680px,calc(100vw - 32px));text-align:center;
  opacity:0;pointer-events:none;transition:opacity .4s ease;will-change:opacity}
.bb-story .drop.show{opacity:1}
.bb-story .drop .idx{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.24em;color:#f5c518;margin-bottom:10px}
.bb-story .drop .t{font-family:"Anton",sans-serif;font-weight:400;font-size:clamp(32px,7vw,72px);line-height:1.06;color:var(--white);
  text-shadow:0 5px 30px rgba(0,0,0,.55);transform:translateY(26px);transition:transform .45s cubic-bezier(.2,.9,.3,1.15)}
.bb-story .drop.show .t{transform:none}
.bb-story .drop .t.small{font-size:clamp(22px,4.4vw,46px);color:var(--cream)}
.bb-story .drop .sub{margin-top:12px;font-family:"Caveat",cursive;font-weight:700;font-size:clamp(17px,2.8vw,28px);color:#f5c518;
  opacity:0;transition:opacity .45s ease .15s}
.bb-story .drop.show .sub{opacity:1}

.bb-story .stamp{position:absolute;z-index:8;left:calc(50% + clamp(80px,12vw,170px));top:21%;width:168px;height:168px;border-radius:50%;
  background:var(--forest-2);color:var(--white);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  box-shadow:0 24px 50px rgba(16,40,18,.45), inset 0 0 0 5px rgba(255,255,255,.25), inset 0 0 0 7px var(--forest-2), inset 0 0 0 9px rgba(255,255,255,.18);
  transform:rotate(-9deg) scale(0);opacity:0;will-change:transform,opacity}
.bb-story .stamp.show{animation:bb-stampin .55s cubic-bezier(.2,.9,.3,1.3) both}
@keyframes bb-stampin{0%{transform:rotate(14deg) scale(0);opacity:0}60%{transform:rotate(-12deg) scale(1.12);opacity:1}100%{transform:rotate(-9deg) scale(1);opacity:1}}
.bb-story .stamp .s1{font-family:"Anton",sans-serif;font-size:14px;letter-spacing:.2em}
.bb-story .stamp .s2{font-family:"Anton",sans-serif;font-size:46px;line-height:1;margin:3px 0}
.bb-story .stamp .s3{font-family:"Caveat",cursive;font-weight:700;font-size:20px;color:#f5c518}

.bb-story .benefits{position:absolute;z-index:8;left:0;right:0;bottom:calc(clamp(14px,4vh,40px) + var(--safe-b));text-align:center;pointer-events:none}
.bb-story .benefits .powered{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(16px,2.6vw,26px);color:var(--white);text-shadow:0 2px 12px rgba(22,50,16,.4);
  opacity:0;transform:translateY(12px);transition:opacity .5s ease,transform .5s ease;padding:0 18px}
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
.bb-story .outro{position:relative;min-height:88svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  padding:70px clamp(18px,5vw,24px) calc(70px + var(--safe-b));
  background:var(--bb-page-bg) center/cover no-repeat}
.bb-story .outro .script{font-family:"Caveat",cursive;font-size:clamp(40px,9vw,96px);color:var(--white);line-height:.9;text-shadow:0 4px 26px rgba(22,50,16,.32)}
.bb-story .outro .script .w{color:var(--forest-2);display:block}
.bb-story .outro .made{margin-top:26px;max-width:46ch;font-size:14px;color:rgba(255,255,255,.94)}
.bb-story .outro .foot{margin-top:22px;font-size:12.5px;color:rgba(16,40,20,.78);line-height:1.7;overflow-wrap:anywhere}
.bb-story .outro .price{margin-top:12px;display:inline-flex;gap:18px;flex-wrap:wrap;justify-content:center;font-size:13px;color:rgba(16,40,20,.9)}
.bb-story .outro .price b{color:var(--white);font-weight:800}
.bb-story .outro .badges{margin-top:22px;font-family:"Anton",sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(16,40,20,.7);line-height:2}

/* ============ TABLET (iPad portrait & smaller laptops) ============ */
@media (max-width:1100px){
  .bb-story .cap{width:min(330px,38vw)}
  .bb-story .cap.left{left:clamp(20px,3.5vw,44px)}
  .bb-story .cap.right{right:clamp(20px,3.5vw,44px)}
  .bb-story .cap .type{max-width:32ch}
  .bb-story .persp{width:min(560px,90vw);perspective:1150px}
  .bb-story .stamp{width:148px;height:148px;left:auto;right:clamp(24px,6vw,64px);top:18%}
  .bb-story .stamp .s2{font-size:40px}
}

/* ============ PHONE ============ */
@media (max-width:760px){
  .bb-story .experience{height:200vh}
  .bb-story .tablezone{height:100svh}
  .bb-story .smartzone{height:100svh}
  .bb-story .smartzone.diving{height:680vh}

  .bb-story .intro{padding-bottom:clamp(48px,9vh,72px)}
  .bb-story .intro p{max-width:38ch}

  .bb-story .cap{width:auto;left:max(16px,var(--safe-l))!important;right:max(16px,var(--safe-r))!important;text-align:left!important;top:auto!important;
    bottom:calc(max(24px,7vh) + var(--safe-b));transform:none!important}
  .bb-story .cap.right .kicker{flex-direction:row}
  .bb-story .cap.right .type{margin-left:0}
  .bb-story .cap h2{font-size:clamp(24px,7vw,32px);margin-bottom:10px}
  .bb-story .cap .kicker{margin-bottom:8px;font-size:11px}
  .bb-story .cap .type{min-height:6.8em;font-size:13px;line-height:1.6;max-width:none}
  .bb-story .keepscroll{font-size:9px;letter-spacing:.22em}
  .bb-story .taphint{font-size:10px;padding:7px 12px}
  .bb-story .card3d{transform:rotateX(11deg) scale(1.02)}

  .bb-story .persp{perspective:980px;perspective-origin:50% 34%;width:min(440px,94vw)}
  .bb-story .card3d{border-radius:18px}
  .bb-story .row:last-child{border-radius:0 0 18px 18px}
  .bb-story .thead-overlay h2{font-size:clamp(24px,6.4vw,34px)}

  .bb-story .drop .t{font-size:clamp(30px,9.4vw,46px)}
  .bb-story .drop .t.small{font-size:clamp(20px,6vw,30px)}
  .bb-story .stamp{width:118px;height:118px;left:auto;right:max(12px,var(--safe-r));top:max(13%,calc(64px + var(--safe-t)))}
  .bb-story .stamp .s2{font-size:30px}
  .bb-story .stamp .s1{font-size:10px}
  .bb-story .stamp .s3{font-size:14px}
  .bb-story .shead .script{font-size:15px}
  .bb-story .benefits .powered{font-size:15px}
  .bb-story .bchip{font-size:9.5px;padding:6px 10px;letter-spacing:.12em}
  .bb-story .benefits .rowc{gap:7px}

  .bb-story .outro .ofloat{display:none}
  .bb-story .outro .ocols{grid-template-columns:1fr 1fr}
  .bb-story .outro .obar-in{justify-content:center;text-align:center}
  .bb-story .outro .otop{margin-left:0}
}

/* ============ SMALL PHONE (iPhone SE / Mini, <=430px) ============ */
@media (max-width:430px){
  .bb-story .intro .script{font-size:20px;margin-bottom:8px}
  .bb-story .intro .pill{font-size:9px;padding:6px 11px;margin-bottom:10px}
  .bb-story .intro h1{font-size:clamp(26px,8.4vw,32px)}
  .bb-story .intro p{font-size:12.5px;max-width:34ch;margin-top:10px}

  .bb-story .cap h2{font-size:22px}
  .bb-story .cap .type{font-size:12px;min-height:7.4em}

  .bb-story .thead-overlay .kicker,.bb-story .shead .kicker{font-size:10px;letter-spacing:.22em}
  .bb-story .card3d .chead .t{font-size:15px}
  .bb-story .card3d .chead .u{font-size:11px}
  .bb-story .row{padding:10px 14px}
  .bb-story .row .lab,.bb-story .row .val{font-size:13.5px}

  .bb-story .drop .idx{font-size:10px;margin-bottom:8px}
  .bb-story .stamp{width:100px;height:100px}
  .bb-story .stamp .s2{font-size:26px}
  .bb-story .stamp .s1{font-size:9px;letter-spacing:.14em}
  .bb-story .stamp .s3{font-size:13px}
  .bb-story .bchip{font-size:8.5px;padding:5px 9px}

  .bb-story .outro .ocols{grid-template-columns:1fr;text-align:center}
  .bb-story .outro .ocol a,.bb-story .outro .oing{margin:0 auto;width:fit-content}
  .bb-story .outro .olead{font-size:13.5px}
  .bb-story .outro .ofine{font-size:10.5px}
}

/* ============ SHORT LANDSCAPE (rotated phones) ============ */
@media (max-height:520px) and (orientation:landscape){
  .bb-story .intro{padding-top:calc(12px + var(--safe-t));padding-bottom:40px}
  .bb-story .intro p{display:none}
  .bb-story .intro h1{font-size:clamp(24px,4.6vw,34px)}
  .bb-story .intro .script{font-size:18px;margin-bottom:6px}
  .bb-story .intro .pill{display:none}

  .bb-story .cap{bottom:calc(14px + var(--safe-b))!important;top:auto!important;transform:none!important;
    left:max(18px,var(--safe-l))!important;right:auto!important;width:min(420px,55vw);text-align:left!important}
  .bb-story .cap h2{font-size:20px;margin-bottom:6px}
  .bb-story .cap .type{font-size:11.5px;min-height:3.4em;line-height:1.5}
  .bb-story .cap .kicker{margin-bottom:6px;font-size:10px}

  .bb-story .thead-overlay{top:calc(8px + var(--safe-t))}
  .bb-story .thead-overlay h2{font-size:22px;margin-top:4px}
  .bb-story .persp{width:min(460px,72vw);perspective:1000px}
  .bb-story .row{padding:7px 18px}
  .bb-story .row .lab,.bb-story .row .val{font-size:13px}
  .bb-story .card3d .chead{padding:9px 18px 8px}
  .bb-story .card3d{transform:rotateX(10deg) scale(1)}

  .bb-story .shead{top:calc(8px + var(--safe-t))}
  .bb-story .shead h2{font-size:20px;margin-top:4px}
  .bb-story .shead .script{display:none}
  .bb-story .insidehead{top:calc(8px + var(--safe-t))}
  .bb-story .insidehead .script{font-size:16px}
  .bb-story .drop .t{font-size:clamp(24px,5vw,34px)}
  .bb-story .drop .t.small{font-size:clamp(17px,3.4vw,24px)}
  .bb-story .drop .idx{margin-bottom:6px;font-size:10px}
  .bb-story .stamp{width:92px;height:92px;top:max(10%,calc(10px + var(--safe-t)));right:max(14px,var(--safe-r));left:auto}
  .bb-story .stamp .s2{font-size:24px}
  .bb-story .stamp .s1{font-size:8.5px}
  .bb-story .stamp .s3{font-size:12px}
  .bb-story .benefits{bottom:calc(8px + var(--safe-b))}
  .bb-story .benefits .powered{font-size:13px}
  .bb-story .bchip{font-size:8.5px;padding:5px 9px}

  .bb-story .outro .ofloat{display:none}
}

@media (prefers-reduced-motion:reduce){
  .bb-story .floatwrap,.bb-story .links path,.bb-story .stage-inner{animation:none}
  .bb-story .card3d.jolt{animation:none}
  .bb-story .outro .otrack,.bb-story .outro .ofloat{animation:none}
}
`

export default function BoxBitesHello() {
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)
    const smooth = (t: number) => t * t * (3 - 2 * t)
    const cleanup: Array<() => void> = []
    const $ = (id: string) => document.getElementById(id)

    /* Re-fit only on REAL viewport changes. Mobile browsers fire resize
       constantly while the URL bar collapses/expands; re-measuring then makes
       the scene jump mid-scroll. We ignore height wobble under 140px unless
       the width (or orientation) also changed. */
    const makeViewportWatcher = (refit: () => void) => {
      let lastW = window.innerWidth
      let lastH = window.innerHeight
      const onResize = () => {
        const w = window.innerWidth, h = window.innerHeight
        const wChanged = Math.abs(w - lastW) > 1
        const hChanged = Math.abs(h - lastH) > 140
        if (!wChanged && !hChanged) return
        lastW = w; lastH = h
        refit()
      }
      const onOrient = () => {
        // orientation always forces a refit (after the browser settles)
        window.setTimeout(() => { lastW = window.innerWidth; lastH = window.innerHeight; refit() }, 120)
      }
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onOrient)
      cleanup.push(() => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onOrient)
      })
    }

    /* ================= ACT 1: constellation ================= */
    ;(() => {
      const exp = $('bb-exp'); if (!exp) return
      const stage = exp.querySelector('.stage') as HTMLElement
      const world = $('bb-world') as HTMLElement
      const intro = $('bb-intro') as HTMLElement
      const caps = Array.from(exp.querySelectorAll('.cap')) as HTMLElement[]
      const keep = $('bb-keepscroll') as HTMLElement
      const taphint = $('bb-taphint') as HTMLElement
      if (!stage || !world) return

      const NW = 1600, NH = 1000
      const nodes = ['bb-nodeOat', 'bb-nodeChoc', 'bb-nodeHoodia']
        .map((id) => $(id))
        .filter(Boolean) as HTMLElement[]
      const imgs = nodes.map((n) => n.querySelector('.cut')) as HTMLElement[]
      const DESC = [
        'Whole rolled oats release their energy slowly, so you stay powered through the afternoon without the sugar spike-and-crash.',
        'Rich dark chocolate makes every bite feel like a treat — the flavour you crave, minus the sugar guilt.',
        'A touch of Hoodia quietens the cravings between meals, so one small bite is genuinely enough.',
      ]

      /* one scroll motion: wide intro → constellation overview. After that
         the camera only moves when an ingredient is CLICKED (focus keys per
         device tier — phones zoom harder and park the subject above the
         bottom-anchored caption). */
      const CAMS = {
        desktop: {
          wide: { fx: 0.5, fy: 0.5, s: 1.0, ox: 0, oy: 0 },
          over: { fx: 0.5, fy: 0.5, s: 1.4, ox: 0, oy: -0.04 },
          focus: [
            { fx: 0.772, fy: 0.3, s: 2.55, ox: 0.17, oy: 0.03 },
            { fx: 0.225, fy: 0.51, s: 2.55, ox: -0.17, oy: 0 },
            { fx: 0.772, fy: 0.715, s: 2.55, ox: 0.17, oy: -0.02 },
          ],
        },
        tablet: {
          wide: { fx: 0.5, fy: 0.5, s: 1.05, ox: 0, oy: 0 },
          over: { fx: 0.5, fy: 0.5, s: 1.45, ox: 0, oy: -0.04 },
          focus: [
            { fx: 0.772, fy: 0.3, s: 2.4, ox: 0.1, oy: 0.02 },
            { fx: 0.225, fy: 0.51, s: 2.4, ox: -0.1, oy: 0 },
            { fx: 0.772, fy: 0.715, s: 2.4, ox: 0.1, oy: -0.02 },
          ],
        },
        mobile: {
          wide: { fx: 0.5, fy: 0.5, s: 1.45, ox: 0, oy: -0.02 },
          over: { fx: 0.5, fy: 0.5, s: 1.8, ox: 0, oy: -0.08 },
          focus: [
            { fx: 0.772, fy: 0.3, s: 3.3, ox: 0, oy: -0.1 },
            { fx: 0.225, fy: 0.51, s: 3.3, ox: 0, oy: -0.1 },
            { fx: 0.772, fy: 0.715, s: 3.3, ox: 0, oy: -0.11 },
          ],
        },
      }

      let vw = 0, vh = 0, kFit = 1, targetP = 0, focused = -1, raf = 0, io = 1
      let CAM = CAMS.desktop
      const cur = { fx: 0.5, fy: 0.5, s: 1, ox: 0, oy: 0 }
      const fit = () => {
        vw = stage.clientWidth; vh = stage.clientHeight
        CAM = vw < 760 ? CAMS.mobile : vw < 1100 ? CAMS.tablet : CAMS.desktop
        kFit = Math.min(vw / NW, vh / NH)
      }
      const prog = () => { const r = exp.getBoundingClientRect(); const d = exp.offsetHeight - vh; return d <= 0 ? 0 : clamp(-r.top / d, 0, 1) }

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
      const setFocus = (i: number) => {
        if (i === focused) i = -1 // clicking the same ingredient again zooms back out
        focused = i
        caps.forEach((c, idx) => c.classList.toggle('show', idx === i))
        world.classList.toggle('focused', i >= 0)
        nodes.forEach((n, idx) => n.classList.toggle('active', idx === i))
        if (i >= 0) {
          const im = imgs[i]
          if (im && !reduced) { im.classList.remove('pop'); void im.offsetWidth; im.classList.add('pop') }
          const t = caps[i]?.querySelector('.type') as HTMLElement
          if (t) typeOut(t, DESC[i])
        }
      }

      nodes.forEach((node, i) => {
        const onTap = (e: Event) => { e.stopPropagation(); setFocus(i) }
        node.addEventListener('click', onTap)
        cleanup.push(() => node.removeEventListener('click', onTap))
      })
      /* clicking anywhere else zooms back out to the overview */
      const onStageTap = () => { if (focused >= 0) setFocus(focused) }
      stage.addEventListener('click', onStageTap)
      cleanup.push(() => stage.removeEventListener('click', onStageTap))

      const render = () => {
        const m = smooth(targetP)
        const w = CAM.wide, o = CAM.over
        const tgt = focused >= 0
          ? CAM.focus[focused]
          : { fx: w.fx + (o.fx - w.fx) * m, fy: w.fy + (o.fy - w.fy) * m, s: w.s + (o.s - w.s) * m, ox: w.ox + (o.ox - w.ox) * m, oy: w.oy + (o.oy - w.oy) * m }
        const k = reduced ? 1 : 0.085
        cur.fx += (tgt.fx - cur.fx) * k; cur.fy += (tgt.fy - cur.fy) * k; cur.s += (tgt.s - cur.s) * k
        cur.ox += (tgt.ox - cur.ox) * k; cur.oy += (tgt.oy - cur.oy) * k
        const S = kFit * cur.s
        world.style.transform = `translate(${vw / 2 + cur.ox * vw - cur.fx * NW * S}px, ${vh / 2 + cur.oy * vh - cur.fy * NH * S}px) scale(${S})`
        if (intro) {
          /* the intro headline fades away the moment an ingredient is focused
             so it never overlays the caption */
          io += ((focused >= 0 ? 0 : 1) - io) * (reduced ? 1 : 0.12)
          const introO = io * clamp(1 - targetP / 0.45, 0, 1)
          intro.style.opacity = `${introO}`
          intro.style.transform = `translateY(${-targetP * 60}px)`
          intro.style.visibility = introO < 0.02 ? 'hidden' : 'visible'
        }
        if (keep) keep.style.opacity = targetP > 0.5 ? '0.9' : '0'
        if (taphint) taphint.style.opacity = targetP > 0.45 && focused < 0 ? '1' : '0'
        raf = requestAnimationFrame(render)
      }
      const onScroll = () => { targetP = prog() }
      fit(); onScroll(); render()
      window.addEventListener('scroll', onScroll, { passive: true })
      makeViewportWatcher(() => { fit(); onScroll() })
      cleanup.push(() => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
      })
    })()

    /* ================= ACT 2: nutrition table + branded bite cursor ================= */
    ;(() => {
      const tz = $('bb-tz'); if (!tz) return
      const tstage = tz.querySelector('.tstage') as HTMLElement
      const card = $('bb-card3d') as HTMLElement
      if (!tstage || !card) return
      const rows = Array.from(card.querySelectorAll('.row')) as HTMLElement[]

      /* ---- card tilt: default perspective → straight while a row is hovered ---- */
      let pose = { rx: 14, s: 1.12 }
      let poseTgt = { rx: 14, s: 1.12 }
      let flat = false
      let poseRaf = 0
      let mobile = false

      const measurePose = () => {
        const vw = tstage.clientWidth
        const vh = tstage.clientHeight
        mobile = vw < 760
        const short = vh < 560
        const cardH = card.offsetHeight
        /* the headline is an absolute overlay — reserve its height so the
           card always sits BELOW it instead of underneath it on short
           viewports (small laptops / iPads) */
        const head = $('bb-theadOverlay')
        const headSafe = head ? head.offsetTop + head.offsetHeight + 16 : 0
        tstage.style.paddingTop = `${headSafe}px`
        const availH = Math.max(vh - headSafe, 220)
        const fitCap = (availH * 0.92) / Math.max(cardH, 1)
        const sCap = Math.min(mobile ? 1.04 : short ? 1.0 : Infinity, fitCap)
        const tiltedS = Math.min(mobile ? 1.02 : short ? 1.0 : 1.12, sCap)
        const flatS = Math.min(mobile ? 1.0 : short ? 0.98 : 1.08, sCap)
        const tiltedRx = mobile ? 11 : short ? 10 : 14
        poseTgt = flat
          ? { rx: 0, s: flatS }
          : { rx: tiltedRx, s: tiltedS }
        if (reduced) {
          pose = { ...poseTgt }
          applyPose()
        } else if (!poseRaf) {
          poseRaf = requestAnimationFrame(tickPose)
        }
      }

      const applyPose = () => {
        card.style.transform = `rotateX(${pose.rx}deg) scale(${pose.s})`
      }

      const tickPose = () => {
        poseRaf = 0
        const k = reduced ? 1 : 0.14
        pose.rx += (poseTgt.rx - pose.rx) * k
        pose.s += (poseTgt.s - pose.s) * k
        applyPose()
        if (Math.abs(poseTgt.rx - pose.rx) > 0.05 || Math.abs(poseTgt.s - pose.s) > 0.001) {
          poseRaf = requestAnimationFrame(tickPose)
        } else {
          pose = { ...poseTgt }
          applyPose()
        }
      }

      const setFlat = (next: boolean) => {
        if (flat === next) return
        flat = next
        card.classList.toggle('is-flat', flat)
        measurePose()
      }

      measurePose()
      makeViewportWatcher(measurePose)
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => measurePose()).catch(() => {})
      }

      /* ---- row hover: lift + straighten table ---- */
      let hoveredRow: HTMLElement | null = null
      const onRowEnter = (e: PointerEvent) => {
        const row = e.currentTarget as HTMLElement
        if (hoveredRow === row) return
        hoveredRow = row
        setFlat(true)
      }
      const onRowLeave = (e: PointerEvent) => {
        const row = e.currentTarget as HTMLElement
        if (hoveredRow !== row) return
        hoveredRow = null
        /* only tilt back if no other row is still hovered */
        const still = rows.find((r) => r.matches(':hover'))
        if (still) {
          hoveredRow = still
          setFlat(true)
          return
        }
        setFlat(false)
      }
      rows.forEach((row) => {
        row.addEventListener('pointerenter', onRowEnter)
        row.addEventListener('pointerleave', onRowLeave)
      })
      cleanup.push(() => {
        rows.forEach((row) => {
          row.removeEventListener('pointerenter', onRowEnter)
          row.removeEventListener('pointerleave', onRowLeave)
        })
        if (poseRaf) cancelAnimationFrame(poseRaf)
      })

      /* Custom bite cursor — create outside React so Strict Mode remounts
         don't orphan/remove the img. Body portal keeps position:fixed working
         under ProductViewport transforms. */
      const canUseCursor = () => {
        if (window.matchMedia('(pointer: coarse)').matches) return false
        if (window.matchMedia('(max-width: 760px)').matches) return false
        if (!window.matchMedia('(pointer: fine)').matches) return false
        if (navigator.maxTouchPoints > 0 && window.matchMedia('(hover: none)').matches) return false
        return true
      }

      const cursor = document.createElement('img')
      cursor.className = 'bb-bite-cursor'
      cursor.src = BITE
      cursor.alt = ''
      cursor.setAttribute('aria-hidden', 'true')
      cursor.decoding = 'async'
      document.body.appendChild(cursor)

      let enabled = canUseCursor()
      let visible = false
      let grow = false
      let mx = 0
      let my = 0
      let cx = 0
      let cy = 0
      let raf = 0

      const applyCursor = () => {
        const sc = grow ? 1.22 : 1
        cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${sc})`
      }

      const tick = () => {
        raf = 0
        if (!visible || !enabled) return
        const k = reduced ? 1 : 0.32
        cx += (mx - cx) * k
        cy += (my - cy) * k
        applyCursor()
        if (!reduced && (Math.abs(mx - cx) > 0.15 || Math.abs(my - cy) > 0.15)) {
          raf = requestAnimationFrame(tick)
        }
      }

      const show = () => {
        if (!enabled || visible) return
        visible = true
        tstage.classList.add('has-bite-cursor')
        cursor.classList.add('on')
        cx = mx
        cy = my
        applyCursor()
      }

      const hide = () => {
        if (!visible) return
        visible = false
        grow = false
        tstage.classList.remove('has-bite-cursor')
        cursor.classList.remove('on')
        if (raf) { cancelAnimationFrame(raf); raf = 0 }
      }

      const onMove = (e: PointerEvent) => {
        if (!enabled) return
        mx = e.clientX
        my = e.clientY
        if (!visible) show()
        const target = e.target as Element | null
        grow = !!target?.closest('a, button, [role="button"], .row')
        if (reduced) {
          cx = mx
          cy = my
          applyCursor()
          return
        }
        if (!raf) raf = requestAnimationFrame(tick)
      }

      const onEnter = (e: PointerEvent) => {
        if (!enabled) return
        mx = e.clientX
        my = e.clientY
        show()
      }

      const onLeave = () => {
        hide()
        hoveredRow = null
        setFlat(false)
      }

      const syncEnabled = () => {
        const next = canUseCursor()
        if (next === enabled) return
        enabled = next
        if (!enabled) hide()
      }

      tstage.addEventListener('pointerenter', onEnter)
      tstage.addEventListener('pointerleave', onLeave)
      tstage.addEventListener('pointermove', onMove)
      const mqCoarse = window.matchMedia('(pointer: coarse)')
      const mqNarrow = window.matchMedia('(max-width: 760px)')
      const onMq = () => syncEnabled()
      mqCoarse.addEventListener?.('change', onMq)
      mqNarrow.addEventListener?.('change', onMq)
      cleanup.push(() => {
        hide()
        tstage.removeEventListener('pointerenter', onEnter)
        tstage.removeEventListener('pointerleave', onLeave)
        tstage.removeEventListener('pointermove', onMove)
        mqCoarse.removeEventListener?.('change', onMq)
        mqNarrow.removeEventListener?.('change', onMq)
        if (raf) cancelAnimationFrame(raf)
        cursor.remove()
      })
    })()

    /* ================= ACT 3: dive into the pouch (frame-scrub) ================= */
    ;(() => {
      const sz = $('bb-sz'); if (!sz) return
      const sstage = sz.querySelector('.sstage') as HTMLElement
      const shead = $('bb-shead') as HTMLElement
      const canvas = $('bb-scrub') as HTMLCanvasElement
      const insidehead = $('bb-insidehead') as HTMLElement
      const drops = [1, 2, 3, 4, 5, 6, 7].map((i) => $(`bb-drop${i}`)).filter(Boolean) as HTMLElement[]
      const stamp = $('bb-stamp') as HTMLElement
      const benefits = $('bb-benefits') as HTMLElement
      if (!sstage || !canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      /* single AI-rendered clip scrubbed by scroll progress — the dive into
         the box (final.mp4). Frames are motion-interpolated to 120fps
         (5x the 24fps source) so the scrub stays smooth under fast scrolling. */
      const SEQS = [
        { dir: 'final', count: 716, from: 0.0, to: 1.0 },
      ]
      const FRAME_CONCURRENCY = 6
      const frames: (HTMLImageElement | null)[][] = SEQS.map(() => [])
      const frameLoaded = SEQS.map(() => [] as boolean[])
      let firstPainted = false
      let loadingStarted = false
      let loadingAborted = false
      let inFlight = 0
      const pending = new Set<string>()
      const queued = new Set<string>()
      const queue: Array<{ si: number; i: number; priority: number }> = []

      const frameKey = (si: number, i: number) => `${si}:${i}`
      const frameSrc = (dir: string, i: number) =>
        `/frames/${dir}/frame_${String(i + 1).padStart(4, '0')}.webp`

      const markFrameLoaded = (si: number, i: number) => {
        if (frameLoaded[si][i]) return
        frameLoaded[si][i] = true
        if (!firstPainted && si === 0 && i === 0) {
          firstPainted = true
          draw(0, 0)
        }
      }

      const loadFrame = (si: number, i: number) => {
        const key = frameKey(si, i)
        if (pending.has(key) || frameLoaded[si][i]) return
        pending.add(key)
        inFlight++

        const s = SEQS[si]
        let im = frames[si][i]
        if (!im) {
          im = new Image()
          frames[si][i] = im
        }

        const finish = () => {
          pending.delete(key)
          queued.delete(key)
          inFlight--
          markFrameLoaded(si, i)
          pumpQueue()
        }

        if (im.complete && im.naturalWidth) {
          finish()
          return
        }

        im.onload = finish
        im.onerror = finish
        im.src = frameSrc(s.dir, i)
      }

      const pumpQueue = () => {
        if (loadingAborted) return
        queue.sort((a, b) => a.priority - b.priority || a.i - b.i)
        while (inFlight < FRAME_CONCURRENCY && queue.length) {
          const job = queue.shift()
          if (!job) break
          loadFrame(job.si, job.i)
        }
      }

      const enqueueFrame = (si: number, i: number, priority = 1) => {
        const key = frameKey(si, i)
        if (frameLoaded[si][i] || pending.has(key) || queued.has(key)) return
        queued.add(key)
        queue.push({ si, i, priority })
      }

      const startFrameLoading = (priorityFrame = 0) => {
        if (loadingStarted || loadingAborted) return
        loadingStarted = true

        SEQS.forEach((s, si) => {
          frameLoaded[si] = new Array(s.count).fill(false)
          for (let i = 0; i < s.count; i++) {
            enqueueFrame(si, i, i === priorityFrame ? 0 : 1 + i)
          }
        })
        pumpQueue()
      }

      const prioritizeFrame = (si: number, fi: number) => {
        if (!loadingStarted) {
          startFrameLoading(fi)
          return
        }
        enqueueFrame(si, fi, -2)
        for (let offset = 1; offset <= 24; offset++) {
          enqueueFrame(si, fi - offset, -1)
          enqueueFrame(si, fi + offset, 0)
        }
        pumpQueue()
      }

      /* defer the 716-frame prefetch until the user is near Act 3 */
      const prefetchObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            startFrameLoading(0)
            prefetchObserver.disconnect()
          }
        },
        { rootMargin: '120% 0px' },
      )
      prefetchObserver.observe(sz)
      cleanup.push(() => {
        loadingAborted = true
        prefetchObserver.disconnect()
      })

      let vw = 0, vh = 0, dpr = 1, targetP = 0, raf = 0, activeDrop = -1
      let lastSeq = -1, lastFrame = -1
      const fit = () => {
        vw = sstage.clientWidth; vh = sstage.clientHeight
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.round(vw * dpr)
        canvas.height = Math.round(vh * dpr)
        lastSeq = -1; lastFrame = -1
      }

      const draw = (si: number, fi: number) => {
        const im = frames[si]?.[fi]
        if (!im || !im.complete || !im.naturalWidth) return
        const cw = canvas.width, ch = canvas.height
        const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight)
        const dw = im.naturalWidth * s, dh = im.naturalHeight * s
        ctx.drawImage(im, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
        lastSeq = si; lastFrame = fi
      }
      const paint = (p: number) => {
        let si = 0
        for (let i = 0; i < SEQS.length; i++) if (p >= SEQS[i].from) si = i
        const s = SEQS[si]
        const local = clamp((p - s.from) / (s.to - s.from || 1), 0, 1)
        const fi = Math.min(s.count - 1, Math.floor(local * s.count))
        if (diving && (!frames[si]?.[fi]?.complete || !frames[si]?.[fi]?.naturalWidth)) {
          prioritizeFrame(si, fi)
        }
        if (si !== lastSeq || fi !== lastFrame) draw(si, fi)
      }

      /* overlay copy beats — seven benefit drops while diving, offer at the end */
      const FEATW = Array.from({ length: 7 }, (_, i) => {
        const st = 0.3 + i * 0.085
        return [st, st + 0.073] as [number, number]
      })
      const BENE_P = 0.92
      const dropFor = (p: number) => { for (let i = 0; i < FEATW.length; i++) if (p >= FEATW[i][0] && p <= FEATW[i][1]) return i; return -1 }

      const update = (p: number) => {
        const f = dropFor(p)
        if (f !== activeDrop) {
          activeDrop = f
          drops.forEach((el, i) => el.classList.toggle('show', i === f))
        }
        /* the price stamp is visible from the moment you land on the page */
        stamp?.classList.add('show')
        benefits?.classList.toggle('show', p >= BENE_P)
        if (shead) shead.style.opacity = `${clamp(1 - p / 0.08, 0, 1)}`
        if (insidehead) insidehead.style.opacity = `${clamp((p - 0.3) / 0.04, 0, 1) * clamp(1 - (p - 0.56) / 0.05, 0, 1)}`
      }

      /* the frame-by-frame scrub only arms itself when the user clicks
         "Dive in" — the runway expands and scroll drives the frames like
         before. Without the click the section is one screen tall and
         scrolling simply continues past it. */
      let diving = false
      const prog = () => { const r = sz.getBoundingClientRect(); const d = sz.offsetHeight - vh; return d <= 0 ? 0 : clamp(-r.top / d, 0, 1) }
      const onScroll = () => {
        if (!diving) return
        targetP = prog()
        update(targetP)
      }
      const diveBtn = $('bb-divebtn')
      const diveOutBtn = $('bb-diveout')
      const onDive = () => {
        if (diving) return
        startFrameLoading(0)
        diving = true
        sz.classList.add('diving')
        diveBtn?.classList.add('off')
        diveOutBtn?.classList.add('show')
        /* snap the stage flush to the top so the scrub starts from frame one */
        const r = sz.getBoundingClientRect()
        getLenis()?.scrollTo(window.scrollY + r.top, { immediate: true })
        requestAnimationFrame(() => { fit(); onScroll() })
      }
      diveBtn?.addEventListener('click', onDive)
      cleanup.push(() => diveBtn?.removeEventListener('click', onDive))

      /* "Dive out": cancel the dive any time — collapse the runway, rewind
         to the first frame and hand the scroll back */
      const onDiveOut = () => {
        if (!diving) return
        diving = false
        sz.classList.remove('diving')
        diveBtn?.classList.remove('off')
        diveOutBtn?.classList.remove('show')
        targetP = 0
        update(0)
        const r = sz.getBoundingClientRect()
        getLenis()?.scrollTo(window.scrollY + r.top, { immediate: true })
        requestAnimationFrame(() => fit())
      }
      diveOutBtn?.addEventListener('click', onDiveOut)
      cleanup.push(() => diveOutBtn?.removeEventListener('click', onDiveOut))

      const render = () => {
        paint(targetP)
        raf = requestAnimationFrame(render)
      }

      fit(); update(0); render()
      window.addEventListener('scroll', onScroll, { passive: true })
      makeViewportWatcher(() => { fit(); onScroll() })
      cleanup.push(() => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
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

          <div className="cap left"><span className="kicker">01 — Rolled Oat</span><h2>Oats for steady energy</h2><p className="type"></p></div>
          <div className="cap right"><span className="kicker">02 — Dark Chocolate</span><h2>A tasty mood lift</h2><p className="type"></p></div>
          <div className="cap left"><span className="kicker">03 — Hoodia</span><h2>Keeps hunger in check</h2><p className="type"></p></div>

          <div className="taphint" id="bb-taphint">Tap an ingredient</div>
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
              <div className="chead"><span className="t">Nutrition Facts</span><span className="u">Per 100g</span></div>
              <div className="row" data-to="507" data-dec="0" data-unit=" kcal"><span className="lab">Energy</span><span className="val">507 kcal</span></div>
              <div className="row" data-to="57.8" data-dec="1" data-unit=" g"><span className="lab">Carbohydrate</span><span className="val">57.8 g</span></div>
              <div className="row" data-to="6.9" data-dec="1" data-unit=" g"><span className="lab">Protein</span><span className="val">6.9 g</span></div>
              <div className="row" data-to="26.8" data-dec="1" data-unit=" g"><span className="lab">Fat</span><span className="val">26.8 g</span></div>
              <div className="row" data-to="24.6" data-dec="1" data-unit=" g"><span className="lab">Total Sugars</span><span className="val">24.6 g</span></div>
              <div className="row" data-to="469" data-dec="0" data-unit=" mg"><span className="lab">Sodium</span><span className="val">469 mg</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACT 3: dive into the pouch ===== */}
      <section className="smartzone" id="bb-sz" aria-label="Inside the pouch">
        <div className="sstage">
          <div className="shead" id="bb-shead">
            <div className="kicker">Smart Snacking</div>
            <h2>Come inside the pouch</h2>
          </div>

          {/* cinematic AI frame-scrub: the pouch bursting open with cookies */}
          <div className="scrubwrap">
            <canvas id="bb-scrub" aria-label="Camera diving inside the Box Bites pouch" />
            <div className="scrubvignette" aria-hidden="true"></div>
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

          <div className="stamp" id="bb-stamp">
            <span className="s1">2 PACK</span>
            <span className="s2">RM&nbsp;30</span>
            <span className="s3">only!</span>
          </div>
          <button className="divebtn" id="bb-divebtn" type="button">Dive into the box ↓</button>
          <button className="diveoutbtn" id="bb-diveout" type="button">Dive out ↑</button>

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