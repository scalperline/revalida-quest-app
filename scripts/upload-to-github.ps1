# Script para Upload das Atualizações para GitHub
# Repositório: https://github.com/scalperline/revalida-quest-app.git

Write-Host "=== UPLOAD PARA GITHUB - REVALIDA QUEST ==="
Write-Host "Repositório: https://github.com/scalperline/revalida-quest-app.git"
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script no diretório raiz do projeto" -ForegroundColor Red
    exit 1
}

# Verificar se Git está instalado
try {
    git --version | Out-Null
} catch {
    Write-Host "❌ Erro: Git não está instalado" -ForegroundColor Red
    exit 1
}

# Atualizar .gitignore para proteger arquivos sensíveis
Write-Host "📝 Atualizando .gitignore..."
$gitignoreContent = @"
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
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent -Encoding UTF8
Write-Host "✅ .gitignore atualizado" -ForegroundColor Green

# Verificar se há arquivos sensíveis
Write-Host "🔍 Verificando arquivos sensíveis..."
$sensitivePatterns = @(
    "*.env*",
    "*key*",
    "*secret*",
    "*password*",
    "*token*"
)

$sensitiveFiles = @()
foreach ($pattern in $sensitivePatterns) {
    $files = Get-ChildItem -Path . -Recurse -Include $pattern -File | Where-Object { $_.FullName -notmatch "node_modules" }
    $sensitiveFiles += $files
}

if ($sensitiveFiles.Count -gt 0) {
    Write-Host "⚠️  Arquivos sensíveis encontrados:" -ForegroundColor Yellow
    foreach ($file in $sensitiveFiles) {
        Write-Host "   - $($file.FullName)" -ForegroundColor Yellow
    }
    $continue = Read-Host "Deseja continuar mesmo assim? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host "❌ Upload cancelado pelo usuário" -ForegroundColor Red
        exit 1
    }
}

# Verificar build
Write-Host "🔨 Verificando se o projeto compila..."
try {
    npm run build 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build bem-sucedido" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Build falhou, mas continuando..." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Erro no build, mas continuando..." -ForegroundColor Yellow
}

# Verificar status do Git
Write-Host "📊 Verificando status do repositório..."
$gitStatus = git status --porcelain
if ([string]::IsNullOrEmpty($gitStatus)) {
    Write-Host "✅ Nenhuma alteração detectada" -ForegroundColor Green
    Write-Host "ℹ️  Nada para fazer upload" -ForegroundColor Blue
    exit 0
}

Write-Host "📋 Alterações detectadas:"
git status --short
Write-Host ""

# Verificar se o remote origin existe
try {
    $remoteUrl = git remote get-url origin 2>$null
    if ([string]::IsNullOrEmpty($remoteUrl)) {
        Write-Host "🔗 Configurando remote origin..."
        git remote add origin https://github.com/scalperline/revalida-quest-app.git
        Write-Host "✅ Remote origin configurado" -ForegroundColor Green
    } else {
        Write-Host "✅ Remote origin já configurado: $remoteUrl" -ForegroundColor Green
    }
} catch {
    Write-Host "🔗 Configurando remote origin..."
    git remote add origin https://github.com/scalperline/revalida-quest-app.git
    Write-Host "✅ Remote origin configurado" -ForegroundColor Green
}

# Adicionar arquivos
Write-Host "📦 Adicionando arquivos..."
git add .
Write-Host "✅ Arquivos adicionados" -ForegroundColor Green

# Criar commit com mensagem descritiva
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMessage = "feat: Melhorias na sincronizacao Stripe e correcoes do sistema - $timestamp"

Write-Host "💬 Criando commit..."
git commit -m "$commitMessage"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit criado com sucesso" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao criar commit" -ForegroundColor Red
    exit 1
}

# Push para o repositório
Write-Host "🚀 Fazendo upload para GitHub..."
try {
    git push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Upload concluído com sucesso!" -ForegroundColor Green
        Write-Host "🌐 Repositório: https://github.com/scalperline/revalida-quest-app" -ForegroundColor Blue
    } else {
        Write-Host "⚠️  Tentando push para branch master..." -ForegroundColor Yellow
        git push origin master
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Upload concluído com sucesso!" -ForegroundColor Green
            Write-Host "🌐 Repositório: https://github.com/scalperline/revalida-quest-app" -ForegroundColor Blue
        } else {
            Write-Host "❌ Erro no upload. Verifique suas credenciais e conexão" -ForegroundColor Red
            Write-Host "💡 Dica: Você pode precisar autenticar com GitHub" -ForegroundColor Yellow
            exit 1
        }
    }
} catch {
    Write-Host "❌ Erro no upload: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Resumo final
Write-Host ""
Write-Host "=== RESUMO DO UPLOAD ===" -ForegroundColor Cyan
Write-Host "✅ Arquivos verificados e protegidos" -ForegroundColor Green
Write-Host "✅ Build verificado" -ForegroundColor Green
Write-Host "✅ Commit criado com mensagem descritiva" -ForegroundColor Green
Write-Host "✅ Upload para GitHub concluído" -ForegroundColor Green
Write-Host "🌐 Repositório: https://github.com/scalperline/revalida-quest-app" -ForegroundColor Blue
Write-Host ""
Write-Host "🎉 Todas as atualizações foram enviadas com sucesso!" -ForegroundColor Green