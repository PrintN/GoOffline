import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const HomeScreen: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable ?? false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animation.stopAnimation();
      animation.setValue(1);
    }
  }, [isConnected]);

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.text}>
          {isConnected ? 'You are currently online' : 'You are currently offline'}
        </Text>
        <Animated.View
          style={[
            styles.circle,
            { backgroundColor: isConnected ? 'green' : 'red' },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 15,
  },
});

export default HomeScreen;