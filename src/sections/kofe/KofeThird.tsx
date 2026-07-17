const IMAGE1 = 'kofe/nondairy.png'
const IMAGE2 = 'kofe/arabica.png'
const IMAGE3 = 'kofe/coconut.png'
const IMAGE4 = 'kofe/vanilla.png'
const IMAGE5 = 'kofe/tricalcium.png'
const IMAGE6 = 'kofe/chicory.png'
const IMAGE7 = 'kofe/stevia.png'
const IMAGE8 = 'kofe/mct.png'
const IMAGE9 = 'kofe/probiotic.png'
const IMAGE10 = 'kofe/monkfruit.png'
const CUP = 'kofe/cup.png'
const PACKSHOT = 'kofe/kofebox.png'

import { useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'

type Ing = { src: string; name: string; desc: string }
const LEFT: Ing[] = [
  { src: IMAGE2, name: 'Arabica Coffee', desc: 'premium beans, natural focus' },
  { src: IMAGE3, name: 'Coconut Milk', desc: 'plant-based creaminess' },
  { src: IMAGE1, name: 'Nondairy Creamer', desc: 'silky body, zero dairy' },
  { src: IMAGE4, name: 'Vanilla', desc: 'warm, smooth aroma' },
  { src: IMAGE5, name: 'Tricalcium Phosphate', desc: 'an extra shot of calcium' },
]
const RIGHT: Ing[] = [
  { src: IMAGE10, name: 'Monk Fruit', desc: 'natural sweetness, no white sugar' },
  { src: IMAGE7, name: 'Stevia', desc: 'sweet, with zero sugar' },
  { src: IMAGE8, name: 'MCT Oil', desc: 'clean fuel for focus & energy' },
  { src: IMAGE6, name: 'Chicory Root Inulin', desc: 'prebiotic fibre for your gut' },
  { src: IMAGE9, name: 'Probiotic', desc: 'good bacteria, happy tummy' },
]

/* reveal order: cards appear one by one, alternating left / right */
const delayFor = (side: 'l' | 'r', i: number) => 0.15 + (i * 2 + (side === 'l' ? 0 : 1)) * 0.14

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Anton&family=Caveat:wght@600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
.gd-root{--cream:#f3e9d7;--cream-lt:#f9f2e4;--esp:#241509;--esp-2:#3a2417;--latte:#c89a6b;--gold:#c9a25e;--yellow:#f5c518;
  --tx:#2a1a0e;--tx-soft:rgba(42,26,14,.7);--tx-kick:#a06a2f;
  font-family:"Manrope",system-ui,sans-serif;color:var(--tx);-webkit-font-smoothing:antialiased;background:var(--cream)}
.gd-root *{box-sizing:border-box;margin:0;padding:0}
.gd-zone{position:relative}
.gd-stage{position:relative;min-height:100svh;width:100%;overflow:hidden;background:var(--cream);
  background-image:radial-gradient(rgba(42,26,14,.07) 1.1px,transparent 1.1px);background-size:32px 32px;
  display:flex;flex-direction:column;align-items:center;
  padding:clamp(18px,3.5vh,44px) clamp(14px,3vw,48px) clamp(40px,6vh,64px)}

/* heading */
.gd-head{text-align:center;position:relative;z-index:5}
.gd-head .k{font-family:"Anton",sans-serif;font-size:clamp(10px,1.3vw,13px);letter-spacing:.4em;text-transform:uppercase;color:var(--gold)}
.gd-head h2{font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(30px,4.4vw,54px);line-height:.94;color:var(--esp);letter-spacing:-.02em;margin:.08em 0 .04em}
.gd-head p{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(20px,2.5vw,32px);color:var(--gold)}

/* cup flanked by the two card columns */
.gd-wrap{position:relative;z-index:2;flex:1;width:100%;max-width:1680px;margin:0 auto;
  display:flex;align-items:center;justify-content:center;gap:clamp(18px,3.4vw,64px);padding-top:clamp(10px,2vh,26px)}
.gd-col{display:flex;flex-direction:column;gap:clamp(10px,1.8vh,18px);width:clamp(240px,24vw,360px)}

.gd-center{position:relative;text-align:center;flex:0 0 auto}
.gd-center::before{content:"";position:absolute;left:50%;top:44%;width:130%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;
  background:radial-gradient(circle,rgba(201,162,94,.26) 0%,rgba(201,162,94,.1) 45%,transparent 70%);pointer-events:none}
.gd-center img{position:relative;height:clamp(240px,44vh,480px);width:auto;max-width:36vw;object-fit:contain;margin-left:auto;margin-right:auto;
  filter:drop-shadow(0 32px 40px rgba(20,10,4,.34));animation:gd-bob 6s ease-in-out infinite alternate}
@keyframes gd-bob{from{transform:translateY(-6px)}to{transform:translateY(6px)}}
.gd-center .pill{position:relative;display:inline-block;margin-top:clamp(10px,2vh,20px);font-family:"Anton",sans-serif;font-size:clamp(11px,1.2vw,14px);
  letter-spacing:.2em;text-transform:uppercase;color:var(--esp);background:var(--yellow);border:none;border-radius:999px;
  padding:13px 24px;cursor:pointer;box-shadow:0 16px 32px rgba(20,10,4,.24);animation:gd-pulse 2.2s ease-in-out infinite;
  transition:opacity .45s ease,transform .45s ease;font-family:"Anton",sans-serif}
@keyframes gd-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
.gd-root.on .gd-center .pill{opacity:0;transform:scale(.8);pointer-events:none;animation:none}

/* ingredient cards */
.gd-card{display:flex;align-items:center;gap:clamp(10px,1.1vw,16px);text-align:left;
  background:var(--cream-lt);border:1px solid rgba(42,26,14,.12);border-radius:14px;padding:clamp(9px,1.4vh,14px) clamp(10px,1.2vw,16px);
  box-shadow:0 10px 24px rgba(20,10,4,.08);opacity:0;transition:opacity .6s ease,transform .6s cubic-bezier(.2,.9,.3,1.2)}
.gd-col.l .gd-card{transform:translateX(-30px)}
.gd-col.r .gd-card{transform:translateX(30px)}
.gd-root.on .gd-card{opacity:1;transform:none}
.gd-card img{height:clamp(40px,6vh,58px);width:clamp(40px,6vh,58px);object-fit:contain;flex:0 0 auto;
  filter:drop-shadow(0 6px 10px rgba(15,8,3,.18))}
.gd-card .nm{font-family:"Anton",sans-serif;font-size:clamp(11px,1.05vw,14px);letter-spacing:.12em;text-transform:uppercase;color:var(--esp);line-height:1.25}
.gd-card .ds{margin-top:2px;font-family:"Caveat",cursive;font-weight:700;font-size:clamp(15px,1.4vw,19px);line-height:1.1;color:var(--tx-kick)}

/* scroll-on hint after reveal */
.gd-more{position:relative;z-index:2;margin-top:clamp(10px,2vh,20px);
  font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx-soft);
  opacity:0;transition:opacity .5s ease 1.9s}
