import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEngine, EngineState } from '../contexts/EngineContext';
import { Ionicons } from '@expo/vector-icons';

const EngineStatusBar: React.FC = () => {
  const { engineState, engineStatus, getServiceStatus } = useEngine();

  const getStatusColor = (state: EngineState): string => {
    switch (state) {
      case 'RUNNING':
        return '#10B981';
      case 'INITIALIZING':
        return '#F59E0B';
      case 'IDLE':
        return '#6B7280';
      case 'ERROR':
        return '#EF4444';
      case 'OFFLINE':
        return '#374151';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (state: EngineState): string => {
    switch (state) {
      case 'RUNNING':
        return 'ENGINE RUNNING';
      case 'INITIALIZING':
        return 'ENGINE INITIALIZING';
      case 'IDLE':
        return 'ENGINE IDLE';
      case 'ERROR':
        return 'ENGINE ERROR';
      case 'OFFLINE':
        return 'ENGINE OFFLINE';
      default:
        return 'UNKNOWN';
    }
  };

  const statusColor = getStatusColor(engineState);
  const statusText = getStatusText(engineState);

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <View style={[styles.indicator, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        <Text style={styles.uptimeText}>UPTIME: {engineStatus.uptime}s</Text>
      </View>
      <View style={styles.servicesContainer}>
        <View style={styles.serviceItem}>
          <Ionicons
            name={getServiceStatus('auth') ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={getServiceStatus('auth') ? '#10B981' : '#6B7280'}
          />
          <Text style={styles.serviceText}>AUTH</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons
            name={getServiceStatus('settings') ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={getServiceStatus('settings') ? '#10B981' : '#6B7280'}
          />
          <Text style={styles.serviceText}>SETTINGS</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons
            name={getServiceStatus('trips') ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={getServiceStatus('trips') ? '#10B981' : '#6B7280'}
          />
          <Text style={styles.serviceText}>TRIPS</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons
            name={getServiceStatus('alerts') ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={getServiceStatus('alerts') ? '#10B981' : '#6B7280'}
          />
          <Text style={styles.serviceText}>ALERTS</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons
            name={getServiceStatus('expenses') ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={getServiceStatus('expenses') ? '#10B981' : '#6B7280'}
          />
          <Text style={styles.serviceText}>EXPENSES</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons
            name={getServiceStatus('messages') ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={getServiceStatus('messages') ? '#10B981' : '#6B7280'}
          />
          <Text style={styles.serviceText}>MESSAGES</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 16,
  },
  uptimeText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginLeft: 4,
  },
});

export default EngineStatusBar;