import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Trip Started', message: 'Your trip to downtown has begun', type: 'info', timestamp: '5 min ago', read: false },
    { id: '2', title: 'Low Fuel Warning', message: 'Fuel level at 15%', type: 'warning', timestamp: '1 hour ago', read: false },
    { id: '3', title: 'Update Available', message: 'Version 1.1.0 is ready to install', type: 'success', timestamp: '3 hours ago', read: true },
    { id: '4', title: 'Error Syncing', message: 'Failed to sync data, please try again', type: 'error', timestamp: '5 hours ago', read: true },
  ]);

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    settingDescription: 'Receive email alerts',
  });

  const toggleRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return '#007aff';
      case 'warning': return '#ff9900';
      case 'error': return '#ff0000';
      case 'success': return '#00ff00';
      default: return '#fff';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'success': return '✅';
      default: return '📢';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationCard,
        !item.read && styles.notificationUnread
      ]}
      onPress={() => toggleRead(item.id)}
    >
      <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.type) }]} />
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.timestamp}</Text>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        {item.read && (
          <Text style={styles.readBadge}>Read</Text>
        )}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => setNotifications(notifications.filter(n => n.id !== item.id))}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={markAllRead}>
            <Text style={styles.headerButtonText}>Mark All Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={clearAll}>
            <Text style={[styles.headerButtonText, styles.headerButtonTextDanger]}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        }
        style={styles.list}
      />

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive push notifications</Text>
          </View>
          <Switch
            value={settings.pushNotifications}
            onValueChange={(value) => setSettings({ ...settings, pushNotifications: value })}
            trackColor={{ false: '#333', true: '#007aff' }}
            thumbColor={settings.pushNotifications ? '#fff' : '#999'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Text style={styles.settingDescription}>Receive email alerts</Text>
          </View>
          <Switch
            value={settings.emailNotifications}
            onValueChange={(value) => setSettings({ ...settings, emailNotifications: value })}
            trackColor={{ false: '#333', true: '#007aff' }}
            thumbColor={settings.emailNotifications ? '#fff' : '#999'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Text style={styles.settingDescription}>Play notification sound</Text>
          </View>
          <Switch
            value={settings.soundEnabled}
            onValueChange={(value) => setSettings({ ...settings, soundEnabled: value })}
            trackColor={{ false: '#333', true: '#007aff' }}
            thumbColor={settings.soundEnabled ? '#fff' : '#999'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Text style={styles.settingDescription}>Vibrate on notifications</Text>
          </View>
          <Switch
            value={settings.vibrationEnabled}
            onValueChange={(value) => setSettings({ ...settings, vibrationEnabled: value })}
            trackColor={{ false: '#333', true: '#007aff' }}
            thumbColor={settings.vibrationEnabled ? '#fff' : '#999'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#007aff',
    fontSize: 14,
  },
  headerButtonTextDanger: {
    color: '#ff0000',
  },
  list: {
    flex: 1,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  notificationUnread: {
    backgroundColor: '#2a2a2a',
    borderLeftWidth: 3,
    borderLeftColor: '#007aff',
  },
  typeIndicator: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  readBadge: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    color: '#ff0000',
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  settingsSection: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default NotificationScreen;