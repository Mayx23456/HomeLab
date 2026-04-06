import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { terminalSequence } from '../data/terminalSequence'
import { useTypewriter } from '../hooks/useTypewriter'

type Phase = 'typing' | 'revealing' | 'waiting'

const timestampPattern = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/

function ResponseLine({ line }: { line: string }) {
  const timestampMatch = timestampPattern.exec(line)

  if (!timestampMatch || timestampMatch.index === undefined) {
    return <span className="text-accent2">{line}</span>
  }

  const start = timestampMatch.index
  const end = start + timestampMatch[0].length

  return (
    <>
      <span className="text-accent2">{line.slice(0, start)}</span>
      <span className="rounded bg-slate-300/90 px-1 py-[1px] text-muted">{timestampMatch[0]}</span>
      <span className="text-accent2">{line.slice(end)}</span>
    </>
  )
}

export function Terminal() {
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [visibleResponseLines, setVisibleResponseLines] = useState(0)

  const activeExchange = terminalSequence[sequenceIndex]
  const typedCommand = useTypewriter(activeExchange.command, 20, 130)
  const isCommandComplete = typedCommand === activeExchange.command

  const shownLines = useMemo(
    () => activeExchange.responseLines.slice(0, visibleResponseLines),
    [activeExchange.responseLines, visibleResponseLines],
  )

  useEffect(() => {
    if (phase !== 'typing' || !isCommandComplete) {
      return
    }

    const timer = window.setTimeout(() => {
      setPhase('revealing')
    }, 230)

    return () => window.clearTimeout(timer)
  }, [isCommandComplete, phase])

  useEffect(() => {
    if (phase !== 'revealing') {
      return
    }

    if (visibleResponseLines >= activeExchange.responseLines.length || activeExchange.responseLines.length === 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setVisibleResponseLines((count) => {
        const nextCount = count + 1
        if (nextCount >= activeExchange.responseLines.length) {
          setPhase('waiting')
        }
        return nextCount
      })
    }, 160)

    return () => window.clearTimeout(timer)
  }, [activeExchange.responseLines.length, phase, visibleResponseLines])

  useEffect(() => {
    if (phase !== 'waiting') {
      return
    }

    const isLast = sequenceIndex === terminalSequence.length - 1
    const delay = isLast ? 3000 : 1250

    const timer = window.setTimeout(() => {
      setPhase('typing')
      setVisibleResponseLines(0)
      setSequenceIndex((current) => (current + 1) % terminalSequence.length)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [phase, sequenceIndex])

  return (
    <section id="monitoring" className="w-full bg-background px-6 py-24 md:px-10 lg:px-16">
      <style>{`
        @keyframes terminal-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .terminal-cursor {
          animation: terminal-cursor-blink 1s steps(1, end) infinite;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <h2 className="font-heading text-4xl font-black uppercase tracking-[-0.02em] text-white md:text-6xl">
            SOC Monitoring
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Splunk ingests pfSense telemetry over syslog (UDP/1514) and supports both quick
            dashboard triage and deep event-level validation.
          </p>
        </div>

        <motion.div
          className="overflow-hidden rounded-2xl border border-accent/30 bg-surface/90 shadow-[0_18px_60px_-28px_rgba(0,0,0,0.95)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between border-b border-muted/50 px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-danger/75" />
              <span className="h-3 w-3 rounded-full bg-[#f59e0b]/80" />
              <span className="h-3 w-3 rounded-full bg-accent/80" />
            </div>
            <p className="terminal text-xs text-slate-300">splunk@soc-lab:~</p>
            <span className="w-12" aria-hidden="true" />
          </div>

          <div className="terminal min-h-[21rem] bg-background px-4 py-5 text-sm md:px-6">
            <div className="mb-2 flex items-start gap-2">
              <span className="text-slate-400">$</span>
              <p className="whitespace-pre-wrap break-words text-accent">
                {typedCommand}
                {phase === 'typing' && <span className="terminal-cursor ml-[2px] inline-block">▋</span>}
              </p>
            </div>

            <div className="space-y-1">
              {shownLines.map((line, index) => (
                <p key={`${activeExchange.id}-line-${index}`} className="whitespace-pre">
                  <ResponseLine line={line} />
                </p>
              ))}

              {phase === 'revealing' && (
                <p className="text-accent2">
                  <span className="terminal-cursor inline-block">▋</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
