@echo off
REM Development linking script for intelehealth-fhw-react-core (Windows)
REM This script helps set up local development with React/React Native apps

echo 🔗 Setting up intelehealth-fhw-react-core for local development...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the intelehealth-fhw-react-core root directory
    exit /b 1
)

if not exist "src" (
    echo ❌ Error: Please run this script from the intelehealth-fhw-react-core root directory
    exit /b 1
)

REM Build the library first
echo 📦 Building the library...
call yarn run build

if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the build errors first.
    exit /b 1
)

REM Create global link
echo 🔗 Creating global link...
call yarn link

if %errorlevel% equ 0 (
    echo ✅ Library linked globally!
    echo.
    echo 📋 Next steps:
    echo 1. Go to your React/React Native app directory
    echo 2. Run: yarn link @intelehealth/intelehealth-fhw-react-core
    echo 3. Start development:
    echo    - Library: yarn run dev (in intelehealth-fhw-react-core directory)
    echo    - Your app: yarn start (in your app directory)
    echo.
    echo 🔄 To unlink later:
    echo    - From your app: yarn unlink @intelehealth/intelehealth-fhw-react-core
    echo    - From library: yarn unlink
) else (
    echo ❌ Failed to create global link
    exit /b 1
)
