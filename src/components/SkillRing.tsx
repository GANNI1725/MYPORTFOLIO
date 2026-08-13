import { motion } from 'motion/react'
import { staggerItem, uiTransition } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SkillRingProps {
  name: string
  percentage: number
}

export default function SkillRing({ name, percentage }: SkillRingProps) {
  const reduced = useReducedMotion()
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      variants={staggerItem}
      transition={uiTransition}
      whileHover={{ scale: 1.08 }}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-secondary/10"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            className="text-accent group-hover:brightness-125 transition-all duration-200"
            strokeDasharray={circumference}
            initial={reduced ? false : { strokeDashoffset: circumference }}
            whileInView={reduced ? undefined : { strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0, 0.65, 0.15, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs font-bold text-primary group-hover:text-accent transition-colors duration-200">{percentage}%</span>
        </div>
      </div>
      <span className="font-mono text-2xs text-secondary tracking-wide group-hover:text-primary transition-colors duration-200">{name}</span>
    </motion.div>
  )
}
