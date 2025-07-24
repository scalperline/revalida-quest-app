-- 🚀 SCRIPT DE PREPARAÇÃO - TESTE DO SISTEMA DE ASSINATURA
-- Execute este script no Supabase SQL Editor para preparar dados de teste

-- =====================================================
-- FASE 1: LIMPEZA E PREPARAÇÃO
-- =====================================================

-- 1.1 Verificar estado atual dos dados
SELECT 
    'ESTADO ATUAL' as status,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 1.2 Limpar dados existentes (OPCIONAL - descomente se quiser começar do zero)
-- DELETE FROM subscription_history WHERE email = 'scalperline@gmail.com';
-- DELETE FROM subscribers WHERE email = 'scalperline@gmail.com';
-- DELETE FROM usage_limits WHERE email = 'scalperline@gmail.com';

-- =====================================================
-- FASE 2: INSERIR DADOS DE TESTE - PLANO PREMIUM
-- =====================================================

-- 2.1 Inserir/Atualizar dados do assinante Premium
INSERT INTO subscribers (
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
) VALUES (
    'scalperline@gmail.com',
    'cus_ShrB4v0DLU7t1z',
    true,
    'Premium',
    (NOW() + INTERVAL '30 days'),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    stripe_customer_id = EXCLUDED.stripe_customer_id,
    subscribed = EXCLUDED.subscribed,
    subscription_tier = EXCLUDED.subscription_tier,
    subscription_end = EXCLUDED.subscription_end,
    updated_at = EXCLUDED.updated_at;

-- 2.2 Inserir histórico de assinatura
INSERT INTO subscription_history (
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at
) VALUES (
    NULL,
    'scalperline@gmail.com',
    'created',
    'Premium',
    'sub_test_premium_001',
    jsonb_build_object(
        'status', 'active',
        'priceId', 'revalida-premium',
        'subscriptionEnd', (NOW() + INTERVAL '30 days')::text
    ),
    NOW()
);

-- 2.3 Configurar limites de uso para Premium (ilimitado)
INSERT INTO usage_limits (
    user_id,
    email,
    questions_answered,
    questions_limit,
    daily_questions_used,
    monthly_simulados_used,
    reset_date,
    last_reset_date,
    updated_at
) VALUES (
    NULL,
    'scalperline@gmail.com',
    0,
    9999,
    0,
    0,
    CURRENT_DATE,
    CURRENT_DATE,
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    questions_limit = EXCLUDED.questions_limit,
    daily_questions_used = EXCLUDED.daily_questions_used,
    monthly_simulados_used = EXCLUDED.monthly_simulados_used,
    reset_date = EXCLUDED.reset_date,
    last_reset_date = EXCLUDED.last_reset_date,
    updated_at = EXCLUDED.updated_at;

-- =====================================================
-- FASE 3: VERIFICAÇÃO DOS DADOS INSERIDOS
-- =====================================================

-- 3.1 Verificar dados do assinante
SELECT 
    'ASSINANTE' as tabela,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end::text,
    updated_at::text
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 3.2 Verificar histórico de assinatura
SELECT 
    'HISTORICO' as tabela,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at::text
FROM subscription_history
WHERE email = 'scalperline@gmail.com'
ORDER BY created_at DESC
LIMIT 3;

-- 3.3 Verificar limites de uso
SELECT 
    'LIMITES' as tabela,
    email,
    questions_answered,
    questions_limit,
    daily_questions_used,
    monthly_simulados_used,
    reset_date::text,
    last_reset_date::text,
    updated_at::text
FROM usage_limits
WHERE email = 'scalperline@gmail.com';

-- =====================================================
-- FASE 4: TESTE DE DIFERENTES PLANOS (OPCIONAL)
-- =====================================================

-- 4.1 Para testar plano Basic, execute:
/*
UPDATE subscribers 
SET subscription_tier = 'Basic', updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

UPDATE usage_limits 
SET questions_limit = 100, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
*/

-- 4.2 Para testar plano Pro, execute:
/*
UPDATE subscribers 
SET subscription_tier = 'Pro', updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

UPDATE usage_limits 
SET questions_limit = 9999, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
*/

-- 4.3 Para testar plano Enterprise, execute:
/*
UPDATE subscribers 
SET subscription_tier = 'Enterprise', updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

UPDATE usage_limits 
SET questions_limit = 9999, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
*/

-- 4.4 Para testar usuário gratuito, execute:
/*
UPDATE subscribers 
SET subscribed = false, subscription_tier = NULL, subscription_end = NULL, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

UPDATE usage_limits 
SET questions_limit = 10, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
*/

-- =====================================================
-- FASE 5: VERIFICAÇÃO FINAL
-- =====================================================

-- 5.1 Resumo completo dos dados
SELECT 
    'RESUMO FINAL' as status,
    s.email,
    s.subscribed,
    s.subscription_tier,
    s.subscription_end::text,
    ul.questions_limit,
    ul.daily_questions_used,
    ul.monthly_simulados_used,
    CASE 
        WHEN s.subscribed AND s.subscription_tier IN ('Premium', 'Pro', 'Enterprise') THEN 'ILIMITADO'
        WHEN s.subscribed AND s.subscription_tier = 'Basic' THEN 'LIMITADO (100)'
        ELSE 'GRATUITO (10)'
    END as acesso_questoes,
    CASE 
        WHEN s.subscribed AND s.subscription_tier IN ('Premium', 'Pro', 'Enterprise') THEN 'ILIMITADO'
        WHEN s.subscribed AND s.subscription_tier = 'Basic' THEN 'LIMITADO (10)'
        ELSE 'LIMITADO (1)'
    END as acesso_simulados
FROM subscribers s
LEFT JOIN usage_limits ul ON s.email = ul.email
WHERE s.email = 'scalperline@gmail.com';

-- 5.2 Verificar se há problemas de integridade
SELECT 
    'VERIFICACAO DE INTEGRIDADE' as status,
    CASE 
        WHEN s.email IS NULL THEN 'ERRO: Email não encontrado em subscribers'
        WHEN ul.email IS NULL THEN 'ERRO: Email não encontrado em usage_limits'
        WHEN s.stripe_customer_id IS NULL OR s.stripe_customer_id = '' THEN 'ATENCAO: Customer ID vazio'
        WHEN s.subscription_tier IS NULL AND s.subscribed = true THEN 'ERRO: Assinado mas sem tier'
        WHEN s.subscription_tier IS NOT NULL AND s.subscribed = false THEN 'ATENCAO: Tier definido mas não assinado'
        ELSE 'OK - Dados consistentes'
    END as status_integridade
FROM subscribers s
FULL OUTER JOIN usage_limits ul ON s.email = ul.email
WHERE s.email = 'scalperline@gmail.com' OR ul.email = 'scalperline@gmail.com';

-- =====================================================
-- FASE 6: COMANDOS PARA TESTE NO FRONTEND
-- =====================================================

/*
Após executar este script, teste no frontend:

1. Faça login com scalperline@gmail.com
2. Abra o console do navegador
3. Execute os comandos:

// Verificar status da assinatura
const { subscribed, subscription_tier, loading } = useSubscription();
console.log('Status:', { subscribed, subscription_tier, loading });

// Verificar se pode usar features
const { canUseFeature, getFeatureLimit } = useSubscription();
console.log('Pode usar questões:', canUseFeature('questions'));
console.log('Pode usar simulados:', canUseFeature('simulados'));
console.log('Limite questões:', getFeatureLimit('questions'));
console.log('Limite simulados:', getFeatureLimit('simulados'));

// Verificar se é plano Premium
const { isPremiumPlan } = useSubscription();
console.log('É plano Premium:', isPremiumPlan);

4. Verifique se os componentes mostram:
   - SubscriptionBadge: "Premium"
   - SubscriptionStatusCard: Plano Premium ativo
   - UsageLimitsCard: Limites ilimitados
   - UsageMonitor: Status "healthy"
*/ 