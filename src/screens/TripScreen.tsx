import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTrip, Trip } from '../contexts/TripContext';

const TripScreen = () => {
  const { trips, addTrip, deleteTrip, loading } = useTrip();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newTrip, setNewTrip] = useState({ destination: '', distance: '', duration: '', date: '' });

  const handleAddTrip = () => {
    if (newTrip.destination && newTrip.distance) {
      const tripData = {
        destination: newTrip.destination,
        startDate: newTrip.date || new Date().toISOString().split('T')[0],
        endDate: newTrip.date || new Date().toISOString().split('T')[0],
        distance: newTrip.distance,
        status: 'upcoming' as const,
      };
      addTrip(tripData);
      setModalVisible(false);
      setNewTrip({ destination: '', distance: '', duration: '', date: '' });
    }
  };

  const handleDeleteTrip = (id: string) => {
    deleteTrip(id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'ongoing': return '#3B82F6';
      case 'upcoming': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const renderTrip = ({ item }: { item: Trip }) => (
    <TouchableOpacity style={styles.tripCard}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
      <View style={styles.tripContent}>
        <View style={styles.tripHeader}>
          <Text style={styles.tripDestination}>{item.destination}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.tripDetails}>
          <Text style={styles.tripDetail}>📍 {item.distance || 'N/A'}</Text>
          <Text style={styles.tripDetail}>📅 {item.startDate} - {item.endDate}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTrip(item.id)}>
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading trips...</Text>
        </View>
      ) : trips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No trips yet</Text>
          <Text style={styles.emptySubtext}>Add your first trip to get started</Text>
        </View>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTrip}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddTrip}>
                <Text style={styles.saveButtonText}>Save</Text>
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
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  listContent: {
    padding: 16,
  },
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
  },
  tripContent: {
    flex: 1,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tripDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tripDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 16,
    marginBottom: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TripScreen;