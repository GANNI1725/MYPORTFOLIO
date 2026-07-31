import { useRef, useCallback, useState, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { personalInfo, stats } from '../data'
import StatsCard from '../components/StatsCard'
import SocialLinks from '../components/SocialLinks'
import MagneticWrap from '../components/MagneticWrap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../theme/useTheme'

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
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
  },
]

function ParticleField() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent/20"
          style={{
            left: `${15 + i * 10 + Math.random() * 5}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `particle-float ${3 + i * 1.5}s ease-in-out ${i * 0.8}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function PortraitSection() {
  const { theme } = useTheme()
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const tiltRotateX = useSpring(mouseY, { stiffness: 200, damping: 30 })
  const tiltRotateY = useSpring(mouseX, { stiffness: 200, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 6)
    mouseY.set(-y * 6)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="absolute w-[627px] h-[627px] md:w-[765px] md:h-[765px] rounded-full bg-gradient-to-br from-accent/8 via-accent/3 to-transparent blur-2xl" />
      <div className="absolute w-[836px] h-[836px] md:w-[1043px] md:h-[1043px] rounded-full bg-accent/3 blur-[80px]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleField />
      </div>

      <div className="relative w-[446px] md:w-[584px]">
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -5, 0],
                  transition: { duration: 4, ease: [0.4, 0, 0.2, 1], repeat: Infinity },
                }
          }
          className="w-full"
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full"
            style={{ perspective: 600 }}
          >
            <motion.div
              className="relative w-full"
              style={reduced ? undefined : { rotateX: tiltRotateX, rotateY: tiltRotateY }}
            >
              {imgError ? (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center rounded-2xl">
                  <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              ) : (
                <img
                  src={theme === 'red' ? '/Red%20mode%20my%20photo.png' : personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full aspect-[3/4] object-contain"
                  onError={() => setImgError(true)}
                />
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2"
          animate={reduced ? undefined : { opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="w-[312px] h-14 bg-accent/10 blur-2xl rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}

const nameChars = "Ganesh Prasad\nBhandari".split("")

export default function Hero() {
  const reduced = useReducedMotion()
  const shuffleOrder = useMemo(() => {
    const order = Array.from({ length: nameChars.length }, (_, i) => i)
    for (let j = order.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [order[j], order[k]] = [order[k], order[j]]
    }
    return order
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-5 z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary"
            >
              Hi I Am
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="name-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-left text-balance text-primary"
              style={{
                fontFamily: "'Alvera Demo', serif",
                animation: reduced ? 'none' : 'name-glow 3.5s cubic-bezier(0.4,0,0.2,1) 0.8s infinite',
              }}
            >
              {reduced
                ? "Ganesh Prasad \n Bhandari"
                : nameChars.map((char, i) =>
                    char === " " ? (
                      <span key={i} className="inline-block w-[0.3em]" />
                    ) : char === "\n" ? (
                      <div key={i} className="w-full" />
                    ) : (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 80, scale: 0.2, rotate: -20, color: '#60A5FA', filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, color: 'var(--primary)', filter: 'blur(0px)' }}
                        transition={{
                          type: 'spring',
                          stiffness: 220,
                          damping: 11,
                          mass: 0.4,
                          delay: shuffleOrder.indexOf(i) * 0.02,
                        }}
                      >
                        {char}
                      </motion.span>
                    )
                  )}
            </motion.h1>

            <div className="flex lg:hidden items-center justify-center my-6">
              <div className="w-[280px] sm:w-[320px]">
                <PortraitSection />
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent leading-tight"
            >
              Frontend Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-secondary max-w-lg leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            <SocialLinks links={socialLinks} delay={1.8} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              <MagneticWrap>
                <div className="group/btn relative">
                  <a
                    href="#contact"
                    className="relative h-11 px-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-[0.97] shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
                  >
                    Hire Me
                    <ArrowDown size={14} className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                  </a>
                </div>
              </MagneticWrap>
              <MagneticWrap>
                <div className="group/btn relative">
                  <a
                    href={personalInfo.resumeUrl}
                    className="relative h-11 px-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 dark:border-white/5 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 active:scale-[0.97] hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CV
                  </a>
                </div>
              </MagneticWrap>
            </motion.div>

            <StatsCard stats={stats} delay={2.2} />
          </div>

          <div className="hidden lg:flex items-center justify-center h-full">
            <div className="w-full max-w-[696px]">
              <PortraitSection />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 0.6, ease: [0.16, 1, 0.3, 1] }, y: { duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] } }}
      >
        <div className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </div>
      </motion.div>
    </section>
  )
}
