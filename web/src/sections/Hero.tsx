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
        <div className="absolute left-[6%] top-[14%] h-36 w-36 rounded-[2rem] border-[4px] border-ink bg-pink" />
        <div className="absolute right-[8%] top-[18%] h-24 w-24 rounded-full border-[4px] border-ink bg-sky" />
        <div className="absolute left-[42%] top-[8%] h-5 w-56 bg-accent2" />
        <div className="absolute bottom-[14%] right-[14%] h-28 w-28 rounded-[1.5rem] border-[4px] border-ink bg-lime" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 pb-28 pt-28 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:items-center lg:px-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="neo-pill inline-flex items-center gap-3 bg-lime px-4 py-2"
          >
            <span className="terminal text-[11px] uppercase tracking-[0.26em] text-accent2">
              Mayukh Banerjee
            </span>
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="terminal text-[11px] uppercase tracking-[0.26em] text-ink/80">
              Defensive Infrastructure Lab
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 font-heading leading-[0.84] tracking-[-0.04em]"
            variants={headingContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2 text-ink">
              <motion.span variants={headingWord} className="text-[56px] font-black md:text-[104px]">
                BLUE
              </motion.span>
              <motion.span
                variants={headingWord}
                className="rounded-[1.4rem] bg-accent px-3 py-1 text-[56px] font-black text-ink md:text-[104px]"
              >
                TEAM
              </motion.span>
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
              <motion.span
                variants={headingWord}
                className="text-[52px] font-black text-accent2 md:text-[104px]"
              >
                HOME
              </motion.span>
              <motion.span
                variants={headingWord}
                className="rounded-[1.4rem] bg-yellow px-3 py-1 text-[52px] font-black text-ink md:text-[104px]"
              >
                LAB
              </motion.span>
            </div>
          </motion.h1>

          <p className="terminal mt-8 min-h-[2rem] text-lg text-ink/80 md:text-2xl">{subtitle}</p>

          <p className="mt-6 max-w-xl text-base leading-7 text-ink/80 md:text-lg">
            Built to simulate segmented infrastructure, controlled offensive testing, and
            SOC-style monitoring inside an isolated VirtualBox environment with pfSense at the
            boundary and Splunk at the center of detection.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroStats.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="neo-card px-4 py-4"
                style={{
                  backgroundColor: ['#fff1a8', '#7ed7ff', '#ff7bd5'][index],
                }}
              >
                <p className="terminal text-[11px] uppercase tracking-[0.24em] text-ink/70">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">{item.value}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#architecture"
              aria-label="Explore Architecture"
              className="neo-button inline-flex items-center justify-center bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Explore Architecture
            </a>
            <a
              href="#arsenal"
              aria-label="View Arsenal"
              className="neo-button inline-flex items-center justify-center bg-accent2 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-paper"
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
          <div className="neo-pill pointer-events-none absolute -left-2 top-8 z-20 bg-sky px-3 py-1.5 terminal text-[10px] uppercase tracking-[0.28em] text-ink">
            Artifact // 01
          </div>
          <div className="neo-pill pointer-events-none absolute -right-1 top-12 z-20 bg-lime px-3 py-1.5 terminal text-[10px] uppercase tracking-[0.28em] text-ink">
            Live Boundary
          </div>

          <div className="neo-panel relative aspect-[0.92] overflow-hidden bg-yellow p-4">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%),repeating-linear-gradient(90deg,transparent_0_28px,rgba(17,17,17,0.06)_28px_29px)]" />

            <div className="neo-card relative h-full overflow-hidden bg-[#fff3b6]">
              <div className="absolute inset-0 opacity-90">
                <FallingPattern
                  color="rgba(17, 17, 17, 0.92)"
                  backgroundColor="#fff3b6"
                  duration={180}
                  blurIntensity="0.5em"
                  density={0.95}
                  className="[mask-image:radial-gradient(circle_at_center,black_48%,transparent_100%)]"
                />
              </div>

              <div className="neo-card absolute inset-[10%] overflow-hidden bg-accent2">
                <ShaderAnimation primary="#ffd84d" secondary="#ffffff" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,transparent_0%,transparent_65%,rgba(0,0,0,0.18)_100%)]" />

                <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="terminal text-[10px] uppercase tracking-[0.32em] text-yellow">
                      SIGNAL PANEL
                    </p>
                    <p className="mt-2 max-w-[10rem] text-sm font-medium leading-5 text-paper">
                      pfSense logs, Splunk search, and segmented attack paths.
                    </p>
                  </div>
                  <div className="neo-pill bg-yellow px-3 py-1 terminal text-[10px] uppercase tracking-[0.28em] text-ink">
                    SOC
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="max-w-[11rem]">
                    <p className="terminal text-[10px] uppercase tracking-[0.3em] text-paper/70">
                      Segmentation // visibility // response
                    </p>
                    <p className="mt-2 text-sm leading-5 text-paper/90">
                      Designed to show the whole detection loop, not just the tools.
                    </p>
                  </div>
                  <div className="terminal text-right text-[10px] uppercase tracking-[0.28em] text-paper/70">
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

              <div className="absolute left-6 top-6 h-6 w-6 rounded-full border-[3px] border-ink" />
              <div className="absolute bottom-6 left-6 terminal text-[10px] uppercase tracking-[0.32em] text-ink/75">
                MAYUKH / SOC LAB
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t-[4px] border-ink bg-pink py-4">
        <div className="hero-ticker-track whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-ink md:text-base">
          <span className="pr-10">{tickerLine}</span>
          <span className="pr-10">{tickerLine}</span>
        </div>
      </div>
    </section>
  )
}
