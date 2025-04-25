/*
  # Add test data for dashboard

  1. Changes
    - Add more realistic test data for content scans
    - Add initial protection metrics for existing users
    - Improve trigger function to handle edge cases

  2. Security
    - Maintain existing RLS policies
*/

-- Insert test protection metrics for existing users
INSERT INTO protection_metrics (user_id, protected_content_count, monitoring_uptime, threats_blocked)
SELECT 
  id as user_id,
  floor(random() * 10 + 1)::int as protected_content_count,
  95.0 + (random() * 5) as monitoring_uptime,
  floor(random() * 50)::int as threats_blocked
FROM profiles
ON CONFLICT DO NOTHING;

-- Insert multiple test scans per user
INSERT INTO content_scans (user_id, scan_date, status, findings)
SELECT 
  p.id as user_id,
  now() - (interval '1 hour' * generate_series(0, 24)) as scan_date,
  CASE WHEN random() > 0.1 THEN 'completed' ELSE 'failed' END as status,
  json_build_object(
    'threats', floor(random() * 5)::int,
    'scanned_urls', floor(random() * 200 + 50)::int,
    'protected_assets', floor(random() * 5 + 1)::int
  )::jsonb as findings
FROM profiles p
CROSS JOIN generate_series(1, 5)
ON CONFLICT DO NOTHING;

-- Improve the initialize_user_metrics function to handle edge cases
CREATE OR REPLACE FUNCTION initialize_user_metrics()
RETURNS trigger AS $$
BEGIN
  INSERT INTO protection_metrics (
    user_id,
    protected_content_count,
    monitoring_uptime,
    threats_blocked
  )
  VALUES (
    NEW.id,
    0,
    100.0,
    0
  )
  ON CONFLICT (user_id) DO UPDATE
  SET 
    updated_at = now(),
    monitoring_uptime = EXCLUDED.monitoring_uptime;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;