-- 🚀 SCRIPT DE TESTE - SISTEMA DE ASSINATURA
-- Execute este script no SQL Editor do Supabase Dashboard APÓS executar os scripts de correção

-- =====================================================
-- FASE 3: TESTE E VALIDAÇÃO
-- =====================================================

-- 3.1 TESTE DE INSERÇÃO MANUAL
-- =====================================================

-- Testar inserção na tabela subscribers (simulando webhook)
INSERT INTO public.subscribers (
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

-- Testar inserção na tabela subscription_history
INSERT INTO public.subscription_history (
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at
) VALUES (
    NULL, -- user_id será NULL se não encontrado
    'scalperline@gmail.com',
    'created',
    'Premium',
    'sub_1RmRT7DQW6oxXGkUaihZ79Gh',
    '{"status": "active", "priceId": "revalida-premium", "subscriptionEnd": "' || (NOW() + INTERVAL '30 days')::text || '"}',
    NOW()
);

-- Testar inserção na tabela usage_limits
INSERT INTO public.usage_limits (
    user_id,
    email,
    questions_answered,
    questions_limit,
    reset_date,
    updated_at
) VALUES (
    NULL, -- user_id será NULL se não encontrado
    'scalperline@gmail.com',
    0,
    1000, -- Limite maior para Premium
    CURRENT_DATE,
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    questions_limit = EXCLUDED.questions_limit,
    updated_at = EXCLUDED.updated_at;

-- =====================================================
-- 3.2 VERIFICAÇÃO DOS TESTES
-- =====================================================

-- Verificar se as inserções funcionaram
SELECT '=== TESTE DE INSERÇÃO ===' as status;

-- Verificar subscribers
SELECT 
    'subscribers' as tabela,
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
FROM public.subscribers 
WHERE email = 'scalperline@gmail.com';

-- Verificar subscription_history
SELECT 
    'subscription_history' as tabela,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at
FROM public.subscription_history 
WHERE email = 'scalperline@gmail.com'
ORDER BY created_at DESC;

-- Verificar usage_limits
SELECT 
    'usage_limits' as tabela,
    email,
    questions_answered,
    questions_limit,
    reset_date,
    updated_at
FROM public.usage_limits 
WHERE email = 'scalperline@gmail.com';

-- =====================================================
-- 3.3 TESTE DE ATUALIZAÇÃO
-- =====================================================

-- Testar atualização de dados
UPDATE public.subscribers 
SET 
    questions_answered = 5,
    updated_at = NOW()
WHERE email = 'scalperline@gmail.com';

-- Verificar se a atualização funcionou
SELECT 
    'Atualização subscribers' as teste,
    email,
    subscribed,
    subscription_tier,
    updated_at
FROM public.subscribers 
WHERE email = 'scalperline@gmail.com';

-- =====================================================
-- 3.4 TESTE DE CONSULTA (SIMULANDO FRONTEND)
-- =====================================================

-- Simular consulta que o frontend faria
SELECT 
    'Consulta Frontend' as tipo,
    s.email,
    s.subscribed,
    s.subscription_tier,
    s.subscription_end,
    ul.questions_answered,
    ul.questions_limit,
    ul.reset_date
FROM public.subscribers s
LEFT JOIN public.usage_limits ul ON s.email = ul.email
WHERE s.email = 'scalperline@gmail.com';

-- =====================================================
-- 3.5 LIMPEZA DOS TESTES
-- =====================================================

-- ATENÇÃO: Descomente apenas se quiser limpar os dados de teste
/*
-- Limpar dados de teste
DELETE FROM public.subscription_history WHERE email = 'scalperline@gmail.com' AND event_type = 'created';
DELETE FROM public.usage_limits WHERE email = 'scalperline@gmail.com';
DELETE FROM public.subscribers WHERE email = 'scalperline@gmail.com';

-- Verificar se foi limpo
SELECT '=== APÓS LIMPEZA ===' as status;
SELECT COUNT(*) as total_subscribers FROM public.subscribers WHERE email = 'scalperline@gmail.com';
SELECT COUNT(*) as total_history FROM public.subscription_history WHERE email = 'scalperline@gmail.com';
SELECT COUNT(*) as total_usage FROM public.usage_limits WHERE email = 'scalperline@gmail.com';
*/

-- =====================================================
-- RESULTADO FINAL
-- =====================================================

SELECT '=== TESTES CONCLUÍDOS ===' as status;

-- Verificar se tudo está funcionando
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.subscribers WHERE email = 'scalperline@gmail.com') 
        THEN '✅ Inserção subscribers: OK'
        ELSE '❌ Inserção subscribers: FALHOU'
    END as teste_subscribers;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.subscription_history WHERE email = 'scalperline@gmail.com') 
        THEN '✅ Inserção history: OK'
        ELSE '❌ Inserção history: FALHOU'
    END as teste_history;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.usage_limits WHERE email = 'scalperline@gmail.com') 
        THEN '✅ Inserção usage_limits: OK'
        ELSE '❌ Inserção usage_limits: FALHOU'
    END as teste_usage_limits;

SELECT 
    'Próximo passo: Testar webhook real e validar frontend' as acao; 