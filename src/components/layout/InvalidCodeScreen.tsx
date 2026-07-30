import { Link } from 'react-router-dom'

const LOGO = '/photos/logo2.webp'

const css = `
.ic-root{--ic-yellow:#f5c518;--ic-ink:#14110a;--ic-cream:#f6f2e7;--ic-green:#74c157;
  position:fixed;inset:0;z-index:100;overflow-y:auto;
  background:radial-gradient(120% 90% at 50% 12%,#1d1a12 0%,#111008 55%,#0a0906 100%);
  font-family:"Manrope",system-ui,-apple-system,sans-serif;color:var(--ic-cream);
  display:flex;align-items:center;justify-content:center;
  padding:clamp(24px,6vw,64px) clamp(18px,5vw,48px)}
.ic-root *{box-sizing:border-box;margin:0;padding:0}

.ic-glow{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
.ic-glow.a{width:min(60vw,520px);aspect-ratio:1;background:rgba(245,197,24,.14);top:-14%;left:-10%}
.ic-glow.b{width:min(52vw,440px);aspect-ratio:1;background:rgba(116,193,87,.12);bottom:-16%;right:-8%}
.ic-grid{position:absolute;inset:0;pointer-events:none;opacity:.5;
  background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1px);background-size:28px 28px}

.ic-card{position:relative;width:100%;max-width:620px;text-align:center;
  border:1px solid rgba(255,255,255,.1);border-radius:28px;
  background:rgba(255,255,255,.04);backdrop-filter:blur(6px);
  padding:clamp(30px,5.5vw,52px) clamp(22px,5vw,48px);
  box-shadow:0 40px 90px -40px rgba(0,0,0,.9)}

.ic-logo{height:clamp(30px,4.6vw,38px);width:auto;margin:0 auto clamp(22px,4vw,30px);display:block;opacity:.95}

.ic-badge{display:inline-flex;align-items:center;gap:8px;margin-bottom:clamp(18px,3vw,24px);
  border:1px solid rgba(245,197,24,.4);border-radius:999px;padding:7px 15px;
  background:rgba(245,197,24,.1);color:var(--ic-yellow);
  font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:700}
.ic-badge span.dot{width:6px;height:6px;border-radius:50%;background:var(--ic-yellow);
  animation:ic-pulse 1.8s ease-in-out infinite}
@keyframes ic-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.5);opacity:.5}}

.ic-card h1{font-size:clamp(26px,5.4vw,42px);line-height:1.1;letter-spacing:-.02em;font-weight:800;
  color:#fff;margin-bottom:clamp(12px,2.4vw,18px)}
.ic-card h1 em{font-style:normal;color:var(--ic-yellow)}

.ic-lead{font-size:clamp(14px,2.4vw,16px);line-height:1.7;color:rgba(246,242,231,.68);
  max-width:44ch;margin:0 auto}

.ic-code{display:inline-block;margin:clamp(18px,3vw,24px) 0 0;max-width:100%;overflow-wrap:anywhere;
  border:1px dashed rgba(255,255,255,.22);border-radius:14px;padding:11px 18px;
  background:rgba(0,0,0,.3);font-family:"JetBrains Mono",ui-monospace,monospace;
  font-size:clamp(12px,2.2vw,14px);color:rgba(246,242,231,.9)}
.ic-code b{color:#ff8f6b;font-weight:600}

.ic-hint{margin-top:clamp(20px,3.4vw,28px);padding-top:clamp(20px,3.4vw,26px);
  border-top:1px solid rgba(255,255,255,.09);
  font-size:clamp(13px,2.2vw,14.5px);line-height:1.7;color:rgba(246,242,231,.6)}
.ic-hint b{color:var(--ic-green);font-weight:700}

.ic-actions{margin-top:clamp(22px,3.6vw,30px);display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.ic-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border-radius:999px;padding:13px 26px;text-decoration:none;white-space:nowrap;
  font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:800;
  transition:transform .25s ease,background .25s ease,color .25s ease,box-shadow .25s ease}
.ic-btn--primary{background:var(--ic-yellow);color:var(--ic-ink);
  box-shadow:0 14px 30px -12px rgba(245,197,24,.7)}
.ic-btn--primary:hover{transform:translateY(-2px);background:#fff}
.ic-btn--ghost{border:1px solid rgba(255,255,255,.22);color:var(--ic-cream)}
.ic-btn--ghost:hover{transform:translateY(-2px);border-color:var(--ic-green);color:var(--ic-green)}

@media (max-width:420px){
  .ic-actions{flex-direction:column}
  .ic-btn{width:100%}
}
@media (prefers-reduced-motion:reduce){
  .ic-badge span.dot{animation:none}
  .ic-btn:hover{transform:none}
}
`

/** Shown when /products/<code> carries a code nobody ever activated. */
export function InvalidCodeScreen({ code }: { code: string }) {
  return (
    <div className="ic-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ic-glow a" aria-hidden="true" />
      <div className="ic-glow b" aria-hidden="true" />
      <div className="ic-grid" aria-hidden="true" />

      <main className="ic-card">
        <img className="ic-logo" src={LOGO} alt="Earnergy" />

        <div className="ic-badge">
          <span className="dot" aria-hidden="true" />
          Invalid Earnergy Reseller (Affiliate) Link
        </div>

        <h1>
          This code <em>doesn&apos;t exist</em>
        </h1>

        <p className="ic-lead">
          The Earnergy Reseller (Affiliate) code in this link was never activated, so we
          can&apos;t open the products page with it. Double-check the link you
          were given — it may have been typed or copied incorrectly.
        </p>

        <div className="ic-code">
          Code used: <b>{code}</b>
        </div>

        <p className="ic-hint">
          Got a code from your BeliBeli purchase? Activate it on the{' '}
          <b>Join Us</b> page first — you&apos;ll get your own working link
          straight away.
        </p>

        <div className="ic-actions">
          <Link className="ic-btn ic-btn--primary" to="/join">
            Activate My Code
          </Link>
          <Link className="ic-btn ic-btn--ghost" to="/products">
            Browse Products
          </Link>
        </div>
      </main>
    </div>
  )
}

export default InvalidCodeScreen
