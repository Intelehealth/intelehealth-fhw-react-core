import { AuthServiceOptions, AuthState, User } from '../types/services/auth';

export class AuthService {
  private options: Required<AuthServiceOptions>;
  private state: AuthState;

  constructor(options: AuthServiceOptions = {}) {
    this.options = {
      onAuthChange: options.onAuthChange || (() => {}),
      onLogin: options.onLogin || (() => {}),
      onLogout: options.onLogout || (() => {}),
      validateToken: options.validateToken || this.defaultValidateToken,
      refreshToken: options.refreshToken || this.defaultRefreshToken,
    };

    this.state = {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  }

  private defaultValidateToken(_token: string): Promise<boolean> {
    // Default implementation - always return true
    // In real applications, this should validate the token with your backend
    return Promise.resolve(true);
  }

  private defaultRefreshToken(token: string): Promise<string> {
    // Default implementation - return the same token
    // In real applications, this should refresh the token with your backend
    return Promise.resolve(token);
  }

  private notifyAuthChange(): void {
    this.options.onAuthChange(this.state);
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthState> {
    try {
      this.state.isLoading = true;
      this.state.error = null;
      this.notifyAuthChange();

      // In real applications, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const user: User = {
        id: '1',
        email: credentials.email,
        roles: ['user'],
        ...(credentials.email.split('@')[0] && {
          name: credentials.email.split('@')[0],
        }),
      };

      const token = `demo-token-${Date.now()}`;

      this.state.user = user;
      this.state.token = token;
      this.state.isAuthenticated = true;
      this.state.error = null;

      this.options.onLogin(user, token);
      this.notifyAuthChange();

      return this.state;
    } catch (error) {
      this.state.error =
        error instanceof Error ? error.message : 'Login failed';
      this.notifyAuthChange();
      throw error;
    } finally {
      this.state.isLoading = false;
    }
  }

  async logout(): Promise<void> {
    try {
      this.state.isLoading = true;
      this.notifyAuthChange();

      this.state.user = null;
      this.state.token = null;
      this.state.isAuthenticated = false;
      this.state.error = null;

      this.options.onLogout();
      this.notifyAuthChange();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.state.isLoading = false;
    }
  }

  async refreshAuth(): Promise<boolean> {
    try {
      if (!this.state.token) return false;

      const newToken = await this.options.refreshToken(this.state.token);
      this.state.token = newToken;

      this.notifyAuthChange();
      return true;
    } catch (error) {
      console.error('Error refreshing auth:', error);
      await this.logout();
      return false;
    }
  }

  async updateUser(userData: Partial<User>): Promise<User> {
    if (!this.state.user) {
      throw new Error('No authenticated user');
    }

    const updatedUser = { ...this.state.user, ...userData };
    this.state.user = updatedUser;

    this.notifyAuthChange();
    return updatedUser;
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  getUser(): User | null {
    return this.state.user;
  }

  getToken(): string | null {
    return this.state.token;
  }

  getAuthState(): AuthState {
    return { ...this.state };
  }

  hasRole(role: string): boolean {
    return this.state.user?.roles?.includes(role) || false;
  }

  hasAnyRole(roles: string[]): boolean {
    return this.state.user?.roles?.some(role => roles.includes(role)) || false;
  }

  hasAllRoles(roles: string[]): boolean {
    return this.state.user?.roles?.every(role => roles.includes(role)) || false;
  }

  // Method to manually trigger auth state change (useful for external auth systems)
  triggerAuthChange(): void {
    this.notifyAuthChange();
  }
}
