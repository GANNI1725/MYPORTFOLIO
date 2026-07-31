import { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import Navbar from './components/Navbar'
import Footer from './sections/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'

const RedModeLoader = lazy(() => import('./components/RedModeLoader'))
const Privacy = lazy(() => import('./pages/Privacy'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Terms = lazy(() => import('./pages/Terms'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ServerError = lazy(() => import('./pages/ServerError'))

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
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <RedModeLoader />
        </Suspense>
        <Footer />
      </ErrorBoundary>
    </ThemeProvider>
  )
}
