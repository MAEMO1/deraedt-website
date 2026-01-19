-- ============================================================================
-- Fix infinite recursion in profiles RLS policy
-- The admin policy was querying profiles to check if user is admin,
-- which triggered the same policy check, causing infinite recursion.
-- ============================================================================

-- First, create a SECURITY DEFINER function to check admin role
-- This bypasses RLS and avoids recursion
CREATE OR REPLACE FUNCTION public.is_admin_or_directie()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('DIRECTIE', 'ADMIN')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Recreate it using the SECURITY DEFINER function
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    public.is_admin_or_directie()
  );

-- Also fix the partners INSERT policy which has the same issue
DROP POLICY IF EXISTS "partners_insert" ON public.partners;

CREATE POLICY "partners_insert" ON public.partners
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_admin_or_directie() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'OPERATIONS'
    )
  );

-- Create a more general role check function for other policies
CREATE OR REPLACE FUNCTION public.user_has_role(required_roles TEXT[])
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = ANY(required_roles)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION public.is_admin_or_directie IS 'Check if current user is ADMIN or DIRECTIE (bypasses RLS)';
COMMENT ON FUNCTION public.user_has_role IS 'Check if current user has one of the required roles (bypasses RLS)';
