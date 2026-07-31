import { flushSync } from 'react-dom'

export type ThemeTransitionClass = 'to-dark' | 'to-light' | 'to-red' | 'to-revert'

export type ThemeValue = 'light' | 'dark' | 'red'

const DIRECTION_CLASSES: ThemeTransitionClass[] = ['to-dark', 'to-light', 'to-red', 'to-revert']

let activeTransition: ViewTransition | null = null

export function runThemeTransition(
  origin: { x: number; y: number },
  directionClass: ThemeTransitionClass,
  apply: () => void,
) {
  const root = document.documentElement
  root.style.setProperty('--x', `${origin.x}%`)
  root.style.setProperty('--y', `${origin.y}%`)
  root.classList.remove(...DIRECTION_CLASSES)
  root.classList.add(directionClass)

  if (activeTransition) {
    activeTransition.skipTransition()
    activeTransition = null
  }

  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply()
    return
  }

  const transition = document.startViewTransition(() => flushSync(apply))
  activeTransition = transition
  transition.finished.finally(() => {
    if (activeTransition === transition) {
      activeTransition = null
    }
  })
}
