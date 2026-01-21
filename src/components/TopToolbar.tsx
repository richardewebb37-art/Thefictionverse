import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TopToolbarProps {
  title?: string;
  showProfileMenu?: boolean;
  onProfilePress?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TopToolbar: React.FC<TopToolbarProps> = ({
  title = 'The Fictionverse',
  showProfileMenu = true,
  onProfilePress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* App Name / Logo - Left */}
      <View style={styles.leftSection}>
        <Text style={styles.appName}>{title}</Text>
      </View>

      {/* User Profile Icon - Right */}
      {showProfileMenu && (
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <Icon name="account-circle" size={32} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  leftSection: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  profileButton: {
    padding: 4,
  },
});

export default TopToolbar;
