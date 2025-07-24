import { test, expect } from '@playwright/test';

test.describe('Fluxo de Autenticação - E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
  });

  test('deve permitir registro de novo usuário', async ({ page }) => {
    // Clicar no botão de registro
    await page.click('[data-testid="register-button"]');
    
    // Preencher formulário de registro
    await page.fill('[data-testid="email-input"]', 'test@revalidaquest.com');
    await page.fill('[data-testid="password-input"]', 'TestPassword123!');
    await page.fill('[data-testid="name-input"]', 'Test User');
    
    // Submeter formulário
    await page.click('[data-testid="submit-button"]');
    
    // Verificar redirecionamento para dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verificar se o usuário está logado
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('deve permitir login de usuário existente', async ({ page }) => {
    // Clicar no botão de login
    await page.click('[data-testid="login-button"]');
    
    // Preencher credenciais
    await page.fill('[data-testid="email-input"]', 'existing@revalidaquest.com');
    await page.fill('[data-testid="password-input"]', 'ExistingPassword123!');
    
    // Fazer login
    await page.click('[data-testid="submit-button"]');
    
    // Verificar redirecionamento
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verificar se está logado
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('deve mostrar erro para credenciais inválidas', async ({ page }) => {
    // Clicar no botão de login
    await page.click('[data-testid="login-button"]');
    
    // Preencher credenciais inválidas
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    
    // Tentar fazer login
    await page.click('[data-testid="submit-button"]');
    
    // Verificar mensagem de erro
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Credenciais inválidas');
  });

  test('deve permitir logout', async ({ page }) => {
    // Fazer login primeiro
    await page.click('[data-testid="login-button"]');
    await page.fill('[data-testid="email-input"]', 'test@revalidaquest.com');
    await page.fill('[data-testid="password-input"]', 'TestPassword123!');
    await page.click('[data-testid="submit-button"]');
    
    // Aguardar carregamento do dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Abrir menu do usuário
    await page.click('[data-testid="user-menu"]');
    
    // Clicar em logout
    await page.click('[data-testid="logout-button"]');
    
    // Verificar redirecionamento para página inicial
    await expect(page).toHaveURL('/');
    
    // Verificar se não está mais logado
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
  });

  test('deve permitir recuperação de senha', async ({ page }) => {
    // Clicar no botão de login
    await page.click('[data-testid="login-button"]');
    
    // Clicar em "Esqueci minha senha"
    await page.click('[data-testid="forgot-password-link"]');
    
    // Preencher email
    await page.fill('[data-testid="email-input"]', 'test@revalidaquest.com');
    
    // Enviar email de recuperação
    await page.click('[data-testid="submit-button"]');
    
    // Verificar mensagem de sucesso
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Email enviado');
  });

  test('deve validar formulários corretamente', async ({ page }) => {
    // Testar registro com dados inválidos
    await page.click('[data-testid="register-button"]');
    
    // Tentar submeter formulário vazio
    await page.click('[data-testid="submit-button"]');
    
    // Verificar mensagens de validação
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
    
    // Testar email inválido
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.click('[data-testid="submit-button"]');
    
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Email inválido');
    
    // Testar senha fraca
    await page.fill('[data-testid="email-input"]', 'valid@email.com');
    await page.fill('[data-testid="password-input"]', '123');
    await page.click('[data-testid="submit-button"]');
    
    await expect(page.locator('[data-testid="password-error"]')).toContainText('Senha muito fraca');
  });

  test('deve manter sessão após refresh', async ({ page }) => {
    // Fazer login
    await page.click('[data-testid="login-button"]');
    await page.fill('[data-testid="email-input"]', 'test@revalidaquest.com');
    await page.fill('[data-testid="password-input"]', 'TestPassword123!');
    await page.click('[data-testid="submit-button"]');
    
    // Verificar que está logado
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Fazer refresh da página
    await page.reload();
    
    // Verificar que ainda está logado
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    await expect(page).toHaveURL(/\/dashboard/);
  });
}); 