export type ArsenalIconName =
  | 'radar'
  | 'shield-search'
  | 'burst'
  | 'keys'
  | 'globe'
  | 'waves'
  | 'hash'
  | 'packet'

export type ArsenalTool = {
  id: string
  name: string
  category: string
  categoryColour: string
  icon: ArsenalIconName
  what: string
  how: string[]
  achieved: string[]
  commands: string[]
}

export const arsenalTools: ArsenalTool[] = [
  {
    id: 'nmap',
    name: 'Nmap',
    category: 'Reconnaissance',
    categoryColour: '#77008a',
    icon: 'radar',
    what: 'Network mapper used to discover open ports, running services, and live hosts across lab segments',
    how: [
      'Host discovery sweep across the full subnet using -sn ping scan',
      'Stealth SYN scan using -sS to send packets without completing the handshake',
      'Service and OS detection against Metasploitable 2',
      'Exported results with -oA for structured output',
    ],
    achieved: [
      'Observed how active scanning appears in pfSense firewall logs',
      'Watched ICMP echo blocks and SYN flood patterns in Wireshark',
      'Built an accurate picture of the lab attack surface',
    ],
    commands: ['nmap -sn 192.168.56.0/24 -oA scans/hostmap', 'nmap -sS <target>'],
  },
  {
    id: 'openvas',
    name: 'OpenVAS',
    category: 'Vulnerability Scanning',
    categoryColour: '#8b009d',
    icon: 'shield-search',
    what: 'Vulnerability scanner used to run authenticated and unauthenticated scans against lab systems',
    how: [
      'Unauthenticated scan against Metasploitable 2 with all TCP ports',
      'Authenticated scan against Windows Server 2022 using provided credentials',
      'Used Greenbone Security Assistant web UI -> GVM -> OpenVAS -> NVT scripts pipeline',
      'Exported vulnerability data into Splunk for correlation',
    ],
    achieved: [
      'Found open SSH, outdated Apache, and vulnerable Tomcat on Metasploitable 2',
      'Identified a CVE for unauthenticated remote code execution',
      'Learned how to read CVSS scores and prioritise risk',
      'Understood how outdated HTTP services and Java web apps increase attack surface',
    ],
    commands: [],
  },
  {
    id: 'metasploit',
    name: 'Metasploit',
    category: 'Exploitation',
    categoryColour: '#c000ba',
    icon: 'burst',
    what: 'Exploitation framework used to execute controlled attacks against intentionally vulnerable hosts',
    how: [
      'Exploited the classic VSFTPD 2.3.4 FTP backdoor to gain a command shell',
      'Ran an HTTP version scanner to fingerprint Apache on Metasploitable 2',
      'Used Tomcat manager login bruteforcer with default credentials - triggered Splunk alert',
      'Ran SMB version scanner against both Metasploitable 2 and Windows Server 2022',
      'Exploited Distcc remote code execution vulnerability for RCE shell access',
    ],
    achieved: [
      'Saw how outdated services create instant remote access vectors',
      'Observed the difference between configuration flaws and software vulnerabilities',
      'Confirmed that Tomcat bruteforce generated a detectable SIEM alert',
      'Compared SMB weaknesses on Metasploitable 2 against modern Windows hardening',
    ],
    commands: [
      'use exploit/unix/ftp/vsftpd_234_backdoor',
      'use auxiliary/scanner/http/http_version',
      'use auxiliary/scanner/http/tomcat_mgr_login',
      'use auxiliary/scanner/smb/smb_version',
    ],
  },
  {
    id: 'hydra',
    name: 'Hydra',
    category: 'Credential Testing',
    categoryColour: '#9000a4',
    icon: 'keys',
    what: 'Credential testing tool supporting SSH, FTP, SMB, RDP, HTTP and more - used to test login systems for weak credentials',
    how: [
      'SSH password test against Metasploitable 2 using rockyou.txt wordlist',
      'FTP default credential test using anonymous login',
      'HTTP form bruteforce against a custom PHP login form built for the exercise',
      'SMB password test against Windows Server using known usernames',
      'RDP attack simulation against Windows Server to test account lockout policies',
    ],
    achieved: [
      'Observed how repeated login attempts appear in both endpoint logs and Splunk',
      'Understood the difference between -l single user and -L user list flags',
      'Tested account lockout policies on Windows Server via RDP flood',
      'Confirmed RDP brute force events showed up correctly in SIEM telemetry',
    ],
    commands: [
      'hydra -l msfadmin -P rockyou.txt ssh://target',
      'hydra -l anonymous -p anonymous ftp://target',
      'hydra -L users.txt -P smallpass.txt smb://target',
      'hydra -L users.txt -P passwords.txt rdp://target',
    ],
  },
  {
    id: 'burp-suite',
    name: 'Burp Suite',
    category: 'Web Testing',
    categoryColour: '#a000ad',
    icon: 'globe',
    what: 'Web proxy used to intercept, replay, fuzz and analyse HTTP traffic against web applications on Metasploitable 2',
    how: [
      'Intercepted live login requests using the proxy and inspected headers and cookies',
      'Tested SQL injection payloads in Repeater and observed server responses',
      'Fuzzed input fields using Intruder and monitored for 200, 403 and 500 responses',
      'Inspected and decoded session tokens using the Decoder module',
      'Checked Splunk for correlated observations after each intercept session',
    ],
    achieved: [
      'Understood how input sanitisation failures lead to injection vulnerabilities',
      'Learned how fuzzing activity appears in web server and SIEM logs',
      'Practiced interpreting server response codes as security signals',
      'Built intuition for spotting session management weaknesses',
    ],
    commands: [],
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'Traffic Analysis',
    categoryColour: '#b85fd8',
    icon: 'waves',
    what: 'Packet analyser used to capture and inspect raw network traffic across all lab protocols',
    how: [
      'Captured Nmap SYN scan traffic to observe stealth scan packet patterns',
      'Analysed POST requests from a demo PHP login form',
      'Captured DNS queries generated during Scapy script execution',
      'Observed SMB authentication traffic during Hydra SMB test against Windows Server',
      'Inspected NTLM handshake - NTLMSSP_NEGOTIATE flags including NTLMv2 and Request_Target',
    ],
    achieved: [
      'Gained X-ray visibility into how scanning and attack traffic looks at the packet level',
      'Understood how logs and packet captures complement each other during investigations',
      'Recognised NTLM authentication patterns in Windows SMB traffic',
      'Connected packet-level evidence to firewall and SIEM telemetry',
    ],
    commands: [],
  },
  {
    id: 'john-the-ripper',
    name: 'John the Ripper',
    category: 'Password Cracking',
    categoryColour: '#c000ba',
    icon: 'hash',
    what: 'Offline password cracking tool used to test hash vulnerabilities and understand why weak passwords fail',
    how: [
      'Extracted the shadow file from Metasploitable 2 and cracked user hashes',
      'Cracked NTLM hashes captured from Windows Server 2022',
      'Compared offline cracking invisibility against online tools like Hydra',
    ],
    achieved: [
      'Recovered plaintext credentials from shadow file hashes',
      'Understood that offline attacks bypass network monitoring entirely',
      'Learned why credential exposure is dangerous even without active network traffic',
      'Recognised why hashed credential leaks are treated as critical incidents',
    ],
    commands: ['john --format=NT example_ntlm_hashes.txt'],
  },
  {
    id: 'scapy',
    name: 'Scapy',
    category: 'Packet Crafting',
    categoryColour: '#d9b3ee',
    icon: 'packet',
    what: 'Python packet crafting tool used to build custom ARP-based host discovery scripts',
    how: [
      'Crafted ARP request packets broadcast across the lab subnet',
      'Captured ARP responses to build a MAC and IP inventory',
      'Used ARP over ping sweep because ARP works even when ICMP is blocked',
      'Fed discovered host data into Splunk dashboard for accurate asset inventory',
    ],
    achieved: [
      'Built accurate host inventories faster than traditional ping sweeps',
      'Understood that ARP is not filtered by the firewall since it is non-routable',
      'Reinforced how low-level protocol knowledge supports defensive asset management',
    ],
    commands: [
      'arp = ARP(pdst=target)',
      "ether = Ether(dst='ff:ff:ff:ff:ff:ff')",
      'result = srp(ether/arp, timeout=2, verbose=0)[0]',
    ],
  },
]
