-- White Hat Tools (15+)
INSERT INTO tools (name, description, team, category, default_parameters, ui_schema, icon) VALUES
('Nessus', 'Vulnerability scanner', 'white_hat', 'Scanner', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'nessus.png'),
('OpenVAS', 'Open source vulnerability scanner', 'white_hat', 'Scanner', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'openvas.png'),
('Qualys', 'Cloud security and compliance scanner', 'white_hat', 'Compliance', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'qualys.png'),
('OSSEC', 'Host-based IDS', 'white_hat', 'IDS', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'ossec.png'),
('Wazuh', 'SIEM/IDS', 'white_hat', 'SIEM', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'wazuh.png'),
('Snort', 'Network IDS/IPS', 'white_hat', 'IDS', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'snort.png'),
('Suricata', 'IDS/IPS engine', 'white_hat', 'IDS', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'suricata.png'),
('ClamAV', 'Antivirus', 'white_hat', 'Antivirus', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'clamav.png'),
('Chkrootkit', 'Rootkit scanner', 'white_hat', 'Scanner', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'chkrootkit.png'),
('RKHunter', 'Rootkit scanner', 'white_hat', 'Scanner', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'rkhunter.png'),
('Tripwire', 'File integrity checker', 'white_hat', 'Integrity', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'tripwire.png'),
('AIDE', 'File integrity checker', 'white_hat', 'Integrity', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'aide.png'),
('Auditd', 'Linux auditing system', 'white_hat', 'Auditing', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'auditd.png'),
('Sysmon', 'Windows system monitor', 'white_hat', 'Auditing', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'sysmon.png'),
('OpenSCAP', 'Compliance scanner', 'white_hat', 'Compliance', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'openscap.png'),
('Fail2Ban', 'Brute-force protection', 'white_hat', 'Firewall', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'fail2ban.png');

-- Red Team Tools (30+)
INSERT INTO tools (name, description, team, category, default_parameters, ui_schema, icon) VALUES
('Nmap', 'Network scanner', 'red_team', 'Recon', '{"scanType":"tcp_syn"}', '{"fields":[{"name":"target","type":"text"}]}', 'nmap.png'),
('Hydra', 'Login cracker', 'red_team', 'Password', '{"service":"ssh"}', '{"fields":[{"name":"target","type":"text"},{"name":"username","type":"text"}]}', 'hydra.png'),
('Hashcat', 'Password hash cracker', 'red_team', 'Password', '{}', '{"fields":[{"name":"hashfile","type":"file"}]}', 'hashcat.png'),
('Metasploit', 'Exploitation framework', 'red_team', 'Exploit', '{}', '{"fields":[{"name":"target","type":"text"},{"name":"exploit","type":"text"}]}', 'metasploit.png'),
('Burp Suite', 'Web vulnerability scanner', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'burp.png'),
('Nikto', 'Web server scanner', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'nikto.png'),
('Gobuster', 'Directory brute-forcer', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'gobuster.png'),
('Dirb', 'Directory brute-forcer', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'dirb.png'),
('SQLmap', 'Automated SQL injection', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'sqlmap.png'),
('Wfuzz', 'Web application fuzzer', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'wfuzz.png'),
('John the Ripper', 'Password cracker', 'red_team', 'Password', '{}', '{"fields":[{"name":"hashfile","type":"file"}]}', 'john.png'),
('Netcat', 'Network utility', 'red_team', 'Recon', '{}', '{"fields":[{"name":"target","type":"text"},{"name":"port","type":"number"}]}', 'netcat.png'),
('Enum4linux', 'Windows/Samba enumeration', 'red_team', 'Recon', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'enum4linux.png'),
('Impacket', 'Python networking library', 'red_team', 'Post-Exploitation', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'impacket.png'),
('Responder', 'LLMNR, NBT-NS, MDNS poisoner', 'red_team', 'Post-Exploitation', '{}', '{"fields":[{"name":"interface","type":"text"}]}', 'responder.png'),
('CrackMapExec', 'Pentesting Swiss Army knife', 'red_team', 'Password', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'cme.png'),
('BloodHound', 'AD enumeration', 'red_team', 'Recon', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'bloodhound.png'),
('TheHarvester', 'Email, domain gatherer', 'red_team', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'theharvester.png'),
('Amass', 'Subdomain enumeration', 'red_team', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'amass.png'),
('Sublist3r', 'Subdomain enumeration', 'red_team', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'sublist3r.png'),
('Fierce', 'DNS reconnaissance', 'red_team', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'fierce.png'),
('Dnsenum', 'DNS enumeration', 'red_team', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'dnsenum.png'),
('WPScan', 'WordPress scanner', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'wpscan.png'),
('SSLScan', 'SSL/TLS scanner', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'sslscan.png'),
('WhatWeb', 'Website fingerprinting', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'whatweb.png'),
('Searchsploit', 'Exploit DB search', 'red_team', 'Exploit', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'searchsploit.png'),
('XSStrike', 'XSS detection', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'xsstrike.png'),
('Fuff', 'Web fuzzer', 'red_team', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'fuff.png'),
('Social-Engineer Toolkit', 'Phishing, SE simulation', 'red_team', 'Social Engineering', '{}', '{"fields":[{"name":"scenario","type":"text"}]}', 'setoolkit.png'),
('Aircrack-ng', 'Wi-Fi auditing', 'red_team', 'Wireless', '{}', '{"fields":[{"name":"interface","type":"text"}]}', 'aircrack.png'),
('CrackStation', 'Password cracker', 'red_team', 'Password', '{}', '{"fields":[{"name":"hashfile","type":"file"}]}', 'crackstation.png');

