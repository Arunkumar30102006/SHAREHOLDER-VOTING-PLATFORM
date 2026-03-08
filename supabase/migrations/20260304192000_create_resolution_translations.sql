-- Create resolution_translations table
CREATE TABLE IF NOT EXISTS public.resolution_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resolution_id UUID NOT NULL REFERENCES public.resolutions(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL,
    translated_title TEXT NOT NULL,
    translated_description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(resolution_id, language_code)
);

-- Add RLS policies
ALTER TABLE public.resolution_translations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to translations
CREATE POLICY "Translations are viewable by everyone" 
ON public.resolution_translations FOR SELECT 
USING (true);

-- Allow authenticated users to insert translations (ideally restricted to service role, but allowing authenticated for now)
CREATE POLICY "Authenticated users can insert translations" 
ON public.resolution_translations FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
