import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';

// Providers
import { SettingsProvider } from './src/contexts/SettingsContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { TripProvider } from './src/contexts/TripContext';

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#333',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertsScreen}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🔔</Text>,
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>💬</Text>,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👤</Text>,
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📊</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  // App is ready for production
  
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
              borderBottomColor: '#333',
              borderBottomWidth: 1,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Main" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Admin" 
            component={AdminScreen}
            options={{ title: 'Admin Panel' }}
          />
          <Stack.Screen 
            name="DirectCall" 
            component={DirectCallScreen}
            options={{ title: 'Direct Call' }}
          />
          <Stack.Screen 
            name="Expenses" 
            component={ExpensesScreen}
            options={{ title: 'Expenses' }}
          />
          <Stack.Screen 
            name="Help" 
            component={HelpScreen}
            options={{ title: 'Help & Support' }}
          />
          <Stack.Screen 
            name="Navigation" 
            component={NavigationScreen}
            options={{ title: 'Navigation' }}
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationScreen}
            options={{ title: 'Notifications' }}
          />
          <Stack.Screen 
            name="OneTap" 
            component={OneTapScreen}
            options={{ title: 'One-Tap Actions' }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen 
            name="Trips" 
            component={TripScreen}
            options={{ title: 'Trip Management' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}