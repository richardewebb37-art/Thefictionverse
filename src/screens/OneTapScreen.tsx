import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const OneTapScreen = () => {
  const quickActions: QuickAction[] = [
    { id: '1', icon: '🚗', title: 'Start Trip', description: 'Begin a new trip', color: '#007aff' },
    { id: '2', icon: '⛽', title: 'Find Fuel', description: 'Nearby gas stations', color: '#ff9900' },
    { id: '3', icon: '🏨', title: 'Book Hotel', description: 'Find accommodation', color: '#9933ff' },
    { id: '4', icon: '🍽️', title: 'Find Food', description: 'Nearby restaurants', color: '#ff0066' },
    { id: '5', icon: '📞', title: 'Emergency Call', description: 'Contact emergency services', color: '#ff0000' },
    { id: '6', icon: '📍', title: 'Share Location', description: 'Send current location', color: '#00ff00' },
    { id: '7', icon: '📝', title: 'Quick Note', description: 'Add a quick note', color: '#00ccff' },
    { id: '8', icon: '📊', title: 'View Reports', description: 'Quick analytics', color: '#ffcc00' },
    { id: '9', icon: '⚙️', title: 'Settings', description: 'App settings', color: '#999999' },
    { id: '10', icon: '💬', title: 'Support Chat', description: 'Chat with support', color: '#66ff99' },
    { id: '11', icon: '🔄', title: 'Sync Data', description: 'Sync all data', color: '#ff6600' },
    { id: '12', icon: '📅', title: 'Schedule', description: 'View schedule', color: '#cc00ff' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>One-Tap Actions</Text>
        <Text style={styles.subtitle}>Quick access to common tasks</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.actionsGrid}>
          {quickActions.map(action => (
            <TouchableOpacity 
              key={action.id}
              style={[styles.actionCard, { borderLeftColor: action.color }]}
              onPress={() => console.log(`Action: ${action.title}`)}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>{action.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.favoritesSection}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <View style={styles.favoritesGrid}>
            {quickActions.slice(0, 4).map(action => (
              <TouchableOpacity 
                key={action.id}
                style={[styles.favoriteCard, { backgroundColor: action.color }]}
                onPress={() => console.log(`Favorite: ${action.title}`)}
              >
                <Text style={styles.favoriteIcon}>{action.icon}</Text>
                <Text style={styles.favoriteTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Actions</Text>
          {[
            { action: 'Started Trip', time: '2 min ago' },
            { action: 'Added Expense', time: '15 min ago' },
            { action: 'Shared Location', time: '1 hour ago' },
          ].map((item, index) => (
            <View key={index} style={styles.recentItem}>
              <View style={styles.recentInfo}>
                <Text style={styles.recentAction}>{item.action}</Text>
                <Text style={styles.recentTime}>{item.time}</Text>
              </View>
              <TouchableOpacity style={styles.repeatButton}>
                <Text style={styles.repeatButtonText}>↻</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 12,
    color: '#999',
  },
  favoritesSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  favoritesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteCard: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  favoriteTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  recentSection: {
    marginBottom: 20,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recentInfo: {
    flex: 1,
  },
  recentAction: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 3,
  },
  recentTime: {
    fontSize: 12,
    color: '#666',
  },
  repeatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeatButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default OneTapScreen;