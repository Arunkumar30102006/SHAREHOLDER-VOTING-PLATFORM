-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Basic Details
    company_name TEXT NOT NULL,
    cin_number TEXT NOT NULL UNIQUE,
    pan_number TEXT NOT NULL,
    gstin TEXT,
    company_type TEXT NOT NULL,
    date_of_incorporation DATE NOT NULL,
    
    -- Listing & Capital
    exchanges TEXT[] DEFAULT '{}',
    isin_number TEXT,
    authorized_capital NUMERIC NOT NULL,
    paid_up_capital NUMERIC NOT NULL,
    
    -- Address
    registered_address TEXT NOT NULL,
    country TEXT DEFAULT 'India',
    state TEXT NOT NULL,
    district TEXT,
    pin_code TEXT NOT NULL,
    
    -- Contact
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    
    -- Scrutinizer / CS Details
    cs_name TEXT NOT NULL,
    cs_membership_number TEXT NOT NULL,
    cs_email TEXT NOT NULL,
    cs_phone TEXT NOT NULL,
    
    -- SEBI / RTA Details
    sebi_email TEXT NOT NULL,
    sebi_reg_number TEXT,
    rta_name TEXT NOT NULL,
    rta_reg_number TEXT
);

-- 2. COMPANY ADMINS TABLE
CREATE TABLE IF NOT EXISTS public.company_admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    
    name TEXT NOT NULL,
    designation TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'admin' NOT NULL,
    
    UNIQUE(user_id, company_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_admins ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- POLICIES FOR COMPANIES TABLE
-- --------------------------------------------------------

-- Policy: Anyone can insert a company (needed for the public registration form)
DROP POLICY IF EXISTS "Allow public registration of companies" ON public.companies;
CREATE POLICY "Allow public registration of companies" 
ON public.companies FOR INSERT 
TO public, anon, authenticated 
WITH CHECK (true);

-- Policy: Company admins can view their own company
DROP POLICY IF EXISTS "Admins can view their company" ON public.companies;
CREATE POLICY "Admins can view their company" 
ON public.companies FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.company_admins 
        WHERE company_admins.company_id = companies.id 
        AND company_admins.user_id = auth.uid()
    )
);

-- Policy: Company admins can update their own company
DROP POLICY IF EXISTS "Admins can update their company" ON public.companies;
CREATE POLICY "Admins can update their company" 
ON public.companies FOR UPDATE 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.company_admins 
        WHERE company_admins.company_id = companies.id 
        AND company_admins.user_id = auth.uid()
    )
);

-- --------------------------------------------------------
-- POLICIES FOR COMPANY ADMINS TABLE
-- --------------------------------------------------------

-- Policy: Public can insert during registration
DROP POLICY IF EXISTS "Allow public registration of admins" ON public.company_admins;
CREATE POLICY "Allow public registration of admins" 
ON public.company_admins FOR INSERT 
TO public, anon, authenticated 
WITH CHECK (true);

-- Policy: Admins can view their own record
DROP POLICY IF EXISTS "Admins can view their own record" ON public.company_admins;
CREATE POLICY "Admins can view their own record" 
ON public.company_admins FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Policy: Admins can update their own record
DROP POLICY IF EXISTS "Admins can update their own record" ON public.company_admins;
CREATE POLICY "Admins can update their own record" 
ON public.company_admins FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid());

-- --------------------------------------------------------
-- SAFE ALTER TABLES (Ensure all columns exist if table was previously created)
-- --------------------------------------------------------

DO $$ 
BEGIN 
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS authorized_capital NUMERIC NOT NULL DEFAULT 0;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS paid_up_capital NUMERIC NOT NULL DEFAULT 0;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS cin_number TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS pan_number TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS gstin TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS company_type TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS date_of_incorporation DATE;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS exchanges TEXT[] DEFAULT '{}';
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS isin_number TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS registered_address TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'India';
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS state TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS district TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS pin_code TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS contact_email TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS contact_phone TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS cs_name TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS cs_membership_number TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS cs_email TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS cs_phone TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS sebi_email TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS sebi_reg_number TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS rta_name TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS rta_reg_number TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    -- company_admins columns
    BEGIN
        ALTER TABLE public.company_admins ADD COLUMN IF NOT EXISTS name TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.company_admins ADD COLUMN IF NOT EXISTS designation TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.company_admins ADD COLUMN IF NOT EXISTS email TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.company_admins ADD COLUMN IF NOT EXISTS phone TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.company_admins ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin' NOT NULL;
    EXCEPTION WHEN duplicate_column THEN END;

    -- optional shareholders columns
    BEGIN
        ALTER TABLE public.shareholders ADD COLUMN IF NOT EXISTS category TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.shareholders ADD COLUMN IF NOT EXISTS holding_type TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.shareholders ADD COLUMN IF NOT EXISTS pan_number TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.shareholders ADD COLUMN IF NOT EXISTS dpid_client_id TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
END $$;
