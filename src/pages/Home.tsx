import { useEffect } from 'react'
import SEO from '../components/SEO'
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
  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  return (
    <>
      <SEO
        title="Frontend Developer Portfolio"
        description="Frontend Developer portfolio of Ganesh Prasad Bhandari — building modern, accessible web experiences with React, Next.js, and Tailwind CSS. Based in Nepal."
        path="/"
      />
      <main className="grid-bg">
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
