/*
  # Add admin email configuration

  1. Changes
    - Add admin_emails table to store authorized admin email addresses
    - Insert the specified admin email
    - Add RLS policies for admin access

  2. Security
    - Enable RLS on admin_emails table
    - Only allow admin users to view the table
*/

CREATE TABLE IF NOT EXISTS admin_emails (
  email text PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- Insert admin email
INSERT INTO admin_emails (email) 
VALUES ('abhikr2903@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Create policy for admin access
CREATE POLICY "Only admins can view admin emails"
  ON admin_emails
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Update the handle_new_user function to check for admin email
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (
    new.id,
    CASE 
      WHEN EXISTS (SELECT 1 FROM admin_emails WHERE email = new.email)
      THEN 'admin'::user_roles
      ELSE 'user'::user_roles
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;