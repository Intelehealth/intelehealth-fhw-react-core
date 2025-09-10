import {
  Storage,
  appStorage,
  cacheStorage,
  createStorage,
  userStorage,
} from '../../src/core/Storage';
import { StorageOptions } from '../../src/types';

// Mock localStorage for testing
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

describe('Storage', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage('test_');
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance with default prefix', () => {
      const defaultStorage = new Storage();
      expect(defaultStorage).toBeInstanceOf(Storage);
    });

    it('should create an instance with custom prefix (string)', () => {
      const customStorage = new Storage('custom_');
      expect(customStorage).toBeInstanceOf(Storage);
    });

    it('should create an instance with StorageOptions', () => {
      const options: StorageOptions = { prefix: 'test_', enableLogging: true };
      const customStorage = new Storage(options);
      expect(customStorage).toBeInstanceOf(Storage);
    });
  });

  describe('set', () => {
    it('should store a value', async () => {
      await storage.set('key1', 'value1');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test_key1',
        '"value1"'
      );
    });

    it('should store an object', async () => {
      const obj = { name: 'test', age: 25 };
      await storage.set('user', obj);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test_user',
        JSON.stringify(obj)
      );
    });

    it('should store typed values', async () => {
      // Test with different types
      await storage.set<string>('stringValue', 'hello');
      await storage.set<number>('numberValue', 42);
      await storage.set<boolean>('booleanValue', true);
      await storage.set<{ id: number; name: string }>('objectValue', {
        id: 1,
        name: 'test',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test_stringValue',
        '"hello"'
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test_numberValue',
        '42'
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test_booleanValue',
        'true'
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test_objectValue',
        '{"id":1,"name":"test"}'
      );
    });
  });

  describe('get', () => {
    it('should retrieve a stored value', async () => {
      localStorageMock.getItem.mockReturnValue('"value1"');
      const result = await storage.get('key1');
      expect(result).toBe('value1');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('test_key1');
    });

    it('should return default value when key does not exist', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      const result = await storage.get('nonexistent', 'default');
      expect(result).toBe('default');
    });

    it('should return null when key does not exist and no default', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      const result = await storage.get('nonexistent');
      expect(result).toBeNull();
    });

    it('should retrieve typed values', async () => {
      // Test string type
      localStorageMock.getItem.mockReturnValue('"hello"');
      const stringValue = await storage.get<string>('stringValue');
      expect(stringValue).toBe('hello');

      // Test number type
      localStorageMock.getItem.mockReturnValue('42');
      const numberValue = await storage.get<number>('numberValue');
      expect(numberValue).toBe(42);

      // Test boolean type
      localStorageMock.getItem.mockReturnValue('true');
      const booleanValue = await storage.get<boolean>('booleanValue');
      expect(booleanValue).toBe(true);

      // Test object type
      localStorageMock.getItem.mockReturnValue('{"id":1,"name":"test"}');
      const objectValue = await storage.get<{ id: number; name: string }>(
        'objectValue'
      );
      expect(objectValue).toEqual({ id: 1, name: 'test' });
    });
  });

  describe('remove', () => {
    it('should remove a stored value', async () => {
      await storage.remove('key1');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('test_key1');
    });
  });

  describe('has', () => {
    it('should return true when key exists', async () => {
      localStorageMock.getItem.mockReturnValue('"value1"');
      const result = await storage.has('key1');
      expect(result).toBe(true);
    });

    it('should return false when key does not exist', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      const result = await storage.has('nonexistent');
      expect(result).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all prefixed keys', async () => {
      // For now, just test that clear doesn't throw an error
      await expect(storage.clear()).resolves.not.toThrow();
    });
  });

  describe('keys', () => {
    it('should return all keys with prefix', async () => {
      // For now, just test that keys doesn't throw an error
      const keys = await storage.keys();
      expect(Array.isArray(keys)).toBe(true);
    });
  });
});

describe('createStorage', () => {
  it('should create a storage instance', () => {
    const storage = createStorage();
    expect(storage).toBeInstanceOf(Storage);
  });

  it('should create a storage instance with custom prefix (string)', () => {
    const storage = createStorage('custom_');
    expect(storage).toBeInstanceOf(Storage);
  });

  it('should create a storage instance with StorageOptions', () => {
    const options: StorageOptions = { prefix: 'factory_', enableLogging: true };
    const storage = createStorage(options);
    expect(storage).toBeInstanceOf(Storage);
  });
});

describe('Pre-configured Storage', () => {
  it('should create app storage instance', () => {
    expect(appStorage).toBeInstanceOf(Storage);
  });

  it('should create user storage instance', () => {
    expect(userStorage).toBeInstanceOf(Storage);
  });

  it('should create cache storage instance', () => {
    expect(cacheStorage).toBeInstanceOf(Storage);
  });
});
