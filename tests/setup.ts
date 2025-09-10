/// <reference types="jest" />
import '@testing-library/jest-dom';

// Mock localStorage for tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock sessionStorage for tests
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  sessionStorageMock.getItem.mockClear();
  sessionStorageMock.setItem.mockClear();
  sessionStorageMock.removeItem.mockClear();
  sessionStorageMock.clear.mockClear();
});

// Global test utilities
(global as any).testUtils = {
  createMockEventEmitter: () => ({
    on: jest.fn(),
    off: jest.fn(),
    once: jest.fn(),
    emit: jest.fn(),
    removeAllListeners: jest.fn(),
    listenerCount: jest.fn(),
    eventNames: jest.fn(),
    setMaxListeners: jest.fn(),
    getMaxListeners: jest.fn(),
  }),

  createMockApiResponse: (data: any, status: number = 200) => ({
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: { url: '/test', method: 'GET' },
  }),

  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
};
