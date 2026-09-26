import { StrictMode, Suspense, lazy, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import '@home/styles/globals.css'
import '@home/styles/reseller.css'
import { HomePage } from '@home/pages/HomePage'
import { ResellerGate } from '@home/components/layout'

/* each page loads its own chunk so the landing page ships only landing code */
const App = lazy(() => import('./App.tsx'))
const ContactPage = lazy(() =>
  import('@home/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const JoinPage = lazy(() =>
  import('@home/pages/JoinPage').then((m) => ({ default: m.JoinPage })),
)

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)
document.body.style.overflow = ''

window.addEventListener('pageshow', (event) => {
  if (event.persisted) window.scrollTo(0, 0)
})

/* each page checks the reseller code in its URL before showing; keyed per
   page so moving between pages starts a fresh check */
const homePage = (
  <ResellerGate key="home" path="/">
    <HomePage />
  </ResellerGate>
)
const joinPage = (
  <ResellerGate key="join" path="/join">
    <JoinPage />
  </ResellerGate>
)
const contactPage = (
  <ResellerGate key="contact" path="/contact">
    <ContactPage />
  </ResellerGate>
)

/* every route change starts at the top of the new page — or, for a link
   like "/#reseller", at that section, clear of the sticky header. The page
   may still be on its way (a lazy chunk, a reseller-code check), so the
   section is looked for over a few frames */
function ScrollOnNavigate() {
  const { pathname, hash, key } = useLocation()
  const lastPathname = useRef<string | null>(null)

  useEffect(() => {
    const samePage = lastPathname.current === pathname
    lastPathname.current = pathname

    if (!samePage || !hash) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    if (!hash) return

    const giveUpAt = performance.now() + 3000
    let frame = 0
    const seek = () => {
      const target = document.getElementById(hash.slice(1))
      if (!target) {
        if (performance.now() < giveUpAt) frame = requestAnimationFrame(seek)
        return
      }
      const headerHeight = document.getElementById('header')?.offsetHeight ?? 0
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
        // glide within the page; a fresh page just opens there
        behavior: samePage && !reduceMotion ? 'smooth' : 'auto',
      })
    }
    seek()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollOnNavigate />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={homePage} />
          {/* the full Box Bites / KOFÈ animated experience */}
          <Route path="/products" element={<App />} />
          {/* affiliate share links: buy buttons carry this upline code */}
          <Route path="/products/:uplinecode" element={<App />} />
          <Route path="/contact" element={contactPage} />
          <Route path="/contact/:uplinecode" element={contactPage} />
          <Route path="/join" element={joinPage} />
          <Route path="/join/:uplinecode" element={joinPage} />
          {/* reseller share links: the whole site under their code, e.g. /5141 */}
          <Route path="/:uplinecode" element={homePage} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
