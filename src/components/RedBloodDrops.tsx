import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Drop {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  landY: number
  opacity: number
}

interface Splash {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
}

interface Flash {
  x: number
  y: number
  life: number
  maxLife: number
  maxR: number
}

export default function RedBloodDrops() {
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let alive = true
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const drops: Drop[] = []
    const splashes: Splash[] = []
    const flashes: Flash[] = []
    let spawnAcc = 0
    let startAt = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const drawDrop = (d: Drop) => {
      const len = d.size * 7
      const slant = len * (-d.vx / d.vy)
      const grad = ctx.createLinearGradient(d.x - slant, d.y - len, d.x, d.y)
      grad.addColorStop(0, `rgba(210,50,45,${0.25 * d.opacity})`)
      grad.addColorStop(0.7, `rgba(255,95,80,${0.7 * d.opacity})`)
      grad.addColorStop(1, `rgba(255,110,90,${0.95 * d.opacity})`)
      ctx.strokeStyle = grad
      ctx.lineWidth = d.size
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(d.x - slant, d.y - len)
      ctx.lineTo(d.x, d.y)
      ctx.stroke()
    }

    const drawSplash = (s: Splash) => {
      const t = s.life / s.maxLife
      ctx.fillStyle = `rgba(255,110,90,${(1 - t) * 0.8})`
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size * (1 - t * 0.6), 0, Math.PI * 2)
      ctx.fill()
    }

    const drawFlash = (f: Flash) => {
      const t = f.life / f.maxLife
      const r = f.maxR * (0.4 + t)
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r)
      g.addColorStop(0, `rgba(255,70,50,${0.9 * (1 - t)})`)
      g.addColorStop(0.5, `rgba(255,50,40,${0.45 * (1 - t)})`)
      g.addColorStop(1, 'rgba(255,50,40,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(f.x, f.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const burst = (x: number, y: number) => {
      const n = 3 + Math.floor(Math.random() * 3)
      for (let i = 0; i < n; i++) {
        if (splashes.length >= 400) break
        const a = Math.random() * Math.PI * 2
        const sp = 20 + Math.random() * 60
        splashes.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 40,
          size: 0.7 + Math.random() * 1.1,
          life: 0,
          maxLife: 0.25 + Math.random() * 0.2,
        })
      }
      if (flashes.length < 30) {
        flashes.push({ x, y, life: 0, maxLife: 0.2, maxR: 6 + Math.random() * 6 })
      }
    }

    const frame = (now: number) => {
      if (!alive) return
      const dt = Math.min(0.05, (now - startAt) / 1000)

      if (dt > 0) {
        spawnAcc += dt
        while (spawnAcc >= 0.008 && drops.length < 260) {
          spawnAcc -= 0.008
          const size = 1.2 + Math.random() * 1.3
          const vy = 900 + Math.random() * 500
          const drift = h * (0.12 + Math.random() * 0.1)
          drops.push({
            x: Math.random() * (w + drift),
            y: -20 - Math.random() * 40,
            vx: -vy * (0.12 + Math.random() * 0.1),
            vy,
            size,
            landY: h,
            opacity: 0.5 + Math.random() * 0.35,
          })
        }
      }

      ctx.clearRect(0, 0, w, h)

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i]
        d.y += d.vy * dt
        d.x += d.vx * dt
        if (d.y >= d.landY) {
          burst(d.x, d.landY)
          drops.splice(i, 1)
          continue
        }
        drawDrop(d)
      }

      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i]
        s.life += dt
        if (s.life >= s.maxLife) {
          splashes.splice(i, 1)
          continue
        }
        s.vy += 900 * dt
        s.x += s.vx * dt
        s.y += s.vy * dt
        drawSplash(s)
      }

      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i]
        f.life += dt
        if (f.life >= f.maxLife) {
          flashes.splice(i, 1)
          continue
        }
        drawFlash(f)
      }

      raf = requestAnimationFrame(frame)
    }

    startAt = performance.now() + 2200
    raf = requestAnimationFrame(frame)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="red-drops-canvas"
    />
  )
}
