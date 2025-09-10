import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  ApiResponse,
  ApiServiceOptions,
  RequestConfig,
} from '../types/services/api';

export class ApiService {
  private options: Required<ApiServiceOptions>;
  private axiosInstance: AxiosInstance;
  private abortController: AbortController | null = null;

  constructor(options: ApiServiceOptions = {}) {
    this.options = {
      baseURL: options.baseURL || '',
      timeout: options.timeout || 30000,
      headers: options.headers || {},
      retries: options.retries || 3,
      retryDelay: options.retryDelay || 1000,
      onRequest: options.onRequest || (() => {}),
      onResponse: options.onResponse || (() => {}),
      onError: options.onError || (() => {}),
    };

    this.axiosInstance = axios.create({
      baseURL: this.options.baseURL,
      timeout: this.options.timeout,
      headers: this.options.headers,
    });
  }

  private async makeRequest<T>(
    config: RequestConfig,
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    try {
      const fullConfig = this.buildRequestConfig(config);

      // Call onRequest hook
      this.options.onRequest(fullConfig);

      // Create abort controller for timeout
      this.abortController = new AbortController();
      const timeoutId = setTimeout(() => {
        this.abortController?.abort();
      }, fullConfig.timeout);

      const axiosConfig: AxiosRequestConfig = {
        method: fullConfig.method.toLowerCase(),
        url: fullConfig.url,
        headers: fullConfig.headers || {},
        params: fullConfig.params || {},
        data: fullConfig.data,
        signal: this.abortController.signal,
      };

      const response: AxiosResponse<T> =
        await this.axiosInstance.request(axiosConfig);

      clearTimeout(timeoutId);

      const apiResponse: ApiResponse<T> = {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
        config: fullConfig,
      };

      // Call onResponse hook
      this.options.onResponse(apiResponse);

      return apiResponse;
    } catch (error) {
      // Call onError hook
      this.options.onError(error as Error, config);

      // Retry logic
      if (
        retryCount < this.options.retries &&
        this.shouldRetry(error as AxiosError)
      ) {
        await this.delay(this.options.retryDelay * Math.pow(2, retryCount));
        return this.makeRequest<T>(config, retryCount + 1);
      }

      throw error;
    }
  }

  private buildRequestConfig(config: RequestConfig): RequestConfig {
    const url = new URL(config.url, this.options.baseURL);

    // Add query parameters
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    // Merge headers
    const headers = {
      'Content-Type': 'application/json',
      ...this.options.headers,
      ...config.headers,
    };

    return {
      ...config,
      url: url.toString(),
      headers,
      timeout: config.timeout || this.options.timeout,
    };
  }

  private shouldRetry(error: AxiosError): boolean {
    // Don't retry on abort (timeout)
    if (error.code === 'ECONNABORTED') return false;

    // Don't retry on network errors
    if (error.code === 'ERR_NETWORK') return true;

    // Don't retry on 4xx errors (client errors)
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    )
      return false;

    return true;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      url,
      method: 'GET',
      params: params || {},
      ...config,
    });
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      url,
      method: 'POST',
      data: data || {},
      ...config,
    });
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      url,
      method: 'PUT',
      data: data || {},
      ...config,
    });
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      url,
      method: 'PATCH',
      data: data || {},
      ...config,
    });
  }

  async delete<T = unknown>(
    url: string,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      url,
      method: 'DELETE',
      ...config,
    });
  }

  abort(): void {
    this.abortController?.abort();
  }

  setBaseURL(baseURL: string): void {
    this.options.baseURL = baseURL;
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  setHeaders(headers: Record<string, string>): void {
    this.options.headers = { ...this.options.headers, ...headers };
    this.axiosInstance.defaults.headers.common = {
      ...this.axiosInstance.defaults.headers.common,
      ...headers,
    };
  }

  setAuthToken(token: string): void {
    this.setHeaders({ Authorization: `Bearer ${token}` });
  }
}
