import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface BottomTabProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const BottomTab: React.FC<BottomTabProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={[
            styles.tabIcon, 
            activeTab === tab.id && styles.activeTabIcon
          ]}>
            {tab.icon}
          </Text>
          <Text style={[
            styles.tabLabel, 
            activeTab === tab.id && styles.activeTabLabel
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#007aff',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    color: '#666',
  },
  activeTabIcon: {
    color: '#007aff',
  },
  tabLabel: {
    fontSize: 11,
    color: '#666',
  },
  activeTabLabel: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});

export default BottomTab;