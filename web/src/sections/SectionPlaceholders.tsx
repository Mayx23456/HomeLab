import { motion } from 'framer-motion'
import { sectionConfigs } from '../data/sections'
import { usePageTitle } from '../hooks/usePageTitle'

export function SectionPlaceholders() {
  usePageTitle('Web Starter Shell')

  return (
    <>
      <section
        id="hero"
        className="rounded-3xl border border-accent/40 bg-gradient-to-br from-surface to-background p-8 shadow-[0_0_80px_-45px_rgba(0,255,135,0.9)] md:p-12"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-accent2">Single-page starter</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold md:text-6xl">
          Build your sections here
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
          This layout shell includes routing, motion, and theme tokens so you can start wiring real
          content immediately.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {sectionConfigs
          .filter((section) => section.id !== 'hero')
          .map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              className="rounded-2xl border border-muted/60 bg-surface p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <h2 className="font-heading text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{section.description}</p>
              <p className="terminal mt-6 rounded-lg border border-muted/70 bg-background px-4 py-3 text-xs text-accent2">
                Section placeholder: <code>{`#${section.id}`}</code>
              </p>
            </motion.section>
          ))}
      </div>
    </>
  )
}
