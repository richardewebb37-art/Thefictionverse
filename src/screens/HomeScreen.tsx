import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// Context hooks
import { useAlert } from '../contexts/AlertContext';
import { useTrip } from '../contexts/TripContext';
import { useExpense } from '../contexts/ExpenseContext';
import { useAuth } from '../contexts/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  screen: string;
  color: string;
  getData: () => { count: number; label: string };
}

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { alerts } = useAlert();
  const { trips } = useTrip();
  const { user } = useAuth();
  const { expenses } = useExpense();

  const cards: CardItem[] = [
    {
      id: 'alerts',
      title: 'Alerts',
      subtitle: 'View your alerts',
      icon: 'bell-alert',
      screen: 'Alerts',
      color: '#FF6B6B',
      getData: () => ({
        count: alerts.filter(a => !a.read).length,
        label: alerts.filter(a => !a.read).length === 1 ? 'unread' : 'unread',
      }),
    },
    {
      id: 'reports',
      title: 'Reports',
      subtitle: 'Analytics & insights',
      icon: 'chart-box',
      screen: 'Reports',
      color: '#4ECDC4',
      getData: () => ({
        count: trips.length,
        label: trips.length === 1 ? 'trip recorded' : 'trips recorded',
      }),
    },
    {
      id: 'help',
      title: 'Help',
      subtitle: 'FAQ & support',
      icon: 'help-circle',
      screen: 'Help',
      color: '#95E1D3',
      getData: () => ({
        count: 0,
        label: 'Get help',
      }),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'View notifications',
      icon: 'bell',
      screen: 'Notifications',
      color: '#FFD93D',
      getData: () => ({
        count: alerts.length,
        label: alerts.length === 1 ? 'notification' : 'notifications',
      }),
    },
    {
      id: 'profile',
      title: 'Profile',
      subtitle: 'Manage your profile',
      icon: 'account',
      screen: 'Profile',
      color: '#6C63FF',
      getData: () => ({
        count: 1,
        label: user ? 'Active' : 'Setup needed',
      }),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Preferences & admin',
      icon: 'cog',
      screen: 'Settings',
      color: '#A8A4CE',
      getData: () => ({
        count: 0,
        label: 'Configure app',
      }),
    },
  ];

  const handleCardPress = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </Text>
          <Text style={styles.welcomeSubtext}>
            Here's what's happening today
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{trips.length}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{expenses.length}</Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {alerts.filter(a => !a.read).length}
            </Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
        </View>

        {/* Feature Cards */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.cardsGrid}>
          {cards.map((card) => {
            const data = card.getData();
            return (
              <TouchableOpacity
                key={card.id}
                style={styles.card}
                onPress={() => handleCardPress(card.screen)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                  <Icon name={card.icon} size={32} color="#ffffff" />
                </View>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardCount}>{data.count}</Text>
                  <Text style={styles.cardLabel}>{data.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#a0a0a0',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginRight: 4,
  },
  cardLabel: {
    fontSize: 12,
    color: '#808080',
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;