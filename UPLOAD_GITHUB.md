# 📤 Guia de Upload para GitHub

## Repositório
**URL:** https://github.com/scalperline/revalida-quest-app.git

## 🚀 Métodos de Upload

### Método 1: Script Automatizado (Recomendado)

#### Para Windows (PowerShell)
```powershell
# Execute no diretório raiz do projeto
.\scripts\upload-to-github.ps1
```

#### Para Linux/Mac (Bash)
```bash
# Torne o script executável
chmod +x scripts/upload-to-github.sh

# Execute no diretório raiz do projeto
./scripts/upload-to-github.sh
```

### Método 2: Comandos Manuais

#### Pré-requisitos
- Git instalado
- Autenticação configurada no GitHub
- Node.js instalado

#### Passos

1. **Verificar status do projeto**
   ```bash
   # Verificar se há alterações
   git status
   
   # Verificar se o build funciona
   npm run build
   ```

2. **Configurar repositório (se necessário)**
   ```bash
   # Adicionar remote origin (apenas na primeira vez)
   git remote add origin https://github.com/scalperline/revalida-quest-app.git
   
   # Verificar remote
   git remote -v
   ```

3. **Adicionar arquivos**
   ```bash
   # Adicionar todos os arquivos
   git add .
   
   # Ou adicionar arquivos específicos
   git add src/ supabase/ scripts/
   ```

4. **Criar commit**
   ```bash
   git commit -m "feat: Melhorias na sincronização Stripe e correções do sistema
   
   - Corrigida sincronização entre Stripe e frontend
   - Implementado sistema de monitoramento automático
   - Adicionados scripts SQL para correção de dados
   - Melhorada documentação de troubleshooting
   - Sistema de alertas para falhas de sincronização
   - Webhook com retry automático e logs detalhados"
   ```

5. **Fazer upload**
   ```bash
   # Tentar push para main
   git push origin main
   
   # Se falhar, tentar master
   git push origin master
   ```

## 🔒 Verificações de Segurança

O script automatizado inclui as seguintes verificações:

- ✅ Atualização automática do `.gitignore`
- ✅ Verificação de arquivos sensíveis (`.env`, chaves, etc.)
- ✅ Verificação de build
- ✅ Proteção contra upload de credenciais

## 📋 Arquivos Incluídos no Upload

### ✅ Incluídos
- `src/` - Código fonte da aplicação
- `supabase/` - Configurações e funções do Supabase
- `scripts/` - Scripts de automação e correção
- `public/` - Arquivos públicos
- `package.json` e `package-lock.json`
- Arquivos de configuração (vite, tailwind, etc.)
- Documentação (README, guias, etc.)

### ❌ Excluídos (via .gitignore)
- `node_modules/` - Dependências
- `.env*` - Variáveis de ambiente
- `dist/` e `build/` - Arquivos de build
- Arquivos temporários e de cache
- Chaves e credenciais

## 🔧 Solução de Problemas

### Erro de Autenticação
```bash
# Configurar credenciais do Git
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"

# Para autenticação via token
git config --global credential.helper store
```

### Erro de Remote
```bash
# Remover remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/scalperline/revalida-quest-app.git
```

### Conflitos de Merge
```bash
# Fazer pull antes do push
git pull origin main --rebase

# Resolver conflitos e continuar
git rebase --continue

# Fazer push
git push origin main
```

### Erro de Branch
```bash
# Verificar branch atual
git branch

# Mudar para main (se necessário)
git checkout main

# Ou criar e mudar para main
git checkout -b main
```

## 📊 Verificação Pós-Upload

1. **Verificar no GitHub**
   - Acesse: https://github.com/scalperline/revalida-quest-app
   - Confirme que os arquivos foram atualizados
   - Verifique o commit mais recente

2. **Verificar Build Automático**
   - Se configurado, verifique se o build passou
   - Verifique se não há erros de sintaxe

3. **Testar Deploy**
   - Se houver deploy automático, verifique se funcionou
   - Teste a aplicação em produção

## 🎯 Resumo das Melhorias Implementadas

### Sistema de Sincronização Stripe
- ✅ Webhook melhorado com retry automático
- ✅ Logs detalhados para debugging
- ✅ Verificação dupla de sincronização
- ✅ Sistema de monitoramento automático

### Scripts de Correção
- ✅ `fix-gabriel-subscription.sql` - Correção específica
- ✅ `fix-subscription-sync.sql` - Correção geral
- ✅ `auto-sync-check.sql` - Verificação automática

### Documentação
- ✅ `TROUBLESHOOTING_STRIPE.md` atualizado
- ✅ Guias de upload e manutenção
- ✅ Scripts automatizados

### Sistema de Alertas
- ✅ Detecção automática de problemas
- ✅ Correção automática quando possível
- ✅ Logs para análise manual

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do script
2. Consulte a seção de solução de problemas
3. Verifique a documentação do GitHub
4. Execute os scripts de verificação SQL

---

**Última atualização:** $(Get-Date -Format "yyyy-MM-dd HH:mm")
**Repositório:** https://github.com/scalperline/revalida-quest-app.git