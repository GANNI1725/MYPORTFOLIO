import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

export function useReducedMotion() {
  const pref = useFramerReducedMotion()
  if (typeof window === 'undefined') return true
  return pref || window.innerWidth < 768
}
