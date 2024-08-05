import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { magnetometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';
import { ThemeContext } from '../ThemeContext';

const { height, width } = Dimensions.get('window');

const useMovingAverage = (data, windowSize) => {
  const [smoothedData, setSmoothedData] = useState(0);

  useEffect(() => {
    if (data.length >= windowSize) {
      const sum = data.slice(-windowSize).reduce((a, b) => a + b, 0);
      setSmoothedData(sum / windowSize);
    } else {
      setSmoothedData(data[data.length - 1] || 0);
    }
  }, [data]);

  return smoothedData;
};

const CompassScreen = () => {
  const [magnetometerData, setMagnetometerData] = useState([]);
  const smoothedAngle = useMovingAverage(magnetometerData, 10); 

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 16);

    const subscription = magnetometer.subscribe(
      (sensorData) => {
        const angle = calculateAngle(sensorData);
        setMagnetometerData((prevData) => [...prevData, angle]);
      },
      (error) => console.error('Magnetometer Error:', error)
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const calculateAngle = ({ x, y }) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle < 0 ? angle + 360 : angle;
  };

  const adjustDegree = (degree) => (degree - 90 >= 0 ? degree - 90 : degree + 271);

  const compassSize = 300;
  const angle = adjustDegree(smoothedAngle);

  return (
    <View style={theme.containerCompass}>
      <Text style={theme.titleCompass}>Compass</Text>
      <View style={theme.compassContainer}>
        <Svg height={compassSize} width={compassSize}>
          <Circle
            cx={compassSize / 2}
            cy={compassSize / 2}
            r={compassSize / 2 - 10}
            stroke="white"
            strokeWidth="2.5"
            fill="none"
          />
          <Line
            x1={compassSize / 2}
            y1={compassSize / 2}
            x2={compassSize / 2}
            y2={10}
            stroke="red"
            strokeWidth="2.5"
            transform={`rotate(${360 - angle}, ${compassSize / 2}, ${compassSize / 2})`}
          />
          <Line
            x1={compassSize / 2}
            y1={compassSize / 2}
            x2={compassSize / 2}
            y2={compassSize - 10}
            stroke="blue"
            strokeWidth="2.5"
            transform={`rotate(${360 - angle}, ${compassSize / 2}, ${compassSize / 2})`}
          />
        </Svg>
        <Image
          source={require('../../assets/compass_pointer.png')}
          style={[
            theme.pointer,
            { transform: [{ rotate: `${angle}deg` }] },
          ]}
        />
      </View>
      <Text style={theme.angleTextCompass}>{Math.round(angle)}°</Text>
    </View>
  );
};

export default CompassScreen;