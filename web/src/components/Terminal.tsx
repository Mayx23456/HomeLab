import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { terminalSequence, type TerminalBlock, type TerminalRow } from '../data/terminalSequence'
import { useTypewriter } from '../hooks/useTypewriter'

type PlaybackStage = 'description' | 'query' | 'cursor' | 'output' | 'complete'

const dividerLine = '─────────────────────────────────────────'
const timestampPattern = /^(Apr \d+ \d{2}:\d{2}:\d{2})$/
const fieldPattern = /^(host|source|sourcetype)(\s*[:=]\s*)(.+)$/i

function TerminalWindowDots() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#43085f]" />
      <span className="h-3 w-3 rounded-full bg-[#77008a]" />
      <span className="h-3 w-3 rounded-full bg-[#c000ba]" />
    </div>
  )
}

function renderCellContent(value: string, isAlert: boolean) {
  const timestampMatch = timestampPattern.exec(value)
  if (timestampMatch) {
    return <span className="text-muted">{value}</span>
  }

  const fieldMatch = fieldPattern.exec(value)
  if (fieldMatch) {
    return (
      <>
        <span className="text-[#d9b3ee]">{fieldMatch[1]}{fieldMatch[2]}</span>
        <span className="text-accent2">{fieldMatch[3]}</span>
      </>
    )
  }

  if (isAlert) {
    return <span className="text-danger">{value}</span>
  }

  return <span className="text-white">{value}</span>
}

function parseCount(value: string) {
  return Number.parseInt(value.replaceAll(',', ''), 10)
}

