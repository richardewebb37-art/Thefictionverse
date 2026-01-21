import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTrip } from '../contexts/TripContext';
import { useExpense } from '../contexts/ExpenseContext';

const ReportsScreen = () => {
  const { trips, loading: tripsLoading } = useTrip();
  const { expenses, loading: expensesLoading } = useExpense();
  
  const totalTrips = trips.length;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const completedTrips = trips.filter(t => t.status === 'completed').length;
  
  const hasData = totalTrips > 0 || expenses.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="bar-chart" size={32} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Reports</Text>
            <Text style={styles.subtitle}>Analytics and insights</Text>
          </View>
        </View>

        {tripsLoading || expensesLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading reports...</Text>
          </View>
        ) : !hasData ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="analytics" size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No Data Available</Text>
            <Text style={styles.emptySubtitle}>
              Start adding trips and expenses to generate reports
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Stats</Text>
              
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Ionicons name="car" size={32} color="#3B82F6" />
                  <Text style={styles.statValue}>{totalTrips}</Text>
                  <Text style={styles.statLabel}>Total Trips</Text>
                </View>
                <View style={styles.statCard}>
                  <Ionicons name="receipt" size={32} color="#10B981" />
                  <Text style={styles.statValue}>${totalExpenses.toFixed(2)}</Text>
                  <Text style={styles.statLabel}>Total Expenses</Text>
                </View>
                <View style={styles.statCard}>
                  <Ionicons name="checkmark-circle" size={32} color="#F59E0B" />
                  <Text style={styles.statValue}>{completedTrips}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statCard}>
                  <Ionicons name="trending-up" size={32} color="#8B5CF6" />
                  <Text style={styles.statValue}>
                    {totalTrips > 0 ? Math.round((completedTrips / totalTrips) * 100) : 0}%
                  </Text>
                  <Text style={styles.statLabel}>Completion</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Available Reports</Text>
              
              <TouchableOpacity style={styles.reportCard}>
                <View style={[styles.reportIcon, { backgroundColor: '#3B82F620' }]}>
                  <Ionicons name="car" size={32} color="#3B82F6" />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>Trip Summary</Text>
                  <Text style={styles.reportDescription}>Overview of all trips</Text>
                </View>
                <View style={styles.reportRight}>
                  <Text style={styles.reportCount}>{totalTrips} trips</Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportCard}>
                <View style={[styles.reportIcon, { backgroundColor: '#10B98120' }]}>
                  <Ionicons name="receipt" size={32} color="#10B981" />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>Expense Report</Text>
                  <Text style={styles.reportDescription}>Total expenses breakdown</Text>
                </View>
                <View style={styles.reportRight}>
                  <Text style={styles.reportCount}>${totalExpenses.toFixed(2)}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportCard}>
                <View style={[styles.reportIcon, { backgroundColor: '#F59E0B20' }]}>
                  <Ionicons name="person" size={32} color="#F59E0B" />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>Performance</Text>
                  <Text style={styles.reportDescription}>Efficiency and completion metrics</Text>
                </View>
                <View style={styles.reportRight}>
                  <Text style={styles.reportCount}>
                    {totalTrips > 0 ? Math.round((completedTrips / totalTrips) * 100) : 0}%
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Settings</Text>
          
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="calendar" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Schedule Reports</Text>
                <Text style={styles.cardDescription}>Automate report generation</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="share" size={24} color="#3B82F6" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Share Reports</Text>
                <Text style={styles.cardDescription}>Configure sharing options</Text>
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
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    margin: '1%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  reportIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportInfo: {
    marginLeft: 16,
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reportDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  reportRight: {
    alignItems: 'flex-end',
  },
  reportCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 4,
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

export default ReportsScreen;