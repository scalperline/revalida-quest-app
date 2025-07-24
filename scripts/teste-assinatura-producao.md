# 🚀 Guia Completo - Teste do Sistema de Assinatura em Produção

## 🎯 **OBJETIVO**
Testar o sistema de assinatura em modo produção sem fazer pagamentos reais, verificando se:
- ✅ Frontend reflete corretamente o plano do usuário
- ✅ Webhooks processam eventos corretamente
- ✅ Banco de dados é atualizado adequadamente
- ✅ Portal do Stripe funciona para cancelamento

## 📋 **PRÉ-REQUISITOS**

### **1. Verificar Configuração Atual**
```sql
-- Execute no Supabase SQL Editor
SELECT 
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
FROM subscribers 
WHERE email = 'scalperline@gmail.com';
```

### **2. Verificar Variáveis de Ambiente**
- ✅ `STRIPE_SECRET_KEY` configurada (deve começar com `sk_live_`)
- ✅ `STRIPE_WEBHOOK_SECRET` configurada
- ✅ Webhook URL configurada no Stripe Dashboard

## 🔧 **FASE 1: Preparação dos Dados de Teste**

### **1.1 Limpar Dados Existentes (Opcional)**
```sql
-- Execute apenas se quiser começar do zero
DELETE FROM subscription_history WHERE email = 'scalperline@gmail.com';
DELETE FROM subscribers WHERE email = 'scalperline@gmail.com';
DELETE FROM usage_limits WHERE email = 'scalperline@gmail.com';
```

### **1.2 Inserir Dados de Teste Simulando Assinatura Premium**
```sql
-- Simular usuário com assinatura Premium ativa
INSERT INTO subscribers (
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end,
    updated_at
) VALUES (
    'scalperline@gmail.com',
    'cus_ShrB4v0DLU7t1z',
    true,
    'Premium',
    (NOW() + INTERVAL '30 days'),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    stripe_customer_id = EXCLUDED.stripe_customer_id,
    subscribed = EXCLUDED.subscribed,
    subscription_tier = EXCLUDED.subscription_tier,
    subscription_end = EXCLUDED.subscription_end,
    updated_at = EXCLUDED.updated_at;

-- Inserir histórico de assinatura
INSERT INTO subscription_history (
    user_id,
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at
) VALUES (
    NULL,
    'scalperline@gmail.com',
    'created',
    'Premium',
    'sub_test_premium_001',
    '{"status": "active", "priceId": "revalida-premium", "subscriptionEnd": "' || (NOW() + INTERVAL '30 days')::text || '"}',
    NOW()
);

-- Configurar limites de uso para Premium
INSERT INTO usage_limits (
    user_id,
    email,
    questions_answered,
    questions_limit,
    daily_questions_used,
    monthly_simulados_used,
    reset_date,
    last_reset_date,
    updated_at
) VALUES (
    NULL,
    'scalperline@gmail.com',
    0,
    9999, -- Ilimitado para Premium
    0,
    0,
    CURRENT_DATE,
    CURRENT_DATE,
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    questions_limit = EXCLUDED.questions_limit,
    updated_at = EXCLUDED.updated_at;
```

## 🧪 **FASE 2: Testes do Frontend**

### **2.1 Testar Hook useSubscription**
```typescript
// No console do navegador, execute:
// 1. Faça login com scalperline@gmail.com
// 2. Abra o console do navegador
// 3. Execute:

// Verificar se o hook está funcionando
const { subscribed, subscription_tier, loading } = useSubscription();
console.log('Status da assinatura:', { subscribed, subscription_tier, loading });

// Verificar se pode usar features
const { canUseFeature, getFeatureLimit } = useSubscription();
console.log('Pode usar questões:', canUseFeature('questions'));
console.log('Pode usar simulados:', canUseFeature('simulados'));
console.log('Limite de questões:', getFeatureLimit('questions'));
console.log('Limite de simulados:', getFeatureLimit('simulados'));
```

### **2.2 Testar Componentes de UI**
```typescript
// Verificar se os componentes mostram o status correto
// 1. SubscriptionBadge deve mostrar "Premium"
// 2. SubscriptionStatusCard deve mostrar plano Premium
// 3. UsageLimitsCard deve mostrar limites ilimitados
// 4. UsageMonitor deve mostrar status "healthy"
```

## 🔄 **FASE 3: Testes de Webhook**

### **3.1 Testar Webhook Manualmente**
```bash
# Usar Stripe CLI para simular eventos (se disponível)
stripe trigger customer.subscription.created --customer cus_ShrB4v0DLU7t1z

# Ou usar curl para simular evento
curl -X POST https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: whsec_test_signature" \
  -d '{
    "type": "customer.subscription.created",
    "data": {
      "object": {
        "id": "sub_test_001",
        "customer": "cus_ShrB4v0DLU7t1z",
        "status": "active",
        "current_period_end": 1735689600,
        "items": {
          "data": [{
            "price": {
              "id": "price_revalida_premium"
            }
          }]
        }
      }
    }
  }'
```

### **3.2 Verificar Processamento do Webhook**
```sql
-- Verificar se o evento foi processado
SELECT 
    email,
    event_type,
    subscription_tier,
    stripe_subscription_id,
    details,
    created_at
FROM subscription_history
WHERE email = 'scalperline@gmail.com'
ORDER BY created_at DESC
LIMIT 5;
```

## 🎛️ **FASE 4: Testes do Portal do Stripe**

