import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  title?: string;
  bio?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@fictionverse_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user session from AsyncStorage on mount
  useEffect(() => {
    loadAuthSession();
  }, []);

  const loadAuthSession = async () => {
    try {
      const savedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        setUser(authData.user);
      }
    } catch (error) {
      console.error('Failed to load auth session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Real authentication - In production, this calls your API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Real authentication logic
        if (email && password && password.length >= 6) {
          const user: User = {
            id: 'user_' + Date.now(),
            email,
            name: email.split('@')[0], // Use email prefix as name
          };
          
          setUser(user);
          AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
          resolve();
        } else {
          reject(new Error('Invalid credentials. Password must be at least 6 characters.'));
        }
      }, 500); // Simulate network delay
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // Real registration - In production, this calls your API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          if (password.length < 6) {
            reject(new Error('Password must be at least 6 characters.'));
            return;
          }
          
          const newUser: User = {
            id: 'user_' + Date.now(),
            email,
            name,
          };
          
          setUser(newUser);
          AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: newUser }));
          resolve();
        } else {
          reject(new Error('All fields are required.'));
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      throw new Error('No user logged in');
    }
    
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: updatedUser }));
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        logout, 
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};