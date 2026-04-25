import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { arsenalTools, type ArsenalIconName, type ArsenalTool } from '../data/arsenal'

type ArsenalView = 'grid' | 'detail'
type ArsenalTab = 'HOW' | 'WHAT I DID' | 'ACHIEVED'

const categoryFilters = ['ALL', ...new Set(arsenalTools.map((tool) => tool.category))]
const brutalCardBackgrounds = ['#d9b3ee', '#b85fd8', '#d14fe5', '#f4ddff'] as const

function RadarIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 4v8l5.5 3" />
    </svg>
  )
}

function ShieldSearchIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 3.5 5 6.5v4.8c0 4.9 2.7 8.1 7 9.2 4.3-1.1 7-4.3 7-9.2V6.5l-7-3Z" />
      <circle cx="12" cy="11.5" r="2.5" />
      <path d="m13.8 13.3 2 2" />
    </svg>
  )
}

function BurstIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="m12 3 1.7 4.5L18 6l-2.5 3.8L20.5 12l-5 1.2L18 18l-4.3-1.5L12 21l-1.7-4.5L6 18l2.5-4.8L3.5 12l5-2.2L6 6l4.3 1.5Z" />
    </svg>
  )
}

function KeysIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="8" cy="14" r="3.5" />
      <path d="M11.5 14H20" />
      <path d="M16 14v-2.5" />
      <path d="M18.5 14v-2.5" />
      <path d="m9.5 11 6-6" />
    </svg>
  )
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.4 2.4 3.7 5.1 3.7 8S14.4 17.6 12 20" />
      <path d="M12 4c-2.4 2.4-3.7 5.1-3.7 8S9.6 17.6 12 20" />
    </svg>
  )
}

function WavesIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M3.5 10c1.4 0 1.9-1 3.3-1s1.9 1 3.3 1 1.9-1 3.3-1 1.9 1 3.3 1 1.9-1 3.3-1" />
      <path d="M3.5 14c1.4 0 1.9-1 3.3-1s1.9 1 3.3 1 1.9-1 3.3-1 1.9 1 3.3 1 1.9-1 3.3-1" />
      <path d="M3.5 18c1.4 0 1.9-1 3.3-1s1.9 1 3.3 1 1.9-1 3.3-1 1.9 1 3.3 1 1.9-1 3.3-1" />
    </svg>
  )
}

function HashIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M8 4 6 20" />
      <path d="M15 4 13 20" />
      <path d="M4 9h16" />
      <path d="M3 15h16" />
    </svg>
  )
}

function PacketIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 3 4.5 7v10L12 21l7.5-4V7Z" />
      <path d="M4.5 7 12 11l7.5-4" />
      <path d="M12 11v10" />
    </svg>
  )
}

function IconForTool({ icon, color }: { icon: ArsenalIconName; color: string }) {
  switch (icon) {
    case 'radar':
      return <RadarIcon color={color} />
    case 'shield-search':
      return <ShieldSearchIcon color={color} />
    case 'burst':
      return <BurstIcon color={color} />
    case 'keys':
      return <KeysIcon color={color} />
    case 'globe':
      return <GlobeIcon color={color} />
    case 'waves':
      return <WavesIcon color={color} />
    case 'hash':
      return <HashIcon color={color} />
    case 'packet':
      return <PacketIcon color={color} />
    default:
      return null
  }
}

function OpenArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10h10" />
      <path d="m10 5 5 5-5 5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="#c000ba" strokeWidth="2">
      <path d="m4.5 10.5 3.2 3.2 7.8-7.9" />
    </svg>
  )
}

function clampTwoLinesStyle() {
  return {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  }
}

