import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    pushNotifications: true,
    emailNotifications: false,
    locationServices: true,
    autoSync: true,
    soundEnabled: true,
    vibrationEnabled: true,
    lowDataMode: false,
  });

  const toggleSetting = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const sections = [
    {
      title: 'Appearance',
      items: [
        { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme' },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push alerts' },
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Get email updates' },
        { key: 'soundEnabled', label: 'Sound', description: 'Play notification sounds' },
        { key: 'vibrationEnabled', label: 'Vibration', description: 'Vibrate on alerts' },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { key: 'locationServices', label: 'Location Services', description: 'Allow location access' },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        { key: 'autoSync', label: 'Auto Sync', description: 'Sync data automatically' },
        { key: 'lowDataMode', label: 'Low Data Mode', description: 'Reduce data usage' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Settings</Text>

        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={settings[item.key as keyof typeof settings]}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{ false: '#333', true: '#007aff' }}
                  thumbColor={settings[item.key as keyof typeof settings] ? '#fff' : '#999'}
                />
              </View>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>Edit Profile</Text>
              <Text style={styles.menuItemDescription}>Update your information</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>Change Password</Text>
              <Text style={styles.menuItemDescription}>Update your password</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>Privacy Settings</Text>
              <Text style={styles.menuItemDescription}>Manage your privacy</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>Help Center</Text>
              <Text style={styles.menuItemDescription}>Get help and support</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>Contact Us</Text>
              <Text style={styles.menuItemDescription}>Reach out to our team</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemLabel}>Rate App</Text>
              <Text style={styles.menuItemDescription}>Leave a review</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>37</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Platform</Text>
            <Text style={styles.infoValue}>Android</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearDataButton}>
          <Text style={styles.clearDataButtonText}>Clear All Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
  },
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 3,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#666',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearDataButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearDataButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;