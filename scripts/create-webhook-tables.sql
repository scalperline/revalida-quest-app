-- Script para criar tabelas de suporte ao sistema de webhook melhorado
-- Execute este script no Supabase para habilitar o sistema de fallback e monitoramento

-- 1. Tabela para armazenar eventos de webhook que falharam
CREATE TABLE IF NOT EXISTS webhook_fallback (
  id SERIAL PRIMARY KEY,
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,
  error_message TEXT,
  last_retry_at TIMESTAMP
);

-- 2. Tabela para histórico completo de webhooks (auditoria)
CREATE TABLE IF NOT EXISTS webhook_history (
  id SERIAL PRIMARY KEY,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'error', 'retry'
  error_message TEXT,
  result JSONB,
  processed_at TIMESTAMP DEFAULT NOW(),
  processing_time_ms INTEGER
);

-- 3. Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_webhook_fallback_processed 
ON webhook_fallback(processed, created_at);

CREATE INDEX IF NOT EXISTS idx_webhook_fallback_event_type 
ON webhook_fallback(event_type, created_at);

CREATE INDEX IF NOT EXISTS idx_webhook_history_event_id 
ON webhook_history(event_id);

CREATE INDEX IF NOT EXISTS idx_webhook_history_status_date 
ON webhook_history(status, processed_at DESC);

-- 4. Função para processar eventos de fallback
CREATE OR REPLACE FUNCTION process_webhook_fallback()
RETURNS TABLE(
  event_id TEXT,
  event_type TEXT,
  status TEXT,
  message TEXT
) AS $$
DECLARE
  fallback_record RECORD;
  processing_result TEXT;
BEGIN
  -- Processar eventos não processados (máximo 10 por vez)
  FOR fallback_record IN 
    SELECT * FROM webhook_fallback 
    WHERE processed = FALSE 
      AND retry_count < 5
      AND (last_retry_at IS NULL OR last_retry_at < NOW() - INTERVAL '1 hour')
    ORDER BY created_at ASC
    LIMIT 10
  LOOP
    BEGIN
      -- Incrementar contador de retry
      UPDATE webhook_fallback 
      SET 
        retry_count = retry_count + 1,
        last_retry_at = NOW()
      WHERE id = fallback_record.id;
      
      -- Aqui você pode implementar a lógica de reprocessamento
      -- Por enquanto, apenas marcamos como processado após 3 tentativas
      IF fallback_record.retry_count >= 2 THEN
        UPDATE webhook_fallback 
        SET 
          processed = TRUE,
          processed_at = NOW(),
          error_message = 'Max retries exceeded - manual intervention required'
        WHERE id = fallback_record.id;
        
        processing_result := 'max_retries_exceeded';
      ELSE
        processing_result := 'retry_scheduled';
      END IF;
      
      -- Registrar no histórico
      INSERT INTO webhook_history (
        event_id,
        event_type,
        status,
        result,
        processed_at
      )
      VALUES (
        fallback_record.event_id,
        fallback_record.event_type,
        'retry',
        jsonb_build_object(
          'retry_count', fallback_record.retry_count + 1,
          'processing_result', processing_result,
          'auto_processed', true
        ),
        NOW()
      );
      
      RETURN QUERY SELECT 
        fallback_record.event_id,
        fallback_record.event_type,
        processing_result,
        CASE 
          WHEN processing_result = 'max_retries_exceeded' THEN 'Requires manual intervention'
          ELSE 'Retry scheduled'
        END;
        
    EXCEPTION WHEN OTHERS THEN
      -- Em caso de erro, registrar e continuar
      UPDATE webhook_fallback 
      SET 
        error_message = SQLERRM,
        last_retry_at = NOW()
      WHERE id = fallback_record.id;
      
      RETURN QUERY SELECT 
        fallback_record.event_id,
        fallback_record.event_type,
        'error'::TEXT,
        SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 5. Função para relatório de status dos webhooks
