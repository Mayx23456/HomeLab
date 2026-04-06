import type { Edge, Node } from '@xyflow/react'

export type TopologyNodeKind =
  | 'firewall'
  | 'offensive'
  | 'target'
  | 'monitoring'
  | 'infrastructure'
  | 'network'

export type TopologyNodeData = {
  label: string
  role: string
  kind: TopologyNodeKind
  large?: boolean
}

export type TopologyNode = Node<TopologyNodeData, 'topologyNode'>

// Static topology definitions only. Labels and roles are hardcoded constants.
export const topologyNodes: TopologyNode[] = [
  {
    id: 'host',
    type: 'topologyNode',
    position: { x: 40, y: 40 },
    data: {
      label: 'Host Machine',
      role: 'Physical workstation hosting the virtualized lab environment.',
      kind: 'infrastructure',
    },
  },
  {
    id: 'virtualbox',
    type: 'topologyNode',
    position: { x: 300, y: 40 },
    data: {
      label: 'VirtualBox',
      role: 'Hypervisor running isolated virtual machines for each segment.',
      kind: 'infrastructure',
    },
  },
  {
    id: 'pfsense',
    type: 'topologyNode',
    position: { x: 530, y: 170 },
    data: {
      label: 'pfSense',
      role: 'Central firewall, router, and segmentation policy enforcement point.',
      kind: 'firewall',
      large: true,
    },
  },
  {
    id: 'lan',
    type: 'topologyNode',
    position: { x: 180, y: 310 },
    data: {
      label: 'LAN 192.168.10.0/24',
      role: 'Attacker simulation network used for offensive testing workflows.',
      kind: 'network',
    },
  },
  {
    id: 'kali',
    type: 'topologyNode',
    position: { x: 130, y: 470 },
    data: {
      label: 'Kali Linux',
      role: 'Offensive security node for recon, scanning, and controlled attacks.',
      kind: 'offensive',
    },
  },
  {
    id: 'server-net',
    type: 'topologyNode',
    position: { x: 540, y: 330 },
    data: {
      label: 'SERVER_NET 192.168.20.0/24',
      role: 'Service network hosting vulnerable and monitoring systems.',
      kind: 'network',
    },
  },
  {
    id: 'metasploitable',
    type: 'topologyNode',
    position: { x: 430, y: 500 },
    data: {
      label: 'Metasploitable2',
      role: 'Intentionally vulnerable target used for exploitation and detection tuning.',
      kind: 'target',
    },
  },
  {
    id: 'splunk',
    type: 'topologyNode',
    position: { x: 730, y: 500 },
    data: {
      label: 'Ubuntu Splunk Server',
      role: 'Central SIEM collecting and correlating telemetry from lab segments.',
      kind: 'monitoring',
    },
  },
  {
    id: 'workstation-net',
    type: 'topologyNode',
    position: { x: 920, y: 330 },
    data: {
      label: 'WORKSTATION_NET 192.168.30.0/24',
      role: 'Enterprise-style workstation segment for lateral movement detection.',
      kind: 'network',
    },
  },
  {
    id: 'windows-server',
    type: 'topologyNode',
    position: { x: 980, y: 500 },
    data: {
      label: 'Windows Server 2022',
      role: 'Target/victim server used for hardening and incident response drills.',
      kind: 'target',
    },
  },
]

export const topologyEdges: Edge[] = [
  {
    id: 'edge-host-virtualbox',
    source: 'host',
    target: 'virtualbox',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-virtualbox-pfsense',
    source: 'virtualbox',
    target: 'pfsense',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-pfsense-lan',
    source: 'pfsense',
    target: 'lan',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-lan-kali',
    source: 'lan',
    target: 'kali',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-pfsense-server-net',
    source: 'pfsense',
    target: 'server-net',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-server-net-metasploitable',
    source: 'server-net',
    target: 'metasploitable',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-server-net-splunk',
    source: 'server-net',
    target: 'splunk',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-pfsense-workstation-net',
    source: 'pfsense',
    target: 'workstation-net',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-workstation-net-windows',
    source: 'workstation-net',
    target: 'windows-server',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'edge-pfsense-splunk-syslog',
    source: 'pfsense',
    target: 'splunk',
    animated: true,
    type: 'smoothstep',
    label: 'syslog UDP/1514',
    style: {
      stroke: '#00c8ff',
      strokeDasharray: '6 4',
    },
    labelStyle: {
      fill: '#00c8ff',
      fontWeight: 700,
      fontSize: 11,
    },
    labelBgStyle: {
      fill: '#0a0a0f',
      fillOpacity: 0.92,
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 5,
  },
]
