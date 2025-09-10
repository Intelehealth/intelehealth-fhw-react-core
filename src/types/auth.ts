/**
 * Authentication service type definitions
 */

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  roles?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Authentication service options
 */
export interface AuthServiceOptions {
  onAuthChange?: (state: AuthState) => void;
  onLogin?: (user: User, token: string) => void;
  onLogout?: () => void;
  validateToken?: (token: string) => Promise<boolean>;
  refreshToken?: (token: string) => Promise<string>;
}
