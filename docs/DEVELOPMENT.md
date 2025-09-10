# Development Guide

This guide covers the development workflow and best practices for working with the intelehealth-fhw-react-core library.

## Development Environment Setup

### Prerequisites

- Node.js 16+ and npm 8+
- Git for version control
- A code editor (VS Code recommended)
- Terminal/Command Prompt

### Initial Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <your-repo-url>
   cd intelehealth-fhw-react-core
   yarn install
   ```

2. **Start development mode:**
   ```bash
   yarn dev
   ```

This will start the build process in watch mode, automatically rebuilding when you make changes.

## Project Structure

```
intelehealth-fhw-react-core/
├── src/                    # Source code
│   ├── core/              # Core utilities (Storage)
│   │   ├── Storage.ts     # Storage implementation
│   │   └── index.ts       # Core exports
│   ├── services/          # Service layer (API, Auth, etc.)
│   │   ├── ApiService.ts  # API service
│   │   ├── AuthService.ts # Auth service
│   │   └── index.ts       # Service exports
│   ├── hooks/             # React hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts       # Hook exports
│   ├── utils/             # Utility functions
│   │   ├── dateUtils.ts
│   │   ├── objectUtils.ts
│   │   ├── stringUtils.ts
│   │   └── index.ts       # Utility exports
│   ├── types/             # Type definitions
│   │   ├── auth.ts
│   │   ├── storage.ts
│   │   ├── services/
│   │   └── index.ts       # Type exports
│   └── index.ts           # Main export file (re-exports all)
├── tests/                  # Test files
├── examples/               # Integration examples
├── docs/                   # Documentation
├── scripts/                # Build and deployment scripts
├── .github/                # GitHub Actions workflows
└── dist/                   # Build output (generated)
    ├── index.js, index.esm.js, index.d.ts          # Main exports
    ├── core/index.js, index.esm.js, index.d.ts     # Core utilities
    ├── services/index.js, index.esm.js, index.d.ts # Services
    ├── hooks/index.js, index.esm.js, index.d.ts    # React hooks
    ├── utils/index.js, index.esm.js, index.d.ts    # Utilities
    └── types/index.js, index.esm.js, index.d.ts    # Type definitions
```

## Development Workflow

### 1. Making Changes

#### Adding New Features

1. **Create the feature file:**

   ```typescript
   // src/services/NewService.ts
   export interface NewServiceOptions {
     // Define your options
   }

   export class NewService {
     constructor(private options: NewServiceOptions) {}

     async doSomething(): Promise<any> {
       // Implement your feature
     }
   }
   ```

2. **Export from folder index.ts:**

   ```typescript
   // src/services/index.ts
   export { NewService } from './NewService';
   export type { NewServiceOptions } from './NewService';
   ```

3. **Export from main index.ts:**

   ```typescript
   // src/index.ts
   export * from './services'; // This will include NewService
   ```

4. **Add tests:**

   ```typescript
   // tests/services/NewService.test.ts
   import { NewService } from '../../src/services/NewService';

   describe('NewService', () => {
     let service: NewService;

     beforeEach(() => {
       service = new NewService({});
     });

     it('should do something', async () => {
       const result = await service.doSomething();
       expect(result).toBeDefined();
     });
   });
   ```

#### Modifying Existing Code

1. **Make your changes** in the source files
2. **Run tests** to ensure nothing is broken: `npm test`
3. **Check linting:** `yarn lint`
4. **Format code:** `yarn format`

### 2. Testing Your Changes

#### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
npm test -- NewService.test.ts
```

#### Writing Tests

Follow these testing best practices:

1. **Test structure:**

   ```typescript
   describe('ClassName', () => {
     let instance: ClassName;

     beforeEach(() => {
       // Setup
       instance = new ClassName();
     });

     afterEach(() => {
       // Cleanup
     });

     describe('methodName', () => {
       it('should do something specific', () => {
         // Test implementation
       });

       it('should handle edge cases', () => {
         // Test edge cases
       });
     });
   });
   ```

2. **Test naming:** Use descriptive test names that explain the expected behavior
3. **Test isolation:** Each test should be independent and not rely on other tests
4. **Mock external dependencies:** Use Jest mocks for external services

### 3. Code Quality

#### Linting

