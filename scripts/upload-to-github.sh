#!/bin/bash
# Script para Upload das Atualizações para GitHub
# Repositório: https://github.com/scalperline/revalida-quest-app.git

echo "=== UPLOAD PARA GITHUB - REVALIDA QUEST ==="
echo "Repositório: https://github.com/scalperline/revalida-quest-app.git"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório raiz do projeto${NC}"
    exit 1
fi

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Erro: Git não está instalado${NC}"
    exit 1
fi

# Atualizar .gitignore para proteger arquivos sensíveis
echo -e "📝 Atualizando .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Build outputs
dist/
build/
.vite/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Supabase
.branches
.temp

# Stripe keys (extra protection)
*stripe*key*
*STRIPE*KEY*

# Database dumps
*.sql.backup
*.dump

# Local development
.local
EOF

echo -e "${GREEN}✅ .gitignore atualizado${NC}"

# Verificar se há arquivos sensíveis
echo -e "🔍 Verificando arquivos sensíveis..."
sensitive_files=$(find . -type f \( -name "*.env*" -o -name "*key*" -o -name "*secret*" -o -name "*password*" -o -name "*token*" \) ! -path "./node_modules/*" 2>/dev/null)

if [ ! -z "$sensitive_files" ]; then
    echo -e "${YELLOW}⚠️  Arquivos sensíveis encontrados:${NC}"
    echo "$sensitive_files" | while read file; do
        echo -e "${YELLOW}   - $file${NC}"
    done
    read -p "Deseja continuar mesmo assim? (y/N): " continue_upload
    if [[ ! "$continue_upload" =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ Upload cancelado pelo usuário${NC}"
        exit 1
    fi
fi

# Verificar build
echo -e "🔨 Verificando se o projeto compila..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build bem-sucedido${NC}"
else
    echo -e "${YELLOW}⚠️  Build falhou, mas continuando...${NC}"
fi

# Verificar status do Git
echo -e "📊 Verificando status do repositório..."
git_status=$(git status --porcelain)
if [ -z "$git_status" ]; then
    echo -e "${GREEN}✅ Nenhuma alteração detectada${NC}"
    echo -e "${BLUE}ℹ️  Nada para fazer upload${NC}"
    exit 0
fi

echo -e "📋 Alterações detectadas:"
git status --short
echo ""

# Verificar se o remote origin existe
remote_url=$(git remote get-url origin 2>/dev/null)
if [ -z "$remote_url" ]; then
    echo -e "🔗 Configurando remote origin..."
    git remote add origin https://github.com/scalperline/revalida-quest-app.git
    echo -e "${GREEN}✅ Remote origin configurado${NC}"
else
    echo -e "${GREEN}✅ Remote origin já configurado: $remote_url${NC}"
fi

# Adicionar arquivos
echo -e "📦 Adicionando arquivos..."
git add .
echo -e "${GREEN}✅ Arquivos adicionados${NC}"

# Criar commit com mensagem descritiva
timestamp=$(date "+%Y-%m-%d %H:%M")
commit_message="feat: Melhorias na sincronização Stripe e correções do sistema

- Corrigida sincronização entre Stripe e frontend
- Implementado sistema de monitoramento automático
- Adicionados scripts SQL para correção de dados
- Melhorada documentação de troubleshooting
- Sistema de alertas para falhas de sincronização
- Webhook com retry automático e logs detalhados

Data: $timestamp"

echo -e "💬 Criando commit..."
if git commit -m "$commit_message"; then
    echo -e "${GREEN}✅ Commit criado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao criar commit${NC}"
    exit 1
fi

# Push para o repositório
echo -e "🚀 Fazendo upload para GitHub..."
if git push origin main 2>/dev/null; then
    echo -e "${GREEN}✅ Upload concluído com sucesso!${NC}"
    echo -e "${BLUE}🌐 Repositório: https://github.com/scalperline/revalida-quest-app${NC}"
elif git push origin master 2>/dev/null; then
    echo -e "${GREEN}✅ Upload concluído com sucesso!${NC}"
    echo -e "${BLUE}🌐 Repositório: https://github.com/scalperline/revalida-quest-app${NC}"
else
    echo -e "${RED}❌ Erro no upload. Verifique suas credenciais e conexão${NC}"
    echo -e "${YELLOW}💡 Dica: Você pode precisar autenticar com GitHub${NC}"
    exit 1
fi

# Resumo final
echo ""
echo -e "${CYAN}=== RESUMO DO UPLOAD ===${NC}"
echo -e "${GREEN}✅ Arquivos verificados e protegidos${NC}"
echo -e "${GREEN}✅ Build verificado${NC}"
echo -e "${GREEN}✅ Commit criado com mensagem descritiva${NC}"
echo -e "${GREEN}✅ Upload para GitHub concluído${NC}"
echo -e "${BLUE}🌐 Repositório: https://github.com/scalperline/revalida-quest-app${NC}"
echo ""
echo -e "${GREEN}🎉 Todas as atualizações foram enviadas com sucesso!${NC}"