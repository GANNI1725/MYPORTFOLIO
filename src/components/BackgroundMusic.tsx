import { useRef, useState, useEffect, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.15
    audio.loop = true
    audio.play().catch(() => setIsPlaying(false))
  }, [])

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/audio/background.mpeg" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary hover:border-accent/30 transition-all duration-200"
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </>
  )
}
