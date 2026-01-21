import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  icon: any;
  color: string;
}

interface Destination {
  id: string;
  name: string;
  address: string;
  distance?: string;
  icon: any;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  size: 'large' | 'medium';
}

interface Settings {
  darkMode: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  locationServices: boolean;
  autoSync: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  lowDataMode: boolean;
  emergencyContacts: EmergencyContact[];
  savedDestinations: Destination[];
  quickActions: QuickAction[];
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: (key: keyof Settings, value: any) => Promise<void>;
  resetSettings: () => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: Settings = {
  darkMode: true,
  pushNotifications: true,
  emailNotifications: false,
  locationServices: true,
  autoSync: true,
  soundEnabled: true,
  vibrationEnabled: true,
  lowDataMode: false,
  emergencyContacts: [
    { id: 'dispatch', name: 'Dispatch', phone: '911', icon: 'siren', color: '#EF4444' },
    { id: 'fleet', name: 'Fleet Manager', phone: '555-0123', icon: 'person', color: '#3B82F6' },
    { id: 'roadside', name: 'Roadside Assistance', phone: '555-0199', icon: 'car', color: '#F59E0B' },
  ],
  savedDestinations: [],
  quickActions: [],
};

const SETTINGS_STORAGE_KEY = '@fictionverse_settings';

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = async (key: keyof Settings, value: any) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to update setting:', error);
      // Revert on error
      setSettings(settings);
      throw error;
    }
  };

  const resetSettings = async () => {
    try {
      setSettings(DEFAULT_SETTINGS);
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch (error) {
      console.error('Failed to reset settings:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};