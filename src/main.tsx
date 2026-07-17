import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import '@home/styles/globals.css'
import App from './App.tsx'
import { HomePage } from '@home/pages/HomePage'
import { ContactPage } from '@home/pages/ContactPage'

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* the full Box Bites / KOFÈ animated experience */}
        <Route path="/products" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
