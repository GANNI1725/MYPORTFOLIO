import { useEffect, useRef } from 'react'
import { useTheme } from '../theme/useTheme'

const RED_MODE_TRACK_SRC = '/audio/atlasaudio-drone-ambient-518685.mp3'
const RED_MODE_VOLUME = 0.65
const OVERLAY_CLOSED_EVENT = 'red-mode-overlay-closed'

export default function RedModeMusic() {
  const { theme } = useTheme()
  const audioRef = useRef<HTMLAudioElement>(null)
  const isRedRef = useRef(theme === 'red')
  const wasRedRef = useRef(theme === 'red')
  const pendingPlayRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.preload = 'none'
    audio.loop = true
    audio.volume = RED_MODE_VOLUME
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const enteringRed = theme === 'red' && !wasRedRef.current
    const leavingRed = theme !== 'red' && wasRedRef.current
    wasRedRef.current = theme === 'red'
    isRedRef.current = theme === 'red'

    if (enteringRed) {
      pendingPlayRef.current = true
    } else if (leavingRed) {
      pendingPlayRef.current = false
      audio.pause()
      audio.currentTime = 0
    }
  }, [theme])

  useEffect(() => {
    const onOverlayClosed = () => {
      if (!isRedRef.current || !pendingPlayRef.current) return
      pendingPlayRef.current = false
      audioRef.current?.play().catch(() => {})
    }
    window.addEventListener(OVERLAY_CLOSED_EVENT, onOverlayClosed)
    return () => window.removeEventListener(OVERLAY_CLOSED_EVENT, onOverlayClosed)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      audio?.pause()
    }
  }, [])

  return (
    <audio ref={audioRef} preload="none" loop>
      <source src={RED_MODE_TRACK_SRC} type="audio/mpeg" />
    </audio>
  )
}
