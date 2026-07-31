import { useEffect } from 'react'
import SEO from '../components/SEO'
import RedBloodDrops from '../components/RedBloodDrops'
import { useTheme } from '../theme/useTheme'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Certifications from '../sections/Certifications'
import Blog from '../sections/Blog'
import FAQ from '../components/FAQ'
import Contact from '../sections/Contact'

export default function Home() {
  const { theme } = useTheme()

  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const isReload = navEntry?.type === 'reload'

    if (isReload) {
      window.scrollTo(0, 0)
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname)
      }
    } else {
      const hash = window.location.hash
      if (hash) {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }, [])

  return (
    <>
      <SEO
        title="Frontend Developer Portfolio"
        description="Frontend Developer portfolio of Ganesh Prasad Bhandari — building modern, accessible web experiences with React, Next.js, and Tailwind CSS. Based in Nepal."
        path="/"
      />
      <main className="grid-bg relative z-0">
        {theme === 'red' && (
          <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{
              backgroundImage: "url('/Red%20mode%20BG.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: -1,
            }}
          />
        )}
        {theme === 'red' && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
            <RedBloodDrops />
          </div>
        )}
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Blog />
        <FAQ />
        <Contact />
      </main>
    </>
  )
}
