import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../contexts/SettingsContext';

interface Action {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  size: 'large' | 'medium';
}

const OneTapScreen = () => {
  const { settings } = useSettings();
  
  // Get quick actions from settings or use defaults
  const actions: Action[] = settings?.quickActions || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="flash" size={32} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.title}>One Tap Actions</Text>
            <Text style={styles.subtitle}>Quick access to common tasks</Text>
          </View>
        </View>

        {actions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="flash-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No quick actions configured</Text>
            <Text style={styles.emptySubtext}>Customize your one-tap actions in Settings</Text>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Primary Actions</Text>
              
              {actions
                .filter(a => a.size === 'large')
                .map((action) => (
                  <TouchableOpacity key={action.id} style={styles.actionCard}>
                    <View style={[styles.actionIconLarge, { backgroundColor: action.color }]}>
                      <Ionicons name={action.icon} size={40} color="#FFFFFF" />
                    </View>
                    <View style={styles.actionText}>
                      <Text style={styles.actionTitle}>{action.title}</Text>
                      <Text style={styles.actionDescription}>{action.description}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
            </View>

            {actions.filter(a => a.size === 'medium').length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Secondary Actions</Text>
                
                <View style={styles.actionGrid}>
                  {actions
                    .filter(a => a.size === 'medium')
                    .map((action) => (
                      <TouchableOpacity key={action.id} style={styles.gridCard}>
                        <View style={[styles.gridIcon, { backgroundColor: action.color }]}>
                          <Ionicons name={action.icon} size={28} color="#FFFFFF" />
                        </View>
                        <Text style={styles.gridTitle}>{action.title}</Text>
                        <Text style={styles.gridDescription} numberOfLines={1}>
                          {action.description}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            )}
          </>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customize Actions</Text>
          
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="settings" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Edit Actions</Text>
                <Text style={styles.cardDescription}>Customize quick actions</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="add-circle" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Add New Action</Text>
                <Text style={styles.cardDescription}>Create custom quick action</Text>
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
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actionIconLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    margin: '1%',
    alignItems: 'center',
  },
  gridIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  gridDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
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

export default OneTapScreen;