/**
 * Storage-related type definitions
 */

/**
 * Common storage value types
 */
export type StorageValue =
  | string
  | number
  | boolean
  | object
  | null
  | undefined;

/**
 * Storage options interface
 */
export interface StorageOptions {
  prefix?: string;
  enableLogging?: boolean;
}
