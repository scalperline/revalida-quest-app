# Sistema de Monitoramento Stripe - Guia de Configuração

Este documento explica como configurar e usar o sistema completo de monitoramento e sincronização Stripe implementado.

## 📋 Visão Geral

O sistema implementado inclui:

1. **Webhook melhorado** com retry automático e fallback
2. **Monitoramento automático** de problemas de sincronização
3. **Auto-correção** de problemas detectados
4. **Painel administrativo** para monitoramento em tempo real
5. **Sistema de alertas** para problemas críticos
6. **Scripts SQL** para manutenção e correção manual

## 🚀 Configuração Inicial

### 1. Executar Scripts SQL

Execute os seguintes scripts no Supabase SQL Editor na ordem:

```sql
-- 1. Criar tabelas de webhook e monitoramento
\i create-webhook-tables.sql

-- 2. Configurar sistema de monitoramento automático
\i auto-sync-monitor.sql

-- 3. Configurar monitoramento avançado com alertas
\i setup-automatic-monitoring.sql
```

### 2. Configurar Edge Functions

Certifique-se de que as Edge Functions estão deployadas:

```bash
# Deploy da função de monitoramento automático
supabase functions deploy auto-sync-monitor

# Deploy do webhook melhorado
supabase functions deploy stripe-webhook
```

### 3. Configurar Variáveis de Ambiente

Adicione no Supabase Dashboard > Settings > Environment Variables:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_SECRET_KEY=sk_...
ALERT_WEBHOOK_URL=https://hooks.slack.com/... (opcional)
```

## 🔧 Funcionalidades Implementadas

### 1. Webhook Melhorado (`stripe-webhook/index.ts`)

**Melhorias implementadas:**
- ✅ Retry automático com backoff exponencial
- ✅ Sistema de fallback para eventos falhados
- ✅ Logs detalhados para debugging
- ✅ Validação robusta de dados
- ✅ Tratamento de erros aprimorado

**Como funciona:**
- Eventos que falham são salvos na tabela `webhook_fallback`
- Sistema tenta reprocessar automaticamente
- Logs são salvos na tabela `webhook_history`

### 2. Monitoramento Automático (`auto-sync-monitor/index.ts`)

**Funcionalidades:**
- ✅ Detecção automática de problemas de sincronização
- ✅ Correção automática de problemas simples
- ✅ Relatórios de saúde do sistema
- ✅ Alertas para problemas críticos

**Execução:**
```bash
# Executar manualmente
curl -X POST https://your-project.supabase.co/functions/v1/auto-sync-monitor

# Ou via SQL
SELECT run_comprehensive_monitoring();
```

### 3. Painel Administrativo (`WebhookMonitoringPanel.tsx`)

**Acesso:**
- Em desenvolvimento: `http://localhost:5173/?webhook-monitor`
- Mostra métricas em tempo real
- Permite ações manuais de correção
- Histórico de webhooks e eventos

**Funcionalidades:**
- 📊 Métricas de saúde do sistema
- 🔄 Auto-refresh a cada 30 segundos
- 🛠️ Botões para ações manuais
- 📋 Histórico detalhado de eventos
- ⚠️ Alertas de problemas críticos

### 4. Scripts SQL de Manutenção

#### Monitoramento Manual
```sql
-- Verificar saúde do sistema
SELECT * FROM subscription_health_report();

-- Detectar problemas
SELECT * FROM detect_sync_issues();

-- Corrigir problemas automaticamente
SELECT * FROM auto_fix_sync_issues();

-- Processar eventos pendentes
SELECT * FROM process_webhook_fallback();
```

#### Relatórios
```sql
-- Resumo dos últimos 7 dias
SELECT * FROM get_monitoring_summary(7);

-- Status de webhooks
SELECT * FROM webhook_status_report();

-- Verificar alertas
SELECT * FROM check_alert_thresholds();
```

## 🔍 Como Usar o Sistema

### Para Desenvolvedores

1. **Acessar o painel de monitoramento:**
   ```
   http://localhost:5173/?webhook-monitor
   ```

2. **Verificar logs de webhook:**
   ```sql
   SELECT * FROM webhook_history ORDER BY processed_at DESC LIMIT 20;
   ```

3. **Forçar sincronização de um usuário:**
   ```sql
   -- Substituir 'email@exemplo.com' pelo email real
   SELECT auto_fix_user_subscription('email@exemplo.com');
   ```

### Para Administradores

