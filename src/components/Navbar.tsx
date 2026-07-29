import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => {
      setIsPastHero(window.scrollY > 80)
      for (const id of sectionIds.toReversed()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id)
          break
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const pillPad = isPastHero ? 'px-3 py-1.5' : 'px-4 py-2'
  const pillGap = isPastHero ? 'gap-1' : 'gap-1.5'
  const pillShine = isPastHero ? 'glass-pill-shine' : ''
  const pillTop = isPastHero ? '0.375rem' : '0.75rem'

  return (
    <>
      <div
        className="fixed z-50"
        style={{ top: '0.75rem', left: '1rem' }}
      >
        <a href="/#home" className="glass-pill inline-flex items-center px-4 py-2">
          <Logo />
        </a>
      </div>

      <div
        className="fixed left-1/2 -translate-x-1/2 z-50 hidden lg:block"
        style={{ top: pillTop, transition: 'top 0.35s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <nav className={`glass-pill flex items-center ${pillGap} ${pillPad} ${pillShine}`}>
          {navItems.map((item) => {
            const sectionId = item.href.split('#')[1]
            const isActive = isHome && activeSection === sectionId
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-accent'
                    : 'text-secondary/70 hover:text-primary hover:bg-accent/5'
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
      </div>

      <div
        className="fixed z-50"
        style={{ top: pillTop, right: '1rem', transition: 'top 0.35s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className={`glass-pill flex items-center ${pillGap} ${pillPad} ${pillShine}`}>
          <ThemeToggle />
          <div className="w-px h-5 bg-[var(--border)]" />
          <BackgroundMusic />
          <a
            href="/#contact"
            className="hidden lg:inline-flex h-8 px-4 items-center justify-center rounded-full bg-accent text-white text-sm font-semibold transition-[transform,box-shadow] duration-300 hover:scale-105 active:scale-[0.97] shadow-lg shadow-accent/25"
          >
            Hire Me
          </a>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center text-secondary hover:text-primary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--bg)]/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
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
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.06 + 0.1 }}
              className="mt-4 h-11 px-8 flex items-center justify-center rounded-full bg-accent text-white font-semibold text-sm shadow-lg shadow-accent/25 transition-all"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
