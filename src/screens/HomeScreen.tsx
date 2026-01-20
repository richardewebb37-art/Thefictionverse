import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import EngineStatusBar from '../components/EngineStatusBar';
import { useEngine } from '../contexts/EngineContext';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { isReady, engine } = useEngine();

  return (
    <SafeAreaView style={styles.container}>
      {/* Engine Status Bar - Always visible at top */}
      <EngineStatusBar showDetails={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>The Fictionverse</Text>
          <Text style={styles.subtitle}>Welcome back</Text>
        </View>

        {/* System Status Card - Now shows real engine status */}
        <View style={[styles.summaryCard, !isReady && styles.summaryCardError]}>
          <Text style={styles.cardTitle}>System Status</Text>
          <Text style={[styles.cardText, { color: isReady ? '#00ff00' : '#ff0000' }]}>
            {isReady ? 'All systems operational' : 'Engine not ready - some features may not work'}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, !isReady && styles.actionButtonDisabled]}
              onPress={() => navigation.navigate('AlertsTab')}
              disabled={!isReady}
            >
              <Text style={styles.actionIcon}>🔔</Text>
              <Text style={styles.actionButtonText}>View Alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, !isReady && styles.actionButtonDisabled]}
              onPress={() => navigation.navigate('ProfileTab', { screen: 'Trips' })}
              disabled={!isReady}
            >
              <Text style={styles.actionIcon}>🚗</Text>
              <Text style={styles.actionButtonText}>Start Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, !isReady && styles.actionButtonDisabled]}
              onPress={() => navigation.navigate('MoreTab')}
              disabled={!isReady}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionButtonText}>View Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          
          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('Settings')}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Settings</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('Notifications')}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuText}>Notifications</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('ProfileTab', { screen: 'Expenses' })}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>💰</Text>
            <Text style={styles.menuText}>Expenses</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('Help')}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuText}>Help & Support</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('Admin')}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>🔐</Text>
            <Text style={styles.menuText}>Admin Panel</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('OneTap')}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>👆</Text>
            <Text style={styles.menuText}>One-Tap Actions</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('DirectCall')}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>📞</Text>
            <Text style={styles.menuText}>Direct Call</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !isReady && styles.menuItemDisabled]}
            onPress={() => navigation.navigate('Navigation')}
            disabled={!isReady}
          >
            <Text style={styles.menuIcon}>🗺️</Text>
            <Text style={styles.menuText}>Navigation</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Engine Services Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            <ServiceCard name="Auth" active={engine.services.auth} />
            <ServiceCard name="Settings" active={engine.services.settings} />
            <ServiceCard name="Trips" active={engine.services.trips} />
            <ServiceCard name="Alerts" active={engine.services.alerts} />
            <ServiceCard name="Expenses" active={engine.services.expenses} />
            <ServiceCard name="Messages" active={engine.services.messages} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Service status card component
const ServiceCard: React.FC<{ name: string; active: boolean }> = ({ name, active }) => (
  <View style={[styles.serviceCard, active ? styles.serviceCardActive : styles.serviceCardInactive]}>
    <View style={[styles.serviceIndicator, { backgroundColor: active ? '#00ff00' : '#ff0000' }]} />
    <Text style={styles.serviceName}>{name}</Text>
    <Text style={[styles.serviceStatus, { color: active ? '#00ff00' : '#ff0000' }]}>
      {active ? 'ONLINE' : 'OFFLINE'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  summaryCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  summaryCardError: {
    borderColor: '#ff0000',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '31%',
  },
  actionButtonDisabled: {
    backgroundColor: '#333',
    opacity: 0.5,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  menuArrow: {
    color: '#666',
    fontSize: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  serviceCardActive: {
    backgroundColor: '#0a2a0a',
    borderColor: '#00ff00',
  },
  serviceCardInactive: {
    backgroundColor: '#2a0a0a',
    borderColor: '#ff0000',
  },
  serviceIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  serviceName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  serviceStatus: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;