# Guia de Troubleshooting - Sincronização Stripe

## Problema Identificado: Compra reconhecida pelo Stripe mas não refletida no frontend

### Situação Atual
- ✅ Stripe reconheceu a compra (Gabriel A C Bezerra - R$ 29,90)
- ✅ Dados na tabela `subscribers` do Supabase mostram usuário como Premium
- ❌ Frontend ainda exibe plano "Gratuito"
- ❌ Tabela `subscriptions` está vazia

### Análise do Problema

Baseado nas evidências das imagens fornecidas:

1. **Stripe Dashboard**: Mostra cliente com pagamento processado
2. **Supabase `subscribers`**: Usuário marcado como Premium
3. **Supabase `subscriptions`**: Tabela completamente vazia
4. **Frontend**: Ainda mostra plano gratuito

### Possíveis Causas

#### 1. Webhook não está sendo chamado corretamente
- URL do webhook pode estar incorreta
- Webhook pode estar falhando silenciosamente
- Eventos do Stripe não estão sendo processados

#### 2. Problema na função `getUserIdByEmail`
- Função pode não estar encontrando o usuário correto
- Mapeamento entre email do Stripe e usuário do Supabase

#### 3. Cache do frontend
- Dados de assinatura podem estar em cache
- Hook `useSubscription` não está atualizando

#### 4. Políticas RLS (Row Level Security)
- Usuário pode não ter permissão para ler seus próprios dados
- Políticas podem estar bloqueando a consulta

### Passos para Diagnóstico

#### 1. Verificar Logs do Webhook
```bash
# Verificar logs da função Stripe webhook
supabase functions logs stripe-webhook
```

#### 2. Testar Webhook Manualmente
```sql
-- Verificar se o usuário existe na tabela subscribers
SELECT * FROM subscribers WHERE email = 'oabquestion@gmail.com';

-- Verificar dados na tabela subscription_history
SELECT * FROM subscription_history WHERE email = 'oabquestion@gmail.com' ORDER BY created_at DESC;
```

#### 3. Forçar Sincronização Manual
```sql
-- Inserir dados manualmente para teste
INSERT INTO subscribers (email, subscribed, subscription_tier, stripe_customer_id, updated_at)
VALUES ('oabquestion@gmail.com', true, 'Premium', 'cus_STRIPE_CUSTOMER_ID', NOW())
ON CONFLICT (email) 
DO UPDATE SET 
  subscribed = EXCLUDED.subscribed,
  subscription_tier = EXCLUDED.subscription_tier,
  stripe_customer_id = EXCLUDED.stripe_customer_id,
  updated_at = EXCLUDED.updated_at;
```

#### 4. Verificar Configuração do Webhook no Stripe
- URL: `https://[SEU_PROJETO].supabase.co/functions/v1/stripe-webhook`
- Eventos necessários:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `checkout.session.completed`

### Soluções Implementadas

#### 1. Correção da função `getUserIdByEmail`
```typescript
// Função corrigida para usar a API de autenticação do Supabase
const getUserIdByEmail = async (email: string, supabaseClient: any): Promise<string | null> => {
  try {
    const { data, error } = await supabaseClient.auth.admin.listUsers();
    if (error) throw error;
    
    const user = data.users.find((u: any) => u.email === email);
    return user?.id || null;
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    return null;
  }
};
```

#### 2. Melhorias no Webhook
- Adicionados logs detalhados para debug
- Melhor tratamento de erros
- Determinação automática do tier baseado no price_id
- Validação de dados antes de inserir

#### 3. Componente de Debug
- Criado `SubscriptionDebug.tsx` para monitoramento em tempo real
- Função `forceSyncSubscription` para sincronização manual
- Visível apenas em modo de desenvolvimento

### Como Usar o Debug

1. **Componente de Debug**: Aparece no canto inferior direito em modo dev
2. **Botão "Forçar Sincronização"**: Atualiza dados manualmente
3. **Informações exibidas**:
   - Status da assinatura
   - Plano atual
   - Data de expiração
   - Limites de uso
   - Últimos erros

### Script de Teste SQL

Use o arquivo `scripts/test-webhook-sync.sql` para:
- Verificar dados nas tabelas
- Identificar problemas de sincronização
- Corrigir dados manualmente se necessário

### Próximos Passos

1. **Verificar logs do webhook** no Supabase
2. **Testar sincronização manual** usando o componente de debug
3. **Verificar configuração do webhook** no Stripe Dashboard
4. **Executar script de teste** para validar dados
5. **Monitorar próximas compras** para confirmar correção

### Contatos para Suporte

- **Stripe Dashboard**: Verificar eventos e logs
- **Supabase Dashboard**: Monitorar funções e tabelas
- **Logs de Desenvolvimento**: Console do navegador e terminal

---

**Última atualização**: $(date)
**Status**: Em investigação - Correções implementadas
**Prioridade**: Alta - Afeta conversões de pagamento