```bash
# Check for linting issues
yarn lint

# Fix auto-fixable issues
yarn lint:fix
```

#### Code Formatting

```bash
# Format all code
yarn format
```

#### TypeScript Compilation

```bash
# Check TypeScript compilation
yarn build:types
```

### 4. Building and Testing

#### Development Build

```bash
# Start development mode (watch)
yarn dev

# Single development build
yarn build
```

#### Production Build

```bash
# Clean and build
yarn clean && yarn build
```

#### Testing Build Output

```bash
# Test the built package locally
npm pack
yarn add ./intelehealth-fhw-react-core-1.0.0.tgz
```

## Core Development Concepts

### 1. Import Patterns

The library supports both full imports and folder-wise imports for optimal performance:

#### Folder-wise Imports (Recommended)

```typescript
// Import only what you need - better tree-shaking
import { Storage } from '@intelehealth/intelehealth-fhw-react-core/core';
import { ApiService } from '@intelehealth/intelehealth-fhw-react-core/services';
import { useLocalStorage } from '@intelehealth/intelehealth-fhw-react-core/hooks';
import { formatDate } from '@intelehealth/intelehealth-fhw-react-core/utils';
import type { ApiResponse } from '@intelehealth/intelehealth-fhw-react-core/types';
```

#### Full Imports (Convenience)

```typescript
// Import everything - larger bundle but simpler
import {
  Storage,
  ApiService,
  useLocalStorage,
  formatDate,
} from '@intelehealth/intelehealth-fhw-react-core';
import type { ApiResponse } from '@intelehealth/intelehealth-fhw-react-core';
```

#### Bundle Size Comparison

- **Core only**: ~2KB (Storage utilities)
- **Hooks only**: ~1KB (React hooks)
- **Services only**: ~233KB (API/Auth services)
- **Utils only**: ~2.5KB (Utility functions)
- **Full library**: ~239KB (Everything)

### 2. Universal Compatibility

The library is designed to work with both React.js and React Native. Follow these principles:

- **No platform-specific code** in core classes
- **Use abstractions** for platform differences
- **Test on both platforms** when possible

#### Example: Storage Utility

The core Storage utility automatically handles platform differences:

```typescript
import { Storage, appStorage } from './core/Storage';

// Works on both React.js and React Native
await appStorage.set('theme', 'dark');
const theme = await appStorage.get('theme', 'light');

// Platform detection is handled internally
// - Uses localStorage on web
// - Uses AsyncStorage on React Native (with proper setup)
```

### 2. Business Logic Focus

Keep the library focused on business logic:

- **Avoid UI components** (unless specifically needed)
- **Focus on data manipulation** and business rules
- **Provide hooks** for React integration
- **Keep services** platform-agnostic

### 3. Error Handling

Implement robust error handling:

```typescript
export class ApiService {
  async makeRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    try {
      // Implementation
    } catch (error) {
      // Log error for debugging
      console.error('API request failed:', error);

      // Transform error for consistent API
      throw new ApiError(error.message, error.status);
    }
  }
}
```

### 4. Configuration and Options

Use options objects for configuration:

```typescript
export interface ServiceOptions {
  timeout?: number;
  retries?: number;
  onError?: (error: Error) => void;
}

export class Service {
  constructor(private options: ServiceOptions = {}) {
    this.options = {
      timeout: 5000,
      retries: 3,
      onError: console.error,
      ...options,
    };
  }
}
```

## Adding New Features

### 1. New Service

```typescript
// src/services/NotificationService.ts
export interface NotificationOptions {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export class NotificationService {
  private listeners: Set<(notification: NotificationOptions) => void> =
    new Set();

  show(options: NotificationOptions): void {
    this.listeners.forEach(listener => listener(options));
  }

  subscribe(listener: (notification: NotificationOptions) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
```

### 2. New Hook

```typescript
// src/hooks/useNotification.ts
import { useState, useEffect } from 'react';
import {
  NotificationService,
  NotificationOptions,
} from '../services/NotificationService';

export function useNotification(service: NotificationService) {
  const [notifications, setNotifications] = useState<NotificationOptions[]>([]);

  useEffect(() => {
    const unsubscribe = service.subscribe(notification => {
      setNotifications(prev => [...prev, notification]);
    });

    return unsubscribe;
  }, [service]);

  return { notifications };
}
```

