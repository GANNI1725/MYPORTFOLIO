import { createContext, useContext } from 'react'
import type { ThemeValue } from '../lib/themeTransition'

export interface ThemeContextValue {
  theme: ThemeValue
  isDark: boolean
  toggleTheme: () => void
  toggleRedMode: (origin: { x: number; y: number }) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
