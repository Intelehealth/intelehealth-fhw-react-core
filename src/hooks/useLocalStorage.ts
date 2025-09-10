import { useCallback, useEffect, useState } from 'react';

export interface UseLocalStorageOptions<T> {
  defaultValue?: T;
  serializer?: {
    stringify: (value: T) => string;
    parse: (value: string) => T;
  };
  onError?: (error: Error) => void;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const {
    defaultValue,
    serializer = {
      stringify: JSON.stringify,
      parse: JSON.parse,
    },
    onError = console.error,
  } = options;

  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return defaultValue ?? initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        return defaultValue ?? initialValue;
      }

      return serializer.parse(item);
    } catch (error) {
      onError(error as Error);
      return defaultValue ?? initialValue;
    }
  });

  // Function to set value in localStorage and state
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save to state
        setStoredValue(valueToStore);

        // Save to localStorage (React only)
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, serializer.stringify(valueToStore));
        }
      } catch (error) {
        onError(error as Error);
      }
    },
    [key, storedValue, serializer, onError]
  );

  // Function to remove value from localStorage and state
  const removeValue = useCallback(() => {
    try {
      // Reset to initial value
      setStoredValue(defaultValue ?? initialValue);

      // Remove from localStorage (React only)
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      onError(error as Error);
    }
  }, [key, defaultValue, initialValue, onError]);

  // Listen for changes in other tabs/windows (React only)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.addEventListener) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(serializer.parse(e.newValue));
        } catch (error) {
          onError(error as Error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      if (typeof window !== 'undefined' && window.removeEventListener) {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, [key, serializer, onError]);

  return [storedValue, setValue, removeValue];
}
