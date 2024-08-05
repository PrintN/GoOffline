import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { ThemeContext, standardTheme, darkTheme, lightTheme } from '../ThemeContext';

const ShelterBuildingGuide = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const markdownContent = `
  # How to Build a Shelter

  ## Types of Shelters

  ### 1. **Lean-To**
  1. **Find a Location**: Choose a spot with a natural windbreak, such as a rock or tree.
  2. **Gather Materials**: Collect long branches for the frame and smaller branches for coverage.
  3. **Build the Frame**: Lean the long branches against a sturdy object to form an A-frame.
  4. **Cover the Frame**: Place smaller branches, leaves, or grasses over the frame, ensuring good coverage.
  5. **Secure**: Make sure the shelter is stable and secure, with no gaps for wind or rain.

  ### 2. **Debris Hut**
  1. **Build a Frame**: Create a small framework using long branches stuck into the ground in a dome shape.
  2. **Add Debris**: Cover the frame with leaves, grass, and other natural debris for insulation.
  3. **Insulate**: Ensure the shelter is well-insulated and covered, leaving only a small entrance.
  4. **Test**: Check for drafts and add more debris as needed for warmth and protection.

  ### 3. **Snow Shelter**
  1. **Dig a Pit**: In deep snow, dig a pit and build an igloo-like structure using packed snow blocks.
  2. **Create a Entrance**: Carve an entrance that is lower than the main chamber to keep warm air inside.
  3. **Ventilation**: Make sure to have a small ventilation hole to prevent carbon dioxide buildup.
  4. **Insulate**: Cover the inside with snow and ice to create a layer of insulation.

  ## Tips
  - Ensure the shelter is built with materials that are readily available and appropriate for the environment.
  - Build the shelter close to a water source if possible.
  - Consider the weather conditions when choosing the type of shelter.

  ## Safety
  - Always check the stability of your shelter before using it.
  - Make sure the shelter is safe from potential hazards such as falling branches or avalanches.
  `;

  return (
    <View style={theme.container}>
      <ScrollView contentContainerStyle={theme.scrollContainerGuides}>
        <Markdown style={theme}>{markdownContent}</Markdown>
      </ScrollView>
    </View>
  );
};

export default ShelterBuildingGuide;