import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSettingsPress?: () => void;
  showBack?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onMenuPress, 
  onSettingsPress, 
  showBack = false,
  onBackPress 
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity style={styles.leftButton} onPress={onBackPress}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.leftButton} onPress={onMenuPress}>
          <Text style={styles.buttonText}>☰</Text>
        </TouchableOpacity>
      )}
      
      <Text style={styles.title}>{title}</Text>
      
      <TouchableOpacity style={styles.rightButton} onPress={onSettingsPress}>
        <Text style={styles.buttonText}>⚙</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  leftButton: {
    padding: 10,
    minWidth: 50,
  },
  rightButton: {
    padding: 10,
    minWidth: 50,
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;