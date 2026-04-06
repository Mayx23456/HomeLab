import { useEffect, useRef, useState } from 'react'

type UseCountUpOptions = {
  duration?: number
  threshold?: number
  rootMargin?: string
  start?: number
}

type UseCountUpResult<T extends HTMLElement> = {
  ref: React.RefObject<T | null>
  value: number
  hasEntered: boolean
}

export function useCountUp<T extends HTMLElement = HTMLDivElement>(
  target: number,
  options: UseCountUpOptions = {},
): UseCountUpResult<T> {
  const { duration = 1200, threshold = 0.4, rootMargin = '0px', start = 0 } = options
  const ref = useRef<T | null>(null)
  const frameRef = useRef<number | null>(null)
  const hasStartedRef = useRef(false)

  const [hasEntered, setHasEntered] = useState(false)
  const [value, setValue] = useState(start)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !entry.isIntersecting) {
          return
        }

        setHasEntered(true)
        observer.disconnect()
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  useEffect(() => {
    if (!hasEntered || hasStartedRef.current) {
      return
    }

    hasStartedRef.current = true
    const animationStart = performance.now()

    const animate = (timestamp: number) => {
      const elapsed = timestamp - animationStart
      const progress = Math.min(elapsed / duration, 1)
      const nextValue = Math.round(start + (target - start) * progress)

      setValue(nextValue)

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate)
      }
    }

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [duration, hasEntered, start, target])

  return { ref, value, hasEntered }
}
