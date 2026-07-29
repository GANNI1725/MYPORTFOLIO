import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './sections/Footer'
import ErrorBoundary from './components/ErrorBoundary'
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
    </ErrorBoundary>
  )
}
