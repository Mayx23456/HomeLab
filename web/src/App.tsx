import type { PropsWithChildren } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Navbar } from './components/Navbar'
import { Terminal } from './components/Terminal'
import { NotFound } from './pages/NotFound'
import { Architecture } from './sections/Architecture'
import { Arsenal } from './sections/Arsenal'
import { DetectionWorkflow } from './sections/DetectionWorkflow'
import { Hero } from './sections/Hero'
import { StatsBar } from './sections/StatsBar'

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <main>
        <Hero />
        <StatsBar />
        <Architecture />
        <Arsenal />
        <DetectionWorkflow />
        <Terminal />

        <section id="contact" className="w-full bg-background px-6 pb-24 pt-8 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-7xl rounded-2xl border border-accent/25 bg-surface/80 p-8 md:p-10">
            <p className="terminal text-xs uppercase tracking-[0.18em] text-accent2">
              Contact Channel
            </p>
            <h2 className="mt-3 font-heading text-3xl font-black uppercase tracking-[-0.02em] text-white md:text-5xl">
              Ready To Collaborate
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
              Reach out to discuss detections, architecture hardening, or lab expansion scenarios.
            </p>
            <a
              href="mailto:banerjeemayukh2496@gmail.com"
              className="mt-7 inline-flex items-center justify-center rounded-lg border border-accent bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-background transition hover:shadow-[0_0_32px_rgba(0,255,135,0.5)]"
            >
              banerjeemayukh2496@gmail.com
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] bg-accent"
      aria-hidden="true"
      style={{ scaleX, transformOrigin: 'left', willChange: 'transform' }}
    />
  )
}

function PageFade({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mayukh Banerjee — HomeLab SOC</title>
        <meta
          name="description"
          content="Segmented VirtualBox security lab with pfSense routing, Splunk SIEM monitoring, and controlled blue-team detection workflows."
        />
        <meta property="og:title" content="Mayukh Banerjee — HomeLab SOC" />
        <meta
          property="og:description"
          content="Segmented VirtualBox security lab with pfSense routing, Splunk SIEM monitoring, and controlled blue-team detection workflows."
        />
      </Helmet>

      <ScrollProgressBar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageFade>
                <HomePage />
              </PageFade>
            }
          />
          <Route
            path="*"
            element={
              <PageFade>
                <NotFound />
              </PageFade>
            }
          />
        </Routes>
      </AnimatePresence>

      <SpeedInsights />
    </HelmetProvider>
  )
}

export default App
