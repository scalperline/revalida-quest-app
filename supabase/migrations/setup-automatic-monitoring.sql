-- Setup Automatic Monitoring for Stripe Synchronization
-- This script sets up automatic monitoring and correction of sync issues

-- Enable pg_cron extension (requires superuser privileges)
-- This should be enabled in Supabase dashboard under Database > Extensions
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to run comprehensive monitoring
CREATE OR REPLACE FUNCTION run_comprehensive_monitoring()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    health_report jsonb;
    sync_issues jsonb;
    fixed_issues jsonb;
    webhook_processed jsonb;
    result jsonb;
BEGIN
    -- Get health report
    SELECT jsonb_agg(row_to_json(t)) INTO health_report
    FROM subscription_health_report() t;
    
    -- Detect sync issues
    SELECT jsonb_agg(row_to_json(t)) INTO sync_issues
    FROM detect_sync_issues() t;
    
    -- Auto-fix detected issues
    SELECT jsonb_agg(row_to_json(t)) INTO fixed_issues
    FROM auto_fix_sync_issues() t;
    
    -- Process webhook fallback events
    SELECT jsonb_agg(row_to_json(t)) INTO webhook_processed
    FROM process_webhook_fallback() t;
    
    -- Log the monitoring run
    INSERT INTO monitoring_logs (run_at, health_report, issues_detected, issues_fixed, webhooks_processed)
    VALUES (
        NOW(),
        health_report,
        COALESCE(jsonb_array_length(sync_issues), 0),
        COALESCE(jsonb_array_length(fixed_issues), 0),
        COALESCE(jsonb_array_length(webhook_processed), 0)
    );
    
    -- Build result
    result := jsonb_build_object(
        'timestamp', NOW(),
        'health_report', health_report,
        'sync_issues_detected', COALESCE(jsonb_array_length(sync_issues), 0),
        'issues_fixed', COALESCE(jsonb_array_length(fixed_issues), 0),
        'webhooks_processed', COALESCE(jsonb_array_length(webhook_processed), 0),
        'status', 'completed'
    );
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error
        INSERT INTO monitoring_logs (run_at, error_message)
        VALUES (NOW(), SQLERRM);
        
        RETURN jsonb_build_object(
            'timestamp', NOW(),
            'status', 'error',
            'error', SQLERRM
        );
END;
$$;

