# Scripts de Manutenção - RevalidaQuest

Este diretório contém scripts SQL para manutenção, debugging e configuração do banco de dados Supabase.

## 📁 Organização dos Scripts

### 🔧 Scripts de Configuração
- `create-webhook-tables.sql` - Criação das tabelas para webhooks do Stripe
- `deploy-test-function.sql` - Deploy de funções de teste

### 🐛 Scripts de Debugging
- `test-stripe-config.sql` - Testa configuração do Stripe
- `test-customer-portal.sql` - Testa portal do cliente
- `test-webhook-sync.sql` - Testa sincronização de webhooks
- `debug-customer-portal.sql` - Debug do portal do cliente
- `test-mvp-cancellation.sql` - Testa cancelamento MVP

### 🔍 Scripts de Verificação
- `check-user-subscription.sql` - Verifica assinatura de usuário
- `check-subscription-data.sql` - Verifica dados de assinatura
- `subscription_validation.sql` - Validação de assinaturas

### 🔧 Scripts de Correção
- `fix-subscription-data.sql` - Corrige dados de assinatura
- `fix-gabriel-subscription.sql` - Correção específica para usuário Gabriel
- `corrigir_usuario_teste.sql` - Correção de usuário de teste
- `subscription_fix.sql` - Correção geral de assinaturas
- `subscription_fix_fixed.sql` - Correção de assinaturas (versão corrigida)
- `subscription_test.sql` - Teste de assinatura
- `subscription_test_fixed.sql` - Teste de assinatura (versão corrigida)

### 🚀 Scripts de Automação
- `auto-sync-monitor.sql` - Monitoramento de sincronização automática

### 📋 Scripts de Solução
- `SOLUCAO_DEFINITIVA.sql` - Solução definitiva para problemas
- `SOLUCAO_DEFINITIVA_CORRIGIDA.sql` - Solução definitiva (versão corrigida)
- `SOLUCAO_FINAL_SIMPLES.sql` - Solução final simplificada

### 📄 Documentação
- `acao-rapida-mvp.md` - Ação rápida para MVP
- `test-function.md` - Documentação de função de teste

## 🚀 Como Usar

### Execução Local
```bash
# Via Supabase CLI
supabase db reset --linked

# Via psql direto
psql -h [host] -U [user] -d [database] -f script.sql
```

### Execução via Dashboard Supabase
1. Acesse o dashboard do Supabase
2. Vá para SQL Editor
3. Cole o conteúdo do script
4. Execute

## ⚠️ Precauções

1. **Sempre faça backup** antes de executar scripts de correção
2. **Teste em ambiente de desenvolvimento** primeiro
3. **Verifique as permissões** necessárias
4. **Monitore os logs** após execução

## 📊 Status dos Scripts

| Script | Status | Última Execução | Responsável |
|--------|--------|-----------------|-------------|
| `create-webhook-tables.sql` | ✅ Ativo | - | - |
| `test-stripe-config.sql` | ✅ Ativo | - | - |
| `fix-subscription-data.sql` | ✅ Ativo | - | - |
| `auto-sync-monitor.sql` | ✅ Ativo | - | - |

## 🔄 Workflow de Manutenção

1. **Identificar problema** - Use scripts de verificação
2. **Testar solução** - Use scripts de teste
3. **Aplicar correção** - Use scripts de correção
4. **Monitorar** - Use scripts de monitoramento
5. **Documentar** - Atualize este README

## 📞 Contato

Para dúvidas sobre scripts, consulte a documentação do Supabase ou entre em contato com a equipe de desenvolvimento. 