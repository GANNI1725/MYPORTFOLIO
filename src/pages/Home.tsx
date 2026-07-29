import { lazy, Suspense, useEffect } from 'react'
import SEO from '../components/SEO'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
const Contact = lazy(() => import('../sections/Contact'))

const Projects = lazy(() => import('../sections/Projects'))
const Certifications = lazy(() => import('../sections/Certifications'))
const Blog = lazy(() => import('../sections/Blog'))
const FAQ = lazy(() => import('../components/FAQ'))

function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-64" />}>
      {children}
    </Suspense>
  )
}

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
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
      <main className="grid-bg">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <LazySection><Projects /></LazySection>
        <LazySection><Certifications /></LazySection>
        <LazySection><Blog /></LazySection>
        <LazySection><FAQ /></LazySection>
        <Contact />
      </main>
    </>
  )
}
