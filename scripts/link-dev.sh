#!/bin/bash

# Development linking script for ih-hw-core
# This script helps set up local development with React/React Native apps

echo "🔗 Setting up ih-hw-core for local development..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo "❌ Error: Please run this script from the ih-hw-core root directory"
    exit 1
fi

# Build the library first
echo "📦 Building the library..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the build errors first."
    exit 1
fi

# Create global link
echo "🔗 Creating global link..."
npm link

if [ $? -eq 0 ]; then
    echo "✅ Library linked globally!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to your React/React Native app directory"
    echo "2. Run: npm link @intelehealth/ih-hw-core"
    echo "3. Start development:"
    echo "   - Library: npm run dev (in ih-hw-core directory)"
    echo "   - Your app: npm start (in your app directory)"
    echo ""
    echo "🔄 To unlink later:"
    echo "   - From your app: npm unlink @intelehealth/ih-hw-core"
    echo "   - From library: npm unlink"
else
    echo "❌ Failed to create global link"
    exit 1
fi