-- Create monitoring logs table
CREATE TABLE IF NOT EXISTS monitoring_logs (
    id BIGSERIAL PRIMARY KEY,
    run_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    health_report JSONB,
    issues_detected INTEGER DEFAULT 0,
    issues_fixed INTEGER DEFAULT 0,
    webhooks_processed INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for monitoring logs
CREATE INDEX IF NOT EXISTS idx_monitoring_logs_run_at ON monitoring_logs(run_at DESC);

-- Create a function to get monitoring summary
CREATE OR REPLACE FUNCTION get_monitoring_summary(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
    date DATE,
    total_runs INTEGER,
    successful_runs INTEGER,
    failed_runs INTEGER,
    total_issues_detected INTEGER,
    total_issues_fixed INTEGER,
    total_webhooks_processed INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        DATE(ml.run_at) as date,
        COUNT(*)::INTEGER as total_runs,
        COUNT(*) FILTER (WHERE ml.error_message IS NULL)::INTEGER as successful_runs,
        COUNT(*) FILTER (WHERE ml.error_message IS NOT NULL)::INTEGER as failed_runs,
        COALESCE(SUM(ml.issues_detected), 0)::INTEGER as total_issues_detected,
        COALESCE(SUM(ml.issues_fixed), 0)::INTEGER as total_issues_fixed,
        COALESCE(SUM(ml.webhooks_processed), 0)::INTEGER as total_webhooks_processed
    FROM monitoring_logs ml
    WHERE ml.run_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY DATE(ml.run_at)
    ORDER BY DATE(ml.run_at) DESC;
END;
$$;

-- Create alert thresholds table
CREATE TABLE IF NOT EXISTS alert_thresholds (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL UNIQUE,
    threshold_value INTEGER NOT NULL,
    alert_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default alert thresholds
INSERT INTO alert_thresholds (metric_name, threshold_value) VALUES
('unprocessed_webhooks', 5),
('sync_issues', 3),
('failed_payments_without_subscription', 2),
('expired_subscriptions_still_active', 1)
ON CONFLICT (metric_name) DO NOTHING;

-- Create function to check alert thresholds
CREATE OR REPLACE FUNCTION check_alert_thresholds()
RETURNS TABLE (
    metric_name VARCHAR(100),
    current_value INTEGER,
    threshold_value INTEGER,
    alert_triggered BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE
    health_data RECORD;
    threshold_data RECORD;
BEGIN
    -- Get current health metrics
    FOR health_data IN SELECT * FROM subscription_health_report() LOOP
        -- Check against thresholds
        FOR threshold_data IN 
            SELECT at.metric_name, at.threshold_value 
            FROM alert_thresholds at 
            WHERE at.alert_enabled = true
        LOOP
            -- Map health report metrics to threshold names
            CASE threshold_data.metric_name
                WHEN 'unprocessed_webhooks' THEN
                    IF health_data.metric = 'Eventos de webhook não processados' THEN
                        RETURN QUERY SELECT 
                            threshold_data.metric_name,
                            health_data.value,
                            threshold_data.threshold_value,
                            (health_data.value > threshold_data.threshold_value);
                    END IF;
                WHEN 'sync_issues' THEN
                    IF health_data.metric = 'Problemas de sincronização detectados' THEN
                        RETURN QUERY SELECT 
                            threshold_data.metric_name,
                            health_data.value,
                            threshold_data.threshold_value,
                            (health_data.value > threshold_data.threshold_value);
                    END IF;
                WHEN 'failed_payments_without_subscription' THEN
                    IF health_data.metric = 'Pagamentos recentes sem assinatura' THEN
                        RETURN QUERY SELECT 
                            threshold_data.metric_name,
                            health_data.value,
                            threshold_data.threshold_value,
                            (health_data.value > threshold_data.threshold_value);
                    END IF;
                WHEN 'expired_subscriptions_still_active' THEN
                    IF health_data.metric = 'Assinaturas expiradas não processadas' THEN
                        RETURN QUERY SELECT 
                            threshold_data.metric_name,
                            health_data.value,
                            threshold_data.threshold_value,
                            (health_data.value > threshold_data.threshold_value);
                    END IF;
            END CASE;
        END LOOP;
    END LOOP;
END;
$$;

-- Create notification function (placeholder for webhook/email integration)
CREATE OR REPLACE FUNCTION send_alert_notification(
    alert_type TEXT,
    message TEXT,
    severity TEXT DEFAULT 'warning'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    -- Log the alert (in production, this would trigger external notifications)
    INSERT INTO alert_logs (alert_type, message, severity, created_at)
    VALUES (alert_type, message, severity, NOW());
    
    -- In production, you would integrate with:
    -- - Email service (SendGrid, AWS SES)
    -- - Slack webhook
    -- - Discord webhook
    -- - SMS service
    -- - Push notifications
    
    RETURN true;
EXCEPTION
    WHEN OTHERS THEN
        RETURN false;
END;
$$;

-- Create alert logs table
CREATE TABLE IF NOT EXISTS alert_logs (
    id BIGSERIAL PRIMARY KEY,
    alert_type TEXT NOT NULL,
    message TEXT NOT NULL,
    severity TEXT DEFAULT 'warning',
    acknowledged BOOLEAN DEFAULT false,
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for alert logs
CREATE INDEX IF NOT EXISTS idx_alert_logs_created_at ON alert_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alert_logs_acknowledged ON alert_logs(acknowledged, created_at DESC);

-- Enhanced monitoring function with alerts
CREATE OR REPLACE FUNCTION run_monitoring_with_alerts()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    monitoring_result jsonb;
    alert_check RECORD;
    alert_message TEXT;
BEGIN
    -- Run comprehensive monitoring
    SELECT run_comprehensive_monitoring() INTO monitoring_result;
    
    -- Check alert thresholds
    FOR alert_check IN SELECT * FROM check_alert_thresholds() WHERE alert_triggered = true LOOP
        alert_message := format(
            'Alert: %s exceeded threshold. Current value: %s, Threshold: %s',
            alert_check.metric_name,
            alert_check.current_value,
            alert_check.threshold_value
        );
        
        -- Send alert notification
        PERFORM send_alert_notification(
            'threshold_exceeded',
            alert_message,
            CASE 
                WHEN alert_check.current_value > alert_check.threshold_value * 2 THEN 'critical'
                ELSE 'warning'
            END
        );
    END LOOP;
    
    RETURN monitoring_result;
END;
$$;

-- Setup automatic execution (uncomment and configure in production)
-- Note: pg_cron requires superuser privileges and must be enabled in Supabase

/*
-- Schedule monitoring to run every 15 minutes
SELECT cron.schedule(
    'stripe-sync-monitoring',
    '*/15 * * * *',  -- Every 15 minutes
    'SELECT run_monitoring_with_alerts();'
);

-- Schedule comprehensive health check every hour
SELECT cron.schedule(
    'stripe-health-check',
    '0 * * * *',  -- Every hour
    'SELECT run_comprehensive_monitoring();'
);

-- Schedule cleanup of old logs daily
SELECT cron.schedule(
    'cleanup-monitoring-logs',
    '0 2 * * *',  -- Daily at 2 AM
    'DELETE FROM monitoring_logs WHERE created_at < NOW() - INTERVAL ''30 days''; DELETE FROM alert_logs WHERE created_at < NOW() - INTERVAL ''30 days'' AND acknowledged = true;'
);
*/

-- Manual execution commands for testing:
-- SELECT run_comprehensive_monitoring();
-- SELECT run_monitoring_with_alerts();
-- SELECT * FROM get_monitoring_summary(7);
-- SELECT * FROM check_alert_thresholds();

-- View recent monitoring results
-- SELECT * FROM monitoring_logs ORDER BY run_at DESC LIMIT 10;

-- View unacknowledged alerts
-- SELECT * FROM alert_logs WHERE acknowledged = false ORDER BY created_at DESC;

COMMENT ON FUNCTION run_comprehensive_monitoring() IS 'Executa monitoramento completo da sincronização Stripe';
COMMENT ON FUNCTION run_monitoring_with_alerts() IS 'Executa monitoramento com verificação de alertas';
COMMENT ON FUNCTION get_monitoring_summary(INTEGER) IS 'Retorna resumo do monitoramento dos últimos N dias';
COMMENT ON FUNCTION check_alert_thresholds() IS 'Verifica se alguma métrica excedeu os limites de alerta';
COMMENT ON TABLE monitoring_logs IS 'Log de execuções do monitoramento automático';
COMMENT ON TABLE alert_logs IS 'Log de alertas gerados pelo sistema de monitoramento';
COMMENT ON TABLE alert_thresholds IS 'Configuração de limites para alertas automáticos';