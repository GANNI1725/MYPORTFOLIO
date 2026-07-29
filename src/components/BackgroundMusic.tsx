import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

const STORAGE_KEY = 'portfolio-music-enabled'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isActuallyPlaying, setIsActuallyPlaying] = useState(false)
  const [persistedEnabled, setPersistedEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [started, setStarted] = useState(false)

  // wire up native play/pause events so the icon always reflects real audio state
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.15
    audio.loop = true

    const onPlay = () => {
      console.log('[BackgroundMusic] native play event fired')
      setIsActuallyPlaying(true)
    }
    const onPause = () => {
      console.log('[BackgroundMusic] native pause event fired')
      setIsActuallyPlaying(false)
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    // on mount, if the user previously opted in, try to resume playback
    // do NOT set started=true until play actually resolves — otherwise the
    // first-interaction handler will be blocked and music will never start
    if (persistedEnabled && !started) {
      audio.play()
        .then(() => {
          console.log('[BackgroundMusic] autoplay attempt resolved — playing')
          setStarted(true)
        })
        .catch((err) => {
          console.log('[BackgroundMusic] autoplay blocked:', err.name, err.message)
          // started stays false so the first-interaction handler can try later
          setIsActuallyPlaying(false)
        })
    }

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
    // run exactly once on mount; started/persistedEnabled are captured at mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // first-interaction handler — uses multiple events to maximise browser compatibility.
  // Do NOT use passive:true on wheel — some Chromium-based browsers (Edge, Brave)
  // may not treat passive wheel events as valid user gestures for audio.play().
  useEffect(() => {
    const handler = () => {
      if (started) return
      const audio = audioRef.current
      if (!audio) return
      setStarted(true)
      setPersistedEnabled(true)
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
      audio.play()
        .then(() => {
          console.log('[BackgroundMusic] first-interaction play succeeded')
          // native play event will fire and setIsActuallyPlaying(true)
        })
        .catch((err) => {
          console.log('[BackgroundMusic] first-interaction play failed:', err.name, err.message)
          setIsActuallyPlaying(false)
        })
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
  }, [started])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isActuallyPlaying) {
      audio.pause()
      setPersistedEnabled(false)
      try { localStorage.setItem(STORAGE_KEY, 'false') } catch {}
      // native pause event will fire and setIsActuallyPlaying(false)
    } else {
      setPersistedEnabled(true)
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
      audio.play()
        .then(() => {
          console.log('[BackgroundMusic] toggle play succeeded')
        })
        .catch((err) => {
          console.log('[BackgroundMusic] toggle play failed:', err.name, err.message)
          setIsActuallyPlaying(false)
        })
    }
  }, [isActuallyPlaying])

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src="/audio/background.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isActuallyPlaying ? 'Pause background music' : 'Play background music'}
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
            isActuallyPlaying
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
            repeat: isActuallyPlaying ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        <span className="relative z-10 flex items-center justify-center">
          {isActuallyPlaying ? <Volume2 size={14} className="text-accent" /> : <VolumeX size={14} className="text-secondary" />}
        </span>
      </motion.button>
    </>
  )
}