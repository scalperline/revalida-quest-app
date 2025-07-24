#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Dependências críticas para monitorar
const CRITICAL_DEPENDENCIES = {
  '@supabase/supabase-js': {
    current: '2.x',
    checkUrl: 'https://registry.npmjs.org/@supabase/supabase-js/latest',
    breakingChanges: ['3.0.0'],
    description: 'Cliente Supabase - mudanças podem afetar autenticação e queries'
  },
  '@stripe/stripe-js': {
    current: '2.x',
    checkUrl: 'https://registry.npmjs.org/@stripe/stripe-js/latest',
    breakingChanges: ['3.0.0'],
    description: 'Cliente Stripe - mudanças podem afetar pagamentos'
  },
  'react': {
    current: '18.x',
    checkUrl: 'https://registry.npmjs.org/react/latest',
    breakingChanges: ['19.0.0'],
    description: 'React - mudanças podem afetar toda a aplicação'
  },
  'vite': {
    current: '5.x',
    checkUrl: 'https://registry.npmjs.org/vite/latest',
    breakingChanges: ['6.0.0'],
    description: 'Vite - mudanças podem afetar build e dev server'
  }
};

// Função para fazer requisição HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

// Função para comparar versões
function compareVersions(current, latest) {
  const currentParts = current.split('.').map(Number);
  const latestParts = latest.split('.').map(Number);
  
  for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const latestPart = latestParts[i] || 0;
    
    if (latestPart > currentPart) return 'major';
    if (latestPart < currentPart) return 'older';
  }
  
  return 'same';
}

// Função para verificar se há breaking changes
function hasBreakingChanges(current, breakingChanges) {
  const currentMajor = parseInt(current.split('.')[0]);
  return breakingChanges.some(version => {
    const breakingMajor = parseInt(version.split('.')[0]);
    return breakingMajor > currentMajor;
  });
}

// Função principal de monitoramento
async function monitorDependencies() {
  console.log('🔍 Monitorando dependências críticas...\n');
  
  const results = [];
  
  for (const [packageName, config] of Object.entries(CRITICAL_DEPENDENCIES)) {
    try {
      console.log(`📦 Verificando ${packageName}...`);
      
      const response = await makeRequest(config.checkUrl);
      const latestVersion = response.version;
      const comparison = compareVersions(config.current, latestVersion);
      
      const result = {
        package: packageName,
        current: config.current,
        latest: latestVersion,
        comparison,
        hasBreakingChanges: hasBreakingChanges(config.current, config.breakingChanges),
        description: config.description,
        status: 'ok'
      };
      
      // Determinar status
      if (comparison === 'major') {
        result.status = 'warning';
        if (result.hasBreakingChanges) {
          result.status = 'critical';
        }
      }
      
      results.push(result);
      
      // Exibir resultado
      const statusIcon = {
        'ok': '✅',
        'warning': '⚠️',
        'critical': '🚨'
      }[result.status];
      
      console.log(`  ${statusIcon} ${packageName}: ${config.current} → ${latestVersion}`);
      
      if (result.status !== 'ok') {
        console.log(`     ${config.description}`);
        if (result.hasBreakingChanges) {
          console.log(`     ⚠️  Possíveis breaking changes detectadas!`);
        }
      }
      
    } catch (error) {
      console.error(`❌ Erro ao verificar ${packageName}:`, error.message);
      results.push({
        package: packageName,
        current: config.current,
        latest: 'unknown',
        comparison: 'error',
        hasBreakingChanges: false,
        description: config.description,
        status: 'error',
        error: error.message
      });
    }
  }
  
  return results;
}

// Função para gerar relatório
function generateReport(results) {
  console.log('\n📊 RELATÓRIO DE DEPENDÊNCIAS\n');
  
  const critical = results.filter(r => r.status === 'critical');
  const warnings = results.filter(r => r.status === 'warning');
  const errors = results.filter(r => r.status === 'error');
  const ok = results.filter(r => r.status === 'ok');
  
  if (critical.length > 0) {
    console.log('🚨 DEPENDÊNCIAS CRÍTICAS:');
    critical.forEach(r => {
      console.log(`  - ${r.package}: ${r.current} → ${r.latest}`);
      console.log(`    ${r.description}`);
    });
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  ATUALIZAÇÕES DISPONÍVEIS:');
    warnings.forEach(r => {
      console.log(`  - ${r.package}: ${r.current} → ${r.latest}`);
      console.log(`    ${r.description}`);
    });
    console.log('');
  }
  
  if (errors.length > 0) {
    console.log('❌ ERROS DE VERIFICAÇÃO:');
    errors.forEach(r => {
      console.log(`  - ${r.package}: ${r.error}`);
    });
    console.log('');
  }
  
  if (ok.length > 0) {
    console.log('✅ DEPENDÊNCIAS ATUALIZADAS:');
    ok.forEach(r => {
      console.log(`  - ${r.package}: ${r.current}`);
    });
    console.log('');
  }
  
  // Resumo
  console.log('📈 RESUMO:');
  console.log(`  Total: ${results.length}`);
  console.log(`  Críticas: ${critical.length}`);
  console.log(`  Avisos: ${warnings.length}`);
  console.log(`  Erros: ${errors.length}`);
  console.log(`  OK: ${ok.length}`);
  
  // Recomendações
  if (critical.length > 0) {
    console.log('\n🚨 AÇÕES RECOMENDADAS:');
    console.log('  1. Revisar breaking changes das dependências críticas');
    console.log('  2. Testar atualizações em ambiente de desenvolvimento');
    console.log('  3. Planejar migração gradual');
    console.log('  4. Atualizar documentação se necessário');
  } else if (warnings.length > 0) {
    console.log('\n⚠️  AÇÕES RECOMENDADAS:');
    console.log('  1. Considerar atualização das dependências');
    console.log('  2. Testar em ambiente de desenvolvimento');
    console.log('  3. Verificar compatibilidade');
  }
}

// Função para salvar relatório
function saveReport(results) {
  const reportPath = path.join(__dirname, 'dependency-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    results,
    summary: {
      total: results.length,
      critical: results.filter(r => r.status === 'critical').length,
      warnings: results.filter(r => r.status === 'warning').length,
      errors: results.filter(r => r.status === 'error').length,
      ok: results.filter(r => r.status === 'ok').length
    }
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Relatório salvo em: ${reportPath}`);
}

// Executar monitoramento
async function main() {
  try {
    const results = await monitorDependencies();
    generateReport(results);
    saveReport(results);
    
    // Retornar código de saída baseado no status
    const hasCritical = results.some(r => r.status === 'critical');
    const hasErrors = results.some(r => r.status === 'error');
    
    if (hasCritical || hasErrors) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro no monitoramento:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  monitorDependencies,
  generateReport,
  saveReport
}; 