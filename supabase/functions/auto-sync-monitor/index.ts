import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SyncIssue {
  email: string;
  issue_type: string;
  details: any;
}

interface HealthMetric {
  metric: string;
  value: number;
  status: string;
}

interface FixResult {
  email: string;
  action_taken: string;
  success: boolean;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('🔍 Iniciando monitoramento automático de sincronização...')

    // 1. Verificar saúde do sistema
    const { data: healthData, error: healthError } = await supabaseClient
      .rpc('subscription_health_report')
    
    if (healthError) {
      console.error('❌ Erro ao verificar saúde do sistema:', healthError)
      throw healthError
    }

    const healthMetrics = healthData as HealthMetric[]
    console.log('📊 Métricas de saúde:', healthMetrics)

    // 2. Detectar problemas de sincronização
    const { data: issuesData, error: issuesError } = await supabaseClient
      .rpc('detect_sync_issues')
    
    if (issuesError) {
      console.error('❌ Erro ao detectar problemas:', issuesError)
      throw issuesError
    }

    const issues = issuesData as SyncIssue[]
    console.log(`🔍 Problemas detectados: ${issues.length}`)

    let fixResults: FixResult[] = []
    
    // 3. Se houver problemas, tentar corrigi-los automaticamente
    if (issues.length > 0) {
      console.log('🔧 Executando auto-correção...')
      
      const { data: fixData, error: fixError } = await supabaseClient
        .rpc('auto_fix_sync_issues')
      
      if (fixError) {
        console.error('❌ Erro na auto-correção:', fixError)
        throw fixError
      }

      fixResults = fixData as FixResult[]
      console.log(`✅ Correções aplicadas: ${fixResults.length}`)
    }

    // 4. Verificar se há problemas críticos que precisam de atenção
    const criticalIssues = healthMetrics.filter(metric => metric.status === 'critical')
    const warningIssues = healthMetrics.filter(metric => metric.status === 'warning')

    // 5. Enviar alertas se necessário
    if (criticalIssues.length > 0 || issues.length > 0) {
      await sendAlert({
        type: criticalIssues.length > 0 ? 'critical' : 'warning',
        healthMetrics,
        issues,
        fixResults,
        timestamp: new Date().toISOString()
      })
    }

    // 6. Registrar execução no histórico
    await supabaseClient
      .from('subscription_history')
      .insert({
        email: 'system@revalidaquest.com',
        event_type: 'auto_monitor_execution',
        subscription_tier: 'system',
        details: {
          health_metrics: healthMetrics,
          issues_detected: issues.length,
          fixes_applied: fixResults.length,
          execution_time: new Date().toISOString(),
          critical_issues: criticalIssues.length,
          warning_issues: warningIssues.length
        }
      })

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        health_status: criticalIssues.length === 0 ? 'healthy' : 'critical',
        issues_detected: issues.length,
        fixes_applied: fixResults.length,
        critical_issues: criticalIssues.length,
        warning_issues: warningIssues.length
      },
      details: {
        health_metrics: healthMetrics,
        issues,
        fix_results: fixResults
      }
    }

    console.log('✅ Monitoramento concluído:', response.summary)

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('❌ Erro no monitoramento automático:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

// Função para enviar alertas
async function sendAlert(alertData: any) {
  try {
    console.log('🚨 Enviando alerta:', alertData.type)
    
    // Aqui você pode integrar com:
    // - Email (SendGrid, Resend, etc.)
    // - Slack webhook
    // - Discord webhook
    // - Telegram bot
    // - Sistema de notificações interno
    
    // Exemplo de log estruturado para monitoramento
    console.log('📧 ALERTA DE SINCRONIZAÇÃO:', {
      level: alertData.type,
      message: `Detectados ${alertData.issues.length} problemas de sincronização`,
      details: alertData,
      timestamp: alertData.timestamp
    })
    
    // TODO: Implementar envio real de alertas
    // Exemplo com webhook do Slack:
    /*
    const slackWebhook = Deno.env.get('SLACK_WEBHOOK_URL')
    if (slackWebhook) {
      await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 Alerta RevalidaQuest: ${alertData.issues.length} problemas de sincronização detectados`,
          attachments: [{
            color: alertData.type === 'critical' ? 'danger' : 'warning',
            fields: [
              { title: 'Problemas detectados', value: alertData.issues.length, short: true },
              { title: 'Correções aplicadas', value: alertData.fixResults.length, short: true },
              { title: 'Status', value: alertData.type, short: true }
            ]
          }]
        })
      })
    }
    */
    
  } catch (error) {
    console.error('❌ Erro ao enviar alerta:', error)
  }
}

/* 
Para configurar execução automática:

1. Deploy desta função:
   supabase functions deploy auto-sync-monitor

2. Configurar cron job (GitHub Actions, Vercel Cron, ou serviço externo):
   - Executar a cada hora: 0 * * * *
   - URL: https://your-project.supabase.co/functions/v1/auto-sync-monitor
   - Header: Authorization: Bearer YOUR_ANON_KEY

3. Configurar variáveis de ambiente:
   - SLACK_WEBHOOK_URL (opcional)
   - EMAIL_API_KEY (opcional)
   - DISCORD_WEBHOOK_URL (opcional)

4. Monitorar logs:
   supabase functions logs auto-sync-monitor
*/