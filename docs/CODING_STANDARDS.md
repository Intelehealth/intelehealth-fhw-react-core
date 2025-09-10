# Coding Standards & Best Practices

This document outlines the coding standards and best practices for the ih-hw-core project.

## 📋 Table of Contents

- [TypeScript Standards](#typescript-standards)
- [Naming Conventions](#naming-conventions)
- [File Organization](#file-organization)
- [Import/Export Standards](#importexport-standards)
- [Code Quality Rules](#code-quality-rules)
- [Testing Standards](#testing-standards)
- [Documentation Standards](#documentation-standards)

## 🔧 TypeScript Standards

### Type Definitions

#### Interfaces

- Use PascalCase with `I` prefix
- Be descriptive and specific
- Group related properties logically

```typescript
// ✅ Good
interface IUserData {
  id: string;
  email: string;
  profile: IUserProfile;
}

// ❌ Bad
interface userData {
  id: string;
  email: string;
}
```

#### Type Aliases

- Use PascalCase with `T` prefix
- Use for union types, function signatures, and complex types

```typescript
// ✅ Good
type TApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// ❌ Bad
type apiResponse = {
  data: any;
  status: number;
};
```

#### Enums

- Use PascalCase with `E` prefix
- Use UPPER_CASE for enum members

```typescript
// ✅ Good
enum EHttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// ❌ Bad
enum httpStatus {
  ok = 200,
  notFound = 404,
}
```

### Function Signatures

```typescript
// ✅ Good - Explicit return types for public APIs
export const getUserData = async (userId: string): Promise<IUserData> => {
  // implementation
};

// ✅ Good - Inferred return types for internal functions
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ❌ Bad - Using any
const processData = (data: any): any => {
  // implementation
};
```

## 📝 Naming Conventions

### Variables and Functions

- Use camelCase
- Be descriptive and clear
- Use verbs for functions, nouns for variables

```typescript
// ✅ Good
const userEmail = 'user@example.com';
const isUserAuthenticated = true;
const getUserById = (id: string) => {
  /* ... */
};

// ❌ Bad
const ue = 'user@example.com';
const isAuth = true;
const get = (id: string) => {
  /* ... */
};
```

### Constants

- Use UPPER_CASE with underscores
- Group related constants

```typescript
// ✅ Good
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 5000;

// ❌ Bad
const apiBaseUrl = 'https://api.example.com';
const maxRetryAttempts = 3;
```

### Classes

- Use PascalCase
- Be descriptive and specific

```typescript
// ✅ Good
class ApiService {
  // implementation
}

class EventEmitter {
  // implementation
}

// ❌ Bad
class api {
  // implementation
}

class events {
  // implementation
}
```

## 📁 File Organization

### File Naming

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- **Services**: PascalCase with `Service` suffix (e.g., `ApiService.ts`)
- **Utils**: camelCase (e.g., `dateUtils.ts`, `stringUtils.ts`)
- **Types**: camelCase with `types` suffix (e.g., `userTypes.ts`)
- **Tests**: Same as source with `.test.` or `.spec.` (e.g., `ApiService.test.ts`)

### Directory Structure

```
src/
├── core/           # Core classes and utilities
│   ├── Storage.ts  # Storage implementation
│   └── index.ts    # Core exports
├── hooks/          # React hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── index.ts    # Hook exports
├── services/       # Business logic services
│   ├── ApiService.ts
│   ├── AuthService.ts
│   └── index.ts    # Service exports
├── utils/          # Utility functions
│   ├── dateUtils.ts
│   ├── objectUtils.ts
│   ├── stringUtils.ts
│   └── index.ts    # Utility exports
├── types/          # Type definitions
│   ├── auth.ts
│   ├── storage.ts
│   ├── services/
│   └── index.ts    # Type exports
└── index.ts        # Main export file (re-exports all)
```

## 📦 Import/Export Standards

### Import Organization

ESLint automatically organizes imports in this order:

1. Built-in Node.js modules
2. External packages
3. Internal modules
4. Parent directory imports
5. Sibling imports
6. Index imports

```typescript
// ✅ Good - Automatically organized by ESLint
import { EventEmitter } from 'events';

import axios from 'axios';
import { debounce } from 'lodash';

import { ApiService } from '../services/ApiService';
import { IUserData } from '../types/userTypes';

import { useLocalStorage } from './useLocalStorage';
import { validateEmail } from './validationUtils';

export { ApiService } from './ApiService';
```

### Export Standards

- Use named exports for better tree-shaking
- Export types separately from implementations
- Use barrel exports in index files
- Support both full imports and folder-wise imports

```typescript
// ✅ Good - Folder-wise exports (recommended)
export { ApiService } from './ApiService';
export { AuthService } from './AuthService';

// ✅ Good - Main index re-exports
export * from './core';
export * from './services';
export * from './hooks';
export * from './utils';
export type * from './types';

// ❌ Bad
export default ApiService;
```

### Import Patterns

#### Folder-wise Imports (Recommended for Performance)

```typescript
// ✅ Good - Import only what you need
import { Storage } from '@intelehealth/ih-hw-core/core';
import { ApiService } from '@intelehealth/ih-hw-core/services';
import { useLocalStorage } from '@intelehealth/ih-hw-core/hooks';
import { formatDate } from '@intelehealth/ih-hw-core/utils';
import type { ApiResponse } from '@intelehealth/ih-hw-core/types';
```

#### Full Imports (Convenience)

```typescript
// ✅ Good - Import everything (larger bundle)
import {
  Storage,
  ApiService,
  useLocalStorage,
  formatDate,
} from '@intelehealth/ih-hw-core';
import type { ApiResponse } from '@intelehealth/ih-hw-core';
```

## 🎯 Code Quality Rules

### TypeScript Rules

- **No `any` types**: Always use proper TypeScript types
- **Strict null checks**: Handle null and undefined explicitly
- **No unused variables**: Remove or prefix with underscore
- **Consistent imports**: Use type-only imports when appropriate

```typescript
// ✅ Good
import type { IUserData } from './types';
import { ApiService } from './ApiService';

// ❌ Bad
import { IUserData, ApiService } from './types';
```

### Error Handling

- Always handle errors in async operations
- Use proper error types
- Provide meaningful error messages

```typescript
// ✅ Good
const fetchUserData = async (userId: string): Promise<IUserData> => {
  try {
    const response = await apiService.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

// ❌ Bad
const fetchUserData = async (userId: string) => {
  const response = await apiService.get(`/users/${userId}`);
  return response.data;
};
```

### Performance Considerations

- Use proper memoization for expensive operations
- Avoid unnecessary re-renders
- Use proper dependency arrays in hooks

```typescript
// ✅ Good
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);

const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);

// ❌ Bad
const expensiveValue = heavyComputation(data);
const handleClick = () => onItemClick(item.id);
```

## 🧪 Testing Standards

### Test File Organization

- One test file per source file
- Use descriptive test names
- Group related tests with `describe` blocks

```typescript
// ✅ Good
describe('ApiService', () => {
  describe('getUserData', () => {
    it('should return user data when API call succeeds', async () => {
      // test implementation
    });

    it('should throw error when API call fails', async () => {
      // test implementation
    });
  });
});
```

### Test Coverage

- Minimum 80% test coverage required
- Test all public methods and edge cases
- Mock external dependencies

```typescript
// ✅ Good
describe('useLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should store and retrieve values correctly', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
  });
});
```

## 📚 Documentation Standards

### JSDoc Comments

- Document all public APIs
- Include parameter and return type information
- Provide usage examples

````typescript
/**
 * Fetches user data from the API
 * @param userId - The unique identifier of the user
 * @returns Promise that resolves to user data
 * @throws {Error} When the API request fails
 * @example
 * ```typescript
 * const user = await getUserData('123');
 * console.log(user.email);
 * ```
 */
export const getUserData = async (userId: string): Promise<IUserData> => {
  // implementation
};
````

### README Documentation

- Keep README up to date
- Include installation and usage instructions
- Provide code examples
- Document breaking changes

## 🔍 Code Review Checklist

Before submitting a pull request, ensure:

- [ ] All tests pass
- [ ] Code follows naming conventions
- [ ] No ESLint warnings or errors
- [ ] Proper TypeScript types (no `any`)
- [ ] Error handling implemented
- [ ] Documentation updated
- [ ] Test coverage maintained
- [ ] Performance considerations addressed
- [ ] Security implications reviewed

## 🚀 Getting Started

1. Install dependencies: `yarn install`
2. Run linting: `yarn lint:check`
3. Run tests: `yarn test`
4. Check formatting: `yarn format:check`
5. Type check: `yarn type-check`

For more information, see the [Development Guide](./DEVELOPMENT.md).
