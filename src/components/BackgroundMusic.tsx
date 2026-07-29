import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

const STORAGE_KEY = 'portfolio-music-enabled'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [userEnabled, setUserEnabled] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
  })

  // set up audio and native event listeners once
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.15
    audio.loop = true

    const onPlay = () => { console.log('[BG] play event'); setPlaying(true) }
    const onPause = () => { console.log('[BG] pause event'); setPlaying(false) }
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    // attempt autoplay on mount if previously enabled — no state is optimistically flipped
    if (userEnabled) {
      audio.play()
        .then(() => console.log('[BG] mount autoplay ok'))
        .catch((e) => {
          console.log('[BG] mount autoplay blocked:', e.name)
          setPlaying(false)
        })
    }

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // first user interaction — triggers play ONCE
  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current
      if (!audio || audio.paused === false) return
      setUserEnabled(true)
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
      audio.play()
        .then(() => console.log('[BG] first-interaction ok'))
        .catch((e) => {
          console.log('[BG] first-interaction failed:', e.name)
          setPlaying(false)
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
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      setUserEnabled(true)
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
      audio.play()
        .then(() => console.log('[BG] toggle play ok'))
        .catch((e) => {
          console.log('[BG] toggle play failed:', e.name)
          setPlaying(false)
        })
    } else {
      setUserEnabled(false)
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
            ease: 'easeInOut',
          }}
        />

        <span className="relative z-10 flex items-center justify-center">
          {playing ? <Volume2 size={14} className="text-accent" /> : <VolumeX size={14} className="text-secondary" />}
        </span>
      </motion.button>
    </>
  )
}