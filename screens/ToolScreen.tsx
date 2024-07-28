import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MusicScreen from './tools/Music';
import CompassScreen from './tools/Compass';
import UnitConverterScreen from './tools/UnitConverter';
import CurrencyConverterScreen from './tools/CurrencyConverter';
import GuessTheNumberScreen from './tools/GuessTheNumber';
import TicTacToeScreen from './tools/TicTacToe';

const { width } = Dimensions.get('window');

const ToolScreen: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Music':
        return <MusicScreen />;
      case 'Compass':
        return <CompassScreen />;
      case 'Unit Converter':
        return <UnitConverterScreen />;
      case 'Currency Converter':
        return <CurrencyConverterScreen />;
      case 'Guess The Number':
        return <GuessTheNumberScreen />;
      case 'Tic Tac Toe':
        return <TicTacToeScreen />;
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Tools</Text>
            <View style={styles.grid}>
              <TouchableOpacity
                style={styles.toolBox}
                onPress={() => setActiveScreen('Music')}
              >
                <Text style={styles.toolText}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolBox}
                onPress={() => setActiveScreen('Compass')}
              >
                <Text style={styles.toolText}>Compass</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolBox}
                onPress={() => setActiveScreen('Unit Converter')}
              >
                <Text style={styles.toolText}>Unit Converter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolBox}
                onPress={() => setActiveScreen('Currency Converter')}
              >
                <Text style={styles.toolText}>Currency Converter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolBox}
                onPress={() => setActiveScreen('Guess The Number')}
              >
                <Text style={styles.toolText}>Guess The Number</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolBox}
                onPress={() => setActiveScreen('Tic Tac Toe')}
              >
                <Text style={styles.toolText}>Tic Tac Toe</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {activeScreen && (
        <TouchableOpacity style={styles.backButton} onPress={() => setActiveScreen(null)}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  toolBox: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    width: width * 0.4,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toolText: {
    color: 'white',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
});

export default ToolScreen;