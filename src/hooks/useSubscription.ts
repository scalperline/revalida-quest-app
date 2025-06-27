import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string | null;
  subscription_end?: string | null;
  loading: boolean;
  error?: string | null;
}

interface UsageLimits {
  daily_questions_used: number;
  monthly_simulados_used: number;
  last_reset_date: string;
}

export function useSubscription() {
  const { user, session } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    loading: true,
    error: null
  });
  const [usageLimits, setUsageLimits] = useState<UsageLimits | null>(null);

  const checkSubscription = useCallback(async () => {
    if (!user || !session) {
      setSubscriptionData({ subscribed: false, loading: false, error: null });
      return;
    }

    try {
      setSubscriptionData(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscriptionData({
        subscribed: data.subscribed,
        subscription_tier: data.subscription_tier,
        subscription_end: data.subscription_end,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscriptionData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to check subscription'
      }));
    }
  }, [user, session]);

  const createCheckoutSession = async (priceId: string) => {
    if (!session) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;
    return data.url;
  };

  const openCustomerPortal = async () => {
    if (!session) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('customer-portal', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;
    window.open(data.url, '_blank');
  };

  const fetchUsageLimits = useCallback(async () => {
    if (!user) return;

    try {
      console.log('Fetching usage limits for user:', user.id);
      
      // First, try to get existing limits
      const { data: existingData, error: selectError } = await supabase
        .from('usage_limits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (selectError) {
        console.error('Error fetching usage limits:', selectError);
        return;
      }

      if (existingData && existingData.length > 0) {
        console.log('Found existing usage limits:', existingData[0]);
        setUsageLimits(existingData[0]);
        
        // If there are multiple records, clean them up (keep only the most recent)
        if (existingData.length > 1) {
          console.log('Multiple usage records found, cleaning up...');
          const { error: deleteError } = await supabase
            .from('usage_limits')
            .delete()
            .eq('user_id', user.id)
            .neq('id', existingData[0].id);
          
          if (deleteError) {
            console.error('Error cleaning up duplicate records:', deleteError);
          } else {
            console.log('Cleaned up duplicate usage records');
          }
        }
      } else {
        // Create initial usage limits record using upsert
        console.log('No existing limits found, creating new record');
        const { data: newData, error: upsertError } = await supabase
          .from('usage_limits')
          .upsert({
            user_id: user.id,
            daily_questions_used: 0,
            monthly_simulados_used: 0,
            last_reset_date: new Date().toISOString().split('T')[0]
          }, { 
            onConflict: 'user_id',
            ignoreDuplicates: false 
          })
          .select()
          .single();

        if (upsertError) {
          console.error('Error creating usage limits:', upsertError);
        } else {
          console.log('Created new usage limits:', newData);
          setUsageLimits(newData);
        }
      }
    } catch (error) {
      console.error('Error in fetchUsageLimits:', error);
    }
  }, [user]);

  const updateUsage = async (type: 'questions' | 'simulados', increment: number = 1) => {
    if (!user || !usageLimits) {
      console.log('Cannot update usage: no user or limits');
      return;
    }

    const field = type === 'questions' ? 'daily_questions_used' : 'monthly_simulados_used';
    const newValue = usageLimits[field] + increment;

    console.log(`Updating ${type} usage from ${usageLimits[field]} to ${newValue}`);

    try {
      const { data, error } = await supabase
        .from('usage_limits')
        .upsert({
          user_id: user.id,
          daily_questions_used: type === 'questions' ? newValue : usageLimits.daily_questions_used,
          monthly_simulados_used: type === 'simulados' ? newValue : usageLimits.monthly_simulados_used,
          last_reset_date: usageLimits.last_reset_date
        }, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        })
        .select()
        .single();

      if (error) throw error;
      
      console.log('Updated usage limits:', data);
      setUsageLimits(data);
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };

  const canUseFeature = (feature: 'questions' | 'simulados'): boolean => {
    console.log(`Checking if can use ${feature}:`, {
      subscribed: subscriptionData.subscribed,
      usageLimits,
      feature
    });

    if (subscriptionData.subscribed) {
      console.log('User is subscribed, allowing feature');
      return true;
    }
    
    if (!usageLimits) {
      console.log('No usage limits found, denying feature');
      return false;
    }

    if (feature === 'questions') {
      const canUse = usageLimits.daily_questions_used < 10;
      console.log(`Questions check: ${usageLimits.daily_questions_used}/10, can use: ${canUse}`);
      return canUse;
    } else {
      const canUse = usageLimits.monthly_simulados_used < 1;
      console.log(`Simulados check: ${usageLimits.monthly_simulados_used}/1, can use: ${canUse}`);
      return canUse;
    }
  };

  const getFeatureLimit = (feature: 'questions' | 'simulados'): { used: number; limit: number; unlimited: boolean } => {
    if (!usageLimits) return { used: 0, limit: 0, unlimited: false };

    const unlimited = subscriptionData.subscribed;
    
    if (feature === 'questions') {
      return {
        used: usageLimits.daily_questions_used,
        limit: 10,
        unlimited
      };
    } else {
      // Simulados limits based on plan
      let limit = 1; // Free plan
      if (subscriptionData.subscribed) {
        switch (subscriptionData.subscription_tier) {
          case 'Basic':
            limit = 5;
            break;
          case 'Premium':
          case 'Pro':
            return { used: usageLimits.monthly_simulados_used, limit: 999, unlimited: true };
        }
      }
      
      return {
        used: usageLimits.monthly_simulados_used,
        limit,
        unlimited: subscriptionData.subscription_tier === 'Premium' || subscriptionData.subscription_tier === 'Pro'
      };
    }
  };

  useEffect(() => {
    checkSubscription();
    fetchUsageLimits();
  }, [checkSubscription, fetchUsageLimits]);

  return {
    ...subscriptionData,
    usageLimits,
    checkSubscription,
    createCheckoutSession,
    openCustomerPortal,
    updateUsage,
    canUseFeature,
    getFeatureLimit,
    isFreePlan: !subscriptionData.subscribed,
    isBasicPlan: subscriptionData.subscribed && subscriptionData.subscription_tier === 'Basic',
    isPremiumPlan: subscriptionData.subscribed && subscriptionData.subscription_tier === 'Premium',
    isProPlan: subscriptionData.subscribed && subscriptionData.subscription_tier === 'Pro',
  };
}
