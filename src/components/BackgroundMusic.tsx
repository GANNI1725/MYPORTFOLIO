import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music } from 'lucide-react'

const STORAGE_KEY = 'portfolio-music-enabled'
type Preference = 'on' | 'off' | null

export default function BackgroundMusic() {
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
    document.addEventListener('click', handler, { once: true })
    document.addEventListener('keydown', handler, { once: true })
    document.addEventListener('touchstart', handler, { once: true })
    document.addEventListener('pointerdown', handler, { once: true })
    document.addEventListener('wheel', handler, { once: true })
    return () => {
      document.removeEventListener('click', handler)
      document.removeEventListener('keydown', handler)
      document.removeEventListener('touchstart', handler)
      document.removeEventListener('pointerdown', handler)
      document.removeEventListener('wheel', handler)
    }
  }, [preference])

  const toggle = () => {
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
    }
  }

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src="/audio/background.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        className="relative w-11 h-11 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] flex items-center justify-center"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'color-mix(in srgb, var(--bg) 65%, transparent)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
          }}
          animate={
            playing
              ? {
                  boxShadow: [
                    '0 0 8px rgba(96,165,250,0.15)',
                    '0 0 16px rgba(96,165,250,0.3)',
                    '0 0 8px rgba(96,165,250,0.15)',
                  ],
                  borderColor: [
                    'rgba(96,165,250,0.3)',
                    'rgba(96,165,250,0.5)',
                    'rgba(96,165,250,0.3)',
                  ],
                }
              : {
                  boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
                  borderColor: 'var(--border)',
                }
          }
          transition={{
            duration: 2,
            repeat: playing ? Infinity : 0,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        <span className="relative z-10 flex items-center justify-center">
          <motion.span
            className="relative flex items-center justify-center"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Music size={14} className={playing ? 'text-accent' : 'text-secondary'} />
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
                  <span className="absolute w-[24px] h-px rounded-full rotate-45" style={{ background: '#ef4444' }} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </span>
      </motion.button>
    </>
  )
}