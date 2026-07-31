import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Bolt {
  id: number
  left: number
  seed: number
}

const makeBolt = (seed: number): { path: string; branches: string[] } => {
  const rand = (() => {
    let s = seed
    return () => {
      s = (s * 16807) % 2147483647
      return (s - 1) / 2147483646
    }
  })()

  const pts: { x: number; y: number }[] = [{ x: 100, y: 0 }]
  let x = 100
  const points = 12 + Math.floor(rand() * 4)
  const seg = 100 / points
  for (let i = 1; i <= points; i++) {
    x += (rand() - 0.5) * 110
    x = Math.max(15, Math.min(185, x))
    pts.push({ x, y: seg * i })
  }

  let path = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const cur = pts[i]
    const midY = (prev.y + cur.y) / 2
    const c1 = { x: prev.x + (cur.x - prev.x) * 0.45, y: prev.y + (midY - prev.y) * 0.5 }
    const c2 = { x: cur.x - (cur.x - prev.x) * 0.45, y: cur.y - (cur.y - midY) * 0.5 }
    path += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`
  }

  const branches: string[] = []
  const branchCount = 3 + Math.floor(rand() * 3)
  for (let i = 0; i < branchCount; i++) {
    const by = 12 + rand() * 65
    const dir = rand() > 0.5 ? -1 : 1
    const root = pts[Math.floor(rand() * (pts.length - 2)) + 1]
    let bx = root.x + dir * 6
    let bpx = `M${bx.toFixed(1)} ${by.toFixed(1)}`
    const bl = 14 + rand() * 24
    const steps = 3 + Math.floor(rand() * 3)
    let py = by
    for (let s = 1; s <= steps; s++) {
      bx += dir * (bl / steps) * (0.5 + rand())
      const y = by + (s / steps) * 12 + (rand() - 0.5) * 8
      const midY = (py + y) / 2
      bpx += ` Q${(bx + dir * 4).toFixed(1)} ${midY.toFixed(1)} ${bx.toFixed(1)} ${y.toFixed(1)}`
      py = y
    }
    branches.push(bpx)
  }

  return { path, branches }
}

export default function RedLightning() {
  const reduced = useReducedMotion()
  const [bolts, setBolts] = useState<Bolt[]>([])

  useEffect(() => {
    if (reduced) return
    let alive = true
    let boltId = 0

    const strike = () => {
      if (!alive) return
      const id = boltId++
      const range = window.innerWidth < 768 ? 61 : 90
      setBolts(prev => [...prev.slice(-2), { id, left: 5 + Math.random() * range, seed: Math.floor(Math.random() * 1e9) }])
      window.setTimeout(() => {
        if (alive) setBolts(prev => prev.filter(b => b.id !== id))
      }, 900)
    }

    const timer = window.setInterval(() => {
      if (!alive) return
      strike()
      if (Math.random() < 0.3) window.setTimeout(strike, 160)
    }, 2800)

    const start = window.setTimeout(strike, 2800)
    return () => {
      alive = false
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      {bolts.map((b) => {
        const { path, branches } = makeBolt(b.seed)
        return (
          <div key={b.id} className="red-bolt" style={{ left: `${b.left}%` }}>
            <svg viewBox="0 0 200 110" preserveAspectRatio="none" className="red-bolt-svg">
              <path
                d={path}
                fill="none"
                className="red-bolt-halo"
                stroke="#ff3026"
                strokeWidth="5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={path}
                fill="none"
                className="red-bolt-core"
                stroke="#ffd9d0"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={path}
                fill="none"
                className="red-bolt-inner"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {branches.map((bp, i) => (
                <path
                  key={i}
                  d={bp}
                  fill="none"
                  className="red-bolt-branch"
                  stroke="#ff5a4a"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
        )
      })}
      {bolts.length > 0 && <div className="red-flash-full" key={bolts[bolts.length - 1].id} />}
    </>
  )
}
