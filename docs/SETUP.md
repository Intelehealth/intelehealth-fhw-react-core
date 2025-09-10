# Setup Guide

This guide will walk you through setting up the ih-hw-core library for your own project.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (version 8.0.0 or higher)
- **Git** (for version control)

## Step 1: Clone the Boilerplate

```bash
git clone <your-repo-url>
cd ih-hw-core
```

## Step 2: Install Dependencies

```bash
yarn install
```

This will install all the necessary dependencies including:

- TypeScript and build tools
- Testing frameworks (Jest, React Testing Library)
- Code quality tools (ESLint, Prettier)
- Documentation tools (TypeDoc)

## Step 3: Configure Your Project

### Update package.json

Edit the `package.json` file to customize it for your project:

```json
{
  "name": "@intelehealth/ih-hw-core",
  "version": "1.0.0",
  "description": "Your library description",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/intelehealth/ih-hw-core.git"
  },
  "homepage": "https://github.com/intelehealth/ih-hw-core#readme"
}
```

### Update TypeScript Configuration

Modify `tsconfig.json` if you need different compilation options:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "node",
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

### Update Rollup Configuration

Modify `rollup.config.js` if you need different build options:

```javascript
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom'], // Add your external dependencies
  },
];
```

## Step 4: Customize Your Library

### Update Source Code

1. **Modify the main index file** (`src/index.ts`) to export your library's functionality
2. **Replace or extend the core classes** with your business logic
3. **Update the services** to match your API requirements
4. **Customize the hooks** for your specific use cases
5. **Modify utility functions** to include your domain-specific logic

### Example: Adding Your Own Service

```typescript
// src/services/MyCustomService.ts
export class MyCustomService {
  constructor(private options: MyCustomServiceOptions) {}

  async doSomething(): Promise<any> {
    // Your business logic here
  }
}

// src/services/index.ts
export { MyCustomService } from './MyCustomService';
export type { MyCustomServiceOptions } from './MyCustomService';

// src/index.ts (automatically includes via export * from './services')
export * from './services';
```

### Example: Adding Your Own Hook

```typescript
// src/hooks/useMyCustomHook.ts
export function useMyCustomHook(options: MyCustomHookOptions) {
  // Your hook implementation here
  return {
    /* your hook return values */
  };
}

// src/hooks/index.ts
export { useMyCustomHook } from './useMyCustomHook';
export type { MyCustomHookOptions } from './useMyCustomHook';

// src/index.ts (automatically includes via export * from './hooks')
export * from './hooks';
```

## Step 5: Update Tests

1. **Modify existing tests** to match your implementation
2. **Add new tests** for your custom functionality
3. **Update test setup** if needed

```typescript
// tests/services/MyCustomService.test.ts
import { MyCustomService } from '../../src/services/MyCustomService';

describe('MyCustomService', () => {
  let service: MyCustomService;

  beforeEach(() => {
    service = new MyCustomService({});
  });

  it('should do something', async () => {
    const result = await service.doSomething();
    expect(result).toBeDefined();
  });
});
```

## Step 6: Update Documentation

1. **Modify README.md** to describe your library
2. **Update API documentation** to reflect your exports
3. **Add usage examples** specific to your library
4. **Document import patterns** for optimal performance

### Import Pattern Examples

#### Folder-wise Imports (Recommended for Performance)

```typescript
// Import only what you need - better tree-shaking
import { Storage } from '@yourusername/your-library-name/core';
import { ApiService } from '@yourusername/your-library-name/services';
import { useLocalStorage } from '@yourusername/your-library-name/hooks';
import { formatDate } from '@yourusername/your-library-name/utils';
import type { ApiResponse } from '@yourusername/your-library-name/types';
```

#### Full Imports (Convenience)

```typescript
// Import everything - larger bundle but simpler
import {
  Storage,
  ApiService,
  useLocalStorage,
  formatDate,
} from '@yourusername/your-library-name';
import type { ApiResponse } from '@yourusername/your-library-name';
```

## Step 7: Test Your Setup

### Run Development Mode

```bash
npm run dev
```

This will start the build process in watch mode, automatically rebuilding when you make changes.

### Run Tests

```bash
npm test
```

This will run all tests and show coverage information.

### Build Your Library

```bash
npm run build
```

This will create the production build in the `dist/` directory.

### Generate Documentation

```bash
npm run docs
```

This will generate API documentation in the `docs/` directory.

## Step 8: Verify Build Output

After building, check that your `dist/` directory contains:

### Main Exports

- `index.js` - CommonJS bundle (full library)
- `index.esm.js` - ES Module bundle (full library)
- `index.d.ts` - TypeScript declarations (full library)

### Folder-wise Exports

- `core/index.js, index.esm.js, index.d.ts` - Core utilities
- `services/index.js, index.esm.js, index.d.ts` - Services
- `hooks/index.js, index.esm.js, index.d.ts` - React hooks
- `utils/index.js, index.esm.js, index.d.ts` - Utility functions
- `types/index.js, index.esm.js, index.d.ts` - Type definitions

