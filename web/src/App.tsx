import type { PropsWithChildren } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { LayoutShell } from './components/LayoutShell'
import { NotFound } from './pages/NotFound'
import { SectionPlaceholders } from './sections/SectionPlaceholders'

function HomePage() {
  return (
    <LayoutShell>
      <SectionPlaceholders />
    </LayoutShell>
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
        <title>Max — HomeLab SOC</title>
        <meta
          name="description"
          content="Segmented VirtualBox security lab with pfSense routing, Splunk SIEM monitoring, and controlled blue-team detection workflows."
        />
        <meta property="og:title" content="Max — HomeLab SOC" />
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
