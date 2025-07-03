
-- Create affiliates table
CREATE TABLE public.affiliates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  affiliate_code TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create affiliate_referrals table
CREATE TABLE public.affiliate_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_code TEXT NOT NULL,
  referred_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  conversion_status TEXT DEFAULT 'pending',
  converted_at TIMESTAMP WITH TIME ZONE NULL,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_referrals ENABLE ROW LEVEL SECURITY;

-- RLS policies for affiliates table
CREATE POLICY "Users can view their own affiliate data" 
  ON public.affiliates 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own affiliate data" 
  ON public.affiliates 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own affiliate data" 
  ON public.affiliates 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for affiliate_referrals table
CREATE POLICY "Users can view referrals for their affiliate code" 
  ON public.affiliate_referrals 
  FOR SELECT 
  USING (
    affiliate_code IN (
      SELECT affiliate_code FROM public.affiliates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create referrals" 
  ON public.affiliate_referrals 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update referrals for their affiliate code" 
  ON public.affiliate_referrals 
  FOR UPDATE 
  USING (
    affiliate_code IN (
      SELECT affiliate_code FROM public.affiliates WHERE user_id = auth.uid()
    )
  );
