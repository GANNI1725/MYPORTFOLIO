import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import Navbar from './components/Navbar'
import Footer from './sections/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import RedModeLoader from './components/RedModeLoader'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import AboutUs from './pages/AboutUs'
import Terms from './pages/Terms'
import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (pathname === '/' && hash) return // Home handles its own scroll
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setProgress(0)
      return
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
          ticking = false
        })
        ticking = true
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  if (!isHome) return null

  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<ServerError />}>
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <RedModeLoader />
        <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
          <defs>
            <filter id="cursed-smoke" x="-25%" y="-35%" width="150%" height="170%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.11" numOctaves="2" seed="7" result="noise">
                <animate attributeName="baseFrequency" dur="8s" values="0.02 0.11;0.028 0.14;0.02 0.11" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="cursed-smoke-strong" x="-30%" y="-40%" width="160%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.11" numOctaves="2" seed="7" result="noise">
                <animate attributeName="baseFrequency" dur="8s" values="0.02 0.11;0.028 0.14;0.02 0.11" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="red-logo-tint">
              <feColorMatrix in="SourceGraphic" type="matrix" values="
                0.9 0.1 0.0 0 0.05
                0.1 0.4 0.1 0 0.0
                0.1 0.15 0.35 0 0.0
                0.0 0.0 0.0 1 0.0" />
            </filter>
          </defs>
        </svg>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
