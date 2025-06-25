
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
      const { data, error } = await supabase
        .from('usage_limits')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching usage limits:', error);
        return;
      }

      if (data) {
        setUsageLimits(data);
      } else {
        // Create initial usage limits record
        const { data: newData, error: insertError } = await supabase
          .from('usage_limits')
          .insert({
            user_id: user.id,
            daily_questions_used: 0,
            monthly_simulados_used: 0,
            last_reset_date: new Date().toISOString().split('T')[0]
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating usage limits:', insertError);
        } else {
          setUsageLimits(newData);
        }
      }
    } catch (error) {
      console.error('Error in fetchUsageLimits:', error);
    }
  }, [user]);

  const updateUsage = async (type: 'questions' | 'simulados', increment: number = 1) => {
    if (!user || !usageLimits) return;

    const field = type === 'questions' ? 'daily_questions_used' : 'monthly_simulados_used';
    const newValue = usageLimits[field] + increment;

    try {
      const { data, error } = await supabase
        .from('usage_limits')
        .update({ [field]: newValue })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setUsageLimits(data);
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };

  const canUseFeature = (feature: 'questions' | 'simulados'): boolean => {
    if (subscriptionData.subscribed) return true;
    if (!usageLimits) return false;

    if (feature === 'questions') {
      return usageLimits.daily_questions_used < 10; // Free limit: 10 questions per day
    } else {
      return usageLimits.monthly_simulados_used < 1; // Free limit: 1 simulado per month
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
    isFreePlan: !subscriptionData.subscribed,
    isPremium: subscriptionData.subscribed && subscriptionData.subscription_tier !== 'Basic',
  };
}
