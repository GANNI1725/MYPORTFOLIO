import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Splash {
  sx: number
  sy: number
  size: number
  delay: number
}

interface Drop {
  id: number
  x: number
  land: number
  size: number
  drift: number
  dur: number
  splashes: Splash[]
}

const makeSplashes = (burstAt: number) =>
  Array.from({ length: 16 + Math.floor(Math.random() * 6) }, () => {
    const angle = Math.random() * Math.PI * 2
    const dist = 20 + Math.random() * 55
    return {
      sx: Math.cos(angle) * dist,
      sy: Math.sin(angle) * dist,
      size: 4 + Math.random() * 6,
      delay: burstAt + Math.random() * 0.2,
    }
  })

export default function RedBloodDrops() {
  const reduced = useReducedMotion()
  const [drops, setDrops] = useState<Drop[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    if (reduced) return
    let alive = true
    const spawn = () => {
      if (!alive) return
      for (let n = 0; n < 3; n++) {
        const id = idRef.current++
        const dur = 0.45 + Math.random() * 0.35
        const burstAt = dur * 0.68
        const drop: Drop = {
          id,
          x: 2 + Math.random() * 96,
          land: 86 + Math.random() * 14,
          size: 12,
          drift: (Math.random() - 0.5) * 50,
          dur,
          splashes: makeSplashes(burstAt),
        }
        setDrops(prev => [...prev.slice(-12000), drop])
        window.setTimeout(() => {
          setDrops(prev => prev.filter(d => d.id !== id))
        }, dur * 1000 + 2000)
      }
    }
    const start = window.setTimeout(spawn, 2200)
    const timer = window.setInterval(spawn, 1)
    return () => {
      alive = false
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      {drops.map((d) => (
        <span
          key={d.id}
          className="red-drop"
          style={
            {
              left: `${d.x}%`,
              '--drop-y': `${d.land}vh`,
              '--drift': `${d.drift}px`,
              '--fall-dur': `${d.dur}s`,
              '--burst-at': `${d.dur * 0.68}s`,
            } as React.CSSProperties
          }
        >
          <svg
            className="red-drop-main"
            width={d.size}
            height={d.size * 1.3}
            viewBox="0 0 24 24"
          >
            <defs>
              <radialGradient id={`red-drop-grad-${d.id}`} cx="0.38" cy="0.3" r="1.05">
                <stop offset="0%" stopColor="#ff5a4a" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#c62828" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#4a0609" stopOpacity="0.65" />
              </radialGradient>
            </defs>
            <path
              d="M12 2 C12 6 18 9.5 18 14 A6 6 0 1 1 6 14 C6 9.5 12 6 12 2 Z"
              fill={`url(#red-drop-grad-${d.id})`}
              stroke="rgba(255,120,90,0.35)"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
            <ellipse
              cx="9.2"
              cy="9"
              rx="2.4"
              ry="1.6"
              fill="rgba(255,255,255,0.45)"
              transform="rotate(-25 9.2 9)"
            />
            <ellipse
              cx="8.6"
              cy="8.6"
              rx="1.1"
              ry="0.75"
              fill="rgba(255,255,255,0.75)"
              transform="rotate(-25 8.6 8.6)"
            />
          </svg>
          <span className="red-flash" style={{ animationDelay: 'var(--burst-at)' } as React.CSSProperties} />
          {d.splashes.map((s, i) => (
            <span
              key={i}
              className="red-splash"
              style={
                {
                  width: s.size,
                  height: s.size,
                  '--sx': `${s.sx}px`,
                  '--sy': `${s.sy}px`,
                  animationDelay: `${s.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      ))}
    </>
  )
}
