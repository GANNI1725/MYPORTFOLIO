import { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useReducedMotion } from '../hooks/useReducedMotion'

const RING_COUNT = 20
const FLOAT_COUNT = 5

interface RingParticle {
  id: number
  x: number
  y: number
  size: number
}

function generateRingParticles(): RingParticle[] {
  return Array.from({ length: RING_COUNT }, (_, i) => {
    const angle = (i / RING_COUNT) * Math.PI * 2
    const radius = 22 + Math.random() * 8
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: 2 + Math.random() * 2.5,
    }
  })
}

function FloatParticles({ show, isDark }: { show: boolean; isDark: boolean }) {
  if (!show) return null

  const particles = useMemo(() =>
    Array.from({ length: FLOAT_COUNT }, (_, i) => {
      const angle = (i / FLOAT_COUNT) * Math.PI * 2
      const radius = 14 + Math.random() * 10
      return { id: i, x: Math.cos(angle), y: Math.sin(angle), radius, delay: i * 0.15, size: 2 + Math.random() * 2 }
    }), [])

  const color = isDark ? 'rgba(96,165,250,' : 'rgba(59,130,246,'

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `${color}0.6)`,
            left: '50%',
            top: '50%',
            x: p.x * p.radius * 0.3,
            y: p.y * p.radius * 0.3,
          }}
          animate={{
            x: [p.x * p.radius * 0.3, p.x * p.radius, p.x * p.radius * 0.3],
            y: [p.y * p.radius * 0.3, p.y * p.radius, p.y * p.radius * 0.3],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2.5 + p.id * 0.4,
            repeat: Infinity,
            delay: p.delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  )
}

function RotatingShimmer({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-[-4px]"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${isDark ? 'rgba(96,165,250,0.15)' : 'rgba(59,130,246,0.12)'}, transparent, ${isDark ? 'rgba(96,165,250,0.15)' : 'rgba(59,130,246,0.12)'}, transparent)`,
          filter: 'blur(2px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  )
}

const particleTransition = {
  duration: 0.7,
  times: [0, 0.2, 0.55, 1],
  ease: [0.16, 1, 0.3, 1] as const,
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const prefersReduced = useReducedMotion()
  const reduced = prefersReduced === true
  const [isHovered, setIsHovered] = useState(false)
  const [showRing, setShowRing] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const ringParticles = useMemo(() => generateRingParticles(), [])

  const isDark = theme === 'dark'

  useEffect(() => {
    const updateOrigin = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect()
        const root = document.documentElement
        root.style.setProperty('--x', `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`)
        root.style.setProperty('--y', `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`)
      }
    }
    updateOrigin()
    window.addEventListener('resize', updateOrigin)
    return () => window.removeEventListener('resize', updateOrigin)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springRotateX = useSpring(mouseY, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(mouseX, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    mouseX.set(x * 2)
    mouseY.set(y * 2)
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const handleClick = useCallback(() => {
    if (reduced) {
      toggleTheme()
      return
    }

    setShowRing(true)
    setTimeout(() => setShowRing(false), 800)

    const direction = isDark ? 'to-light' : 'to-dark'
    const root = document.documentElement
    root.classList.add(direction)

    const cleanup = () => {
      root.classList.remove(direction)
    }

    const doToggle = () => toggleTheme()

    if (document.startViewTransition) {
      const transition = document.startViewTransition(doToggle)
      transition.finished.then(cleanup)
    } else {
      cleanup()
      doToggle()
    }
  }, [reduced, toggleTheme, isDark])

  const iconSpring = { type: 'spring' as const, stiffness: 250, damping: 22, mass: 0.7 }

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-11 h-11 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{ perspective: 500 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{
          scale: isHovered ? 1.35 : 1.15,
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 3, repeat: Infinity, ease: [0.4, 0, 0.2, 1] },
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          rotateX: reduced ? 0 : springRotateX,
          rotateY: reduced ? 0 : springRotateY,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full backdrop-blur-xl"
          style={{
            background: isDark
              ? 'rgba(255,255,255,0.12)'
              : 'rgba(0,0,0,0.06)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
          }}
          animate={{
            y: isHovered && !showRing ? -2 : 0,
            scale: showRing ? 0.95 : isHovered ? 1.06 : 1,
            borderColor: isHovered && !showRing
              ? isDark ? 'rgba(96,165,250,0.5)' : 'rgba(59,130,246,0.3)'
              : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
            boxShadow: isHovered && !showRing
              ? isDark
                ? '0 6px 24px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
                : '0 6px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'
              : isDark
                ? '0 3px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 3px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.8,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.15), transparent 70%)'
                : 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.4), transparent 70%)',
            }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isHovered && !showRing && !reduced && (
          <RotatingShimmer isDark={isDark} />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={iconSpring}
            >
              <Moon
                size={14}
                className="text-secondary"
                style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.5))' }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={iconSpring}
            >
              <Sun
                size={14}
                className="text-secondary"
                style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.4))' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showRing && (
          <motion.div
            key="particles"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {ringParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: 'var(--particle-color)',
                  boxShadow: '0 0 8px var(--particle-color), 0 0 16px var(--particle-color)',
                }}
                initial={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                animate={{ x: p.x, y: p.y, opacity: [0, 1, 0.5, 0], scale: [0, 1.6, 0.8, 0] }}
                transition={{
                  ...particleTransition,
                  delay: p.id * 0.025,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!reduced && (
        <FloatParticles show={isHovered && !showRing} isDark={isDark} />
      )}
    </motion.button>
  )
}
