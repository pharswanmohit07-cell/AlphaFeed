import { useEffect, useState } from 'react'

const STORAGE_KEY = 'alphafeed.performanceMode'

export function usePerformanceMode() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      return window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('performance-mode', enabled)
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0')
    } catch {
      // Ignore restricted storage environments.
    }

    return () => {
      document.documentElement.classList.remove('performance-mode')
    }
  }, [enabled])

  return [enabled, setEnabled] as const
}
