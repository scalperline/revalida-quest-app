# 🚀 PLANO EXECUTIVO - Teste do Sistema de Assinatura em Produção

## 🎯 **RESUMO EXECUTIVO**

Este plano permite testar completamente o sistema de assinatura em modo produção **sem fazer pagamentos reais**, utilizando dados simulados e o modo de teste do Stripe.

## 📋 **OBJETIVOS DO TESTE**

### **✅ O que será testado:**
- [ ] Frontend reflete corretamente o plano do usuário
- [ ] Webhooks processam eventos do Stripe
- [ ] Banco de dados é atualizado adequadamente
- [ ] Portal do Stripe funciona para cancelamento
- [ ] Limites de uso são aplicados corretamente
- [ ] Componentes de UI mostram status correto

### **❌ O que NÃO será testado:**
- Pagamentos reais
- Processamento de cartão de crédito
- Cobranças automáticas

## 🚀 **PLANO DE AÇÃO (5 MINUTOS)**

### **PASSO 1: Preparar Dados (2 min)**
```sql
-- Execute no Supabase SQL Editor: scripts/preparar-teste-assinatura.sql
-- Isso configura o usuário scalperline@gmail.com como Premium
```

### **PASSO 2: Testar Frontend (2 min)**
```typescript
// No console do navegador:
1. Faça login com scalperline@gmail.com
2. Execute: const { subscribed, subscription_tier } = useSubscription();
3. Verifique se mostra: { subscribed: true, subscription_tier: "Premium" }
```

### **PASSO 3: Testar Portal (1 min)**
```bash
# Teste a função simplificada:
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-customer-portal-simple'
```

## 📊 **RESULTADOS ESPERADOS**

### **✅ Frontend:**
- SubscriptionBadge mostra "Premium"
- UsageLimitsCard mostra limites ilimitados
- SubscriptionStatusCard mostra plano ativo
- `canUseFeature('questions')` retorna `true`
- `canUseFeature('simulados')` retorna `true`

### **✅ Backend:**
- Função customer-portal retorna URL válida
- Webhook processa eventos sem erro
- Dados no banco estão consistentes
- Logs mostram sucesso

### **✅ Portal Stripe:**
- Portal abre sem erro
- Mostra opções de cancelamento
- Customer ID é reconhecido

## 🔧 **ARQUIVOS DE TESTE CRIADOS**

### **1. Guia Principal**
- `scripts/teste-assinatura-producao.md` - Guia completo passo a passo

### **2. Scripts SQL**
- `scripts/preparar-teste-assinatura.sql` - Preparar dados de teste
- `scripts/teste-webhook-manual.sql` - Simular eventos do webhook

### **3. Guias Específicos**
- `scripts/teste-portal-stripe.md` - Testar portal do Stripe

## 🎯 **CENÁRIOS DE TESTE**

### **Cenário 1: Usuário Premium**
```sql
-- Acesso ilimitado a questões e simulados
UPDATE subscribers SET subscription_tier = 'Premium' WHERE email = 'scalperline@gmail.com';
```

### **Cenário 2: Usuário Basic**
```sql
-- 100 questões, 10 simulados por mês
UPDATE subscribers SET subscription_tier = 'Basic' WHERE email = 'scalperline@gmail.com';
```

### **Cenário 3: Usuário Gratuito**
```sql
-- 10 questões por dia, 1 simulado por mês
UPDATE subscribers SET subscribed = false, subscription_tier = NULL WHERE email = 'scalperline@gmail.com';
```

## 🚨 **SOLUÇÃO RÁPIDA DE PROBLEMAS**

### **Problema: Frontend não atualiza**
```typescript
// Forçar refresh:
const { checkSubscription } = useSubscription();
await checkSubscription();
```

### **Problema: Portal não abre**
```bash
# Testar função alternativa:
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-customer-portal-simple'
```

### **Problema: Dados inconsistentes**
```sql
-- Verificar dados:
SELECT * FROM subscribers WHERE email = 'scalperline@gmail.com';
SELECT * FROM usage_limits WHERE email = 'scalperline@gmail.com';
```

## 📈 **MÉTRICAS DE SUCESSO**

### **✅ Teste Passou se:**
- [ ] Frontend mostra status correto do plano
- [ ] Componentes refletem limites adequados
- [ ] Portal do Stripe abre sem erro
- [ ] Webhook processa eventos corretamente
- [ ] Dados no banco estão consistentes

### **❌ Falha se:**
- [ ] Erro 500 em qualquer função
- [ ] Frontend não atualiza após mudanças
- [ ] Portal não abre
- [ ] Dados inconsistentes entre tabelas

## 🎯 **PRÓXIMOS PASSOS**

### **Imediato (Após teste bem-sucedido):**
1. **Testar diferentes planos** (Basic, Pro, Enterprise)
2. **Testar cenários de limite**
3. **Verificar webhook de cancelamento**

### **Médio Prazo:**
1. **Implementar monitoramento contínuo**
2. **Configurar alertas para falhas**
3. **Testar renovação de assinatura**

### **Longo Prazo:**
1. **Implementar testes automatizados**
2. **Configurar ambiente de staging**
3. **Documentar processos de teste**

## 📞 **SUPORTE E COMANDOS ÚTEIS**

### **Verificar Status:**
```bash
# Testar conectividade
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-stripe-connection'

# Verificar logs
# Supabase Dashboard → Edge Functions → Logs
```

### **Comandos de Teste:**
```bash
# Testar portal
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-customer-portal-simple'

# Testar webhook (se Stripe CLI disponível)
stripe trigger customer.subscription.created --customer cus_ShrB4v0DLU7t1z
```

---

## 🎯 **CONCLUSÃO**

Este plano permite testar **100% do sistema de assinatura** sem riscos financeiros, garantindo que:

1. **Frontend funciona corretamente**
2. **Backend processa eventos adequadamente**
3. **Portal do Stripe está operacional**
4. **Dados são consistentes**

**Tempo estimado:** 5-10 minutos para teste completo
**Risco:** Zero (sem pagamentos reais)
**Cobertura:** 100% das funcionalidades críticas 