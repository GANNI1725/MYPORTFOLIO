import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from '../theme/useTheme'

const OVERLAY_CLOSED_EVENT = 'red-mode-overlay-closed'

const LOADER_DURATION_MS = 2500
const IMPACT_TRACK_SRC = '/audio/universfield-horror-impact-hit-567238.mp3'
const IMPACT_VOLUME = 0.7

const INFINITY_PATH =
  'M 100.0 50.0 L 102.7 51.7 L 105.5 53.4 L 108.2 55.1 L 111.0 56.8 L 113.7 58.4 L 116.3 60.0 L 119.0 61.5 L 121.6 62.9 L 124.2 64.3 L 126.8 65.6 L 129.3 66.7 L 131.8 67.8 L 134.2 68.8 L 136.6 69.6 L 138.9 70.3 L 141.1 70.9 L 143.3 71.4 L 145.5 71.7 L 147.5 71.9 L 149.5 72.0 L 151.4 71.9 L 153.2 71.7 L 155.0 71.4 L 156.6 70.9 L 158.2 70.3 L 159.7 69.6 L 161.1 68.8 L 162.4 67.8 L 163.6 66.7 L 164.7 65.6 L 165.7 64.3 L 166.6 62.9 L 167.4 61.5 L 168.1 60.0 L 168.7 58.4 L 169.1 56.8 L 169.5 55.1 L 169.8 53.4 L 169.9 51.7 L 170.0 50.0 L 169.9 48.3 L 169.8 46.6 L 169.5 44.9 L 169.1 43.2 L 168.7 41.6 L 168.1 40.0 L 167.4 38.5 L 166.6 37.1 L 165.7 35.7 L 164.7 34.4 L 163.6 33.3 L 162.4 32.2 L 161.1 31.2 L 159.7 30.4 L 158.2 29.7 L 156.6 29.1 L 155.0 28.6 L 153.2 28.3 L 151.4 28.1 L 149.5 28.0 L 147.5 28.1 L 145.5 28.3 L 143.3 28.6 L 141.1 29.1 L 138.9 29.7 L 136.6 30.4 L 134.2 31.2 L 131.8 32.2 L 129.3 33.3 L 126.8 34.4 L 124.2 35.7 L 121.6 37.1 L 119.0 38.5 L 116.3 40.0 L 113.7 41.6 L 111.0 43.2 L 108.2 44.9 L 105.5 46.6 L 102.7 48.3 L 100.0 50.0 L 97.3 51.7 L 94.5 53.4 L 91.8 55.1 L 89.0 56.8 L 86.3 58.4 L 83.7 60.0 L 81.0 61.5 L 78.4 62.9 L 75.8 64.3 L 73.2 65.6 L 70.7 66.7 L 68.2 67.8 L 65.8 68.8 L 63.4 69.6 L 61.1 70.3 L 58.9 70.9 L 56.7 71.4 L 54.5 71.7 L 52.5 71.9 L 50.5 72.0 L 48.6 71.9 L 46.8 71.7 L 45.0 71.4 L 43.4 70.9 L 41.8 70.3 L 40.3 69.6 L 38.9 68.8 L 37.6 67.8 L 36.4 66.7 L 35.3 65.6 L 34.3 64.3 L 33.4 62.9 L 32.6 61.5 L 31.9 60.0 L 31.3 58.4 L 30.9 56.8 L 30.5 55.1 L 30.2 53.4 L 30.1 51.7 L 30.0 50.0 L 30.1 48.3 L 30.2 46.6 L 30.5 44.9 L 30.9 43.2 L 31.3 41.6 L 31.9 40.0 L 32.6 38.5 L 33.4 37.1 L 34.3 35.7 L 35.3 34.4 L 36.4 33.3 L 37.6 32.2 L 38.9 31.2 L 40.3 30.4 L 41.8 29.7 L 43.4 29.1 L 45.0 28.6 L 46.8 28.3 L 48.6 28.1 L 50.5 28.0 L 52.5 28.1 L 54.5 28.3 L 56.7 28.6 L 58.9 29.1 L 61.1 29.7 L 63.4 30.4 L 65.8 31.2 L 68.2 32.2 L 70.7 33.3 L 73.2 34.4 L 75.8 35.7 L 78.4 37.1 L 81.0 38.5 L 83.7 40.0 L 86.3 41.6 L 89.0 43.2 L 91.8 44.9 L 94.5 46.6 L 97.3 48.3 L 100.0 50.0'

export default function RedModeLoader() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const prevThemeRef = useRef(theme)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.preload = 'none'
    audio.volume = IMPACT_VOLUME
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (visible) {
      audio.currentTime = 0
      audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [visible])

  useEffect(() => {
    const wasRed = prevThemeRef.current === 'red'
    prevThemeRef.current = theme
    if (theme === 'red' && !wasRed) {
      setVisible(true)
      const timeout = setTimeout(() => setVisible(false), LOADER_DURATION_MS)
      return () => clearTimeout(timeout)
    }
  }, [theme])

  return (
    <>
      <audio ref={audioRef} preload="none">
        <source src={IMPACT_TRACK_SRC} type="audio/mpeg" />
      </audio>
      <AnimatePresence onExitComplete={() => window.dispatchEvent(new CustomEvent(OVERLAY_CLOSED_EVENT))}>
        {visible && (
        <motion.div
          className="red-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <h2 className="red-loader-title">Demon Domain</h2>
          <span className="red-loader-sub">Activated</span>
          <svg className="red-loader-infinity" viewBox="0 0 200 100" aria-hidden="true">
            <path className="red-loader-infinity-track" d={INFINITY_PATH} />
            <path className="red-loader-infinity-path" d={INFINITY_PATH} pathLength={1} />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
