import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ListItemProps {
  title: string;
  subtitle?: string;
  rightText?: string;
  onPress?: () => void;
  icon?: string;
  showArrow?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  rightText,
  onPress,
  icon,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      {showArrow && <Text style={styles.arrow}>›</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  icon: {
    fontSize: 24,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
  },
  rightText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#666',
  },
});

export default ListItem;