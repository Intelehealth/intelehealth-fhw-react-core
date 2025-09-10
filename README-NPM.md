# @intelehealth/intelehealth-fhw-react-core

[![npm version](https://badge.fury.io/js/%40intelehealth%2Fintelehealth-fhw-react-core.svg)](https://www.npmjs.com/package/@intelehealth/intelehealth-fhw-react-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61dafb.svg)](https://reactjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-61dafb.svg)](https://reactnative.dev/)

> **A universal React library for healthcare applications** 🏥

Intelehealth's core library for React.js and React Native applications. A comprehensive universal library that provides essential utilities and services for healthcare applications, focusing on business logic without platform-specific dependencies.

## ✨ Why Choose This Library?

- 🚀 **Universal Compatibility** - Works seamlessly with React.js and React Native
- 🔒 **TypeScript First** - Full TypeScript implementation with strict type checking
- 🏥 **Healthcare Focused** - Built specifically for healthcare applications
- 📦 **Tree-shakable** - Import only what you need for optimal bundle size
- 🧪 **Well Tested** - Comprehensive test coverage with Jest and React Testing Library
- 🔧 **Developer Friendly** - Excellent developer experience with hot reloading and debugging
- 📚 **Well Documented** - Complete API documentation and examples
- 🛡️ **Production Ready** - Battle-tested in production healthcare applications

## 🚀 Features

- **Universal Compatibility**: Works with React.js and React Native
- **TypeScript Support**: Full TypeScript implementation with strict type checking
- **Business Logic Focus**: No platform-specific dependencies
- **Testing Setup**: Jest and React Testing Library configuration
- **Build System**: Rollup for efficient bundling
- **Code Quality**: ESLint, Prettier, and Husky for code standards
- **Git Hooks**: Pre-commit and pre-push hooks for quality assurance
- **Documentation**: Auto-generated API documentation
- **CI/CD Ready**: GitHub Actions workflow included
- **NPM Publishing**: Complete publishing setup
- **Code Ownership**: GitHub CODEOWNERS for proper review process

## 🧩 Core Components

- **Storage**: Simple, platform-agnostic storage utility for React and React Native
- **ApiService**: HTTP client using Axios with retry logic and hooks
- **AuthService**: Authentication state management
- **useLocalStorage**: React hook for localStorage synchronization (React only)
- **useDebounce**: React hooks for debouncing values and callbacks
- **Utility Functions**: Date, string, and object manipulation utilities

## 📦 Installation

### NPM

```bash
npm install @intelehealth/intelehealth-fhw-react-core
```

### Yarn

```bash
yarn add @intelehealth/intelehealth-fhw-react-core
```

### PNPM

```bash
pnpm add @intelehealth/intelehealth-fhw-react-core
```

### Requirements

- Node.js >= 20.0.0
- React >= 18.0.0
- TypeScript >= 5.0.0 (recommended)

### What's Included in NPM Package

The published NPM package contains only the essential files:

- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - This documentation
- `LICENSE` - MIT License file

Development files (source code, tests, configs, `.vscode`, etc.) are excluded to keep the package lightweight.

### Package Size

- **Minified + Gzipped**: ~15KB
- **Tree-shakable**: Import only what you need
- **Zero dependencies**: Only peer dependencies (React)

## 🚀 Quick Start

Get started in minutes with our comprehensive examples:

### React (Web) Usage

```typescript
import {
  Storage,
  ApiService,
  AuthService,
  useLocalStorage,
  useDebounce,
} from '@intelehealth/intelehealth-fhw-react-core';

// useLocalStorage works in React web apps
const [value, setValue] = useLocalStorage('key', 'default');
```

### React Native Usage

```typescript
import {
  Storage,
  ApiService,
  AuthService,
  useDebounce,
} from '@intelehealth/intelehealth-fhw-react-core';

// useLocalStorage is not available in React Native
// Use the Storage class instead for persistent storage
const storage = new Storage('app_');
await storage.set('key', 'value');
const value = await storage.get('key');
```

### Full Import

```typescript
import {
  Storage,
  ApiService,
  AuthService,
} from '@intelehealth/intelehealth-fhw-react-core';

// Use the Storage utility
const storage = new Storage('app_');
await storage.set('user', { id: 1, name: 'John' });

// Use the API service
const api = new ApiService({ baseURL: 'https://api.example.com' });
const response = await api.get('/users');

// Use the Auth service
const auth = new AuthService();
await auth.login({ email: 'user@example.com', password: 'password' });
```

### Folder-wise Imports (Tree-shaking friendly)

```typescript
// Import only what you need from specific folders
import {
  Storage,
  appStorage,
} from '@intelehealth/intelehealth-fhw-react-core/core';
import { ApiService } from '@intelehealth/intelehealth-fhw-react-core/services';
import {
  useLocalStorage,
  useDebounce,
} from '@intelehealth/intelehealth-fhw-react-core/hooks';
import {
  formatDate,
  deepClone,
} from '@intelehealth/intelehealth-fhw-react-core/utils';
import type {
  ApiResponse,
  User,
} from '@intelehealth/intelehealth-fhw-react-core/types';
```

## 📚 API Documentation

### Storage Class

A platform-agnostic storage utility that works with both React and React Native.

```typescript
import { Storage } from '@intelehealth/intelehealth-fhw-react-core';

const storage = new Storage('app_');

// Set a value
await storage.set('user', { id: 1, name: 'John' });

// Get a value
const user = await storage.get('user');

// Remove a value
await storage.remove('user');

// Clear all values
await storage.clear();
```

### ApiService Class

HTTP client with retry logic and error handling.

```typescript
import { ApiService } from '@intelehealth/intelehealth-fhw-react-core';

const api = new ApiService({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
});

// GET request
const users = await api.get('/users');

// POST request
const newUser = await api.post('/users', {
  name: 'John',
  email: 'john@example.com',
});

// PUT request
const updatedUser = await api.put('/users/1', { name: 'John Updated' });

// DELETE request
await api.delete('/users/1');
```

### AuthService Class

Authentication state management.

```typescript
import { AuthService } from '@intelehealth/intelehealth-fhw-react-core';

const auth = new AuthService();

// Login
await auth.login({ email: 'user@example.com', password: 'password' });

// Check if user is authenticated
const isAuthenticated = auth.isAuthenticated();

// Get current user
const user = auth.getCurrentUser();

// Logout
await auth.logout();
```

### React Hooks

#### useLocalStorage (React only)

```typescript
import { useLocalStorage } from '@intelehealth/intelehealth-fhw-react-core';

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', 'defaultValue');

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue('new value')}>
        Update Value
      </button>
    </div>
  );
}
```

#### useDebounce

```typescript
import { useDebounce } from '@intelehealth/intelehealth-fhw-react-core';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Utility Functions

```typescript
import {
  formatDate,
  deepClone,
  capitalize,
  generateId,
} from '@intelehealth/intelehealth-fhw-react-core/utils';

// Date utilities
const formattedDate = formatDate(new Date(), 'YYYY-MM-DD');

// Object utilities
const cloned = deepClone(originalObject);

// String utilities
const capitalized = capitalize('hello world'); // "Hello world"

// Generate unique ID
const id = generateId(); // "abc123def456"
```

## 🔧 Configuration

### TypeScript Configuration

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### React Native Configuration

For React Native projects, ensure you have the required peer dependencies:

```bash
npm install react react-native
```

## 🐛 Troubleshooting

### Common Issues

**1. TypeScript errors with imports**

- Ensure you have TypeScript 5.0+ installed
- Check your `tsconfig.json` configuration

**2. React Native compatibility**

- Make sure you're using React Native 0.70+
- Some hooks like `useLocalStorage` are not available in React Native

**3. Build errors**

- Clear your node_modules and reinstall
- Check your bundler configuration

### Getting Help

- 📖 **Documentation**: Check our [full API docs](https://github.com/intelehealth/intelehealth-fhw-react-core#readme)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/intelehealth/intelehealth-fhw-react-core/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/intelehealth/intelehealth-fhw-react-core/discussions)
- 📧 **Email Support**: info@intelehealth.org

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/intelehealth/intelehealth-fhw-react-core)
- [NPM Package](https://www.npmjs.com/package/@intelehealth/intelehealth-fhw-react-core)
- [Documentation](https://github.com/intelehealth/intelehealth-fhw-react-core#readme)
- [Changelog](https://github.com/intelehealth/intelehealth-fhw-react-core/releases)
