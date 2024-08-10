import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FireMakingGuide from './guides/fire-making';
import WaterPurificationGuide from './guides/water-purification';
import ShelterBuildingGuide from './guides/shelter-building';

import { ThemeContext, standardTheme, darkTheme, lightTheme } from './ThemeContext';

const GuidesScreen: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  const { theme, setTheme } = useContext(ThemeContext);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Fire Making':
        return <FireMakingGuide />;
      case 'Water Purification':
        return <WaterPurificationGuide />;
      case 'Shelter Building':
        return <ShelterBuildingGuide />;
      default:
        return (
          <View style={theme.containerGuidesScreen}>
            <Text style={theme.titleGuidesScreen}>Guides</Text>
            <ScrollView contentContainerStyle={theme.gridTranslationScreen}>
              <TouchableOpacity
                style={theme.guideBoxGuidesScreen}
                onPress={() => setActiveScreen('Fire Making')}
              >
                <Text style={theme.guideTextGuidesScreen}>Fire Making</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.guideBoxGuidesScreen}
                onPress={() => setActiveScreen('Water Purification')}
              >
                <Text style={theme.guideTextGuidesScreen}>Water Purification</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.guideBoxGuidesScreen}
                onPress={() => setActiveScreen('Shelter Building')}
              >
                <Text style={theme.guideTextGuidesScreen}>Shelter Building</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {activeScreen && (
        <TouchableOpacity style={theme.backButtonGuidesScreen} onPress={() => setActiveScreen(null)}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      {renderScreen()}
    </View>
  );
};

export default GuidesScreen;