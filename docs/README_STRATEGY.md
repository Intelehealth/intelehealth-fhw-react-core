# README Strategy

This project uses a dual README strategy to provide platform-specific documentation for both NPM and GitHub.

## 📁 README Files

### `README.md` (Main)

- **Purpose**: The active README that gets displayed
- **Content**: Switches between NPM and GitHub versions
- **Usage**: Automatically managed by scripts

### `README-NPM.md` (NPM Version)

- **Purpose**: Optimized for NPM package page
- **Focus**: Installation, usage, API documentation
- **Audience**: Developers installing the package
- **Content**:
  - Installation instructions
  - Quick start examples
  - API documentation
  - Troubleshooting
  - Package information

### `README-GitHub.md` (GitHub Version)

- **Purpose**: Optimized for GitHub repository page
- **Focus**: Development, contributing, project information
- **Audience**: Developers contributing to the project
- **Content**:
  - Development setup
  - Contributing guidelines
  - Project structure
  - CI/CD information
  - Code standards

## 🔄 Switching README Versions

### Manual Switching

```bash
# Switch to GitHub version (for development)
yarn readme:github

# Switch to NPM version (for publishing)
yarn readme:npm
```

### Automatic Switching

- **Before Publishing**: Automatically switches to NPM version via `prepublishOnly` script
- **GitHub Display**: Uses GitHub version by default

## 📦 NPM Package

The NPM package includes:

- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - NPM-optimized documentation
- `LICENSE` - MIT License file

Development files are excluded via `.npmignore`.

## 🎯 Benefits

### For NPM Users

- Clean, focused documentation
- Installation and usage examples
- API reference
- Troubleshooting guide
- No development clutter

### For GitHub Users

- Complete development information
- Contributing guidelines
- Project structure
- CI/CD details
- Code standards

## 🔧 Maintenance

### When to Update

- **README-NPM.md**: When adding new features, changing API, or updating usage examples
- **README-GitHub.md**: When changing development process, contributing guidelines, or project structure

### Consistency

- Keep both READMEs in sync for basic information (features, installation)
- Platform-specific content can differ
- Use the same badges and basic structure

## 📝 Best Practices

1. **Keep it Simple**: Each README should focus on its audience
2. **Stay Consistent**: Use the same basic structure and badges
3. **Update Both**: When making changes, consider both audiences
4. **Test Switching**: Always test the switching script before publishing
5. **Version Control**: Both README files are tracked in Git

## 🚀 Workflow

### Development

1. Work with GitHub version: `yarn readme:github`
2. Make changes to `README-GitHub.md`
3. Test and commit changes

### Publishing

1. Update NPM version: `yarn readme:npm`
2. Make changes to `README-NPM.md` if needed
3. Publish: `yarn publish`
4. Switch back to GitHub: `yarn readme:github`
