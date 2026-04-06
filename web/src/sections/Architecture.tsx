import { useEffect, useRef, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
  type NodeProps,
  type NodeTypes,
} from '@xyflow/react'
import { AnimatePresence, motion } from 'framer-motion'
import '@xyflow/react/dist/style.css'
import {
  topologyEdges,
  topologyNodeIds,
  topologyNodes,
  type TopologyDeviceNode,
  type TopologyDeviceNodeData,
  type TopologyEdge,
  type TopologyNode,
  type TopologyZoneNode,
} from '../data/topology'
import { useAttackSimulation } from '../hooks/useAttackSimulation'
import { useWindowSize } from '../hooks/useWindowSize'

const hiddenHandleClass = '!h-2 !w-2 !border-0 !bg-transparent !opacity-0'

type IconProps = {
  color: string
}

type EdgePulseProps = {
  containerRef: React.RefObject<HTMLDivElement | null>
  edgeId: string
  color: string
  elapsedMs: number
  delayMs: number
  travelMs: number
  direction?: 'forward' | 'reverse'
  layoutVersion: string
  runKey: number
}

function ComputerIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="3.5" y="4.5" width="17" height="11" rx="2.5" />
      <path d="M8 19.5h8" />
      <path d="M10 15.5v4" />
      <path d="M14 15.5v4" />
    </svg>
  )
}

function ShieldIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 3.5 5 6.5v5.3c0 4.7 2.7 7.8 7 8.9 4.3-1.1 7-4.2 7-8.9V6.5l-7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.6-4.1" />
    </svg>
  )
}

function TerminalIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="m8 10 3 2.5L8 15" />
      <path d="M13.5 15h3.5" />
    </svg>
  )
}

function ServerIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="6" rx="2" />
      <rect x="4" y="14" width="16" height="6" rx="2" />
      <path d="M7 7h.01" />
      <path d="M7 17h.01" />
      <path d="M11 7h6" />
      <path d="M11 17h6" />
    </svg>
  )
}

function ChartIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M4.5 19.5h15" />
      <path d="M7 16V9" />
      <path d="M12 16V6.5" />
      <path d="M17 16v-4" />
      <path d="m6 8.5 4-2 3.5 1 3-3" />
    </svg>
  )
}

function WindowsIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M4.5 5.5 11 4v7H4.5Z" />
      <path d="M13 3.6 19.5 2.3v8.7H13Z" />
      <path d="M4.5 12.5H11v7l-6.5-1.4Z" />
      <path d="M13 12.5h6.5v9.2L13 20.4Z" />
    </svg>
  )
}

function NodeIcon({ icon, color }: { icon: TopologyDeviceNodeData['icon']; color: string }) {
  switch (icon) {
    case 'computer':
      return <ComputerIcon color={color} />
    case 'shield':
      return <ShieldIcon color={color} />
    case 'terminal':
      return <TerminalIcon color={color} />
    case 'server':
      return <ServerIcon color={color} />
    case 'chart':
      return <ChartIcon color={color} />
    case 'windows':
      return <WindowsIcon color={color} />
    default:
      return null
  }
}

