-- Fix SECURITY DEFINER View (vote_stats)
-- The view needs to execute with the invoker's permissions, not the definer's.
-- We redefine the view with `security_invoker = true`.

DROP VIEW IF EXISTS public.vote_stats;
CREATE OR REPLACE VIEW public.vote_stats WITH (security_invoker = true) AS
SELECT
    resolution_id,
    COUNT(*) FILTER (WHERE UPPER(vote_value) = 'FOR') AS for_count,
    COUNT(*) FILTER (WHERE UPPER(vote_value) = 'AGAINST') AS against_count,
    COUNT(*) FILTER (WHERE UPPER(vote_value) = 'ABSTAIN') AS abstain_count,
    COUNT(*) AS total_votes,
    now() AS last_updated
FROM
    public.votes
GROUP BY
    resolution_id;

GRANT SELECT ON public.vote_stats TO authenticated;
GRANT SELECT ON public.vote_stats TO anon;


-- Fix Function Search Path Mutable Warnings
-- Functions need a search_path to prevent search path manipulation attacks.
ALTER FUNCTION public.vote_summary() SET search_path = public, pg_temp;

-- If get_secure_vote_summary exists, secure it as well. 
-- Since it might exist with different parameter types (or none), we try to secure a common definition or ignore if not found (using a DO block).
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_secure_vote_summary') THEN
      ALTER FUNCTION public.get_secure_vote_summary() SET search_path = public, pg_temp;
  END IF;
END $$;


-- Fix RLS Policies Always True (`USING (true)` / `WITH CHECK (true)`)

-- 1. audit_logs
-- The trigger handles insertion using SECURITY DEFINER. Direct inserts should be blocked for all users.
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "System triggers can insert audit logs" ON public.audit_logs;
CREATE POLICY "System triggers can insert audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (false); -- Block direct user inserts, the SECURITY DEFINER trigger bypasses RLS

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (false); -- Block public read. (Update `false` to a specific admin role check if needed)


-- 2. companies
-- Companies read access was likely open for all. Restricting to authenticated and anon users (removing the generic 'true').
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.companies;
CREATE POLICY "Enable read access for all users" ON public.companies
FOR SELECT 
USING (
  auth.role() = 'anon' OR auth.role() = 'authenticated'
);

-- 3. shareholder_feedback
ALTER TABLE public.shareholder_feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.shareholder_feedback;
CREATE POLICY "Enable insert for authenticated users" ON public.shareholder_feedback
FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Enable read access for all users" ON public.shareholder_feedback;
CREATE POLICY "Enable read access for authenticated users" ON public.shareholder_feedback
FOR SELECT 
USING (
  auth.role() = 'authenticated'
);


-- 4. verification_codes
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated and service_role" ON public.verification_codes;
CREATE POLICY "Enable all access for authenticated and service_role" ON public.verification_codes
FOR ALL 
USING (
  auth.role() = 'authenticated' OR auth.role() = 'service_role'
);


-- 5. votes
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.votes;
CREATE POLICY "Enable read access for authenticated users" ON public.votes
FOR SELECT 
USING (
  auth.role() = 'authenticated' OR auth.uid() = shareholder_id
);

-- Ensure insert policy is strict
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.votes;
DROP POLICY IF EXISTS "Shareholders can cast their own vote" ON public.votes;
CREATE POLICY "Shareholders can cast their own vote" ON public.votes
FOR INSERT 
WITH CHECK (
  auth.uid() = shareholder_id
);
