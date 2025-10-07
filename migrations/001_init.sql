CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'team_lead', 'operator', 'viewer')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- ROLES (future-proof for custom RBAC)
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(32) UNIQUE NOT NULL
);

-- TOOLS (30+ tools with metadata/UI schema)
CREATE TABLE IF NOT EXISTS tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(50),
    default_parameters JSONB,
    requires_scope BOOLEAN DEFAULT TRUE,
    ui_schema JSONB,
    icon VARCHAR(100)
);

-- Insert sample tools
INSERT INTO tools (name, description, category, default_parameters, ui_schema, icon)
VALUES
('Nmap', 'Network scanner', 'Recon', '{"scanType":"tcp_syn"}', '{"fields":[{"name":"target","type":"text"}]}', 'nmap.png'),
('Hydra', 'Login cracker', 'Password', '{"service":"ssh"}', '{"fields":[{"name":"target","type":"text"},{"name":"username","type":"text"}]}', 'hydra.png'),
('Hashcat', 'Password hash cracker', 'Password', '{}', '{"fields":[{"name":"hashfile","type":"file"}]}', 'hashcat.png'),
('Metasploit', 'Exploitation framework', 'Exploit', '{}', '{"fields":[{"name":"target","type":"text"},{"name":"exploit","type":"text"}]}', 'metasploit.png'),
('Burp Suite', 'Web vulnerability scanner', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'burp.png'),
('Nikto', 'Web server scanner', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'nikto.png'),
('Gobuster', 'Directory brute-forcer', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'gobuster.png'),
('Dirb', 'Directory brute-forcer', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'dirb.png'),
('SQLmap', 'Automated SQL injection', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'sqlmap.png'),
('Wfuzz', 'Web application fuzzer', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'wfuzz.png'),
('John the Ripper', 'Password cracker', 'Password', '{}', '{"fields":[{"name":"hashfile","type":"file"}]}', 'john.png'),
('Netcat', 'Network utility', 'Recon', '{}', '{"fields":[{"name":"target","type":"text"},{"name":"port","type":"number"}]}', 'netcat.png'),
('Enum4linux', 'Windows/Samba enumeration', 'Recon', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'enum4linux.png'),
('Impacket', 'Python networking library', 'Post-Exploitation', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'impacket.png'),
('Responder', 'LLMNR, NBT-NS, MDNS poisoner', 'Post-Exploitation', '{}', '{"fields":[{"name":"interface","type":"text"}]}', 'responder.png'),
('CrackMapExec', 'Pentesting Swiss Army knife', 'Password', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'cme.png'),
('BloodHound', 'AD enumeration', 'Recon', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'bloodhound.png'),
('TheHarvester', 'Email, domain gatherer', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'theharvester.png'),
('Amass', 'Subdomain enumeration', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'amass.png'),
('Sublist3r', 'Subdomain enumeration', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'sublist3r.png'),
('Fierce', 'DNS reconnaissance', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'fierce.png'),
('Dnsenum', 'DNS enumeration', 'Recon', '{}', '{"fields":[{"name":"domain","type":"text"}]}', 'dnsenum.png'),
('WPScan', 'WordPress scanner', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'wpscan.png'),
('SSLScan', 'SSL/TLS scanner', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'sslscan.png'),
('WhatWeb', 'Website fingerprinting', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'whatweb.png'),
('Searchsploit', 'Exploit database search', 'Exploit', '{}', '{"fields":[{"name":"query","type":"text"}]}', 'searchsploit.png'),
('XSStrike', 'XSS detection', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'xsstrike.png'),
('Fuff', 'Web fuzzer', 'Web', '{}', '{"fields":[{"name":"target","type":"text"}]}', 'fuff.png'),
('Social-Engineer Toolkit', 'Phishing, SE simulation', 'Social Engineering', '{}', '{"fields":[{"name":"scenario","type":"text"}]}', 'setoolkit.png'),
('Aircrack-ng', 'Wi-Fi security auditing', 'Wireless', '{}', '{"fields":[{"name":"interface","type":"text"}]}', 'aircrack.png');

-- ASSETS, FINDINGS, AUDIT LOGS, etc. (as before)
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address INET,
    hostname VARCHAR(255),
    os VARCHAR(100),
    risk_score DECIMAL(3,2) DEFAULT 0.0,
    discovered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_id UUID REFERENCES assets(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    proof TEXT,
    remediation TEXT,
    cvss_score DECIMAL(3,1),
    severity VARCHAR(20),
    status VARCHAR(20) DEFAULT 'open'
);

CREATE TABLE IF NOT EXISTS tool_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    tool_id UUID REFERENCES tools(id),
    command TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    output_path VARCHAR(500),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    ip_address INET,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    details JSONB
);

-- Insert an admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role)
VALUES (
  'admin',
  'admin@cf.local',
  '$2b$10$QeTP6KQK3Q2k/GQ3rKfK6u3S1m0gv8wM7eQWv9wE1I6qF1wEyQOQK',
  'admin'
)
ON CONFLICT (username) DO NOTHING;