### 3. New Utility

```typescript
// src/utils/validationUtils.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone);
}
```

## Testing Strategies

### 1. Unit Tests

Test individual functions and methods:

```typescript
describe('validationUtils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });
  });
});
```

### 2. Integration Tests

Test how components work together:

```typescript
describe('Service Integration', () => {
  it('should handle complete workflow', async () => {
    const apiService = new ApiService();
    const authService = new AuthService(localStorage);

    // Test complete authentication flow
    const result = await authService.login({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result.isAuthenticated).toBe(true);

    // Test API call with auth
    const response = await apiService.get('/protected-endpoint');
    expect(response.status).toBe(200);
  });
});
```

### 3. Mocking

Use mocks for external dependencies:

```typescript
// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock fetch
global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});
```

## Performance Considerations

### 1. Bundle Size

- **Tree shaking:** Ensure your exports support tree shaking
- **Code splitting:** Consider splitting large libraries into smaller packages
- **Dependencies:** Minimize external dependencies

### 2. Runtime Performance

- **Lazy loading:** Load features on demand when possible
- **Memoization:** Use React.memo and useMemo for expensive operations
- **Debouncing:** Implement debouncing for frequent operations

### 3. Memory Management

- **Cleanup:** Always clean up event listeners and subscriptions
- **Weak references:** Use WeakMap/WeakSet when appropriate
- **Garbage collection:** Avoid circular references

## Debugging

### 1. Development Tools

- **Source maps:** Ensure source maps are generated for debugging
- **Console logging:** Use structured logging for debugging
- **TypeScript:** Leverage TypeScript for compile-time error detection

### 2. Testing Debugging

```typescript
// Add debugging to tests
it('should work correctly', () => {
  console.log('Test data:', testData);
  const result = functionUnderTest(testData);
  console.log('Result:', result);
  expect(result).toBe(expected);
});
```

### 3. Runtime Debugging

```typescript
// Add debugging to production code
export class DebugService {
  private debugMode = process.env.NODE_ENV === 'development';

  log(message: string, data?: any): void {
    if (this.debugMode) {
      console.log(`[${this.constructor.name}]`, message, data);
    }
  }
}
```

## Best Practices

### 1. Code Organization

- **Single responsibility:** Each class/function should have one clear purpose
- **Separation of concerns:** Keep business logic separate from UI logic
- **Consistent naming:** Use consistent naming conventions throughout

### 2. Error Handling

- **Graceful degradation:** Handle errors gracefully without crashing
- **User feedback:** Provide meaningful error messages
- **Logging:** Log errors for debugging while protecting user privacy

### 3. Documentation

- **JSDoc comments:** Document public APIs with JSDoc
- **Examples:** Provide clear usage examples
- **Type definitions:** Use TypeScript for better developer experience

### 4. Testing

- **High coverage:** Aim for high test coverage
- **Meaningful tests:** Write tests that verify behavior, not implementation
- **Fast tests:** Keep tests fast for quick feedback

## Common Patterns

### 1. Service Pattern

```typescript
export class BaseService {
  protected async handleRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
      return await request();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected handleError(error: Error): void {
    // Common error handling logic
  }
}
```

### 2. Hook Pattern

```typescript
export function useService<T>(service: T, deps: any[] = []): T {
  const [state, setState] = useState<T>(service);

  useEffect(() => {
    // Service initialization logic
  }, deps);

  return state;
}
```

### 3. Event Pattern

```typescript
export class EventService extends EventEmitter {
  emit<T>(event: string, data: T): boolean {
    // Pre-process data
    const processedData = this.processData(data);

    // Emit event
    return super.emit(event, processedData);
  }

  private processData<T>(data: T): T {
    // Data processing logic
    return data;
  }
}
```

## Next Steps

After mastering the development workflow:

1. **Contribute to the project** by submitting pull requests
2. **Share your knowledge** by helping other developers
3. **Extend the library** with new features
4. **Create plugins** or extensions
5. **Build a community** around your library

## Getting Help

- **Documentation:** Check the other guides in this directory
- **Issues:** Open an issue on GitHub for bugs or feature requests
- **Discussions:** Use GitHub Discussions for questions and ideas
- **Community:** Join the project's community channels