1. **Monitoramento diário:**
   - Verificar painel administrativo
   - Revisar alertas não reconhecidos
   - Executar relatório de saúde

2. **Resolução de problemas:**
   ```sql
   -- Executar diagnóstico completo
   SELECT run_monitoring_with_alerts();
   
   -- Ver problemas não resolvidos
   SELECT * FROM alert_logs WHERE acknowledged = false;
   ```

3. **Manutenção semanal:**
   ```sql
   -- Limpar logs antigos (opcional)
   DELETE FROM webhook_history WHERE processed_at < NOW() - INTERVAL '30 days';
   DELETE FROM monitoring_logs WHERE created_at < NOW() - INTERVAL '30 days';
   ```

## 🚨 Sistema de Alertas

### Configuração de Limites

```sql
-- Visualizar limites atuais
SELECT * FROM alert_thresholds;

-- Ajustar limites
UPDATE alert_thresholds 
SET threshold_value = 10 
WHERE metric_name = 'unprocessed_webhooks';
```

### Tipos de Alertas

- **Webhooks não processados** (> 5)
- **Problemas de sincronização** (> 3)
- **Pagamentos sem assinatura** (> 2)
- **Assinaturas expiradas ativas** (> 1)

## 🔄 Automação (Produção)

### Configurar Cron Jobs

```sql
-- Habilitar extensão pg_cron (requer privilégios de superusuário)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Monitoramento a cada 15 minutos
SELECT cron.schedule(
    'stripe-sync-monitoring',
    '*/15 * * * *',
    'SELECT run_monitoring_with_alerts();'
);

-- Verificação de saúde a cada hora
SELECT cron.schedule(
    'stripe-health-check',
    '0 * * * *',
    'SELECT run_comprehensive_monitoring();'
);
```

### Webhook de Alertas (Slack/Discord)

```sql
-- Configurar webhook para notificações
UPDATE alert_thresholds 
SET alert_enabled = true;

-- Função personalizada para envio de alertas
-- (implementar integração com Slack/Discord/Email)
```

## 📊 Métricas Importantes

### Indicadores de Saúde
- **Assinantes ativos**: Usuários com assinatura válida
- **Webhooks pendentes**: Eventos não processados
- **Taxa de sucesso**: % de webhooks processados com sucesso
- **Tempo de resposta**: Latência média de processamento

### Alertas Críticos
- Falha de webhook por > 1 hora
- Mais de 5 problemas de sincronização
- Pagamentos não refletidos por > 30 minutos

## 🛠️ Troubleshooting

### Problemas Comuns

1. **Webhook não está sendo chamado:**
   - Verificar URL no Stripe Dashboard
   - Verificar secret do webhook
   - Verificar logs da Edge Function

2. **Sincronização falhando:**
   ```sql
   -- Verificar problemas específicos
   SELECT * FROM detect_sync_issues();
   
   -- Executar correção manual
   SELECT * FROM auto_fix_sync_issues();
   ```

3. **Usuário específico com problema:**
   ```sql
   -- Verificar dados do usuário
   SELECT * FROM subscribers WHERE user_id = 'uuid-do-usuario';
   
   -- Forçar sincronização
   SELECT auto_fix_user_subscription('email@usuario.com');
   ```

### Logs Úteis

```sql
-- Últimos erros de webhook
SELECT * FROM webhook_history 
WHERE status = 'error' 
ORDER BY processed_at DESC 
LIMIT 10;

-- Eventos pendentes de reprocessamento
SELECT * FROM webhook_fallback 
WHERE processed = false 
ORDER BY created_at DESC;

-- Alertas recentes
SELECT * FROM alert_logs 
ORDER BY created_at DESC 
LIMIT 20;
```

## 📈 Próximos Passos

1. **Configurar notificações externas** (Slack, email)
2. **Implementar dashboard de métricas** mais avançado
3. **Adicionar testes automatizados** para webhooks
4. **Configurar backup** de dados críticos
5. **Implementar rate limiting** para proteção

## 🔐 Segurança

- ✅ Validação de assinatura Stripe
- ✅ RLS habilitado em todas as tabelas
- ✅ Logs de auditoria completos
- ✅ Tratamento seguro de dados sensíveis
- ✅ Rate limiting em Edge Functions

---

**Nota:** Este sistema foi projetado para ser robusto e auto-corretivo. A maioria dos problemas será detectada e corrigida automaticamente. Para problemas persistentes, use o painel administrativo ou execute os scripts SQL de diagnóstico.