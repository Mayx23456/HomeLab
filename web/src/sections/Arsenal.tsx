import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { tools, type Tool, type ToolCategory } from '../data/tools'

type FilterCategory = 'All' | ToolCategory

type ToolCardProps = {
  tool: Tool
  index: number
}

function ToolCard({ tool, index }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      layout
      className="relative overflow-hidden rounded-xl border bg-surface p-6"
      style={{
        borderColor: 'rgba(0, 255, 135, 0.16)',
        boxShadow: isHovered ? `0 0 0 1px ${tool.accentColour}66, 0 0 36px -16px ${tool.accentColour}` : '',
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: tool.accentColour }} />

      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="terminal text-xl font-semibold text-white">{tool.name}</h3>
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{
            color: tool.accentColour,
            borderColor: `${tool.accentColour}99`,
            backgroundColor: `${tool.accentColour}1a`,
          }}
        >
          {tool.category}
        </span>
      </div>

      <p className="text-sm text-slate-300">{tool.description}</p>

      <AnimatePresence initial={false}>
        {isHovered && (
          <motion.p
            className="mt-5 border-l-2 border-accent/70 pl-3 text-sm text-slate-200"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="mr-1 text-accent">What I learned:</span>
            {tool.learnedText}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export function Arsenal() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')

  const categories = useMemo<FilterCategory[]>(() => {
    return ['All', ...new Set(tools.map((tool) => tool.category))]
  }, [])

  const visibleTools = useMemo(() => {
    if (activeCategory === 'All') {
      return tools
    }

    return tools.filter((tool) => tool.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="arsenal" className="w-full bg-background px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10">
          <h2 className="font-heading text-4xl font-black uppercase tracking-[-0.02em] text-white md:text-6xl">
            Arsenal
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            A focused toolset used for reconnaissance, exploitation simulation, analysis, and
            defensive learning.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory

            return (
              <button
                key={category}
                type="button"
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  isActive
                    ? 'border-accent text-accent shadow-[0_0_22px_-12px_rgba(0,255,135,0.85)]'
                    : 'border-muted text-slate-200 hover:border-accent2 hover:text-accent2'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            )
          })}
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
