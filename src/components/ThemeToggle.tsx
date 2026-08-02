import { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../theme/useTheme'
import { runThemeTransition } from '../lib/themeTransition'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const btnRef = useRef<HTMLButtonElement>(null)
  const darkSurface = theme !== 'light'

  const handleClick = useCallback(() => {
    const rect = btnRef.current?.getBoundingClientRect()
    const x = rect ? ((rect.left + rect.width / 2) / window.innerWidth) * 100 : 50
    const y = rect ? ((rect.top + rect.height / 2) / window.innerHeight) * 100 : 50
    runThemeTransition({ x, y }, darkSurface ? 'to-light' : 'to-dark', () => toggleTheme())
  }, [darkSurface, toggleTheme])

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Switch between dark and light mode"
      className="relative w-8 h-8 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: darkSurface
            ? 'radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{ scale: 1.15, opacity: [0.25, 0.45, 0.25] }}
        transition={{ scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 3, repeat: Infinity, ease: [0.4, 0, 0.2, 1] } }}
      />

      <motion.div
        className="absolute inset-0 rounded-full backdrop-blur-xl"
        style={{
          background: darkSurface ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)',
          border: '1px solid',
          borderColor: darkSurface ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
        }}
        animate={{
          borderColor: darkSurface ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
          boxShadow: darkSurface
            ? '0 3px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 3px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: darkSurface
              ? 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.15), transparent 70%)'
              : 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.4), transparent 70%)',
          }}
        />
      </motion.div>

      <motion.span
        className="absolute inset-0 z-10 rounded-full pointer-events-none"
        animate={{
          boxShadow: darkSurface
            ? 'inset 0 0 12px rgba(59,130,246,0.08)'
            : 'inset 0 0 12px rgba(59,130,246,0.04)',
        }}
      />

      <span className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <span className="relative grid place-items-center">
          <motion.span
            className="col-start-1 row-start-1"
            animate={{
              y: theme !== 'light' ? 0 : -40,
              rotate: theme !== 'light' ? 0 : 360,
              opacity: theme !== 'light' ? 1 : 0,
              scale: theme !== 'light' ? 1 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Moon size={16} className="text-secondary" style={{ filter: theme !== 'light' ? 'drop-shadow(0 0 4px rgba(96,165,250,0.5))' : 'none' }} />
          </motion.span>
          <motion.span
            className="col-start-1 row-start-1"
            animate={{
              y: theme === 'light' ? 0 : 40,
              rotate: theme === 'light' ? 0 : -360,
              opacity: theme === 'light' ? 1 : 0,
              scale: theme === 'light' ? 1 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sun size={16} className="text-secondary" style={{ filter: theme === 'light' ? 'drop-shadow(0 0 4px rgba(59,130,246,0.4))' : 'none' }} />
          </motion.span>
        </span>
      </span>
    </motion.button>
  )
}
