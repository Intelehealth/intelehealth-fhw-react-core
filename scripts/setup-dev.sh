#!/bin/bash

# Development Setup Script for Universal Library Boilerplate
# This script sets up the development environment with all necessary tools

echo "🚀 Setting up Universal Library Boilerplate development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Initialize Husky
echo "🔧 Setting up Husky git hooks..."
yarn run prepare

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup Husky"
    exit 1
fi

# Run initial quality checks
echo "🔍 Running initial quality checks..."

echo "📝 Checking code formatting..."
yarn run format:check

echo "🧹 Running ESLint..."
yarn run lint:check

echo "🔧 Running TypeScript type check..."
yarn run type-check

echo "🧪 Running tests..."
yarn test

echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "📋 Available commands:"
echo "  yarn run dev          - Start development mode"
echo "  yarn run build        - Build the library"
echo "  yarn run test         - Run tests"
echo "  yarn run lint         - Check code quality"
echo "  yarn run lint:fix     - Fix linting issues"
echo "  yarn run format       - Format code"
echo "  yarn run type-check   - TypeScript type checking"
echo "  yarn run docs         - Generate documentation"
echo ""
echo "📚 Documentation:"
echo "  - Coding Standards: ./docs/CODING_STANDARDS.md"
echo "  - Development Guide: ./docs/DEVELOPMENT.md"
echo ""
echo "🎉 Happy coding!"
