#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log(
  '🔗 Setting up intelehealth-fhw-react-core for local development...'
);

// Check if we're in the right directory
if (!fs.existsSync('package.json') || !fs.existsSync('src')) {
  console.error(
    '❌ Error: Please run this script from the intelehealth-fhw-react-core root directory'
  );
  process.exit(1);
}

try {
  // Build the library first
  console.log('📦 Building the library...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create global link
  console.log('🔗 Creating global link...');
  execSync('npm link', { stdio: 'inherit' });

  console.log('✅ Library linked globally!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Go to your React/React Native app directory');
  console.log('2. Run: npm link @intelehealth/intelehealth-fhw-react-core');
  console.log('3. Start development:');
  console.log(
    '   - Library: npm run dev (in intelehealth-fhw-react-core directory)'
  );
  console.log('   - Your app: npm start (in your app directory)');
  console.log('');
  console.log('🔄 To unlink later:');
  console.log(
    '   - From your app: npm unlink @intelehealth/intelehealth-fhw-react-core'
  );
  console.log('   - From library: npm unlink');
} catch (error) {
  console.error('❌ Failed to set up development environment:', error.message);
  process.exit(1);
}
