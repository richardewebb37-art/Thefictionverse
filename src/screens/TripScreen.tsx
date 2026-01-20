import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Trip {
  id: string;
  destination: string;
  distance: string;
  duration: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled';
}

const TripScreen = () => {
  const [trips, setTrips] = useState<Trip[]>([
    { id: '1', destination: 'Downtown Office', distance: '12.5 km', duration: '25 min', date: '2024-01-19', status: 'completed' },
    { id: '2', destination: 'Client Meeting', distance: '8.3 km', duration: '18 min', date: '2024-01-19', status: 'in-progress' },
    { id: '3', destination: 'Airport Pickup', distance: '22.0 km', duration: '45 min', date: '2024-01-20', status: 'scheduled' },
    { id: '4', destination: 'Warehouse Visit', distance: '15.2 km', duration: '32 min', date: '2024-01-21', status: 'scheduled' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTrip, setNewTrip] = useState({ destination: '', distance: '', duration: '', date: '' });

  const addTrip = () => {
    if (newTrip.destination && newTrip.distance) {
      const trip: Trip = {
        id: Date.now().toString(),
        destination: newTrip.destination,
        distance: newTrip.distance,
        duration: newTrip.duration || 'N/A',
        date: newTrip.date || new Date().toISOString().split('T')[0],
        status: 'scheduled',
      };
      setTrips([trip, ...trips]);
      setModalVisible(false);
      setNewTrip({ destination: '', distance: '', duration: '', date: '' });
    }
  };

  const deleteTrip = (id: string) => {
    setTrips(trips.filter(t => t.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#00ff00';
      case 'in-progress': return '#007aff';
      case 'scheduled': return '#ff9900';
      default: return '#999';
    }
  };

  const renderTrip = ({ item }: { item: Trip }) => (
    <TouchableOpacity style={styles.tripCard}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
      <View style={styles.tripContent}>
        <View style={styles.tripHeader}>
          <Text style={styles.tripDestination}>{item.destination}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status.replace('-', ' ').toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.tripDetails}>
          <Text style={styles.tripDetail}>📍 {item.distance}</Text>
          <Text style={styles.tripDetail}>⏱ {item.duration}</Text>
          <Text style={styles.tripDetail}>📅 {item.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTrip(item.id)}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trip Management</Text>
        <Text style={styles.subtitle}>{trips.length} trips</Text>
      </View>

      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{trips.filter(t => t.status === 'completed').length}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{trips.filter(t => t.status === 'in-progress').length}</Text>
          <Text style={styles.summaryLabel}>In Progress</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{trips.filter(t => t.status === 'scheduled').length}</Text>
          <Text style={styles.summaryLabel}>Scheduled</Text>
        </View>
      </View>

      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Trip</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Trip</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Destination"
              placeholderTextColor="#666"
              value={newTrip.destination}
              onChangeText={(text) => setNewTrip({ ...newTrip, destination: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Distance (e.g., 12.5 km)"
              placeholderTextColor="#666"
              value={newTrip.distance}
              onChangeText={(text) => setNewTrip({ ...newTrip, distance: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Duration (e.g., 25 min)"
              placeholderTextColor="#666"
              value={newTrip.duration}
              onChangeText={(text) => setNewTrip({ ...newTrip, duration: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              placeholderTextColor="#666"
              value={newTrip.date}
              onChangeText={(text) => setNewTrip({ ...newTrip, date: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={addTrip}
              >
                <Text style={styles.saveButtonText}>Add Trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  summaryCards: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: "space-between",
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999',
  },
  list: {
    flex: 1,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statusIndicator: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginRight: 15,
  },
  tripContent: {
    flex: 1,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  tripDetail: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    color: '#ff0000',
    fontSize: 20,
  },
  addButton: {
    backgroundColor: '#007aff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 15,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007aff',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TripScreen;