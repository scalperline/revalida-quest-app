-- Sistema de Monitoramento Automático de Sincronização Stripe
-- Este script detecta e corrige automaticamente problemas de sincronização

-- 1. Função para detectar usuários com problemas de sincronização
CREATE OR REPLACE FUNCTION detect_sync_issues()
RETURNS TABLE(
  email TEXT,
  issue_type TEXT,
  details JSONB
) AS $$
BEGIN
  -- Detectar usuários que fizeram pagamento no Stripe mas não têm assinatura ativa
  RETURN QUERY
  SELECT 
    sh.email,
    'missing_subscription'::TEXT as issue_type,
    jsonb_build_object(
      'last_payment', sh.created_at,
      'subscription_tier', sh.subscription_tier,
      'stripe_subscription_id', sh.stripe_subscription_id
    ) as details
  FROM subscription_history sh
  LEFT JOIN subscribers s ON sh.email = s.email
  WHERE sh.event_type IN ('checkout.session.completed', 'customer.subscription.created')
    AND sh.created_at > NOW() - INTERVAL '7 days'
    AND (s.email IS NULL OR s.subscribed = false)
  
  UNION ALL
  
  -- Detectar assinaturas expiradas que ainda estão marcadas como ativas
  SELECT 
    s.email,
    'expired_subscription'::TEXT as issue_type,
    jsonb_build_object(
      'subscription_end', s.subscription_end,
      'subscription_tier', s.subscription_tier,
      'days_expired', EXTRACT(days FROM NOW() - s.subscription_end)
    ) as details
  FROM subscribers s
  WHERE s.subscribed = true
    AND s.subscription_end < NOW();
END;
$$ LANGUAGE plpgsql;

-- 2. Função para auto-correção de problemas de sincronização
CREATE OR REPLACE FUNCTION auto_fix_sync_issues()
RETURNS TABLE(
  email TEXT,
  action_taken TEXT,
  success BOOLEAN
) AS $$
DECLARE
  issue_record RECORD;
  user_id UUID;
BEGIN
  -- Processar cada problema detectado
  FOR issue_record IN 
    SELECT * FROM detect_sync_issues()
  LOOP
    -- Obter user_id
    SELECT id INTO user_id 
    FROM auth.users 
    WHERE auth.users.email = issue_record.email;
    
    IF issue_record.issue_type = 'missing_subscription' THEN
      -- Corrigir assinatura faltante
      INSERT INTO subscribers (
        email, 
        subscribed, 
        subscription_tier, 
        subscription_end,
        updated_at
      )
      VALUES (
        issue_record.email,
        true,
        (issue_record.details->>'subscription_tier')::TEXT,
        NOW() + INTERVAL '1 month',
        NOW()
      )
      ON CONFLICT (email) 
      DO UPDATE SET 
        subscribed = true,
        subscription_tier = (issue_record.details->>'subscription_tier')::TEXT,
        subscription_end = NOW() + INTERVAL '1 month',
        updated_at = NOW();
      
      -- Registrar correção no histórico
      INSERT INTO subscription_history (
        user_id,
        email,
        event_type,
        subscription_tier,
        stripe_subscription_id,
        details
      )
      VALUES (
        user_id,
        issue_record.email,
        'auto_correction',
        (issue_record.details->>'subscription_tier')::TEXT,
        (issue_record.details->>'stripe_subscription_id')::TEXT,
        jsonb_build_object(
          'auto_fix', true,
          'original_issue', issue_record.details,
          'corrected_at', NOW()
        )
      );
      
      RETURN QUERY SELECT issue_record.email, 'subscription_restored'::TEXT, true;
      
    ELSIF issue_record.issue_type = 'expired_subscription' THEN
      -- Desativar assinatura expirada
      UPDATE subscribers 
      SET 
        subscribed = false,
        updated_at = NOW()
      WHERE email = issue_record.email;
      
      -- Registrar expiração no histórico
      INSERT INTO subscription_history (
        user_id,
        email,
        event_type,
        subscription_tier,
        details
      )
      VALUES (
        user_id,
        issue_record.email,
        'auto_expiration',
        (issue_record.details->>'subscription_tier')::TEXT,
        jsonb_build_object(
          'auto_fix', true,
          'expired_at', issue_record.details->>'subscription_end',
          'processed_at', NOW()
        )
      );
      
      RETURN QUERY SELECT issue_record.email, 'subscription_expired'::TEXT, true;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 3. Função para gerar relatório de saúde do sistema