function DetailPanel({ tool }: { tool: ArsenalTool }) {
  const [activeTab, setActiveTab] = useState<ArsenalTab>('HOW')

  return (
    <div className="neo-card bg-paper p-5 md:p-6">
      <div className="flex flex-col gap-4 border-b-[3px] border-ink pb-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[3px] border-ink bg-white"
            style={{
              boxShadow: `4px 4px 0 ${tool.categoryColour}`,
            }}
          >
            <IconForTool icon={tool.icon} color={tool.categoryColour} />
          </div>

          <div>
            <h3 className="font-mono text-xl font-bold text-ink md:text-2xl">{tool.name}</h3>
            <span
              className="neo-pill mt-3 inline-flex px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                backgroundColor: '#f4ddff',
                color: tool.categoryColour,
              }}
            >
              {tool.category}
            </span>
            <p className="mt-4 max-w-3xl text-sm text-ink/80 md:text-base">{tool.what}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="relative flex flex-wrap gap-2 border-b-[3px] border-ink pb-3">
          {(['HOW', 'WHAT I DID', 'ACHIEVED'] as ArsenalTab[]).map((tab) => {
            const isActive = activeTab === tab

            return (
              <button
                key={tab}
                type="button"
                className={`relative rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                  isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {isActive && (
                  <motion.span
                    layoutId="arsenal-tab-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: tool.categoryColour,
                      border: '3px solid #111111',
                      boxShadow: '4px 4px 0 #111111',
                    }}
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-5">
          <AnimatePresence mode="wait">
            {activeTab === 'HOW' && (
              <motion.div
                key={`how-${tool.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {tool.commands.length > 0 ? (
                  <div className="neo-card overflow-hidden bg-ink">
                    <div className="flex items-center justify-between border-b-[3px] border-paper/20 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#43085f]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#77008a]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#c000ba]" />
                      </div>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper/70">
                        {tool.name}
                      </span>
                    </div>

                    <div className="space-y-3 px-4 py-4 font-mono text-sm">
                      {tool.commands.map((command) => (
                        <div key={command} className="flex gap-3">
                          <span style={{ color: tool.categoryColour }}>❯</span>
                          <span className="break-all text-paper">{command}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ol className="space-y-4">
                    {tool.how.map((step, index) => (
                      <li key={step} className="flex gap-4">
                        <span
                          className="font-mono text-lg font-bold"
                          style={{ color: tool.categoryColour }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="pt-0.5 text-sm text-ink md:text-base">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </motion.div>
            )}

            {activeTab === 'WHAT I DID' && (
              <motion.div
                key={`did-${tool.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-4"
              >
                {tool.how.map((step, index) => (
                  <div
                    key={step}
                    className="neo-card relative overflow-hidden bg-white px-5 py-5"
                  >
                    <span className="pointer-events-none absolute right-4 top-2 font-mono text-[40px] font-black leading-none text-ink/10">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="relative z-10 max-w-3xl text-sm text-ink md:text-base">{step}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'ACHIEVED' && (
              <motion.div
                key={`achieved-${tool.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
              >
                {tool.achieved.map((achievement) => (
                  <div
                    key={achievement}
                    className="neo-card flex items-start gap-3 bg-white px-4 py-4"
                    style={{ borderLeft: '8px solid #c000ba' }}
                  >
                    <div className="mt-0.5">
                      <CheckIcon />
                    </div>
                    <p className="text-sm text-ink md:text-base">{achievement}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

type ToolCardProps = {
  tool: ArsenalTool
  index: number
  isExpanded: boolean
  onToggle: (toolId: string) => void
}

function ToolCard({ tool, index, isExpanded, onToggle }: ToolCardProps) {
  return (
    <motion.article
      layout
      className="neo-card overflow-hidden"
      style={{
        backgroundColor: brutalCardBackgrounds[index % brutalCardBackgrounds.length],
        borderLeft: `10px solid ${tool.categoryColour}`,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.34, delay: index * 0.07, ease: 'easeOut' }}
    >
      <div className="px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-mono text-[18px] font-bold text-ink">{tool.name}</h3>
            <span
              className="neo-pill mt-3 inline-flex bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{
                color: tool.categoryColour,
              }}
            >
              {tool.category}
            </span>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink bg-white">
            <IconForTool icon={tool.icon} color={tool.categoryColour} />
          </div>
        </div>

        {!isExpanded && (
          <p className="mt-5 text-sm leading-6 text-ink/75" style={clampTwoLinesStyle()}>
            {tool.what}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
            {isExpanded ? 'Expanded' : 'Overview'}
          </span>

          <button
            type="button"
            className="neo-button inline-flex items-center gap-2 bg-paper px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
            onClick={() => onToggle(tool.id)}
          >
            {isExpanded ? 'CLOSE' : 'OPEN'}
            <span className={`transition ${isExpanded ? 'rotate-90' : ''}`}>
              <OpenArrowIcon />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key={`${tool.id}-expanded`}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            className="border-t-[3px] border-ink px-5 pb-5 pt-5"
          >
            <DetailPanel key={tool.id} tool={tool} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export function Arsenal() {
  const [view, setView] = useState<ArsenalView>('grid')
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null)
  const [pendingToolId, setPendingToolId] = useState<string | null>(null)
  const [detailToolId, setDetailToolId] = useState<string>(arsenalTools[0].id)
  const collapseTimerRef = useRef<number | null>(null)

  const visibleTools =
    activeCategory === 'ALL'
      ? arsenalTools
      : arsenalTools.filter((tool) => tool.category === activeCategory)

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!pendingToolId) {
      return
    }

    collapseTimerRef.current = window.setTimeout(() => {
      setExpandedToolId(pendingToolId)
      setPendingToolId(null)
      collapseTimerRef.current = null
    }, 220)

    return () => {
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current)
        collapseTimerRef.current = null
      }
    }
  }, [pendingToolId])

  const selectedTool = visibleTools.find((tool) => tool.id === detailToolId) ?? visibleTools[0]
  const activeExpandedToolId = visibleTools.some((tool) => tool.id === expandedToolId)
    ? expandedToolId
    : null

  const handleToggleCard = (toolId: string) => {
    if (expandedToolId === toolId) {
      setExpandedToolId(null)
      setPendingToolId(null)
      return
    }

    if (expandedToolId) {
      setExpandedToolId(null)
      setPendingToolId(toolId)
      return
    }

    setExpandedToolId(toolId)
  }

  return (
    <section id="arsenal" className="w-full bg-transparent px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="terminal text-xs uppercase tracking-[0.18em] text-accent2">
            Tools used. Techniques practiced. Lessons learned.
          </p>
          <h2 className="mt-3 font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-ink md:text-[96px]">
            ARSENAL
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-ink/80 md:text-base">
            Offensive and defensive tooling used inside the homelab to generate telemetry, test
            controls, and understand how real activity appears from both attacker and defender
            perspectives.
          </p>
        </div>

        <div className="neo-panel bg-surface p-5 md:p-6">
          <div className="flex flex-col gap-4 border-b-[4px] border-ink pb-5">
            <div className="flex flex-wrap gap-3">
              {(['grid', 'detail'] as ArsenalView[]).map((mode) => {
                const isActive = view === mode

                return (
                  <button
                    key={mode}
                    type="button"
                    className={`neo-button px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${
                      isActive
                        ? 'bg-accent text-ink'
                        : 'bg-paper text-ink'
                    }`}
                    onClick={() => setView(mode)}
                  >
                    {mode === 'grid' ? 'GRID VIEW' : 'DETAIL VIEW'}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((category) => {
                const isActive = activeCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    className={`neo-pill px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                      isActive
                        ? 'bg-accent2 text-paper'
                        : 'bg-paper text-ink'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {view === 'grid' ? (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                >
                  <LayoutGroup>
                    <motion.div
                      layout
                      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
                    >
                      {visibleTools.map((tool, index) => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          index={index}
                          isExpanded={activeExpandedToolId === tool.id}
                          onToggle={handleToggleCard}
                        />
                      ))}
                    </motion.div>
                  </LayoutGroup>
                </motion.div>
              ) : (
                <motion.div
                  key="detail-view"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="grid grid-cols-1 gap-5 md:grid-cols-[260px_minmax(0,1fr)]"
                >
                  <div>
                    <div className="md:hidden">
                      <label className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink/70">
                        Select Tool
                      </label>
                      <select
                        value={selectedTool?.id}
                        onChange={(event) => setDetailToolId(event.target.value)}
                        className="neo-card w-full bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent2"
                      >
                        {visibleTools.map((tool) => (
                          <option key={tool.id} value={tool.id}>
                            {tool.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="hidden md:flex md:flex-col md:gap-2">
                      {visibleTools.map((tool) => {
                        const isActive = selectedTool?.id === tool.id

                        return (
                          <button
                            key={tool.id}
                            type="button"
                            onClick={() => setDetailToolId(tool.id)}
                            className={`neo-card flex items-center gap-3 px-4 py-3 text-left transition ${
                              isActive
                                ? 'text-ink'
                                : 'text-ink/65 hover:text-ink'
                            }`}
                            style={{
                              backgroundColor: isActive ? `${tool.categoryColour}55` : '#f4ddff',
                            }}
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: tool.categoryColour }}
                            />
                            <span className="font-mono text-sm font-bold">{tool.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>{selectedTool ? <DetailPanel key={selectedTool.id} tool={selectedTool} /> : null}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
