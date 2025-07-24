-- Script para corrigir sincronização da assinatura do Gabriel A C Bezerra
-- Baseado nos dados observados no Stripe e Supabase

-- 1. Verificar dados atuais do usuário
SELECT 
  'Dados atuais na tabela subscribers:' as info;
  
SELECT 
  email,
  subscribed,
  subscription_tier,
  stripe_customer_id,
  subscription_end,
  updated_at
FROM subscribers 
WHERE email = 'oabquestion@gmail.com';

-- 2. Verificar se existe na tabela subscription_history
SELECT 
  'Histórico de assinaturas:' as info;
  
SELECT 
  email,
  event_type,
  subscription_tier,
  stripe_subscription_id,
  details,
  created_at
FROM subscription_history 
WHERE email = 'oabquestion@gmail.com'
ORDER BY created_at DESC;

-- 3. Verificar dados do usuário na tabela auth.users
SELECT 
  'Dados do usuário na auth.users:' as info;
  
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users 
WHERE email = 'oabquestion@gmail.com';

-- 4. Corrigir dados na tabela subscribers
-- IMPORTANTE: Execute apenas se necessário
INSERT INTO subscribers (
  email, 
  subscribed, 
  subscription_tier, 
  stripe_customer_id, 
  subscription_end,
  updated_at
)
VALUES (
  'oabquestion@gmail.com', 
  true, 
  'Premium', 
  'cus_QqGJJhJhJhJhJhJh', -- Substitua pelo ID real do Stripe
  NOW() + INTERVAL '1 month', -- Assinatura válida por 1 mês
  NOW()
)
ON CONFLICT (email) 
DO UPDATE SET 
  subscribed = EXCLUDED.subscribed,
  subscription_tier = EXCLUDED.subscription_tier,
  stripe_customer_id = EXCLUDED.stripe_customer_id,
  subscription_end = EXCLUDED.subscription_end,
  updated_at = EXCLUDED.updated_at;

-- 5. Adicionar entrada no histórico
INSERT INTO subscription_history (
  user_id,
  email,
  event_type,
  subscription_tier,
  stripe_subscription_id,
  details
)
SELECT 
  u.id,
  'oabquestion@gmail.com',
  'manual_correction',
  'Premium',
  'sub_manual_correction',
  jsonb_build_object(
    'status', 'manual_correction',
    'reason', 'Correção manual após falha de sincronização',
    'stripe_payment_amount', 2990, -- R$ 29,90 em centavos
    'corrected_at', NOW()
  )
FROM auth.users u
WHERE u.email = 'oabquestion@gmail.com';

-- 6. Verificar se a correção foi aplicada
SELECT 
  'Dados após correção:' as info;
  
SELECT 
  s.email,
  s.subscribed,
  s.subscription_tier,
  s.stripe_customer_id,
  s.subscription_end,
  s.updated_at,
  u.id as user_id
FROM subscribers s
JOIN auth.users u ON s.email = u.email
WHERE s.email = 'oabquestion@gmail.com';

-- 7. Verificar políticas RLS
SELECT 
  'Verificando políticas RLS:' as info;
  
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('subscribers', 'subscription_history')
AND schemaname = 'public';

-- 8. Testar consulta como usuário autenticado
-- Esta consulta simula o que o frontend faz
SELECT 
  'Teste de consulta do frontend:' as info;
  
SELECT 
  subscribed,
  subscription_tier,
  subscription_end
FROM subscribers 
WHERE email = 'oabquestion@gmail.com';

-- 9. Limpar cache se necessário
-- Execute no frontend: localStorage.clear(); sessionStorage.clear();

SELECT 'Correção concluída! Teste no frontend agora.' as resultado;