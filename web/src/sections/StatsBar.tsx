import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

type NumericStatCardProps = {
  target: number
  label: string
}

function NumericStatCard({ target, label }: NumericStatCardProps) {
  const { ref, value, hasEntered } = useCountUp(target, { duration: 1100, threshold: 0.45 })

  return (
    <article
      ref={ref}
      className="relative overflow-hidden rounded-xl border border-accent/30 bg-surface px-6 py-8"
    >
      <motion.span
        className="absolute left-0 top-0 h-px bg-accent"
        initial={{ width: 0 }}
        animate={hasEntered ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />

      <p className="font-mono text-[64px] leading-none text-accent">{value}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
    </article>
  )
}

export function StatsBar() {
  return (
    <section id="stats" className="w-full bg-background px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-4">
        <NumericStatCard target={3} label="Networks Segmented" />
        <NumericStatCard target={8} label="Offensive Tools" />
        <NumericStatCard target={1} label="Central SIEM" />

        <motion.article
          className="relative overflow-hidden rounded-xl border border-accent/30 bg-surface px-6 py-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.span
            className="absolute left-0 top-0 h-px bg-accent"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />

          <p className="font-mono text-[64px] leading-none text-accent">24/7</p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-400">Monitored</p>
        </motion.article>
      </div>
    </section>
  )
}
