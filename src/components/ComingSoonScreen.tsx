import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EngineStatusBar from './EngineStatusBar';

interface ComingSoonScreenProps {
  title: string;
  description?: string;
  icon?: string;
}

const ComingSoonScreen: React.FC<ComingSoonScreenProps> = ({ 
  title, 
  description = 'This feature is under development and will be available in a future update.',
  icon = '🚧'
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <EngineStatusBar />
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>COMING SOON</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Why is this not available?</Text>
          <Text style={styles.infoText}>
            This screen requires backend integration that hasn't been implemented yet. 
            We're being honest about what works and what doesn't.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  icon: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#ff9500',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  description: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007aff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
});

export default ComingSoonScreen;