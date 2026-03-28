-- Weighted E-Voting System Migration
-- Implements one-share-one-vote logic and voter master freezing

-- 1. Update voting_sessions with Record Date and Status
ALTER TABLE public.voting_sessions 
ADD COLUMN IF NOT EXISTS record_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'open', 'closed', 'completed'));

-- 2. Create Voter Master table to freeze shareholding per session
CREATE TABLE IF NOT EXISTS public.voter_master (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.voting_sessions(id) ON DELETE CASCADE,
    shareholder_id UUID REFERENCES public.shareholders(id) ON DELETE CASCADE,
    voter_name TEXT NOT NULL,
    folio_number TEXT,
    shares_count INTEGER NOT NULL DEFAULT 0,
    dvr_multiplier NUMERIC(5,2) DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(session_id, shareholder_id)
);

-- 3. Add weighted_votes to votes table
ALTER TABLE public.votes 
ADD COLUMN IF NOT EXISTS weighted_votes NUMERIC(20,2);

-- 4. Function to automatically calculate weighted vote on insert
CREATE OR REPLACE FUNCTION public.calculate_weighted_vote()
RETURNS TRIGGER AS $$
DECLARE
    v_session_id UUID;
    v_shares INTEGER;
    v_multiplier NUMERIC(5,2);
BEGIN
    -- Get session_id from the resolution
    SELECT voting_session_id INTO v_session_id 
    FROM public.resolutions 
    WHERE id = NEW.resolution_id;

    -- Lookup shareholder's shares in voter_master for THIS specific session
    SELECT shares_count, dvr_multiplier INTO v_shares, v_multiplier
    FROM public.voter_master
    WHERE session_id = v_session_id AND shareholder_id = NEW.shareholder_id;

    -- If not found in voter_master, fallback to current global shareholding
    IF v_shares IS NULL THEN
        SELECT shares_held INTO v_shares
        FROM public.shareholders
        WHERE id = NEW.shareholder_id;
        v_multiplier := 1.0;
    END IF;

    -- Set the weighted_votes
    NEW.weighted_votes := COALESCE(v_shares, 0) * COALESCE(v_multiplier, 1.0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger for automated weighting
DROP TRIGGER IF EXISTS tr_calculate_weighted_vote ON public.votes;
CREATE TRIGGER tr_calculate_weighted_vote
BEFORE INSERT ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.calculate_weighted_vote();

-- 6. Update vote_stats view to use WEIGHTED sums
DROP VIEW IF EXISTS public.vote_stats;
CREATE OR REPLACE VIEW public.vote_stats AS
SELECT
    resolution_id,
    COALESCE(SUM(weighted_votes) FILTER (WHERE UPPER(vote_value) = 'FOR'), 0) AS for_count,
    COALESCE(SUM(weighted_votes) FILTER (WHERE UPPER(vote_value) = 'AGAINST'), 0) AS against_count,
    COALESCE(SUM(weighted_votes) FILTER (WHERE UPPER(vote_value) = 'ABSTAIN'), 0) AS abstain_count,
    COALESCE(SUM(weighted_votes), 0) AS total_weighted_votes,
    COUNT(*) AS total_vote_count,
    now() AS last_updated
FROM
    public.votes
GROUP BY
    resolution_id;

-- 7. Permissions
GRANT SELECT ON public.voter_master TO authenticated;
GRANT SELECT ON public.vote_stats TO authenticated;
GRANT SELECT ON public.vote_stats TO anon;

-- 8. Enable RLS on voter_master
ALTER TABLE public.voter_master ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='voter_master_view') THEN
CREATE POLICY voter_master_view ON public.voter_master
FOR SELECT TO authenticated
USING (
    shareholder_id = auth.uid() OR 
    session_id IN (
        SELECT id FROM public.voting_sessions 
        WHERE company_id IN (SELECT company_id FROM public.company_admins WHERE user_id=auth.uid())
    )
);
END IF; END $$;
