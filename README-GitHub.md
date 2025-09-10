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

## 🔧 Local Development

For local development and testing with your React or React Native applications:

### Quick Setup with yarn link

```bash
# 1. Link the library globally (automated)
cd intelehealth-fhw-react-core
yarn link:dev

# 2. Link in your React app
cd your-react-app
yarn link @intelehealth/intelehealth-fhw-react-core

# 3. Start development
cd intelehealth-fhw-react-core && yarn dev  # Watch mode
cd your-react-app && npm start  # Your app
```

### Manual Setup

```bash
# 1. Link the library globally
cd intelehealth-fhw-react-core
yarn link

# 2. Link in your React app
cd your-react-app
yarn link @intelehealth/intelehealth-fhw-react-core

# 3. Start development
cd intelehealth-fhw-react-core && yarn dev  # Watch mode
cd your-react-app && npm start  # Your app
```

### Alternative: File Dependencies

```json
// In your app's package.json
{
  "dependencies": {
    "@intelehealth/intelehealth-fhw-react-core": "file:../path/to/intelehealth-fhw-react-core"
  }
}
```

> **Note**: For detailed setup instructions, see [SETUP.md](./docs/SETUP.md#step-9-local-development-setup)

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

## 📁 Project Structure

```
intelehealth-fhw-react-core/
├── src/                    # Source code
│   ├── core/              # Core utilities (Storage)
│   ├── services/          # Services (ApiService, AuthService)
│   ├── hooks/             # React hooks (useLocalStorage, useDebounce)
│   ├── utils/             # Utility functions
│   ├── types/             # Type definitions
│   └── index.ts           # Main export file
├── examples/               # Integration examples
├── tests/                  # Test files
├── docs/                   # Documentation
├── .github/                # GitHub Actions workflows
├── package.json            # Package configuration
├── tsconfig.json          # TypeScript configuration
├── rollup.config.js       # Build configuration
├── jest.config.js         # Test configuration
└── README.md              # This file
```

## 🛠️ Quick Start

1. **Clone and Setup**

   ```bash
   git clone <your-repo>
   cd intelehealth-fhw-react-core
   yarn install
   yarn prepare         # Initialize Husky git hooks
   ```

2. **Development**

   ```bash
   yarn dev             # Watch mode
   yarn build           # Build library
   yarn test            # Run tests
   yarn lint            # Check code quality
   yarn lint:fix        # Fix linting issues
   yarn format          # Format code with Prettier
   yarn type-check      # TypeScript type checking
   yarn docs            # Generate documentation
   ```

3. **Code Quality**

   ```bash
   yarn lint:check      # Strict linting (no warnings allowed)
   yarn format:check    # Check code formatting
   yarn pre-push        # Run all quality checks
   ```

4. **Publishing**
   ```bash
   yarn publish         # Build and publish to NPM
   ```

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Coding Standards](./docs/CODING_STANDARDS.md)
- [Testing Guide](./docs/TESTING.md)
- [Publishing Guide](./docs/PUBLISHING.md)
- [API Reference](./docs/API.md)

## 🔧 Configuration

All configuration files are pre-configured for:

- **TypeScript**: Strict type checking and modern ES features
- **Rollup**: Efficient bundling for multiple targets
- **Jest**: Comprehensive testing setup
- **ESLint**: Advanced linting with TypeScript and React rules
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for code quality
- **Lint-staged**: Pre-commit formatting and linting
- **NPM Publishing**: Complete publishing workflow

## 📋 Code Standards & Naming Conventions

### TypeScript Naming Conventions

- **Interfaces**: PascalCase with `I` prefix (e.g., `IUserData`)
- **Types**: PascalCase with `T` prefix (e.g., `TApiResponse`)
- **Enums**: PascalCase with `E` prefix (e.g., `EHttpMethod`)
- **Enum Members**: UPPER_CASE (e.g., `GET`, `POST`)
- **Functions/Variables**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_CASE (e.g., `API_BASE_URL`)

### File Organization

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- **Services**: PascalCase with `Service` suffix (e.g., `ApiService.ts`)
- **Utils**: camelCase (e.g., `dateUtils.ts`)
- **Tests**: Same as source with `.test.` or `.spec.` (e.g., `ApiService.test.ts`)

### Import Organization

Imports are automatically organized by ESLint in this order:

1. Built-in Node.js modules
2. External packages
3. Internal modules
4. Parent directory imports
5. Sibling imports
6. Index imports

### Code Quality Rules

- **No `any` types**: Use proper TypeScript types
- **Consistent imports**: Use type-only imports when appropriate
- **No console statements**: Use proper logging in production
- **Proper error handling**: All async operations must handle errors
- **Test coverage**: Minimum 80% test coverage required

## 📦 NPM Package

This boilerplate creates a package that can be installed via:

```bash
yarn add @intelehealth/intelehealth-fhw-react-core
```

## 🌟 GitHub Features

- 📊 **Issues & Discussions** - Report bugs and discuss features
- 🔄 **Pull Requests** - Contribute to the project
- 📈 **GitHub Actions** - Automated CI/CD pipeline
- 📋 **Project Boards** - Track development progress
- 🏷️ **Releases** - Versioned releases with changelog
- 📚 **Wiki** - Additional documentation and guides

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Run quality checks**:
   ```bash
   yarn lint:check
   yarn format:check
   yarn type-check
   npm test
   ```
6. **Commit your changes**: Git hooks will automatically format and lint
7. **Push your branch**: Pre-push hooks will run comprehensive checks
8. **Submit a pull request**

### Pull Request Requirements

- All tests must pass
- Code must follow our naming conventions
- No ESLint warnings or errors
- Proper TypeScript types (no `any`)
- Test coverage maintained above 80%
- Documentation updated if needed

### Code Review Process

- All PRs require review from code owners
- At least one approval required before merge
- Automated checks must pass (CI/CD pipeline)

## 🆘 Support & Community

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/intelehealth/intelehealth-fhw-react-core/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/intelehealth/intelehealth-fhw-react-core/discussions)
- 📧 **Email Support**: info@intelehealth.org
- 📖 **Documentation**: [Full API Docs](./docs/API.md)
- 💬 **Community**: Join our discussions for help and updates

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/intelehealth/intelehealth-fhw-react-core?style=social)
![GitHub forks](https://img.shields.io/github/forks/intelehealth/intelehealth-fhw-react-core?style=social)
![GitHub issues](https://img.shields.io/github/issues/intelehealth/intelehealth-fhw-react-core)
![GitHub pull requests](https://img.shields.io/github/issues-pr/intelehealth/intelehealth-fhw-react-core)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.
