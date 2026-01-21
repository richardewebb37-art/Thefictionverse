import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../contexts/SettingsContext';

interface Destination {
  id: string;
  name: string;
  address: string;
  distance?: string;
  icon: any;
}

const NavigationScreen = () => {
  const { settings } = useSettings();
  
  // Get saved destinations from settings or show empty state
  const destinations: Destination[] = settings?.savedDestinations || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="map" size={32} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Navigation</Text>
            <Text style={styles.subtitle}>Route planning & directions</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="navigate" size={32} color="#FFFFFF" />
            </View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Start Navigation</Text>
              <Text style={styles.actionDescription}>Begin route guidance</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#10B981' }]}>
              <Ionicons name="location" size={32} color="#FFFFFF" />
            </View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Search Location</Text>
              <Text style={styles.actionDescription}>Find destinations</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Destinations</Text>
          
          {destinations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="location-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyText}>No saved destinations</Text>
              <Text style={styles.emptySubtext}>Add your favorite locations</Text>
            </View>
          ) : (
            destinations.map((dest) => (
              <TouchableOpacity key={dest.id} style={styles.destinationCard}>
                <View style={styles.destinationLeft}>
                  <View style={styles.destinationIcon}>
                    <Ionicons name={dest.icon} size={24} color="#3B82F6" />
                  </View>
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{dest.name}</Text>
                    <Text style={styles.destinationAddress}>{dest.address}</Text>
                    {dest.distance && (
                      <Text style={styles.destinationDistance}>{dest.distance} away</Text>
                    )}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation Settings</Text>
          
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="car" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Vehicle Profile</Text>
                <Text style={styles.cardDescription}>Set your vehicle type</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="options" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Route Preferences</Text>
                <Text style={styles.cardDescription}>Avoid highways, tolls</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 16,
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  destinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  destinationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  destinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationInfo: {
    marginLeft: 16,
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  destinationAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  destinationDistance: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
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
});

export default NavigationScreen;