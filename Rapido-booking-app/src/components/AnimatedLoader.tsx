import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../utils/colors';

interface AnimatedLoaderProps {
  visible: boolean;
  message?: string;
}

const DOT_COUNT = 3;
const color = ['#FFD700', '#FF6B35', '#FFD700']; // Rapido yellow-orange theme

const AnimatedLoader = ({ visible, message = 'Please wait...' }: AnimatedLoaderProps) => {
  const scaleAnims = useRef(Array.from({ length: DOT_COUNT }, () => new Animated.Value(1))).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Spinning ring
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Bouncing dots staggered
      const dotAnimations = scaleAnims.map((anim, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(i * 150),
            Animated.timing(anim, {
              toValue: 1.6,
              duration: 350,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: 350,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.delay((DOT_COUNT - i - 1) * 150),
          ])
        )
      );

      Animated.parallel(dotAnimations).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);
      scaleAnims.forEach(a => a.setValue(1));
    }
  }, [visible]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        {/* Spinning ring */}
        <Animated.View style={[styles.ring, { transform: [{ rotate }] }]} />

        {/* Inner icon */}
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>⚡</Text>
        </View>

        {/* Bouncing dots */}
        <View style={styles.dotsRow}>
          {scaleAnims.map((anim, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: color[i], transform: [{ scale: anim }] },
              ]}
            />
          ))}
        </View>

        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale
      (20),
  },
  ring: {
    position: 'absolute',
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: COLORS.yellow,
    borderRightColor: COLORS.orange,
  },
  iconCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: scale(30),
  },
  dotsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(30),
  },
  dot: {
    width: scale(12),
    height: scale(12),
    borderRadius: 6,
  },
  message: {
    color: COLORS.white,
    fontSize: scale(15),
    fontWeight: '500',
    letterSpacing: 0.5,
    opacity: 0.85,
  },
});

export default AnimatedLoader;