import type { Transition, Variants } from 'motion/react'

export const easeEntrance = [0.34, 1.56, 0.64, 1] as const
export const easeExit = [0.36, 0, 0.66, -0.56] as const

export const uiTransition: Transition = {
  duration: 0.3,
  ease: easeEntrance,
}

export const exitTransition: Transition = {
  duration: 0.3,
  ease: easeExit,
}

export const revealTransition: Transition = {
  duration: 0.6,
  ease: easeEntrance,
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
