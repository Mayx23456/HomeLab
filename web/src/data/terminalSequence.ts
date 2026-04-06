export type TerminalOutputType = 'table' | 'timechart' | 'single'

export type TerminalRow = {
  id: string
  kind: 'header' | 'row'
  cells: string[]
  alert?: boolean
}

export type TerminalBlock = {
  id: string
  query: string
  description: string
  outputType: TerminalOutputType
  rows: TerminalRow[]
}

export const terminalSequence: TerminalBlock[] = [
  {
    id: 'sourcetype-counts',
    query: 'index=main | stats count by sourcetype',
    description: '// Total event volume by source type',
    outputType: 'table',
    rows: [
      { id: 'header', kind: 'header', cells: ['sourcetype', 'count'] },
      { id: 'syslog', kind: 'row', cells: ['syslog', '132,532'] },
      { id: 'filterlog', kind: 'row', cells: ['filterlog', '98,204'] },
      { id: 'udp-1514', kind: 'row', cells: ['udp:1514', '34,328'] },
    ],
  },
  {
    id: 'active-hosts',
    query: 'index=main sourcetype=syslog | stats count by host',
    description: '// Active hosts forwarding logs',
    outputType: 'table',
    rows: [
      { id: 'header', kind: 'header', cells: ['host', 'count'] },
      { id: 'host-201', kind: 'row', cells: ['192.168.20.1', '132,532'] },
      { id: 'source-confirmed', kind: 'row', cells: ['source: udp:1514', 'confirmed'] },
    ],
  },
  {
    id: 'protocol-breakdown',
    query: 'index=main filterlog | rex field=_raw "proto=(?<proto>\\w+)" | stats count by proto',
    description: '// Protocol breakdown from pfSense filterlog',
    outputType: 'table',
    rows: [
      { id: 'header', kind: 'header', cells: ['proto', 'count'] },
      { id: 'proto-tcp', kind: 'row', cells: ['tcp', '61,204'] },
      { id: 'proto-udp', kind: 'row', cells: ['udp', '48,917'] },
      { id: 'proto-icmp', kind: 'row', cells: ['icmp', '22,411'] },
    ],
  },
  {
    id: 'allowed-traffic-timechart',
    query: 'index=main filterlog action=pass | timechart span=1h count',
    description: '// Allowed traffic volume per hour',
    outputType: 'timechart',
    rows: [
      { id: 'header', kind: 'header', cells: ['time', 'count'] },
      { id: '09h', kind: 'row', cells: ['Apr 1 09:00:00', '4,821'] },
      { id: '10h', kind: 'row', cells: ['Apr 1 10:00:00', '7,340'] },
      { id: '11h', kind: 'row', cells: ['Apr 1 11:00:00', '12,903'] },
      { id: '12h', kind: 'row', cells: ['Apr 1 12:00:00', '19,482'] },
      { id: '13h', kind: 'row', cells: ['Apr 1 13:00:00', '15,671'] },
      { id: '14h', kind: 'row', cells: ['Apr 1 14:00:00', '9,204'] },
    ],
  },
  {
    id: 'top-destination-ports',
    query:
      'index=main filterlog | rex field=_raw "dpt=(?<dest_port>\\d+)" | stats count by dest_port | sort -count | head 5',
    description: '// Top destination ports - scanning & service activity',
    outputType: 'table',
    rows: [
      { id: 'header', kind: 'header', cells: ['dest_port', 'count', 'note'] },
      { id: 'port-60', kind: 'row', cells: ['60', '18,442', 'high frequency - scan pattern'] },
      { id: 'port-66', kind: 'row', cells: ['66', '14,209', 'elevated'] },
      { id: 'port-53', kind: 'row', cells: ['53', '9,103', 'DNS'] },
      { id: 'port-86', kind: 'row', cells: ['86', '6,821', 'non-standard'] },
      { id: 'port-21', kind: 'row', cells: ['21', '4,201', 'FTP - Hydra target'] },
    ],
  },
  {
    id: 'source-ip-ranking',
    query:
      'index=main filterlog | rex field=_raw "src=(?<src_ip>[\\d\\.]+)" | stats count by src_ip | sort -count',
    description: '// Source IPs generating most traffic - attacker identification',
    outputType: 'table',
    rows: [
      { id: 'header', kind: 'header', cells: ['src_ip', 'count'] },
      { id: 'attacker-ip', kind: 'row', cells: ['192.168.20.101', '51,289'], alert: true },
      { id: 'gateway-1', kind: 'row', cells: ['192.168.20.1', '43,158'] },
      { id: 'gateway-2', kind: 'row', cells: ['192.168.20.1', '37,462'] },
      { id: 'gateway-3', kind: 'row', cells: ['192.168.20.1', '35,456'] },
      { id: 'gateway-4', kind: 'row', cells: ['192.168.20.1', '29,004'] },
    ],
  },
]
