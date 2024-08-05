import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { ThemeContext } from './ThemeContext'; // Import only ThemeContext

const HomeScreen: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const animation = useRef(new Animated.Value(1)).current;

  // Extract theme from the ThemeContext
  const { theme } = useContext(ThemeContext);

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
    <View style={theme.containerHomeScreen}>
      <View style={theme.statusContainerHomeScreen}>
        <Text style={theme.textHomeScreen}>
          {isConnected ? 'You are currently online' : 'You are currently offline'}
        </Text>
        <Animated.View
          style={[
            theme.circleHomeScreen,
            { backgroundColor: isConnected ? 'green' : 'red' },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default HomeScreen;