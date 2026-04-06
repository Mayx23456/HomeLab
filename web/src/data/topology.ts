export type TopologyIconName = 'computer' | 'shield' | 'terminal' | 'server' | 'chart' | 'windows'

export type TopologyNode = {
  id: string
  label: string
  badge: string
  accent: string
  icon: TopologyIconName
  x: number
  y: number
  width: number
  height: number
  large?: boolean
}

export type TopologyZone = {
  id: string
  label: string
  accent: string
  x: number
  y: number
  width: number
  height: number
}

export type TopologyArrow = {
  id: string
  label: string
  accent: string
  path: string
  dashed?: boolean
  subtle?: boolean
}

export const topologyViewBox = {
  width: 1000,
  height: 640,
} as const

export const topologyZones: TopologyZone[] = [
  {
    id: 'lan-zone',
    label: 'LAN ZONE',
    accent: '#f59e0b',
    x: 40,
    y: 360,
    width: 250,
    height: 220,
  },
  {
    id: 'server-zone',
    label: 'SERVER ZONE',
    accent: '#ff3c3c',
    x: 335,
    y: 360,
    width: 365,
    height: 220,
  },
  {
    id: 'workstation-zone',
    label: 'WORKSTATION ZONE',
    accent: '#6366f1',
    x: 740,
    y: 360,
    width: 220,
    height: 220,
  },
]

export const topologyNodes: TopologyNode[] = [
  {
    id: 'host-machine',
    label: 'Host Machine',
    badge: 'HOST',
    accent: '#f8fafc',
    icon: 'computer',
    x: 420,
    y: 40,
    width: 160,
    height: 92,
  },
  {
    id: 'pfsense-firewall',
    label: 'pfSense Firewall',
    badge: 'BOUNDARY',
    accent: '#00ff87',
    icon: 'shield',
    x: 370,
    y: 170,
    width: 260,
    height: 112,
    large: true,
  },
  {
    id: 'kali-linux',
    label: 'Kali Linux',
    badge: 'ATTACKER',
    accent: '#f59e0b',
    icon: 'terminal',
    x: 80,
    y: 430,
    width: 170,
    height: 96,
  },
  {
    id: 'metasploitable-2',
    label: 'Metasploitable 2',
    badge: 'TARGET',
    accent: '#ff3c3c',
    icon: 'server',
    x: 390,
    y: 430,
    width: 180,
    height: 96,
  },
  {
    id: 'splunk-siem',
    label: 'Splunk SIEM',
    badge: 'MONITOR',
    accent: '#00c8ff',
    icon: 'chart',
    x: 580,
    y: 430,
    width: 180,
    height: 96,
  },
  {
    id: 'windows-server',
    label: 'Windows Server',
    badge: 'WORKSTATION',
    accent: '#6366f1',
    icon: 'windows',
    x: 770,
    y: 430,
    width: 180,
    height: 96,
  },
]

export const topologyArrows: TopologyArrow[] = [
  {
    id: 'wan',
    label: 'WAN',
    accent: '#f8fafc',
    path: 'M 500 132 C 500 145, 500 156, 500 170',
  },
  {
    id: 'lan',
    label: 'LAN',
    accent: '#f59e0b',
    path: 'M 440 282 C 390 330, 290 380, 165 430',
  },
  {
    id: 'server-net',
    label: 'SERVER NET',
    accent: '#ff3c3c',
    path: 'M 500 282 C 500 340, 490 380, 480 430',
  },
  {
    id: 'syslog',
    label: 'SYSLOG',
    accent: '#00c8ff',
    path: 'M 570 282 C 610 340, 655 380, 670 430',
    dashed: true,
  },
  {
    id: 'workstation-net',
    label: 'WORKSTATION NET',
    accent: '#6366f1',
    path: 'M 560 282 C 650 345, 790 382, 860 430',
  },
  {
    id: 'attack-path',
    label: 'ATTACK PATH',
    accent: '#f59e0b',
    path: 'M 250 478 C 308 458, 350 458, 390 478',
    dashed: true,
  },
  {
    id: 'telemetry',
    label: 'TELEMETRY',
    accent: '#00c8ff',
    path: 'M 570 478 C 592 470, 620 470, 650 478',
    dashed: true,
  },
]
