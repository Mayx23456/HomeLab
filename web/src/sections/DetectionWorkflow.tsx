import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type WorkflowStep = {
  id: string
  number: string
  title: string
  description: string
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'step-01',
    number: '01',
    title: 'Test traffic generated from Kali and lab systems',
    description:
      'Controlled scans, probes, and exploit simulations create the baseline detection signal.',
  },
  {
    id: 'step-02',
    number: '02',
    title: 'pfSense routes, filters, and logs at the network boundary',
    description:
      'Perimeter policy decisions and packet metadata are captured at the segmentation point.',
  },
  {
    id: 'step-03',
    number: '03',
    title: 'Syslog forwarded to Splunk on UDP/1514',
    description:
      'Firewall telemetry is centralized so detections can be correlated and searched rapidly.',
  },
  {
    id: 'step-04',
    number: '04',
    title: 'Splunk dashboards and raw event search',
    description:
      'Dashboards surface trends while raw queries validate the exact source and timeline.',
  },
  {
    id: 'step-05',
    number: '05',
    title: 'Correlation across packets, firewall logs, and SIEM telemetry',
    description:
      'Cross-source evidence confirms attack behavior and improves response confidence.',
  },
]

const workflowStepBackgrounds = ['#d9b3ee', '#b85fd8', '#d14fe5', '#c000ba', '#f4ddff'] as const

export function DetectionWorkflow() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })
  const linePathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="detection"
      ref={sectionRef}
      className="w-full bg-transparent px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="terminal text-xs uppercase tracking-[0.18em] text-accent2">
            Packet to alert, mapped as a response chain
          </p>
          <h2 className="font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-ink md:text-[96px]">
            DETECTION
          </h2>
          <h2 className="font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-accent md:text-[96px]">
            WORKFLOW
          </h2>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-6 w-[2px] md:left-1/2 md:-translate-x-1/2">
            <svg
              className="h-full w-full"
              viewBox="0 0 2 1000"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="1" y1="0" x2="1" y2="1000" stroke="#43085f" strokeWidth="4" />
              <motion.path
                d="M 1 0 V 1000"
                stroke="#a000ad"
                strokeWidth="4"
                style={{ pathLength: linePathLength }}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <ol className="space-y-8 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:space-y-0">
            {workflowSteps.map((step, index) => {
              const isLeft = index % 2 === 0
              const stepSide = isLeft
                ? 'md:col-start-1 md:pr-14 md:text-right'
                : 'md:col-start-2 md:pl-14 md:text-left'
              const cardEdge = isLeft ? 'md:ml-auto' : 'md:mr-auto'
              const markerSide = isLeft
                ? 'left-6 md:left-auto md:right-[-7px]'
                : 'left-6 md:left-[-7px] md:right-auto'

              return (
                <li key={step.id} className={`relative pl-14 ${stepSide}`}>
                  <span
                    className={`absolute top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ${markerSide}`}
                    aria-hidden="true"
                  />

                  <motion.article
                    className={`neo-card relative max-w-xl overflow-hidden p-6 md:p-7 ${cardEdge}`}
                    initial={{ opacity: 0, x: isLeft ? -72 : 72 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    style={{ backgroundColor: workflowStepBackgrounds[index] }}
                  >
                    <span
                      className="pointer-events-none absolute right-4 top-2 select-none font-mono text-[80px] font-black leading-none text-ink/10"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>

                    <p className="terminal text-xs font-semibold uppercase tracking-[0.18em] text-accent2">
                      Step {step.number}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-ink md:text-2xl">{step.title}</h3>
                    <p className="mt-3 text-sm text-ink/80 md:text-base">{step.description}</p>
                  </motion.article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
