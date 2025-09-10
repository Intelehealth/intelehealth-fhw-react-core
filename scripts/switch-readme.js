#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const README_GITHUB = 'README-GitHub.md';
const README_NPM = 'README-NPM.md';
const README_MAIN = 'README.md';

function switchReadme(platform) {
  const sourceFile = platform === 'github' ? README_GITHUB : README_NPM;
  const targetFile = README_MAIN;

  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Source file ${sourceFile} not found`);
    process.exit(1);
  }

  try {
    // Read the source file
    const content = fs.readFileSync(sourceFile, 'utf8');

    // Write to main README
    fs.writeFileSync(targetFile, content);

    console.log(`✅ Switched README to ${platform} version`);
    console.log(`   Source: ${sourceFile}`);
    console.log(`   Target: ${targetFile}`);
  } catch (error) {
    console.error(`❌ Error switching README: ${error.message}`);
    process.exit(1);
  }
}

function showUsage() {
  console.log('Usage: node scripts/switch-readme.js <platform>');
  console.log('');
  console.log('Platforms:');
  console.log('  github  - Switch to GitHub-focused README');
  console.log('  npm     - Switch to NPM-focused README');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/switch-readme.js github');
  console.log('  node scripts/switch-readme.js npm');
}

// Main execution
const platform = process.argv[2];

if (!platform) {
  showUsage();
  process.exit(1);
}

if (platform === 'github' || platform === 'npm') {
  switchReadme(platform);
} else {
  console.error(`❌ Invalid platform: ${platform}`);
  showUsage();
  process.exit(1);
}
