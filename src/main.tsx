import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import '@home/styles/globals.css'
import { HomePage } from '@home/pages/HomePage'

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

/* every route change starts at the top of the new page */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* the full Box Bites / KOFÈ animated experience */}
          <Route path="/products" element={<App />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
