import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEngine } from '../contexts/EngineContext';

interface EngineStatusBarProps {
  showDetails?: boolean;
  compact?: boolean;
}

const EngineStatusBar: React.FC<EngineStatusBarProps> = ({ 
  showDetails = false, 
  compact = false 
}) => {
  const { engine, isReady, checkHealth, getStatusColor, getStatusText } = useEngine();

  const formatLastHeartbeat = () => {
    if (!engine.lastHeartbeat) return 'Never';
    const seconds = Math.floor((Date.now() - engine.lastHeartbeat) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        <Text style={[styles.compactText, { color: getStatusColor() }]}>
          {engine.status}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
        <TouchableOpacity onPress={checkHealth} style={styles.refreshButton}>
          <Text style={styles.refreshText}>↻</Text>
        </TouchableOpacity>
      </View>

      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            Last heartbeat: {formatLastHeartbeat()}
          </Text>
          
          <View style={styles.servicesRow}>
            <ServiceIndicator name="Auth" active={engine.services.auth} />
            <ServiceIndicator name="Settings" active={engine.services.settings} />
            <ServiceIndicator name="Trips" active={engine.services.trips} />
            <ServiceIndicator name="Alerts" active={engine.services.alerts} />
            <ServiceIndicator name="Expenses" active={engine.services.expenses} />
            <ServiceIndicator name="Messages" active={engine.services.messages} />
          </View>

          {engine.errorMessage && (
            <Text style={styles.errorText}>Error: {engine.errorMessage}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const ServiceIndicator: React.FC<{ name: string; active: boolean }> = ({ name, active }) => (
  <View style={styles.serviceItem}>
    <View style={[styles.serviceDot, { backgroundColor: active ? '#00ff00' : '#ff0000' }]} />
    <Text style={styles.serviceName}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
  refreshButton: {
    padding: 5,
  },
  refreshText: {
    color: '#007aff',
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  detailText: {
    color: '#666',
    fontSize: 11,
    marginBottom: 6,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  serviceName: {
    color: '#999',
    fontSize: 10,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 11,
    marginTop: 6,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  compactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default EngineStatusBar;