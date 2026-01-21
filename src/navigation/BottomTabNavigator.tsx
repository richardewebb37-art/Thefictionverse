import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface TabItem {
  id: string;
  label: string;
  icon: string;
  screen: string;
}

const tabs: TabItem[] = [
  { id: 'trips', label: 'Trips', icon: 'map-marker-path', screen: 'Trips' },
  { id: 'messages', label: 'Messages', icon: 'message-text', screen: 'Messages' },
  { id: 'expenses', label: 'Expenses', icon: 'cash', screen: 'Expenses' },
  { id: 'navigation', label: 'Navigation', icon: 'navigation', screen: 'Navigation' },
];

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  const handleTabPress = (tab: TabItem) => {
    navigation.navigate(tab.screen as never);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.screen;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={isActive ? '#6C63FF' : '#a0a0a0'}
              style={[
                styles.tabIcon,
                isActive && styles.tabIconActive,
              ]}
            />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabIconActive: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#a0a0a0',
  },
  tabLabelActive: {
    color: '#6C63FF',
    fontWeight: '600',
  },
});

export default BottomTabNavigator;
