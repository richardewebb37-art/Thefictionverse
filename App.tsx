import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, StyleSheet } from 'react-native';

// Providers
import { SettingsProvider } from './src/contexts/SettingsContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { TripProvider } from './src/contexts/TripContext';
import { AlertProvider } from './src/contexts/AlertContext';
import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { MessageProvider } from './src/contexts/MessageContext';
import { EngineProvider } from './src/contexts/EngineContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import AdminScreen from './src/screens/AdminScreen';
import DirectCallScreen from './src/screens/DirectCallScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import HelpScreen from './src/screens/HelpScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import NavigationScreen from './src/screens/NavigationScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import OneTapScreen from './src/screens/OneTapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TripScreen from './src/screens/TripScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AlertsStack = createStackNavigator();
const MessagesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MoreStack = createStackNavigator();

// Common header styles
const headerStyles = {
  headerStyle: {
    backgroundColor: '#000',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold' as const,
  },
};

// ============================================
// HOME TAB STACK
// Contains: Home, Settings, Admin, Help, OneTap, DirectCall, Navigation
// ============================================
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={headerStyles}>
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <HomeStack.Screen 
        name="Admin" 
        component={AdminScreen}
        options={{ title: 'Admin Panel' }}
      />
      <HomeStack.Screen 
        name="Help" 
        component={HelpScreen}
        options={{ title: 'Help & Support' }}
      />
      <HomeStack.Screen 
        name="OneTap" 
        component={OneTapScreen}
        options={{ title: 'One-Tap Actions' }}
      />
      <HomeStack.Screen 
        name="DirectCall" 
        component={DirectCallScreen}
        options={{ title: 'Direct Call' }}
      />
      <HomeStack.Screen 
        name="Navigation" 
        component={NavigationScreen}
        options={{ title: 'Navigation' }}
      />
      <HomeStack.Screen 
        name="Notifications" 
        component={NotificationScreen}
        options={{ title: 'Notifications' }}
      />
    </HomeStack.Navigator>
  );
};

// ============================================
// ALERTS TAB STACK
// Contains: Alerts list
// ============================================
const AlertsStackNavigator = () => {
  return (
    <AlertsStack.Navigator screenOptions={headerStyles}>
      <AlertsStack.Screen 
        name="AlertsMain" 
        component={AlertsScreen}
        options={{ headerShown: false }}
      />
    </AlertsStack.Navigator>
  );
};

// ============================================
// MESSAGES TAB STACK
// Contains: Messages/Conversations
// ============================================
const MessagesStackNavigator = () => {
  return (
    <MessagesStack.Navigator screenOptions={headerStyles}>
      <MessagesStack.Screen 
        name="MessagesMain" 
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
};

// ============================================
// PROFILE TAB STACK
// Contains: Profile, Trips, Expenses
// ============================================
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={headerStyles}>
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="Trips" 
        component={TripScreen}
        options={{ title: 'Trip Management' }}
      />
      <ProfileStack.Screen 
        name="Expenses" 
        component={ExpensesScreen}
        options={{ title: 'Expenses' }}
      />
    </ProfileStack.Navigator>
  );
};

// ============================================
// MORE TAB STACK
// Contains: Reports and other features
// ============================================
const MoreStackNavigator = () => {
  return (
    <MoreStack.Navigator screenOptions={headerStyles}>
      <MoreStack.Screen 
        name="ReportsMain" 
        component={ReportsScreen}
        options={{ headerShown: false }}
      />
    </MoreStack.Navigator>
  );
};

// ============================================
// MAIN TAB NAVIGATOR
// Bottom tabs always visible
// ============================================
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#333',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="AlertsTab" 
        component={AlertsStackNavigator}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🔔</Text>,
        }}
      />
      <Tab.Screen 
        name="MessagesTab" 
        component={MessagesStackNavigator}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>💬</Text>,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👤</Text>,
        }}
      />
      <Tab.Screen 
        name="MoreTab" 
        component={MoreStackNavigator}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📊</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

// ============================================
// APP ROOT
// All providers wrapped around navigation
// ============================================
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <EngineProvider>
          <AuthProvider>
            <TripProvider>
              <AlertProvider>
                <ExpenseProvider>
                  <MessageProvider>
                    <SettingsProvider>
                      <NavigationContainer>
                        <MainTabNavigator />
                      </NavigationContainer>
                    </SettingsProvider>
                  </MessageProvider>
                </ExpenseProvider>
              </AlertProvider>
            </TripProvider>
          </AuthProvider>
        </EngineProvider>
      </SafeAreaProvider>
    </>
  );
}