import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface AnimatedGaugeProps {
  layers: string[];  // Array of SVG strings (bottom to top)
  needleSvg: string; // The needle SVG string
  value: number;     // Current value (0-100)
  minValue: number;  // Minimum value (default: 0)
  maxValue: number;  // Maximum value (default: 100)
  minAngle?: number; // Starting angle in degrees (default: -135)
  maxAngle?: number; // Ending angle in degrees (default: 135)
  size?: number;     // Size of the gauge (default: 200)
}

export const AnimatedGauge: React.FC<AnimatedGaugeProps> = ({
  layers,
  needleSvg,
  value,
  minValue = 0,
  maxValue = 100,
  minAngle = -135,
  maxAngle = 135,
  size = 200,
}) => {
  const needleRotation = useRef(new Animated.Value(0)).current;

  // Calculate target angle using sweep angle (NO modulo, NO wrap, NO 360°)
  const calculateTargetAngle = (currentValue: number): number => {
    // Clamp value to valid range
    const clampedValue = Math.max(minValue, Math.min(maxValue, currentValue));
    
    // Map value to angle range (linear interpolation)
    const angleRange = maxAngle - minAngle;
    const normalizedValue = (clampedValue - minValue) / (maxValue - minValue);
    
    // Calculate final angle
    const targetAngle = minAngle + normalizedValue * angleRange;
    
    return targetAngle;
  };

  // Update needle rotation with smooth animation
  useEffect(() => {
    const targetAngle = calculateTargetAngle(value);
    
    Animated.spring(needleRotation, {
      toValue: targetAngle,
      friction: 8,      // Less friction = faster movement
      tension: 60,      // Higher tension = snappier response
      useNativeDriver: true,
    }).start();
  }, [value, minValue, maxValue, minAngle, maxAngle, needleRotation]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Render background layers */}
      {layers.map((svgString, index) => (
        <View key={index} style={[styles.layer, { width: size, height: size }]}>
          <SvgXml xml={svgString} width={size} height={size} />
        </View>
      ))}
      
      {/* Render animated needle */}
      <Animated.View
        style={[
          styles.layer,
          styles.needle,
          {
            width: size,
            height: size,
            transform: [{ rotate: needleRotation.interpolate({
              inputRange: [-180, 180],
              outputRange: ['-180deg', '180deg'],
            }) }]
          }
        ]}
      >
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
});