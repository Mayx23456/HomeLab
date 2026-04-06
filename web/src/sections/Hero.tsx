import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

const tickerLine =
  'SPLUNK  //  PFSENSE  //  KALI LINUX  //  METASPLOIT  //  WIRESHARK  //  NMAP  //'

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
  const heroRef = useRef<HTMLElement | null>(null)
  const gridRef = useRef<SVGSVGElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const subtitle = useTypewriter('Isolated. Monitored. Segmented.', 65, 350)

  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) {
      return
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (event.clientX - centerX) / 25
      const deltaY = (event.clientY - centerY) / 25

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }

      frameRef.current = window.requestAnimationFrame(() => {
        if (gridRef.current) {
          gridRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`
        }
      })
    }

    const handleMouseLeave = () => {
      if (gridRef.current) {
        gridRef.current.style.transform = 'translate3d(0px, 0px, 0px)'
      }
    }

    heroEl.addEventListener('mousemove', handleMouseMove)
    heroEl.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove)
      heroEl.removeEventListener('mouseleave', handleMouseLeave)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <section
      id="overview"
      ref={heroRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-background"
    >
      <style>{`
        @keyframes hero-ticker-loop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .hero-ticker-track {
          display: inline-flex;
          width: max-content;
          animation: hero-ticker-loop 24s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg
          ref={gridRef}
          className="absolute -left-10 -top-10 h-[calc(100%+80px)] w-[calc(100%+80px)] opacity-[0.06] transition-transform duration-200 ease-out"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="hero-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,135,0.10),transparent_58%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-28 pt-28 md:px-10 lg:px-16">
        <motion.h1
          className="font-heading leading-[0.88] tracking-[-0.03em]"
          variants={headingContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2 text-white">
            <motion.span variants={headingWord} className="text-[60px] font-black md:text-[96px]">
              BLUE
            </motion.span>
            <motion.span variants={headingWord} className="text-[60px] font-black md:text-[96px]">
              TEAM
            </motion.span>
          </div>

          <div className="mt-1 flex flex-wrap items-end gap-x-4 gap-y-2">
            <motion.span
              variants={headingWord}
              className="text-[56px] font-black text-transparent md:text-[96px]"
              style={{ WebkitTextStroke: '2px #00ff87' }}
            >
              HOME
            </motion.span>
            <motion.span
              variants={headingWord}
              className="text-[56px] font-black text-transparent md:text-[96px]"
              style={{ WebkitTextStroke: '2px #00ff87' }}
            >
              LAB
            </motion.span>
          </div>
        </motion.h1>

        <p className="terminal mt-8 min-h-[2rem] text-lg text-slate-200 md:text-2xl">{subtitle}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#architecture"
            aria-label="Explore Architecture"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-background transition hover:shadow-[0_0_35px_rgba(0,255,135,0.60)]"
          >
            Explore Architecture
          </a>
          <a
            href="#arsenal"
            aria-label="View Arsenal"
            className="inline-flex items-center justify-center rounded-lg border border-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent transition hover:shadow-[0_0_32px_rgba(0,255,135,0.48)]"
          >
            View Arsenal
          </a>
        </div>
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
