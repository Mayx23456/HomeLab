import { useState } from 'react'
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type NodeProps,
  type NodeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  topologyEdges,
  topologyNodes,
  type TopologyNode,
  type TopologyNodeData,
  type TopologyNodeKind,
} from '../data/topology'
import { useWindowSize } from '../hooks/useWindowSize'

const nodeColors: Record<TopologyNodeKind, string> = {
  firewall: '#00ff87',
  offensive: '#f59e0b',
  target: '#ff3c3c',
  monitoring: '#00c8ff',
  infrastructure: '#8b9bb9',
  network: '#3a3a4a',
}

function TopologyNodeCard({ data }: NodeProps<TopologyNode>) {
  const [isHovered, setIsHovered] = useState(false)
  const accent = nodeColors[data.kind]
  const isLarge = Boolean(data.large)

  return (
    <div
      className={`relative rounded-xl bg-surface ${isLarge ? 'min-w-[240px] px-6 py-5' : 'min-w-[190px] px-4 py-3'}`}
      style={{
        border: `1px solid ${data.kind === 'firewall' ? '#00ff87' : `${accent}70`}`,
        boxShadow:
          data.kind === 'firewall'
            ? '0 0 0 1px rgba(0,255,135,0.28), 0 0 36px -22px rgba(0,255,135,0.90)'
            : '0 8px 20px rgba(0, 0, 0, 0.35)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-0 !bg-accent" />
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-accent" />
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-0 !bg-accent" />
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-accent" />

      <div className="mb-2 h-px w-full" style={{ backgroundColor: accent }} />
      <p className="terminal text-[10px] uppercase tracking-[0.18em] text-slate-400">{data.kind}</p>
      <p className={`mt-1 text-white ${isLarge ? 'text-xl font-black' : 'text-sm font-semibold'}`}>
        {data.label}
      </p>

      {isHovered && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-md border border-accent/35 bg-background/95 px-3 py-2 text-xs text-slate-200 shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        >
          {data.role}
        </div>
      )}
    </div>
  )
}

const nodeTypes: NodeTypes = {
  topologyNode: TopologyNodeCard,
}

export function Architecture() {
  const { width } = useWindowSize()
  const isMobile = width < 768

  return (
    <section id="architecture" className="w-full bg-background px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <h2 className="font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-white md:text-[96px]">
            NETWORK
          </h2>
          <h2
            className="font-heading text-[56px] font-black uppercase leading-[0.88] tracking-[-0.03em] text-transparent md:text-[96px]"
            style={{ WebkitTextStroke: '2px #00ff87' }}
          >
            TOPOLOGY
          </h2>
        </div>

        <div className="h-[760px] w-full overflow-hidden rounded-2xl border border-accent/30 bg-[rgba(17,17,24,0.76)]">
          <ReactFlow
            nodes={topologyNodes}
            edges={topologyEdges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={!isMobile}
            zoomOnScroll={!isMobile}
            zoomOnPinch={!isMobile}
            zoomOnDoubleClick={!isMobile}
            minZoom={0.55}
            maxZoom={1.25}
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: '#00ff87', strokeOpacity: 0.72, strokeWidth: 1.3 },
            }}
          >
            <Background color="#3a3a4a" gap={28} size={0.8} />
            <MiniMap
              pannable
              zoomable
              maskColor="rgba(10, 10, 15, 0.55)"
              nodeStrokeWidth={3}
              nodeColor={(node) => {
                const kind = (node.data as TopologyNodeData | undefined)?.kind
                return kind ? nodeColors[kind] : '#3a3a4a'
              }}
            />
            <Controls showInteractive={!isMobile} />
          </ReactFlow>
        </div>
      </div>
    </section>
  )
}
