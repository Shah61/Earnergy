import { useRef } from 'react'
import { ASSETS } from './constants'
import { useBoxBitesContentAnimations } from './useBoxBitesContentAnimations'
import './box-bites-content.css'

const NUTRITION_ROWS = [
  { label: 'Energy', to: 507, dec: 0, unit: ' kcal' },
  { label: 'Carbohydrate', to: 57.8, dec: 1, unit: ' g' },
  { label: 'Protein', to: 6.9, dec: 1, unit: ' g' },
  { label: 'Fat', to: 26.8, dec: 1, unit: ' g' },
  { label: 'Total Sugars', to: 24.6, dec: 1, unit: ' g' },
  { label: 'Sodium', to: 469, dec: 0, unit: ' mg' },
] as const

export function BoxBitesContent() {
  const rootRef = useRef<HTMLDivElement>(null)
  useBoxBitesContentAnimations(rootRef)

  return (
    <div ref={rootRef} className="box-bites-content">
      <section className="tablezone" id="tz" aria-label="Nutrition facts">
        <div className="tstage">
          <div className="thead-overlay" id="theadOverlay">
            <div className="kicker">Per 100g</div>
            <h2>The numbers, bite by bite</h2>
          </div>
          <div className="persp">
            <div className="card3d" id="card3d">
              <img
                className="faller"
                id="faller"
                src={ASSETS.nodeProduct}
                alt=""
                aria-hidden="true"
              />
              <div className="fshadow" id="fshadow" />
              <div className="chead">
                <span className="t">Nutrition Facts</span>
                <span className="u">Per 100g</span>
              </div>
              {NUTRITION_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="row"
                  data-to={String(row.to)}
                  data-dec={String(row.dec)}
                  data-unit={row.unit}
                >
                  <span className="lab">{row.label}</span>
                  <span className="val">0{row.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="smartzone" id="sz" aria-label="Inside the bag">
        <div className="sstage">
          <div className="shead" id="shead">
            <div className="kicker">Smart Snacking</div>
            <h2>
              Healthy Cookies That
              <br />
              Box Your Cravings
            </h2>
            <div className="script">let&rsquo;s look inside the bag&hellip;</div>
          </div>

          <div className="ppersp">
            <div className="pouchwrap" id="pouchwrap">
              <img
                id="pouchImg"
                src={ASSETS.pouch}
                alt="Box Bites pouch by Earnergy"
              />
              <div className="mouth" id="mouth" />
            </div>
          </div>

          <div className="iris" id="iris" />

          <div className="inside" id="inside">
            <div className="grain" />
            <div className="speckl" id="speckl" />
            <div className="fallworld" id="fallworld">
              <div className="station" data-i="0">
                <div className="img">
                  <img id="stOat" src={ASSETS.nodeOat} alt="" />
                </div>
                <div className="txt">
                  <div className="k">01 &mdash; Functional Ingredient</div>
                  <div className="t">High Fiber Oats</div>
                  <div className="d">
                    Supports fullness &amp; healthy digestion &mdash; slow fuel
                    that keeps you going.
                  </div>
                </div>
              </div>
              <div className="station rev" data-i="1">
                <div className="img">
                  <img id="stChoc" src={ASSETS.nodeChoc} alt="" />
                </div>
                <div className="txt">
                  <div className="k">02 &mdash; Functional Ingredient</div>
                  <div className="t">Premium Dark Chocolate</div>
                  <div className="d">
                    Deliciously satisfying &mdash; a better snacking experience
                    in every bite.
                  </div>
                </div>
              </div>
              <div className="station" data-i="2">
                <div className="img">
                  <img id="stHoodia" src={ASSETS.nodeHoodia} alt="" />
                </div>
                <div className="txt">
                  <div className="k">03 &mdash; Functional Ingredient</div>
                  <div className="t">
                    Hoodia Extract<span className="new">New</span>
                  </div>
                  <div className="d">
                    Traditionally known for appetite control &mdash; helps reduce
                    cravings naturally.
                  </div>
                </div>
              </div>
              <div className="station rev" data-i="3">
                <div className="img">
                  <div className="nosugar">
                    <i />
                  </div>
                </div>
                <div className="txt">
                  <div className="k">04 &mdash; Functional Ingredient</div>
                  <div className="t">No Added White Sugar</div>
                  <div className="d">
                    Naturally sweetened. The smarter choice for everyday
                    snacking.
                  </div>
                </div>
              </div>
              <div className="landing" id="landing">
                <div className="stamp" id="stamp">
                  <span className="s1">2 PACK</span>
                  <span className="s2">RM&nbsp;30</span>
                  <span className="s3">only!</span>
                </div>
                <div className="powered">
                  Powered with Hoodia Extract &mdash; enjoy guilt-free snacking
                  that supports your goals
                </div>
                <div className="rowc">
                  <span className="bchip">High Fiber</span>
                  <span className="bchip">Craving Control</span>
                  <span className="bchip">Longer Fullness</span>
                  <span className="bchip">Diet Support</span>
                </div>
              </div>
            </div>
            <div className="insidehead" id="insidehead">
              <div className="kicker">Inside the bag</div>
              <div className="script">what makes every bite work</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="outro">
        <div className="script">
          Goodbye Sugar,<span className="w">Hello Energy</span>
        </div>
        <p className="made">
          Made with hearty rolled oats, rich dark chocolate, and a touch of
          Hoodia.
        </p>
        <div className="foot">
          Distributed by Earnergy Circle Solution · 202503225207 ·
          (003764513-X)
        </div>
        <div className="price">
          <span>
            RM <b>15.00</b> sm
          </span>
          <span>
            RM <b>17.00</b> ss
          </span>
        </div>
        <div className="badges">
          Halal · MeSTI Certified · Made in Malaysia · Buatan Malaysia
        </div>
      </footer>
    </div>
  )
}
