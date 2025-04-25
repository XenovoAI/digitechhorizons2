/*
  # Add reporting tables and analytics tracking

  1. New Tables
    - `content_scans` - Track content protection scans
      - id (uuid)
      - user_id (uuid, references profiles)
      - scan_date (timestamptz)
      - status (text)
      - findings (jsonb)
      
    - `protection_metrics` - Store protection statistics
      - id (uuid)
      - user_id (uuid, references profiles)
      - protected_content_count (int)
      - monitoring_uptime (float)
      - last_scan (timestamptz)
      - threats_blocked (int)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Content Scans Table
CREATE TABLE IF NOT EXISTS content_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  scan_date timestamptz DEFAULT now(),
  status text NOT NULL,
  findings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Protection Metrics Table
CREATE TABLE IF NOT EXISTS protection_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  protected_content_count int DEFAULT 0,
  monitoring_uptime float DEFAULT 100.0,
  last_scan timestamptz DEFAULT now(),
  threats_blocked int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE protection_metrics ENABLE ROW LEVEL SECURITY;

-- Policies for content_scans
CREATE POLICY "Users can view own scans"
  ON content_scans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans"
  ON content_scans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for protection_metrics
CREATE POLICY "Users can view own metrics"
  ON protection_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON protection_metrics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON protection_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to initialize metrics for new users
CREATE OR REPLACE FUNCTION initialize_user_metrics()
RETURNS trigger AS $$
BEGIN
  INSERT INTO protection_metrics (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create metrics when profile is created
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_metrics();

-- Insert initial scan data for testing
INSERT INTO content_scans (user_id, status, findings)
SELECT 
  p.id,
  'completed',
  '{"threats": 0, "scanned_urls": 150, "protected_assets": 3}'::jsonb
FROM profiles p
ON CONFLICT DO NOTHING;