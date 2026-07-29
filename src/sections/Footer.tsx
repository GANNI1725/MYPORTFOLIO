import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ArrowUp, Mail, Phone } from 'lucide-react'
import { personalInfo } from '../data'

const socialLinks = [
  {
    label: 'GitHub',
    href: personalInfo.social.github,
    color: '#24292F',
    glow: 'rgba(36,41,47,0.4)',
    colorDark: '#ffffff',
    glowDark: 'rgba(255,255,255,0.4)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>,
  },
  {
    label: 'LinkedIn',
    href: personalInfo.social.linkedin,
    color: '#0A66C2',
    glow: 'rgba(10,102,194,0.5)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" /></svg>,
  },
  {
    label: 'Instagram',
    href: personalInfo.social.instagram,
    color: '#E4405F',
    glow: 'rgba(228,64,95,0.5)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/9779848958471',
    color: '#25D366',
    glow: 'rgba(37,211,102,0.5)',
    icon: <MessageCircle size={15} />,
  },
]

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/25 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 hover:ring-2 hover:ring-accent/30 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Back to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Footer() {
  return (
    <>
      <BackToTop />
      <footer className="border-t border-[var(--border)] bg-[var(--bg)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-8"
          >
            {/* Column 1 — Logo + Tagline + Social */}
            <motion.div variants={fadeUp} className="md:col-span-5 flex flex-col items-center md:items-start gap-5">
              <div className="flex items-center gap-3">
                <img src="/logo-96.webp" alt="GPB" className="h-7 w-auto opacity-80" />
                <span className="text-sm font-semibold text-primary">Ganesh Prasad Bhandari</span>
              </div>
              <p className="text-xs text-secondary/60 leading-relaxed max-w-xs text-center md:text-left">
                Frontend developer building modern, accessible web experiences.
              </p>
              <div className="flex gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/[0.06] dark:bg-white/[0.04] border border-[var(--border)] flex items-center justify-center text-secondary/70 transition-all duration-300 hover:scale-110 active:scale-95"
                    style={{ '--sc': s.color, '--sg': s.glow } as React.CSSProperties}
                    aria-label={s.label}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      const isDark = document.documentElement.classList.contains('dark')
                      const c = isDark && s.colorDark ? s.colorDark : s.color
                      const g = isDark && s.glowDark ? s.glowDark : s.glow
                      el.style.color = c
                      el.style.borderColor = c
                      el.style.background = `${c}14`
                      el.style.boxShadow = `0 0 20px ${g}`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.color = ''
                      el.style.borderColor = ''
                      el.style.background = ''
                      el.style.boxShadow = ''
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Column 2 — Navigate */}
            <motion.div variants={fadeUp} className="md:col-span-3 flex flex-col items-center md:items-start gap-4">
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-secondary/40">Navigate</p>
              <div className="flex flex-col items-center md:items-start gap-2.5">
                <Link to="/" className="text-sm text-secondary/70 hover:text-accent transition-colors">Home</Link>
                <Link to="/about-us" className="text-sm text-secondary/70 hover:text-accent transition-colors">About</Link>
                <Link to="/contact-us" className="text-sm text-secondary/70 hover:text-accent transition-colors">Contact</Link>
                <Link to="/privacy" className="text-sm text-secondary/70 hover:text-accent transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-secondary/70 hover:text-accent transition-colors">Terms &amp; Conditions</Link>
              </div>
            </motion.div>

            {/* Column 3 — Contact */}
            <motion.div variants={fadeUp} className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-secondary/40">Contact</p>
              <div className="flex flex-col items-center md:items-start gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2.5 text-sm text-secondary/70 hover:text-accent transition-colors group"
                >
                  <Mail size={14} className="shrink-0 text-secondary/40 group-hover:text-accent transition-colors" />
                  {personalInfo.email}
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-2.5 text-sm text-secondary/70 hover:text-accent transition-colors group"
                >
                  <Phone size={14} className="shrink-0 text-secondary/40 group-hover:text-accent transition-colors" />
                  {personalInfo.phone}
                </a>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to work
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center md:justify-between gap-3">
            <p className="text-[11px] text-secondary/40">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-[10px] text-secondary/30 tracking-wide">
              Built with React, Vite, Tailwind CSS &amp; Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
