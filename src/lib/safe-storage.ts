/**
 * Safe localStorage wrapper with error handling
 * Prevents crashes in Safari private mode, quota exceeded, and other edge cases
 */

export const safeLocalStorage = {
  /**
   * Safely get item from localStorage
   * @param key Storage key
   * @returns Value or null if error/not found
   */
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(key);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Failed to get localStorage item "${key}":`, error);
      }
      return null;
    }
  },

  /**
   * Safely set item in localStorage
   * @param key Storage key
   * @param value Value to store
   * @returns true if successful, false otherwise
   */
  setItem: (key: string, value: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Failed to set localStorage item "${key}":`, error);
      }
      return false;
    }
  },

  /**
   * Safely remove item from localStorage
   * @param key Storage key
   * @returns true if successful, false otherwise
   */
  removeItem: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Failed to remove localStorage item "${key}":`, error);
      }
      return false;
    }
  },

  /**
   * Safely parse JSON from localStorage
   * @param key Storage key
   * @returns Parsed object or null if error/invalid
   */
  getJSON: <T = any>(key: string): T | null => {
    const item = safeLocalStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Failed to parse JSON from localStorage "${key}":`, error);
      }
      return null;
    }
  },

  /**
   * Safely stringify and save JSON to localStorage
   * @param key Storage key
   * @param value Object to store
   * @returns true if successful, false otherwise
   */
  setJSON: <T = any>(key: string, value: T): boolean => {
    try {
      const serialized = JSON.stringify(value);
      return safeLocalStorage.setItem(key, serialized);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Failed to stringify JSON for localStorage "${key}":`, error);
      }
      return false;
    }
  },

  /**
   * Check if localStorage is available
   * @returns true if localStorage is accessible
   */
  isAvailable: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
};

export default safeLocalStorage;
