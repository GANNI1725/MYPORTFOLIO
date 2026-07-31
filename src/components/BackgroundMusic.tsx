import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music } from 'lucide-react'
import SkullIcon from './SkullIcon'
import { useTheme } from '../theme/useTheme'
import { useMultiClick } from '../hooks/useMultiClick'

const STORAGE_KEY = 'portfolio-music-enabled'
type Preference = 'on' | 'off' | null

export default function BackgroundMusic() {
  const { theme, toggleRedMode } = useTheme()
  const darkSurface = theme !== 'light'
  const isRed = theme === 'red'
  const btnRef = useRef<HTMLButtonElement>(null)
  const { register: registerMultiClick } = useMultiClick(3, 900)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [preference, setPreference] = useState<Preference>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'true') return 'on'
      if (stored === 'false') return 'off'
    } catch {}
    return null
  })

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.15
    audio.loop = true

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    if (preference === 'on') {
      audio.play()
        .catch(() => setPlaying(false))
    }

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (preference !== null) return
    const handler = () => {
      const audio = audioRef.current
      if (!audio || audio.paused === false) return
      setPreference('on')
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
      audio.play()
        .catch(() => setPlaying(false))
    }
    document.addEventListener('pointerdown', handler, { once: true })
    document.addEventListener('keydown', handler, { once: true })
    return () => {
      document.removeEventListener('pointerdown', handler)
      document.removeEventListener('keydown', handler)
    }
  }, [preference])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('music-state-change', { detail: { playing } }))
  }, [playing, theme])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      setPreference('on')
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
      audio.play()
        .catch(() => setPlaying(false))
    } else {
      setPreference('off')
      try { localStorage.setItem(STORAGE_KEY, 'false') } catch {}
      audio.pause()
      if (theme === 'red') {
        const rect = btnRef.current?.getBoundingClientRect()
        const x = rect ? ((rect.left + rect.width / 2) / window.innerWidth) * 100 : 50
        const y = rect ? ((rect.top + rect.height / 2) / window.innerHeight) * 100 : 50
        toggleRedMode({ x, y })
      }
    }
  }, [theme, toggleRedMode])

  const handleClick = useCallback(() => {
    toggle()
    registerMultiClick(() => {
      const rect = btnRef.current?.getBoundingClientRect()
      const x = rect ? ((rect.left + rect.width / 2) / window.innerWidth) * 100 : 50
      const y = rect ? ((rect.top + rect.height / 2) / window.innerHeight) * 100 : 50
      toggleRedMode({ x, y })
    })
  }, [toggle, registerMultiClick, toggleRedMode])

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src="/audio/background.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        ref={btnRef}
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        className={`relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] flex items-center justify-center w-11 h-11`}
        style={{ perspective: 500 }}
      >
        {isRed ? (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,120,70,0.4), transparent 70%)',
              filter: 'blur(9px)',
            }}
            animate={{ scale: 1.2, opacity: [0.2, 0.45, 0.2] }}
            transition={{ scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 3, repeat: Infinity, ease: [0.4, 0, 0.2, 1] } }}
          />
        ) : (
          <>
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
              animate={
                playing
                  ? {
                      borderColor: [
                        'rgba(96,165,250,0.3)',
                        'rgba(96,165,250,0.5)',
                        'rgba(96,165,250,0.3)',
                      ],
                      boxShadow: [
                        '0 0 8px rgba(96,165,250,0.15)',
                        '0 0 16px rgba(96,165,250,0.3)',
                        '0 0 8px rgba(96,165,250,0.15)',
                      ],
                    }
                  : {
                      borderColor: darkSurface ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                      boxShadow: darkSurface
                        ? '0 3px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 3px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
                    }
              }
              transition={{
                duration: 2,
                repeat: playing ? Infinity : 0,
                ease: [0.4, 0, 0.2, 1],
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
          </>
        )}

        <span className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.span
            className="relative flex items-center justify-center"
            animate={playing && !isRed ? { rotate: 360 } : { rotate: 0 }}
            transition={playing && !isRed ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {isRed ? (
              <SkullIcon size={26} />
            ) : (
              <Music size={14} className={playing ? 'text-accent' : 'text-secondary'} />
            )}
            <AnimatePresence>
              {!playing && (
                <motion.span
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center' }}
                >
                  <span
                    className="absolute h-px rounded-full rotate-45"
                    style={{ background: '#ef4444', width: 24 }}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </span>
      </motion.button>
    </>
  )
}