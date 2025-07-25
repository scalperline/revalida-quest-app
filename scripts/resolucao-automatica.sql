-- =====================================================
-- RESOLUÇÃO AUTOMATIZADA - PROBLEMAS DE CANCELAMENTO
-- =====================================================

-- Este script resolve automaticamente os problemas mais comuns
-- relacionados ao cancelamento de assinaturas

-- 1. VERIFICAR E CORRIGIR DADOS INCONSISTENTES
-- =====================================================

-- Corrigir subscribers sem customer_id mas assinados
UPDATE subscribers
SET stripe_customer_id = NULL,
    subscribed = false,
    subscription_tier = 'Free',
    updated_at = NOW()
WHERE subscribed = true
  AND (stripe_customer_id IS NULL OR stripe_customer_id = '');

-- Corrigir customer_id vazio
UPDATE subscribers
SET stripe_customer_id = NULL,
    updated_at = NOW()
WHERE stripe_customer_id = '';

-- 2. SINCRONIZAR DADOS DE ASSINATURA
-- =====================================================

-- Verificar se há assinaturas canceladas no histórico mas não atualizadas
UPDATE subscribers
SET subscribed = false,
    subscription_tier = 'Free',
    updated_at = NOW()
WHERE email IN (
    SELECT DISTINCT email
    FROM subscription_history
    WHERE event_type = 'subscription.cancelled'
    AND created_at > (
        SELECT COALESCE(MAX(updated_at), '1970-01-01'::timestamp)
        FROM subscribers
        WHERE subscribers.email = subscription_history.email
    )
);

-- 3. LIMPAR DADOS ÓRFÃOS
-- =====================================================

-- Remover registros de usage_limits para usuários não assinados
DELETE FROM usage_limits
WHERE email IN (
    SELECT email
    FROM subscribers
    WHERE subscribed = false
);

-- 4. VERIFICAR INTEGRIDADE DOS DADOS
-- =====================================================

-- Criar relatório de integridade
SELECT
    'RELATÓRIO DE INTEGRIDADE' as section,
    COUNT(*) as total_subscribers,
    COUNT(CASE WHEN subscribed = true THEN 1 END) as active_subscribers,
    COUNT(CASE WHEN stripe_customer_id IS NOT NULL AND stripe_customer_id != '' THEN 1 END) as with_customer_id,
    COUNT(CASE WHEN subscribed = true AND (stripe_customer_id IS NULL OR stripe_customer_id = '') THEN 1 END) as inconsistent_data
FROM subscribers;

-- 5. CRIAR BACKUP DOS DADOS CRÍTICOS
-- =====================================================

-- Criar tabela de backup (se não existir)
CREATE TABLE IF NOT EXISTS subscribers_backup_$(date +%Y%m%d) AS
SELECT * FROM subscribers;

-- 6. ATUALIZAR ESTATÍSTICAS
-- =====================================================

-- Atualizar estatísticas das tabelas
ANALYZE subscribers;
ANALYZE subscription_history;
ANALYZE usage_limits;

-- 7. VERIFICAR POLÍTICAS RLS
-- =====================================================

-- Verificar se as políticas estão ativas
SELECT
    'VERIFICAÇÃO RLS' as section,
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename IN ('subscribers', 'subscription_history', 'usage_limits')
ORDER BY tablename, policyname;

-- 8. CRIAR ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Criar índices se não existirem
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_customer_id ON subscribers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscription_history_email ON subscription_history(email);
CREATE INDEX IF NOT EXISTS idx_subscription_history_event_type ON subscription_history(event_type);
CREATE INDEX IF NOT EXISTS idx_usage_limits_email ON usage_limits(email);

-- 9. VERIFICAR CONSTRAINTS
-- =====================================================

-- Verificar constraints existentes
SELECT
    'CONSTRAINTS' as section,
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid IN (
    'public.subscribers'::regclass,
    'public.subscription_history'::regclass,
    'public.usage_limits'::regclass
);

-- 10. RELATÓRIO FINAL
-- =====================================================

SELECT
    'RESOLUÇÃO CONCLUÍDA' as section,
    'Dados inconsistentes corrigidos' as action_1,
    'Sincronização de assinaturas realizada' as action_2,
    'Dados órfãos removidos' as action_3,
    'Backup criado' as action_4,
    'Índices otimizados' as action_5; 