function DeviceNodeCard({ data }: NodeProps<TopologyDeviceNode>) {
  const isFirewall = data.kind === 'firewall'
  const isLarge = Boolean(data.large)
  const activeGlow = data.isActive ? `${data.accent}88` : `${data.accent}38`
  const baseGlow = data.isActive ? '0 0 30px -12px' : '0 0 18px -16px'
  const rapidClass = data.rapidPulse ? 'topology-node-splunk-pulse' : ''
  const firewallClass = isFirewall ? 'topology-firewall-shell' : ''

  return (
    <div
      className={`relative overflow-visible rounded-2xl bg-[#111118] ${isLarge ? 'w-[300px] px-6 py-5' : 'w-[188px] px-4 py-3'} ${rapidClass} ${firewallClass}`}
      style={{
        borderTop: `3px solid ${data.accent}`,
        borderLeft: `1px solid ${data.accent}30`,
        borderRight: `1px solid ${data.accent}30`,
        borderBottom: `1px solid ${data.accent}30`,
        boxShadow: `inset 0 0 24px ${data.accent}18, ${baseGlow} ${activeGlow}`,
      }}
    >
      <Handle id="top" type="target" position={Position.Top} className={hiddenHandleClass} />
      <Handle id="right" type="source" position={Position.Right} className={hiddenHandleClass} />
      <Handle id="bottom" type="source" position={Position.Bottom} className={hiddenHandleClass} />
      <Handle id="left" type="target" position={Position.Left} className={hiddenHandleClass} />

      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{
            borderColor: `${data.accent}66`,
            backgroundColor: `${data.accent}15`,
            boxShadow: `inset 0 0 16px ${data.accent}22`,
          }}
        >
          <NodeIcon icon={data.icon} color={data.accent} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.02em] text-white">
            {data.label}
          </p>
          <span
            className="mt-3 inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              borderColor: `${data.accent}55`,
              color: data.accent,
              backgroundColor: `${data.accent}16`,
            }}
          >
            {data.roleBadge}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {Boolean(data.flashAlert) && (
          <motion.div
            key={`flash-${data.flashKey ?? 0}`}
            className="pointer-events-none absolute inset-[-2px] rounded-[18px] border border-[#ff3c3c]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ boxShadow: '0 0 0 1px rgba(255,60,60,0.45), 0 0 28px rgba(255,60,60,0.50)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {Boolean(data.showAlert) && (
          <motion.div
            key={`alert-${data.alertKey ?? 0}`}
            className="pointer-events-none absolute left-1/2 top-[-20px] -translate-x-1/2 rounded-full border border-[#ff3c3c]/65 bg-[#190d11]/95 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#ff8d8d]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 1, 0], y: [6, -4, -4, -10] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            ALERT TRIGGERED
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ZoneBadgeNode({ data }: NodeProps<TopologyZoneNode>) {
  return (
    <div className="pointer-events-none select-none rounded-full border border-dashed border-slate-500/55 bg-transparent px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-slate-300">
      <Handle id="top" type="target" position={Position.Top} className={hiddenHandleClass} />
      <Handle id="bottom" type="source" position={Position.Bottom} className={hiddenHandleClass} />
      {data.label}
    </div>
  )
}

const nodeTypes: NodeTypes = {
  deviceNode: DeviceNodeCard,
  zoneNode: ZoneBadgeNode,
}

function findEdgePath(container: HTMLDivElement, edgeId: string) {
  return (
    container.querySelector<SVGPathElement>(
      `.react-flow__edge[data-id="${edgeId}"] .react-flow__edge-path`,
    ) ??
    container.querySelector<SVGPathElement>(`[data-id="${edgeId}"] .react-flow__edge-path`) ??
    container.querySelector<SVGPathElement>(`#react-flow__edge-${edgeId} .react-flow__edge-path`)
  )
}

function getPointAlongPath(
  path: SVGPathElement,
  length: number,
  progress: number,
  container: HTMLDivElement,
) {
  const svg = path.ownerSVGElement
  const ctm = path.getScreenCTM()
  if (!svg || !ctm) {
    return null
  }

  const pathPoint = path.getPointAtLength(length * progress)
  const svgPoint = svg.createSVGPoint()
  svgPoint.x = pathPoint.x
  svgPoint.y = pathPoint.y

  const screenPoint = svgPoint.matrixTransform(ctm)
  const containerRect = container.getBoundingClientRect()

  return {
    x: screenPoint.x - containerRect.left,
    y: screenPoint.y - containerRect.top,
  }
}

function EdgePulse({
  containerRef,
  edgeId,
  color,
  elapsedMs,
  delayMs,
  travelMs,
  direction = 'forward',
  layoutVersion,
  runKey,
}: EdgePulseProps) {
  const [pathState, setPathState] = useState<{
    path: SVGPathElement
    length: number
    container: HTMLDivElement
  } | null>(null)
  const size = 12

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    let frameId = 0
    let attempts = 0

    const resolvePath = () => {
      const path = findEdgePath(container, edgeId)
      if (!path) {
        attempts += 1
        if (attempts < 24) {
          frameId = window.requestAnimationFrame(resolvePath)
        }
        return
      }

      setPathState({
        path,
        length: path.getTotalLength(),
        container,
      })
    }

    frameId = window.requestAnimationFrame(resolvePath)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [containerRef, edgeId, layoutVersion, runKey])

  const localProgress = (elapsedMs - delayMs) / travelMs
  const isVisible = localProgress >= 0 && localProgress <= 1 && Boolean(pathState)
  const normalizedProgress = direction === 'reverse' ? 1 - localProgress : localProgress

  let x = -999
  let y = -999

  if (isVisible && pathState) {
    const point = getPointAlongPath(
      pathState.path,
      pathState.length,
      normalizedProgress,
      pathState.container,
    )

    if (point) {
      x = point.x - size / 2
      y = point.y - size / 2
    }
  }

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-30 rounded-full"
      animate={{
        x,
        y,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.45,
      }}
      transition={{
        x: { duration: 0.06, ease: 'linear' },
        y: { duration: 0.06, ease: 'linear' },
        opacity: { duration: 0.12, ease: 'easeOut' },
        scale: { duration: 0.12, ease: 'easeOut' },
      }}
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 12px ${color}, 0 0 28px ${color}`,
      }}
    />
  )
}

export function Architecture() {
  const { width } = useWindowSize()
  const isMobile = width < 768
  const flowShellRef = useRef<HTMLDivElement | null>(null)
  const {
    currentScenario,
    elapsedMs,
    progress,
    isPaused,
    jumpToScenario,
    runKey,
    scenarios,
    togglePaused,
  } = useAttackSimulation()

  const layoutVersion = `${isMobile}-${width}`
  const activeNodeIds = new Set(currentScenario.activeNodeIds)
  const activeEdgeIds = new Set(currentScenario.highlightedEdgeIds)

  const nodes: TopologyNode[] = topologyNodes.map((node) => {
    if (node.type !== 'deviceNode') {
      return node
    }

    const isFirewall = node.id === topologyNodeIds.firewall
    const isSplunk = node.id === topologyNodeIds.splunk

    return {
      ...node,
      data: {
        ...node.data,
        isActive: activeNodeIds.has(node.id),
        flashAlert: isFirewall && currentScenario.firewallFlash,
        flashKey: isFirewall && currentScenario.firewallFlash ? runKey : undefined,
        rapidPulse: isSplunk && currentScenario.splunkRapidPulse,
        showAlert: isSplunk && currentScenario.showAlertBadge,
        alertKey: isSplunk && currentScenario.showAlertBadge ? runKey : undefined,
      },
    }
  })

  const edges: TopologyEdge[] = topologyEdges.map((edge) => {
    const isHighlighted = activeEdgeIds.has(edge.id)
    const accent = edge.data?.accent ?? '#94a3b8'
    const baseWeight = edge.data?.lineWeight ?? 1.6
    const nextStyle = {
      ...edge.style,
      stroke: accent,
      strokeWidth: isHighlighted ? Math.max(baseWeight + 0.65, 2.2) : baseWeight,
      opacity: isHighlighted ? 1 : 0.88,
      filter: isHighlighted ? `drop-shadow(0 0 8px ${accent})` : 'none',
    }

    if (edge.data?.lineStyle === 'dashed') {
      nextStyle.strokeDasharray = '8 6'
    }

    return {
      ...edge,
      animated: edge.animated || isHighlighted,
      style: nextStyle,
      labelStyle: {
        ...edge.labelStyle,
        fill: isHighlighted ? '#f8fafc' : accent,
      },
    }
  })

  return (
    <section id="architecture" className="w-full bg-background px-6 py-24 md:px-10 lg:px-16">
      <style>{`
        @keyframes topology-firewall-breathe {
          0%, 100% {
            box-shadow:
              inset 0 0 24px rgba(0, 255, 135, 0.16),
              0 0 0 1px rgba(0, 255, 135, 0.32),
              0 0 26px rgba(0, 255, 135, 0.18);
          }
          50% {
            box-shadow:
              inset 0 0 28px rgba(0, 255, 135, 0.24),
              0 0 0 1px rgba(0, 255, 135, 0.46),
              0 0 44px rgba(0, 255, 135, 0.34);
          }
        }

        @keyframes topology-splunk-ingest {
          0%, 100% {
            box-shadow:
              inset 0 0 24px rgba(0, 200, 255, 0.18),
              0 0 22px rgba(0, 200, 255, 0.20);
          }
          50% {
            box-shadow:
              inset 0 0 30px rgba(0, 200, 255, 0.28),
              0 0 40px rgba(0, 200, 255, 0.40);
          }
        }

        .topology-firewall-shell {
          animation: topology-firewall-breathe 2.4s ease-in-out infinite;
        }

        .topology-node-splunk-pulse {
          animation: topology-splunk-ingest 0.9s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="terminal text-xs uppercase tracking-[0.18em] text-accent2">
            Live attack simulation across segmented zones
          </p>
          <h2 className="mt-3 font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-white md:text-[96px]">
            NETWORK
          </h2>
          <h2
            className="font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-transparent md:text-[96px]"
            style={{ WebkitTextStroke: '2px #00ff87' }}
          >
            TOPOLOGY
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            Live attack simulation across segmented zones
          </p>
        </div>

        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-30px] rounded-[32px] bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,135,0.08),transparent_64%)]"
          />

          <div
            ref={flowShellRef}
            className="relative h-[450px] overflow-hidden rounded-[28px] border border-[rgba(0,255,135,0.15)] bg-[rgba(8,8,15,0.94)] md:h-[700px]"
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: isMobile ? 0.2 : 0.14 }}
              nodesDraggable={false}
              nodesConnectable={false}
              nodesFocusable={false}
              edgesFocusable={false}
              elementsSelectable={false}
              panOnDrag={!isMobile}
              zoomOnScroll={!isMobile}
              zoomOnPinch={!isMobile}
              zoomOnDoubleClick={!isMobile}
              preventScrolling={false}
              minZoom={0.72}
              maxZoom={1.15}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant={BackgroundVariant.Dots} gap={24} size={1.2} color="#1a1a2e" />
            </ReactFlow>

            <div className="pointer-events-none absolute inset-0 z-20">
              {currentScenario.pulseStreams.flatMap((stream) =>
                Array.from({ length: stream.count }, (_, pulseIndex) => (
                  <EdgePulse
                    key={`${stream.edgeId}-${pulseIndex}-${runKey}`}
                    containerRef={flowShellRef}
                    edgeId={stream.edgeId}
                    color={stream.color}
                    elapsedMs={elapsedMs}
                    delayMs={pulseIndex * stream.staggerMs}
                    travelMs={stream.travelMs}
                    direction={stream.direction}
                    layoutVersion={layoutVersion}
                    runKey={runKey}
                  />
                )),
              )}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentScenario.id}-${runKey}`}
                  className="rounded-full border border-accent/45 bg-[rgba(9,9,17,0.92)] px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-accent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -4] }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 2.1, ease: 'easeOut' }}
                >
                  {currentScenario.bannerLabel}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/8 bg-surface/65 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
            <div className="flex flex-wrap gap-2">
              {scenarios.map((scenario) => {
                const isActive = currentScenario.id === scenario.id

                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => jumpToScenario(scenario.id)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                      isActive
                        ? 'border-accent bg-accent text-background shadow-[0_0_24px_rgba(0,255,135,0.28)]'
                        : 'border-white/10 text-slate-300 hover:border-accent/55 hover:text-accent'
                    }`}
                  >
                    {scenario.buttonLabel}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-1 items-center gap-4 md:max-w-md">
              <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left rounded-full bg-accent"
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.08, ease: 'linear' }}
                  style={{ width: '100%' }}
                />
              </div>

              <button
                type="button"
                onClick={togglePaused}
                aria-label={isPaused ? 'Resume attack simulation' : 'Pause attack simulation'}
                className="rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200 transition hover:border-accent/55 hover:text-accent"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
