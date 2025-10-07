-- Example: NIST CSF mapping table
CREATE TABLE compliance_frameworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE compliance_controls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    framework_id UUID REFERENCES compliance_frameworks(id),
    control_id VARCHAR(50) NOT NULL,
    control_description TEXT
);

CREATE TABLE finding_control_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    finding_id UUID REFERENCES findings(id),
    control_id UUID REFERENCES compliance_controls(id)
);