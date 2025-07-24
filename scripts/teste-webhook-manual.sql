-- 🚀 SCRIPT DE TESTE MANUAL DO WEBHOOK
-- Execute este script para simular eventos do Stripe e testar o webhook

-- =====================================================
-- FASE 1: PREPARAÇÃO - VERIFICAR ESTADO ATUAL
-- =====================================================

-- 1.1 Verificar dados atuais
SELECT 
    'DADOS ATUAIS' as status,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end::text,
    updated_at::text
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 1.2 Verificar histórico atual
SELECT 
    'HISTÓRICO ATUAL' as status,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    created_at::text
FROM subscription_history
WHERE email = 'scalperline@gmail.com'
ORDER BY created_at DESC
LIMIT 5;

-- =====================================================
-- FASE 2: SIMULAR EVENTO DE CRIAÇÃO DE ASSINATURA
-- =====================================================

-- 2.1 Simular evento customer.subscription.created
-- Este comando simula o que o webhook faria ao receber um evento do Stripe

-- Primeiro, vamos simular o processamento do webhook manualmente
-- (Isso é o que aconteceria quando o webhook recebe um evento)

-- Simular criação de assinatura Premium
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

-- Registrar evento no histórico (simulando webhook)
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
    'sub_webhook_test_001',
    '{"status": "active", "priceId": "revalida-premium", "subscriptionEnd": "' || (NOW() + INTERVAL '30 days')::text || '", "webhookEvent": "customer.subscription.created"}',
    NOW()
);

-- Atualizar limites de uso
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
    9999, -- Ilimitado para Premium
    0,
    0,
    CURRENT_DATE,
    CURRENT_DATE,
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    questions_limit = EXCLUDED.questions_limit,
    updated_at = EXCLUDED.updated_at;

-- =====================================================
-- FASE 3: SIMULAR EVENTO DE ATUALIZAÇÃO DE ASSINATURA
-- =====================================================

-- 3.1 Simular mudança de plano (Premium -> Pro)
UPDATE subscribers 
SET subscription_tier = 'Pro', updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

-- Registrar evento de atualização
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
    'renewed',
    'Pro',
    'sub_webhook_test_002',
    '{"status": "active", "priceId": "revalida-pro", "subscriptionEnd": "' || (NOW() + INTERVAL '30 days')::text || '", "webhookEvent": "customer.subscription.updated"}',
    NOW()
);

-- =====================================================
-- FASE 4: SIMULAR EVENTO DE CANCELAMENTO
-- =====================================================

-- 4.1 Simular cancelamento de assinatura
UPDATE subscribers 
SET subscribed = false, subscription_tier = NULL, subscription_end = NULL, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

-- Registrar evento de cancelamento
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
    'cancelled',
    NULL,
    'sub_webhook_test_003',
    '{"status": "cancelled", "webhookEvent": "customer.subscription.deleted"}',
    NOW()
);

-- Atualizar limites para usuário gratuito
UPDATE usage_limits 
SET questions_limit = 10, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

-- =====================================================
-- FASE 5: SIMULAR EVENTO DE CHECKOUT COMPLETADO
-- =====================================================

-- 5.1 Simular nova assinatura via checkout
UPDATE subscribers 
SET subscribed = true, subscription_tier = 'Basic', subscription_end = (NOW() + INTERVAL '30 days'), updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

-- Registrar evento de checkout
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
    'checkout_completed',
    'Basic',
    'sub_webhook_test_004',
    '{"status": "checkout_completed", "webhookEvent": "checkout.session.completed"}',
    NOW()
);

-- Atualizar limites para Basic
UPDATE usage_limits 
SET questions_limit = 100, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

-- =====================================================
-- FASE 6: VERIFICAÇÃO DOS EVENTOS PROCESSADOS
-- =====================================================

-- 6.1 Verificar histórico completo de eventos
SELECT 
    'HISTÓRICO COMPLETO' as status,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at::text
FROM subscription_history
WHERE email = 'scalperline@gmail.com'
ORDER BY created_at DESC;

-- 6.2 Verificar estado final
SELECT 
    'ESTADO FINAL' as status,
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
    END as acesso_questoes
FROM subscribers s
LEFT JOIN usage_limits ul ON s.email = ul.email
WHERE s.email = 'scalperline@gmail.com';

-- =====================================================
-- FASE 7: TESTE DE DIFERENTES CENÁRIOS
-- =====================================================

-- 7.1 Cenário: Usuário Premium com uso alto
/*
UPDATE usage_limits 
SET daily_questions_used = 50, monthly_simulados_used = 5, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

UPDATE subscribers 
SET subscription_tier = 'Premium', subscribed = true, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
*/

-- 7.2 Cenário: Usuário Basic no limite
/*
UPDATE usage_limits 
SET daily_questions_used = 10, monthly_simulados_used = 10, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

UPDATE subscribers 
SET subscription_tier = 'Basic', subscribed = true, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
*/

-- 7.3 Cenário: Usuário gratuito no limite
/*
UPDATE usage_limits 
SET daily_questions_used = 10, monthly_simulados_used = 1, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

UPDATE subscribers 
SET subscribed = false, subscription_tier = NULL, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
*/

-- =====================================================
-- FASE 8: COMANDOS PARA TESTE NO FRONTEND
-- =====================================================

/*
Após executar este script, teste no frontend:

1. Faça login com scalperline@gmail.com
2. Abra o console do navegador
3. Execute os comandos:

// Verificar se o hook detecta mudanças
const { checkSubscription } = useSubscription();
await checkSubscription();

// Verificar status atual
const { subscribed, subscription_tier, canUseFeature } = useSubscription();
console.log('Status atual:', { subscribed, subscription_tier });
console.log('Pode usar questões:', canUseFeature('questions'));
console.log('Pode usar simulados:', canUseFeature('simulados'));

// Verificar se componentes atualizaram
// - SubscriptionBadge deve mostrar o tier correto
// - UsageLimitsCard deve mostrar limites corretos
// - SubscriptionStatusCard deve mostrar status correto

4. Teste diferentes cenários:
   - Usuário Premium: acesso ilimitado
   - Usuário Basic: limites específicos
   - Usuário gratuito: limites restritivos
*/ 