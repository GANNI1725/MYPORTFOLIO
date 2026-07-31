import { useCallback, useRef } from 'react'

export function useMultiClick(count = 4, windowMs = 1800) {
  const timestampsRef = useRef<number[]>([])

  const reset = useCallback(() => {
    timestampsRef.current = []
  }, [])

  const register = useCallback(
    (onFire: () => void) => {
      const now = Date.now()
      const timestamps = timestampsRef.current
      timestamps.push(now)
      while (timestamps.length > 0 && now - timestamps[0] > windowMs) {
        timestamps.shift()
      }
      if (timestamps.length >= count) {
        timestampsRef.current = []
        onFire()
      }
    },
    [count, windowMs],
  )

  return { register, reset }
}
