export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

export function mergeObjects<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;

  const result = deepClone(target);

  sources.forEach(source => {
    if (source) {
      Object.keys(source).forEach(key => {
        const value = source[key];
        if (value !== undefined) {
          if (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value)
          ) {
            (result as any)[key] = mergeObjects(
              (result as any)[key] || {},
              value
            );
          } else {
            (result as any)[key] = value;
          }
        }
      });
    }
  });

  return result;
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result;
}

export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };

  keys.forEach(key => {
    delete result[key];
  });

  return result;
}

export function flattenObject(
  obj: Record<string, any>,
  prefix: string = '',
  separator: string = '.'
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}${separator}${key}` : key;
      const value = obj[key];

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(result, flattenObject(value, newKey, separator));
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

export function unflattenObject(
  obj: Record<string, any>,
  separator: string = '.'
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const keys = key.split(separator);
      let current = result;

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = obj[key];
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      });
    }
  }

  return result;
}

export function isEmpty(obj: any): boolean {
  if (obj === null || obj === undefined) return true;

  if (typeof obj === 'string') return obj.trim().length === 0;

  if (Array.isArray(obj)) return obj.length === 0;

  if (typeof obj === 'object') return Object.keys(obj).length === 0;

  return false;
}

export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a === null || b === null) return a === b;

  if (typeof a !== typeof b) return false;

  if (typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
      }
      return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!isEqual(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

export function get<T = any>(
  obj: any,
  path: string | string[],
  defaultValue?: T
): T | undefined {
  if (!obj || !path) return defaultValue;

  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue;
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

export function set<T = any>(obj: any, path: string | string[], value: T): T {
  if (!obj || !path) return obj;

  const keys = Array.isArray(path) ? path : path.split('.');
  const result = deepClone(obj);
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!key || !(key in current) || typeof current[key] !== 'object') {
      if (key) {
        current[key] = {};
      }
    }
    if (key) {
      current = current[key];
    }
  }

  const lastKey = keys[keys.length - 1];
  if (lastKey) {
    current[lastKey] = value;
  }
  return result;
}

export function has(obj: any, path: string | string[]): boolean {
  if (!obj || !path) return false;

  const keys = Array.isArray(path) ? path : path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return false;
    }
    current = current[key];
  }

  return true;
}

export function keys(obj: any): string[] {
  if (!obj || typeof obj !== 'object') return [];
  return Object.keys(obj);
}

export function values(obj: any): any[] {
  if (!obj || typeof obj !== 'object') return [];
  return Object.values(obj);
}

export function entries(obj: any): [string, any][] {
  if (!obj || typeof obj !== 'object') return [];
  return Object.entries(obj);
}

export function mapValues<T extends Record<string, any>, R>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  const result = {} as Record<keyof T, R>;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = fn(obj[key], key);
    }
  }

  return result;
}

export function filterObject<T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

export function invert(obj: Record<string, any>): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = String(obj[key]);
      if (!(value in result)) {
        result[value] = [];
      }
      result[value]?.push(key);
    }
  }

  return result;
}

export function defaults<T extends Record<string, any>>(
  obj: T,
  ...defaults: Partial<T>[]
): T {
  return mergeObjects({} as T, ...defaults.reverse(), obj);
}
