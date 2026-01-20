import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DirectCallScreen = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState('00:00');
  const [isRecording, setIsRecording] = useState(false);

  const startCall = () => {
    setIsCalling(true);
    // Start timer logic here
  };

  const endCall = () => {
    setIsCalling(false);
    setCallDuration('00:00');
    setIsRecording(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Direct Call System</Text>
        
        {isCalling ? (
          <View style={styles.callActive}>
            <Text style={styles.callStatus}>Connected</Text>
            <Text style={styles.callDuration}>{callDuration}</Text>
            <Text style={styles.callNumber}>+1 (555) 123-4567</Text>
            
            <View style={styles.callControls}>
              <TouchableOpacity 
                style={[styles.controlButton, styles.muteButton]}
                onPress={() => {}}
              >
                <Text style={styles.controlButtonText}>Mute</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.controlButton, styles.speakerButton]}
                onPress={() => {}}
              >
                <Text style={styles.controlButtonText}>Speaker</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.controlButton, styles.recordButton, isRecording && styles.recordButtonActive]}
                onPress={toggleRecording}
              >
                <Text style={styles.controlButtonText}>
                  {isRecording ? '● Stop' : '○ Record'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.endCallButton}
              onPress={endCall}
            >
              <Text style={styles.endCallButtonText}>End Call</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.callInactive}>
            <Text style={styles.prompt}>Enter number or select contact</Text>
            
            <TouchableOpacity 
              style={styles.startCallButton}
              onPress={startCall}
            >
              <Text style={styles.startCallButtonText}>📞 Start Call</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.callLog}>
          <Text style={styles.logTitle}>Recent Calls</Text>
          {['Today 2:30 PM', 'Yesterday 5:45 PM', 'Jan 17 10:00 AM'].map((time, index) => (
            <View key={index} style={styles.logItem}>
              <Text style={styles.logNumber}>+1 (555) 123-4567</Text>
              <Text style={styles.logTime}>{time}</Text>
            </View>
          ))}
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  callActive: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callInactive: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callStatus: {
    fontSize: 18,
    color: '#00ff00',
    marginBottom: 10,
  },
  callDuration: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  callNumber: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  prompt: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 30,
  },
  controlButton: {
    padding: 15,
    borderRadius: 30,
    minWidth: 80,
    alignItems: 'center',
  },
  muteButton: {
    backgroundColor: '#333',
  },
  speakerButton: {
    backgroundColor: '#333',
  },
  recordButton: {
    backgroundColor: '#333',
  },
  recordButtonActive: {
    backgroundColor: '#ff0000',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  startCallButton: {
    backgroundColor: '#00ff00',
    padding: 20,
    borderRadius: 30,
    minWidth: 150,
    alignItems: 'center',
  },
  startCallButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endCallButton: {
    backgroundColor: '#ff0000',
    padding: 20,
    borderRadius: 30,
    minWidth: 150,
    alignItems: 'center',
  },
  endCallButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  callLog: {
    marginTop: 20,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logNumber: {
    fontSize: 14,
    color: '#fff',
  },
  logTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default DirectCallScreen;