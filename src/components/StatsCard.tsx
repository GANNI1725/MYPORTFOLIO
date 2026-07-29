import { motion, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface StatsCardProps {
  stats: { value: string; label: string }[]
  delay?: number
}

function AnimatedNumber({ value, delay }: { value: string; delay: number }) {
  const [display, setDisplay] = useState(0)
  const num = parseInt(value)
  const suffix = value.replace(/\d/g, '')

  useEffect(() => {
    const controls = animate(0, num, {
      duration: 1,
      delay,
      ease: [0.12, 0.72, 0.29, 1],
      onUpdate: (v) => setDisplay(v >= num - 0.5 ? num : Math.floor(v)),
    })
    return controls.stop
  }, [num, delay])

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.3, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block tabular-nums"
    >
      {display}{suffix}
    </motion.span>
  )
}

export default function StatsCard({ stats, delay = 0.8 }: StatsCardProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-5 flex"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex-1 text-center py-2 ${i < stats.length - 1 ? 'border-r border-[var(--border)]' : ''}`}
        >
          <p className="text-2xl font-bold text-accent">
            {reduced ? stat.value : <AnimatedNumber value={stat.value} delay={delay + 0.3 + i * 0.3} />}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  )
}