function OutputRow({
  row,
  rowIndex,
  block,
}: {
  row: TerminalRow
  rowIndex: number
  block: TerminalBlock
}) {
  const columnCount = row.cells.length
  const isHeader = row.kind === 'header'
  const isAlert = Boolean(row.alert)
  const dataRows = block.rows.filter((entry) => entry.kind === 'row')
  const maxCount = Math.max(
    ...dataRows
      .map((entry) => entry.cells[1] ?? '0')
      .map((value) => parseCount(value))
      .filter((value) => Number.isFinite(value)),
    1,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`grid gap-3 rounded-lg px-3 py-2 ${
        isHeader
          ? 'text-accent2'
          : rowIndex % 2 === 0
            ? 'bg-white/10'
            : 'bg-transparent'
      }`}
      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
    >
      {row.cells.map((cell, cellIndex) => {
        if (block.outputType === 'timechart' && !isHeader && cellIndex === 1) {
          const numericValue = parseCount(cell)
          const width = `${(numericValue / maxCount) * 100}%`

          return (
            <div key={`${row.id}-${cellIndex}`} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-right text-white">{cell}</span>
              <div className="h-[6px] flex-1 rounded-full bg-white/6">
                <div
                  className="h-full rounded-full bg-pink"
                  style={{
                    width,
                    boxShadow: '0 0 12px rgba(192, 0, 186, 0.32)',
                  }}
                />
              </div>
            </div>
          )
        }

        return (
          <div
            key={`${row.id}-${cellIndex}`}
            className={`truncate font-mono text-sm ${isHeader ? 'font-bold' : 'font-medium'}`}
          >
            {isHeader ? (
              <span className="text-accent2">{cell}</span>
            ) : (
              renderCellContent(cell, isAlert)
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

export function Terminal() {
  const [blockIndex, setBlockIndex] = useState(0)
  const [stage, setStage] = useState<PlaybackStage>('description')
  const [visibleRows, setVisibleRows] = useState(0)
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true)
  const [showDivider, setShowDivider] = useState(false)

  const activeBlock = terminalSequence[blockIndex]
  const descriptionTyped = useTypewriter(activeBlock.description, 22, 0)
  const queryTyped = useTypewriter(stage === 'query' ? activeBlock.query : '', 16, 0)

  const visibleOutputRows = useMemo(
    () => activeBlock.rows.slice(0, visibleRows),
    [activeBlock.rows, visibleRows],
  )

  const goToBlock = (nextIndex: number, shouldPauseAuto = false) => {
    setBlockIndex(nextIndex)
    setStage('description')
    setVisibleRows(0)
    setShowDivider(true)

    if (shouldPauseAuto) {
      setAutoAdvanceEnabled(false)
    }
  }

  useEffect(() => {
    if (stage !== 'description' || descriptionTyped !== activeBlock.description) {
      return
    }

    const timer = window.setTimeout(() => {
      setStage('query')
    }, 120)

    return () => window.clearTimeout(timer)
  }, [activeBlock.description, descriptionTyped, stage])

  useEffect(() => {
    if (stage !== 'query' || queryTyped !== activeBlock.query) {
      return
    }

    const timer = window.setTimeout(() => {
      setStage('cursor')
    }, 80)

    return () => window.clearTimeout(timer)
  }, [activeBlock.query, queryTyped, stage])

  useEffect(() => {
    if (stage !== 'cursor') {
      return
    }

    const timer = window.setTimeout(() => {
      setStage('output')
    }, 600)

    return () => window.clearTimeout(timer)
  }, [stage])

  useEffect(() => {
    if (stage !== 'output') {
      return
    }

    if (visibleRows >= activeBlock.rows.length) {
      return
    }

    const timer = window.setTimeout(() => {
      setVisibleRows((current) => {
        const nextValue = current + 1
        if (nextValue >= activeBlock.rows.length) {
          setStage('complete')
        }
        return nextValue
      })
    }, 80)

    return () => window.clearTimeout(timer)
  }, [activeBlock.rows.length, stage, visibleRows])

  useEffect(() => {
    if (stage !== 'complete' || !autoAdvanceEnabled) {
      return
    }

    const isLastBlock = blockIndex === terminalSequence.length - 1
    const timer = window.setTimeout(() => {
      const nextIndex = isLastBlock ? 0 : blockIndex + 1
      goToBlock(nextIndex)
    }, isLastBlock ? 4_000 : 2_500)

    return () => window.clearTimeout(timer)
  }, [autoAdvanceEnabled, blockIndex, stage])

  const handlePrevious = () => {
    const nextIndex = blockIndex === 0 ? terminalSequence.length - 1 : blockIndex - 1
    goToBlock(nextIndex, true)
  }

  const handleNext = () => {
    const nextIndex = (blockIndex + 1) % terminalSequence.length
    goToBlock(nextIndex, true)
  }

  const displayDescription =
    stage === 'description' ? descriptionTyped : activeBlock.description
  const displayQuery = stage === 'query' ? queryTyped : stage === 'description' ? '' : activeBlock.query

  return (
    <section id="monitoring" className="w-full bg-transparent px-6 py-24 md:px-10 lg:px-16">
      <style>{`
        @keyframes terminal-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes terminal-live-pulse {
          0%, 100% { opacity: 0.45; box-shadow: 0 0 0 rgba(0,255,135,0); }
          50% { opacity: 1; box-shadow: 0 0 12px rgba(0,255,135,0.45); }
        }

        .terminal-cursor {
          animation: terminal-cursor-blink 1s steps(1, end) infinite;
        }

        .terminal-live-dot {
          animation: terminal-live-pulse 1.4s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="terminal text-xs uppercase tracking-[0.18em] text-accent2">
            132,532 events ingested from pfSense via UDP/1514 - Mar through Apr 2026
          </p>
          <h2 className="mt-3 font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-ink md:text-[96px]">
            SOC
          </h2>
          <h2 className="font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-accent2 md:text-[96px]">
            MONITORING
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-ink/80 md:text-base">
            132,532 events ingested from pfSense via UDP/1514 - Mar through Apr 2026
          </p>
        </div>

        <motion.div
          className="neo-panel overflow-hidden bg-yellow"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between gap-4 border-b-[4px] border-ink px-4 py-3 md:px-5">
            <TerminalWindowDots />

            <p className="hidden flex-1 text-center font-mono text-[12px] font-medium text-ink md:block">
              splunk@soc-lab - Search &amp; Reporting
            </p>

            <div className="flex items-center gap-2">
              <span className="terminal-live-dot h-2.5 w-2.5 rounded-full bg-pink" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-pink">
                LIVE
              </span>
            </div>
          </div>

          <div className="p-4 md:p-5">
            <div className="neo-card min-h-[31rem] space-y-3 overflow-hidden bg-ink px-4 py-5 font-mono text-paper md:px-5 md:py-6">
              {showDivider && (
                <>
                  <p className="text-[13px] text-[#3b0d4e]">{dividerLine}</p>
                  <div className="h-2" />
                </>
              )}

              <p className="text-[13px] italic text-muted md:text-sm">
                {displayDescription}
                {stage === 'description' && <span className="terminal-cursor ml-1 inline-block text-muted">▋</span>}
              </p>

              <div className="flex items-start gap-3 text-[13px] md:text-sm">
                <span className="pt-[1px] text-pink">❯</span>
                <p className="min-h-[1.5rem] whitespace-pre-wrap break-words text-white">
                  {displayQuery}
                  {stage === 'query' && <span className="terminal-cursor ml-1 inline-block text-white">▋</span>}
                </p>
              </div>

              {stage === 'cursor' && (
                <p className="pl-6 text-white">
                  <span className="terminal-cursor inline-block">▋</span>
                </p>
              )}

              <div className="space-y-1.5 pl-6">
                <AnimatePresence initial={false}>
                  {visibleOutputRows.map((row, index) => (
                    <OutputRow key={`${activeBlock.id}-${row.id}`} row={row} rowIndex={index} block={activeBlock} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="neo-card mt-4 flex flex-col gap-4 bg-paper px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
            132,532 events // Mar-Apr 2026
          </p>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <div className="flex items-center gap-2">
              {terminalSequence.map((block, index) => (
                <span
                  key={block.id}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: blockIndex === index ? '#c000ba' : '#43085f',
                    boxShadow:
                      blockIndex === index ? '0 0 10px rgba(192,0,186,0.38)' : 'none',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Previous terminal query block"
              onClick={handlePrevious}
              className="neo-button bg-pink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
            >
              Previous
            </button>

            <button
              type="button"
              aria-label="Next terminal query block"
              onClick={handleNext}
              className="neo-button bg-sky px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="neo-pill bg-lime px-4 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
            132,532 Events Indexed
          </div>
          <div className="neo-pill bg-sky px-4 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
            udp:1514 Syslog Input
          </div>
          <div className="neo-pill bg-pink px-4 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
            pfSense -&gt; Splunk Pipeline
          </div>
        </div>
      </div>
    </section>
  )
}
