import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import BackgroundMusic from './BackgroundMusic'

const navItems = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Certifications', href: '/#certifications' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
]

const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'blog', 'contact']

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isPastHero, setIsPastHero] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const sectionTimer = useRef<number | null>(null)

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    const sectionId = href.split('#')[1]
    if (sectionId) setActiveSection(sectionId)
  }

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => {
      setIsPastHero(window.scrollY > 80)
      if (sectionTimer.current) window.clearTimeout(sectionTimer.current)
      sectionTimer.current = window.setTimeout(() => {
        for (const id of sectionIds.toReversed()) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 200) {
            setActiveSection(id)
            break
          }
        }
      }, 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (sectionTimer.current) window.clearTimeout(sectionTimer.current)
    }
  }, [isHome])

  const pillPad = isPastHero ? 'px-3 py-1.5' : 'px-4 py-2'
  const pillGap = isPastHero ? 'gap-1' : 'gap-1.5'
  const pillShine = isPastHero ? 'glass-pill-shine' : ''
  const pillTop = isPastHero ? '0.375rem' : '0.75rem'

  return (
    <>
      <motion.div
        layout
        className="red-reveal-navbar fixed z-50"
        style={{ top: pillTop, left: '1rem' }}
      >
        <a href="/#home" className={`glass-pill inline-flex items-center ${pillPad} ${pillShine}`}>
          <Logo />
        </a>
      </motion.div>

      <motion.div
        layout
        className="red-reveal-navbar fixed left-0 right-0 mx-auto w-fit z-50 hidden lg:block"
        style={{ top: pillTop }}
      >
        <nav className={`glass-pill flex items-center ${pillGap} ${pillPad} ${pillShine}`}>
          {navItems.map((item) => {
            const sectionId = item.href.split('#')[1]
            const isActive = isHome && activeSection === sectionId
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative font-mono px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-accent'
                    : 'text-secondary hover:text-primary hover:bg-accent/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-accent/10 rounded-full border border-accent/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            )
          })}
        </nav>
      </motion.div>

      <motion.div
        layout
        className="red-reveal-navbar fixed z-50"
        style={{ top: pillTop, right: '1rem' }}
      >
        <div className={`glass-pill flex items-center ${pillGap} ${pillPad} ${pillShine}`}>
          <ThemeToggle />
          <div className="w-px h-5 bg-border" />
          <BackgroundMusic />
          <a
            href="/#contact"
            className="hidden lg:inline-flex h-8 px-4 items-center justify-center rounded-full bg-accent-cta text-white text-sm font-semibold transition-[transform,box-shadow] duration-300 hover:scale-105 active:scale-[0.97] shadow-lg shadow-accent/25"
          >
            Hire Me
          </a>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-secondary/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-canvas/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
                className="text-2xl font-bold text-primary hover:text-accent transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="/#contact"
              onClick={() => handleNavClick('/#contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.06 + 0.1 }}
              className="mt-4 h-11 px-8 flex items-center justify-center rounded-full bg-accent-cta text-white font-semibold text-sm shadow-lg shadow-accent/25 transition-all"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
