import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

type NumericStatCardProps = {
  target: number
  label: string
  tone: string
}

function NumericStatCard({ target, label, tone }: NumericStatCardProps) {
  const { ref, value, hasEntered } = useCountUp(target, { duration: 1100, threshold: 0.45 })

  return (
    <article ref={ref} className="neo-card relative overflow-hidden px-6 py-8" style={{ backgroundColor: tone }}>
      <motion.span
        className="absolute left-0 top-0 h-[6px] bg-ink"
        initial={{ width: 0 }}
        animate={hasEntered ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />

      <p className="font-mono text-[64px] leading-none text-ink">{value}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink/70">{label}</p>
    </article>
  )
}

export function StatsBar() {
  return (
    <section id="stats" className="w-full bg-background px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-4">
        <NumericStatCard target={3} label="Networks Segmented" tone="#d6ff45" />
        <NumericStatCard target={8} label="Offensive Tools" tone="#7ed7ff" />
        <NumericStatCard target={1} label="Central SIEM" tone="#ff7bd5" />

        <motion.article
          className="neo-card relative overflow-hidden bg-accent px-6 py-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.span
            className="absolute left-0 top-0 h-[6px] bg-ink"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />

          <p className="font-mono text-[64px] leading-none text-ink">24/7</p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink/70">Monitored</p>
        </motion.article>
      </div>
    </section>
  )
}
