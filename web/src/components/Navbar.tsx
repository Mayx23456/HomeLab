import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

type NavItem = {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'detection', label: 'Detection' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(navItems[0].id)
  const { scrollY } = useScroll()

  const yPadding = useTransform(scrollY, [0, 80], [16, 10])
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.96])
  const borderAlpha = useTransform(scrollY, [0, 80], [0, 1])
  const borderColor = useTransform(borderAlpha, (alpha) => `rgba(0, 255, 135, ${alpha})`)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) {
          return
        }

        const mostVisible = visible.reduce((previous, current) =>
          current.intersectionRatio > previous.intersectionRatio ? current : previous,
        )

        setActiveSection(mostVisible.target.id)
      },
      {
        root: null,
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <>
      <style>{`
        @keyframes navbar-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .navbar-cursor {
          animation: navbar-cursor-blink 1s steps(1, end) infinite;
        }
      `}</style>

      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-solid bg-[rgba(10,10,15,0.78)] backdrop-blur-xl"
        style={{
          paddingTop: yPadding,
          paddingBottom: yPadding,
          borderBottomColor: borderColor,
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-8">
          <motion.a
            href="#overview"
            aria-label="Navigate to overview section"
            className="inline-flex items-center font-mono text-sm font-semibold tracking-[0.08em] text-accent md:text-base"
            style={{ scale: logoScale }}
          >
            MAX // SOC-LAB
            <span aria-hidden="true" className="navbar-cursor ml-1 inline-block h-5 w-[2px] bg-accent" />
          </motion.a>

          <nav aria-label="Primary site navigation" className="hidden md:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-label={`Navigate to ${item.label} section`}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-slate-200 hover:text-accent2 focus-visible:text-accent2'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-accent/35 text-accent md:hidden"
            onClick={() => setIsDrawerOpen((open) => !open)}
          >
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu overlay"
              className="fixed inset-0 z-40 bg-black/60"
              onClick={closeDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-screen w-[min(86vw,22rem)] flex-col border-l border-accent/50 bg-[rgba(10,10,15,0.96)] p-6 backdrop-blur-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <a
                  href="#overview"
                  aria-label="Navigate to overview section"
                  className="inline-flex items-center font-mono text-sm font-semibold tracking-[0.08em] text-accent"
                  onClick={closeDrawer}
                >
                  MAX // SOC-LAB
                  <span
                    aria-hidden="true"
                    className="navbar-cursor ml-1 inline-block h-5 w-[2px] bg-accent"
                  />
                </a>

                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="rounded-md border border-accent/35 px-3 py-2 text-xs uppercase tracking-[0.12em] text-accent"
                  onClick={closeDrawer}
                >
                  Close
                </button>
              </div>

              <nav aria-label="Mobile site navigation">
                <ul className="space-y-3">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id

                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          aria-label={`Navigate to ${item.label} section`}
                          className={`block rounded-lg px-4 py-3 text-base ${
                            isActive
                              ? 'bg-accent/10 text-accent'
                              : 'text-slate-200 hover:text-accent2 focus-visible:text-accent2'
                          }`}
                          onClick={closeDrawer}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
