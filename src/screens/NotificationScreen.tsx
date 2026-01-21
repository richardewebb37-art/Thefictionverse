import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAlert } from '../contexts/AlertContext';

const NotificationScreen = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [smsEnabled, setSmsEnabled] = React.useState(false);
  
  const { alerts, clearAllAlerts, markAsRead, loading } = useAlert();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="notifications" size={32} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>Manage alerts and updates</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="cloud-upload" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Push Notifications</Text>
                <Text style={styles.cardDescription}>Receive alerts on your device</Text>
              </View>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="mail" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Email Notifications</Text>
                <Text style={styles.cardDescription}>Receive updates via email</Text>
              </View>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="chatbubbles" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>SMS Notifications</Text>
                <Text style={styles.cardDescription}>Receive text messages</Text>
              </View>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity style={styles.clearButton} onPress={clearAllAlerts}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading notifications...</Text>
            </View>
          ) : alerts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-off" size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>No notifications yet</Text>
            </View>
          ) : (
            alerts.map((alert) => (
              <TouchableOpacity 
                key={alert.id} 
                style={[styles.notificationCard, !alert.read && styles.notificationCardUnread]}
                onPress={() => markAsRead(alert.id)}
              >
                <View style={styles.notificationLeft}>
                  <View style={[styles.notificationIcon, { backgroundColor: getSeverityColor(alert.severity) + '20' }]}>
                    <Ionicons name={getSeverityIcon(alert.severity)} size={24} color={getSeverityColor(alert.severity)} />
                  </View>
                  <View style={styles.notificationInfo}>
                    <Text style={[styles.notificationTitle, !alert.read && styles.notificationTitleUnread]}>
                      {alert.severity.toUpperCase()}
                    </Text>
                    <Text style={styles.notificationMessage}>{alert.message}</Text>
                    <Text style={styles.notificationTime}>{formatTimestamp(alert.timestamp)}</Text>
                  </View>
                </View>
                {!alert.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical': return '#EF4444';
    case 'warning': return '#F59E0B';
    case 'info': return '#3B82F6';
    default: return '#6B7280';
  }
}

function getSeverityIcon(severity: string): any {
  switch (severity.toLowerCase()) {
    case 'critical': return 'warning';
    case 'warning': return 'alert-circle';
    case 'info': return 'information-circle';
    default: return 'notifications';
  }
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
  return `${Math.floor(diff / 86400000)} days ago`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  notificationCardUnread: {
    backgroundColor: '#EFF6FF',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationInfo: {
    marginLeft: 16,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  notificationTitleUnread: {
    fontWeight: '600',
    color: '#111827',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
});

export default NotificationScreen;