-- Blue Team Tools (10+)
INSERT INTO tools (name, description, team, category, default_parameters, ui_schema, icon) VALUES
('Splunk', 'SIEM platform', 'blue_team', 'SIEM', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'splunk.png'),
('ELK Stack', 'Log analysis', 'blue_team', 'SIEM', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'elk.png'),
('Graylog', 'Log management', 'blue_team', 'SIEM', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'graylog.png'),
('AlienVault OSSIM', 'SIEM', 'blue_team', 'SIEM', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'ossim.png'),
('ArcSight', 'SIEM', 'blue_team', 'SIEM', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'arcsight.png'),
('QRadar', 'SIEM', 'blue_team', 'SIEM', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'qradar.png'),
('Bro/Zeek', 'Network security monitor', 'blue_team', 'NSM', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'zeek.png'),
('Security Onion', 'NSM/SIEM distro', 'blue_team', 'NSM', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'securityonion.png'),
('Cuckoo Sandbox', 'Malware analysis', 'blue_team', 'Sandbox', '{}', '{"fields":[{"name":"sample","type":"file"}]}', 'cuckoo.png'),
('YARA', 'Malware signature matching', 'blue_team', 'Detection', '{}', '{"fields":[{"name":"rule","type":"text"}]}', 'yara.png');

-- Gray Team Tools (10+)
INSERT INTO tools (name, description, team, category, default_parameters, ui_schema, icon) VALUES
('Ghidra', 'Reverse engineering', 'gray_team', 'RE', '{}', '{"fields":[{"name":"binary","type":"file"}]}', 'ghidra.png'),
('IDA Pro', 'Disassembler', 'gray_team', 'RE', '{}', '{"fields":[{"name":"binary","type":"file"}]}', 'ida.png'),
('Radare2', 'Reverse engineering', 'gray_team', 'RE', '{}', '{"fields":[{"name":"binary","type":"file"}]}', 'radare2.png'),
('Cutter', 'RE GUI', 'gray_team', 'RE', '{}', '{"fields":[{"name":"binary","type":"file"}]}', 'cutter.png'),
('Frida', 'Dynamic instrumentation', 'gray_team', 'Instrumentation', '{}', '{"fields":[{"name":"script","type":"text"}]}', 'frida.png'),
('Burp Collaborator', 'OOB testing', 'gray_team', 'Testing', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'collaborator.png'),
('mitmproxy', 'Proxy', 'gray_team', 'Proxy', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'mitmproxy.png'),
('APKTool', 'Android reverse engineering', 'gray_team', 'Mobile', '{}', '{"fields":[{"name":"apk","type":"file"}]}', 'apktool.png'),
('dex2jar', 'Android reverse engineering', 'gray_team', 'Mobile', '{}', '{"fields":[{"name":"apk","type":"file"}]}', 'dex2jar.png'),
('Jadx', 'Android decompiler', 'gray_team', 'Mobile', '{}', '{"fields":[{"name":"apk","type":"file"}]}', 'jadx.png');

-- Black Hat Tools (10+)
INSERT INTO tools (name, description, team, category, default_parameters, ui_schema, icon) VALUES
('Cobalt Strike', 'Adversary emulation', 'black_hat', 'C2', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'cobaltstrike.png'),
('Empire', 'Post-exploitation framework', 'black_hat', 'C2', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'empire.png'),
('Mythic', 'C2 framework', 'black_hat', 'C2', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'mythic.png'),
('Sliver', 'C2 framework', 'black_hat', 'C2', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'sliver.png'),
('APT Library', 'Adversary profiles', 'black_hat', 'Threat Intel', '{}', '{"fields":[{"name":"group","type":"text"}]}', 'apt.png'),
('MITRE ATT&CK', 'Threat matrix', 'black_hat', 'Threat Intel', '{}', '{"fields":[{"name":"tactic","type":"text"}]}', 'mitre.png'),
('Caldera', 'Automated adversary emulation', 'black_hat', 'Emulation', '{}', '{"fields":[{"name":"attack","type":"text"}]}', 'caldera.png'),
('RedELK', 'C2 traffic analysis', 'black_hat', 'C2', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'redelk.png'),
('ThreatFox', 'Malware threat intel', 'black_hat', 'Threat Intel', '{}', '{"fields":[{"name":"ioc","type":"text"}]}', 'threatfox.png'),
('OpenCTI', 'Open threat intel platform', 'black_hat', 'Threat Intel', '{}', '{"fields":[{"name":"ioc","type":"text"}]}', 'opencti.png');