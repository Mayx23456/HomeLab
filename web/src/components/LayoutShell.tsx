import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { sectionConfigs } from '../data/sections'

export function LayoutShell({ children }: PropsWithChildren) {
  return (
    <>
      <div className="min-h-screen bg-background text-white">
        <header className="sticky top-0 z-20 border-b border-muted/40 bg-surface/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
              Web Shell
            </p>
            <nav aria-label="Section navigation">
              <ul className="flex items-center gap-4 text-sm text-slate-200">
                {sectionConfigs.map((section) => (
                  <li key={section.id}>
                    <a className="hover:text-accent2 transition-colors" href={`#${section.id}`}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <motion.main
          className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-14 md:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {children}
        </motion.main>
      </div>
    </>
  )
}
