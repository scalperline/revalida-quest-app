-- SCRIPT SIMPLES PARA TESTE DE ASSINATURA
-- Execute este script no Supabase SQL Editor

-- 1. Verificar estado atual
SELECT 'ESTADO ATUAL' as status, email, subscribed, subscription_tier, subscription_end
FROM subscribers 
WHERE email = 'scalperline@gmail.com';

-- 2. Inserir dados de teste Premium
INSERT INTO subscribers (
    email, stripe_customer_id, subscribed, subscription_tier, subscription_end, updated_at
) VALUES (
    'scalperline@gmail.com', 'cus_test_001', true, 'Premium', (NOW() + INTERVAL '30 days'), NOW()
) ON CONFLICT (email) DO UPDATE SET
    stripe_customer_id = EXCLUDED.stripe_customer_id,
    subscribed = EXCLUDED.subscribed,
    subscription_tier = EXCLUDED.subscription_tier,
    subscription_end = EXCLUDED.subscription_end,
    updated_at = EXCLUDED.updated_at;

-- 3. Inserir histórico
INSERT INTO subscription_history (
    user_id, email, event_type, subscription_tier, stripe_subscription_id, details, created_at
) VALUES (
    NULL, 'scalperline@gmail.com', 'created', 'Premium', 'sub_test_001',
    jsonb_build_object('status', 'active', 'priceId', 'revalida-premium'),
    NOW()
);

-- 4. Configurar limites ilimitados
INSERT INTO usage_limits (
    user_id, email, questions_answered, questions_limit, daily_questions_used, 
    monthly_simulados_used, reset_date, last_reset_date, updated_at
) VALUES (
    NULL, 'scalperline@gmail.com', 0, 9999, 0, 0, CURRENT_DATE, CURRENT_DATE, NOW()
) ON CONFLICT (email) DO UPDATE SET
    questions_limit = EXCLUDED.questions_limit,
    updated_at = EXCLUDED.updated_at;

-- 5. Verificar resultado
SELECT 'RESULTADO' as status, s.email, s.subscribed, s.subscription_tier, ul.questions_limit
FROM subscribers s
LEFT JOIN usage_limits ul ON s.email = ul.email
WHERE s.email = 'scalperline@gmail.com'; 