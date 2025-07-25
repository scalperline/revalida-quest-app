-- =====================================================
-- TESTE COMPLETO - FLUXO DE CANCELAMENTO
-- =====================================================

-- 1. VERIFICAR ESTADO ATUAL DO USUÁRIO
-- =====================================================
SELECT
    'ESTADO ATUAL' as test_step,
    email,
    subscribed,
    subscription_tier,
    stripe_customer_id,
    CASE
        WHEN stripe_customer_id IS NOT NULL AND stripe_customer_id != '' THEN 'OK'
        ELSE 'PROBLEMA: Customer ID ausente'
    END as customer_id_status
FROM subscribers
WHERE email = 'oabquestion@gmail.com';

-- 2. SIMULAR CANCELAMENTO (SEM ALTERAR DADOS)
-- =====================================================
SELECT
    'SIMULAÇÃO CANCELAMENTO' as test_step,
    'Dados que seriam atualizados:' as info,
    email,
    'subscribed: true → false' as change_1,
    'subscription_tier: Premium → Free' as change_2,
    'updated_at: NOW()' as change_3
FROM subscribers
WHERE email = 'oabquestion@gmail.com';

-- 3. VERIFICAR HISTÓRICO RECENTE
-- =====================================================
SELECT
    'HISTÓRICO RECENTE' as test_step,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    created_at,
    EXTRACT(EPOCH FROM (NOW() - created_at))/3600 as hours_ago
FROM subscription_history
WHERE email = 'oabquestion@gmail.com'
ORDER BY created_at DESC
LIMIT 5;

-- 4. VERIFICAR LIMITES DE USO ATUAIS
-- =====================================================
SELECT
    'LIMITES DE USO' as test_step,
    questions_answered,
    questions_limit,
    reset_date,
    CASE
        WHEN questions_answered >= questions_limit THEN 'LIMITE ATINGIDO'
        ELSE 'DENTRO DO LIMITE'
    END as limit_status
FROM usage_limits
WHERE email = 'oabquestion@gmail.com'
ORDER BY created_at DESC
LIMIT 1;

-- 5. VERIFICAR INTEGRIDADE DOS DADOS
-- =====================================================
SELECT
    'INTEGRIDADE DOS DADOS' as test_step,
    COUNT(*) as total_subscribers,
    COUNT(CASE WHEN subscribed = true THEN 1 END) as active_subscribers,
    COUNT(CASE WHEN stripe_customer_id IS NOT NULL AND stripe_customer_id != '' THEN 1 END) as with_valid_customer_id,
    COUNT(CASE WHEN subscribed = true AND (stripe_customer_id IS NULL OR stripe_customer_id = '') THEN 1 END) as inconsistent_data
FROM subscribers;

-- 6. VERIFICAR POLÍTICAS DE SEGURANÇA
-- =====================================================
SELECT
    'POLÍTICAS RLS' as test_step,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'subscribers'
ORDER BY policyname;

-- 7. TESTE DE CONECTIVIDADE (SIMULAÇÃO)
-- =====================================================
SELECT
    'TESTE DE CONECTIVIDADE' as test_step,
    'Stripe API' as service,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM subscribers
            WHERE email = 'oabquestion@gmail.com'
            AND stripe_customer_id IS NOT NULL
            AND stripe_customer_id != ''
        ) THEN 'CUSTOMER ID PRESENTE'
        ELSE 'CUSTOMER ID AUSENTE'
    END as stripe_status,
    'Supabase' as service_2,
    'CONECTADO' as supabase_status;

-- 8. RECOMENDAÇÕES DE AÇÃO
-- =====================================================
SELECT
    'RECOMENDAÇÕES' as test_step,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM subscribers
            WHERE email = 'oabquestion@gmail.com'
            AND subscribed = true
        ) THEN 'USUÁRIO ASSINADO - PODE CANCELAR'
        ELSE 'USUÁRIO NÃO ASSINADO - NADA A CANCELAR'
    END as recommendation_1,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM subscribers
            WHERE email = 'oabquestion@gmail.com'
            AND stripe_customer_id IS NOT NULL
            AND stripe_customer_id != ''
        ) THEN 'CUSTOMER ID VÁLIDO - PORTAL FUNCIONARÁ'
        ELSE 'CUSTOMER ID AUSENTE - VERIFICAR SINCRONIZAÇÃO'
    END as recommendation_2,
    'EXECUTAR FUNÇÃO DIAGNOSE-STRIPE PARA VERIFICAÇÃO COMPLETA' as recommendation_3; 