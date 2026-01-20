import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Context Providers
import { AuthProvider } from './src/contexts/AuthContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { TripProvider } from './src/contexts/TripContext';
import { AlertProvider } from './src/contexts/AlertContext';
import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { MessageProvider } from './src/contexts/MessageContext';
import { EngineProvider } from './src/contexts/EngineContext';

// Navigation
import RootNavigator from './src/navigation/RootNavigator';

// App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <EngineProvider>
        <AuthProvider>
          <TripProvider>
            <AlertProvider>
              <ExpenseProvider>
                <MessageProvider>
                  <SettingsProvider>
                    <RootNavigator />
                  </SettingsProvider>
                </MessageProvider>
              </ExpenseProvider>
            </AlertProvider>
          </TripProvider>
        </AuthProvider>
      </EngineProvider>
    </SafeAreaProvider>
  );
}