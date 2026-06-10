import { useRef } from 'react'
import { ASSETS, TRANSITION_SRC } from './constants'
import { useBoxBitesContentAnimations } from './useBoxBitesContentAnimations'
import './box-bites-product-tour.css'

const NUTRITION_ROWS = [
  { label: 'Energy', to: 507, dec: 0, unit: ' kcal' },
  { label: 'Carbohydrate', to: 57.8, dec: 1, unit: ' g' },
  { label: 'Protein', to: 6.9, dec: 1, unit: ' g' },
  { label: 'Fat', to: 26.8, dec: 1, unit: ' g' },
  { label: 'Total Sugars', to: 24.6, dec: 1, unit: ' g' },
  { label: 'Sodium', to: 469, dec: 0, unit: ' mg' },
] as const

export function BoxBitesProductTour() {
  const rootRef = useRef<HTMLDivElement>(null)
  useBoxBitesContentAnimations(rootRef)

  return (
    <div ref={rootRef} className="box-bites-product-tour">
      <section
        className="experience"
        id="exp"
        aria-label="Box Bites ingredient tour"
      >
        <div className="stage">
          <div className="stage-inner" id="stageInner">
            <div className="world" id="world">
              <svg
                className="links"
                viewBox="0 0 1600 1000"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M 960 392 C 1060 330, 1130 320, 1212 312" />
                <path d="M 648 500 C 560 470, 500 500, 452 506" />
                <path d="M 960 608 C 1060 680, 1135 698, 1212 706" />
                <path d="M 1196 300 L 1216 311 L 1198 326" />
                <path d="M 470 492 L 449 506 L 470 520" />
                <path d="M 1198 692 L 1216 706 L 1197 720" />
              </svg>
              <div
                className="node product"
                id="nodeProduct"
                style={{ left: 800, top: 500 }}
              >
                <div className="floatwrap" style={{ width: 380 }}>
                  <img
                    className="cut"
                    src={ASSETS.nodeProduct}
                    alt="Box Bites snack square"
                  />
                </div>
                <div className="tag-prod">Box&nbsp;Bites</div>
              </div>
              <div
                className="node disc"
                id="nodeOat"
                style={{ left: 1235, top: 300 }}
              >
                <div
                  className="floatwrap"
                  style={{ width: 300, animationDelay: '-1.4s' }}
                >
                  <img className="cut" src={ASSETS.nodeOat} alt="Rolled oats" />
                </div>
                <div className="badge">Rolled&nbsp;Oat</div>
              </div>
              <div
                className="node disc"
                id="nodeChoc"
                style={{ left: 360, top: 510 }}
              >
                <div
                  className="floatwrap"
                  style={{ width: 230, animationDelay: '-3.1s' }}
                >
                  <img
                    className="cut"
                    src={ASSETS.nodeChoc}
                    alt="Dark chocolate curl"
                  />
                </div>
                <div className="badge">Dark&nbsp;Chocolate</div>
              </div>
              <div
                className="node disc"
                id="nodeHoodia"
                style={{ left: 1235, top: 715 }}
              >
                <div
                  className="floatwrap"
                  style={{ width: 260, animationDelay: '-2.2s' }}
                >
                  <img
                    className="cut"
                    src={ASSETS.nodeHoodia}
                    alt="Hoodia flower"
                  />
                </div>
                <div className="badge">Hoodia</div>
              </div>
            </div>
          </div>

          <div className="intro" id="intro">
            <div className="script">Goodbye Sugar, Hello Energy</div>
            <span className="pill">Premium Formula</span>
            <h1>
              Snack smart with
              <br />
              Box&nbsp;Bites
            </h1>
            <p>
              Made with hearty rolled oats, rich dark chocolate, and a touch of
              Hoodia &mdash; these bites are made to crush your cravings and
              keep you powered up anytime, anywhere.
            </p>
          </div>

          <div className="cap center" data-beat="0">
            <span className="kicker">The bite</span>
            <h2>Four things, one bite</h2>
            <p className="type" />
          </div>
          <div className="cap left" data-beat="1">
            <span className="kicker">01 &mdash; Rolled Oat</span>
            <h2>Oats for steady energy</h2>
            <p className="type" />
          </div>
          <div className="cap right" data-beat="2">
            <span className="kicker">02 &mdash; Dark Chocolate</span>
            <h2>A tasty mood lift</h2>
            <p className="type" />
          </div>
          <div className="cap left" data-beat="3">
            <span className="kicker">03 &mdash; Hoodia</span>
            <h2>Keeps hunger in check</h2>
            <p className="type" />
          </div>

          <nav className="rail" id="rail" aria-hidden="true">
            <span className="seg">
              <i />
            </span>
            <span className="seg">
              <i />
            </span>
            <span className="seg">
              <i />
            </span>
            <span className="seg">
              <i />
            </span>
          </nav>
          <div className="keepscroll" id="keepscroll">
            Keep scrolling
          </div>
        </div>
      </section>

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

      <section className="vidzone" id="vz" aria-label="Into the bag">
        <div className="vstage">
          <video
            id="tvid"
            src={TRANSITION_SRC}
            muted
            playsInline
            preload="auto"
          />
          <div className="filmgrade" />
          <div className="vcap" id="vcap">
            <div className="kicker">And every bite</div>
            <div className="script">goes straight into the bag&hellip;</div>
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
