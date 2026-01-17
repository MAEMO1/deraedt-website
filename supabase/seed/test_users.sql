-- =============================================================================
-- TEST USERS SEED SCRIPT
-- =============================================================================
-- Voer dit uit in de Supabase SQL Editor (https://supabase.com/dashboard)
--
-- Dit maakt 2 test accounts aan:
-- 1. Admin: admin@deraedt.be (rol: DIRECTIE)
-- 2. Klant: klant@deraedt.be (rol: VIEWER)
--
-- BELANGRIJK: Na het uitvoeren kun je inloggen via de magic link flow.
-- De magic link wordt naar deze email adressen gestuurd, dus zorg dat je
-- toegang hebt tot een email catch-all of gebruik Supabase email templates.
-- =============================================================================

-- Eerst: maak de test users aan in auth.users
-- Let op: dit gebruikt de interne Supabase functies

DO $$
DECLARE
  admin_user_id UUID;
  client_user_id UUID;
BEGIN
  -- Check if admin user already exists
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@deraedt.be';

  IF admin_user_id IS NULL THEN
    -- Create admin user
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      raw_app_meta_data,
      aud,
      role,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'admin@deraedt.be',
      crypt('Admin123!', gen_salt('bf')), -- Wachtwoord: Admin123!
      NOW(),
      '{"full_name": "Ivan De Raedt"}'::jsonb,
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      'authenticated',
      'authenticated',
      NOW(),
      NOW(),
      '',
      ''
    )
    RETURNING id INTO admin_user_id;

    -- Update profile with DIRECTIE role
    UPDATE public.profiles
    SET role = 'DIRECTIE', full_name = 'Ivan De Raedt'
    WHERE id = admin_user_id;

    RAISE NOTICE 'Admin user created: admin@deraedt.be';
  ELSE
    RAISE NOTICE 'Admin user already exists';
  END IF;

  -- Check if client user already exists
  SELECT id INTO client_user_id FROM auth.users WHERE email = 'klant@deraedt.be';

  IF client_user_id IS NULL THEN
    -- Create client user
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      raw_app_meta_data,
      aud,
      role,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'klant@deraedt.be',
      crypt('Klant123!', gen_salt('bf')), -- Wachtwoord: Klant123!
      NOW(),
      '{"full_name": "Jan Janssen"}'::jsonb,
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      'authenticated',
      'authenticated',
      NOW(),
      NOW(),
      '',
      ''
    )
    RETURNING id INTO client_user_id;

    -- Profile is created automatically by trigger, just update the name
    UPDATE public.profiles
    SET full_name = 'Jan Janssen'
    WHERE id = client_user_id;

    RAISE NOTICE 'Client user created: klant@deraedt.be';
  ELSE
    RAISE NOTICE 'Client user already exists';
  END IF;
END $$;

-- =============================================================================
-- VERIFICATIE: Bekijk de aangemaakte users
-- =============================================================================
SELECT
  u.email,
  p.full_name,
  p.role,
  u.email_confirmed_at IS NOT NULL as email_confirmed
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
WHERE u.email IN ('admin@deraedt.be', 'klant@deraedt.be');
