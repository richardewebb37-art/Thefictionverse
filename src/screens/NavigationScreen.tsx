import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NavigationScreen = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const routes = [
    { id: '1', name: 'Home to Office', distance: '12.5 km', time: '25 min', status: 'Active' },
    { id: '2', name: 'Office to Client', distance: '8.3 km', time: '18 min', status: 'Completed' },
    { id: '3', name: 'Return Home', distance: '15.2 km', time: '32 min', status: 'Pending' },
  ];

  const markers = [
    { id: '1', name: 'Current Location', type: 'current', lat: 40.7128, lng: -74.0060 },
    { id: '2', name: 'Office', type: 'destination', lat: 40.7580, lng: -73.9855 },
    { id: '3', name: 'Client Site', type: 'waypoint', lat: 40.7484, lng: -73.9857 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Navigation</Text>
        <Text style={styles.subtitle}>Select a route to begin</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>🗺️ Map View</Text>
          <Text style={styles.mapPlaceholderSubtext}>Interactive map with routes</Text>
        </View>
        
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlButton}>
            <Text style={styles.mapControlText}>⊕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <Text style={styles.mapControlText}>⊖</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <Text style={styles.mapControlText}>⟲</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <Text style={styles.mapControlText}>◎</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.routesSection}>
        <Text style={styles.sectionTitle}>Available Routes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routesScroll}>
          {routes.map(route => (
            <TouchableOpacity 
              key={route.id}
              style={[
                styles.routeCard,
                selectedRoute === route.id && styles.routeCardSelected
              ]}
              onPress={() => setSelectedRoute(route.id)}
            >
              <View style={styles.routeHeader}>
                <Text style={styles.routeName}>{route.name}</Text>
                <View style={[
                  styles.statusBadge,
                  route.status === 'Active' && styles.statusActive,
                  route.status === 'Completed' && styles.statusCompleted,
                  route.status === 'Pending' && styles.statusPending
                ]}>
                  <Text style={styles.statusText}>{route.status}</Text>
                </View>
              </View>
              <View style={styles.routeDetails}>
                <Text style={styles.routeDetail}>📍 {route.distance}</Text>
                <Text style={styles.routeDetail}>⏱ {route.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.markersSection}>
        <Text style={styles.sectionTitle}>Route Markers</Text>
        {markers.map(marker => (
          <View key={marker.id} style={styles.markerItem}>
            <View style={[
              styles.markerDot,
              marker.type === 'current' && styles.markerCurrent,
              marker.type === 'destination' && styles.markerDestination,
              marker.type === 'waypoint' && styles.markerWaypoint
            ]} />
            <Text style={styles.markerName}>{marker.name}</Text>
            <Text style={styles.markerCoords}>
              {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.startNavigationButton}>
        <Text style={styles.startNavigationText}>▶ Start Navigation</Text>
      </TouchableOpacity>
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
  mapContainer: {
    height: 300,
    backgroundColor: '#1a1a1a',
    margin: 15,
    borderRadius: 10,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 24,
    color: '#666',
    marginBottom: 10,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#444',
  },
  mapControls: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  mapControlButton: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapControlText: {
    fontSize: 20,
    color: '#fff',
  },
  routesSection: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  routesScroll: {
    flexDirection: 'row',
  },
  routeCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    minWidth: 200,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  routeCardSelected: {
    borderColor: '#007aff',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#00ff00',
  },
  statusCompleted: {
    backgroundColor: '#007aff',
  },
  statusPending: {
    backgroundColor: '#ff9900',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  routeDetail: {
    fontSize: 14,
    color: '#999',
  },
  markersSection: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  markerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  markerCurrent: {
    backgroundColor: '#00ff00',
  },
  markerDestination: {
    backgroundColor: '#ff0000',
  },
  markerWaypoint: {
    backgroundColor: '#ff9900',
  },
  markerName: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  markerCoords: {
    fontSize: 12,
    color: '#666',
  },
  startNavigationButton: {
    backgroundColor: '#00ff00',
    margin: 15,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  startNavigationText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NavigationScreen;