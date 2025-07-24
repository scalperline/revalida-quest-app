# 🎛️ Guia de Teste - Portal do Stripe

## 🎯 **OBJETIVO**
Testar se o portal do Stripe abre corretamente para cancelamento/gerenciamento de assinatura sem fazer pagamentos reais.

## 📋 **PRÉ-REQUISITOS**

### **1. Verificar Dados do Usuário**
```sql
-- Execute no Supabase SQL Editor
SELECT 
    email,
    stripe_customer_id,
    subscribed,
    subscription_tier,
    subscription_end
FROM subscribers 
WHERE email = 'scalperline@gmail.com';
```

**Resultado esperado:**
- `stripe_customer_id` deve ser `cus_ShrB4v0DLU7t1z`
- `subscribed` deve ser `true`
- `subscription_tier` deve ser um valor válido (Premium, Pro, Basic, etc.)

### **2. Verificar Configuração do Stripe**
- ✅ `STRIPE_SECRET_KEY` configurada no Supabase
- ✅ Customer ID existe no Stripe Dashboard
- ✅ Assinatura ativa no Stripe

## 🔧 **FASE 1: Teste da Função customer-portal**

### **1.1 Teste via Supabase Dashboard**
```bash
# No Supabase Dashboard:
1. Vá para "Edge Functions"
2. Clique em "customer-portal"
3. Clique em "Invoke"
4. Adicione header: {"Authorization": "Bearer SEU_TOKEN"}
5. Clique "Invoke"
6. Verifique se retorna URL do portal
```

### **1.2 Obter Token de Acesso**
```bash
# Faça login no frontend com scalperline@gmail.com
# Abra o console do navegador e execute:
const { session } = useAuth();
console.log('Access Token:', session?.access_token);
```

### **1.3 Teste via cURL**
```bash
# Substitua SEU_TOKEN pelo token obtido acima
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/customer-portal' \
  -H 'Authorization: Bearer SEU_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:3000'
```

**Resposta esperada:**
```json
{
  "url": "https://billing.stripe.com/session/xxx"
}
```

## 🔧 **FASE 2: Teste da Função Simplificada**

### **2.1 Teste da Função test-customer-portal-simple**
```bash
# Esta função não requer autenticação e usa dados fixos
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-customer-portal-simple' \
  -H 'Content-Type: application/json'
```

**Resposta esperada:**
```json
{
  "success": true,
  "url": "https://billing.stripe.com/session/xxx",
  "data": {
    "customerId": "cus_ShrB4v0DLU7t1z",
    "email": "scalperline@gmail.com",
    "tier": "Premium"
  }
}
```

## 🔧 **FASE 3: Teste via Frontend**

### **3.1 Teste do Hook useSubscription**
```typescript
// No console do navegador, execute:
const { openCustomerPortal } = useSubscription();

try {
  const url = await openCustomerPortal();
  console.log('Portal URL:', url);
  
  // Abrir portal em nova aba
  window.open(url, '_blank');
} catch (error) {
  console.error('Erro ao abrir portal:', error);
}
```

### **3.2 Teste do Componente de Cancelamento**
```typescript
// Verificar se o botão de cancelamento funciona
// 1. Vá para a página de perfil
// 2. Clique em "Cancelar Assinatura"
// 3. Confirme no modal
// 4. Verifique se o portal abre
```

## 🔍 **FASE 4: Verificação de Logs**

### **4.1 Verificar Logs da Função**
```bash
# No Supabase Dashboard:
1. Vá para "Edge Functions"
2. Clique em "customer-portal"
3. Clique em "Logs"
4. Execute a função e veja os logs em tempo real
```

