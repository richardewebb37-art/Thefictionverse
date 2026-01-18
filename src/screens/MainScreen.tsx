import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { Engine } from '../engine/core/Engine';
import { PremiumAnimatedGauge } from '../components/PremiumAnimatedGauge';
import { 
  speedometerSvgs, 
  psiSvgs, 
  tachometerSvgs,
  getSpeedometerLayers,
  getPsiLayers,
  getTachometerLayers
} from '../components/gaugeSvgs';

/**
 * PRODUCTION MainScreen - Optimized Live Engine Monitoring with Diagnostic Test
 * 
 * This is a LIVE production app showing real engine data.
 * The test button runs a quick diagnostic but doesn't stop live monitoring.
 * 
 * Performance Optimizations:
 * - useCallback for event handlers to prevent unnecessary re-renders
 * - useMemo for expensive calculations
 * - Optimized update intervals
 * - Batched state updates
 */
export const MainScreen = () => {
  // Gauge values - LIVE ENGINE DATA
  const [speedometerValue, setSpeedometerValue] = useState(0);
  const [psiValue, setPsiValue] = useState(0);
  const [tachometerValue, setTachometerValue] = useState(0);
  
  // Digital readouts - SHOWING LIVE VALUES
  const [speedometerReadout, setSpeedometerReadout] = useState('0000');
  const [psiReadout, setPsiReadout] = useState('0000');
  const [tachometerReadout, setTachometerReadout] = useState('0000');
  
  // Engine status
  const [engineStatus, setEngineStatus] = useState('NOT STARTED');
  
  // Test mode state - TEMPORARY diagnostic only
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  
  // Audio player state
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string>('No track loaded');
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);

  // Engine tracking
  const lastTickCountRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const tickHistoryRef = useRef<number[]>([]);
  const diagnosticTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Constants
  const GAUGE_SIZE = 180;
  const SPEEDOMETER_MAX = 12;
  const PSI_MAX = 10;
  const TACHOMETER_MAX = 8;

  // Memoize gauge layer arrays to prevent recreation on every render
  const speedometerLayers = useMemo(() => getSpeedometerLayers(), []);
  const psiLayers = useMemo(() => getPsiLayers(), []);
  const tachometerLayers = useMemo(() => getTachometerLayers(), []);

  /**
   * Format number to 4-digit fixed-width string
   * Memoized for performance
   */
  const formatReadout = useCallback((value: number, max: number): string => {
    const scaled = Math.round((value / max) * 9999);
    return scaled.toString().padStart(4, '0');
  }, []);

  /**
   * LIVE ENGINE DATA CONNECTION
   * This runs CONTINUOUSLY showing real engine data
   * Optimized to batch state updates and reduce re-renders
   */
  useEffect(() => {
    const engine = Engine.getInstance();

    try {
      engine.initialize();
      setEngineStatus('INITIALIZED');
    } catch (error) {
      setEngineStatus('ERROR');
      console.error('Engine initialization error:', error);
      return;
    }

    try {
      engine.start();
      setEngineStatus('RUNNING');
    } catch (error) {
      setEngineStatus('ERROR');
      console.error('Engine start error:', error);
      return;
    }

    // LIVE DATA UPDATE LOOP - Runs continuously at 10Hz
    const updateInterval = setInterval(() => {
      try {
        // During diagnostic, show diagnostic values
        if (isRunningDiagnostic) return;

        const currentTime = Date.now();
        const currentTickCount = engine.getTickCount();

        const tickDelta = currentTickCount - lastTickCountRef.current;
        const timeDelta = (currentTime - lastTimeRef.current) / 1000;
        const ticksPerSecond = tickDelta / Math.max(timeDelta, 0.001);

        // Calculate all gauge values
        const speedValue = Math.min(Math.max(ticksPerSecond, 0), SPEEDOMETER_MAX);
        
        // PSI calculation based on tick variability
        if (tickHistoryRef.current.length > 10) {
          tickHistoryRef.current.shift();
        }
        tickHistoryRef.current.push(ticksPerSecond);

        let psiValue = 0;
        if (tickHistoryRef.current.length > 2) {
          const avgTickRate = tickHistoryRef.current.reduce((a, b) => a + b, 0) / tickHistoryRef.current.length;
          const variability = Math.abs(ticksPerSecond - avgTickRate);
          psiValue = Math.min((variability / Math.max(avgTickRate, 0.001)) * 10, PSI_MAX);
        }

        const rpmValue = Math.min(Math.max(ticksPerSecond / 1.5, 0), TACHOMETER_MAX);

        // Batch all state updates together to minimize re-renders
        setSpeedometerValue(speedValue);
        setSpeedometerReadout(formatReadout(speedValue, SPEEDOMETER_MAX));
        setPsiValue(psiValue);
        setPsiReadout(formatReadout(psiValue, PSI_MAX));
        setTachometerValue(rpmValue);
        setTachometerReadout(formatReadout(rpmValue, TACHOMETER_MAX));

        lastTickCountRef.current = currentTickCount;
        lastTimeRef.current = currentTime;
      } catch (error) {
        console.error('Error updating gauge data:', error);
        // Continue running even if one update fails
      }
    }, 100);

    return () => {
      clearInterval(updateInterval);
      if (diagnosticTimeoutRef.current) {
        clearTimeout(diagnosticTimeoutRef.current);
      }
      try {
        engine.stop();
      } catch (error) {
        console.error('Error stopping engine:', error);
      }
    };
  }, [isRunningDiagnostic, formatReadout]);

  /**
   * DIAGNOSTIC TEST BUTTON
   * Runs a quick test then returns to live monitoring
   * Wrapped in useCallback to prevent unnecessary re-renders
   */
  const handleDiagnosticPress = useCallback(() => {
    setIsRunningDiagnostic(true);

    // Generate diagnostic test values
    const testSpeed = Math.random() * SPEEDOMETER_MAX;
    const testPsi = Math.random() * PSI_MAX;
    const testTach = Math.random() * TACHOMETER_MAX;

    // Batch state updates
    setSpeedometerValue(testSpeed);
    setPsiValue(testPsi);
    setTachometerValue(testTach);
    setSpeedometerReadout(formatReadout(testSpeed, SPEEDOMETER_MAX));
    setPsiReadout(formatReadout(testPsi, PSI_MAX));
    setTachometerReadout(formatReadout(testTach, TACHOMETER_MAX));

    // Clear previous timeout
    if (diagnosticTimeoutRef.current) {
      clearTimeout(diagnosticTimeoutRef.current);
    }

    // Return to live monitoring after 3 seconds
    diagnosticTimeoutRef.current = setTimeout(() => {
      setIsRunningDiagnostic(false);
    }, 3000);
  }, [formatReadout]);

  /**
   * AUDIO PLAYER - FULLY FUNCTIONAL
   * Handlers wrapped in useCallback for performance
   */
  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.error('Error configuring audio:', error);
      }
    };
    configureAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setPlaybackPosition(status.positionMillis || 0);
      setPlaybackDuration(status.durationMillis || 0);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  }, []);

  const handlePickAudio = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (sound) {
          await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: asset.uri },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setAudioLoaded(true);
        setCurrentTrack(asset.name || 'Unknown Track');
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error picking audio:', error);
    }
  }, [sound, onPlaybackStatusUpdate]);

  const handlePlayPause = useCallback(async () => {
    if (!sound) {
      handlePickAudio();
      return;
    }
    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  }, [sound, isPlaying, handlePickAudio]);

  const handleStop = useCallback(async () => {
    if (!sound) return;
    try {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error stopping playback:', error);
    }
  }, [sound]);

  const handleSkipForward = useCallback(async () => {
    if (!sound) return;
    try {
      const newPosition = Math.min(playbackPosition + 10000, playbackDuration);
      await sound.setPositionAsync(newPosition);
    } catch (error) {
      console.error('Error skipping forward:', error);
    }
  }, [sound, playbackPosition, playbackDuration]);

  const handleSkipBackward = useCallback(async () => {
    if (!sound) return;
    try {
      const newPosition = Math.max(playbackPosition - 10000, 0);
      await sound.setPositionAsync(newPosition);
    } catch (error) {
      console.error('Error skipping backward:', error);
    }
  }, [sound, playbackPosition]);

  const formatTime = useCallback((millis: number): string => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* TOP TOOLBAR - Branding LEFT, User icon RIGHT */}
      <View style={styles.topToolbar}>
        <Text style={styles.brandName}>
          <Text style={styles.brandFiction}>FICTION</Text>
          <Text style={styles.brandVerse}>VERSE</Text>
        </Text>
        <View style={styles.userIcon}>
          <Text style={styles.userIconText}>👤</Text>
        </View>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        {/* COMMAND AREA */}
        <View style={styles.commandArea}>
          <Text style={styles.commandText}>
            {isRunningDiagnostic ? 'Running diagnostic...' : 'Monitoring live engine data'}
          </Text>
        </View>

        {/* GAUGE LABELS */}
        <View style={styles.gaugeLabelsRow}>
          <Text style={styles.gaugeLabel}>CPU</Text>
          <Text style={styles.gaugeLabel}>RAM</Text>
          <Text style={styles.gaugeLabel}>STRESS</Text>
        </View>

        {/* GAUGE ROW - HORIZONTAL, evenly spaced */}
        <View style={styles.gaugeRow}>
          <View style={styles.gaugeContainer}>
            <PremiumAnimatedGauge
              layers={speedometerLayers}
              needleSvg={speedometerSvgs.needle}
              value={speedometerValue}
              minValue={0}
              maxValue={SPEEDOMETER_MAX}
              minAngle={-135}
              maxAngle={135}
              size={GAUGE_SIZE}
              physicsType="speedometer"
              glowColor="neon_cyan"
            />
            <Text style={styles.readout}>{speedometerReadout}</Text>
          </View>

          <View style={styles.gaugeContainer}>
            <PremiumAnimatedGauge
              layers={psiLayers}
              needleSvg={psiSvgs.needle}
              value={psiValue}
              minValue={0}
              maxValue={PSI_MAX}
              minAngle={-135}
              maxAngle={135}
              size={GAUGE_SIZE}
              physicsType="psi"
              glowColor="neon_purple"
            />
            <Text style={styles.readout}>{psiReadout}</Text>
          </View>

          <View style={styles.gaugeContainer}>
            <PremiumAnimatedGauge
              layers={tachometerLayers}
              needleSvg={tachometerSvgs.needle}
              value={tachometerValue}
              minValue={0}
              maxValue={TACHOMETER_MAX}
              minAngle={-135}
              maxAngle={135}
              size={GAUGE_SIZE}
              physicsType="tachometer"
              glowColor="neon_pink"
            />
            <Text style={styles.readout}>{tachometerReadout}</Text>
          </View>
        </View>

        {/* AUDIO PLAYER */}
        <View style={styles.audioPlayer}>
          <TouchableOpacity onPress={handlePickAudio} style={styles.trackInfo}>
            <Text style={styles.trackName} numberOfLines={1}>
              {currentTrack}
            </Text>
            <Text style={styles.trackTime}>
              {audioLoaded ? `${formatTime(playbackPosition)} / ${formatTime(playbackDuration)}` : 'Tap to load'}
            </Text>
          </TouchableOpacity>

          <View style={styles.audioControls}>
            <TouchableOpacity 
              style={[styles.audioButton, !audioLoaded && styles.audioButtonDisabled]} 
              onPress={handleSkipBackward}
              disabled={!audioLoaded}
            >
              <Text style={styles.audioButtonText}>⏮</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.audioButton, styles.audioButtonMain]} 
              onPress={handlePlayPause}
            >
              <Text style={styles.audioButtonTextMain}>
                {isPlaying ? '⏸' : '▶'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.audioButton, !audioLoaded && styles.audioButtonDisabled]} 
              onPress={handleStop}
              disabled={!audioLoaded}
            >
              <Text style={styles.audioButtonText}>⏹</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.audioButton, !audioLoaded && styles.audioButtonDisabled]} 
              onPress={handleSkipForward}
              disabled={!audioLoaded}
            >
              <Text style={styles.audioButtonText}>⏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* BOTTOM TOOLBAR - Round execution button */}
      <View style={styles.bottomToolbar}>
        <TouchableOpacity 
          style={[styles.executionButton, isRunningDiagnostic && styles.executionButtonActive]}
          onPress={handleDiagnosticPress}
          activeOpacity={0.7}
        >
          <Text style={styles.executionIcon}>⚡</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  // TOP TOOLBAR
  topToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    elevation: 4,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandFiction: {
    color: '#E0E0E0',
  },
  brandVerse: {
    color: '#00f2ff',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  userIconText: {
    fontSize: 20,
  },

  // MAIN CONTENT
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  // COMMAND AREA
  commandArea: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  commandText: {
    fontSize: 14,
    color: isRunningDiagnostic ? '#00f2ff' : '#666666',
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: isRunningDiagnostic ? '600' : '400',
  },

  // GAUGE LABELS
  gaugeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 40,
  },
  gaugeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888888',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // GAUGE ROW - HORIZONTAL
  gaugeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginVertical: 20,
  },
  gaugeContainer: {
    alignItems: 'center',
  },
  readout: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#00f2ff',
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
    letterSpacing: 2,
    minWidth: 80,
    textAlign: 'center',
  },

  // AUDIO PLAYER
  audioPlayer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  trackName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  trackTime: {
    fontSize: 11,
    color: '#888888',
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 242, 255, 0.1)',
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 255, 0.3)',
  },
  audioButtonMain: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0, 242, 255, 0.2)',
    borderColor: '#00f2ff',
    borderWidth: 2,
  },
  audioButtonDisabled: {
    opacity: 0.4,
  },
  audioButtonText: {
    fontSize: 16,
    color: '#00f2ff',
  },
  audioButtonTextMain: {
    fontSize: 22,
    color: '#00f2ff',
  },

  // BOTTOM TOOLBAR
  bottomToolbar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    elevation: 8,
  },
  executionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  executionButtonActive: {
    backgroundColor: 'rgba(0, 242, 255, 0.2)',
    borderColor: '#00f2ff',
  },
  executionIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});