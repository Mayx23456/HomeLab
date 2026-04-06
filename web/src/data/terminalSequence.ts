export type TerminalExchange = {
  id: string
  command: string
  responseLines: string[]
}

// Static SOC demo data only. No dynamic/user-controlled content is consumed here.
export const terminalSequence: TerminalExchange[] = [
  {
    id: 'src-ip-counts',
    command: 'index=pfsense sourcetype=syslog | stats count by src_ip',
    responseLines: [
      'src_ip           count',
      '----------------------',
      '192.168.10.11      347',
      '192.168.10.23      198',
      '192.168.10.44      121',
      '192.168.20.12      289',
      '192.168.20.32      166',
    ],
  },
  {
    id: 'blocked-timechart',
    command: 'index=pfsense action=blocked | timechart count span=1h',
    responseLines: [
      '_time                 count',
      '----------------------------',
      '2026-04-06 09:00:00      18',
      '2026-04-06 10:00:00      26',
      '2026-04-06 11:00:00      21',
      '2026-04-06 12:00:00      34',
      '2026-04-06 13:00:00      29',
      '2026-04-06 14:00:00      24',
    ],
  },
  {
    id: 'ssh-attempts',
    command: 'index=pfsense dest_port=22 | table src_ip dest_ip _time',
    responseLines: [
      'src_ip         dest_ip        _time',
      '-----------------------------------------------',
      '192.168.10.14  192.168.20.15  2026-04-06 13:11:27',
      '192.168.10.38  192.168.20.22  2026-04-06 13:13:04',
      '192.168.20.19  192.168.30.10  2026-04-06 13:16:49',
      '192.168.10.51  192.168.20.15  2026-04-06 13:18:31',
    ],
  },
]
