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
      const s = d.size
      const grad = ctx.createRadialGradient(d.x - s * 0.3, d.y - s * 0.5, s * 0.1, d.x, d.y, s)
      grad.addColorStop(0, `rgba(255,120,100,${0.85 * d.opacity})`)
      grad.addColorStop(0.5, `rgba(198,40,40,${0.7 * d.opacity})`)
      grad.addColorStop(1, `rgba(90,8,12,${0.75 * d.opacity})`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(d.x, d.y - s)
      ctx.bezierCurveTo(d.x + s * 0.75, d.y - s * 0.55, d.x + s * 0.8, d.y + s * 0.25, d.x + s * 0.45, d.y + s * 0.5)
      ctx.quadraticCurveTo(d.x, d.y + s * 0.9, d.x - s * 0.45, d.y + s * 0.5)
      ctx.bezierCurveTo(d.x - s * 0.8, d.y + s * 0.25, d.x - s * 0.75, d.y - s * 0.55, d.x, d.y - s)
      ctx.fill()
      ctx.fillStyle = `rgba(255,255,255,${0.5 * d.opacity})`
      ctx.beginPath()
      ctx.ellipse(d.x - s * 0.25, d.y - s * 0.4, s * 0.12, s * 0.08, -0.4, 0, Math.PI * 2)
      ctx.fill()
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
      const n = 5 + Math.floor(Math.random() * 4)
      for (let i = 0; i < n; i++) {
        if (splashes.length >= 400) break
        const a = Math.random() * Math.PI * 2
        const sp = 30 + Math.random() * 90
        splashes.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 55,
          size: 1.5 + Math.random() * 2,
          life: 0,
          maxLife: 0.35 + Math.random() * 0.25,
        })
      }
      if (flashes.length < 30) {
        flashes.push({ x, y, life: 0, maxLife: 0.25, maxR: 14 + Math.random() * 12 })
      }
    }

    const frame = (now: number) => {
      if (!alive) return
      const dt = Math.min(0.05, (now - startAt) / 1000)

      if (dt > 0) {
        spawnAcc += dt
        while (spawnAcc >= 0.012 && drops.length < 220) {
          spawnAcc -= 0.012
          const size = 4 + Math.random() * 3
          drops.push({
            x: 2 + Math.random() * (w - 4),
            y: -20 - Math.random() * 40,
            vx: (Math.random() - 0.5) * 30,
            vy: 240 + Math.random() * 160,
            size,
            landY: h,
            opacity: 0.55 + Math.random() * 0.4,
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
