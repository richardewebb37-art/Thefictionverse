import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: number;
  read: boolean;
}

interface AlertContextType {
  alerts: Alert[];
  loading: boolean;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => Promise<void>;
  clearAlert: (id: string) => Promise<void>;
  clearAllAlerts: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  getUnreadCount: () => number;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const ALERTS_STORAGE_KEY = '@fictionverse_alerts';

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  // Load alerts from AsyncStorage on mount
  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const savedAlerts = await AsyncStorage.getItem(ALERTS_STORAGE_KEY);
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAlert = async (alertData: Omit<Alert, 'id' | 'timestamp'>) => {
    try {
      const newAlert: Alert = {
        ...alertData,
        id: 'alert_' + Date.now(),
        timestamp: Date.now(),
      };
      const updatedAlerts = [newAlert, ...alerts];
      setAlerts(updatedAlerts);
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error('Failed to add alert:', error);
      throw error;
    }
  };

  const clearAlert = async (id: string) => {
    try {
      const updatedAlerts = alerts.filter(alert => alert.id !== id);
      setAlerts(updatedAlerts);
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error('Failed to clear alert:', error);
      throw error;
    }
  };

  const clearAllAlerts = async () => {
    try {
      setAlerts([]);
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('Failed to clear all alerts:', error);
      throw error;
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const updatedAlerts = alerts.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      );
      setAlerts(updatedAlerts);
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
      throw error;
    }
  };

  const getUnreadCount = () => {
    return alerts.filter(alert => !alert.read).length;
  };

  return (
    <AlertContext.Provider value={{ alerts, loading, addAlert, clearAlert, clearAllAlerts, markAsRead, getUnreadCount }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};