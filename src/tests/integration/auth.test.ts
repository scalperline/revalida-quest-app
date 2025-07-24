import { describe, it, expect, beforeEach } from 'vitest';
import { supabase, testUser, testUtils, cleanupTestData } from './setup';

describe('Autenticação - Testes de Integração', () => {
  beforeEach(async () => {
    await cleanupTestData();
  });

  describe('Registro de Usuário', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: testUser.email,
        password: testUser.password,
        options: {
          data: {
            name: testUser.name
          }
        }
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user?.email).toBe(testUser.email);
      expect(data.user?.user_metadata?.name).toBe(testUser.name);
    });

    it('deve falhar ao registrar usuário com email inválido', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: 'invalid-email',
        password: testUser.password
      });

      expect(error).toBeDefined();
      expect(data.user).toBeNull();
    });

    it('deve falhar ao registrar usuário com senha fraca', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: testUser.email,
        password: '123'
      });

      expect(error).toBeDefined();
      expect(data.user).toBeNull();
    });
  });

  describe('Login de Usuário', () => {
    beforeEach(async () => {
      await testUtils.createTestUser();
    });

    it('deve fazer login com credenciais válidas', async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testUser.email,
        password: testUser.password
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.session).toBeDefined();
    });

    it('deve falhar ao fazer login com senha incorreta', async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testUser.email,
        password: 'wrongpassword'
      });

      expect(error).toBeDefined();
      expect(data.user).toBeNull();
      expect(data.session).toBeNull();
    });

    it('deve falhar ao fazer login com email inexistente', async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'nonexistent@example.com',
        password: testUser.password
      });

      expect(error).toBeDefined();
      expect(data.user).toBeNull();
      expect(data.session).toBeNull();
    });
  });

  describe('Recuperação de Senha', () => {
    it('deve enviar email de recuperação para email válido', async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        testUser.email,
        {
          redirectTo: 'http://localhost:3000/reset-password'
        }
      );

      expect(error).toBeNull();
      expect(data).toBeDefined();
    });
  });

  describe('Logout', () => {
    beforeEach(async () => {
      await testUtils.createTestUser();
      await testUtils.loginTestUser();
    });

    it('deve fazer logout com sucesso', async () => {
      const { error } = await supabase.auth.signOut();

      expect(error).toBeNull();

      // Verificar se a sessão foi removida
      const { data: { session } } = await supabase.auth.getSession();
      expect(session).toBeNull();
    });
  });

  describe('Sessão do Usuário', () => {
    beforeEach(async () => {
      await testUtils.createTestUser();
      await testUtils.loginTestUser();
    });

    it('deve obter sessão atual do usuário', async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      expect(error).toBeNull();
      expect(session).toBeDefined();
      expect(session?.user.email).toBe(testUser.email);
    });

    it('deve obter usuário atual', async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      expect(error).toBeNull();
      expect(user).toBeDefined();
      expect(user?.email).toBe(testUser.email);
    });
  });
}); 