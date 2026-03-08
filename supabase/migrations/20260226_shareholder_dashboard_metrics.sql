-- Migration: 20260226_shareholder_dashboard_metrics
-- Purpose: Creates an optimized RPC to fetch comprehensive analytical data for a shareholder

DROP FUNCTION IF EXISTS public.get_shareholder_analysis_metrics(UUID);

CREATE OR REPLACE FUNCTION public.get_shareholder_analysis_metrics(_shareholder_id TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_company_id UUID;
    v_total_shares INTEGER;
    v_total_company_shares INTEGER;
    v_total_resolutions INTEGER;
    v_total_votes_cast INTEGER;
    v_shareholding_percentage NUMERIC;
    v_participation_rate NUMERIC;
    v_voting_distribution json;
    v_participation_trend json;
    v_shareholding_comparison json;
    v_shareholder_name TEXT;
    v_login_id TEXT;
BEGIN
    -- 1. Validate Access
    -- Ensure the shareholder exists
    IF NOT EXISTS (
        SELECT 1 FROM public.shareholders
        WHERE id = _shareholder_id::UUID
    ) THEN
        RAISE EXCEPTION 'Invalid shareholder ID';
    END IF;

    -- 2. Fetch Base Shareholder Info
    SELECT 
        company_id, shares_held, shareholder_name, login_id
    INTO 
        v_company_id, v_total_shares, v_shareholder_name, v_login_id
    FROM public.shareholders
    WHERE id = _shareholder_id::UUID;

    -- 3. Fetch Company Aggregates
    SELECT COALESCE(SUM(shares_held), 1) -- Prevent Division by Zero
    INTO v_total_company_shares
    FROM public.shareholders
    WHERE company_id = v_company_id;

    v_shareholding_percentage := ROUND((v_total_shares::numeric / v_total_company_shares::numeric) * 100, 2);

    -- 4. Participation Metrics
    -- Total Resolutions the shareholder was eligible for (in active/ended sessions)
    SELECT COUNT(r.id)
    INTO v_total_resolutions
    FROM public.resolutions r
    JOIN public.voting_sessions vs ON r.voting_session_id = vs.id
    WHERE vs.company_id = v_company_id;

    -- Total Votes Cast by this Shareholder
    SELECT COUNT(id)
    INTO v_total_votes_cast
    FROM public.votes
    WHERE shareholder_id = _shareholder_id::UUID;

    v_participation_rate := CASE 
        WHEN v_total_resolutions > 0 THEN ROUND((v_total_votes_cast::numeric / v_total_resolutions::numeric) * 100, 2)
        ELSE 0
    END;

    -- 5. Chart 1: Voting Distribution (Pie Chart)
    SELECT json_agg(json_build_object('name', vote_value, 'value', count))
    INTO v_voting_distribution
    FROM (
        SELECT vote_value, COUNT(*) as count 
        FROM public.votes 
        WHERE shareholder_id = _shareholder_id::UUID
        GROUP BY vote_value
    ) aggregated_votes;

    -- Default if no votes cast yet
    IF v_voting_distribution IS NULL THEN
         v_voting_distribution := '[{"name": "No Votes", "value": 1}]'::json;
    END IF;

    -- 6. Chart 2: Participation Trend (Line Chart by Session)
    SELECT json_agg(json_build_object('session', session_title, 'votes', votes_cast))
    INTO v_participation_trend
    FROM (
        SELECT 
            vs.title as session_title, 
            COUNT(v.id) as votes_cast
        FROM public.voting_sessions vs
        JOIN public.resolutions r ON r.voting_session_id = vs.id
        LEFT JOIN public.votes v ON v.resolution_id = r.id AND v.shareholder_id = _shareholder_id::UUID
        WHERE vs.company_id = v_company_id
        GROUP BY vs.id, vs.title
        ORDER BY vs.start_date ASC
    ) trend_data;

    -- Default if no sessions
    IF v_participation_trend IS NULL THEN
         v_participation_trend := '[]'::json;
    END IF;

    -- 7. Chart 3: Shareholding Comparison (Bar Chart)
    v_shareholding_comparison := json_build_array(
        json_build_object('category', 'Your Shares', 'amount', v_total_shares),
        json_build_object('category', 'Company Avg', 'amount', ROUND(v_total_company_shares::numeric / GREATEST((SELECT COUNT(*) FROM public.shareholders WHERE company_id = v_company_id), 1), 0))
    );

    -- 8. Return Aggregated JSON
    RETURN json_build_object(
        'shareholder_name', v_shareholder_name,
        'login_id', v_login_id,
        'total_shares', v_total_shares,
        'shareholding_percentage', v_shareholding_percentage,
        'total_votes_cast', v_total_votes_cast,
        'total_resolutions', v_total_resolutions,
        'participation_rate', v_participation_rate,
        'voting_distribution', v_voting_distribution,
        'participation_trend', v_participation_trend,
        'shareholding_comparison', v_shareholding_comparison
    );
END;
$$;

-- Grant permissions so the frontend (using the anon key) can call it
GRANT EXECUTE ON FUNCTION public.get_shareholder_analysis_metrics(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_shareholder_analysis_metrics(TEXT) TO anon;
