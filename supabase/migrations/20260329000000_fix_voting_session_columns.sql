-- Fix missing columns in voting_sessions table
-- Added for automation state tracking (auto-start/auto-end logic)

ALTER TABLE public.voting_sessions 
ADD COLUMN IF NOT EXISTS auto_start_done BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS auto_end_done BOOLEAN DEFAULT false;

-- Comment to explain the columns
COMMENT ON COLUMN public.voting_sessions.auto_start_done IS 'Flag denoting if the session was automatically activated based on start_date';
COMMENT ON COLUMN public.voting_sessions.auto_end_done IS 'Flag denoting if the session was automatically paused based on end_date';
