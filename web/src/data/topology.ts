import type { Edge, Node } from '@xyflow/react'

export const topologyNodeIds = {
  host: 'host-machine',
  firewall: 'pfsense-firewall',
  lanZone: 'lan-zone',
  serverZone: 'server-zone',
  workstationZone: 'workstation-zone',
  kali: 'kali-linux',
  metasploitable: 'metasploitable-2',
  splunk: 'splunk-siem',
  windows: 'windows-server',
} as const

export const topologyEdgeIds = {
  hostToFirewall: 'edge-host-to-firewall',
  firewallToLanZone: 'edge-firewall-to-lan-zone',
  lanZoneToKali: 'edge-lan-zone-to-kali',
  firewallToServerZone: 'edge-firewall-to-server-zone',
  serverZoneToMetasploitable: 'edge-server-zone-to-metasploitable',
  firewallToSplunk: 'edge-firewall-to-splunk',
  firewallToWorkstationZone: 'edge-firewall-to-workstation-zone',
  workstationZoneToWindows: 'edge-workstation-zone-to-windows',
  kaliToMetasploitable: 'edge-kali-to-metasploitable',
  metasploitableToSplunk: 'edge-metasploitable-to-splunk',
} as const

export type DeviceNodeKind = 'host' | 'firewall' | 'attacker' | 'target' | 'monitor' | 'workstation'
export type TopologyNodeKind = DeviceNodeKind | 'zone'
export type TopologyIconName = 'computer' | 'shield' | 'terminal' | 'server' | 'chart' | 'windows'

type BaseTopologyNodeData = {
  label: string
  accent: string
}

export type TopologyDeviceNodeData = BaseTopologyNodeData & {
  kind: DeviceNodeKind
  icon: TopologyIconName
  roleBadge: string
  large?: boolean
  isActive?: boolean
  flashAlert?: boolean
  flashKey?: number
  rapidPulse?: boolean
  showAlert?: boolean
  alertKey?: number
}

export type TopologyZoneNodeData = BaseTopologyNodeData & {
  kind: 'zone'
}

export type TopologyDeviceNode = Node<TopologyDeviceNodeData, 'deviceNode'>
export type TopologyZoneNode = Node<TopologyZoneNodeData, 'zoneNode'>
export type TopologyNode = TopologyDeviceNode | TopologyZoneNode

export type TopologyEdgeData = {
  accent: string
  lineStyle: 'solid' | 'dashed'
  lineWeight: number
}

export type TopologyEdge = Edge<TopologyEdgeData, 'smoothstep'>

export const topologyNodes: TopologyNode[] = [
  {
    id: topologyNodeIds.host,
    type: 'deviceNode',
    position: { x: 496, y: 12 },
    data: {
      label: 'Host Machine',
      accent: '#f8fafc',
      icon: 'computer',
      roleBadge: 'HOST',
      kind: 'host',
    },
  },
  {
    id: topologyNodeIds.firewall,
    type: 'deviceNode',
    position: { x: 430, y: 132 },
    data: {
      label: 'pfSense Firewall',
      accent: '#00ff87',
      icon: 'shield',
      roleBadge: 'BOUNDARY',
      kind: 'firewall',
      large: true,
    },
  },
  {
    id: topologyNodeIds.lanZone,
    type: 'zoneNode',
    position: { x: 86, y: 318 },
    data: {
      label: 'LAN Zone',
      accent: '#6b7280',
      kind: 'zone',
    },
  },
  {
    id: topologyNodeIds.serverZone,
    type: 'zoneNode',
    position: { x: 474, y: 318 },
    data: {
      label: 'Server Zone',
      accent: '#6b7280',
      kind: 'zone',
    },
  },
  {
    id: topologyNodeIds.workstationZone,
    type: 'zoneNode',
    position: { x: 886, y: 318 },
    data: {
      label: 'Workstation Zone',
      accent: '#6b7280',
      kind: 'zone',
    },
  },
  {
    id: topologyNodeIds.kali,
    type: 'deviceNode',
    position: { x: 58, y: 436 },
    data: {
      label: 'Kali Linux',
      accent: '#f59e0b',
      icon: 'terminal',
      roleBadge: 'ATTACKER',
      kind: 'attacker',
    },
  },
  {
    id: topologyNodeIds.metasploitable,
    type: 'deviceNode',
    position: { x: 374, y: 436 },
    data: {
      label: 'Metasploitable 2',
      accent: '#ff3c3c',
      icon: 'server',
      roleBadge: 'TARGET',
      kind: 'target',
    },
  },
  {
    id: topologyNodeIds.splunk,
    type: 'deviceNode',
    position: { x: 634, y: 436 },
    data: {
      label: 'Splunk SIEM',
      accent: '#00c8ff',
      icon: 'chart',
      roleBadge: 'MONITOR',
      kind: 'monitor',
    },
  },
  {
    id: topologyNodeIds.windows,
    type: 'deviceNode',
    position: { x: 950, y: 436 },
    data: {
      label: 'Windows Server',
      accent: '#6366f1',
      icon: 'windows',
      roleBadge: 'WORKSTATION',
      kind: 'workstation',
    },
  },
]

