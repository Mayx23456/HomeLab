import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 70, startDelay = 250): string {
  const [value, setValue] = useState('')

  useEffect(() => {
    let index = 0
    let intervalId: number | null = null

    const timeoutId = window.setTimeout(() => {
      setValue('')
      intervalId = window.setInterval(() => {
        index += 1
        setValue(text.slice(0, index))

        if (index >= text.length && intervalId !== null) {
          window.clearInterval(intervalId)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId !== null) {
        window.clearInterval(intervalId)
      }
    }
  }, [text, speed, startDelay])

  return value
}
