import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { ThemeContext, standardTheme, darkTheme, lightTheme } from '../ThemeContext';

const WaterPurificationGuide = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const markdownContent = `
  # How to Purify Water

  ## Methods

  ### 1. Boiling
  1. **Gather Water**: Collect water from a clean source if possible.
  2. **Boil**: Bring the water to a rolling boil for at least 1 minute (or 3 minutes at higher altitudes).
  3. **Cool**: Allow the water to cool before drinking.

  ### 2. Filtration
  1. **Find a Filter**: Use a portable water filter designed for outdoor use.
  2. **Filter**: Follow the manufacturer's instructions to filter the water through the device.
  3. **Collect**: Drink the filtered water directly or store it in clean containers.

  ### 3. Chemical Treatment
  1. **Add Chemicals**: Use water purification tablets or drops (e.g., iodine or chlorine).
  2. **Wait**: Follow the instructions on the packaging, usually requiring a wait time of 30 minutes.
  3. **Shake**: Shake the container to ensure the chemicals are mixed thoroughly.
  4. **Drink**: The water is now safe to drink.

  ## Tips
  - Always use clean containers for collecting and purifying water.
  - Avoid drinking from stagnant water sources if possible.
  - Combining methods (e.g., boiling followed by filtration) provides extra safety.

  ## Warning
  - Purification tablets or drops may not remove all chemical contaminants.
  - Always ensure that the water is clear before treating it chemically.
  `;

  return (
    <View style={theme.container}>
      <ScrollView contentContainerStyle={theme.scrollContainerGuides}>
        <Markdown style={theme}>{markdownContent}</Markdown>
      </ScrollView>
    </View>
  );
};

export default WaterPurificationGuide;