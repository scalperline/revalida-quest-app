import { createClient } from '@supabase/supabase-js';
import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

// Configuração do cliente Supabase para testes
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'test-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Dados de teste
export const testUser = {
  email: 'test@revalidaquest.com',
  password: 'testpassword123',
  name: 'Test User'
};

export const testSubscription = {
  stripe_customer_id: 'cus_test123',
  stripe_subscription_id: 'sub_test123',
  status: 'active',
  plan_type: 'premium'
};

// Limpeza do banco de dados de teste
export async function cleanupTestData() {
  try {
    // Limpar dados de teste
    await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', testUser.email);
    
    await supabase
      .from('user_achievements')
      .delete()
      .eq('user_id', testUser.email);
    
    await supabase
      .from('user_missions')
      .delete()
      .eq('user_id', testUser.email);
    
    await supabase
      .from('subscriptions')
      .delete()
      .eq('stripe_customer_id', testSubscription.stripe_customer_id);
    
    // Limpar usuário de teste
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.auth.admin.deleteUser(user.id);
    }
  } catch (error) {
    console.error('Erro na limpeza de dados de teste:', error);
  }
}

// Setup global para testes de integração
beforeAll(async () => {
  // Configurar ambiente de teste
  console.log('🚀 Configurando ambiente de teste...');
});

afterAll(async () => {
  // Limpeza final
  await cleanupTestData();
  console.log('🧹 Limpeza final concluída');
});

beforeEach(async () => {
  // Limpeza antes de cada teste
  await cleanupTestData();
});

afterEach(async () => {
  // Limpeza após cada teste
  await cleanupTestData();
});

// Utilitários para testes
export const testUtils = {
  // Criar usuário de teste
  async createTestUser() {
    const { data, error } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: {
          name: testUser.name
        }
      }
    });
    
    if (error) throw error;
    return data;
  },
  
  // Fazer login com usuário de teste
  async loginTestUser() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testUser.email,
      password: testUser.password
    });
    
    if (error) throw error;
    return data;
  },
  
  // Criar assinatura de teste
  async createTestSubscription() {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([testSubscription])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Aguardar operação assíncrona
  async waitFor(condition: () => Promise<boolean>, timeout = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await condition()) return true;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Timeout aguardando condição');
  }
}; 