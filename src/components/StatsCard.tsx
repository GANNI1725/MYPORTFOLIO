import { useEffect, useState } from 'react'

interface StatsCardProps {
  stats: { value: string; label: string }[]
  delay?: number
}

function AnimatedNumber({ value, delay }: { value: string; delay: number }) {
  const [display, setDisplay] = useState(0)
  const num = parseInt(value)
  const suffix = value.replace(/\d/g, '')

  useEffect(() => {
    const start = performance.now() + delay * 1000
    let raf: number
    function tick(now: number) {
      const elapsed = Math.max(0, now - start)
      const dur = 1000
      const t = Math.min(elapsed / dur, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.floor(ease * num))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [num, delay])

  return <span className="inline-block tabular-nums">{display}{suffix}</span>
}

export default function StatsCard({ stats, delay = 0.8 }: StatsCardProps) {
  return (
    <div
      className="glass rounded-2xl p-5 flex [animation:heroFadeUp_0.5s_ease-out_forwards]"
      style={{ animationDelay: `${delay}s` }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex-1 text-center py-2 ${i < stats.length - 1 ? 'border-r border-[var(--border)]' : ''}`}
        >
          <p className="text-2xl font-bold text-accent">
            <AnimatedNumber value={stat.value} delay={delay + 0.3 + i * 0.3} />
          </p>
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
