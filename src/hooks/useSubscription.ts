
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
      console.log('=== FETCHANDO LIMITES DE USO ===');
      console.log('User ID:', user.id);
      
      // Primeiro, limpar registros duplicados para este usuário
      const { data: allRecords, error: selectError } = await supabase
        .from('usage_limits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (selectError) {
        console.error('Erro ao buscar registros:', selectError);
        return;
      }

      console.log('Registros encontrados:', allRecords?.length || 0);

      if (allRecords && allRecords.length > 1) {
        // Manter apenas o mais recente, deletar os outros
        const mostRecent = allRecords[0];
        const toDelete = allRecords.slice(1);
        
        console.log('Limpando', toDelete.length, 'registros duplicados');
        
        for (const record of toDelete) {
          await supabase
            .from('usage_limits')
            .delete()
            .eq('id', record.id);
        }
        setUsageLimits({
          ...mostRecent,
          monthly_simulados_used: mostRecent['monthly_simulados_used'] ?? 0
        } as UsageLimits);
        console.log('Limite definido (após limpeza):', mostRecent);
        return;
      }

      if (allRecords && allRecords.length === 1) {
        setUsageLimits({
          ...allRecords[0],
          monthly_simulados_used: allRecords[0]['monthly_simulados_used'] ?? 0
        } as UsageLimits);
        console.log('Limite definido (único registro):', allRecords[0]);
        return;
      }

      // Se não há registros, criar um novo
      console.log('Criando novo registro de limites');
      const { data: newRecord, error: createError } = await supabase
        .from('usage_limits')
        .insert({
          user_id: user.id,
          daily_questions_used: 0,
          monthly_simulados_used: 0,
          last_reset_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (createError) {
        console.error('Erro ao criar registro:', createError);
        return;
      }

      console.log('Novo registro criado:', newRecord);
      setUsageLimits({
        ...newRecord,
        monthly_simulados_used: newRecord['monthly_simulados_used'] ?? 0
      } as UsageLimits);
      
    } catch (error) {
      console.error('Erro geral em fetchUsageLimits:', error);
    }
  }, [user]);

  const updateUsage = async (type: 'questions' | 'simulados', increment: number = 1) => {
    if (!user) {
      console.log('❌ Não pode atualizar: usuário não logado');
      return;
    }

    try {
      console.log('=== ATUALIZANDO CONTADORES ===');
      console.log('Tipo:', type, 'Incremento:', increment);
      
      // Buscar registro atual
      const { data: currentRecord, error: fetchError } = await supabase
        .from('usage_limits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error('Erro ao buscar registro atual:', fetchError);
        return;
      }

      console.log('Registro atual encontrado:', currentRecord);

      // Se não existe, criar
      if (!currentRecord) {
        console.log('Criando primeiro registro de uso');
        const newData = {
          user_id: user.id,
          daily_questions_used: type === 'questions' ? increment : 0,
          monthly_simulados_used: type === 'simulados' ? increment : 0,
          last_reset_date: new Date().toISOString().split('T')[0]
        };

        const { data: created, error: createError } = await supabase
          .from('usage_limits')
          .insert(newData)
          .select()
          .single();

        if (createError) {
          console.error('Erro ao criar registro:', createError);
          return;
        }

        console.log('✅ Primeiro registro criado:', created);
        setUsageLimits({
          ...created,
          monthly_simulados_used: created['monthly_simulados_used'] ?? 0
        } as UsageLimits);
        return;
      }

      // Atualizar registro existente
      const newQuestions = type === 'questions' 
        ? (currentRecord.daily_questions_used || 0) + increment 
        : (currentRecord.daily_questions_used || 0);
      
      const newSimulados = type === 'simulados' 
        ? (currentRecord.monthly_simulados_used || 0) + increment 
        : (currentRecord.monthly_simulados_used || 0);

      console.log('Valores antes da atualização:');
      console.log('- Questions:', currentRecord.daily_questions_used, '→', newQuestions);
      console.log('- Simulados:', currentRecord.monthly_simulados_used, '→', newSimulados);

      const { data: updated, error: updateError } = await supabase
        .from('usage_limits')
        .update({
          daily_questions_used: newQuestions,
          monthly_simulados_used: newSimulados,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentRecord.id)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Erro ao atualizar registro:', updateError);
        return;
      }

      console.log('✅ Registro atualizado com sucesso:', updated);
      setUsageLimits({
        ...updated,
        monthly_simulados_used: updated['monthly_simulados_used'] ?? 0
      } as UsageLimits);
      
    } catch (error) {
      console.error('❌ Erro geral em updateUsage:', error);
    }
  };

  const canUseFeature = (feature: 'questions' | 'simulados'): boolean => {
    console.log('=== VERIFICANDO SE PODE USAR FEATURE ===');
    console.log('Feature:', feature);
    console.log('Subscribed:', subscriptionData.subscribed);
    console.log('Usage Limits:', usageLimits);

    if (subscriptionData.subscribed) {
      console.log('✅ Usuário assinante - permitido');
      return true;
    }
    
    if (!usageLimits) {
      console.log('❌ Sem limites de uso - negado');
      return false;
    }

    if (feature === 'questions') {
      const used = usageLimits.daily_questions_used || 0;
      const canUse = used < 10;
      console.log(`Questions: ${used}/10 - ${canUse ? 'PERMITIDO' : 'BLOQUEADO'}`);
      return canUse;
    } else {
      const used = usageLimits.monthly_simulados_used || 0;
      const canUse = used < 1;
      console.log(`Simulados: ${used}/1 - ${canUse ? 'PERMITIDO' : 'BLOQUEADO'}`);
      return canUse;
    }
  };

  const getFeatureLimit = (feature: 'questions' | 'simulados' | 'missions'): { used: number; limit: number; unlimited: boolean } => {
    if (!usageLimits) return { used: 0, limit: 0, unlimited: false };

    const unlimited = subscriptionData.subscribed && (subscriptionData.subscription_tier === 'Premium' || subscriptionData.subscription_tier === 'Pro');
    let limit = 3;
    if (subscriptionData.subscribed) {
      switch (subscriptionData.subscription_tier) {
        case 'Basic':
          limit = 10;
          break;
        case 'Premium':
        case 'Pro':
          limit = 9999; // Considerado ilimitado
          break;
      }
    }

    if (feature === 'questions') {
      return {
        used: usageLimits.daily_questions_used || 0,
        limit: 10, // Mantém padrão para questões
        unlimited: unlimited
      };
    } else if (feature === 'simulados') {
      return {
        used: usageLimits.monthly_simulados_used || 0,
        limit,
        unlimited
      };
    } else if (feature === 'missions') {
      // Para missões, cada missão terá seu próprio contador, mas o limite é o mesmo por missão
      return {
        used: 0, // O controle por missão será feito no componente/hook de missão
        limit,
        unlimited
      };
    }
    return { used: 0, limit: 0, unlimited: false };
  };

  useEffect(() => {
    checkSubscription();
    fetchUsageLimits();
  }, [checkSubscription, fetchUsageLimits]);

  // Resetar contadores locais de missões e simulados personalizados ao renovar plano
  useEffect(() => {
    if (!usageLimits) return;
    const lastReset = localStorage.getItem('last-usage-reset');
    if (lastReset !== usageLimits.last_reset_date) {
      // Resetar tentativas de simulados personalizados
      localStorage.setItem('simulado-personalizado-attempts', '0');
      // Resetar tentativas de todas as missões
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('mission-attempts-')) {
          localStorage.setItem(key, '0');
        }
      });
      localStorage.setItem('last-usage-reset', usageLimits.last_reset_date);
    }
  }, [usageLimits]);

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
