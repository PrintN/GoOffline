import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MusicScreen from './tools/Music';
import CompassScreen from './tools/Compass';
import UnitConverterScreen from './tools/UnitConverter';
import CurrencyConverterScreen from './tools/CurrencyConverter';
import GuessTheNumberScreen from './tools/GuessTheNumber';
import TicTacToeScreen from './tools/TicTacToe';
import TranslationTool from './tools/Translation';
import OfflineMapScreen from './tools/Maps';

import { ThemeContext, standardTheme, darkTheme, lightTheme } from './ThemeContext'; // Import themes

const { width } = Dimensions.get('window');

const ToolScreen: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  const { theme, setTheme } = useContext(ThemeContext);

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
      case 'Translation':
        return <TranslationTool />;
      case 'Maps':
      return <OfflineMapScreen />;
      default:
        return (
          <View style={theme.containerTranslationScreen}>
            <Text style={theme.titleTranslationScreen}>Tools</Text>
            <View style={theme.gridTranslationScreen}>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Music')}
              >
                <Text style={theme.toolTextTranslationScreen}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Compass')}
              >
                <Text style={theme.toolTextTranslationScreen}>Compass</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Unit Converter')}
              >
                <Text style={theme.toolTextTranslationScreen}>Unit Converter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Currency Converter')}
              >
                <Text style={theme.toolTextTranslationScreen}>Currency Converter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Guess The Number')}
              >
                <Text style={theme.toolTextTranslationScreen}>Guess The Number</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Tic Tac Toe')}
              >
                <Text style={theme.toolTextTranslationScreen}>Tic Tac Toe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Translation')}
              >
                <Text style={theme.toolTextTranslationScreen}>Translation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.toolBoxTranslationScreen}
                onPress={() => setActiveScreen('Maps')}
              >
                <Text style={theme.toolTextTranslationScreen}>Maps</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {activeScreen && (
        <TouchableOpacity style={theme.backButtonTranslationScreen} onPress={() => setActiveScreen(null)}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      {renderScreen()}
    </View>
  );
};

export default ToolScreen;