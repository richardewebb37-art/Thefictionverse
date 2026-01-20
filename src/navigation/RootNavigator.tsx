import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useEngine } from '../contexts/EngineContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AlertsScreen from '../screens/AlertsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TripScreen from '../screens/TripScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import ComingSoonScreen from '../components/ComingSoonScreen';

// Types
import { RootStackParamList, HomeTabParamList, AlertsTabParamList, MessagesTabParamList, ProfileTabParamList, MoreTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<HomeTabParamList>();
const AlertsStack = createStackNavigator<AlertsTabParamList>();
const MessagesStack = createStackNavigator<MessagesTabParamList>();
const ProfileStack = createStackNavigator<ProfileTabParamList>();
const MoreStack = createStackNavigator<MoreTabParamList>();

// Home Tab Stack
const HomeStackNavigator = () => {
  const { engineState } = useEngine();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <HomeStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
        }}
      />
      <HomeStack.Screen
        name="Admin"
        component={ComingSoonScreen}
        options={{
          headerShown: true,
          title: 'Admin Panel',
        }}
      />
      <HomeStack.Screen
        name="Help"
        component={ComingSoonScreen}
        options={{
          headerShown: true,
          title: 'Help Center',
        }}
      />
      <HomeStack.Screen
        name="OneTap"
        component={ComingSoonScreen}
        options={{
          headerShown: true,
          title: 'One Tap Access',
        }}
      />
      <HomeStack.Screen
        name="DirectCall"
        component={ComingSoonScreen}
        options={{
          headerShown: true,
          title: 'Direct Call',
        }}
      />
      <HomeStack.Screen
        name="Navigation"
        component={ComingSoonScreen}
        options={{
          headerShown: true,
          title: 'Navigation',
        }}
      />
      <HomeStack.Screen
        name="Notification"
        component={ComingSoonScreen}
        options={{
          headerShown: true,
          title: 'Notifications',
        }}
      />
    </HomeStack.Navigator>
  );
};

// Alerts Tab Stack
const AlertsStackNavigator = () => {
  return (
    <AlertsStack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
    >
      <AlertsStack.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          title: 'Alerts',
        }}
      />
    </AlertsStack.Navigator>
  );
};

// Messages Tab Stack
const MessagesStackNavigator = () => {
  return (
    <MessagesStack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
    >
      <MessagesStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Messages',
        }}
      />
    </MessagesStack.Navigator>
  );
};

// Profile Tab Stack
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <ProfileStack.Screen
        name="Trips"
        component={TripScreen}
        options={{
          title: 'Trips',
        }}
      />
      <ProfileStack.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          title: 'Expenses',
        }}
      />
    </ProfileStack.Navigator>
  );
};

// More Tab Stack
const MoreStackNavigator = () => {
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
    >
      <MoreStack.Screen
        name="Reports"
        component={ComingSoonScreen}
        options={{
          title: 'Reports',
        }}
      />
    </MoreStack.Navigator>
  );
};

// Root Tab Navigator - ALWAYS VISIBLE
const TabNavigator = () => {
  const { engineState } = useEngine();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'AlertsTab':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'MessagesTab':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'MoreTab':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="AlertsTab"
        component={AlertsStackNavigator}
        options={{
          title: 'Alerts',
        }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={MessagesStackNavigator}
        options={{
          title: 'Messages',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: 'Profile',
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreStackNavigator}
        options={{
          title: 'More',
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator - Single entry point
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;