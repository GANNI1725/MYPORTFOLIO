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
  const breatheLo = offset + circumference * 0.05
  const breatheHi = Math.max(offset - circumference * 0.05, 0)

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
          <motion.g
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 10, ease: 'linear', repeat: Infinity }}
            style={{ transformOrigin: '40px 40px' }}
          >
            <motion.circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              className="text-accent group-hover:brightness-125 transition-[filter] duration-200"
              strokeDasharray={circumference}
              animate={
                reduced
                  ? { strokeDashoffset: offset }
                  : { strokeDashoffset: [breatheLo, breatheHi, breatheLo] }
              }
              transition={
                reduced
                  ? undefined
                  : { duration: 3.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
              }
            />
          </motion.g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs font-bold text-primary group-hover:text-accent transition-colors duration-200">{percentage}%</span>
        </div>
      </div>
      <span className="font-mono text-2xs text-secondary tracking-wide group-hover:text-primary transition-colors duration-200">{name}</span>
    </motion.div>
  )
}
