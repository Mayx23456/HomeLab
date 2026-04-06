import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import heroAsset from '@/assets/hero.png'
import { FallingPattern } from '@/components/ui/falling-pattern'
import { ShaderAnimation } from '@/components/ui/shader-lines'
import { useTypewriter } from '@/hooks/useTypewriter'

const tickerLine =
  'SPLUNK  //  PFSENSE  //  KALI LINUX  //  METASPLOIT  //  WIRESHARK  //  NMAP  //'

const heroStats = [
  { label: 'Boundary', value: 'pfSense' },
  { label: 'Telemetry', value: 'Splunk' },
  { label: 'Segments', value: '3 Zones' },
] as const

const wordEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
}

const headingWord: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: wordEase,
    },
  },
}

export function Hero() {
  const subtitle = useTypewriter('Isolated. Monitored. Segmented.', 65, 350)

  return (
    <section
      id="overview"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(0,255,135,0.18),transparent_36%),radial-gradient(circle_at_88%_22%,rgba(0,200,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_18%,transparent_82%,rgba(0,0,0,0.25)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <div className="absolute inset-x-0 top-[12%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 pb-28 pt-28 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:items-center lg:px-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
          >
            <span className="terminal text-[11px] uppercase tracking-[0.26em] text-accent2">
              Mayukh Banerjee
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="terminal text-[11px] uppercase tracking-[0.26em] text-slate-300">
              Defensive Infrastructure Lab
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 font-heading leading-[0.84] tracking-[-0.04em]"
            variants={headingContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2 text-white">
              <motion.span variants={headingWord} className="text-[56px] font-black md:text-[104px]">
                BLUE
              </motion.span>
              <motion.span
                variants={headingWord}
                className="text-[56px] font-black text-white/80 md:text-[104px]"
              >
                TEAM
              </motion.span>
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
              <motion.span
                variants={headingWord}
                className="text-[52px] font-black text-transparent md:text-[104px]"
                style={{ WebkitTextStroke: '2px #00ff87' }}
              >
                HOME
              </motion.span>
              <motion.span variants={headingWord} className="text-[52px] font-black text-white md:text-[104px]">
                LAB
              </motion.span>
            </div>
          </motion.h1>

          <p className="terminal mt-8 min-h-[2rem] text-lg text-slate-100 md:text-2xl">{subtitle}</p>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
            Built to simulate segmented infrastructure, controlled offensive testing, and
            SOC-style monitoring inside an isolated VirtualBox environment with pfSense at the
            boundary and Splunk at the center of detection.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroStats.map((item) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-md"
              >
                <p className="terminal text-[11px] uppercase tracking-[0.24em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#architecture"
              aria-label="Explore Architecture"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-background transition hover:shadow-[0_0_35px_rgba(0,255,135,0.60)]"
            >
              Explore Architecture
            </a>
            <a
              href="#arsenal"
              aria-label="View Arsenal"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-accent/50 hover:text-accent2"
            >
              View Arsenal
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.16 }}
          className="relative mx-auto w-full max-w-[34rem] lg:justify-self-end"
        >
          <div className="pointer-events-none absolute -left-2 top-8 z-20 rounded-full border border-white/10 bg-background/90 px-3 py-1.5 terminal text-[10px] uppercase tracking-[0.28em] text-accent2 backdrop-blur-md">
            Artifact // 01
          </div>
          <div className="pointer-events-none absolute -right-1 top-12 z-20 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 terminal text-[10px] uppercase tracking-[0.28em] text-accent">
            Live Boundary
          </div>

          <div className="relative aspect-[0.92] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#0c0f14] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_82%_82%,rgba(0,255,135,0.08),transparent_28%)]" />

            <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#d6d4c9]">
              <div className="absolute inset-0 opacity-80">
                <FallingPattern
                  color="rgba(5, 8, 14, 0.92)"
                  backgroundColor="#d6d4c9"
                  duration={180}
                  blurIntensity="0.7em"
                  density={1.12}
                  className="[mask-image:radial-gradient(circle_at_center,black_48%,transparent_100%)]"
                />
              </div>

              <div className="absolute inset-[10%] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#05070d] shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
                <ShaderAnimation />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,transparent_0%,transparent_65%,rgba(0,0,0,0.42)_100%)]" />

                <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="terminal text-[10px] uppercase tracking-[0.32em] text-accent2">
                      SIGNAL PANEL
                    </p>
                    <p className="mt-2 max-w-[10rem] text-sm font-medium leading-5 text-white/90">
                      pfSense logs, Splunk search, and segmented attack paths.
                    </p>
                  </div>
                  <div className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 terminal text-[10px] uppercase tracking-[0.28em] text-accent">
                    SOC
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="max-w-[11rem]">
                    <p className="terminal text-[10px] uppercase tracking-[0.3em] text-white/50">
                      Segmentation // visibility // response
                    </p>
                    <p className="mt-2 text-sm leading-5 text-slate-300">
                      Designed to show the whole detection loop, not just the tools.
                    </p>
                  </div>
                  <div className="terminal text-right text-[10px] uppercase tracking-[0.28em] text-white/40">
                    LAN / SERVER / WORKSTATION
                  </div>
                </div>
              </div>

              <motion.img
                src={heroAsset}
                alt="Abstract layered hardware illustration"
                className="absolute -bottom-[3%] right-[-2%] w-[57%] max-w-[20rem] drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
                animate={{ y: [0, -8, 0], rotate: [0, -1.25, 0] }}
                transition={{ duration: 8, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="absolute left-6 top-6 h-6 w-6 rounded-full border border-[#171717]/60" />
              <div className="absolute bottom-6 left-6 terminal text-[10px] uppercase tracking-[0.32em] text-[#171717]/75">
                MAYUKH / SOC LAB
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-accent/30 bg-[rgba(10,10,15,0.9)] py-4">
        <div className="hero-ticker-track whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-accent2 md:text-base">
          <span className="pr-10">{tickerLine}</span>
          <span className="pr-10">{tickerLine}</span>
        </div>
      </div>
    </section>
  )
}
