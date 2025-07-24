#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configurações de limites
const LIMITS = {
  components: 300, // linhas
  hooks: 200,      // linhas
  pages: 400,      // linhas
  utils: 150,      // linhas
  data: 500        // linhas
};

// Extensões para analisar
const EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx'];

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.split('\n').length;
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error.message);
    return 0;
  }
}

function getFileType(filePath) {
  const dir = path.dirname(filePath);
  if (dir.includes('components')) return 'components';
  if (dir.includes('hooks')) return 'hooks';
  if (dir.includes('pages')) return 'pages';
  if (dir.includes('utils')) return 'utils';
  if (dir.includes('data')) return 'data';
  return 'other';
}

function auditDirectory(dirPath, results = []) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      auditDirectory(fullPath, results);
    } else if (EXTENSIONS.includes(path.extname(item))) {
      const lines = countLines(fullPath);
      const fileType = getFileType(fullPath);
      const limit = LIMITS[fileType] || 200;
      
      if (lines > limit) {
        results.push({
          file: fullPath,
          lines,
          limit,
          type: fileType,
          needsRefactor: lines > limit * 1.5
        });
      }
    }
  }
  
  return results;
}

function generateReport(results) {
  console.log('\n=== AUDITORIA DE TAMANHO DE ARQUIVOS ===\n');
  
  if (results.length === 0) {
    console.log('✅ Todos os arquivos estão dentro dos limites recomendados!');
    return;
  }
  
  // Agrupar por tipo
  const grouped = results.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});
  
  for (const [type, files] of Object.entries(grouped)) {
    console.log(`\n📁 ${type.toUpperCase()}:`);
    files.forEach(file => {
      const status = file.needsRefactor ? '🔴 URGENTE' : '🟡 ATENÇÃO';
      console.log(`  ${status} ${file.file} (${file.lines} linhas, limite: ${file.limit})`);
    });
  }
  
  console.log('\n=== RECOMENDAÇÕES ===');
  console.log('🔴 URGENTE: Refatorar imediatamente (mais de 150% do limite)');
  console.log('🟡 ATENÇÃO: Considerar refatoração (acima do limite)');
  console.log('\n=== LIMITES ATUAIS ===');
  Object.entries(LIMITS).forEach(([type, limit]) => {
    console.log(`${type}: ${limit} linhas`);
  });
}

// Executar auditoria
const srcPath = path.join(__dirname, '..', 'src');
const results = auditDirectory(srcPath);
generateReport(results);

// Salvar relatório em arquivo
const reportPath = path.join(__dirname, 'file-size-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n📄 Relatório salvo em: ${reportPath}`); 