### Additional Files

- Source maps (`.map` files) for all bundles

## Step 9: Local Development Setup

For local development and testing, you'll need to link the library with your React or React Native applications.

### Option 1: Using npm link (Recommended)

This method creates a symbolic link between your library and your application, allowing you to test changes in real-time.

#### Step 1: Link the Library

From the `ih-hw-core` directory:

```bash
# Create a global link to your library
npm link

# Or if using yarn
yarn link
```

#### Step 2: Link in Your React Application

From your React application directory:

```bash
# Link the library to your app
npm link @intelehealth/ih-hw-core

# Or if using yarn
yarn link @intelehealth/ih-hw-core
```

#### Step 3: Start Development

```bash
# In the library directory - start watch mode
npm run dev

# In your React app directory - start the app
npm start
```

### Option 2: Using File Dependencies

For simpler setup, you can use file dependencies in your application's `package.json`.

#### Step 1: Update package.json

In your React application's `package.json`:

```json
{
  "dependencies": {
    "@intelehealth/ih-hw-core": "file:../path/to/ih-hw-core"
  }
}
```

#### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Option 3: Using npm pack (For Testing)

This method creates a tarball that you can install locally.

#### Step 1: Build and Pack

From the `ih-hw-core` directory:

```bash
# Build the library
npm run build

# Create a tarball
npm pack
```

#### Step 2: Install in Your App

From your React application directory:

```bash
# Install the tarball
npm install ../path/to/ih-hw-core/ih-hw-core-1.0.0.tgz
```

## Step 10: Test Integration

### Test with React.js

```bash
cd examples/react-web-example
yarn install
npm start
```

### Test with React Native

```bash
cd examples/react-native-example
yarn install
npx react-native run-android  # or run-ios
```

## Local Development Workflow

### Recommended Development Process

1. **Start the library in watch mode**:

   ```bash
   cd ih-hw-core
   npm run dev
   ```

2. **Link the library to your app** (if using npm link):

   ```bash
   cd your-react-app
   npm link @intelehealth/ih-hw-core
   ```

3. **Start your React application**:

   ```bash
   npm start
   ```

4. **Make changes to the library** - they will automatically rebuild and reflect in your app

### Troubleshooting Local Development

#### React Version Conflicts

If you encounter React version conflicts:

1. **Ensure React is only a peer dependency** in the library
2. **Remove React from library's node_modules**:

   ```bash
   cd ih-hw-core
   rm -rf node_modules
   yarn install --production
   ```

3. **Rebuild the library**:
   ```bash
   npm run build
   ```

#### Module Resolution Issues

If you get module resolution errors:

1. **Use npm link instead of file dependencies**
2. **Clear node_modules and reinstall**:

   ```bash
   cd your-react-app
   rm -rf node_modules
   npm install
   ```

3. **Restart the development server**

#### TypeScript Errors

If you get TypeScript errors:

1. **Ensure the library is built**:

   ```bash
   cd ih-hw-core
   npm run build
   ```

2. **Check that type declarations are generated** in `dist/` directory

3. **Restart your TypeScript server** in your IDE

### Development Best Practices

1. **Always build the library** before testing in your app
2. **Use npm link for active development** - it provides the best development experience
3. **Test with both React and React Native** to ensure compatibility
4. **Keep the library's React version aligned** with your app's React version
5. **Use the watch mode** (`npm run dev`) for continuous development

## Common Issues and Solutions

### TypeScript Compilation Errors

- Ensure all dependencies are properly installed
- Check that `tsconfig.json` is correctly configured
- Verify that import paths are correct

### Build Failures

- Check that all exports in `src/index.ts` exist
- Ensure external dependencies are properly declared in Rollup config
- Verify that all required files are present

### Test Failures

- Make sure Jest configuration is correct
- Check that test setup file is properly configured
- Verify that mocks are working correctly

## Next Steps

Once your setup is complete:

1. **Start developing** your library functionality
2. **Write comprehensive tests** for all features
3. **Document your API** thoroughly
4. **Prepare for publishing** to NPM

## Getting Help

If you encounter issues:

1. Check the [Development Guide](./DEVELOPMENT.md)
2. Review the [Testing Guide](./TESTING.md)
3. Consult the [API Reference](./API.md)
4. Open an issue in your repository

## Customization Checklist

- [ ] Updated package.json with your project details
- [ ] Modified src/index.ts to export your functionality
- [ ] Customized core classes for your business logic
- [ ] Updated services for your API requirements
- [ ] Modified hooks for your use cases
- [ ] Updated utility functions for your domain
- [ ] Modified tests to match your implementation
- [ ] Updated documentation to reflect your library
- [ ] Verified build output is correct
- [ ] Tested integration with React.js and React Native
