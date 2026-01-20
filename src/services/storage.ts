import AsyncStorage from '@react-native-async-storage/async-storage';

// Generic storage utility functions
export const StorageService = {
  // Generic save function
  async save<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Failed to save data for key ${key}:`, error);
      throw error;
    }
  },

  // Generic get function
  async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Failed to get data for key ${key}:`, error);
      return null;
    }
  },

  // Generic remove function
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove data for key ${key}:`, error);
      throw error;
    }
  },

  // Generic update function (merge with existing data)
  async update<T extends Record<string, any>>(key: string, updates: Partial<T>): Promise<void> {
    try {
      const existingData = await this.get<T>(key);
      const updatedData = existingData ? { ...existingData, ...updates } : updates;
      await this.save(key, updatedData);
    } catch (error) {
      console.error(`Failed to update data for key ${key}:`, error);
      throw error;
    }
  },

  // Clear all data
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear all data:', error);
      throw error;
    }
  },

  // Get all keys
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Failed to get all keys:', error);
      return [];
    }
  },

  // Get multiple items by keys
  async multiGet<T>(keys: string[]): Promise<Map<string, T>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result = new Map<string, T>();
      
      pairs.forEach(([key, value]) => {
        if (value) {
          result.set(key, JSON.parse(value));
        }
      });
      
      return result;
    } catch (error) {
      console.error('Failed to multi-get data:', error);
      return new Map();
    }
  },

  // Remove multiple keys
  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Failed to multi-remove data:', error);
      throw error;
    }
  },
};

// Storage keys constants
export const STORAGE_KEYS = {
  AUTH: '@fictionverse_auth',
  SETTINGS: '@fictionverse_settings',
  PROFILE: '@fictionverse_profile',
  TRIPS: '@fictionverse_trips',
  POSTS: '@fictionverse_posts',
  MESSAGES: '@fictionverse_messages',
  EXPENSES: '@fictionverse_expenses',
  ALERTS: '@fictionverse_alerts',
} as const;