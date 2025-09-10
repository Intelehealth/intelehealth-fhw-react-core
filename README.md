# @intelehealth/ih-hw-core

Intelehealth's core library for React.js and React Native applications. A comprehensive universal library that provides essential utilities and services for healthcare applications, focusing on business logic without platform-specific dependencies.

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

```bash
yarn add @intelehealth/ih-hw-core
```

## 🔧 Local Development

For local development and testing with your React or React Native applications:

### Quick Setup with npm link

```bash
# 1. Link the library globally (automated)
cd ih-hw-core
npm run link:dev

# 2. Link in your React app
cd your-react-app
npm link @intelehealth/ih-hw-core

# 3. Start development
cd ih-hw-core && npm run dev  # Watch mode
cd your-react-app && npm start  # Your app
```

### Manual Setup

```bash
# 1. Link the library globally
cd ih-hw-core
npm link

# 2. Link in your React app
cd your-react-app
npm link @intelehealth/ih-hw-core

# 3. Start development
cd ih-hw-core && npm run dev  # Watch mode
cd your-react-app && npm start  # Your app
```

### Alternative: File Dependencies

```json
// In your app's package.json
{
  "dependencies": {
    "@intelehealth/ih-hw-core": "file:../path/to/ih-hw-core"
  }
}
```

> **Note**: For detailed setup instructions, see [SETUP.md](./docs/SETUP.md#step-9-local-development-setup)

## 🚀 Quick Start

### React (Web) Usage

```typescript
import {
  Storage,
  ApiService,
  AuthService,
  useLocalStorage,
  useDebounce,
} from '@intelehealth/ih-hw-core';

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
} from '@intelehealth/ih-hw-core';

// useLocalStorage is not available in React Native
// Use the Storage class instead for persistent storage
const storage = new Storage('app_');
await storage.set('key', 'value');
const value = await storage.get('key');
```

### Full Import

```typescript
import { Storage, ApiService, AuthService } from '@intelehealth/ih-hw-core';

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
import { Storage, appStorage } from '@intelehealth/ih-hw-core/core';
import { ApiService } from '@intelehealth/ih-hw-core/services';
import { useLocalStorage, useDebounce } from '@intelehealth/ih-hw-core/hooks';
import { formatDate, deepClone } from '@intelehealth/ih-hw-core/utils';
import type { ApiResponse, User } from '@intelehealth/ih-hw-core/types';
```

## 📁 Project Structure

```
ih-hw-core/
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
   cd ih-hw-core
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
yarn add @intelehealth/ih-hw-core
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Run quality checks**:
   ```bash
   npm run lint:check
   npm run format:check
   npm run type-check
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

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.