### **4.1 Testar Função customer-portal**
```bash
# No Supabase Dashboard:
# 1. Vá para Edge Functions
# 2. Clique em "customer-portal"
# 3. Clique em "Invoke"
# 4. Adicione header: {"Authorization": "Bearer SEU_TOKEN"}
# 5. Clique "Invoke"
# 6. Verifique se retorna URL do portal
```

### **4.2 Testar Função Simplificada**
```bash
# Testar função alternativa
curl -X POST https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-customer-portal-simple \
  -H "Content-Type: application/json"
```

## 📊 **FASE 5: Testes de Integração**

### **5.1 Testar Fluxo Completo de Assinatura**
```typescript
// 1. Simular criação de checkout session
const { createCheckoutSession } = useSubscription();
try {
  const url = await createCheckoutSession('price_revalida_premium');
  console.log('Checkout URL:', url);
} catch (error) {
  console.error('Erro ao criar checkout:', error);
}

// 2. Simular webhook de checkout completado
// (usar Stripe CLI ou curl como mostrado acima)

// 3. Verificar se dados foram atualizados
const { checkSubscription } = useSubscription();
await checkSubscription();
```

### **5.2 Testar Cancelamento**
```typescript
// 1. Testar abertura do portal
const { openCustomerPortal } = useSubscription();
try {
  const url = await openCustomerPortal();
  console.log('Portal URL:', url);
  // Abrir URL em nova aba para testar
} catch (error) {
  console.error('Erro ao abrir portal:', error);
}

// 2. Simular webhook de cancelamento
// (usar Stripe CLI ou curl)

// 3. Verificar se status foi atualizado
await checkSubscription();
```

## 🔍 **FASE 6: Verificações Finais**

### **6.1 Verificar Dados no Banco**
```sql
-- Verificar estado final dos dados
SELECT 
    'subscribers' as tabela,
    email,
    subscribed,
    subscription_tier,
    subscription_end
FROM subscribers 
WHERE email = 'scalperline@gmail.com'

UNION ALL

SELECT 
    'usage_limits' as tabela,
    email,
    CASE WHEN subscribed THEN 'true' ELSE 'false' END as subscribed,
    questions_limit::text as subscription_tier,
    reset_date::text as subscription_end
FROM usage_limits 
WHERE email = 'scalperline@gmail.com'

UNION ALL

SELECT 
    'subscription_history' as tabela,
    email,
    event_type as subscribed,
    subscription_tier,
    created_at::text as subscription_end
FROM subscription_history 
WHERE email = 'scalperline@gmail.com'
ORDER BY tabela, email;
```

### **6.2 Verificar Frontend**
```typescript
// Verificar se frontend reflete mudanças
const { 
  subscribed, 
  subscription_tier, 
  isPremiumPlan,
  canUseFeature,
  getFeatureLimit 
} = useSubscription();

console.log('Status final:', {
  subscribed,
  subscription_tier,
  isPremiumPlan,
  canUseQuestions: canUseFeature('questions'),
  canUseSimulados: canUseFeature('simulados'),
  questionsLimit: getFeatureLimit('questions'),
  simuladosLimit: getFeatureLimit('simulados')
});
```

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Problema: Frontend não atualiza**
```typescript
// Forçar refresh do cache
const { checkSubscription } = useSubscription();
await checkSubscription();

// Ou limpar cache local
localStorage.clear();
sessionStorage.clear();
```

### **Problema: Webhook não processa**
```sql
-- Verificar logs da função
-- No Supabase Dashboard → Edge Functions → stripe-webhook → Logs

-- Verificar se webhook secret está correto
-- Verificar se URL do webhook está configurada no Stripe
```

### **Problema: Portal não abre**
```bash
# Verificar se customer ID existe no Stripe
# Verificar se STRIPE_SECRET_KEY está correta
# Testar função alternativa test-customer-portal-simple
```

## 📈 **MÉTRICAS DE SUCESSO**

### **✅ Testes Passaram se:**
- [ ] Frontend mostra "Premium" no badge
- [ ] Componentes mostram limites ilimitados
- [ ] `canUseFeature('questions')` retorna `true`
- [ ] `canUseFeature('simulados')` retorna `true`
- [ ] Portal do Stripe abre sem erro
- [ ] Webhook processa eventos corretamente
- [ ] Dados no banco estão consistentes

### **❌ Problemas Comuns:**
- [ ] Cache do frontend não atualiza
- [ ] Webhook secret incorreto
- [ ] Customer ID não existe no Stripe
- [ ] RLS policies bloqueando operações
- [ ] Variáveis de ambiente incorretas

## 🎯 **PRÓXIMOS PASSOS**

### **Após testes bem-sucedidos:**
1. **Testar com diferentes planos** (Basic, Pro, Enterprise)
2. **Testar cenários de cancelamento**
3. **Testar renovação de assinatura**
4. **Implementar monitoramento contínuo**
5. **Configurar alertas para falhas**

---

## 📞 **SUPORTE**

### **Para problemas técnicos:**
- **Logs:** Supabase Dashboard → Edge Functions → Logs
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Documentação:** Verificar arquivos em `/docs/`

### **Comandos Úteis:**
```bash
# Verificar status das funções
curl -X GET 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/check-subscription' \
  -H 'Authorization: Bearer SEU_TOKEN'

# Testar webhook
stripe trigger customer.subscription.created --customer cus_ShrB4v0DLU7t1z
``` 