**Logs esperados:**
```
[customer-portal] Function started
[customer-portal] Authorization header found
[customer-portal] User authenticated {"userId":"xxx","email":"scalperline@gmail.com"}
[customer-portal] Fetching subscriber data {"email":"scalperline@gmail.com"}
[customer-portal] Subscriber data retrieved {"hasData":true,"stripeCustomerId":"cus_ShrB4v0DLU7t1z","subscribed":true,"tier":"Premium"}
[customer-portal] Stripe customer ID found {"customerId":"cus_ShrB4v0DLU7t1z"}
[customer-portal] Stripe client created
[customer-portal] Creating portal session {"origin":"http://localhost:3000","customerId":"cus_ShrB4v0DLU7t1z"}
[customer-portal] Portal session created successfully {"sessionId":"bps_xxx","url":"https://billing.stripe.com/session/xxx"}
```

### **4.2 Verificar Logs da Função Simplificada**
```bash
# No Supabase Dashboard:
1. Vá para "Edge Functions"
2. Clique em "test-customer-portal-simple"
3. Clique em "Logs"
4. Execute a função e veja os logs
```

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Problema: Erro 500 na função**
```bash
# Verificar variáveis de ambiente
# No Supabase Dashboard → Settings → Edge Functions
# Verificar se STRIPE_SECRET_KEY está configurada

# Verificar se customer ID existe no Stripe
# Acesse https://dashboard.stripe.com/customers
# Procure por cus_ShrB4v0DLU7t1z
```

### **Problema: "No subscription data found"**
```sql
-- Verificar se dados existem no banco
SELECT * FROM subscribers WHERE email = 'scalperline@gmail.com';
```

### **Problema: "No Stripe customer ID found"**
```sql
-- Verificar se customer ID está preenchido
SELECT stripe_customer_id FROM subscribers WHERE email = 'scalperline@gmail.com';
```

### **Problema: "Stripe configuration error"**
```bash
# Verificar se STRIPE_SECRET_KEY está correta
# Deve começar com sk_live_ ou sk_test_
# Testar no Stripe Dashboard
```

## 📊 **TESTE DE DIFERENTES CENÁRIOS**

### **Cenário 1: Usuário Premium**
```sql
-- Configurar usuário Premium
UPDATE subscribers 
SET subscription_tier = 'Premium', subscribed = true, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
```

### **Cenário 2: Usuário Basic**
```sql
-- Configurar usuário Basic
UPDATE subscribers 
SET subscription_tier = 'Basic', subscribed = true, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
```

### **Cenário 3: Usuário sem assinatura**
```sql
-- Configurar usuário sem assinatura
UPDATE subscribers 
SET subscribed = false, subscription_tier = NULL, updated_at = NOW()
WHERE email = 'scalperline@gmail.com';
```

## 🎯 **VERIFICAÇÃO FINAL**

### **✅ Teste Passou se:**
- [ ] Função retorna URL do portal
- [ ] Portal abre sem erro
- [ ] Usuário consegue ver opções de cancelamento
- [ ] Logs mostram sucesso
- [ ] Frontend integra corretamente

### **❌ Problemas Comuns:**
- [ ] Erro 500 na função
- [ ] Customer ID não encontrado
- [ ] Configuração do Stripe incorreta
- [ ] Dados inconsistentes no banco
- [ ] Token de autenticação inválido

## 📞 **COMANDOS ÚTEIS**

### **Testar Conectividade com Stripe**
```bash
# Testar função de conexão
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-stripe-connection' \
  -H 'Content-Type: application/json'
```

### **Verificar Status da Função**
```bash
# Testar se função está acessível
curl -X GET 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/customer-portal' \
  -H 'Authorization: Bearer SEU_TOKEN'
```

### **Testar com Dados Específicos**
```bash
# Testar função simplificada
curl -X POST 'https://wcgqqvfdjpslgxbuhwnm.supabase.co/functions/v1/test-customer-portal-simple' \
  -H 'Content-Type: application/json'
```

---

## 🎯 **PRÓXIMOS PASSOS**

### **Após teste bem-sucedido:**
1. **Testar cancelamento real** (opcional)
2. **Verificar webhook de cancelamento**
3. **Testar renovação de assinatura**
4. **Implementar monitoramento**
5. **Configurar alertas**

### **Para problemas persistentes:**
1. **Verificar logs detalhados**
2. **Testar com Stripe CLI**
3. **Verificar configuração do webhook**
4. **Contatar suporte do Stripe** 