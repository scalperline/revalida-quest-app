-- Script para testar e corrigir sincronização do webhook
-- Execute este script para verificar e corrigir dados de assinatura

-- 1. Verificar se há dados na tabela subscribers
SELECT 
  email,
  subscribed,
  subscription_tier,
  stripe_customer_id,
  subscription_end,
  updated_at
FROM subscribers 
ORDER BY updated_at DESC;

-- 2. Verificar histórico de assinaturas
SELECT 
  email,
  event_type,
  subscription_tier,
  stripe_subscription_id,
  details,
  created_at
FROM subscription_history 
ORDER BY created_at DESC
LIMIT 10;

-- 3. Verificar se há usuários sem dados de assinatura
SELECT 
  u.email,
  u.id as user_id,
  s.subscribed,
  s.subscription_tier
FROM auth.users u
LEFT JOIN subscribers s ON u.email = s.email
WHERE u.email IS NOT NULL
ORDER BY u.created_at DESC;

-- 4. Corrigir dados de assinatura para um email específico (substitua o email)
-- IMPORTANTE: Execute apenas se necessário e com o email correto
/*
INSERT INTO subscribers (email, subscribed, subscription_tier, stripe_customer_id, updated_at)
VALUES ('SEU_EMAIL_AQUI@gmail.com', true, 'Premium', 'cus_STRIPE_CUSTOMER_ID', NOW())
ON CONFLICT (email) 
DO UPDATE SET 
  subscribed = EXCLUDED.subscribed,
  subscription_tier = EXCLUDED.subscription_tier,
  stripe_customer_id = EXCLUDED.stripe_customer_id,
  updated_at = EXCLUDED.updated_at;
*/

-- 5. Verificar se RLS está funcionando corretamente
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename IN ('subscribers', 'subscription_history')
AND schemaname = 'public';

-- 6. Listar políticas RLS ativas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('subscribers', 'subscription_history');