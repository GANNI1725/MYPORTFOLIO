import { useState, useLayoutEffect, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { runThemeTransition, type ThemeValue } from '../lib/themeTransition'
import { ThemeContext } from './useTheme'

const STORAGE_KEY = 'theme'

function getInitialTheme(): ThemeValue {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'red') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeValue>(getInitialTheme)
  const initialTheme = getInitialTheme()
  const lastBaseThemeRef = useRef<'light' | 'dark'>(initialTheme === 'red' ? 'dark' : initialTheme)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme !== 'light')
    if (theme === 'red') {
      root.setAttribute('data-theme', 'red')
    } else {
      root.removeAttribute('data-theme')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const musicPlayingRef = useRef(false)

  useEffect(() => {
    if (theme !== 'red') return

    const curse = () => {
      const cur = document.title
      const base = cur.replace(/^\s*♪?\s*☠ DEMON DOMAIN ☠\s*(— )?/, '')
      const next = `${musicPlayingRef.current ? '♪ ' : ''}☠ DEMON DOMAIN ☠${base ? ` — ${base}` : ''}`
      if (next !== cur) document.title = next
    }

    const onMusic = (e: Event) => {
      musicPlayingRef.current = Boolean((e as CustomEvent).detail?.playing)
      curse()
    }

    const titleEl = document.querySelector('title')
    const observer = titleEl ? new MutationObserver(curse) : null
    observer?.observe(titleEl!, { childList: true, subtree: true, characterData: true })

    window.addEventListener('music-state-change', onMusic)
    curse()

    return () => {
      observer?.disconnect()
      window.removeEventListener('music-state-change', onMusic)
      document.title = document.title.replace(/^\s*♪?\s*☠ DEMON DOMAIN ☠\s*(— )?/, '')
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const toggleRedMode = useCallback(
    (origin: { x: number; y: number }) => {
      if (theme === 'red') {
        runThemeTransition(origin, 'to-revert', () => setTheme(lastBaseThemeRef.current))
      } else {
        lastBaseThemeRef.current = theme
        runThemeTransition(origin, 'to-red', () => setTheme('red'))
      }
    },
    [theme],
  )

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, toggleRedMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
