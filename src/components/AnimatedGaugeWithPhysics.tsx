import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { GaugePhysics, PhysicsConfig } from '../engine/physics/GaugePhysics';

interface AnimatedGaugeWithPhysicsProps {
  layers: string[];
  needleSvg: string;
  value: number;
  minValue: number;
  maxValue: number;
  minAngle: number;
  maxAngle: number;
  size?: number;
  physicsConfig?: PhysicsConfig;
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
 * AnimatedGaugeWithPhysics - Physics-based needle simulation
 * 
 * Uses Matter.js physics engine for realistic needle movement with:
 * - Mass and inertia
 * - Spring physics
 * - Mechanical stopper simulation
 * - Overshoot and bounce effects
 * 
 * This provides the most realistic gauge needle behavior.
 */
export const AnimatedGaugeWithPhysics: React.FC<AnimatedGaugeWithPhysicsProps> = ({
  layers,
  needleSvg,
  value,
  minValue,
  maxValue,
  minAngle,
  maxAngle,
  size = 180,
  physicsConfig,
  glowColor,
}) => {
  const physicsRef = useRef<GaugePhysics | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const angleRef = useRef<number>(minAngle);
  const previousValueRef = useRef(value);
  const lastHapticTimeRef = useRef<number>(0);

  // Memoize colors to prevent recreation on every render
  const colors = useMemo(() => NEON_GLOW_COLORS[glowColor], [glowColor]);

  // Initialize physics engine
  useEffect(() => {
    physicsRef.current = new GaugePhysics(physicsConfig);
    physicsRef.current.setStopperAngles(minAngle, maxAngle);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (physicsRef.current) {
        physicsRef.current.destroy();
      }
    };
  }, [physicsConfig, minAngle, maxAngle]);

  // Update physics when value changes
  useEffect(() => {
    if (!physicsRef.current) return;

    // Calculate target angle
    const clampedValue = Math.max(minValue, Math.min(maxValue, value));
    const normalizedValue = (clampedValue - minValue) / (maxValue - minValue);
    const targetAngle = minAngle + normalizedValue * (maxAngle - minAngle);

    // Update physics loop
    const updatePhysics = () => {
      if (!physicsRef.current) return;

      const state = physicsRef.current.update(targetAngle);
      angleRef.current = state.angle;

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    // Start physics loop
    animationFrameRef.current = requestAnimationFrame(updatePhysics);

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

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, minValue, maxValue, minAngle, maxAngle]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Render background layers */}
      {layers.map((svgString, index) => (
        <View key={index} style={[styles.layer, { width: size, height: size }]}>
          <SvgXml xml={svgString} width={size} height={size} />
        </View>
      ))}
      
      {/* Glow effect */}
      <View style={[styles.glow, { backgroundColor: colors.background }]} />
      
      {/* Render physics-driven needle */}
      <View 
        style={[
          styles.layer, 
          styles.needle, 
          { 
            width: size, 
            height: size,
            transform: [{ rotate: `${angleRef.current}deg` }]
          }
        ]}
      >
        <SvgXml xml={needleSvg} width={size} height={size} />
      </View>
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
    borderRadius: 9999,
  },
});