CREATE OR REPLACE FUNCTION webhook_status_report()
RETURNS TABLE(
  metric TEXT,
  value BIGINT,
  status TEXT,
  description TEXT
) AS $$
BEGIN
  -- Webhooks processados com sucesso nas últimas 24h
  RETURN QUERY
  SELECT 
    'successful_webhooks_24h'::TEXT,
    COUNT(*)::BIGINT,
    CASE WHEN COUNT(*) > 0 THEN 'healthy' ELSE 'warning' END::TEXT,
    'Webhooks processados com sucesso nas últimas 24 horas'::TEXT
  FROM webhook_history 
  WHERE status = 'success' 
    AND processed_at > NOW() - INTERVAL '24 hours';
  
  -- Webhooks com erro nas últimas 24h
  RETURN QUERY
  SELECT 
    'failed_webhooks_24h'::TEXT,
    COUNT(*)::BIGINT,
    CASE WHEN COUNT(*) = 0 THEN 'healthy' ELSE 'critical' END::TEXT,
    'Webhooks que falharam nas últimas 24 horas'::TEXT
  FROM webhook_history 
  WHERE status = 'error' 
    AND processed_at > NOW() - INTERVAL '24 hours';
  
  -- Eventos pendentes de reprocessamento
  RETURN QUERY
  SELECT 
    'pending_fallback_events'::TEXT,
    COUNT(*)::BIGINT,
    CASE WHEN COUNT(*) = 0 THEN 'healthy' ELSE 'warning' END::TEXT,
    'Eventos aguardando reprocessamento'::TEXT
  FROM webhook_fallback 
  WHERE processed = FALSE;
  
  -- Eventos que excederam tentativas máximas
  RETURN QUERY
  SELECT 
    'max_retries_exceeded'::TEXT,
    COUNT(*)::BIGINT,
    CASE WHEN COUNT(*) = 0 THEN 'healthy' ELSE 'critical' END::TEXT,
    'Eventos que precisam de intervenção manual'::TEXT
  FROM webhook_fallback 
  WHERE processed = FALSE AND retry_count >= 5;
  
  -- Taxa de sucesso geral (últimos 7 dias)
  RETURN QUERY
  SELECT 
    'success_rate_7d'::TEXT,
    CASE 
      WHEN total.count = 0 THEN 0
      ELSE ROUND((success.count::DECIMAL / total.count::DECIMAL) * 100)::BIGINT
    END,
    CASE 
      WHEN total.count = 0 THEN 'unknown'
      WHEN (success.count::DECIMAL / total.count::DECIMAL) >= 0.95 THEN 'healthy'
      WHEN (success.count::DECIMAL / total.count::DECIMAL) >= 0.80 THEN 'warning'
      ELSE 'critical'
    END::TEXT,
    'Taxa de sucesso dos webhooks (últimos 7 dias)'::TEXT
  FROM 
    (SELECT COUNT(*) as count FROM webhook_history WHERE processed_at > NOW() - INTERVAL '7 days') total,
    (SELECT COUNT(*) as count FROM webhook_history WHERE status = 'success' AND processed_at > NOW() - INTERVAL '7 days') success;
END;
$$ LANGUAGE plpgsql;

-- 6. Função para limpeza automática de dados antigos
CREATE OR REPLACE FUNCTION cleanup_webhook_data()
RETURNS TABLE(
  table_name TEXT,
  deleted_count BIGINT
) AS $$
DECLARE
  deleted_fallback BIGINT;
  deleted_history BIGINT;
BEGIN
  -- Limpar eventos de fallback processados há mais de 30 dias
  DELETE FROM webhook_fallback 
  WHERE processed = TRUE 
    AND processed_at < NOW() - INTERVAL '30 days';
  GET DIAGNOSTICS deleted_fallback = ROW_COUNT;
  
  -- Limpar histórico de webhooks com mais de 90 dias
  DELETE FROM webhook_history 
  WHERE processed_at < NOW() - INTERVAL '90 days';
  GET DIAGNOSTICS deleted_history = ROW_COUNT;
  
  RETURN QUERY VALUES 
    ('webhook_fallback'::TEXT, deleted_fallback),
    ('webhook_history'::TEXT, deleted_history);
END;
$$ LANGUAGE plpgsql;

-- 7. Configurar Row Level Security (RLS)
ALTER TABLE webhook_fallback ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_history ENABLE ROW LEVEL SECURITY;

-- Política para service role (acesso total)
CREATE POLICY "Service role can manage webhook_fallback" ON webhook_fallback
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage webhook_history" ON webhook_history
  FOR ALL USING (auth.role() = 'service_role');

-- Política para usuários autenticados (apenas leitura)
CREATE POLICY "Authenticated users can read webhook_history" ON webhook_history
  FOR SELECT USING (auth.role() = 'authenticated');

-- 8. Script de teste e verificação
SELECT 'RELATÓRIO DE STATUS DOS WEBHOOKS' as title;
SELECT * FROM webhook_status_report();

SELECT 'EVENTOS PENDENTES DE REPROCESSAMENTO' as title;
SELECT 
  event_id,
  event_type,
  retry_count,
  created_at,
  last_retry_at,
  error_message
FROM webhook_fallback 
WHERE processed = FALSE
ORDER BY created_at DESC
LIMIT 10;

SELECT 'ÚLTIMOS WEBHOOKS PROCESSADOS' as title;
SELECT 
  event_id,
  event_type,
  status,
  processed_at,
  CASE 
    WHEN error_message IS NOT NULL THEN LEFT(error_message, 100) || '...'
    ELSE 'Success'
  END as summary
FROM webhook_history 
ORDER BY processed_at DESC
LIMIT 10;

SELECT 'Tabelas de webhook criadas com sucesso!' as resultado;

-- 9. Comentários para configuração de execução automática
/*
Para configurar execução automática do reprocessamento:

1. Criar um cron job que execute process_webhook_fallback() a cada hora
2. Configurar limpeza automática executando cleanup_webhook_data() semanalmente
3. Monitorar webhook_status_report() diariamente
4. Configurar alertas quando houver eventos com max_retries_exceeded

Exemplo de configuração no GitHub Actions:

name: Webhook Maintenance
on:
  schedule:
    - cron: '0 * * * *'  # A cada hora
jobs:
  process-fallback:
    runs-on: ubuntu-latest
    steps:
      - name: Process webhook fallback
        run: |
          curl -X POST "$SUPABASE_URL/rest/v1/rpc/process_webhook_fallback" \
            -H "apikey: $SUPABASE_ANON_KEY" \
            -H "Authorization: Bearer $SUPABASE_SERVICE_KEY"
*/