import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

interface Contact {
  id: string;
  name: string;
  phone: string;
  icon: any;
  color: string;
}

const DirectCallScreen = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const { settings } = useSettings();
  
  // Get emergency contacts from settings or use defaults
  const emergencyContacts: Contact[] = settings?.emergencyContacts || [
    { id: 'dispatch', name: 'Dispatch', phone: '911', icon: 'siren', color: '#EF4444' },
    { id: 'fleet', name: 'Fleet Manager', phone: '555-0123', icon: 'person', color: '#3B82F6' },
    { id: 'roadside', name: 'Roadside Assistance', phone: '555-0199', icon: 'car', color: '#F59E0B' },
  ];

  const makeCall = (phone: string) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to make phone calls on this device');
      }
    });
  };

  const handleEmergencyCall = (contact: Contact) => {
    Alert.alert(
      `Call ${contact.name}`,
      `Are you sure you want to call ${contact.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => makeCall(contact.phone),
          style: 'destructive'
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="call" size={32} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Direct Call</Text>
            <Text style={styles.subtitle}>Quick calling</Text>
          </View>
        </View>

        {emergencyContacts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="call-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No emergency contacts configured</Text>
            <Text style={styles.emptySubtext}>Add contacts in Settings</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Numbers</Text>
            
            {emergencyContacts.map((contact) => (
              <TouchableOpacity key={contact.id} style={styles.emergencyCard} onPress={() => handleEmergencyCall(contact)}>
                <View style={[styles.emergencyIcon, { backgroundColor: contact.color + '20' }]}>
                  <Ionicons name={contact.icon} size={32} color={contact.color} />
                </View>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyName}>{contact.name}</Text>
                  <Text style={styles.emergencyPhone}>{contact.phone}</Text>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Ionicons name="call" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manual Dial</Text>
          
          <View style={styles.dialContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity 
              style={[styles.dialButton, !phoneNumber && styles.dialButtonDisabled]}
              disabled={!phoneNumber}
              onPress={() => phoneNumber && handleEmergencyCall({
                id: 'manual',
                name: phoneNumber,
                phone: phoneNumber,
                icon: 'call',
                color: '#3B82F6'
              })}
            >
              <Ionicons name="call" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
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
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  emergencyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyInfo: {
    marginLeft: 16,
    flex: 1,
  },
  emergencyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  emergencyPhone: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  callButton: {
    backgroundColor: '#EF4444',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    color: '#111827',
  },
  dialButton: {
    backgroundColor: '#3B82F6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  dialButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
});

export default DirectCallScreen;