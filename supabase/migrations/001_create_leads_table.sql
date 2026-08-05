-- Create leads table with full schema
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  enquiry_type VARCHAR(50) NOT NULL,
  customer_type VARCHAR(50),
  service VARCHAR(255),
  property_type VARCHAR(50),
  message TEXT,
  preferred_contact_method VARCHAR(50) NOT NULL DEFAULT 'email',
  preferred_date VARCHAR(50),
  marketing_consent BOOLEAN DEFAULT false,
  marketing_consent_at TIMESTAMP WITH TIME ZONE,
  privacy_consent BOOLEAN NOT NULL,
  privacy_consent_at TIMESTAMP WITH TIME ZONE NOT NULL,
  lead_source VARCHAR(100),
  page_url TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  assigned_to UUID,
  internal_notes TEXT,
  ip_address INET,
  user_agent TEXT,
  CONSTRAINT valid_enquiry_type CHECK (enquiry_type IN ('general', 'residential-estimate', 'commercial-survey', 'property-partnership')),
  CONSTRAINT valid_customer_type CHECK (customer_type IS NULL OR customer_type IN ('residential', 'commercial', 'property-professional')),
  CONSTRAINT valid_contact_method CHECK (preferred_contact_method IN ('email', 'phone', 'both')),
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'unqualified', 'archived')),
  CONSTRAINT privacy_consent_required CHECK (privacy_consent = true),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_enquiry_type ON leads(enquiry_type);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only authenticated users (staff) can read
CREATE POLICY "Staff can read all leads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies: Only the API server (via service role) can insert
-- This will be enforced at the application level via environment variable
CREATE POLICY "API can insert leads" ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies: Only staff can update
CREATE POLICY "Staff can update leads" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies: Deny all anonymous access
CREATE POLICY "No anonymous reads" ON leads
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "No anonymous inserts" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (false);

CREATE POLICY "No anonymous updates" ON leads
  FOR UPDATE
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "No anonymous deletes" ON leads
  FOR DELETE
  TO anon
  USING (false);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
