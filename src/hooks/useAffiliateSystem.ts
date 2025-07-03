
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AffiliateData {
  affiliateCode: string;
  referralCount: number;
  totalEarnings: number;
  monthlyEarnings: number;
  conversionRate: number;
  isAffiliate: boolean;
}

export function useAffiliateSystem() {
  const { user } = useAuth();
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);

  const generateAffiliateCode = useCallback(async () => {
    if (!user) return null;
    
    const code = `${user.user_metadata?.display_name?.toUpperCase().slice(0, 3) || 'REV'}${user.id.slice(0, 6).toUpperCase()}`;
    
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .upsert({
          user_id: user.id,
          affiliate_code: code,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      return code;
    } catch (error) {
      console.error('Erro ao gerar código de afiliado:', error);
      return null;
    }
  }, [user]);

  const trackReferral = useCallback(async (affiliateCode: string) => {
    if (!affiliateCode) return;
    
    localStorage.setItem('referral_code', affiliateCode);
    
    try {
      await supabase
        .from('affiliate_referrals')
        .insert({
          affiliate_code: affiliateCode,
          referred_at: new Date().toISOString(),
          conversion_status: 'pending'
        });
    } catch (error) {
      console.error('Erro ao rastrear referência:', error);
    }
  }, []);

  const getAffiliateStats = useCallback(async () => {
    if (!user) return;

    try {
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!affiliate) {
        setAffiliateData({
          affiliateCode: '',
          referralCount: 0,
          totalEarnings: 0,
          monthlyEarnings: 0,
          conversionRate: 0,
          isAffiliate: false
        });
        return;
      }

      const { data: referrals } = await supabase
        .from('affiliate_referrals')
        .select('*')
        .eq('affiliate_code', affiliate.affiliate_code);

      const totalReferrals = referrals?.length || 0;
      const conversions = referrals?.filter(r => r.conversion_status === 'converted').length || 0;
      const conversionRate = totalReferrals > 0 ? (conversions / totalReferrals) * 100 : 0;

      setAffiliateData({
        affiliateCode: affiliate.affiliate_code,
        referralCount: totalReferrals,
        totalEarnings: conversions * 15.98, // 20% de R$ 79,90
        monthlyEarnings: conversions * 15.98, // Simplificado para o exemplo
        conversionRate,
        isAffiliate: true
      });
    } catch (error) {
      console.error('Erro ao buscar stats de afiliado:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getAffiliateStats();
  }, [getAffiliateStats]);

  // Verificar código de referência na URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      trackReferral(refCode);
    }
  }, [trackReferral]);

  return {
    affiliateData,
    loading,
    generateAffiliateCode,
    trackReferral,
    getAffiliateStats
  };
}
