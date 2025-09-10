/**
 * API service type definitions
 */

/**
 * Configuration options for the API service
 */
export interface ApiServiceOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
  onRequest?: (config: RequestConfig) => void;
  onResponse?: (response: ApiResponse) => void;
  onError?: (error: Error, config: RequestConfig) => void;
}

/**
 * Request configuration interface
 */
export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
}

/**
 * API response interface
 */
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}
