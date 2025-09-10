@echo off
REM Development Setup Script for Universal Library Boilerplate
REM This script sets up the development environment with all necessary tools

echo 🚀 Setting up Universal Library Boilerplate development environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ and try again.
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install dependencies
echo 📦 Installing dependencies...
yarn install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

REM Initialize Husky
echo 🔧 Setting up Husky git hooks...
npm run prepare
if %errorlevel% neq 0 (
    echo ❌ Failed to setup Husky
    exit /b 1
)

REM Run initial quality checks
echo 🔍 Running initial quality checks...

echo 📝 Checking code formatting...
npm run format:check

echo 🧹 Running ESLint...
npm run lint:check

echo 🔧 Running TypeScript type check...
npm run type-check

echo 🧪 Running tests...
npm test

echo.
echo ✅ Development environment setup complete!
echo.
echo 📋 Available commands:
echo   npm run dev          - Start development mode
echo   npm run build        - Build the library
echo   npm run test         - Run tests
echo   npm run lint         - Check code quality
echo   npm run lint:fix     - Fix linting issues
echo   npm run format       - Format code
echo   npm run type-check   - TypeScript type checking
echo   npm run docs         - Generate documentation
echo.
echo 📚 Documentation:
echo   - Coding Standards: ./docs/CODING_STANDARDS.md
echo   - Development Guide: ./docs/DEVELOPMENT.md
echo.
echo 🎉 Happy coding!
pause
