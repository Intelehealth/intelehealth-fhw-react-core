@echo off
REM Switch README between GitHub and NPM versions

if "%1"=="github" (
    echo Switching to GitHub README...
    node scripts/switch-readme.js github
    goto :end
)

if "%1"=="npm" (
    echo Switching to NPM README...
    node scripts/switch-readme.js npm
    goto :end
)

echo Usage: switch-readme.bat [github^|npm]
echo.
echo Examples:
echo   switch-readme.bat github
echo   switch-readme.bat npm
goto :end

:end