.gd-root.on .gd-more{opacity:1}

/* ================= 2-box bundle ================= */
.gd-outro{position:relative;min-height:88svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  padding:clamp(50px,8vh,90px) 24px;overflow:hidden;
  background:radial-gradient(120% 90% at 50% 26%,var(--cream-lt) 0%,var(--cream) 52%,#e6d6bb 100%)}
.gd-outro .k{font-family:"Anton",sans-serif;font-size:clamp(10px,1.3vw,13px);letter-spacing:.4em;text-transform:uppercase;color:var(--tx-kick)}
.gd-outro h3{font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(30px,4.6vw,58px);line-height:.96;color:var(--esp);margin:.14em 0 .1em}
.gd-outro .sub{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(19px,2.4vw,30px);color:var(--gold)}
.gd-packs{position:relative;margin:clamp(18px,3.5vh,38px) 0 clamp(12px,2.4vh,26px);height:clamp(220px,34vh,380px);
  width:min(92vw,620px);display:flex;align-items:flex-end;justify-content:center}
.gd-packs img{height:100%;width:auto;object-fit:contain;filter:drop-shadow(0 26px 32px rgba(20,10,4,.3))}
.gd-packs .p1{transform:rotate(-7deg) translateX(12%)}
.gd-packs .p2{transform:rotate(6deg) translateX(-12%) translateY(-3%)}
.gd-packs .x2{position:absolute;right:8%;top:2%;width:clamp(64px,9vw,96px);aspect-ratio:1;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:var(--yellow);color:var(--esp);font-family:"Anton",sans-serif;font-size:clamp(22px,3vw,34px);
  box-shadow:0 14px 28px rgba(20,10,4,.28);transform:rotate(12deg);animation:gd-pulse 2.4s ease-in-out infinite}
.gd-outro .price{font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(42px,7vw,76px);color:var(--esp);
  border-bottom:5px solid var(--yellow);display:inline-block;padding:0 .14em .02em}
.gd-outro .price .per{font-family:"Caveat",cursive;font-weight:700;font-size:clamp(18px,2.4vw,28px);color:var(--tx-kick);margin-left:10px}
.gd-outro .scr{margin-top:14px;font-family:"Caveat",cursive;font-weight:700;font-size:clamp(24px,4vw,44px);color:var(--gold)}

/* ============ TABLET ============ */
@media (max-width:1100px){
  .gd-col{width:clamp(210px,26vw,280px)}
  .gd-center img{height:clamp(220px,36vh,380px)}
}

/* ============ PHONE: cup on top, cards flow in a 2-col grid ============ */
@media (max-width:780px){
  .gd-stage{padding-left:12px;padding-right:12px}
  .gd-wrap{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch;padding-top:12px}
  .gd-center{grid-column:1/-1;order:-1;margin-bottom:8px}
  .gd-center img{height:min(30vh,250px);max-width:70vw}
  .gd-col{display:contents}
  .gd-col.l .gd-card{transform:translateY(16px)}
  .gd-col.r .gd-card{transform:translateY(16px)}
  .gd-card{flex-direction:column;text-align:center;gap:6px;padding:12px 8px}
  .gd-card img{height:46px;width:46px}
  .gd-more{display:none}
  .gd-packs{height:min(30vh,250px)}
}

/* ============ SMALL PHONE ============ */
@media (max-width:400px){
  .gd-card .nm{font-size:10px}
  .gd-card .ds{font-size:13.5px}
  .gd-center img{height:min(26vh,210px)}
}

@media (prefers-reduced-motion:reduce){
  .gd-center img,.gd-center .pill,.gd-packs .x2{animation:none}
}
`

export default function KofeBoard() {
  const activeProduct = useAppStore((s) => s.activeProduct)
  useEffect(() => {
    if (activeProduct !== 'kofe') return
    const cleanup: Array<() => void> = []
    const root = document.getElementById('gd-root')
    const pill = document.getElementById('gd-see')
    if (!root || !pill) return
    const reveal = () => root.classList.add('on')
    pill.addEventListener('click', reveal)
    cleanup.push(() => pill.removeEventListener('click', reveal))
    return () => cleanup.forEach((fn) => fn())
  }, [activeProduct])

  return (
    <div className="gd-root" id="gd-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="gd-zone" id="gd-zone" aria-label="Kofé — the ingredients">
        <div className="gd-stage" id="gd-stage">
          <div className="gd-head">
            <div className="k">Earnergy — Kofé</div>
            <h2>KOFE Ingredients</h2>
            <p>Spanish Latte</p>
          </div>

          <div className="gd-wrap">
            <div className="gd-col l">
              {LEFT.map((ing, i) => (
                <div className="gd-card" key={ing.name} style={{ transitionDelay: `${delayFor('l', i)}s` }}>
                  <img src={ing.src} alt={ing.name} draggable={false} />
                  <div>
                    <div className="nm">{ing.name}</div>
                    <div className="ds">{ing.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="gd-center">
              <img src={CUP} alt="Kofé Spanish Latte" draggable={false} />
              <br />
              <button className="pill" id="gd-see" type="button">See ingredients</button>
            </div>

            <div className="gd-col r">
              {RIGHT.map((ing, i) => (
                <div className="gd-card" key={ing.name} style={{ transitionDelay: `${delayFor('r', i)}s` }}>
                  <img src={ing.src} alt={ing.name} draggable={false} />
                  <div>
                    <div className="nm">{ing.name}</div>
                    <div className="ds">{ing.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gd-more">keep scrolling ↓</div>
        </div>
      </section>

      <footer className="gd-outro" id="gd-after">
        <div className="k">Bundle deal</div>
        <h3>Grab the 2-Box Bundle</h3>
        <div className="sub">double the boxes, double the energy</div>
        <div className="gd-packs">
          <img className="p1" src={PACKSHOT} alt="Kofé Spanish Latte box" draggable={false} />
          <img className="p2" src={PACKSHOT} alt="" aria-hidden="true" draggable={false} />
          <div className="x2">×2</div>
        </div>
        <div className="price">RM 30<span className="per">for 2 boxes</span></div>
        <div className="scr">goodbye sugar, hello energy</div>
      </footer>
    </div>
  )
}
