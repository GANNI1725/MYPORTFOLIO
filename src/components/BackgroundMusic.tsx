import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

const STORAGE_KEY = 'portfolio-music-enabled'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [started, setStarted] = useState(false)

  const isPlaying = started && enabled

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setEnabled(false)
      try { localStorage.setItem(STORAGE_KEY, 'false') } catch {}
    } else {
      audioRef.current.play().catch(() => {})
      setEnabled(true)
      if (!started) setStarted(true)
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
    }
  }, [isPlaying, started])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.15
    audio.loop = true
  }, [])

  useEffect(() => {
    const handler = () => {
      if (!enabled || started) return
      const audio = audioRef.current
      if (!audio) return
      audio.play().catch(() => {})
      setStarted(true)
    }
    document.addEventListener('click', handler, { once: true })
    document.addEventListener('keydown', handler, { once: true })
    document.addEventListener('touchstart', handler, { once: true })
    document.addEventListener('wheel', handler, { passive: true, once: true })
    return () => {
      document.removeEventListener('click', handler)
      document.removeEventListener('keydown', handler)
      document.removeEventListener('touchstart', handler)
      document.removeEventListener('wheel', handler)
    }
  }, [enabled, started])

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src="/audio/background.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className="relative w-11 h-11 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] flex items-center justify-center"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
          }}
          animate={
            isPlaying
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
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        <span className="relative z-10 flex items-center justify-center">
          {isPlaying ? <Volume2 size={14} className="text-accent" /> : <VolumeX size={14} className="text-secondary" />}
        </span>
      </motion.button>
    </>
  )
}