CREATE OR REPLACE FUNCTION subscription_health_report()
RETURNS TABLE(
  metric TEXT,
  value BIGINT,
  status TEXT
) AS $$
BEGIN
  -- Total de assinantes ativos
  RETURN QUERY
  SELECT 
    'active_subscribers'::TEXT,
    COUNT(*)::BIGINT,
    CASE WHEN COUNT(*) > 0 THEN 'healthy' ELSE 'warning' END::TEXT
  FROM subscribers 
  WHERE subscribed = true AND subscription_end > NOW();
  
  -- Assinaturas expiradas não processadas
  RETURN QUERY
  SELECT 
    'expired_unprocessed'::TEXT,
    COUNT(*)::BIGINT,
    CASE WHEN COUNT(*) = 0 THEN 'healthy' ELSE 'critical' END::TEXT
  FROM subscribers 
  WHERE subscribed = true AND subscription_end < NOW();
  
  -- Pagamentos recentes sem assinatura
  RETURN QUERY
  SELECT 
    'payments_without_subscription'::TEXT,
    COUNT(DISTINCT sh.email)::BIGINT,
    CASE WHEN COUNT(DISTINCT sh.email) = 0 THEN 'healthy' ELSE 'critical' END::TEXT
  FROM subscription_history sh
  LEFT JOIN subscribers s ON sh.email = s.email
  WHERE sh.event_type IN ('checkout.session.completed', 'customer.subscription.created')
    AND sh.created_at > NOW() - INTERVAL '24 hours'
    AND (s.email IS NULL OR s.subscribed = false);
  
  -- Webhooks falhados nas últimas 24h
  RETURN QUERY
  SELECT 
    'failed_webhooks_24h'::TEXT,
    COUNT(*)::BIGINT,
    CASE WHEN COUNT(*) = 0 THEN 'healthy' ELSE 'warning' END::TEXT
  FROM subscription_history 
  WHERE details->>'error' IS NOT NULL
    AND created_at > NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- 4. Script de execução manual para verificar e corrigir problemas
SELECT 'RELATÓRIO DE SAÚDE DO SISTEMA' as title;
SELECT * FROM subscription_health_report();

SELECT 'PROBLEMAS DETECTADOS' as title;
SELECT * FROM detect_sync_issues();

SELECT 'EXECUTANDO AUTO-CORREÇÃO' as title;
SELECT * FROM auto_fix_sync_issues();

SELECT 'RELATÓRIO FINAL' as title;
SELECT * FROM subscription_health_report();

-- 5. Comentários para configuração de execução automática
/*
Para executar automaticamente, configure um cron job no Supabase:

1. Criar uma função Edge para executar o monitoramento:
   - Criar arquivo: supabase/functions/auto-sync-monitor/index.ts
   - Configurar para executar auto_fix_sync_issues() a cada hora

2. Configurar webhook de monitoramento:
   - Enviar alertas quando detect_sync_issues() retornar resultados
   - Integrar com sistema de notificações (email, Slack, etc.)

3. Dashboard de monitoramento:
   - Criar página admin para visualizar subscription_health_report()
   - Permitir execução manual de auto_fix_sync_issues()
*/

-- 6. Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_subscription_history_email_created 
ON subscription_history(email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_end 
ON subscribers(subscribed, subscription_end) 
WHERE subscribed = true;

SELECT 'Sistema de monitoramento automático criado com sucesso!' as resultado;