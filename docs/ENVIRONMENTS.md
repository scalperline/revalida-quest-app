# Ambientes de Desenvolvimento - RevalidaQuest

Este documento descreve a configuração e isolamento dos diferentes ambientes de desenvolvimento.

## 🌍 Ambientes Disponíveis

### 🚀 Produção (Production)
- **URL**: https://revalidaquest.com
- **Supabase**: Projeto de produção
- **Stripe**: Conta de produção
- **Domínio**: revalidaquest.com

### 🧪 Teste (Staging)
- **URL**: https://staging.revalidaquest.com
- **Supabase**: Projeto de staging
- **Stripe**: Conta de teste
- **Domínio**: staging.revalidaquest.com

### 💻 Desenvolvimento (Development)
- **URL**: http://localhost:5173
- **Supabase**: Projeto local ou de desenvolvimento
- **Stripe**: Conta de teste
- **Domínio**: localhost

## 🔧 Configuração por Ambiente

### Variáveis de Ambiente

#### Produção (.env.production)
```bash
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-production-key
VITE_APP_ENV=production
VITE_APP_URL=https://revalidaquest.com
```

#### Staging (.env.staging)
```bash
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-staging-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-staging-key
VITE_APP_ENV=staging
VITE_APP_URL=https://staging.revalidaquest.com
```

#### Desenvolvimento (.env.development)
```bash
VITE_SUPABASE_URL=https://your-dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-dev-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-dev-key
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173
```

### Configuração do Supabase

#### Produção
- **Database**: postgresql://production-db
- **Storage**: production-bucket
- **Edge Functions**: Production functions
- **RLS**: Ativo com políticas de produção

#### Staging
- **Database**: postgresql://staging-db
- **Storage**: staging-bucket
- **Edge Functions**: Staging functions
- **RLS**: Ativo com políticas de teste

#### Desenvolvimento
- **Database**: postgresql://dev-db ou local
- **Storage**: dev-bucket
- **Edge Functions**: Dev functions
- **RLS**: Ativo com políticas de desenvolvimento

## 🚀 Scripts de Deploy

### Desenvolvimento
```bash
npm run dev
# ou
bun dev
```

### Staging
```bash
npm run build:staging
npm run deploy:staging
```

### Produção
```bash
npm run build:production
npm run deploy:production
```

## 🔒 Isolamento de Dados

### Banco de Dados
- **Produção**: Dados reais dos usuários
- **Staging**: Dados de teste (pode ser resetado)
- **Desenvolvimento**: Dados de desenvolvimento (pode ser resetado)

### Storage
- **Produção**: Arquivos reais dos usuários
- **Staging**: Arquivos de teste
- **Desenvolvimento**: Arquivos de desenvolvimento

### Stripe
- **Produção**: Conta real, cobranças reais
- **Staging**: Conta de teste, cobranças simuladas
- **Desenvolvimento**: Conta de teste, cobranças simuladas

## 📊 Monitoramento

### Produção
- **Logs**: Supabase logs + aplicação
- **Métricas**: Stripe Dashboard + Supabase Analytics
- **Alertas**: Email/Slack para erros críticos

### Staging
- **Logs**: Supabase logs + aplicação
- **Métricas**: Supabase Analytics
- **Alertas**: Email para erros

### Desenvolvimento
- **Logs**: Console local
- **Métricas**: Supabase Analytics (opcional)
- **Alertas**: Console

## 🔄 Workflow de Deploy

### 1. Desenvolvimento → Staging
```bash
# 1. Criar branch de staging
git checkout -b staging/feature-name

# 2. Fazer alterações
# ... código ...

# 3. Testes locais
npm run test
npm run test:e2e

# 4. Push para staging
git push origin staging/feature-name

# 5. Deploy para staging
npm run deploy:staging
```

### 2. Staging → Produção
```bash
# 1. Testes em staging
# ... testes manuais e automatizados ...

# 2. Merge para main
git checkout main
git merge staging/feature-name

# 3. Deploy para produção
npm run deploy:production

# 4. Monitoramento pós-deploy
# ... verificar logs e métricas ...
```

## 🧪 Testes por Ambiente

### Desenvolvimento
- **Unit Tests**: ✅ Todos os testes
- **Integration Tests**: ✅ Com banco local
- **E2E Tests**: ✅ Com Playwright
- **Performance Tests**: ❌ Não aplicável

### Staging
- **Unit Tests**: ✅ Todos os testes
- **Integration Tests**: ✅ Com banco de staging
- **E2E Tests**: ✅ Com Playwright
- **Performance Tests**: ✅ Testes básicos

### Produção
- **Unit Tests**: ❌ Não executados
- **Integration Tests**: ❌ Não executados
- **E2E Tests**: ✅ Smoke tests
- **Performance Tests**: ✅ Monitoramento contínuo

## 🔐 Segurança

### Produção
- **HTTPS**: Obrigatório
- **CORS**: Domínios específicos
- **Rate Limiting**: Ativo
- **Backup**: Automático diário

### Staging
- **HTTPS**: Obrigatório
- **CORS**: Domínios de teste
- **Rate Limiting**: Ativo
- **Backup**: Manual quando necessário

### Desenvolvimento
- **HTTPS**: Opcional (localhost)
- **CORS**: Permissivo
- **Rate Limiting**: Desabilitado
- **Backup**: Não aplicável

## 📝 Checklist de Deploy

### Para Staging
- [ ] Todos os testes passando
- [ ] Build sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados migrado
- [ ] Edge Functions deployadas
- [ ] Testes E2E em staging
- [ ] Documentação atualizada

### Para Produção
- [ ] Testes em staging aprovados
- [ ] Backup do banco de produção
- [ ] Variáveis de ambiente verificadas
- [ ] Rollback plan preparado
- [ ] Equipe notificada
- [ ] Monitoramento ativo
- [ ] Testes de smoke em produção

## 🆘 Troubleshooting

### Problemas Comuns

#### Erro de CORS
```bash
# Verificar configuração do Supabase
# Verificar VITE_APP_URL
# Verificar configuração de CORS no Supabase
```

#### Erro de Stripe
```bash
# Verificar chaves do Stripe
# Verificar webhooks configurados
# Verificar conta de teste vs produção
```

#### Erro de Banco de Dados
```bash
# Verificar conexão com Supabase
# Verificar RLS policies
# Verificar migrations aplicadas
```

## 📞 Contato

Para questões sobre ambientes:
- **DevOps**: devops@revalidaquest.com
- **Backend**: backend@revalidaquest.com
- **Frontend**: frontend@revalidaquest.com 