import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

const AlertsScreen = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', title: 'Engine Warning', message: 'Temperature above normal', severity: 'high', timestamp: '2 min ago' },
    { id: '2', title: 'Fuel Low', message: 'Tank at 15% capacity', severity: 'medium', timestamp: '1 hour ago' },
    { id: '3', title: 'System Update', message: 'New version available', severity: 'low', timestamp: '3 hours ago' },
  ]);

  const clearAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ff0000';
      case 'medium': return '#ff9900';
      case 'low': return '#00ff00';
      default: return '#fff';
    }
  };

  const renderAlert = ({ item }: { item: Alert }) => (
    <TouchableOpacity style={styles.alertCard} onLongPress={() => clearAlert(item.id)}>
      <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(item.severity) }]} />
      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <Text style={styles.alertMessage}>{item.message}</Text>
        <Text style={styles.alertTimestamp}>{item.timestamp}</Text>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={() => clearAlert(item.id)}>
        <Text style={styles.clearButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts</Text>
        <Text style={styles.subtitle}>{alerts.length} active alerts</Text>
      </View>
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
});

export default AlertsScreen;