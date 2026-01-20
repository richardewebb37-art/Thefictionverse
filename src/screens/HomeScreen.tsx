import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import EngineStatusBar from '../components/EngineStatusBar';
import { useEngine } from '../contexts/EngineContext';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { engineState, engineStatus, getServiceStatus } = useEngine();
  const [loading, setLoading] = React.useState(false);

  const isEngineReady = engineState === 'RUNNING';

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Engine Status Bar - Always visible at top */}
      <EngineStatusBar />

      <SafeAreaView style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              tintColor="#3B82F6"
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>The Fictionverse</Text>
            <Text style={styles.subtitle}>Welcome back</Text>
          </View>

          {/* System Status Card - Shows real engine status */}
          <View style={[styles.summaryCard, !isEngineReady && styles.summaryCardError]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>System Status</Text>
              {!isEngineReady && <ActivityIndicator size="small" color="#F59E0B" />}
            </View>
            <Text style={[styles.cardText, { color: isEngineReady ? '#10B981' : '#EF4444' }]}>
              {isEngineReady ? 'All systems operational' : 'Engine initializing - some features may not work'}
            </Text>
            <Text style={styles.cardSubtext}>
              Engine State: {engineState}
            </Text>
          </View>

          {/* Service Status Cards */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            <View style={styles.serviceGrid}>
              <View style={styles.serviceCard}>
                <Ionicons
                  name={getServiceStatus('auth') ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={getServiceStatus('auth') ? '#10B981' : '#EF4444'}
                />
                <Text style={styles.serviceCardTitle}>Auth</Text>
                <Text style={styles.serviceCardText}>
                  {getServiceStatus('auth') ? 'Online' : 'Offline'}
                </Text>
              </View>
              <View style={styles.serviceCard}>
                <Ionicons
                  name={getServiceStatus('settings') ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={getServiceStatus('settings') ? '#10B981' : '#EF4444'}
                />
                <Text style={styles.serviceCardTitle}>Settings</Text>
                <Text style={styles.serviceCardText}>
                  {getServiceStatus('settings') ? 'Online' : 'Offline'}
                </Text>
              </View>
              <View style={styles.serviceCard}>
                <Ionicons
                  name={getServiceStatus('trips') ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={getServiceStatus('trips') ? '#10B981' : '#EF4444'}
                />
                <Text style={styles.serviceCardTitle}>Trips</Text>
                <Text style={styles.serviceCardText}>
                  {getServiceStatus('trips') ? 'Online' : 'Offline'}
                </Text>
              </View>
              <View style={styles.serviceCard}>
                <Ionicons
                  name={getServiceStatus('alerts') ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={getServiceStatus('alerts') ? '#10B981' : '#EF4444'}
                />
                <Text style={styles.serviceCardTitle}>Alerts</Text>
                <Text style={styles.serviceCardText}>
                  {getServiceStatus('alerts') ? 'Online' : 'Offline'}
                </Text>
              </View>
              <View style={styles.serviceCard}>
                <Ionicons
                  name={getServiceStatus('expenses') ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={getServiceStatus('expenses') ? '#10B981' : '#EF4444'}
                />
                <Text style={styles.serviceCardTitle}>Expenses</Text>
                <Text style={styles.serviceCardText}>
                  {getServiceStatus('expenses') ? 'Online' : 'Offline'}
                </Text>
              </View>
              <View style={styles.serviceCard}>
                <Ionicons
                  name={getServiceStatus('messages') ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={getServiceStatus('messages') ? '#10B981' : '#EF4444'}
                />
                <Text style={styles.serviceCardTitle}>Messages</Text>
                <Text style={styles.serviceCardText}>
                  {getServiceStatus('messages') ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, !isEngineReady && styles.actionButtonDisabled]}
                onPress={() => navigation.navigate('AlertsTab')}
                disabled={!isEngineReady}
              >
                <Ionicons name="notifications" size={24} color={isEngineReady ? '#FFFFFF' : '#9CA3AF'} />
                <Text style={[styles.actionButtonText, !isEngineReady && styles.actionButtonTextDisabled]}>
                  View Alerts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, !isEngineReady && styles.actionButtonDisabled]}
                onPress={() => navigation.navigate('ProfileTab', { screen: 'Trips' })}
                disabled={!isEngineReady}
              >
                <Ionicons name="car" size={24} color={isEngineReady ? '#FFFFFF' : '#9CA3AF'} />
                <Text style={[styles.actionButtonText, !isEngineReady && styles.actionButtonTextDisabled]}>
                  Start Trip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, !isEngineReady && styles.actionButtonDisabled]}
                onPress={() => navigation.navigate('ProfileTab', { screen: 'Expenses' })}
                disabled={!isEngineReady}
              >
                <Ionicons name="receipt" size={24} color={isEngineReady ? '#FFFFFF' : '#9CA3AF'} />
                <Text style={[styles.actionButtonText, !isEngineReady && styles.actionButtonTextDisabled]}>
                  Track Expenses
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, !isEngineReady && styles.actionButtonDisabled]}
                onPress={() => navigation.navigate('MessagesTab')}
                disabled={!isEngineReady}
              >
                <Ionicons name="chatbubbles" size={24} color={isEngineReady ? '#FFFFFF' : '#9CA3AF'} />
                <Text style={[styles.actionButtonText, !isEngineReady && styles.actionButtonTextDisabled]}>
                  Messages
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Engine Info */}
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Engine Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>State:</Text>
                <Text style={styles.infoValue}>{engineState}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Uptime:</Text>
                <Text style={styles.infoValue}>{engineStatus.uptime}s</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Last Updated:</Text>
                <Text style={styles.infoValue}>
                  {engineStatus.lastUpdated.toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  summaryCardError: {
    borderColor: '#EF4444',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 12,
    alignItems: 'center',
  },
  serviceCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
  serviceCardText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  actionButtonTextDisabled: {
    color: '#FFFFFF',
    opacity: 0.7,
  },
  infoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  infoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default HomeScreen;