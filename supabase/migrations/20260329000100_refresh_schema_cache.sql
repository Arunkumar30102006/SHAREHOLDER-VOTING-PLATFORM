-- Force PostgREST schema cache reload
-- This is necessary to sync the API layer with recent DDL changes (like record_date column)
NOTIFY pgrst, 'reload schema';

-- Dummy change to also trigger Supabase's automatic detection if NOTIFY is not configured
COMMENT ON TABLE public.voting_sessions IS 'Stores voting sessions with record date and status tracking';
