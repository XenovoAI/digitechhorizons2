/*
  # Add new admin email

  1. Changes
    - Add new admin email to the admin_emails table
    - Ensure idempotent operations with ON CONFLICT clause

  2. Security
    - Maintain existing RLS policies
*/

INSERT INTO admin_emails (email) 
VALUES ('abhisingh29006@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Ensure the handle_new_user function is up to date
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