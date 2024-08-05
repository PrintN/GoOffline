import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { ThemeContext, standardTheme, darkTheme, lightTheme } from '../ThemeContext';

const FireMakingGuide = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const markdownContent = `
  # How to Make a Fire

  Making a fire is essential for survival. Follow these steps:
  
  ## Gather Materials
  - Tinder
  - Kindling
  - Fuel

  ## Steps
  1. Create a base with tinder.
  2. Add kindling in a teepee shape.
  3. Light the tinder and add fuel as the fire grows.

  Remember to always practice fire safety!
  `;

  return (
    <View style={theme.container}>
      <ScrollView contentContainerStyle={theme.scrollContainerGuides}>
        <Markdown style={theme}>{markdownContent}</Markdown>
      </ScrollView>
    </View>
  );
};

export default FireMakingGuide;