const sharedLabelStyles = {
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.16em',
}

const sharedLabelBackground = {
  fill: '#090911',
  fillOpacity: 0.94,
}

export const topologyEdges: TopologyEdge[] = [
  {
    id: topologyEdgeIds.hostToFirewall,
    source: topologyNodeIds.host,
    target: topologyNodeIds.firewall,
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'WAN',
    animated: true,
    style: {
      stroke: '#f8fafc',
      strokeWidth: 1.65,
      strokeLinecap: 'round',
    },
    data: {
      accent: '#f8fafc',
      lineStyle: 'solid',
      lineWeight: 1.65,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#f8fafc',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.firewallToLanZone,
    source: topologyNodeIds.firewall,
    target: topologyNodeIds.lanZone,
    sourceHandle: 'left',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'LAN',
    style: {
      stroke: '#f59e0b',
      strokeWidth: 1.7,
      strokeLinecap: 'round',
    },
    data: {
      accent: '#f59e0b',
      lineStyle: 'solid',
      lineWeight: 1.7,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#f59e0b',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.lanZoneToKali,
    source: topologyNodeIds.lanZone,
    target: topologyNodeIds.kali,
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'LAN',
    style: {
      stroke: '#f59e0b',
      strokeWidth: 1.7,
      strokeLinecap: 'round',
    },
    data: {
      accent: '#f59e0b',
      lineStyle: 'solid',
      lineWeight: 1.7,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#f59e0b',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.firewallToServerZone,
    source: topologyNodeIds.firewall,
    target: topologyNodeIds.serverZone,
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'SERVER NET',
    style: {
      stroke: '#ff3c3c',
      strokeWidth: 1.75,
      strokeLinecap: 'round',
    },
    data: {
      accent: '#ff3c3c',
      lineStyle: 'solid',
      lineWeight: 1.75,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#ff3c3c',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.serverZoneToMetasploitable,
    source: topologyNodeIds.serverZone,
    target: topologyNodeIds.metasploitable,
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'SERVER NET',
    style: {
      stroke: '#ff3c3c',
      strokeWidth: 1.75,
      strokeLinecap: 'round',
    },
    data: {
      accent: '#ff3c3c',
      lineStyle: 'solid',
      lineWeight: 1.75,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#ff3c3c',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.firewallToSplunk,
    source: topologyNodeIds.firewall,
    target: topologyNodeIds.splunk,
    sourceHandle: 'right',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'SYSLOG',
    animated: true,
    style: {
      stroke: '#00c8ff',
      strokeWidth: 1.65,
      strokeLinecap: 'round',
      strokeDasharray: '8 6',
    },
    data: {
      accent: '#00c8ff',
      lineStyle: 'dashed',
      lineWeight: 1.65,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#00c8ff',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.firewallToWorkstationZone,
    source: topologyNodeIds.firewall,
    target: topologyNodeIds.workstationZone,
    sourceHandle: 'right',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'WORKSTATION NET',
    style: {
      stroke: '#6366f1',
      strokeWidth: 1.7,
      strokeLinecap: 'round',
    },
    data: {
      accent: '#6366f1',
      lineStyle: 'solid',
      lineWeight: 1.7,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#6366f1',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.workstationZoneToWindows,
    source: topologyNodeIds.workstationZone,
    target: topologyNodeIds.windows,
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    label: 'WORKSTATION NET',
    style: {
      stroke: '#6366f1',
      strokeWidth: 1.7,
      strokeLinecap: 'round',
    },
    data: {
      accent: '#6366f1',
      lineStyle: 'solid',
      lineWeight: 1.7,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#6366f1',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.kaliToMetasploitable,
    source: topologyNodeIds.kali,
    target: topologyNodeIds.metasploitable,
    sourceHandle: 'right',
    targetHandle: 'left',
    type: 'smoothstep',
    label: 'ATTACK PATH',
    style: {
      stroke: '#f59e0b',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeDasharray: '10 8',
    },
    data: {
      accent: '#f59e0b',
      lineStyle: 'dashed',
      lineWeight: 2,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#f59e0b',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
  {
    id: topologyEdgeIds.metasploitableToSplunk,
    source: topologyNodeIds.metasploitable,
    target: topologyNodeIds.splunk,
    sourceHandle: 'right',
    targetHandle: 'left',
    type: 'smoothstep',
    label: 'TELEMETRY',
    style: {
      stroke: '#00c8ff',
      strokeWidth: 1.7,
      strokeLinecap: 'round',
      strokeDasharray: '8 6',
    },
    data: {
      accent: '#00c8ff',
      lineStyle: 'dashed',
      lineWeight: 1.7,
    },
    labelStyle: {
      ...sharedLabelStyles,
      fill: '#00c8ff',
    },
    labelBgStyle: sharedLabelBackground,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 999,
  },
]
