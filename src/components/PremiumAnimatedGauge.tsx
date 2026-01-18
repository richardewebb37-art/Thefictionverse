import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface PremiumAnimatedGaugeProps {
  layers: string[];
  needleSvg: string;
  value: number;
  minValue: number;
  maxValue: number;
  minAngle: number;
  maxAngle: number;
  size?: number;
  physicsType?: 'speedometer' | 'psi' | 'tachometer';
  glowColor: 'neon_cyan' | 'neon_purple' | 'neon_pink' | 'cyan' | 'gradient' | 'amber';
}

// Memoized color constants for performance
const NEON_GLOW_COLORS = {
  neon_cyan: {
    primary: '#00f2ff',
    secondary: '#00d4e6',
    tertiary: '#00b8cc',
    shadow: 'rgba(0, 242, 255, 0.9)',
    glow: 'rgba(0, 242, 255, 0.6)',
    background: 'rgba(0, 242, 255, 0.08)',
    innerGlow: 'rgba(0, 242, 255, 0.3)',
  },
  neon_purple: {
    primary: '#bc13fe',
    secondary: '#a010e0',
    tertiary: '#880dc2',
    shadow: 'rgba(188, 19, 254, 0.9)',
    glow: 'rgba(188, 19, 254, 0.6)',
    background: 'rgba(188, 19, 254, 0.08)',
    innerGlow: 'rgba(188, 19, 254, 0.3)',
  },
  neon_pink: {
    primary: '#ff0055',
    secondary: '#e0004d',
    tertiary: '#c20044',
    shadow: 'rgba(255, 0, 85, 0.9)',
    glow: 'rgba(255, 0, 85, 0.6)',
    background: 'rgba(255, 0, 85, 0.08)',
    innerGlow: 'rgba(255, 0, 85, 0.3)',
  },
  cyan: {
    primary: '#06B6D4',
    secondary: '#22D3EE',
    tertiary: '#67E8F9',
    shadow: 'rgba(6, 182, 212, 0.8)',
    glow: 'rgba(6, 182, 212, 0.4)',
    background: 'rgba(6, 182, 212, 0.05)',
    innerGlow: 'rgba(6, 182, 212, 0.2)',
  },
  gradient: {
    primary: '#22C55E',
    secondary: '#EAB308',
    tertiary: '#EF4444',
    shadow: 'rgba(34, 197, 94, 0.8)',
    glow: 'rgba(34, 197, 94, 0.4)',
    background: 'rgba(34, 197, 94, 0.05)',
    innerGlow: 'rgba(34, 197, 94, 0.2)',
  },
  amber: {
    primary: '#F59E0B',
    secondary: '#FBBF24',
    tertiary: '#FCD34D',
    shadow: 'rgba(245, 158, 11, 0.8)',
    glow: 'rgba(245, 158, 11, 0.4)',
    background: 'rgba(245, 158, 11, 0.05)',
    innerGlow: 'rgba(245, 158, 11, 0.2)',
  },
} as const;

/**
 * PremiumAnimatedGauge - Optimized Neon Cyberpunk Styling with Live Data
 * 
 * Displays live engine data with neon glow effects.
 * The test button only temporarily shows diagnostic values.
 * 
 * Performance Optimizations:
 * - Memoized color objects to prevent recreation
 * - Consolidated effect hooks for better performance
 * - Removed unused physics engine dependency
 * - Optimized haptic feedback with throttling
 */
export const PremiumAnimatedGauge: React.FC<PremiumAnimatedGaugeProps> = ({
  layers,
  needleSvg,
  value,
  minValue,
  maxValue,
  minAngle,
  maxAngle,
  size = 180,
  physicsType = 'speedometer',
  glowColor,
}) => {
  // Initialize rotation at min angle
  const needleRotation = useSharedValue(minAngle);
  
  // Track previous value for haptic feedback
  const previousValueRef = useRef(value);
  const lastHapticTimeRef = useRef<number>(0);

  // Memoize colors to prevent recreation on every render
  const colors = useMemo(() => NEON_GLOW_COLORS[glowColor], [glowColor]);

  // Memoize angle range calculation
  const angleRange = useMemo(() => maxAngle - minAngle, [minAngle, maxAngle]);

  // Initialize needle position on mount
  useEffect(() => {
    needleRotation.value = minAngle;
  }, [minAngle]);

  // Handle value changes with animation and haptic feedback
  useEffect(() => {
    // Calculate target angle
    const clampedValue = Math.max(minValue, Math.min(maxValue, value));
    const normalizedValue = (clampedValue - minValue) / (maxValue - minValue);
    const targetAngle = minAngle + normalizedValue * angleRange;

    // Apply spring animation
    needleRotation.value = withSpring(targetAngle, {
      damping: 0.6,
      stiffness: 0.1,
      mass: 0.8,
    });

    // Throttled haptic feedback (max once per 200ms)
    const valueDelta = Math.abs(value - previousValueRef.current);
    const now = Date.now();
    if (valueDelta > 0.5 && now - lastHapticTimeRef.current > 200) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
        // Silently fail if haptics not available
      });
      lastHapticTimeRef.current = now;
    }
    previousValueRef.current = value;
  }, [value, minValue, maxValue, angleRange, needleRotation]);

  // Animated style for needle rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${needleRotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Render background layers */}
      {layers.map((svgString, index) => (
        <View key={index} style={[styles.layer, { width: size, height: size }]}>
          <SvgXml xml={svgString} width={size} height={size} />
        </View>
      ))}
      
      {/* Glow effect behind needle */}
      <LinearGradient
        colors={[colors.background, 'transparent']}
        style={styles.glow}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Render animated needle */}
      <Animated.View style={[styles.layer, styles.needle, animatedStyle, { width: size, height: size }]}>
        <SvgXml xml={needleSvg} width={size} height={size} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  needle: {
    // Needle rotates around center
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
});