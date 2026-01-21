import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens - Only HomeScreen (Dashboard)
import HomeScreen from '../screens/HomeScreen';

// Components
import TopToolbar from '../components/TopToolbar';
import UserProfileMenu from '../components/UserProfileMenu';

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfilePress = () => {
    setShowProfileMenu(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <>
              <TopToolbar onProfilePress={handleProfilePress} />
              <HomeScreen {...props} />
              <UserProfileMenu
                visible={showProfileMenu}
                onClose={() => setShowProfileMenu(false)}
                menuItems={[]}
              />
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;