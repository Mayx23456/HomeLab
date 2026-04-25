import {
  topologyArrows,
  topologyNodes,
  topologyViewBox,
  topologyZones,
  type TopologyIconName,
  type TopologyNode,
} from '../data/topology'

type IconProps = {
  color: string
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

function NodeIcon({ icon, color }: { icon: TopologyIconName; color: string }) {
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

function percent(value: number, total: number) {
  return `${(value / total) * 100}%`
}

function NodeCard({ node }: { node: TopologyNode }) {
  return (
    <div
      className="neo-card absolute px-4 py-4"
      style={{
        left: percent(node.x, topologyViewBox.width),
        top: percent(node.y, topologyViewBox.height),
        width: percent(node.width, topologyViewBox.width),
        minHeight: percent(node.height, topologyViewBox.height),
        backgroundColor: node.large ? '#b85fd8' : '#f4ddff',
        outline: node.large ? `4px solid ${node.accent}` : undefined,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink bg-white"
          style={{
            boxShadow: `4px 4px 0 ${node.accent}`,
          }}
        >
          <NodeIcon icon={node.icon} color={node.accent} />
        </div>

        <div className="min-w-0">
          <p
            className={`font-mono uppercase text-ink ${
              node.large ? 'text-base font-bold tracking-[0.02em]' : 'text-sm font-bold tracking-[0.02em]'
            }`}
          >
            {node.label}
          </p>
          <span
            className="neo-pill mt-3 inline-flex px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              color: node.accent,
              backgroundColor: '#f4ddff',
            }}
          >
            {node.badge}
          </span>
        </div>
      </div>
    </div>
  )
}

export function Architecture() {
  return (
    <section id="architecture" className="w-full bg-transparent px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="terminal text-xs uppercase tracking-[0.18em] text-accent2">
            Segmented network map with monitored traffic flow
          </p>
          <h2 className="mt-3 font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-ink md:text-[96px]">
            NETWORK
          </h2>
          <h2 className="font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-accent2 md:text-[96px]">
            TOPOLOGY
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-ink/80 md:text-base">
            A clean 2D view of the homelab showing the trust boundary, segmented zones, and the
            main monitored traffic paths.
          </p>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -left-5 -top-5 h-20 w-20 rotate-6 border-[4px] border-ink bg-pink" />

          <div className="overflow-x-auto pb-2">
            <div className="min-w-[920px]">
              <div className="neo-panel relative aspect-[1000/640] overflow-hidden bg-paper">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

                {topologyZones.map((zone) => (
                  <div
                    key={zone.id}
                    className="absolute rounded-[24px] border-[3px] border-dashed border-ink"
                    style={{
                      left: percent(zone.x, topologyViewBox.width),
                      top: percent(zone.y, topologyViewBox.height),
                      width: percent(zone.width, topologyViewBox.width),
                      height: percent(zone.height, topologyViewBox.height),
                      background: `${zone.accent}20`,
                    }}
                  >
                    <div className="neo-pill absolute left-5 top-5 bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-ink">
                      {zone.label}
                    </div>
                  </div>
                ))}

                <svg
                  viewBox={`0 0 ${topologyViewBox.width} ${topologyViewBox.height}`}
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="arrow-head-accent"
                      viewBox="0 0 10 10"
                      refX="8.2"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                    </marker>
                  </defs>

                  {topologyArrows.map((arrow) => (
                    <g key={arrow.id} style={{ color: arrow.accent }}>
                      <path
                        d={arrow.path}
                        fill="none"
                        stroke={arrow.accent}
                        strokeWidth={arrow.dashed ? 3.2 : 3.6}
                        strokeDasharray={arrow.dashed ? '10 8' : undefined}
                        strokeLinecap="round"
                        markerEnd="url(#arrow-head-accent)"
                        opacity={arrow.subtle ? 0.68 : 0.95}
                      />
                    </g>
                  ))}
                </svg>

                <div className="absolute inset-0">
                  {topologyNodes.map((node) => (
                    <NodeCard key={node.id} node={node} />
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-0">
                  <span className="neo-pill absolute left-[46%] top-[15%] bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                    WAN
                  </span>
                  <span className="neo-pill absolute left-[26%] top-[53%] bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#77008a]">
                    LAN
                  </span>
                  <span className="neo-pill absolute left-[45%] top-[56%] bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#a000ad]">
                    SERVER NET
                  </span>
                  <span className="neo-pill absolute left-[58%] top-[47%] bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#c000ba]">
                    SYSLOG
                  </span>
                  <span className="neo-pill absolute left-[69%] top-[56%] bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#b85fd8]">
                    WORKSTATION NET
                  </span>
                  <span className="neo-pill absolute left-[30%] top-[72%] bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#77008a]">
                    ATTACK PATH
                  </span>
                  <span className="neo-pill absolute left-[56%] top-[73%] bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#c000ba]">
                    TELEMETRY
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="neo-card bg-yellow p-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                Security Boundary
              </p>
              <p className="mt-2 text-sm text-ink/80">
                `pfSense` sits at the center of the lab and controls routing, segmentation, and
                monitored traffic flow.
              </p>
            </div>

            <div className="neo-card bg-sky p-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent2">
                Detection Path
              </p>
              <p className="mt-2 text-sm text-ink/80">
                Logs and telemetry move toward `Splunk SIEM`, which acts as the central monitoring
                point for the lab.
              </p>
            </div>

            <div className="neo-card bg-pink p-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-danger">
                Segmented Zones
              </p>
              <p className="mt-2 text-sm text-ink/80">
                Attacker, target, monitoring, and workstation systems are visually separated into
                distinct zones to make the architecture easier to read.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
