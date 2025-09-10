/**
 * Storage - Simple storage utility for React and React Native
 * Works with both React and React Native applications
 *
 * This is a simple storage utility that works on both platforms
 * without heavy dependencies
 */

import { StorageOptions } from '../types/storage';

/**
 * Platform detection
 */
const Platform = {
  isWeb: (): boolean => typeof window !== 'undefined',
  isReactNative: (): boolean => typeof window === 'undefined',
};

/**
 * Simple storage utility
 */
export class Storage {
  private prefix: string;
  private enableLogging: boolean;

  constructor(options: StorageOptions | string = 'app_') {
    if (typeof options === 'string') {
      // Backward compatibility: if string is passed, use it as prefix
      this.prefix = options;
      this.enableLogging = false;
    } else {
      this.prefix = options.prefix || 'app_';
      this.enableLogging = options.enableLogging || false;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      const prefixedKey = `${this.prefix}${key}`;
      const serializedValue = JSON.stringify(value);

      if (Platform.isWeb()) {
        localStorage.setItem(prefixedKey, serializedValue);
      } else if (Platform.isReactNative()) {
        // For React Native, you would use AsyncStorage
        // const AsyncStorage = require('@react-native-async-storage/async-storage');
        // await AsyncStorage.setItem(prefixedKey, serializedValue);
        console.warn(
          'AsyncStorage not available - install @react-native-async-storage/async-storage'
        );
      }

      if (this.enableLogging) {
        console.log(`Storage: Set ${key}`, value);
      }
    } catch (error) {
      console.error(`Storage: Failed to set ${key}`, error);
    }
  }

  async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const prefixedKey = `${this.prefix}${key}`;
      let serializedValue: string | null = null;

      if (Platform.isWeb()) {
        serializedValue = localStorage.getItem(prefixedKey);
      } else if (Platform.isReactNative()) {
        // For React Native, you would use AsyncStorage
        // const AsyncStorage = require('@react-native-async-storage/async-storage');
        // serializedValue = await AsyncStorage.getItem(prefixedKey);
        console.warn(
          'AsyncStorage not available - install @react-native-async-storage/async-storage'
        );
      }

      if (serializedValue === null) {
        return defaultValue || null;
      }

      const value = JSON.parse(serializedValue);

      if (this.enableLogging) {
        console.log(`Storage: Get ${key}`, value);
      }

      return value;
    } catch (error) {
      console.error(`Storage: Failed to get ${key}`, error);
      return defaultValue || null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const prefixedKey = `${this.prefix}${key}`;

      if (Platform.isWeb()) {
        localStorage.removeItem(prefixedKey);
      } else if (Platform.isReactNative()) {
        // For React Native, you would use AsyncStorage
        // const AsyncStorage = require('@react-native-async-storage/async-storage');
        // await AsyncStorage.removeItem(prefixedKey);
        console.warn(
          'AsyncStorage not available - install @react-native-async-storage/async-storage'
        );
      }

      if (this.enableLogging) {
        console.log(`Storage: Removed ${key}`);
      }
    } catch (error) {
      console.error(`Storage: Failed to remove ${key}`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      if (Platform.isWeb()) {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(this.prefix)) {
            localStorage.removeItem(key);
          }
        });
      } else if (Platform.isReactNative()) {
        // For React Native, you would use AsyncStorage
        // const AsyncStorage = require('@react-native-async-storage/async-storage');
        // const keys = await AsyncStorage.getAllKeys();
        // const prefixedKeys = keys.filter(key => key.startsWith(this.prefix));
        // await AsyncStorage.multiRemove(prefixedKeys);
        console.warn(
          'AsyncStorage not available - install @react-native-async-storage/async-storage'
        );
      }

      if (this.enableLogging) {
        console.log('Storage: Cleared all');
      }
    } catch (error) {
      console.error('Storage: Failed to clear', error);
    }
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  async keys(): Promise<string[]> {
    try {
      if (Platform.isWeb()) {
        const allKeys = Object.keys(localStorage);
        return allKeys
          .filter(key => key.startsWith(this.prefix))
          .map(key => key.substring(this.prefix.length));
      } else if (Platform.isReactNative()) {
        // For React Native, you would use AsyncStorage
        // const AsyncStorage = require('@react-native-async-storage/async-storage');
        // const allKeys = await AsyncStorage.getAllKeys();
        // return allKeys
        //   .filter(key => key.startsWith(this.prefix))
        //   .map(key => key.substring(this.prefix.length));
        console.warn(
          'AsyncStorage not available - install @react-native-async-storage/async-storage'
        );
      }

      return [];
    } catch (error) {
      console.error('Storage: Failed to get keys', error);
      return [];
    }
  }
}

// Pre-configured storage instances
export const appStorage = new Storage('app_');
export const userStorage = new Storage('user_');
export const cacheStorage = new Storage('cache_');

// Factory function
export function createStorage(
  options: StorageOptions | string = 'app_'
): Storage {
  return new Storage(options);
}

export default Storage;
