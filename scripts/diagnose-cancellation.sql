-- =====================================================
-- DIAGNÓSTICO COMPLETO - SISTEMA DE CANCELAMENTO
-- =====================================================

-- 1. VERIFICAR DADOS DO USUÁRIO PROBLEMÁTICO
-- =====================================================
SELECT
    'DADOS DO USUÁRIO' as section,
    email,
    subscribed,
    subscription_tier,
    stripe_customer_id,
    created_at,
    updated_at
FROM subscribers
WHERE email = 'oabquestion@gmail.com';

-- 2. VERIFICAR HISTÓRICO DE ASSINATURA
-- =====================================================
SELECT
    'HISTÓRICO DE ASSINATURA' as section,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    created_at
FROM subscription_history
WHERE email = 'oabquestion@gmail.com'
ORDER BY created_at DESC
LIMIT 10;

-- 3. VERIFICAR LIMITES DE USO
-- =====================================================
SELECT
    'LIMITES DE USO' as section,
    user_id,
    email,
    questions_answered,
    questions_limit,
    reset_date,
    created_at
FROM usage_limits
WHERE email = 'oabquestion@gmail.com'
ORDER BY created_at DESC
LIMIT 5;

-- 4. VERIFICAR ESTRUTURA DAS TABELAS
-- =====================================================
SELECT
    'ESTRUTURA TABELA SUBSCRIBERS' as section,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'subscribers'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. VERIFICAR POLÍTICAS RLS
-- =====================================================
SELECT
    'POLÍTICAS RLS SUBSCRIBERS' as section,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'subscribers';

-- 6. VERIFICAR SEQUÊNCIAS E CONSTRAINTS
-- =====================================================
SELECT
    'CONSTRAINTS SUBSCRIBERS' as section,
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.subscribers'::regclass;

-- 7. VERIFICAR ÍNDICES
-- =====================================================
SELECT
    'ÍNDICES SUBSCRIBERS' as section,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'subscribers';

-- 8. VERIFICAR ESTATÍSTICAS DE USO
-- =====================================================
SELECT
    'ESTATÍSTICAS GERAIS' as section,
    COUNT(*) as total_subscribers,
    COUNT(CASE WHEN subscribed = true THEN 1 END) as active_subscribers,
    COUNT(CASE WHEN stripe_customer_id IS NOT NULL THEN 1 END) as with_stripe_id,
    COUNT(CASE WHEN stripe_customer_id IS NULL THEN 1 END) as without_stripe_id
FROM subscribers;

-- 9. VERIFICAR DADOS INCONSISTENTES
-- =====================================================
SELECT
    'DADOS INCONSISTENTES' as section,
    email,
    subscribed,
    stripe_customer_id,
    CASE
        WHEN subscribed = true AND stripe_customer_id IS NULL THEN 'ASSINADO SEM STRIPE ID'
        WHEN subscribed = false AND stripe_customer_id IS NOT NULL THEN 'NÃO ASSINADO COM STRIPE ID'
        WHEN stripe_customer_id = '' THEN 'STRIPE ID VAZIO'
        ELSE 'OK'
    END as inconsistency_type
FROM subscribers
WHERE (subscribed = true AND stripe_customer_id IS NULL)
   OR (subscribed = false AND stripe_customer_id IS NOT NULL)
   OR (stripe_customer_id = '')
LIMIT 10;

-- 10. VERIFICAR ÚLTIMAS ATUALIZAÇÕES
-- =====================================================
SELECT
    'ÚLTIMAS ATUALIZAÇÕES' as section,
    email,
    updated_at,
    EXTRACT(EPOCH FROM (NOW() - updated_at))/3600 as hours_since_update
FROM subscribers
WHERE updated_at IS NOT NULL
ORDER BY updated_at DESC
LIMIT 10; 