# Publishing Guide

This guide will walk you through the process of publishing your library to the NPM registry.

## Prerequisites

Before publishing, ensure you have:

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **NPM CLI**: Install the NPM CLI globally: `npm global install yarn`
3. **Login**: Authenticate with NPM: `npm login`
4. **Git Repository**: Your code should be in a Git repository with proper versioning

## Step 1: Prepare Your Package

### Update Package Information

Ensure your `package.json` has all the necessary information:

```json
{
  "name": "@yourusername/your-library-name",
  "version": "1.0.0",
  "description": "A clear description of your library",
  "keywords": ["react", "react-native", "universal", "your-keywords"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-library-name.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/your-library-name/issues"
  },
  "homepage": "https://github.com/yourusername/your-library-name#readme"
}
```

### Check Package Name Availability

Before publishing, verify your package name is available:

```bash
npm search your-library-name
```

If the name is taken, consider alternatives:

- `@yourusername/your-library-name`
- `your-library-name-js`
- `your-library-name-lib`

### Verify Build Output

Ensure your build process works correctly:

```bash
npm run clean
npm run build
```

Check that the `dist/` directory contains:

### Main Exports

- `index.js` (CommonJS - full library)
- `index.esm.js` (ES Module - full library)
- `index.d.ts` (TypeScript declarations - full library)

### Folder-wise Exports

- `core/index.js, index.esm.js, index.d.ts` (Core utilities)
- `services/index.js, index.esm.js, index.d.ts` (Services)
- `hooks/index.js, index.esm.js, index.d.ts` (React hooks)
- `utils/index.js, index.esm.js, index.d.ts` (Utility functions)
- `types/index.js, index.esm.js, index.d.ts` (Type definitions)

### Additional Files

- Source maps (`.map` files) for all bundles

### Test Your Package Locally

Test your package before publishing:

```bash
npm pack
```

This creates a `.tgz` file. You can install it locally to test:

```bash
yarn add ./your-library-name-1.0.0.tgz
```

## Step 2: Version Management

### Semantic Versioning

Follow [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Update Version

Use NPM's version commands:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

Or manually update in `package.json`:

```json
{
  "version": "1.1.0"
}
```

### Commit and Tag

After updating the version:

```bash
git add package.json yarn-lock.json
git commit -m "Bump version to 1.1.0"
git tag v1.1.0
git push origin main --tags
```

## Step 3: Pre-Publishing Checklist

### Code Quality

- [ ] All tests pass: `yarn test`
- [ ] Code is linted: `yarn run lint`
- [ ] Code is formatted: `yarn run format`
- [ ] No TypeScript errors: `yarn run build:types`

### Documentation

- [ ] README.md is up to date
- [ ] API documentation is generated: `yarn run docs`
- [ ] Examples are working
- [ ] Changelog is updated (if you maintain one)

### Build Verification

- [ ] Clean build: `yarn run clean && yarn run build`
- [ ] All files are included in `dist/`
- [ ] Package size is reasonable
- [ ] No sensitive information is included

### Dependencies

- [ ] Only necessary dependencies are included
- [ ] Peer dependencies are correctly specified
- [ ] Development dependencies are not included in the package

## Step 4: Publishing

### Dry Run (Optional)

Test the publishing process without actually publishing:

```bash
npm publish --dry-run
```

This will show you exactly what would be published.

### Publish to NPM

```bash
npm publish
```

If this is your first time publishing this package, it will be published immediately.

### Publish with Tags

For pre-release versions:

```bash
npm publish --tag beta
npm publish --tag alpha
npm publish --tag next
```

### Publish Scoped Packages

If using a scoped package name:

```bash
npm publish --access public
```

## Step 5: Post-Publishing

### Verify Publication

Check that your package is available:

```bash
npm view your-library-name
```

Visit your package page: `https://www.npmjs.com/package/your-library-name`

### Update Documentation

- Update your repository with the new version
- Update any external documentation
- Announce the release on social media or your blog

### Monitor Usage

Track your package usage:

```bash
npm stats your-library-name
```

## Step 6: Continuous Publishing

### Automated Publishing

Set up automated publishing with GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Environment Setup

1. Create an NPM token: `npm token create`
2. Add the token to your GitHub repository secrets as `NPM_TOKEN`
3. Ensure your package.json has the correct version

## Troubleshooting

### Common Issues

#### Package Name Already Exists

```bash
npm view your-library-name
```

If the package exists, either:

- Choose a different name
- Take over the package (if abandoned)
- Contact the current maintainer

#### Publishing Fails

Check for common issues:

- Not logged in: `npm login`
- Wrong registry: `npm config get registry`
- Missing files: Verify `dist/` directory
- Package size: Check for large files

#### Version Conflicts

If you get version conflicts:

```bash
npm version patch --force
npm publish
```

### Rollback

If you need to unpublish (only works within 72 hours):

```bash
npm unpublish your-library-name@1.1.0
```

**Note**: Unpublishing can break applications that depend on your package.

## Best Practices

### Package Naming

- Use descriptive, memorable names
- Avoid conflicts with existing packages
- Consider using scoped packages for organization

### Version Management

- Use semantic versioning consistently
- Maintain a changelog
- Tag releases in Git

### Quality Assurance

- Always test before publishing
- Use automated testing and building
- Maintain good test coverage

### Documentation

- Keep README.md up to date
- Provide clear usage examples
- Document breaking changes

### Security

- Never publish sensitive information
- Use `.npmignore` to exclude unnecessary files
- Regularly update dependencies

## Advanced Publishing

### Multiple Registries

You can publish to different registries:

```bash
# Publish to NPM
npm publish

# Publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com

# Publish to private registry
npm publish --registry=https://your-registry.com
```

### Conditional Publishing

Use scripts for conditional publishing:

```json
{
  "scripts": {
    "prepublishOnly": "yarn test && yarn build",
    "publish:patch": "yarn version patch && yarn publish",
    "publish:minor": "yarn version minor && yarn publish",
    "publish:major": "yarn version major && yarn publish"
  }
}
```

### Publishing Scripts

Create custom publishing scripts:

```bash
#!/bin/bash
# scripts/publish.sh

echo "Running tests..."
npm test

echo "Building package..."
npm run build

echo "Publishing to NPM..."
npm publish

echo "Publishing to GitHub..."
git push origin main --tags
```

## Next Steps

After successfully publishing:

1. **Monitor usage** and feedback
2. **Respond to issues** and pull requests
3. **Plan future releases** based on user needs
4. **Consider monetization** options if applicable
5. **Build a community** around your library

## Resources

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [NPM Package.json Reference](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
