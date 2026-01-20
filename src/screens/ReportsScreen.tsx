import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedReport, setSelectedReport] = useState('Overview');

  const periods = ['Day', 'Week', 'Month', 'Year'];
  const reports = ['Overview', 'Trips', 'Expenses', 'Performance'];

  const stats = [
    { label: 'Total Distance', value: '2,450 km', change: '+12%', color: '#007aff' },
    { label: 'Total Trips', value: '23', change: '+5', color: '#00ff00' },
    { label: 'Total Expenses', value: '$1,230', change: '-8%', color: '#ff9900' },
    { label: 'Efficiency', value: '94%', change: '+3%', color: '#ff0066' },
  ];

  const tripData = [
    { day: 'Mon', trips: 4, distance: 85 },
    { day: 'Tue', trips: 5, distance: 110 },
    { day: 'Wed', trips: 3, distance: 75 },
    { day: 'Thu', trips: 6, distance: 130 },
    { day: 'Fri', trips: 4, distance: 95 },
    { day: 'Sat', trips: 2, distance: 45 },
    { day: 'Sun', trips: 1, distance: 20 },
  ];

  const maxDistance = Math.max(...tripData.map(d => d.distance));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>Track your performance</Text>
      </View>

      <View style={styles.periodSelector}>
        {periods.map(period => (
          <TouchableOpacity
            key={period}
            style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === period && styles.periodButtonTextActive]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.reportTabs}>
        {reports.map(report => (
          <TouchableOpacity
            key={report}
            style={[styles.reportTab, selectedReport === report && styles.reportTabActive]}
            onPress={() => setSelectedReport(report)}
          >
            <Text style={[styles.reportTabText, selectedReport === report && styles.reportTabTextActive]}>
              {report}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statChange, stat.change.startsWith('+') ? styles.changePositive : styles.changeNegative]}>
                {stat.change}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Trip Activity</Text>
            <TouchableOpacity style={styles.exportButton}>
              <Text style={styles.exportButtonText}>Export</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartContainer}>
            {tripData.map((data, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barGroup}>
                  <View
                    style={[
                      styles.bar,
                      styles.distanceBar,
                      { height: `${(data.distance / maxDistance) * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{data.day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#007aff' }]} />
              <Text style={styles.legendText}>Distance (km)</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Recent Activity</Text>
          {[
            { trip: 'Downtown to Office', distance: '12.5 km', time: '25 min', status: 'Completed' },
            { trip: 'Office to Client', distance: '8.3 km', time: '18 min', status: 'Completed' },
            { trip: 'Return Home', distance: '15.2 km', time: '32 min', status: 'Completed' },
            { trip: 'Airport Run', distance: '22.0 km', time: '45 min', status: 'In Progress' },
          ].map((item, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTrip}>{item.trip}</Text>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityDetail}>📍 {item.distance}</Text>
                  <Text style={styles.activityDetail}>⏱ {item.time}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                item.status === 'Completed' ? styles.statusCompleted : styles.statusInProgress
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.generateReportButton}>
          <Text style={styles.generateReportButtonText}>Generate Full Report</Text>
        </TouchableOpacity>
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
  periodSelector: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: "space-between",
  },
  periodButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#007aff',
  },
  periodButtonText: {
    color: '#999',
    fontSize: 14,
  },
  periodButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reportTabs: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  reportTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
  },
  reportTabActive: {
    backgroundColor: '#007aff',
  },
  reportTabText: {
    color: '#999',
    fontSize: 14,
  },
  reportTabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  statChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  changePositive: {
    color: '#00ff00',
  },
  changeNegative: {
    color: '#ff0000',
  },
  chartSection: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  exportButton: {
    padding: 8,
  },
  exportButtonText: {
    color: '#007aff',
    fontSize: 14,
  },
  chartContainer: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barGroup: {
    width: '80%',
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  distanceBar: {
    backgroundColor: '#007aff',
  },
  barLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#999',
  },
  detailsSection: {
    marginBottom: 25,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  activityInfo: {
    flex: 1,
  },
  activityTrip: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  activityDetail: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
  },
  statusCompleted: {
    backgroundColor: '#00ff00',
  },
  statusInProgress: {
    backgroundColor: '#007aff',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  generateReportButton: {
    backgroundColor: '#007aff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  generateReportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportsScreen;