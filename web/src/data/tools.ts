export type ToolCategory = 'Reconnaissance' | 'Exploitation' | 'Password Attacks' | 'Analysis'

export type Tool = {
  id: string
  name: string
  category: ToolCategory
  description: string
  learnedText: string
  accentColour: string
}

export const tools: Tool[] = [
  {
    id: 'nmap',
    name: 'Nmap',
    category: 'Reconnaissance',
    description: 'Network discovery and service fingerprinting for target visibility.',
    learnedText: 'Reliable scans need pacing, segmentation awareness, and clear scope boundaries.',
    accentColour: '#00c8ff',
  },
  {
    id: 'openvas',
    name: 'OpenVAS',
    category: 'Reconnaissance',
    description: 'Vulnerability assessment engine for exposure baselining.',
    learnedText: 'Findings become useful only after triage, deduplication, and context mapping.',
    accentColour: '#00c8ff',
  },
  {
    id: 'metasploit',
    name: 'Metasploit',
    category: 'Exploitation',
    description: 'Controlled exploitation framework for validation of defensive controls.',
    learnedText: 'Exploit results are strongest when tied to compensating-control recommendations.',
    accentColour: '#ff3c3c',
  },
  {
    id: 'hydra',
    name: 'Hydra',
    category: 'Password Attacks',
    description: 'Credential brute-force testing across exposed authentication services.',
    learnedText: 'Account lockout, rate limiting, and alerting stop brute-force risk fast.',
    accentColour: '#f59e0b',
  },
  {
    id: 'burp-suite',
    name: 'Burp Suite',
    category: 'Exploitation',
    description: 'Web application testing proxy for request analysis and attack simulation.',
    learnedText: 'Manual replay plus precise payload crafting outperforms blind automation.',
    accentColour: '#ff3c3c',
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'Analysis',
    description: 'Packet-level inspection for protocol behavior and anomaly detection.',
    learnedText: 'Short, focused captures with filters surface signal without analyst fatigue.',
    accentColour: '#00ff87',
  },
  {
    id: 'john-the-ripper',
    name: 'John the Ripper',
    category: 'Password Attacks',
    description: 'Offline hash cracking for password strength validation.',
    learnedText: 'Password complexity must be paired with MFA and hash-hardening strategy.',
    accentColour: '#f59e0b',
  },
  {
    id: 'scapy',
    name: 'Scapy',
    category: 'Reconnaissance',
    description: 'Packet crafting toolkit for custom discovery and protocol testing.',
    learnedText: 'Custom packets expose edge-case firewall and IDS behavior quickly.',
    accentColour: '#00c8ff',
  },
]
