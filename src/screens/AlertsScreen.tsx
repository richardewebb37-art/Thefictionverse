import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAlert } from '../contexts/AlertContext';

const AlertsScreen = () => {
  const { alerts, loading, clearAlert, clearAllAlerts, markAsRead } = useAlert();
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  const handleClearAlert = async (id: string) => {
    try {
      await clearAlert(id);
    } catch (error) {
      Alert.alert('Error', 'Failed to clear alert');
      console.error(error);
    }
  };

  const handleClearAll = async () => {
    Alert.alert(
      'Clear All Alerts',
      'Are you sure you want to clear all alerts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllAlerts();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear alerts');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ff0000';
      case 'medium': return '#ff9900';
      case 'low': return '#00ff00';
      default: return '#fff';
    }
  };

  const renderAlert = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.alertCard} onPress={() => markAsRead(item.id)}>
      <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(item.severity) }]} />
      <View style={styles.alertContent}>
        <Text style={[styles.alertTitle, !item.read && styles.unread]}>{item.title}</Text>
        <Text style={styles.alertMessage}>{item.message}</Text>
        <Text style={styles.alertTimestamp}>{formatTimestamp(item.timestamp)}</Text>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={() => handleClearAlert(item.id)}>
        <Text style={styles.clearButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Alerts</Text>
          <Text style={styles.subtitle}>{alerts.length} active alerts</Text>
        </View>
        {alerts.length > 0 && (
          <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
            <Text style={styles.clearAllButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading alerts...</Text>
        </View>
      ) : (
        <FlatList
          data={alerts}
          renderItem={renderAlert}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No alerts</Text>
            </View>
          }
        />
      )}
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
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  severityIndicator: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    color: '#ff0000',
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  unread: {
    fontWeight: 'bold',
  },
  clearAllButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearAllButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
  },
});

export default AlertsScreen;